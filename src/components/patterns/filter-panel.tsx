"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  BarChart3Icon,
  CalendarIcon,
  CheckIcon,
  ClipboardIcon,
  ShieldIcon,
  UserIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"
import { type DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Pattern: Filter Panel — evolução do Pattern "Filters" (Popover+Checkbox,
// 1 campo só) pedida pelo Rafael a partir de uma referência de outra
// seguradora: painel com VÁRIOS campos de filtro (alguns aceitam múltiplos
// valores, outros só 1) onde cada CAMPO carrega um ícone fixo, e esse ícone
// aparece de novo no chip do resultado — reforça visualmente "isto aqui é
// um filtro de Produto", "isto é Corretora", mesmo sem ler o rótulo.
//
// Decisão de modelagem (confirmada com o Rafael): o ícone é por CAMPO, não
// por valor — "Produto A", "Produto B"... "Produto Z" usam todos o mesmo
// ícone de Produto. Mesmo princípio já usado em atomic-registry.ts/
// categoryIcons (nav lateral): 1 fonte única de ícone por categoria,
// reaproveitada em mais de um lugar da tela (aqui: no controle E no chip).
//
// Os 4 "tipos" de campo do painel, cada um com o ícone só no controle E no
// chip resultante:
// - multi-select (Produto): Popover+Command, várias opções ao mesmo tempo,
//   popover não fecha ao marcar um item.
// - busca/single-select (Corretora, Segurado): mesmo mecanismo do Combobox
//   já catalogado (Popover+Command), mas só 1 valor — fecha ao selecionar.
//   Em produção "Segurado ou Tomador" provavelmente busca numa API (texto
//   livre) em vez de uma lista fixa; pro Pattern, uma lista mock demonstra
//   o mecanismo do ícone igual e mantém o componente simples.
// - select (Status): Select nativo já catalogado — cabe bem porque a lista
//   de opções é curta e mutuamente exclusiva.
// - período (Período): Date Picker With Range (já existe como exemplo em
//   src/components/examples/date-picker-with-range.tsx) — sempre "De/Até".
//
// Ícone decorativo dentro do chip leva aria-hidden (pendência sistêmica de
// a11y do catálogo, registrada em .build/telas/PENDENCIAS.md) — aplicado
// certo aqui desde já.

interface Opcao {
  value: string
  label: string
}

const PRODUTOS: Opcao[] = [
  { value: "auto", label: "Auto" },
  { value: "residencial", label: "Residencial" },
  { value: "vida", label: "Vida" },
  { value: "saude", label: "Saúde" },
  { value: "viagem", label: "Viagem" },
]

const CORRETORAS: Opcao[] = [
  { value: "xpto", label: "Corretora XPTO" },
  { value: "alianca", label: "Aliança Corretora" },
  { value: "prime", label: "Prime Seguros" },
]

const SEGURADOS: Opcao[] = [
  { value: "joao", label: "João Pereira" },
  { value: "maria", label: "Maria Silva" },
  { value: "acme", label: "Acme Comércio Ltda" },
]

const STATUS_OPCOES: Opcao[] = [
  { value: "ativa", label: "Ativa" },
  { value: "pendente", label: "Pendente" },
  { value: "cancelada", label: "Cancelada" },
]

// Única fonte do ícone por campo — consumida pelo controle (trigger) e
// pelo chip do resultado. Trocar o ícone de "Produto" aqui muda nos dois
// lugares ao mesmo tempo, sem duplicar.
const CAMPO_ICONE: Record<string, LucideIcon> = {
  produto: BarChart3Icon,
  corretora: ShieldIcon,
  segurado: UserIcon,
  status: ClipboardIcon,
  periodo: CalendarIcon,
}

const COTACOES = [
  { numero: "COT-3011", produto: "auto", corretora: "xpto", segurado: "joao", status: "ativa", data: new Date(2024, 3, 12) },
  { numero: "COT-3012", produto: "residencial", corretora: "alianca", segurado: "maria", status: "pendente", data: new Date(2024, 4, 3) },
  { numero: "COT-3013", produto: "vida", corretora: "xpto", segurado: "acme", status: "cancelada", data: new Date(2024, 4, 20) },
  { numero: "COT-3014", produto: "saude", corretora: "prime", segurado: "joao", status: "ativa", data: new Date(2024, 5, 2) },
  { numero: "COT-3015", produto: "auto", corretora: "prime", segurado: "maria", status: "pendente", data: new Date(2024, 5, 15) },
]

function rotulo(opcoes: Opcao[], value: string) {
  return opcoes.find((o) => o.value === value)?.label ?? value
}

interface ChipAtivo {
  id: string
  campo: string
  icon: LucideIcon
  label: string
  onRemove: () => void
}

export function FilterPanelPattern() {
  const [produtos, setProdutos] = React.useState<string[]>([])
  const [produtoOpen, setProdutoOpen] = React.useState(false)

  const [corretora, setCorretora] = React.useState<string | undefined>()
  const [corretoraOpen, setCorretoraOpen] = React.useState(false)

  const [segurado, setSegurado] = React.useState<string | undefined>()
  const [seguradoOpen, setSeguradoOpen] = React.useState(false)

  const [status, setStatus] = React.useState<string | undefined>()

  const [periodo, setPeriodo] = React.useState<DateRange | undefined>()

  function toggleProduto(value: string) {
    setProdutos((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const chips: ChipAtivo[] = [
    ...produtos.map((value) => ({
      id: `produto-${value}`,
      campo: "Produto",
      icon: CAMPO_ICONE.produto,
      label: rotulo(PRODUTOS, value),
      onRemove: () => toggleProduto(value),
    })),
    ...(corretora
      ? [
          {
            id: "corretora",
            campo: "Corretora",
            icon: CAMPO_ICONE.corretora,
            label: rotulo(CORRETORAS, corretora),
            onRemove: () => setCorretora(undefined),
          },
        ]
      : []),
    ...(segurado
      ? [
          {
            id: "segurado",
            campo: "Segurado ou Tomador",
            icon: CAMPO_ICONE.segurado,
            label: rotulo(SEGURADOS, segurado),
            onRemove: () => setSegurado(undefined),
          },
        ]
      : []),
    ...(status
      ? [
          {
            id: "status",
            campo: "Status",
            icon: CAMPO_ICONE.status,
            label: rotulo(STATUS_OPCOES, status),
            onRemove: () => setStatus(undefined),
          },
        ]
      : []),
    ...(periodo?.from
      ? [
          {
            id: "periodo",
            campo: "Período",
            icon: CAMPO_ICONE.periodo,
            label: periodo.to
              ? `${format(periodo.from, "dd/MM/yyyy")} – ${format(periodo.to, "dd/MM/yyyy")}`
              : format(periodo.from, "dd/MM/yyyy"),
            onRemove: () => setPeriodo(undefined),
          },
        ]
      : []),
  ]

  function limparTudo() {
    setProdutos([])
    setCorretora(undefined)
    setSegurado(undefined)
    setStatus(undefined)
    setPeriodo(undefined)
  }

  const filtradas = COTACOES.filter((c) => {
    if (produtos.length > 0 && !produtos.includes(c.produto)) return false
    if (corretora && c.corretora !== corretora) return false
    if (segurado && c.segurado !== segurado) return false
    if (status && c.status !== status) return false
    if (periodo?.from && c.data < periodo.from) return false
    if (periodo?.to && c.data > periodo.to) return false
    return true
  })

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Produto — multi-select: várias opções, popover fica aberto */}
        <Popover open={produtoOpen} onOpenChange={setProdutoOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <BarChart3Icon aria-hidden="true" />
              Produto
              {produtos.length > 0 && (
                <Badge variant="secondary" className="ml-0.5 rounded-sm px-1">
                  {produtos.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Buscar produto..." />
              <CommandList>
                <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                <CommandGroup>
                  {PRODUTOS.map((opcao) => (
                    <CommandItem
                      key={opcao.value}
                      value={opcao.value}
                      onSelect={() => toggleProduto(opcao.value)}
                    >
                      {opcao.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto",
                          produtos.includes(opcao.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Corretora — busca com 1 valor só: fecha ao selecionar */}
        <Popover open={corretoraOpen} onOpenChange={setCorretoraOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ShieldIcon aria-hidden="true" />
              {corretora ? rotulo(CORRETORAS, corretora) : "Corretora"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Buscar corretora..." />
              <CommandList>
                <CommandEmpty>Nenhuma corretora encontrada.</CommandEmpty>
                <CommandGroup>
                  {CORRETORAS.map((opcao) => (
                    <CommandItem
                      key={opcao.value}
                      value={opcao.value}
                      onSelect={(valor) => {
                        setCorretora(valor === corretora ? undefined : valor)
                        setCorretoraOpen(false)
                      }}
                    >
                      {opcao.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto",
                          corretora === opcao.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Segurado ou Tomador — mesmo mecanismo de Corretora. Em produção
            provavelmente é busca livre contra uma API (CPF/CNPJ ou nome),
            mas o ícone-no-chip funciona igual independente da fonte. */}
        <Popover open={seguradoOpen} onOpenChange={setSeguradoOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <UserIcon aria-hidden="true" />
              {segurado ? rotulo(SEGURADOS, segurado) : "Segurado ou Tomador"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="CPF/CNPJ ou nome..." />
              <CommandList>
                <CommandEmpty>Nenhum resultado.</CommandEmpty>
                <CommandGroup>
                  {SEGURADOS.map((opcao) => (
                    <CommandItem
                      key={opcao.value}
                      value={opcao.value}
                      onSelect={(valor) => {
                        setSegurado(valor === segurado ? undefined : valor)
                        setSeguradoOpen(false)
                      }}
                    >
                      {opcao.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto",
                          segurado === opcao.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Status — Select nativo (lista curta, mutuamente exclusiva) */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger size="sm" className="w-40">
            <ClipboardIcon aria-hidden="true" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPCOES.map((opcao) => (
              <SelectItem key={opcao.value} value={opcao.value}>
                {opcao.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Período — Date Picker With Range (mesmo mecanismo do exemplo já
            catalogado em examples/date-picker-with-range.tsx) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn("gap-1.5", !periodo && "text-muted-foreground")}
            >
              <CalendarIcon aria-hidden="true" />
              {periodo?.from ? (
                periodo.to ? (
                  <>
                    {format(periodo.from, "dd/MM/yy")} –{" "}
                    {format(periodo.to, "dd/MM/yy")}
                  </>
                ) : (
                  format(periodo.from, "dd/MM/yy")
                )
              ) : (
                "Período"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={periodo?.from}
              selected={periodo}
              onSelect={setPeriodo}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {chips.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-2"
          aria-label="Filtros ativos"
        >
          <span className="text-sm font-medium">Filtros ativos:</span>
          {chips.map((chip) => (
            <Badge key={chip.id} variant="secondary" className="gap-1.5">
              <chip.icon aria-hidden="true" />
              {chip.label}
              <button
                type="button"
                aria-label={`Remover filtro ${chip.campo}: ${chip.label}`}
                onClick={chip.onRemove}
                className="rounded-full hover:bg-secondary-foreground/10"
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={limparTudo}>
            Limpar tudo
          </Button>
        </div>
      )}

      <p aria-live="polite" className="text-muted-foreground text-xs">
        {filtradas.length} {filtradas.length === 1 ? "cotação" : "cotações"}{" "}
        encontrada{filtradas.length === 1 ? "" : "s"}
      </p>

      <div className="divide-y rounded-lg border">
        {filtradas.map((item) => (
          <div
            key={item.numero}
            className="flex items-center justify-between px-4 py-2 text-sm"
          >
            <span>{item.numero}</span>
            <span className="text-muted-foreground">
              {rotulo(PRODUTOS, item.produto)} · {rotulo(CORRETORAS, item.corretora)}
            </span>
          </div>
        ))}
        {filtradas.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            Nenhuma cotação para os filtros selecionados.
          </p>
        )}
      </div>
    </div>
  )
}
