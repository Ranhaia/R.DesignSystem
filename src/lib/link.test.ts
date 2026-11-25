import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { Link } from "@/components/ui/link"

// link: `action` faz dele a ação inline, a mais discreta, dentro do
// conteúdo, com + (adicionar) ou → (seguir).

describe("Link action", () => {
  it("sem action continua igual", () => {
    const html = renderToString(h(Link, { href: "#" }, "Ver"))
    expect(html).not.toContain("data-action")
  })
  it("add põe o + antes do texto e tira a altura de botão", () => {
    const html = renderToString(h(Link, { href: "#", action: "add" }, "Adicionar item"))
    expect(html).toContain('data-action="add"')
    expect(html.indexOf(">add<")).toBeLessThan(html.indexOf("Adicionar item"))
    expect(html).toContain("h-auto")
    expect(html).toContain("has-[&gt;svg]:p-0")
  })
  it("asChild com ação não quebra o Slot", () => {
    const html = renderToString(h(Link, { asChild: true, action: "next" }, h("a", { href: "/x" }, "Ver")))
    expect(html).toContain('href="/x"')
    expect(html).toContain("arrow_forward")
  })
  it("next põe a seta depois e espelha em RTL", () => {
    const html = renderToString(h(Link, { href: "#", action: "next" }, "Ver todos"))
    expect(html.indexOf("arrow_forward")).toBeGreaterThan(html.indexOf("Ver todos"))
    expect(html).toContain("rtl:rotate-180")
  })
})
