import { describe, expect, it } from "vitest"

import { componentsList } from "./components-registry"
import { buscar, indiceBusca, normalizar } from "./busca-registry"

const primeiro = (termo: string) => buscar(termo)[0]?.itens[0]

describe("normalizar", () => {
  it("ignora acento, caixa e hífen", () => {
    expect(normalizar("Elevação")).toBe("elevacao")
    expect(normalizar("Multi-Select")).toBe("multi select")
  })
})

describe("indiceBusca", () => {
  it("tem todo componente do components-registry, inclusive os sem categoria", () => {
    const slugs = indiceBusca.filter((i) => i.href.startsWith("/components/")).map((i) => i.slug)
    expect(slugs.sort()).toEqual(componentsList.map((c) => c.slug).sort())
  })

  it("não repete href", () => {
    const hrefs = indiceBusca.map((i) => i.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })
})

describe("buscar", () => {
  it("termo vazio devolve o índice inteiro", () => {
    const total = buscar("").reduce((n, g) => n + g.itens.length, 0)
    expect(total).toBe(indiceBusca.length)
  })

  it("nome exato vem primeiro", () => {
    expect(primeiro("button")?.slug).toBe("button")
    expect(primeiro("Dialog")?.slug).toBe("dialog")
  })

  it("acha sem acento e com outra grafia", () => {
    expect(primeiro("elevacao")?.slug).toBe("elevacao")
    expect(primeiro("multiselect")?.slug).toBe("multi-select")
    expect(primeiro("input otp")?.slug).toBe("input-otp")
  })

  it("aceita palavras fora de ordem", () => {
    expect(primeiro("dialog alert")?.slug).toBe("alert-dialog")
  })

  it("prefixo traz o que começa com o termo antes do que só contém", () => {
    const itens = buscar("tog").flatMap((g) => g.itens).map((i) => i.slug)
    expect(itens).toContain("toggle")
    expect(itens).toContain("toggle-group")
  })

  it("grupo com resultado exato sobe acima de grupo com resultado parcial", () => {
    expect(buscar("loading")[0]?.grupo).toBe("pattern")
  })

  it("termo sem correspondência devolve vazio", () => {
    expect(buscar("xyzzy")).toEqual([])
  })
})
