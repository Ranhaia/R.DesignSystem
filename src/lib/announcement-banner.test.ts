import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { AnnouncementBanner } from "@/components/ui/announcement-banner"
import { IdiomaProvider } from "@/lib/idioma"

// announcement-banner: faixa no topo com um recado para todos, que a pessoa
// fecha. Não interrompe o leitor (region, não alert) e o fechar vem do dicionário.

const render = (props: Record<string, unknown>, idioma = "pt-BR") =>
  renderToString(h(IdiomaProvider, { idioma } as never, h(AnnouncementBanner, props as never, "Manutenção sábado às 22h")))

describe("AnnouncementBanner", () => {
  it("é uma região nomeada, não um alerta", () => {
    const html = render({})
    expect(html).toContain('role="region"')
    expect(html).not.toContain('role="alert"')
    expect(html).toContain('aria-label="Anúncio"')
    expect(html).toContain("Manutenção sábado às 22h")
  })
  it("botão de fechar com nome do dicionário", () => {
    expect(render({})).toContain('aria-label="Fechar anúncio"')
    expect(render({}, "en")).toContain('aria-label="Dismiss announcement"')
  })
  it("destructive mantém a região", () => {
    expect(render({ variant: "destructive" })).toContain('role="region"')
  })
  it("sem fechar quando dismissible=false", () => {
    expect(render({ dismissible: false })).not.toContain("Fechar anúncio")
  })
})
