import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { ColorPicker, ColorPickerPanel, hexParaHsv, hsvParaHex, moverHsv, normalizarHex } from "@/components/ui/color-picker"
import { IdiomaProvider } from "@/lib/idioma"

// color-picker: cor livre (área + matiz) ou da paleta, com hexadecimal e teclado.

describe("normalizarHex", () => {
  it("aceita com e sem #, curto e longo, e devolve minúsculo longo", () => {
    expect(normalizarHex("#ABC")).toBe("#aabbcc")
    expect(normalizarHex("1a2B3c")).toBe("#1a2b3c")
    expect(normalizarHex(" #FFFFFF ")).toBe("#ffffff")
  })
  it("recusa o que não é cor", () => {
    expect(normalizarHex("#12")).toBeNull()
    expect(normalizarHex("#ggg")).toBeNull()
    expect(normalizarHex("")).toBeNull()
  })
})

describe("hex ⇄ hsv", () => {
  it("cores puras", () => {
    expect(hexParaHsv("#ff0000")).toEqual({ h: 0, s: 100, v: 100 })
    expect(hexParaHsv("#00ff00")).toEqual({ h: 120, s: 100, v: 100 })
    expect(hexParaHsv("#000000")).toEqual({ h: 0, s: 0, v: 0 })
    expect(hsvParaHex({ h: 240, s: 100, v: 100 })).toBe("#0000ff")
  })
  it("ida e volta preserva a cor", () => {
    for (const c of ["#3366cc", "#ff8800", "#123456", "#ffffff", "#7f7f7f"]) {
      expect(hsvParaHex(hexParaHsv(c))).toBe(c)
    }
  })
})

describe("moverHsv (teclado da área)", () => {
  const base = { h: 10, s: 50, v: 50 }
  it("setas mudam saturação e brilho; Shift anda 10", () => {
    expect(moverHsv(base, "ArrowRight", false)!).toEqual({ h: 10, s: 51, v: 50 })
    expect(moverHsv(base, "ArrowDown", true)!).toEqual({ h: 10, s: 50, v: 40 })
  })
  it("fica entre 0 e 100", () => {
    expect(moverHsv({ h: 0, s: 99, v: 2 }, "ArrowRight", true)!.s).toBe(100)
    expect(moverHsv({ h: 0, s: 99, v: 2 }, "ArrowDown", true)!.v).toBe(0)
  })
  it("outra tecla não mexe", () => {
    expect(moverHsv(base, "a", false)).toBeNull()
  })
})

describe("ColorPicker", () => {
  const render = (el: ReturnType<typeof h>, idioma?: "en") =>
    renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)

  it("gatilho mostra a amostra e o hex, e diz a cor no nome", () => {
    const s = render(h(ColorPicker, { defaultValue: "#3366CC" }))
    expect(s).toContain('data-slot="color-picker"')
    expect(s).toContain("#3366cc")
    expect(s).toContain('aria-label="Cor: #3366cc"')
    expect(s).toContain('aria-haspopup="dialog"')
  })

  it("painel: área com teclado, matiz, hex e paleta", () => {
    const s = render(h(ColorPickerPanel, { defaultValue: "#ff0000", paleta: ["#ff0000", "#00ff00"] }))
    expect(s).toContain('data-slot="color-picker-area"')
    expect(s).toMatch(/role="slider"[^>]*aria-valuetext="Saturação 100%, brilho 100%"/)
    expect(s).toContain('aria-label="Matiz"')
    expect(s).toContain('value="#ff0000"')
    expect(s.match(/data-slot="color-picker-swatch"/g)).toHaveLength(2)
    expect(s).toContain('aria-pressed="true"')
  })

  it("fala inglês com o provider", () => {
    const s = render(h(ColorPickerPanel, { defaultValue: "#ff0000" }), "en")
    expect(s).toContain("Saturation 100%, brightness 100%")
    expect(s).toContain('aria-label="Hue"')
    expect(s).not.toMatch(/Saturação|Matiz/)
  })
})
