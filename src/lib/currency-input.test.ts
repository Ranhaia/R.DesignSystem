import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { CurrencyInput, formatarDinheiro, lerDinheiro, simboloMoeda } from "@/components/ui/currency-input"
import { IdiomaProvider } from "@/lib/idioma"

// currency-input: digita livre, mostra no formato do idioma e da moeda e
// entrega o número em onValueChange.

describe("formatarDinheiro / lerDinheiro", () => {
  it("formata no idioma, com as casas da moeda e sem o símbolo", () => {
    expect(formatarDinheiro(1234.5, "pt-BR", "BRL")).toBe("1.234,50")
    expect(formatarDinheiro(1234.5, "en", "USD")).toBe("1,234.50")
    expect(formatarDinheiro(1234.5, "en", "JPY")).toBe("1,235")
    expect(formatarDinheiro(null, "pt-BR", "BRL")).toBe("")
  })
  it("símbolo da moeda no idioma", () => {
    expect(simboloMoeda("pt-BR", "BRL")).toBe("R$")
    expect(simboloMoeda("en", "USD")).toBe("$")
  })
  it("lê o que foi digitado, com ou sem símbolo", () => {
    expect(lerDinheiro("1.234,56", "pt-BR")).toBe(1234.56)
    expect(lerDinheiro("R$ 1.234,56", "pt-BR")).toBe(1234.56)
    expect(lerDinheiro("1234,5", "pt-BR")).toBe(1234.5)
    expect(lerDinheiro("$1,234.56", "en")).toBe(1234.56)
    expect(lerDinheiro("-10", "en")).toBe(-10)
    expect(lerDinheiro("", "pt-BR")).toBeNull()
    expect(lerDinheiro("abc", "pt-BR")).toBeNull()
    expect(lerDinheiro("1,2,3", "pt-BR")).toBeNull()
  })
  it("arredonda nas casas da moeda", () => {
    expect(lerDinheiro("10,999", "pt-BR", "BRL")).toBe(11)
  })
})

describe("CurrencyInput", () => {
  const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
    const el = h(CurrencyInput, { "aria-label": "Valor", ...props })
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }

  it("BRL por padrão, símbolo à parte e valor formatado", () => {
    const s = html({ defaultValue: 1500 })
    expect(s).toContain('data-slot="currency-input"')
    expect(s).toContain(">R$<")
    expect(s).toContain('value="1.500,00"')
    expect(s).toContain('inputMode="decimal"')
  })

  it("outra moeda e outro idioma", () => {
    const s = html({ defaultValue: 1500, currency: "USD" }, "en")
    expect(s).toContain(">$<")
    expect(s).toContain('value="1,500.00"')
  })
})

describe("lerDinheiro rígido", () => {
  it("milhar só em grupos de 3", () => {
    expect(lerDinheiro("1.5", "pt-BR")).toBeNull()
    expect(lerDinheiro("1.234.567,89", "pt-BR")).toBe(1234567.89)
    expect(lerDinheiro("R$ -1.000,00", "pt-BR")).toBe(-1000)
  })
})
