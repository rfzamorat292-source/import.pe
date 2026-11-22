import type { RespuestaIA } from "./schema";
import type { ResultadoCalculo } from "./calculo";

export interface Consulta {
  id: string; fecha: string; descripcion: string; pais: string;
  fob: number; flete: number; tipoCambio: number; ia: RespuestaIA; calculo: ResultadoCalculo;
}
const KEY = "importpe_historial";

export function leerHistorial(): Consulta[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}
export function guardarConsulta(c: Consulta) {
  try { localStorage.setItem(KEY, JSON.stringify([c, ...leerHistorial()].slice(0, 20))); } catch {}
}
