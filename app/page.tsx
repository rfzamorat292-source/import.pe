import Link from "next/link";
import Formulario from "@/components/Formulario";
import Aviso from "@/components/Aviso";
import { EJEMPLOS } from "@/lib/ejemplos";

const PASOS = [
  ["Describe tu producto", "Escribe qué es, pega el link del proveedor o sube una foto de la factura."],
  ["La IA lo clasifica", "Sugerimos la partida arancelaria de 10 dígitos, el ad valorem y los permisos."],
  ["Calculamos tus tributos", "Ad valorem, IGV, IPM, percepción y tasa de despacho, en USD y soles."],
  ["Conoce tu costo final", "Obtén el costo total estimado puesto en Lima y descárgalo en PDF."],
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">¿Cuánto te cuesta realmente importar?</h1>
        <p className="text-lg text-slate-600">import.pe es tu copiloto de importación con IA: partida arancelaria, tributos, permisos y costo total puesto en Lima, en segundos.</p>
      </section>
      <section id="calcular" className="space-y-3">
        <Formulario />
        <Aviso />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Cómo funciona</h2>
        <ol className="grid gap-4 sm:grid-cols-2">
          {PASOS.map(([t, d], i) => (
            <li key={t} className="rounded-lg border bg-white p-4"><p className="font-semibold text-teal-800">{i + 1}. {t}</p><p className="text-sm text-slate-600">{d}</p></li>
          ))}
        </ol>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold">Ejemplos</h2>
        <ul className="space-y-1 text-sm">{EJEMPLOS.map((e) => <li key={e.slug}><Link className="text-teal-800 underline" href={`/ejemplos/${e.slug}`}>{e.titulo}</Link></li>)}</ul>
      </section>
    </div>
  );
}
