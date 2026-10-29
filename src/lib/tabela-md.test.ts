import { describe, expect, it } from "vitest"

import { celulasTabela, parseMarkdownTable } from "../../scripts/parse-component-md.mjs"
import { mesclarMd } from "../../scripts/registrar-componente.mjs"

// Um tipo de prop pode ter `|` (união de tipos). Dentro de crases ele não separa célula: sem isso o `field` ganhava
// colunas fantasmas na tabela de Props e o registro deixava de ser idempotente.

describe("celulasTabela", () => {
  it("separa as células de uma linha comum", () => {
    expect(celulasTabela("| `a` | b | c |")).toEqual(["`a`", "b", "c"])
  })

  it("pipe dentro de crases não separa célula", () => {
    expect(celulasTabela("| `errors` | `Array<{ message?: string } | undefined>` | — | Erros |")).toEqual([
      "`errors`",
      "`Array<{ message?: string } | undefined>`",
      "—",
      "Erros",
    ])
  })

  it("pipe escapado fora de crases não separa célula", () => {
    expect(celulasTabela("| a \\| b | c |")).toEqual(["a \\| b", "c"])
  })

  it("célula vazia continua existindo", () => {
    expect(celulasTabela("| a |  | c |")).toEqual(["a", "", "c"])
  })
})

describe("parseMarkdownTable", () => {
  it("mantém o tipo com pipe numa célula só", () => {
    const tabela = ["| Prop | Tipo | Padrão | O que faz |", "|---|---|---|---|", "| `e` | `A | B` | — | d |"].join("\n")
    expect(parseMarkdownTable(tabela)).toEqual([["`e`", "`A | B`", "—", "d"]])
  })
})

describe("registro com tipo que tem pipe", () => {
  const coleta = {
    slug: "x",
    partes: ["X"],
    variantes: [],
    tamanhos: [],
    props: [{ nome: "errors", parte: "X", tipo: "`Array<{ m?: string } | undefined>`", padrao: null }],
    tokens: [],
    compoe: [],
  }
  const md = `---
slug: x
---

# X

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| \`errors\` | \`Array<{ m?: string } | undefined>\` | — | Erros do formulário |
`

  it("é idempotente e não cria coluna fantasma", () => {
    const novo = mesclarMd(md, coleta, coleta)
    expect(novo).toBe(md)
    expect(novo).toContain("| `errors` | `Array<{ m?: string } | undefined>` | — | Erros do formulário |")
  })
})
