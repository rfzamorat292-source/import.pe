import { z } from "zod";

export const RespuestaIA = z.object({
  partida: z.string().regex(/^\d{4}\.?\d{2}\.?\d{2}\.?\d{2}$/, "Partida de 10 dígitos"),
  descripcionPartida: z.string(),
  confianza: z.enum(["alta", "media", "baja"]),
  justificacion: z.string(),
  adValorem: z.union([z.literal(0), z.literal(0.06), z.literal(0.11)]),
  isc: z.number().min(0).max(1).nullable(),
  permisos: z.array(z.object({ entidad: z.string(), detalle: z.string() })),
  productoInterpretado: z.string(),
});
export type RespuestaIA = z.infer<typeof RespuestaIA>;

export const Entrada = z.object({
  descripcion: z.string().max(4000).default(""),
  imagenBase64: z.string().max(7_000_000).optional(),
  imagenTipo: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]).optional(),
  pais: z.string().min(2).max(60),
});
