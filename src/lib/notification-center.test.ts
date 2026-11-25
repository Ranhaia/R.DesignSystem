import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { NotificationCenter, NotificationList } from "@/components/ui/notification-center"
import { IdiomaProvider } from "@/lib/idioma"

// notification-center: sino com contador (badge) que abre a lista de
// notificações lidas/não lidas num popover.

const itens = [
  { id: "1", title: "Relatório pronto", read: false },
  { id: "2", title: "Novo comentário", description: "Ana respondeu", read: false },
  { id: "3", title: "Backup concluído", read: true },
]
const em = (el: unknown, idioma = "pt-BR") => renderToString(h(IdiomaProvider, { idioma } as never, el as never))

describe("NotificationCenter (sino)", () => {
  it("nome do botão diz quantas não lidas; badge mostra o número", () => {
    const html = em(h(NotificationCenter, { notifications: itens }))
    expect(html).toContain('aria-label="Notificações, 2 não lidas"')
    expect(html).toMatch(/data-slot="notification-center-count"[^>]*>2</)
    expect(em(h(NotificationCenter, { notifications: itens }), "en")).toContain('aria-label="Notifications, 2 unread"')
  })
  it("sem não lidas: sem badge", () => {
    const html = em(h(NotificationCenter, { notifications: [itens[2]] }))
    expect(html).toContain('aria-label="Notificações"')
    expect(html).not.toContain("notification-center-count")
  })
  it("contador para em 9+", () => {
    const muitas = Array.from({ length: 12 }, (_, i) => ({ id: String(i), title: "x" }))
    expect(em(h(NotificationCenter, { notifications: muitas }))).toMatch(/>9\+</)
  })
})

describe("NotificationList", () => {
  it("marca não lida para o leitor e mostra a descrição", () => {
    const html = em(h(NotificationList, { notifications: itens }))
    expect(html.match(/data-unread="true"/g)?.length).toBe(2)
    expect(html).toContain("Não lida")
    expect(html).toContain("Ana respondeu")
    expect(html).toContain("Marcar todas como lidas")
  })
  it("vazia mostra o aviso e esconde marcar todas", () => {
    const html = em(h(NotificationList, { notifications: [] }))
    expect(html).toContain("Nenhuma notificação")
    expect(html).not.toContain("Marcar todas")
  })
})
