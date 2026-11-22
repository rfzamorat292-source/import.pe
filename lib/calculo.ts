import { IGV, IPM, PERCEPCION, SEGURO_REFERENCIAL, TASA_DESPACHO_PEN, type TipoPercepcion } from "@/config/tributos";

export interface EntradaCalculo {
  fob: number; flete: number; seguro?: number;
  adValorem: number; isc?: number; tipoCambio: number; tipoPercepcion?: TipoPercepcion;
}
export interface Linea { concepto: string; tasa?: number; usd: number; pen: number }
export interface ResultadoCalculo {
  cif: number; lineas: Linea[]; totalTributosUsd: number; percepcionUsd: number;
  costoTotalUsd: number; costoTotalPen: number;
}

const r = (n: number) => Math.round(n * 100) / 100;

/** Función pura: calcula tributos de importación (no depende de la IA). */
export function calcularTributos(e: EntradaCalculo): ResultadoCalculo {
  const seguro = e.seguro ?? e.fob * SEGURO_REFERENCIAL;
  const cif = e.fob + e.flete + seguro;
  const av = cif * e.adValorem;
  const isc = (cif + av) * (e.isc ?? 0);
  const base = cif + av + isc;
  const igv = base * IGV;
  const ipm = base * IPM;
  const tasaPerc = PERCEPCION[e.tipoPercepcion ?? "general"];
  const percepcion = (base + igv + ipm) * tasaPerc;
  const despacho = TASA_DESPACHO_PEN / e.tipoCambio;
  const tc = e.tipoCambio;
  const l = (concepto: string, usd: number, tasa?: number): Linea => ({ concepto, tasa, usd: r(usd), pen: r(usd * tc) });

  const lineas = [
    l("Valor CIF (FOB + flete + seguro)", cif),
    l("Ad valorem", av, e.adValorem),
    ...(isc > 0 ? [l("ISC", isc, e.isc)] : []),
    l("IGV", igv, IGV),
    l("IPM", ipm, IPM),
    l("Tasa de despacho aduanero", despacho),
    l("Percepción del IGV (adelanto recuperable)", percepcion, tasaPerc),
  ];
  const totalTributos = av + isc + igv + ipm + despacho;
  const total = cif + totalTributos + percepcion;
  return {
    cif: r(cif), lineas, totalTributosUsd: r(totalTributos), percepcionUsd: r(percepcion),
    costoTotalUsd: r(total), costoTotalPen: r(total * tc),
  };
}
