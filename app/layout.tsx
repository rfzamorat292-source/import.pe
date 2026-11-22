import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://import.pe"),
  title: { default: "import.pe — Calcula tus tributos de importación en Perú", template: "%s | import.pe" },
  description: "Copiloto de importación con IA: partida arancelaria, tributos (ad valorem, IGV, IPM, percepción), permisos y costo total puesto en Lima.",
  openGraph: { siteName: "import.pe", locale: "es_PE", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold text-teal-800">import.pe</Link>
            <div className="flex gap-4 text-sm"><Link href="/#calcular">Calcular</Link><Link href="/acerca">Acerca</Link></div>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-4xl px-4 py-8 text-xs text-slate-500">© import.pe · Resultados referenciales, no constituyen asesoría aduanera.</footer>
      </body>
    </html>
  );
}
