import { describe, expect, it } from "vitest"
import { relatorioComponentes, type ResultadoStory } from "./relatorio-componentes"

const alvoSwitch = {
  elemento: "button[data-slot=switch][role=switch]",
  largura: 32,
  altura: 18,
  resultado: "reprova" as const,
  motivo: "menor que 24×24 e sem espaçamento de 24px",
  casa: true,
}

const base = (contexto: string, extra: Partial<ResultadoStory> = {}): ResultadoStory => ({
  storyId: "ui-switch--padrao",
  contexto,
  axe: [],
  alvos: [],
  focos: [],
  ...extra,
})

describe("relatório de componentes", () => {
  it("junta o mesmo achado de contextos diferentes numa linha só", () => {
    const md = relatorioComponentes(
      [base("default/claro", { alvos: [alvoSwitch] }), base("tech/escuro", { alvos: [alvoSwitch] })],
      ["default/claro", "tech/escuro"]
    )
    const linhas = md.split("\n").filter((l) => l.includes("32×18"))
    expect(linhas).toHaveLength(1)
    expect(linhas[0]).toContain("default/claro, tech/escuro")
    expect(md).toMatch(/\| ui-switch \| reprovou \|/)
  })

  it("componente só abaixo de 44×44 passa com 🟡", () => {
    const md = relatorioComponentes(
      [
        base("default/claro", {
          storyId: "ui-button--padrao",
          alvos: [{ ...alvoSwitch, elemento: "button", largura: 36, altura: 36, resultado: "passa", motivo: undefined }],
        }),
      ],
      ["default/claro"]
    )
    expect(md).toMatch(/\| ui-button \| passou \(🟡\) \| 0 \| 1 \|/)
  })

  it("violação do axe entra com severidade traduzida", () => {
    const md = relatorioComponentes(
      [
        base("default/claro", {
          axe: [{ regra: "button-name", impacto: "critical", ajuda: "Buttons must have discernible text", alvos: ["button"] }],
        }),
      ],
      ["default/claro"]
    )
    expect(md).toContain("button-name")
    expect(md).toContain("crítica")
  })

  it("story que quebrou aparece, nunca some em silêncio", () => {
    const md = relatorioComponentes([base("default/claro", { erro: "TypeError: x" })], ["default/claro"])
    expect(md).toContain("TypeError: x")
  })

  it("é determinístico: a ordem de entrada não muda a saída", () => {
    const a = [base("default/claro", { alvos: [alvoSwitch] }), base("tech/escuro", { storyId: "ui-badge--padrao" })]
    expect(relatorioComponentes(a, ["default/claro", "tech/escuro"])).toBe(
      relatorioComponentes([...a].reverse(), ["default/claro", "tech/escuro"])
    )
  })

  it("quando aparece nos 10 contextos escreve 'todos' em vez da lista", () => {
    const todos10 = [
      "default/claro", "default/escuro",
      "editorial/claro", "editorial/escuro",
      "tech/claro", "tech/escuro",
      "soft/claro", "soft/escuro",
      "midnight/claro", "midnight/escuro",
    ]
    const rs = todos10.map((c) => base(c, { alvos: [alvoSwitch] }))
    const md = relatorioComponentes(rs, todos10)
    const linhas = md.split("\n").filter((l) => l.includes("32×18"))
    expect(linhas).toHaveLength(1)
    expect(linhas[0]).toContain("| todos |")
  })

  it("seção Causas comuns agrupa achados idênticos e ordena por ocorrências", () => {
    const focoA = {
      elemento: "button",
      largura: 3,
      cor: "#A9A8A7",
      fundo: "#F5F3F1",
      razao: 2.14,
      resultado: "reprova" as const,
      motivo: "contraste 2.14:1 (mínimo 3:1)",
    }
    const focoB = {
      elemento: "input",
      largura: 1,
      cor: "#000",
      fundo: "#FFF",
      razao: 21,
      resultado: "reprova" as const,
      motivo: "contorno de 1px (mínimo 2px)",
    }
    const rs = [
      base("default/claro", { focos: [focoA] }),
      base("tech/claro", { storyId: "ui-input--padrao", focos: [focoA] }),
      base("default/claro", { storyId: "ui-select--padrao", focos: [focoB] }),
    ]
    const md = relatorioComponentes(rs, ["default/claro", "tech/claro"])
    expect(md).toContain("## Causas comuns")
    expect(md).toMatch(/contraste 2,14:1 \(mínimo 3:1\)[\s\S]*contorno de 1px \(mínimo 2px\)/)
  })
  it("| e quebra de linha num texto não quebram a tabela", () => {
    const md = relatorioComponentes(
      [base("default/claro", { erro: "falhou\nlinha 2", axe: [{ regra: "x", impacto: "minor", ajuda: "a | b", alvos: ["button"] }] })],
      ["default/claro"]
    )
    const linhas = md.split("\n").filter((l) => l.includes("axe: x") || l.includes("falhou"))
    expect(linhas.length).toBeGreaterThan(0)
    // toda linha dessas tabelas tem 6 colunas: 7 barras sem escape
    for (const l of linhas) expect(l.replace(/\\\|/g, "").split("|").length).toBe(8)
    expect(md).not.toMatch(/^linha 2/m)
  })
  it("tira os códigos de cor ANSI da mensagem de erro", () => {
    const md = relatorioComponentes([base("default/claro", { erro: "\u001b[34mClique\u001b[39m aqui" })], ["default/claro"])
    expect(md).toContain("Clique aqui")
    expect(md).not.toContain("\u001b")
  })
})
