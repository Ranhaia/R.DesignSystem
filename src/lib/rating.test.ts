import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { Rating } from "@/components/ui/rating"
import { IdiomaProvider } from "@/lib/idioma"

// rating: estrelas para dar nota (radios nativos) ou mostrar a média (só leitura).

const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
  const el = h(Rating, { "aria-label": "Nota do produto", ...props })
  return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
}
const radios = (s: string) => s.match(/<input[^>]*type="radio"[^>]*>/g) ?? []

describe("Rating", () => {
  it("dar nota: radiogroup nomeado com um radio nativo por estrela", () => {
    const s = html({ name: "nota" })
    expect(s).toMatch(/role="radiogroup"[^>]*aria-label="Nota do produto"|aria-label="Nota do produto"[^>]*role="radiogroup"/)
    expect(radios(s)).toHaveLength(5)
    expect(radios(s).every((r) => r.includes('name="nota"'))).toBe(true)
    expect(s).toContain('aria-label="3 de 5 estrelas"')
  })

  it("meia estrela dobra as opções, com rótulo decimal", () => {
    const s = html({ allowHalf: true })
    expect(radios(s)).toHaveLength(10)
    expect(s).toContain('aria-label="2,5 de 5 estrelas"')
  })

  it("valor marca o radio certo", () => {
    const s = html({ defaultValue: 4 })
    const marcado = radios(s).filter((r) => /checked/.test(r))
    expect(marcado).toHaveLength(1)
    expect(marcado[0]).toContain('value="4"')
  })

  it("max muda o total", () => {
    expect(radios(html({ max: 10 }))).toHaveLength(10)
  })

  it("só leitura: imagem com a média, sem radios, meia estrela desenhada", () => {
    const s = html({ readOnly: true, value: 3.5 })
    expect(radios(s)).toHaveLength(0)
    expect(s).toMatch(/role="img"[^>]*aria-label="Nota do produto: 3,5 de 5 estrelas"|aria-label="Nota do produto: 3,5 de 5 estrelas"[^>]*role="img"/)
    expect(s.match(/data-preenchimento="cheia"/g)).toHaveLength(3)
    expect(s.match(/data-preenchimento="meia"/g)).toHaveLength(1)
  })

  it("desabilitado chega aos radios", () => {
    expect(radios(html({ disabled: true })).every((r) => /disabled/.test(r))).toBe(true)
  })

  it("fala inglês com o provider", () => {
    const s = html({ readOnly: true, value: 2.5, "aria-label": undefined }, "en")
    expect(s).toContain('aria-label="2.5 of 5 stars"')
  })
})
