import { Suspense } from "react";
import Reporte from "@/components/Reporte";

export const metadata = { title: "Resultado", robots: { index: false } };
export default function Page() { return <Suspense><Reporte /></Suspense>; }
