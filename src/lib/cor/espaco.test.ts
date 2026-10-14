import { describe, expect, it } from "vitest"
import { cor, deOklch, paraOklch, tomDe } from "./espaco"

const aleatorio = (semente: number) => () => {
  semente |= 0; semente = (semente + 0x6d2b79f5) | 0
  let t = Math.imul(semente ^ (semente >>> 15), 1 | semente)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

describe("espaço de cor", () => {
  it("tom é o L* do CIELAB", () => {
    expect(tomDe("#000000")).toBeCloseTo(0, 1)
    expect(tomDe("#FFFFFF")).toBeCloseTo(100, 1)
    expect(tomDe("#777777")).toBeCloseTo(50.03, 0) // L* de #777777 ≈ 50,0
  })

  it("ida e volta OKLCH ↔ hex", () => {
    for (const hex of ["#7E2600", "#1447E6", "#E31A39", "#6D37D2", "#171717", "#FFD54F"]) {
      const { L, C, H } = paraOklch(hex)
      expect(deOklch(L, C, H)).toBe(hex)
    }
  })

  it("cor(matiz, croma, tom) devolve o tom pedido, dentro do gamut, com a matiz pedida", () => {
    const r = aleatorio(7)
    for (let i = 0; i < 200; i++) {
      const h = r() * 360, c = r() * 0.3, t = 2 + r() * 96
      const hex = cor(h, c, t)
      expect(hex).toMatch(/^#[0-9A-F]{6}$/)
      expect(Math.abs(tomDe(hex) - t)).toBeLessThanOrEqual(0.6)
      const o = paraOklch(hex)
      if (o.C > 0.02) {
        const d = Math.abs(o.H - h)
        expect(Math.min(d, 360 - d)).toBeLessThan(4)
      }
      expect(o.C).toBeLessThanOrEqual(c + 0.005)
    }
  })

  it("croma zero dá cinza puro", () => {
    const { C } = paraOklch(cor(120, 0, 50))
    expect(C).toBeLessThan(0.002)
  })
})
