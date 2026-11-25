import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { NumberInput, formatarNumero, lerNumero, passoNumero } from "@/components/ui/number-input"
import { IdiomaProvider } from "@/lib/idioma"

// number-input: número com − e +, min/max/step, formatado no idioma ativo e
// teclado ↑/↓.

describe("formatarNumero / lerNumero", () => {
  it("formata no idioma", () => {
    expect(formatarNumero(1234.5, "pt-BR")).toBe("1.234,5")
    expect(formatarNumero(1234.5, "en")).toBe("1,234.5")
    expect(formatarNumero(null, "pt-BR")).toBe("")
  })
  it("lê o que foi digitado no idioma", () => {
    expect(lerNumero("1.234,5", "pt-BR")).toBe(1234.5)
    expect(lerNumero("1,234.5", "en")).toBe(1234.5)
    expect(lerNumero("-3", "pt-BR")).toBe(-3)
    expect(lerNumero("", "pt-BR")).toBeNull()
    expect(lerNumero("abc", "pt-BR")).toBeNull()
  })
  it("ida e volta", () => {
    for (const idioma of ["pt-BR", "en"] as const) {
      expect(lerNumero(formatarNumero(-98765.25, idioma), idioma)).toBe(-98765.25)
    }
  })
})

describe("passoNumero", () => {
  it("soma e subtrai o step", () => {
    expect(passoNumero(5, 1, { step: 1 })).toBe(6)
    expect(passoNumero(5, -1, { step: 2 })).toBe(3)
  })
  it("respeita min e max", () => {
    expect(passoNumero(10, 1, { step: 1, max: 10 })).toBe(10)
    expect(passoNumero(0, -1, { step: 1, min: 0 })).toBe(0)
  })
  it("sem valor começa do min ou de zero", () => {
    expect(passoNumero(null, 1, { step: 1 })).toBe(1)
    expect(passoNumero(null, 1, { step: 1, min: 5 })).toBe(5)
  })
  it("não acumula erro de ponto flutuante", () => {
    expect(passoNumero(0.1, 1, { step: 0.2 })).toBe(0.3)
  })
})

describe("NumberInput", () => {
  const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
    const el = h(NumberInput, { "aria-label": "Quantidade", ...props })
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }

  it("spinbutton com valor formatado e limites", () => {
    const s = html({ defaultValue: 1500, min: 0, max: 2000 })
    expect(s).toContain('data-slot="number-input"')
    expect(s).toContain('role="spinbutton"')
    expect(s).toContain('value="1.500"')
    expect(s).toContain('aria-valuenow="1500"')
    expect(s).toContain('aria-valuemin="0"')
    expect(s).toContain('aria-valuemax="2000"')
    expect(s).toContain('inputMode="decimal"')
  })

  it("botões − e + com nome, desligados no limite", () => {
    const s = html({ defaultValue: 0, min: 0 })
    expect(s).toMatch(/<button[^>]*disabled=""[^>]*aria-label="Diminuir"|<button[^>]*aria-label="Diminuir"[^>]*disabled=""/)
    expect(s).toContain('aria-label="Aumentar"')
  })

  it("fala inglês e formata em inglês", () => {
    const s = html({ defaultValue: 1500 }, "en")
    expect(s).toContain('value="1,500"')
    expect(s).toContain('aria-label="Increase"')
  })
})
