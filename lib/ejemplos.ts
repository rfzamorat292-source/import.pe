export interface Ejemplo { slug: string; titulo: string; producto: string; intro: string; puntos: string[] }

export const EJEMPLOS: Ejemplo[] = [
  { slug: "cuanto-cuesta-importar-repuestos-de-auto-desde-china", titulo: "Cuánto cuesta importar repuestos de auto desde China",
    producto: "Pastillas de freno para auto, origen China",
    intro: "Los repuestos de auto suelen clasificarse en el capítulo 87 del arancel y en su mayoría pagan 0% o 6% de ad valorem, más IGV, IPM y percepción.",
    puntos: ["Partidas frecuentes: 8708.30 (frenos), 8708.99 (otras partes).", "Algunos repuestos de seguridad pueden requerir verificación del MTC.", "Si es tu primera importación, la percepción sube a 5%."] },
  { slug: "cuanto-cuesta-importar-ropa-desde-china", titulo: "Cuánto cuesta importar ropa desde China",
    producto: "Polos de algodón para adulto, origen China",
    intro: "Las prendas de vestir (capítulos 61 y 62) suelen pagar 11% de ad valorem, la tasa más alta del arancel peruano.",
    puntos: ["Atención a posibles derechos antidumping en textiles.", "El etiquetado debe cumplir el Reglamento de Etiquetado de Textiles."] },
  { slug: "cuanto-cuesta-importar-celulares-desde-estados-unidos", titulo: "Cuánto cuesta importar celulares desde Estados Unidos",
    producto: "Teléfonos celulares smartphone, origen Estados Unidos",
    intro: "Los celulares (partida 8517.13) pagan 0% de ad valorem, pero requieren homologación ante el MTC.",
    puntos: ["El MTC exige permiso de internamiento para equipos de telecomunicaciones.", "IGV 16% + IPM 2% sobre el valor CIF."] },
  { slug: "cuanto-cuesta-importar-cosmeticos-desde-corea", titulo: "Cuánto cuesta importar cosméticos desde Corea",
    producto: "Cremas faciales hidratantes, origen Corea del Sur",
    intro: "Los cosméticos (capítulo 33) necesitan Notificación Sanitaria Obligatoria ante DIGEMID antes de venderse.",
    puntos: ["Ad valorem habitual: 6%.", "Sin registro de DIGEMID, la mercancía puede quedar retenida."] },
];
export const ejemploPorSlug = (s: string) => EJEMPLOS.find((e) => e.slug === s);
