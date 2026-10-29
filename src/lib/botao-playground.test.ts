import { describe, expect, it } from "vitest"
import { partesDoBotao } from "./botao-playground"

// Playground do Button: o que aparece dentro do botão e em que ordem. Cobre o pedido do Rafael (ícone liga/desliga,
// à esquerda ou à direita) e o defeito antigo: tamanhos icon-* renderizavam um botão vazio.
const base = { size: "default", icone: false, posicao: "esquerda", loading: false } as const
const tamanhosIcone = ["icon", "icon-xs", "icon-sm", "icon-lg"]
const tamanhosTexto = ["xs", "sm", "default", "lg"]

describe("partesDoBotao", () => {
  it("sem ícone, só o rótulo", () => {
    expect(partesDoBotao(base)).toEqual(["rotulo"])
  })

  it("ícone ligado à esquerda vem antes do rótulo", () => {
    expect(partesDoBotao({ ...base, icone: true })).toEqual(["icone", "rotulo"])
  })

  it("ícone ligado à direita vem depois do rótulo", () => {
    expect(partesDoBotao({ ...base, icone: true, posicao: "direita" })).toEqual(["rotulo", "icone"])
  })

  it("posição não faz nada com o ícone desligado", () => {
    expect(partesDoBotao({ ...base, posicao: "direita" })).toEqual(["rotulo"])
  })

  it("loading sem ícone põe o spinner antes do rótulo, como já era", () => {
    expect(partesDoBotao({ ...base, loading: true })).toEqual(["icone", "rotulo"])
  })

  it("loading com ícone à direita mantém o spinner no lugar do ícone", () => {
    expect(partesDoBotao({ ...base, icone: true, posicao: "direita", loading: true })).toEqual(["rotulo", "icone"])
  })

  it.each(tamanhosIcone)("tamanho %s é só ícone, com o switch ligado ou não, esquerda ou direita", (size) => {
    for (const icone of [false, true]) {
      for (const posicao of ["esquerda", "direita"] as const) {
        expect(partesDoBotao({ ...base, size, icone, posicao })).toEqual(["icone"])
      }
    }
  })

  it.each(tamanhosTexto)("tamanho %s nunca fica vazio", (size) => {
    for (const icone of [false, true]) {
      for (const posicao of ["esquerda", "direita"] as const) {
        for (const loading of [false, true]) {
          expect(partesDoBotao({ size, icone, posicao, loading })).toContain("rotulo")
        }
      }
    }
  })
})
