"use client"

import * as React from "react"

import { useTexto } from "@/lib/idioma"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Organismo sobre a Table: busca, filtros por coluna, seleção em lote,
// colunas visíveis, ordenação e exportar CSV. A lógica fica em funções puras
// (filtrarLinhas, ordenarLinhas, paraCSV) para valer também fora da tela.

type ColunaDados<T> = {
  chave: keyof T & string
  titulo: string
  /** Cabeçalho vira botão que alterna crescente/decrescente. */
  ordenavel?: boolean
  /** Ganha um filtro com os valores distintos da coluna. */
  filtravel?: boolean
  /** Número: alinha à direita, no cabeçalho e nas células. */
  numerica?: boolean
  /** Começa escondida (o usuário pode mostrar em Colunas). */
  oculta?: boolean
  /** Conteúdo da célula; sem ele, o valor cru. O CSV sempre usa o valor cru. */
  celula?: (linha: T) => React.ReactNode
}

type Ordem<T> = { chave: keyof T & string; direcao: "asc" | "desc" } | null
type Filtros = Record<string, string[]>

const normalizar = (v: unknown) =>
  String(v ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

function filtrarLinhas<T>(linhas: T[], colunas: ColunaDados<T>[], busca: string, filtros: Filtros) {
  const termo = normalizar(busca.trim())
  return linhas.filter(
    (l) =>
      (!termo || colunas.some((c) => normalizar(l[c.chave]).includes(termo))) &&
      Object.entries(filtros).every(([chave, vals]) => !vals.length || vals.includes(String(l[chave as keyof T])))
  )
}

const comparador = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })

function ordenarLinhas<T>(linhas: T[], ordem: Ordem<T>) {
  if (!ordem) return linhas
  const sinal = ordem.direcao === "asc" ? 1 : -1
  return [...linhas].sort((a, b) => {
    const x = a[ordem.chave]
    const y = b[ordem.chave]
    const r = typeof x === "number" && typeof y === "number" ? x - y : comparador.compare(String(x ?? ""), String(y ?? ""))
    return r * sinal
  })
}

function celulaCSV(v: unknown) {
  let s = String(v ?? "")
  // Texto que a planilha leria como fórmula ganha apóstrofo; número negativo não.
  if (typeof v !== "number" && /^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function paraCSV<T>(linhas: T[], colunas: ColunaDados<T>[]) {
  return [colunas.map((c) => celulaCSV(c.titulo)), ...linhas.map((l) => colunas.map((c) => celulaCSV(l[c.chave])))]
    .map((r) => r.join(","))
    .join("\r\n")
}

function baixarCSV(csv: string, nome: string) {
  // BOM: o Excel só lê acentos de CSV em UTF-8 com ele
  const url = URL.createObjectURL(new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }))
  const a = Object.assign(document.createElement("a"), { href: url, download: nome })
  a.click()
  URL.revokeObjectURL(url)
}

function DataTable<T>({
  dados,
  colunas,
  idDaLinha = (_l, i) => String(i),
  selecionavel = false,
  ordemInicial = null,
  nomeArquivo = "dados.csv",
  acoesEmLote,
  vazio,
  className,
  "aria-label": ariaLabel,
}: {
  dados: T[]
  colunas: ColunaDados<T>[]
  /** Identidade estável da linha (a seleção sobrevive a busca e ordem). */
  idDaLinha?: (linha: T, indice: number) => string
  /** Coluna de checkbox e seleção em lote. */
  selecionavel?: boolean
  ordemInicial?: Ordem<T>
  nomeArquivo?: string
  /** Ações que aparecem na barra quando há linhas selecionadas. */
  acoesEmLote?: (selecionadas: T[]) => React.ReactNode
  /** Sem linhas: diga o motivo e o primeiro passo. Padrão: "Nenhum resultado encontrado." */
  vazio?: React.ReactNode
  className?: string
  "aria-label": string
}) {
  const t = useTexto()
  const [busca, setBusca] = React.useState("")
  const [filtros, setFiltros] = React.useState<Filtros>({})
  const [ordem, setOrdem] = React.useState<Ordem<T>>(ordemInicial)
  const [ocultas, setOcultas] = React.useState(() => new Set(colunas.filter((c) => c.oculta).map((c) => c.chave)))
  const [selecao, setSelecao] = React.useState<Set<string>>(new Set())

  const comId = dados.map((l, i) => ({ l, id: idDaLinha(l, i) }))
  const idDe = new Map(comId.map(({ l, id }) => [l, id]))
  const visiveis = colunas.filter((c) => !ocultas.has(c.chave))
  const linhas = ordenarLinhas(filtrarLinhas(dados, colunas, busca, filtros), ordem)
  const selecionadas = comId.filter(({ id }) => selecao.has(id)).map(({ l }) => l)
  const marcadasNaVista = linhas.filter((l) => selecao.has(idDe.get(l)!)).length
  const todas = linhas.length > 0 && marcadasNaVista === linhas.length

  const alternar = (id: string, marcar: boolean) =>
    setSelecao((s) => {
      const n = new Set(s)
      if (marcar) n.add(id)
      else n.delete(id)
      return n
    })

  const ordenarPor = (chave: keyof T & string) =>
    setOrdem((o) => (o?.chave !== chave ? { chave, direcao: "asc" } : o.direcao === "asc" ? { chave, direcao: "desc" } : null))

  return (
    <div data-slot="data-table" className={cn("flex flex-col gap-3", className)}>
      <div data-slot="data-table-toolbar" className="flex flex-wrap items-center gap-2">
        <Input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder={t("comum.buscar")}
          aria-label={t("dataTable.buscar")}
          className="w-full max-w-xs"
        />
        {colunas
          .filter((c) => c.filtravel)
          .map((c) => {
            const marcados = filtros[c.chave] ?? []
            const valores = [...new Set(dados.map((l) => String(l[c.chave] ?? "")))].sort(comparador.compare)
            return (
              <DropdownMenu key={c.chave}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icon name="filter_list" size={1} aria-hidden="true" />
                    {c.titulo}
                    {marcados.length > 0 && <span className="text-muted-foreground">({marcados.length})</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>{t("dataTable.filtrarPor", { coluna: c.titulo })}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {valores.map((v) => (
                    <DropdownMenuCheckboxItem
                      key={v}
                      checked={marcados.includes(v)}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={(on) =>
                        setFiltros((f) => ({ ...f, [c.chave]: on ? [...marcados, v] : marcados.filter((x) => x !== v) }))
                      }
                    >
                      {v}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          })}
        <div className="ml-auto flex items-center gap-2">
          {selecionadas.length > 0 && (
            <>
              <span aria-live="polite" className="text-sm text-muted-foreground">
                {t("dataTable.selecionadas", { n: selecionadas.length })}
              </span>
              {acoesEmLote?.(selecionadas)}
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Icon name="view_column" size={1} aria-hidden="true" />
                {t("dataTable.colunas")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {colunas.map((c) => (
                <DropdownMenuCheckboxItem
                  key={c.chave}
                  checked={!ocultas.has(c.chave)}
                  // a última visível não sai: tabela sem coluna não tem o que mostrar
                  disabled={!ocultas.has(c.chave) && visiveis.length === 1}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={(on) =>
                    setOcultas((s) => {
                      const n = new Set(s)
                      if (on) n.delete(c.chave)
                      else n.add(c.chave)
                      return n
                    })
                  }
                >
                  {c.titulo}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            // com seleção, exporta só as selecionadas; sem, o que a vista mostra
            onClick={() => baixarCSV(paraCSV(selecionadas.length ? ordenarLinhas(selecionadas, ordem) : linhas, visiveis), nomeArquivo)}
          >
            <Icon name="download" size={1} aria-hidden="true" />
            {t("dataTable.exportar")}
          </Button>
        </div>
      </div>

      <Table aria-label={ariaLabel}>
        <TableHeader>
          <TableRow>
            {selecionavel && (
              <TableHead className="w-0">
                <Checkbox
                  aria-label={t("dataTable.selecionarTodas")}
                  checked={todas ? true : marcadasNaVista > 0 ? "indeterminate" : false}
                  onCheckedChange={(on) =>
                    setSelecao((s) => {
                      const n = new Set(s)
                      for (const l of linhas) {
                        if (on === true) n.add(idDe.get(l)!)
                        else n.delete(idDe.get(l)!)
                      }
                      return n
                    })
                  }
                />
              </TableHead>
            )}
            {visiveis.map((c) => {
              const ativa = ordem?.chave === c.chave ? ordem.direcao : null
              return (
                <TableHead
                  key={c.chave}
                  className={cn(c.numerica && "text-right")}
                  aria-sort={c.ordenavel ? (ativa === "asc" ? "ascending" : ativa === "desc" ? "descending" : "none") : undefined}
                >
                  {c.ordenavel ? (
                    <Button variant="ghost" size="sm" className={c.numerica ? "-mr-3" : "-ml-3"} onClick={() => ordenarPor(c.chave)}>
                      {c.titulo}
                      <Icon
                        name={ativa === "asc" ? "arrow_upward" : ativa === "desc" ? "arrow_downward" : "unfold_more"}
                        size={1}
                        aria-hidden="true"
                        className={cn(!ativa && "text-muted-foreground")}
                      />
                    </Button>
                  ) : (
                    c.titulo
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {linhas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visiveis.length + (selecionavel ? 1 : 0)} className="h-24 text-center text-muted-foreground">
                {vazio ?? t("comum.semResultado")}
              </TableCell>
            </TableRow>
          ) : (
            linhas.map((l) => {
              const id = idDe.get(l)!
              const marcada = selecao.has(id)
              return (
                <TableRow key={id} data-state={marcada ? "selected" : undefined}>
                  {selecionavel && (
                    <TableCell>
                      <Checkbox
                        aria-label={t("dataTable.selecionarLinha", { linha: String(l[colunas[0].chave] ?? "") })}
                        checked={marcada}
                        onCheckedChange={(on) => alternar(id, on === true)}
                      />
                    </TableCell>
                  )}
                  {visiveis.map((c) => (
                    <TableCell key={c.chave} className={cn(c.numerica && "text-right tabular-nums")}>{c.celula ? c.celula(l) : String(l[c.chave] ?? "")}</TableCell>
                  ))}
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export { DataTable, filtrarLinhas, ordenarLinhas, paraCSV, type ColunaDados }
