import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Formulario from "@/components/Formulario";
import Aviso from "@/components/Aviso";
import { EJEMPLOS, ejemploPorSlug } from "@/lib/ejemplos";

type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => EJEMPLOS.map((e) => ({ slug: e.slug }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const e = ejemploPorSlug((await params).slug);
  return e ? { title: e.titulo, description: e.intro, alternates: { canonical: `/ejemplos/${e.slug}` } } : {};
}

export default async function Page({ params }: P) {
  const e = ejemploPorSlug((await params).slug);
  if (!e) notFound();
  return (
    <article className="space-y-5">
      <h1 className="text-3xl font-bold text-slate-900">{e.titulo}</h1>
      <p className="text-slate-600">{e.intro}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm">{e.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
      <h2 className="text-xl font-semibold">Calcula tu caso</h2>
      <Formulario descripcionInicial={e.producto} />
      <Aviso />
    </article>
  );
}
