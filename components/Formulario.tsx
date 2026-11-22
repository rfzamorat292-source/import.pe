"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { calcularTributos } from "@/lib/calculo";
import { guardarConsulta } from "@/lib/historial";
import { TIPO_CAMBIO_DEFAULT, type TipoPercepcion } from "@/config/tributos";

const leerArchivo = (f: File) =>
  new Promise<string>((ok, mal) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(",")[1]); r.onerror = mal; r.readAsDataURL(f); });

export default function Formulario({ descripcionInicial = "" }: { descripcionInicial?: string }) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function enviar(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError(""); setCargando(true);
    const f = new FormData(ev.currentTarget);
    const num = (k: string) => Number(f.get(k) || 0);
    const foto = f.get("foto") as File | null;
    try {
      if (foto && foto.size > 5_000_000) throw new Error("La foto debe pesar menos de 5 MB.");
      const cuerpo = {
        descripcion: String(f.get("descripcion") || ""), pais: String(f.get("pais")),
        ...(foto && foto.size ? { imagenBase64: await leerArchivo(foto), imagenTipo: foto.type } : {}),
      };
      const res = await fetch("/api/clasificar", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(cuerpo) });
      const ia = await res.json();
      if (!res.ok) throw new Error(ia.error ?? "Ocurrió un error.");
      const fob = num("fob"), flete = num("flete"), tipoCambio = num("tc") || TIPO_CAMBIO_DEFAULT;
      const calculo = calcularTributos({
        fob, flete, seguro: f.get("seguro") ? num("seguro") : undefined, adValorem: ia.adValorem,
        isc: ia.isc ?? 0, tipoCambio, tipoPercepcion: f.get("percepcion") as TipoPercepcion,
      });
      const id = crypto.randomUUID();
      guardarConsulta({ id, fecha: new Date().toISOString(), descripcion: cuerpo.descripcion || "(foto)", pais: cuerpo.pais, fob, flete, tipoCambio, ia, calculo });
      router.push(`/resultado?id=${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ocurrió un error.");
      setCargando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-4 rounded-lg border bg-white p-5 shadow-sm">
      <label className="block text-sm font-medium">Producto (descripción o link del proveedor)
        <textarea name="descripcion" defaultValue={descripcionInicial} rows={3} className="input mt-1" placeholder="Ej: Pastillas de freno cerámicas para Toyota Hilux, caja de 4 unidades" />
      </label>
      <label className="block text-sm font-medium">o foto de la factura/producto (opcional)
        <input type="file" name="foto" accept="image/jpeg,image/png,image/webp" className="mt-1 block w-full text-sm" />
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium">Valor FOB (USD)<input name="fob" type="number" step="0.01" min="0" required className="input mt-1" /></label>
        <label className="text-sm font-medium">Flete (USD)<input name="flete" type="number" step="0.01" min="0" required className="input mt-1" /></label>
        <label className="text-sm font-medium">Seguro (USD, opcional)<input name="seguro" type="number" step="0.01" min="0" className="input mt-1" placeholder="1.5% FOB" /></label>
        <label className="text-sm font-medium">País de origen<input name="pais" required defaultValue="China" className="input mt-1" /></label>
        <label className="text-sm font-medium">Tipo de cambio<input name="tc" type="number" step="0.001" defaultValue={TIPO_CAMBIO_DEFAULT} className="input mt-1" /></label>
        <label className="text-sm font-medium">Percepción
          <select name="percepcion" className="input mt-1" defaultValue="general">
            <option value="general">3.5% (general)</option>
            <option value="primeraImportacion">5% (1ª importación / usados)</option>
            <option value="noHabido">10% (sin RUC / no habido)</option>
          </select>
        </label>
      </div>
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button className="btn w-full sm:w-auto" disabled={cargando}>{cargando ? "Analizando…" : "Calcular costo de importación"}</button>
    </form>
  );
}
