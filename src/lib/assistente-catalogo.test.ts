import { describe, expect, it } from "vitest"

import { itensCatalogo, montarCatalogo, montarInstrucoes, validarResposta } from "./assistente-catalogo"

describe("montarCatalogo", () => {
  const catalogo = montarCatalogo()

  it("traz cada item com o slug que o modelo deve devolver", () => {
    for (const item of itensCatalogo) expect(catalogo).toContain(`slug: ${item.slug})`)
  })

  it("não manda placeholder nem categoria atômica", () => {
    expect(catalogo).not.toMatch(/a preencher/i)
    expect(catalogo).not.toMatch(/\b(Atom|Molecule|Organism)s?\b/)
  })

  it("cabe no prompt com folga", () => {
    expect(montarInstrucoes().length).toBeLessThan(80_000)
  })
})

describe("validarResposta", () => {
  it("converte slug em item com link", () => {
    const r = validarResposta({
      recomendacao: { slug: "combobox", motivo: "muitas opções" },
      alternativas: [{ slug: "select", quandoPreferir: "lista curta" }],
      faltaContexto: null,
    })
    expect(r.item?.href).toBe("/components/combobox")
    expect(r.alternativas.map((a) => a.item.href)).toEqual(["/components/select"])
  })

  it("aceita pattern", () => {
    const r = validarResposta({ recomendacao: { slug: "pattern:delete-flow", motivo: "" }, alternativas: [], faltaContexto: null })
    expect(r.item?.href).toBe("/patterns/delete-flow")
  })

  it("descarta slug inventado, repetido e a própria recomendação nas alternativas", () => {
    const r = validarResposta({
      recomendacao: { slug: "super-modal", motivo: "x" },
      alternativas: [
        { slug: "dialog", quandoPreferir: "a" },
        { slug: "dialog", quandoPreferir: "b" },
        { slug: "nao-existe", quandoPreferir: "c" },
      ],
      faltaContexto: "  ",
    })
    expect(r.item).toBeNull()
    expect(r.alternativas.map((a) => a.item.slug)).toEqual(["dialog"])
    expect(r.faltaContexto).toBeNull()
  })
})
