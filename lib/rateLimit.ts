// Límite en memoria: 10 consultas por IP al día. Se reinicia si el servidor reinicia
// (en Vercel cada instancia lleva su propio conteo; suficiente para un MVP).
const MAX = 10;
const usos = new Map<string, { dia: string; n: number }>();

export function permitir(ip: string): boolean {
  const dia = new Date().toISOString().slice(0, 10);
  const u = usos.get(ip);
  if (!u || u.dia !== dia) { usos.set(ip, { dia, n: 1 }); return true; }
  if (u.n >= MAX) return false;
  u.n++;
  return true;
}
