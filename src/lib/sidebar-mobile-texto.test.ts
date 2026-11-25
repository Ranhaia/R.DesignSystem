import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it, vi } from "vitest"

import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"

// A gaveta mobile só abre depois de um efeito/clique, que o render no servidor
// não executa. Sheet vira passagem direta e o hook devolve "mobile" para a
// ramificação da gaveta aparecer no HTML.
vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }))
vi.mock("@/components/ui/sheet", () => {
  const passa = ({ children }: { children?: React.ReactNode }) => children
  const em = (tag: string) => ({ children }: { children?: React.ReactNode }) =>
    h(tag, null, children)
  return {
    Sheet: passa,
    SheetContent: passa,
    SheetHeader: passa,
    SheetTitle: em("h2"),
    SheetDescription: em("p"),
  }
})

const gaveta = (props?: { mobileTitle?: string; mobileDescription?: string }) =>
  renderToStaticMarkup(
    h(SidebarProvider, null, h(Sidebar, props, "conteúdo"))
  )

describe("Sidebar (gaveta mobile)", () => {
  it("título e descrição vêm em português", () => {
    const saida = gaveta()
    expect(saida).toContain("<h2>Barra lateral</h2>")
    expect(saida).toContain("<p>Exibe a barra lateral no celular.</p>")
    expect(saida).not.toMatch(/>Sidebar<|Displays the mobile/)
  })

  it("mobileTitle e mobileDescription trocam os textos", () => {
    const saida = gaveta({
      mobileTitle: "Menu principal",
      mobileDescription: "Atalhos do sistema.",
    })
    expect(saida).toContain("<h2>Menu principal</h2>")
    expect(saida).toContain("<p>Atalhos do sistema.</p>")
  })
})
