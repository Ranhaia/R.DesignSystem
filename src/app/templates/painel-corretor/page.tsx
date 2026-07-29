"use client"

import * as React from "react"
import Link from "next/link"

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
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Icon } from "@/components/ui/icon"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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

// Template "Painel do corretor" — Fase 5B do PLANO-LOOP-80-20-TEMPLATES.md,
// 3ª e última das 3 telas de seguros (apolices-ativas → novo-sinistro →
// painel-corretor). Papel diferente das 2 telas irmãs: este é o HUB do
// portal — o item "Painel" da sidebar mockada das outras 2 telas sempre
// aponta pra cá, então esta rota é navegacionalmente o ponto de
// entrada/retorno, não o fim de uma corrente linear.
//
// Reaproveita 3 mecanismos já catalogados, não cópia: o card de estatística
// simples de dashboard-financeiro ("Saldo disponível" → 3 cards de KPI sem
// gráfico), o Pattern search-experience.tsx (busca em tempo real com
// aria-live) adaptado ao domínio tabular, e o Pattern pagination.tsx (slice
// de array sobre Table) — primeira tela do projeto a de fato renderizar
// <Pagination> dentro de uma jornada.
//
// PROVISÓRIO (ver .build/telas/painel-corretor.md, "Lacunas" itens 1-3):
// nenhum dado é recebido de outra tela (mesma decisão das 2 fronteiras
// anteriores de 5B); os 3 cards de KPI são estáticos (só o card de lista
// passa pelo Select de cenário); os números de KPI são fictícios, não
// derivados matematicamente do mock de 23 sinistros da tabela.

type Cenario = "sucesso" | "vazio" | "erro"
type Resultado = Cenario | null

type StatusSinistro = "Em análise" | "Aprovado" | "Negado"

type Sinistro = {
  protocolo: string
  apolice: string
  titular: string
  tipo: string
  dataAbertura: string
  status: StatusSinistro
}

const TITULARES = [
  "Carla Souza",
  "Marina Prado",
  "João Batista",
  "Renata Alves",
  "Eduardo Lima",
  "Beatriz Nunes",
  "Felipe Rocha",
  "Aline Cardoso",
  "Diego Martins",
  "Patrícia Gomes",
  "Bruno Teixeira",
  "Camila Duarte",
  "Lucas Ferreira",
  "Juliana Ramos",
  "Rafael Nogueira",
  "Fernanda Castro",
  "Vinícius Barros",
  "Tatiane Xavier",
  "Rodrigo Melo",
  "Isabela Correia",
  "Thiago Farias",
  "Gabriela Santos",
  "Marcelo Pinto",
] as const

// Mesmas 5 opções de novo-sinistro (Lacunas item 7 — reaplicado aqui só
// como coluna de exibição, sem filtro/relação real com a apólice).
const TIPOS_SINISTRO = [
  "Colisão/acidente",
  "Roubo ou furto",
  "Incêndio",
  "Danos a terceiros",
  "Outro",
] as const

const STATUS_CICLO: StatusSinistro[] = ["Em análise", "Aprovado", "Negado"]

// Determinístico (sem Math.random/Date.now) — evita mismatch de hidratação
// entre servidor e cliente no mock desta tela.
function gerarDataAbertura(index: number): string {
  const dia = String(1 + ((index * 3) % 28)).padStart(2, "0")
  const mes = String(1 + ((index * 2) % 12)).padStart(2, "0")
  return `${dia}/${mes}/2026`
}

// Volume do mock: 23 sinistros fictícios, pageSize 5 (5 páginas) — mesmo
// volume já validado no Pattern pagination.tsx real, reaproveitado de
// propósito.
const MOCK_SINISTROS: Sinistro[] = TITULARES.map((titular, index) => ({
  protocolo: `SIN-2026-${1001 + index}`,
  apolice: `AP-${2001 + index}`,
  titular,
  tipo: TIPOS_SINISTRO[index % TIPOS_SINISTRO.length],
  dataAbertura: gerarDataAbertura(index),
  status: STATUS_CICLO[index % STATUS_CICLO.length],
}))

const PAGE_SIZE = 5

export default function PainelCorretorTemplate() {
  const { selecao } = useFluxoLogin()
  const [cenario, setCenario] = React.useState<Cenario>("sucesso")
  const [carregando, setCarregando] = React.useState(true)
  const [resultado, setResultado] = React.useState<Resultado>(null)
  const [busca, setBusca] = React.useState("")
  const [pagina, setPagina] = React.useState(1)

  const erroRef = React.useRef<HTMLDivElement>(null)

  function carregar(cenarioAtual: Cenario) {
    setCarregando(true)
    window.setTimeout(() => {
      setCarregando(false)
      setResultado(cenarioAtual)
    }, 900)
  }

  // Carregamento inicial — mesmo cenário "sucesso" como padrão do Select,
  // mesmo mecanismo das 2 telas irmãs.
  React.useEffect(() => {
    carregar("sucesso")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (resultado === "erro") {
      erroRef.current?.focus()
    }
  }, [resultado])

  const termo = busca.trim().toLowerCase()
  const sinistrosFiltrados =
    resultado === "sucesso"
      ? MOCK_SINISTROS.filter((sinistro) =>
          `${sinistro.protocolo} ${sinistro.apolice} ${sinistro.titular}`
            .toLowerCase()
            .includes(termo)
        )
      : []

  const totalPaginas = Math.max(
    1,
    Math.ceil(sinistrosFiltrados.length / PAGE_SIZE)
  )
  const paginaAtual = Math.min(pagina, totalPaginas)
  const sinistrosPagina = sinistrosFiltrados.slice(
    (paginaAtual - 1) * PAGE_SIZE,
    paginaAtual * PAGE_SIZE
  )
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  // 2026-07-29: erro usa texto curto/genérico aqui de propósito — o Alert
  // logo abaixo já anuncia a frase completa via role="alert" (AlertTitle);
  // esta CardDescription é a única região aria-live persistente da tela
  // (cobre carregando→carregado nas duas direções), então repetir a frase
  // inteira do Alert geraria o mesmo anúncio 2x. Ver diagnóstico
  // painel-corretor, seção 2.1.
  let descricaoStatus: string
  if (carregando) {
    descricaoStatus = "Carregando sinistros..."
  } else if (resultado === "erro") {
    descricaoStatus = "Erro ao carregar"
  } else if (resultado === "vazio") {
    descricaoStatus = "Nenhum sinistro cadastrado"
  } else if (resultado === "sucesso") {
    descricaoStatus = `${sinistrosFiltrados.length} sinistro${
      sinistrosFiltrados.length === 1 ? "" : "s"
    } encontrado${sinistrosFiltrados.length === 1 ? "" : "s"}`
  } else {
    descricaoStatus = ""
  }

  function statusBadgeVariant(
    status: StatusSinistro
  ): "secondary" | "default" | "destructive" {
    if (status === "Em análise") return "secondary"
    if (status === "Aprovado") return "default"
    return "destructive"
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Painel do corretor
        </h1>
        <p className="text-muted-foreground text-sm">
          Composição de Organisms/Molecules/Atoms já existentes no catálogo —
          nenhuma peça nova foi criada. 3ª e última das 3 telas de seguros
          (Fase 5B), hub do portal com 3 cards de KPI e a lista paginada de
          sinistros. Reaproveita o mecanismo do card de estatística de
          &ldquo;Dashboard financeiro&rdquo; e dos Patterns &ldquo;Search
          experience&rdquo; e &ldquo;Pagination&rdquo;.
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
              <SelectItem value="sucesso">Sucesso — sinistros carregados</SelectItem>
              <SelectItem value="vazio">Vazio — nenhum sinistro cadastrado</SelectItem>
              <SelectItem value="erro">Erro ao carregar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full rounded-lg border">
        <SidebarProvider className="min-h-[720px]">
          <Sidebar collapsible="none" className="hidden h-full md:flex">
            <SidebarHeader className="p-3 text-sm font-medium">
              {selecao?.corretora ?? "Portal do corretor"}
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Portal do corretor</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive aria-current="page">
                      <Icon name="dashboard" />
                      <span>Painel</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/templates/apolices-ativas">
                        <Icon name="verified_user" />
                        <span>Apólices</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/templates/novo-sinistro">
                        <Icon name="checklist" />
                        <span>Sinistros</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <div className="min-w-0 flex-1 space-y-4 p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* KPI 1 — Apólices ativas */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>Apólices ativas</CardDescription>
                  <Icon
                    name="verified_user"
                    className="text-muted-foreground"
                    size={1}
                  />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-muted-foreground text-xs">
                    Distribuídas entre 5 categorias
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/templates/apolices-ativas">Ver apólices</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* KPI 2 — Sinistros em aberto */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>Sinistros em aberto</CardDescription>
                  <Icon
                    name="checklist"
                    className="text-muted-foreground"
                    size={1}
                  />
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-muted-foreground text-xs">
                    5 aguardando documentação
                  </p>
                </CardContent>
              </Card>

              {/* KPI 3 — Sinistros aprovados no mês */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>Sinistros aprovados no mês</CardDescription>
                  <Icon
                    name="bar_chart"
                    className="text-muted-foreground"
                    size={1}
                  />
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="text-2xl font-bold">9</div>
                  <p className="text-muted-foreground text-xs">
                    82% de aprovação
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
                <div>
                  <CardTitle asChild>
                    <h2>Sinistros</h2>
                  </CardTitle>
                  <CardDescription aria-live="polite">
                    {descricaoStatus}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">Ambiente de demonstração</Badge>
                  {/* aria-disabled em vez de disabled nativo — evita o salto
                      de foco pro <body> (ver button.tsx). */}
                  <Button
                    variant="outline"
                    size="sm"
                    aria-disabled={carregando}
                    aria-busy={carregando}
                    onClick={() => {
                      if (!carregando) carregar(cenario)
                    }}
                  >
                    <Icon name="refresh" />
                    Atualizar
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/templates/novo-sinistro">
                      <Icon name="add" />
                      Abrir novo sinistro
                    </Link>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                {carregando ? (
                  <div aria-busy="true" className="space-y-3">
                    <Skeleton className="h-9 w-full sm:w-80" />
                    <div className="space-y-2 rounded-lg border p-4">
                      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : resultado === "erro" ? (
                  <Alert variant="destructive">
                    <Icon name="cloud_off" />
                    <AlertTitle ref={erroRef} tabIndex={-1}>
                      Não foi possível carregar os sinistros
                    </AlertTitle>
                    <AlertDescription>
                      <p>Verifique sua conexão e tente novamente.</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => carregar(cenario)}
                      >
                        <Icon name="refresh" />
                        Tentar novamente
                      </Button>
                    </AlertDescription>
                  </Alert>
                ) : resultado === "vazio" ? (
                  <Empty className="border">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Icon name="inbox" />
                      </EmptyMedia>
                      <EmptyTitle asChild>
                        <h3>Nenhum sinistro cadastrado</h3>
                      </EmptyTitle>
                      <EmptyDescription>
                        Ainda não existem sinistros registrados para esta
                        carteira. Abra o primeiro sinistro para começar.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button asChild>
                        <Link href="/templates/novo-sinistro">
                          Abrir novo sinistro
                        </Link>
                      </Button>
                    </EmptyContent>
                  </Empty>
                ) : (
                  <>
                    <InputGroup>
                      <InputGroupAddon>
                        <Icon name="search" />
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="Buscar por protocolo, apólice ou titular..."
                        value={busca}
                        onChange={(e) => {
                          setBusca(e.target.value)
                          setPagina(1)
                        }}
                        aria-label="Buscar sinistro"
                      />
                    </InputGroup>

                    {sinistrosFiltrados.length === 0 ? (
                      <Empty className="py-8">
                        <EmptyTitle asChild>
                          <h3>Nenhum sinistro para esta busca</h3>
                        </EmptyTitle>
                        <EmptyDescription>
                          Tente buscar por outro protocolo, apólice ou nome de
                          titular.
                        </EmptyDescription>
                      </Empty>
                    ) : (
                      <>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead scope="col">Protocolo</TableHead>
                              <TableHead scope="col">
                                Apólice relacionada
                              </TableHead>
                              <TableHead scope="col">Titular</TableHead>
                              <TableHead scope="col">Tipo</TableHead>
                              <TableHead scope="col">
                                Data de abertura
                              </TableHead>
                              <TableHead scope="col">Status</TableHead>
                              <TableHead scope="col">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sinistrosPagina.map((sinistro) => (
                              <TableRow key={sinistro.protocolo}>
                                <TableCell>{sinistro.protocolo}</TableCell>
                                <TableCell>{sinistro.apolice}</TableCell>
                                <TableCell>{sinistro.titular}</TableCell>
                                <TableCell>{sinistro.tipo}</TableCell>
                                <TableCell>{sinistro.dataAbertura}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={statusBadgeVariant(
                                      sinistro.status
                                    )}
                                  >
                                    {sinistro.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href="/templates/apolices-ativas">
                                      Ver apólice
                                      <Icon name="arrow_forward" />
                                    </Link>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        <Pagination aria-label="Paginação de sinistros">
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                href="#"
                                onClick={(event) => {
                                  event.preventDefault()
                                  setPagina((p) => Math.max(1, p - 1))
                                }}
                              />
                            </PaginationItem>
                            {paginas.map((p) => (
                              <PaginationItem key={p}>
                                <PaginationLink
                                  href="#"
                                  isActive={p === paginaAtual}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    setPagina(p)
                                  }}
                                >
                                  {p}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationNext
                                href="#"
                                onClick={(event) => {
                                  event.preventDefault()
                                  setPagina((p) =>
                                    Math.min(totalPaginas, p + 1)
                                  )
                                }}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </>
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
