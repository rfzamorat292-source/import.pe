import { expect, test } from "vitest";
import { calcularTributos } from "@/lib/calculo";

test("calcula CIF, IGV y total con ad valorem 6%", () => {
  const res = calcularTributos({ fob: 1000, flete: 100, seguro: 0, adValorem: 0.06, tipoCambio: 3.75 });
  expect(res.cif).toBe(1100);
  expect(res.lineas.find((l) => l.concepto === "IGV")!.usd).toBe(186.56); // (1100+66)*16%
  expect(res.percepcionUsd).toBe(48.16); // (1166*1.18)*3.5%
});

test("incluye ISC solo cuando aplica", () => {
  const sin = calcularTributos({ fob: 500, flete: 50, adValorem: 0, tipoCambio: 3.7 });
  const con = calcularTributos({ fob: 500, flete: 50, adValorem: 0, isc: 0.1, tipoCambio: 3.7 });
  expect(sin.lineas.some((l) => l.concepto === "ISC")).toBe(false);
  expect(con.costoTotalUsd).toBeGreaterThan(sin.costoTotalUsd);
});
