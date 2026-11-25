import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { BackToTop } from "@/components/ui/back-to-top"
import { IdiomaProvider } from "@/lib/idioma"

// back-to-top: botão que aparece em página longa e leva ao começo.
// Escondido (visibility) até rolar; nome do dicionário.

const em = (props = {}, idioma = "pt-BR") =>
  renderToString(h(IdiomaProvider, { idioma } as never, h(BackToTop, props)))

describe("BackToTop", () => {
  it("começa escondido, fora da ordem do Tab", () => {
    const html = em()
    expect(html).toContain('data-visible="false"')
    expect(html).toContain("invisible")
  })
  it("nome do dicionário nos dois idiomas", () => {
    expect(em()).toContain('aria-label="Voltar ao topo"')
    expect(em({}, "en")).toContain('aria-label="Back to top"')
  })
})
