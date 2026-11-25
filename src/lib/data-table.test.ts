import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { DataTable, filtrarLinhas, ordenarLinhas, paraCSV, type ColunaDados } from "@/components/ui/data-table"
import { IdiomaProvider } from "@/lib/idioma"

// data-table: organismo sobre a table. Busca, filtros, seleção em lote,
// colunas visíveis, ordenação e exportar CSV.

type Linha = { id: string; nome: string; status: string; valor: number }
const dados: Linha[] = [
  { id: "1", nome: "Ana", status: "Pago", valor: 30 },
  { id: "2", nome: "bruno", status: "Pendente", valor: 5 },
  { id: "3", nome: "Célia", status: "Pago", valor: 120 },
]
const colunas: ColunaDados<Linha>[] = [
  { chave: "nome", titulo: "Nome", ordenavel: true },
  { chave: "status", titulo: "Status", filtravel: true },
  { chave: "valor", titulo: "Valor", ordenavel: true },
]

describe("filtrarLinhas", () => {
  it("busca em qualquer coluna, sem caixa nem acento", () => {
    expect(filtrarLinhas(dados, colunas, "celia", {}).map((l) => l.id)).toEqual(["3"])
    expect(filtrarLinhas(dados, colunas, "PEND", {}).map((l) => l.id)).toEqual(["2"])
  })
  it("filtro por coluna aceita vários valores", () => {
    expect(filtrarLinhas(dados, colunas, "", { status: ["Pago"] }).map((l) => l.id)).toEqual(["1", "3"])
    expect(filtrarLinhas(dados, colunas, "", { status: [] })).toHaveLength(3)
  })
})

describe("ordenarLinhas", () => {
  it("número é número, texto ignora caixa", () => {
    expect(ordenarLinhas(dados, { chave: "valor", direcao: "asc" }).map((l) => l.valor)).toEqual([5, 30, 120])
    expect(ordenarLinhas(dados, { chave: "nome", direcao: "desc" }).map((l) => l.id)).toEqual(["3", "2", "1"])
  })
  it("sem ordem devolve a original e não muda o array", () => {
    const copia = [...dados]
    ordenarLinhas(dados, { chave: "valor", direcao: "desc" })
    expect(dados).toEqual(copia)
    expect(ordenarLinhas(dados, null)).toEqual(dados)
  })
})

describe("paraCSV", () => {
  it("cabeçalho, aspas e quebra de linha", () => {
    const csv = paraCSV([{ id: "1", nome: 'A "b", c', status: "x\ny", valor: 1 }], colunas)
    expect(csv).toBe('Nome,Status,Valor\r\n"A ""b"", c","x\ny",1')
  })
  it("neutraliza fórmula de planilha", () => {
    const csv = paraCSV([{ id: "1", nome: "=HYPERLINK(1)", status: "+1", valor: -3 }], colunas)
    expect(csv.split("\r\n")[1]).toBe("'=HYPERLINK(1),'+1,-3")
  })
})

describe("DataTable", () => {
  const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
    const el = h(DataTable<Linha>, { dados, colunas, "aria-label": "Faturas", ...props })
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }

  it("monta sobre a table com barra de ferramentas", () => {
    const s = html()
    expect(s).toContain('data-slot="data-table"')
    expect(s).toContain('data-slot="table"')
    expect(s).toContain('data-slot="data-table-toolbar"')
    expect(s).toContain('aria-label="Buscar na tabela"')
    expect(s).toContain("Exportar CSV")
    expect(s.match(/data-slot="table-row"/g)).toHaveLength(4)
  })

  it("coluna ordenável anuncia a ordem", () => {
    const s = html({ ordemInicial: { chave: "valor", direcao: "asc" } })
    expect(s).toContain('aria-sort="ascending"')
    expect(s.match(/aria-sort="none"/g)).toHaveLength(1)
  })

  it("seleção em lote: checkbox por linha e no cabeçalho", () => {
    const s = html({ selecionavel: true })
    expect(s.match(/role="checkbox"/g)).toHaveLength(4)
    expect(s).toContain('aria-label="Selecionar todas as linhas"')
  })

  it("lista vazia mostra o vazio, ou o motivo dado", () => {
    expect(html({ dados: [] })).toContain("Nenhum resultado encontrado.")
    expect(html({ dados: [], vazio: "Nenhuma fatura ainda" })).toContain("Nenhuma fatura ainda")
  })

  it("coluna numérica alinha à direita", () => {
    const s = html({ colunas: [...colunas.slice(0, 2), { chave: "valor", titulo: "Valor", numerica: true }] })
    expect(s.match(/text-right/g)?.length).toBe(4)
  })

  it("fala inglês com o provider", () => {
    const s = html({ selecionavel: true }, "en")
    expect(s).toContain('aria-label="Search the table"')
    expect(s).toContain("Export CSV")
    expect(s).not.toMatch(/Buscar|Exportar|Selecionar/)
  })
})
