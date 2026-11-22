export const AVISO = "Resultado referencial. Confirma con un agente de aduanas antes de importar.";
export default function Aviso() {
  return <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">⚠️ {AVISO}</p>;
}
