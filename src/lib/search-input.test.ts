import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { SearchInput, atalhoDisparou } from "@/components/ui/search-input"
import { IdiomaProvider } from "@/lib/idioma"

// search-input: lupa no início, limpar quando há texto, Esc limpa e atalho
// opcional (uma tecla) que leva o foco ao campo.

const tecla = (key: string, extra: Partial<KeyboardEvent> = {}, alvo: Partial<HTMLElement> = { tagName: "BODY" }) =>
  ({ key, ctrlKey: false, metaKey: false, altKey: false, ...extra, target: { isContentEditable: false, ...alvo } }) as unknown as KeyboardEvent

describe("atalhoDisparou", () => {
  it("dispara com a tecla certa fora de campos", () => {
    expect(atalhoDisparou(tecla("/"), "/")).toBe(true)
    expect(atalhoDisparou(tecla("K"), "k")).toBe(true)
  })
  it("não dispara com outra tecla, sem atalho ou com modificador", () => {
    expect(atalhoDisparou(tecla("a"), "/")).toBe(false)
    expect(atalhoDisparou(tecla("/"), undefined)).toBe(false)
    expect(atalhoDisparou(tecla("k", { ctrlKey: true }), "k")).toBe(false)
  })
  it("não rouba a tecla de quem está digitando", () => {
    expect(atalhoDisparou(tecla("/", {}, { tagName: "INPUT" }), "/")).toBe(false)
    expect(atalhoDisparou(tecla("/", {}, { tagName: "TEXTAREA" }), "/")).toBe(false)
    expect(atalhoDisparou(tecla("/", {}, { tagName: "DIV", isContentEditable: true }), "/")).toBe(false)
  })
})

describe("SearchInput", () => {
  const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
    const el = h(SearchInput, props)
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }

  it("campo de busca com lupa e nome acessível padrão", () => {
    const s = html()
    expect(s).toContain('data-slot="search-input"')
    expect(s).toContain('type="search"')
    expect(s).toContain('aria-label="Buscar"')
    expect(s).toContain('data-slot="icon"')
  })

  it("limpar só aparece quando há texto", () => {
    expect(html()).not.toContain("Limpar busca")
    expect(html({ defaultValue: "abc" })).toContain('aria-label="Limpar busca"')
    expect(html({ value: "abc", onValueChange: () => {} })).toContain('aria-label="Limpar busca"')
  })

  it("atalho mostra a tecla e se anuncia", () => {
    const s = html({ shortcut: "/" })
    expect(s).toContain('aria-keyshortcuts="/"')
    expect(s).toMatch(/<kbd[^>]*>\/<\/kbd>/)
    expect(html()).not.toContain("<kbd")
  })

  it("aria-label explícito vence", () => {
    expect(html({ "aria-label": "Buscar pedidos" })).toContain('aria-label="Buscar pedidos"')
  })

  it("fala inglês com o provider", () => {
    const s = html({ defaultValue: "x" }, "en")
    expect(s).toContain('aria-label="Search"')
    expect(s).toContain('aria-label="Clear search"')
  })
})
