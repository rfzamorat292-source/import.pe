import type { MetadataRoute } from "next";
import { EJEMPLOS } from "@/lib/ejemplos";
const U = "https://import.pe";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: U }, { url: `${U}/acerca` }, ...EJEMPLOS.map((e) => ({ url: `${U}/ejemplos/${e.slug}` }))];
}
