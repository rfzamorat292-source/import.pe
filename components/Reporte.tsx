"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { leerHistorial, type Consulta } from "@/lib/historial";
import Aviso, { AVISO } from "./Aviso";

const usd = (n: number) => `US$ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pen = (n: number) => `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = (t?: number) => (t === undefined ? "" : ` (${(t * 100).toFixed(1).replace(".0", "")}%)`);

function aTexto(c: Consulta) {
  return [
    `import.pe — ${c.descripcion}`, `Partida: ${c.ia.partida} (${c.ia.confianza}) — ${c.ia.descripcionPartida}`,
    ...c.calculo.lineas.map((l) => `${l.concepto}${pct(l.tasa)}: ${usd(l.usd)} / ${pen(l.pen)}`),
    `COSTO TOTAL PUESTO EN LIMA: ${usd(c.calculo.costoTotalUsd)} / ${pen(c.calculo.costoTotalPen)}`,
    `Permisos: ${c.ia.permisos.map((p) => p.entidad).join(", ") || "ninguno identificado"}`, AVISO,
  ].join("\n");
}

export default function Reporte() {
  const id = useSearchParams().get("id");
  const [hist, setHist] = useState<Consulta[] | null>(null);
  const [copiado, setCopiado] = useState(false);
  useEffect(() => setHist(leerHistorial()), []);
  if (!hist) return null;
  const c = hist.find((h) => h.id === id) ?? hist[0];
  if (!c) return <p>No hay resultados aún. <Link href="/#calcular" className="text-teal-800 underline">Haz tu primera consulta</Link>.</p>;
  const { ia, calculo } = c;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-2xl font-bold">Reporte de importación</h1><p className="text-sm text-slate-500">{c.descripcion} · Origen: {c.pais} · TC {c.tipoCambio}</p></div>
        <div className="no-print flex gap-2">
          <button className="btn-sec" onClick={() => navigator.clipboard.writeText(aTexto(c)).then(() => setCopiado(true))}>{copiado ? "¡Copiado!" : "Copiar"}</button>
          <button className="btn" onClick={() => window.print()}>Descargar PDF</button>
        </div>
      </div>
      <Aviso />
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-sm font-semibold uppercase text-slate-500">1. Partida arancelaria sugerida</h2>
        <p className="mt-1 font-mono text-2xl font-bold text-teal-800">{ia.partida}</p>
        <p className="text-sm">{ia.descripcionPartida}</p>
        <p className="mt-2 text-sm">Confianza: <span className={`rounded px-2 py-0.5 text-xs font-semibold ${ia.confianza === "alta" ? "bg-green-100 text-green-800" : ia.confianza === "media" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{ia.confianza}</span></p>
        <p className="mt-2 text-sm text-slate-600">{ia.justificacion}</p>
      </section>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase text-slate-500">2. Desglose de tributos</h2>
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-slate-500"><th className="py-1">Concepto</th><th className="text-right">USD</th><th className="text-right">PEN</th></tr></thead>
          <tbody>
            {calculo.lineas.map((l) => <tr key={l.concepto} className="border-b"><td className="py-1.5">{l.concepto}{pct(l.tasa)}</td><td className="text-right">{usd(l.usd)}</td><td className="text-right">{pen(l.pen)}</td></tr>)}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-500">La percepción es un adelanto del IGV que puedes aplicar contra tu IGV por pagar.</p>
      </section>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="mb-2 text-sm font-semibold uppercase text-slate-500">3. Permisos o restricciones posibles</h2>
        {ia.permisos.length ? <ul className="space-y-1 text-sm">{ia.permisos.map((p) => <li key={p.entidad + p.detalle}><b>{p.entidad}:</b> {p.detalle}</li>)}</ul> : <p className="text-sm">No se identificaron permisos especiales.</p>}
      </section>
      <section className="rounded-lg bg-teal-800 p-5 text-white">
        <h2 className="text-sm font-semibold uppercase opacity-80">4. Costo total estimado puesto en Lima</h2>
        <p className="text-3xl font-bold">{usd(calculo.costoTotalUsd)}</p><p className="text-lg">{pen(calculo.costoTotalPen)}</p>
      </section>
      {hist.length > 1 && (
        <section className="no-print">
          <h2 className="mb-2 font-semibold">Historial</h2>
          <ul className="space-y-1 text-sm">{hist.map((h) => <li key={h.id}><Link className="text-teal-800 underline" href={`/resultado?id=${h.id}`}>{new Date(h.fecha).toLocaleDateString("es-PE")} — {h.descripcion.slice(0, 60)}</Link></li>)}</ul>
        </section>
      )}
    </div>
  );
}
