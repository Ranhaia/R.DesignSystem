import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list"

// description-list: pares rótulo/valor numa ficha de detalhes, em <dl>.

const ficha = (props: Record<string, unknown> = {}) =>
  renderToString(
    h(
      DescriptionList,
      props,
      h(DescriptionItem, null, h(DescriptionTerm, null, "Nome"), h(DescriptionDetails, null, "Ana")),
      h(DescriptionItem, null, h(DescriptionTerm, null, "Cidade"), h(DescriptionDetails, null, "Recife")),
    ),
  )

describe("DescriptionList", () => {
  it("usa dl, dt e dd semânticos com as partes declaradas", () => {
    const s = ficha()
    expect(s).toMatch(/^<dl[^>]*data-slot="description-list"/)
    expect(s.match(/<div[^>]*data-slot="description-item"/g)).toHaveLength(2)
    expect(s).toMatch(/<dt[^>]*data-slot="description-term"[^>]*>Nome<\/dt>/)
    expect(s).toMatch(/<dd[^>]*data-slot="description-details"[^>]*>Ana<\/dd>/)
  })

  it("rótulo é texto apagado; valor, texto normal (estilo do text)", () => {
    const s = ficha()
    expect(s).toMatch(/<dt[^>]*class="[^"]*text-muted-foreground/)
    expect(s).toMatch(/<dd[^>]*class="[^"]*text-foreground/)
  })

  it("layout empilhado é o padrão; lado a lado vira grade", () => {
    expect(ficha()).toContain('data-layout="stacked"')
    const s = ficha({ layout: "inline" })
    expect(s).toContain('data-layout="inline"')
    expect(s).toMatch(/data-slot="description-list"[^>]*class="[^"]*grid-cols/)
    expect(s).toContain("grid-cols-subgrid")
    expect(s).toContain("col-span-2")
  })

  it("no inline, valor extra do mesmo rótulo fica na coluna dos valores", () => {
    expect(ficha({ layout: "inline" })).toMatch(/<dd[^>]*class="[^"]*in-data-\[layout=inline\]:col-start-2/)
  })
})
