import { createElement as h, type ReactElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it, vi } from "vitest"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CommandDialog } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/spinner"

// O Portal do Radix só monta depois do primeiro efeito (no servidor devolve
// null), então o conteúdo de Dialog/Sheet nunca apareceria no HTML. Aqui o
// Portal vira passagem direta para o texto do leitor de tela poder ser lido.
vi.mock("radix-ui", async (importOriginal) => {
  const radix = await importOriginal<typeof import("radix-ui")>()
  const passa = ({ children }: { children?: React.ReactNode }) => children
  return { ...radix, Dialog: { ...radix.Dialog, Portal: passa } }
})

const html = (el: ReactElement) => renderToStaticMarkup(el)

describe("Dialog", () => {
  const aberto = (...filhos: ReactElement[]) =>
    html(h(Dialog, { open: true }, ...filhos))

  it("o X anuncia 'Fechar'", () => {
    const saida = aberto(h(DialogContent, null, h(DialogTitle, null, "t")))
    expect(saida).toContain(">Fechar<")
    expect(saida).not.toContain("Close")
  })

  it("closeLabel troca o texto do X", () => {
    const saida = aberto(
      h(DialogContent, { closeLabel: "Dispensar" }, h(DialogTitle, null, "t"))
    )
    expect(saida).toContain(">Dispensar<")
    expect(saida).not.toContain(">Fechar<")
  })

  it("o botão do DialogFooter diz 'Fechar'", () => {
    const saida = aberto(h(DialogFooter, { showCloseButton: true }))
    expect(saida).toContain(">Fechar<")
    expect(saida).not.toContain("Close")
  })

  it("closeLabel troca o texto do botão do DialogFooter", () => {
    const saida = aberto(
      h(DialogFooter, { showCloseButton: true, closeLabel: "Voltar" })
    )
    expect(saida).toContain(">Voltar<")
  })
})

describe("Sheet", () => {
  const aberto = (props?: { closeLabel?: string }) =>
    html(
      h(
        Sheet,
        { open: true },
        h(SheetContent, props, h(SheetTitle, null, "t"))
      )
    )

  it("o botão de fechar anuncia 'Fechar'", () => {
    const saida = aberto()
    expect(saida).toContain(">Fechar<")
    expect(saida).not.toContain("Close")
  })

  it("closeLabel troca o texto", () => {
    expect(aberto({ closeLabel: "Dispensar" })).toContain(">Dispensar<")
  })
})

describe("Spinner", () => {
  it("anuncia 'Carregando'", () => {
    const saida = html(h(Spinner))
    expect(saida).toContain('aria-label="Carregando"')
    expect(saida).not.toContain("Loading")
  })

  it("aria-label do chamador vence o padrão", () => {
    expect(html(h(Spinner, { "aria-label": "Salvando" }))).toContain(
      'aria-label="Salvando"'
    )
  })
})

describe("Breadcrumb", () => {
  it("a navegação se chama 'Trilha de navegação'", () => {
    const saida = html(h(Breadcrumb))
    expect(saida).toContain('aria-label="Trilha de navegação"')
    expect(saida).not.toContain('aria-label="breadcrumb"')
  })

  it("aria-label do chamador vence o padrão", () => {
    expect(html(h(Breadcrumb, { "aria-label": "Você está aqui" }))).toContain(
      'aria-label="Você está aqui"'
    )
  })

  it("as reticências dizem 'Mais níveis'", () => {
    const saida = html(h(BreadcrumbEllipsis))
    expect(saida).toContain(">Mais níveis<")
    expect(saida).not.toContain(">More<")
  })
})

describe("Carousel", () => {
  const carrossel = (anterior?: string, proximo?: string) =>
    html(
      h(
        Carousel,
        null,
        h(CarouselContent, null, h(CarouselItem, null, "a")),
        h(CarouselPrevious, { label: anterior }),
        h(CarouselNext, { label: proximo })
      )
    )

  it("os botões dizem 'Slide anterior' e 'Próximo slide'", () => {
    const saida = carrossel()
    expect(saida).toContain(">Slide anterior<")
    expect(saida).toContain(">Próximo slide<")
    expect(saida).not.toMatch(/Previous slide|Next slide/)
  })

  it("o leitor de tela fala 'carrossel' ao entrar na região", () => {
    const saida = carrossel()
    expect(saida).toContain('aria-roledescription="carrossel"')
    expect(saida).not.toContain('aria-roledescription="carousel"')
  })

  it("label troca o texto de cada botão", () => {
    const saida = carrossel("Foto anterior", "Próxima foto")
    expect(saida).toContain(">Foto anterior<")
    expect(saida).toContain(">Próxima foto<")
  })
})

describe("Sidebar", () => {
  const dentro = (...filhos: ReactElement[]) =>
    html(h(SidebarProvider, null, ...filhos))

  it("o gatilho diz 'Alternar barra lateral'", () => {
    const saida = dentro(h(SidebarTrigger))
    expect(saida).toContain(">Alternar barra lateral<")
    expect(saida).not.toContain("Toggle Sidebar")
  })

  it("label troca o texto do gatilho", () => {
    expect(dentro(h(SidebarTrigger, { label: "Menu" }))).toContain(">Menu<")
  })

  it("o trilho usa o mesmo nome no aria-label e no title", () => {
    const saida = dentro(h(SidebarRail))
    expect(saida).toContain('aria-label="Alternar barra lateral"')
    expect(saida).toContain('title="Alternar barra lateral"')
    expect(saida).not.toContain("Toggle Sidebar")
  })
})

describe("CommandDialog", () => {
  it("título e descrição vêm em português", () => {
    const saida = html(h(CommandDialog, { open: true }, "x"))
    expect(saida).toContain(">Paleta de comandos<")
    expect(saida).toContain(">Busque um comando para executar.<")
    expect(saida).not.toMatch(/Command Palette|Search for a command|Close/)
  })

  it("title e description do chamador vencem o padrão", () => {
    const saida = html(
      h(CommandDialog, { open: true, title: "Ir para", description: "Digite" }, "x")
    )
    expect(saida).toContain(">Ir para<")
    expect(saida).toContain(">Digite<")
  })
})
