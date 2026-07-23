"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  ArrowRightIcon,
  ClipboardListIcon,
  InboxIcon,
  LayoutDashboardIcon,
  RefreshCwIcon,
  ServerCrashIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Label } from "@/components/ui/label"
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useFluxoLogin } from "@/components/templates/fluxo-login-context"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Template "Apólices ativas" — Fase 5B do PLANO-LOOP-80-20-TEMPLATES.md, 1ª
// das 3 telas de seguros (apolices-ativas → novo-sinistro → painel-corretor).
// Reaproveita o MECANISMO de 5 Patterns já catalogados (não cópia): a
// composição exata de empty-state.tsx (estado 5 - vazio real), a variante
// compacta de Empty já usada em search-experience.tsx (estado 4 - filtro sem
// resultado), o mecanismo de error-state.tsx (estado 6), o mecanismo de
// skeleton.tsx (estado 1) e o mecanismo de Popover+Checkbox+Badges de
// filters.tsx (filtro por categoria) — aplicados aqui em forma de tabela em
// vez de lista simples. Sidebar mockada no mesmo padrão de
// dashboard-financeiro (SidebarProvider escopado, não é a AppSidebar real).
//
// 2026-07-23: perfil/corretora agora vêm do FluxoLoginContext (decisão
// ratificada por Rafael, ver .build/telas/PENDENCIAS.md item 2.1) — usado
// aqui só pra exibir o nome real da corretora no cabeçalho da sidebar
// mockada (fallback genérico se a tela for aberta direto, sem passar por
// selecao-perfil-corretora). Continua PROVISÓRIO e fora deste Context:
// "Abrir sinistro" navegar para /templates/novo-sinistro sem carregar
// nenhum dado da apólice de origem (número, titular) — é um mecanismo
// diferente (estado específico de 1 registro, não a sessão do fluxo
// inteiro), decisão de 5B ainda em aberto.

type Cenario = "sucesso" | "vazio" | "erro"
type Resultado = Cenario | null

type Apolice = {
  numero: string
  titular: string
  categoria: string
  vigenciaAte: string
  status: "Ativa" | "Renovação em breve"
}

const CATEGORIAS = ["Auto", "Residencial", "Vida", "Saúde", "Empresarial"] as const

// "Empresarial" fica deliberadamente sem nenhuma apólice ativa no mock, pra
// o estado 4 (filtro aplicado, sem resultados) ser alcançável organicamente.
const MOCK_APOLICES: Apolice[] = [
  { numero: "AP-1042", titular: "Carla Souza", categoria: "Auto", vigenciaAte: "14/03/2027", status: "Ativa" },
  { numero: "AP-1098", titular: "Marina Prado", categoria: "Residencial", vigenciaAte: "02/11/2026", status: "Renovação em breve" },
  { numero: "AP-1157", titular: "João Batista", categoria: "Vida", vigenciaAte: "28/06/2027", status: "Ativa" },
  { numero: "AP-1203", titular: "Renata Alves", categoria: "Auto", vigenciaAte: "19/09/2026", status: "Renovação em breve" },
  { numero: "AP-1244", titular: "Eduardo Lima", categoria: "Saúde", vigenciaAte: "05/01/2027", status: "Ativa" },
  { numero: "AP-1289", titular: "Beatriz Nunes", categoria: "Residencial", vigenciaAte: "22/04/2027", status: "Ativa" },
  { numero: "AP-1312", titular: "Felipe Rocha", categoria: "Auto", vigenciaAte: "11/12/2026", status: "Renovação em breve" },
  { numero: "AP-1355", titular: "Aline Cardoso", categoria: "Vida", vigenciaAte: "30/07/2027", status: "Ativa" },
  { numero: "AP-1398", titular: "Diego Martins", categoria: "Saúde", vigenciaAte: "17/02/2027", status: "Ativa" },
  { numero: "AP-1421", titular: "Patrícia Gomes", categoria: "Residencial", vigenciaAte: "09/10/2026", status: "Renovação em breve" },
]

export default function ApolicesAtivasTemplate() {
  const { selecao } = useFluxoLogin()
  const [cenario, setCenario] = React.useState<Cenario>("sucesso")
  const [carregando, setCarregando] = React.useState(true)
  const [resultado, setResultado] = React.useState<Resultado>(null)
  const [categoriasSelecionadas, setCategoriasSelecionadas] = React.useState<
    string[]
  >([])

  const erroRef = React.useRef<HTMLDivElement>(null)

  function carregar(cenarioAtual: Cenario) {
    setCarregando(true)
    window.setTimeout(() => {
      setCarregando(false)
      setResultado(cenarioAtual)
    }, 900)
  }

  // Carregamento inicial — mesmo cenário "sucesso" como padrão do Select.
  React.useEffect(() => {
    carregar("sucesso")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (resultado === "erro") {
      erroRef.current?.focus()
    }
  }, [resultado])

  function toggleCategoria(categoria: string) {
    setCategoriasSelecionadas((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    )
  }

  const apolicesFiltradas =
    categoriasSelecionadas.length === 0
      ? MOCK_APOLICES
      : MOCK_APOLICES.filter((apolice) =>
          categoriasSelecionadas.includes(apolice.categoria)
        )

  let descricaoStatus: string
  if (carregando) {
    descricaoStatus = "Carregando apólices..."
  } else if (resultado === "sucesso") {
    descricaoStatus = `${apolicesFiltradas.length} apólice${
      apolicesFiltradas.length === 1 ? "" : "s"
    } encontrada${apolicesFiltradas.length === 1 ? "" : "s"}`
  } else if (resultado === "vazio") {
    descricaoStatus = "Nenhuma apólice cadastrada"
  } else {
    descricaoStatus = "Não foi possível carregar as apólices"
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Apólices ativas
        </h1>
        <p className="text-muted-foreground text-sm">
          Composição de Organisms/Molecules/Atoms já existentes no catálogo —
          nenhuma peça nova foi criada. 1ª das 3 telas de seguros (Fase 5B),
          cobrindo listagem/filtro. Reaproveita o mecanismo dos Patterns
          &ldquo;Skeleton&rdquo;, &ldquo;Filters&rdquo;, &ldquo;Empty
          state&rdquo;, &ldquo;Search experience&rdquo; e &ldquo;Error
          state&rdquo; aplicados em forma de tabela.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Label htmlFor="cenario-carregamento" className="text-sm">
            Cenário de carregamento (demonstração)
          </Label>
          <Select
            value={cenario}
            onValueChange={(valor) => setCenario(valor as Cenario)}
          >
            <SelectTrigger id="cenario-carregamento" size="sm" className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sucesso">Sucesso — apólices carregadas</SelectItem>
              <SelectItem value="vazio">Vazio — nenhuma apólice cadastrada</SelectItem>
              <SelectItem value="erro">Erro ao carregar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full rounded-lg border">
        <SidebarProvider className="min-h-[720px]">
          <Sidebar collapsible="none" className="h-full">
            <SidebarHeader className="p-3 text-sm font-medium">
              {selecao?.corretora ?? "Portal do corretor"}
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Portal do corretor</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/templates/painel-corretor">
                        <LayoutDashboardIcon />
                        <span>Painel</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive aria-current="page">
                      <ShieldCheckIcon />
                      <span>Apólices</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/templates/novo-sinistro">
                        <ClipboardListIcon />
                        <span>Sinistros</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <div className="min-w-0 flex-1 p-4 md:p-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle asChild>
                    <h2>Apólices ativas</h2>
                  </CardTitle>
                  <CardDescription aria-live="polite">
                    {descricaoStatus}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Ambiente de demonstração</Badge>
                  {/* 2026-07-23: aria-disabled em vez de disabled nativo —
                      evita o salto de foco pro <body> (ver button.tsx). */}
                  <Button
                    variant="outline"
                    size="sm"
                    aria-disabled={carregando}
                    aria-busy={carregando}
                    onClick={() => {
                      if (!carregando) carregar(cenario)
                    }}
                  >
                    <RefreshCwIcon />
                    Atualizar
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                {carregando ? (
                  <div aria-busy="true" className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-24" />
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                      ))}
                    </div>
                    <p aria-live="polite" className="sr-only">
                      Carregando apólices
                    </p>
                  </div>
                ) : resultado === "erro" ? (
                  <Alert variant="destructive">
                    <ServerCrashIcon />
                    <AlertTitle ref={erroRef} tabIndex={-1}>
                      Não foi possível carregar as apólices
                    </AlertTitle>
                    <AlertDescription>
                      <p>Verifique sua conexão e tente novamente.</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => carregar(cenario)}
                      >
                        <RefreshCwIcon />
                        Tentar novamente
                      </Button>
                    </AlertDescription>
                  </Alert>
                ) : resultado === "vazio" ? (
                  <Empty className="border">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <InboxIcon />
                      </EmptyMedia>
                      <EmptyTitle asChild>
                        <h3>Nenhuma apólice encontrada</h3>
                      </EmptyTitle>
                      <EmptyDescription>
                        Ainda não existem apólices cadastradas para este
                        cliente. Crie a primeira apólice para começar.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button
                        onClick={() =>
                          toast("Abrir formulário de nova apólice")
                        }
                      >
                        Nova apólice
                      </Button>
                    </EmptyContent>
                  </Empty>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            <SlidersHorizontalIcon />
                            Filtros
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 space-y-3">
                          <p className="text-sm font-medium">Categoria</p>
                          {CATEGORIAS.map((categoria) => (
                            <div
                              key={categoria}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`filtro-${categoria}`}
                                checked={categoriasSelecionadas.includes(
                                  categoria
                                )}
                                onCheckedChange={() =>
                                  toggleCategoria(categoria)
                                }
                              />
                              <Label htmlFor={`filtro-${categoria}`}>
                                {categoria}
                              </Label>
                            </div>
                          ))}
                        </PopoverContent>
                      </Popover>

                      {categoriasSelecionadas.map((categoria) => (
                        <Badge
                          key={categoria}
                          variant="secondary"
                          className="gap-1"
                        >
                          {categoria}
                          <button
                            type="button"
                            aria-label={`Remover filtro ${categoria}`}
                            onClick={() => toggleCategoria(categoria)}
                            className="rounded-full hover:bg-secondary-foreground/10"
                          >
                            <XIcon className="size-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    {apolicesFiltradas.length === 0 ? (
                      <Empty className="py-8">
                        <EmptyTitle asChild>
                          <h3>Nenhuma apólice para os filtros selecionados</h3>
                        </EmptyTitle>
                        <EmptyDescription>
                          Tente remover algum filtro para ver mais resultados.
                        </EmptyDescription>
                      </Empty>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead scope="col">Número da apólice</TableHead>
                            <TableHead scope="col">Titular</TableHead>
                            <TableHead scope="col">Categoria</TableHead>
                            <TableHead scope="col">Vigência até</TableHead>
                            <TableHead scope="col">Status</TableHead>
                            <TableHead scope="col">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {apolicesFiltradas.map((apolice) => (
                            <TableRow key={apolice.numero}>
                              <TableCell>{apolice.numero}</TableCell>
                              <TableCell>{apolice.titular}</TableCell>
                              <TableCell>{apolice.categoria}</TableCell>
                              <TableCell>{apolice.vigenciaAte}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    apolice.status === "Ativa"
                                      ? "default"
                                      : "outline"
                                  }
                                >
                                  {apolice.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href="/templates/novo-sinistro">
                                    Abrir sinistro
                                    <ArrowRightIcon />
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}
