import { AlertTriangle, FileCheck2, Search, TrendingUp, Wallet } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Página de teste — valida se dá para montar uma tela nova (domínio
// diferente: seguros, não produtividade) reconstruindo o padrão já
// estabelecido em src/app/page.tsx (mesma forma de dado para os cards de
// estatística, mesmo jeito de renderizar a tabela com Badge de status),
// sem copiar o conteúdo, só a estrutura. Nenhum valor de cor/espaçamento
// fixo — tudo via classes de token (bg-card, text-muted-foreground etc.)
// e componentes já existentes em src/components/ui/.

const stats = [
  {
    label: "Apólices ativas",
    value: "1.284",
    progress: 76,
    icon: FileCheck2,
    hint: "76% da meta do trimestre",
  },
  {
    label: "Sinistros em aberto",
    value: "37",
    progress: 32,
    icon: AlertTriangle,
    hint: "12 aguardando vistoria",
  },
  {
    label: "Taxa de renovação",
    value: "91%",
    progress: 91,
    icon: TrendingUp,
    hint: "+4pp vs. mês anterior",
  },
  {
    label: "Prêmio emitido (mês)",
    value: "R$ 482.9k",
    progress: 68,
    icon: Wallet,
    hint: "68% da meta do mês",
  },
]

const apolices = [
  {
    numero: "AP-88213",
    segurado: "Marina Costa Ltda.",
    ramo: "Empresarial",
    status: "Ativa",
    premio: "R$ 12.400",
    corretor: "RA",
  },
  {
    numero: "AP-88240",
    segurado: "João Pereira",
    ramo: "Auto",
    status: "Em análise",
    premio: "R$ 2.180",
    corretor: "MP",
  },
  {
    numero: "AP-88255",
    segurado: "Fernanda Lima",
    ramo: "Residencial",
    status: "Renovada",
    premio: "R$ 1.050",
    corretor: "JS",
  },
  {
    numero: "AP-88261",
    segurado: "Grupo Andrade S.A.",
    ramo: "Vida",
    status: "Cancelada",
    premio: "R$ 640",
    corretor: "RA",
  },
  {
    numero: "AP-88279",
    segurado: "Beatriz Nogueira",
    ramo: "Auto",
    status: "Ativa",
    premio: "R$ 2.760",
    corretor: "MP",
  },
]

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Ativa: "default",
  Renovada: "secondary",
  "Em análise": "outline",
  Cancelada: "destructive",
}

export default function TestePadrao() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Painel de apólices (teste)
        </h1>
        <p className="text-muted-foreground text-sm">
          Tela fictícia, domínio de seguros — gerada para validar se o
          padrão do sistema (cards de estatística, filtros, tabela) se
          reconstrói em outro contexto sem copiar o conteúdo original.
        </p>
      </div>

      {/* Cards de estatística — mesma forma de dado e composição da Visão
          Geral (Card + CardHeader com ícone + CardContent com valor,
          Progress e hint), só que com métricas de seguros. */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <stat.icon className="text-muted-foreground size-4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold">{stat.value}</div>
              <Progress value={stat.progress} />
              <p className="text-muted-foreground text-xs">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtros — Select (Radix, catálogo real) + Input de busca, mesma
          composição horizontal usada em outros exemplos do portal. */}
      <Card>
        <CardHeader>
          <CardTitle>Apólices</CardTitle>
          <CardDescription>
            Filtre por ramo ou status e busque por segurado / número da
            apólice.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Select defaultValue="todos">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Ramo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os ramos</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="residencial">Residencial</SelectItem>
                <SelectItem value="vida">Vida</SelectItem>
                <SelectItem value="empresarial">Empresarial</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="todos">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="em-analise">Em análise</SelectItem>
                <SelectItem value="renovada">Renovada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
              <Input
                placeholder="Buscar por segurado ou nº da apólice"
                className="pl-8"
              />
            </div>
          </div>

          {/* Tabela — mesma composição de Table + Badge de status + Avatar
              de responsável já usada na Visão Geral, com dados de apólice
              no lugar de atividade de projeto. */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Apólice</TableHead>
                <TableHead>Segurado</TableHead>
                <TableHead>Ramo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Prêmio</TableHead>
                <TableHead className="text-right">Corretor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apolices.map((row) => (
                <TableRow key={row.numero}>
                  <TableCell className="font-medium">{row.numero}</TableCell>
                  <TableCell>{row.segurado}</TableCell>
                  <TableCell>{row.ramo}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.premio}</TableCell>
                  <TableCell className="text-right">
                    <Avatar className="ml-auto size-6">
                      <AvatarFallback className="text-[10px]">
                        {row.corretor}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
