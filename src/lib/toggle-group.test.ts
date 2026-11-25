import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import ToggleGroupToolbar from "@/components/examples/toggle-group-toolbar"

// toggle-group como barra de ferramentas: role="toolbar" com nome, botões
// de ícone com nome e aria-pressed; o roving tabindex (um Tab, setas) vem
// do Radix e é conferido no navegador.

describe("ToggleGroup como toolbar", () => {
  const html = renderToString(h(ToggleGroupToolbar))
  it("container é toolbar com nome", () => {
    expect(html).toContain('role="toolbar"')
    expect(html).toMatch(/role="toolbar"[^>]*aria-label="Formatação do texto"|aria-label="Formatação do texto"[^>]*role="toolbar"/)
  })
  it("cada botão tem nome e estado", () => {
    for (const nome of ["Negrito", "Itálico", "Sublinhado"]) expect(html).toContain(`aria-label="${nome}"`)
    expect(html.match(/aria-pressed=/g)?.length).toBe(3)
  })
})
