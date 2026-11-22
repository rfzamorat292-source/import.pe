import Aviso from "@/components/Aviso";

export const metadata = { title: "Acerca", description: "Qué es import.pe y los límites del servicio." };
export default function Acerca() {
  return (
    <article className="space-y-4 text-slate-700">
      <h1 className="text-2xl font-bold text-slate-900">Acerca de import.pe</h1>
      <p>import.pe es un copiloto de importación para pequeños importadores en Perú. Usa inteligencia artificial para sugerir la partida arancelaria de tu producto y calcula los tributos con las tasas vigentes publicadas por SUNAT.</p>
      <h2 className="text-lg font-semibold text-slate-900">Límites del servicio</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>La partida arancelaria es una <b>sugerencia</b>; la clasificación oficial la determina SUNAT.</li>
        <li>No incluye costos logísticos locales (almacén, agente de aduanas, transporte interno) ni derechos antidumping o compensatorios.</li>
        <li>No considera beneficios de tratados de libre comercio (TLC) ni el régimen simplificado de courier.</li>
        <li>Las tasas pueden cambiar; revisamos periódicamente la normativa.</li>
        <li>Máximo 10 consultas por día. No guardamos tus datos: el historial vive solo en tu navegador.</li>
      </ul>
      <Aviso />
    </article>
  );
}
