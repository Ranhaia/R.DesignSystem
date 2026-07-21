import { ArrowUpRight, TrendingUp, Users, Zap } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const stats = [
  {
    label: "Projetos ativos",
    value: "12",
    progress: 68,
    icon: Zap,
    hint: "68% da meta do trimestre",
  },
  {
    label: "Usuários no time",
    value: "8",
    progress: 40,
    icon: Users,
    hint: "3 convites pendentes",
  },
  {
    label: "Taxa de conclusão",
    value: "92%",
    progress: 92,
    icon: TrendingUp,
    hint: "+4pp vs. mês anterior",
  },
]

const activity = [
  { name: "Landing page v2", status: "Em progresso", owner: "RA" },
  { name: "Design system tokens", status: "Concluído", owner: "RA" },
  { name: "Onboarding corretores", status: "Em revisão", owner: "MP" },
  { name: "App mobile — sinistros", status: "Bloqueado", owner: "JS" },
]

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  "Em progresso": "default",
  Concluído: "secondary",
  "Em revisão": "outline",
  Bloqueado: "destructive",
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Visão geral
        </h1>
        <p className="text-muted-foreground text-sm">
          Guia visual dos tokens — troque o estilo no seletor da barra
          lateral e veja o efeito nos componentes abaixo, todos ao vivo.
        </p>
      </div>

      {/* Cards de estatística — mostram primary, chart e progress juntos */}
      <div className="grid gap-4 md:grid-cols-3">
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

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Botões, badges e controles — superfície que mais reage ao token primary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Componentes de ação</CardTitle>
            <CardDescription>
              Botões, badges e controles usam --primary, --secondary e
              --destructive diretamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Button>Padrão</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="outline">Contorno</Button>
              <Button variant="ghost">Fantasma</Button>
              <Button variant="destructive">Destrutivo</Button>
              <Button variant="link">
                Link <ArrowUpRight className="size-3.5" />
              </Button>
            </div>

            <Separator />

            <div className="flex flex-wrap items-center gap-2">
              <Badge>Padrão</Badge>
              <Badge variant="secondary">Secundário</Badge>
              <Badge variant="outline">Contorno</Badge>
              <Badge variant="destructive">Destrutivo</Badge>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="demo-name">Nome do estilo</Label>
                <Input id="demo-name" placeholder="ex: Violeta" />
              </div>
              <div className="space-y-2">
                <Label>Intensidade</Label>
                <Slider defaultValue={[60]} max={100} step={1} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch id="demo-switch" defaultChecked />
              <Label htmlFor="demo-switch">Aplicar em modo escuro também</Label>
            </div>
          </CardContent>
        </Card>

        {/* Time — avatar + sidebar-primary via AvatarFallback */}
        <Card>
          <CardHeader>
            <CardTitle>Time</CardTitle>
            <CardDescription>Quem está por perto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { initials: "RA", name: "Rafael", role: "Product Design" },
              { initials: "MP", name: "Marina", role: "Pesquisa" },
              { initials: "JS", name: "João", role: "Engenharia" },
            ].map((person) => (
              <div key={person.initials} className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{person.name}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tabela + tabs — testa contraste de texto/bordas com o tema ativo */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade recente</CardTitle>
          <CardDescription>
            Tabela e abas para conferir bordas, hover e estados junto do tema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todos">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="meus">Meus itens</TabsTrigger>
            </TabsList>
            <TabsContent value="todos">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Responsável</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activity.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[row.status]}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Avatar className="ml-auto size-6">
                          <AvatarFallback className="text-[10px]">
                            {row.owner}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="meus">
              <p className="text-muted-foreground py-6 text-center text-sm">
                Filtre pela barra lateral quando as páginas de cada componente
                estiverem prontas.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
