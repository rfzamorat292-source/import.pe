import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { Entrada, RespuestaIA } from "@/lib/schema";
import { permitir } from "@/lib/rateLimit";

export const runtime = "nodejs";

const SISTEMA = `Eres un especialista en clasificación arancelaria del Perú (Arancel de Aduanas 2022, D.S. 404-2021-EF, basado en el Sistema Armonizado y NANDINA).
Dado un producto, responde SOLO con un objeto JSON (sin texto extra, sin markdown) con estas claves:
{"partida":"XXXX.XX.XX.XX","descripcionPartida":"...","confianza":"alta|media|baja","justificacion":"breve, citando reglas generales de interpretación si aplica","adValorem":0|0.06|0.11,"isc":null o tasa decimal si el bien está afecto a ISC,"permisos":[{"entidad":"DIGESA|MTC|SENASA|DIGEMID|PRODUCE|SUCAMEC|...","detalle":"qué permiso y por qué"}],"productoInterpretado":"cómo entendiste el producto"}
Si la información es insuficiente, usa confianza "baja" y explica qué dato falta. Responde en español.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (!permitir(ip)) return NextResponse.json({ error: "Llegaste al límite de 10 consultas por día. Vuelve mañana." }, { status: 429 });
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: "El servicio no está configurado." }, { status: 500 });

  const entrada = Entrada.safeParse(await req.json().catch(() => null));
  if (!entrada.success || (!entrada.data.descripcion && !entrada.data.imagenBase64))
    return NextResponse.json({ error: "Describe el producto o sube una foto." }, { status: 400 });
  const { descripcion, imagenBase64, imagenTipo, pais } = entrada.data;

  const contenido: Anthropic.ContentBlockParam[] = [];
  if (imagenBase64 && imagenTipo)
    contenido.push({ type: "image", source: { type: "base64", media_type: imagenTipo, data: imagenBase64 } });
  contenido.push({ type: "text", text: `Producto (texto, link del proveedor o factura adjunta): ${descripcion || "(ver imagen)"}\nPaís de origen: ${pais}` });

  try {
    const cliente = new Anthropic();
    const msg = await cliente.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-5-5",
      max_tokens: 1500,
      system: SISTEMA,
      messages: [{ role: "user", content: contenido }],
    });
    const texto = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    const json = texto.slice(texto.indexOf("{"), texto.lastIndexOf("}") + 1);
    const datos = RespuestaIA.parse(JSON.parse(json));
    return NextResponse.json(datos);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "No pudimos clasificar tu producto ahora. Intenta de nuevo con más detalle." }, { status: 502 });
  }
}
