import { describe, expect, it } from "vitest"
import { comLuminosidade, compor, corProximaQuePassa, paraHex, parseCor, razao } from "./contraste"

// sRGB (com gama) -> OKLCH, só para conferir matiz no teste.
function oklch(hex: string) {
  const c = parseCor(hex)!
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  const [r, g, b] = [lin(c.r), lin(c.g), lin(c.b)]
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return { L, C: Math.hypot(A, B), H: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 }
}

describe("parseCor", () => {
  it("entende hex curto, longo e com alpha", () => {
    expect(paraHex(parseCor("#fff")!)).toBe("#FFFFFF")
    expect(paraHex(parseCor("#1f6f5c")!)).toBe("#1F6F5C")
    expect(parseCor("#00000080")!.a).toBeCloseTo(0.502, 2)
  })
  it("entende oklch com número, porcentagem e alpha", () => {
    expect(paraHex(parseCor("oklch(1 0 0)")!)).toBe("#FFFFFF")
    expect(paraHex(parseCor("oklch(0% 0 0)")!)).toBe("#000000")
    expect(parseCor("oklch(1 0 0 / 10%)")!.a).toBeCloseTo(0.1, 5)
    expect(parseCor("oklch(0.5 0.22 292.5 / 0.4)")!.a).toBeCloseTo(0.4, 5)
  })
  it("devolve null para o que não entende", () => {
    expect(parseCor("var(--x)")).toBeNull()
    expect(parseCor("azul")).toBeNull()
    expect(parseCor("#12")).toBeNull()
  })
})

describe("razao", () => {
  it("preto e branco = 21", () => {
    expect(razao("#000000", "#FFFFFF")).toBe(21)
    expect(razao("#FFFFFF", "#000000")).toBe(21)
  })
  it("bate com valores de referência conhecidos", () => {
    expect(razao("#767676", "#FFFFFF")).toBe(4.54)
    expect(razao("#777777", "#FFFFFF")).toBe(4.47)
    // Pares registrados no próprio globals.css (comentário de 2026-07-30, que arredondava).
    expect(Math.abs(razao("#737373", "#F5F5F5") - 4.35)).toBeLessThanOrEqual(0.01 + 1e-9)
    expect(Math.abs(razao("#6F6F6F", "#F5F5F5") - 4.61)).toBeLessThanOrEqual(0.01 + 1e-9)
  })
  it("bate com o estudo de 2026-07-22 (tolerância de 0,01 porque o estudo arredondava)", () => {
    expect(Math.abs(razao("oklch(0.145 0 0)", "oklch(1 0 0)") - 19.79)).toBeLessThanOrEqual(0.01)
    expect(Math.abs(razao("oklch(0.556 0 0)", "oklch(0.97 0 0)") - 4.34)).toBeLessThanOrEqual(0.01)
  })
  it("trunca, nunca arredonda", () => {
    const r = razao("#777777", "#FFFFFF")
    expect(r).toBe(Math.floor(r * 100) / 100)
  })
  it("compõe a frente transparente sobre o fundo", () => {
    expect(razao("oklch(1 0 0 / 0%)", "#000000")).toBe(1)
    expect(razao("#FFFFFF80", "#000000")).toBe(razao(paraHex(compor(parseCor("#FFFFFF80")!, parseCor("#000000")!)), "#000000"))
  })
  it("lança erro com cor desconhecida ou fundo transparente", () => {
    expect(() => razao("azul", "#FFFFFF")).toThrow()
    expect(() => razao("#000000", "#FFFFFF80")).toThrow(/fundo/)
  })
})

describe("corProximaQuePassa", () => {
  const casos: [string, string, number][] = [
    ["#7FD3B8", "#FFFFFF", 4.5],  // verde claro, texto branco não lê
    ["#FFD54F", "#FFFFFF", 4.5],  // amarelo
    ["#1F6F5C", "#000000", 4.5],  // escuro contra preto: precisa clarear
    ["#E57373", "#FFFFFF", 3],
  ]
  it.each(casos)("%s contra %s (piso %s) devolve cor que passa", (cor, fundo, piso) => {
    const s = corProximaQuePassa(cor, fundo, piso)!
    expect(s).toMatch(/^#[0-9A-F]{6}$/)
    expect(razao(s, fundo)).toBeGreaterThanOrEqual(piso)
  })
  it.each(casos)("%s mantém a matiz", (cor, fundo, piso) => {
    const s = corProximaQuePassa(cor, fundo, piso)!
    const d = Math.abs(oklch(s).H - oklch(cor).H)
    expect(Math.min(d, 360 - d)).toBeLessThan(2)
  })
  it.each(casos)("%s: não existe luminosidade mais próxima que também passe", (cor, fundo, piso) => {
    const s = corProximaQuePassa(cor, fundo, piso)!
    const L0 = oklch(cor).L
    const dSug = Math.abs(oklch(s).L - L0)
    // Varredura fina: nenhum passo de L mais perto que a sugestão passa (folga de 0,01 pelo arredondamento do hex).
    for (let i = 0; i <= 400; i++) {
      const L = i / 400
      if (Math.abs(L - L0) >= dSug - 0.01) continue
      const t = comLuminosidade(cor, L)
      if (t) expect(razao(t, fundo)).toBeLessThan(piso)
    }
  })
  it("devolve a própria cor quando ela já passa", () => {
    expect(corProximaQuePassa("#1F6F5C", "#FFFFFF", 4.5)).toBe("#1F6F5C")
  })
  it("devolve null quando nenhuma luminosidade passa", () => {
    expect(corProximaQuePassa("#777777", "#777777", 21)).toBeNull()
  })
})
