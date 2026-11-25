import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { destinoPorMeio, mover, SortableList, teclaNaLista } from "@/components/ui/sortable-list"
import { IdiomaProvider } from "@/lib/idioma"

// sortable-list: reordenar arrastando com mouse, toque e teclado
// (pegar com Espaço/Enter, setas movem, Espaço/Enter solta, Esc cancela).

describe("mover", () => {
  it("tira de um índice e põe no outro, sem mudar o original", () => {
    const a = ["a", "b", "c", "d"]
    expect(mover(a, 0, 2)).toEqual(["b", "c", "a", "d"])
    expect(mover(a, 3, 0)).toEqual(["d", "a", "b", "c"])
    expect(a).toEqual(["a", "b", "c", "d"])
  })
})

describe("destinoPorMeio (ponteiro)", () => {
  // meios dos itens no eixo da lista, em ordem
  const meios = [10, 30, 50, 70]
  it("cai antes do primeiro meio que o ponteiro não passou", () => {
    expect(destinoPorMeio(meios, 0, 5)).toBe(0)
    expect(destinoPorMeio(meios, 0, 40)).toBe(1)
    expect(destinoPorMeio(meios, 0, 99)).toBe(3)
  })
  it("desconta o próprio item ao descer", () => {
    expect(destinoPorMeio(meios, 1, 60)).toBe(2)
    expect(destinoPorMeio(meios, 1, 25)).toBe(1)
  })
})

describe("teclaNaLista (pegar, mover, soltar)", () => {
  const ids = ["a", "b", "c"]
  const livre = { pego: null, origem: null }

  it("seta sem pegar não faz nada", () => {
    expect(teclaNaLista(ids, livre, "b", "ArrowDown")).toBeNull()
  })
  it("Espaço pega, seta move, Enter solta", () => {
    const r1 = teclaNaLista(ids, livre, "b", " ")!
    expect(r1.estado).toEqual({ pego: "b", origem: 1 })
    expect(r1.anuncio).toEqual({ tipo: "pegou", posicao: 2 })
    const r2 = teclaNaLista(ids, r1.estado, "b", "ArrowDown")!
    expect(r2.ordem).toEqual(["a", "c", "b"])
    expect(r2.anuncio).toEqual({ tipo: "moveu", posicao: 3 })
    const r3 = teclaNaLista(r2.ordem!, r2.estado, "b", "Enter")!
    expect(r3.estado).toEqual(livre)
    expect(r3.anuncio).toEqual({ tipo: "soltou", posicao: 3 })
  })
  it("na ponta não passa do limite", () => {
    const pego = { pego: "a", origem: 0 }
    expect(teclaNaLista(ids, pego, "a", "ArrowUp")).toBeNull()
  })
  it("Esc volta para a posição de origem", () => {
    const r = teclaNaLista(["a", "c", "b"], { pego: "b", origem: 1 }, "b", "Escape")!
    expect(r.ordem).toEqual(["a", "b", "c"])
    expect(r.estado).toEqual(livre)
    expect(r.anuncio).toEqual({ tipo: "cancelou", posicao: 2 })
  })
  it("lista horizontal usa ← e →", () => {
    const pego = { pego: "a", origem: 0 }
    expect(teclaNaLista(ids, pego, "a", "ArrowDown", "horizontal")).toBeNull()
    expect(teclaNaLista(ids, pego, "a", "ArrowRight", "horizontal")!.ordem).toEqual(["b", "a", "c"])
  })
})

describe("SortableList", () => {
  const itens = [
    { id: "1", nome: "Revisar" },
    { id: "2", nome: "Testar" },
  ]
  const html = (idioma?: "en") => {
    const el = h(SortableList<(typeof itens)[number]>, {
      "aria-label": "Tarefas",
      itens,
      idDoItem: (i) => i.id,
      rotuloDoItem: (i) => i.nome,
      onReordenar: () => {},
      children: (i) => i.nome,
    })
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }

  it("lista com alça por item, nomeada pelo item, e região de status", () => {
    const s = html()
    expect(s).toContain('data-slot="sortable-list"')
    expect(s).toContain('aria-label="Tarefas"')
    expect(s.match(/data-slot="sortable-list-item"/g)).toHaveLength(2)
    expect(s).toContain('aria-label="Reordenar Revisar"')
    expect(s).toContain('aria-pressed="false"')
    expect(s).toContain('role="status"')
    expect(s).toContain("Espaço para reordenar")
  })

  it("fala inglês com o provider", () => {
    const s = html("en")
    expect(s).toContain('aria-label="Reorder Revisar"')
    expect(s).not.toMatch(/Reordenar|Espaço/)
  })
})
