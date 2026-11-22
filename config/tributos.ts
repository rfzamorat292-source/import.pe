// Tasas tributarias de importación en Perú. Actualizar aquí cuando cambien.
// Verificar siempre en: https://www.sunat.gob.pe (Aduanas > Tributos a la importación)

/** IGV: 16%. Fuente: TUO Ley del IGV (D.S. 055-99-EF), art. 17. */
export const IGV = 0.16;

/** Impuesto de Promoción Municipal: 2%. Fuente: D.Leg. 776, art. 76. */
export const IPM = 0.02;

/**
 * Percepción del IGV en importaciones. Fuente: Ley 29173 y R.S. 311-2009/SUNAT (Apéndice).
 * Se aplica sobre: CIF + ad valorem + ISC + IGV + IPM. Es un adelanto recuperable del IGV.
 */
export const PERCEPCION = {
  general: 0.035, // 3.5% tasa general
  primeraImportacion: 0.05, // 5% primera importación / bienes usados
  noHabido: 0.1, // 10% RUC no habido / sin RUC
} as const;
export type TipoPercepcion = keyof typeof PERCEPCION;

/** UIT 2026 (S/). Fuente: D.S. anual del MEF. Verificar cada enero. */
export const UIT_PEN = 5500;

/** Tasa de Despacho Aduanero: 2.35% de la UIT por DAM. Fuente: D.S. 017-2013-EF. */
export const TASA_DESPACHO_PEN = Math.round(UIT_PEN * 0.0235 * 100) / 100;

/** Seguro referencial cuando el usuario no lo indica (% del FOB). Fuente: tabla de seguros SUNAT (referencial). */
export const SEGURO_REFERENCIAL = 0.015;

/** Tipo de cambio por defecto (PEN por USD). El usuario puede editarlo. Fuente: SBS. */
export const TIPO_CAMBIO_DEFAULT = 3.75;

/** Tasas válidas de ad valorem en el Arancel de Aduanas 2022 (D.S. 404-2021-EF). */
export const AD_VALOREM_VALIDOS = [0, 0.06, 0.11] as const;
