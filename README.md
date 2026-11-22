# import.pe — Copiloto de importación con IA

Calcula partida arancelaria sugerida, tributos (ad valorem, ISC, IGV, IPM, percepción, tasa de despacho), permisos y costo total puesto en Lima.

## 1. Correrlo en tu computadora
1. Instala [Node.js 20 o superior](https://nodejs.org).
2. En la carpeta del proyecto: `npm install`
3. Crea la API key (paso 2) y luego: `npm run dev`
4. Abre http://localhost:3000

Tests: `npm test`

## 2. Poner la API key
1. Obtén una clave en https://console.anthropic.com → API Keys.
2. Copia `.env.example` como `.env.local` y pon: `ANTHROPIC_API_KEY=tu_clave`
3. `.env.local` nunca se sube a GitHub (está en `.gitignore`).

## 3. Desplegar en Vercel
1. Entra a https://vercel.com con tu cuenta de GitHub → **Add New → Project** → elige este repositorio.
2. En **Environment Variables** agrega `ANTHROPIC_API_KEY` con tu clave.
3. Pulsa **Deploy**. Cada cambio en GitHub se publica solo.

## 4. Conectar el dominio import.pe
1. En Vercel: proyecto → **Settings → Domains** → agrega `import.pe` y `www.import.pe`.
2. En el panel de tu registrador (dominios .pe: NIC.pe / tu proveedor), crea estos registros DNS:
   - `A` · nombre `@` · valor `76.76.21.21`
   - `CNAME` · nombre `www` · valor `cname.vercel-dns.com`
3. Espera de minutos a unas horas. Vercel activa HTTPS automáticamente.
   (Si Vercel te muestra valores distintos, usa los que indique Vercel.)

## Actualizar tasas
Todas las tasas están en `config/tributos.ts`, con su fuente legal. Revisa la UIT cada enero.

## Notas
- El límite de 10 consultas/IP/día es en memoria: se reinicia al redeplegar y cada instancia de Vercel cuenta por separado.
- El historial se guarda solo en el navegador (localStorage).
- Modelo IA configurable con `ANTHROPIC_MODEL`.
