import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { Temporal } from "temporal-polyfill"
import { describe, expect, it } from "vitest"

import { DatePicker, formatarData, lerData, lerPeriodo, paraDate, deDate } from "@/components/ui/date-picker"
import { IdiomaProvider } from "@/lib/idioma"

// date-picker: campo digitável (dd/mm/aaaa em pt-BR, mm/dd/yyyy em en) +
// popover com calendar; valor em Temporal.PlainDate; modo período.

const d = (s: string) => Temporal.PlainDate.from(s)

describe("formatarData / lerData", () => {
  it("formata no idioma", () => {
    expect(formatarData(d("2026-03-07"), "pt-BR")).toBe("07/03/2026")
    expect(formatarData(d("2026-03-07"), "en")).toBe("03/07/2026")
    expect(formatarData(null, "pt-BR")).toBe("")
  })
  it("lê no idioma", () => {
    expect(lerData("07/03/2026", "pt-BR", Temporal)?.toString()).toBe("2026-03-07")
    expect(lerData("03/07/2026", "en", Temporal)?.toString()).toBe("2026-03-07")
    expect(lerData("7/3/2026", "pt-BR", Temporal)?.toString()).toBe("2026-03-07")
  })
  it("data que não existe ou texto torto é inválido", () => {
    expect(lerData("31/02/2026", "pt-BR", Temporal)).toBeNull()
    expect(lerData("13/13/2026", "pt-BR", Temporal)).toBeNull()
    expect(lerData("abc", "pt-BR", Temporal)).toBeNull()
    expect(lerData("07/03/26", "pt-BR", Temporal)).toBeNull()
  })
  it("lê período com traço", () => {
    const p = lerPeriodo("01/03/2026 – 15/03/2026", "pt-BR", Temporal)
    expect(p?.from?.toString()).toBe("2026-03-01")
    expect(p?.to?.toString()).toBe("2026-03-15")
    expect(lerPeriodo("15/03/2026 - 01/03/2026", "pt-BR", Temporal)?.from?.toString()).toBe("2026-03-01")
  })
})

describe("fronteira com Date", () => {
  it("ida e volta sem fuso", () => {
    const dt = paraDate(d("2026-03-07"))
    expect([dt.getFullYear(), dt.getMonth(), dt.getDate()]).toEqual([2026, 2, 7])
    expect(deDate(dt, Temporal).toString()).toBe("2026-03-07")
  })
})

describe("DatePicker", () => {
  const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
    const el = h(DatePicker, { "aria-label": "Data", ...props })
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }
  it("campo com a data formatada e botão do calendário", () => {
    const s = html({ defaultValue: d("2026-03-07") })
    expect(s).toContain('data-slot="date-picker"')
    expect(s).toContain('value="07/03/2026"')
    expect(s).toContain('placeholder="dd/mm/aaaa"')
    expect(s).toContain('aria-label="Abrir calendário"')
  })
  it("período", () => {
    const s = html({ mode: "range", defaultValue: { from: d("2026-03-01"), to: d("2026-03-15") } })
    expect(s).toContain('value="01/03/2026 – 15/03/2026"')
    expect(s).toContain('data-mode="range"')
  })
  it("inglês", () => {
    const s = html({ defaultValue: d("2026-03-07") }, "en")
    expect(s).toContain('value="03/07/2026"')
    expect(s).toContain('placeholder="mm/dd/yyyy"')
    expect(s).toContain('aria-label="Open calendar"')
  })
})
