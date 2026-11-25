import type { MaterialSymbol } from "material-symbols"

import Link from "next/link"

import { CatalogCard } from "@/components/catalog-card"
import { categoryDescriptions, categoryTitles } from "@/components/atomic-index"
import { atomicRegistry, categoryHref, contagemPorCamada, type AtomicCategory } from "@/lib/atomic-registry"
import { componentDocs } from "@/lib/component-docs"
import { componentsList } from "@/lib/components-registry"
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
import { Icon } from "@/components/ui/icon"
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

const stats: {
  label: string
  value: string
  progress: number
  icon: MaterialSymbol
  hint: string
}[] = [
  {
    label: "Projetos ativos",
    value: "12",
    progress: 68,
    icon: "bolt",
    hint: "68% da meta do trimestre",
  },
  {
    label: "Usuários no time",
    value: "8",
    progress: 40,
    icon: "group",
    hint: "3 convites pendentes",
  },
  {
    label: "Taxa de conclusão",
    value: "92%",
    progress: 92,
    icon: "trending_up",
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

const camadas = Object.keys(categoryTitles) as AtomicCategory[]

export default function Home() {
  const contagem = contagemPorCamada()
  return (
    <div className="flex flex-1 flex-col gap-10">
      <header className="max-w-prose space-y-3">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">R.DS</h1>
        <p className="text-muted-foreground">
          Sistema de componentes em Atomic Design: tokens, primitivos, atoms, molecules e organisms,
          todos ao vivo. Troque o estilo no seletor da barra lateral e veja o efeito.
        </p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/fundamentos">Começar pelos fundamentos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/fundamentos/componentes">Ver componentes</Link>
          </Button>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
        {camadas.map((c) => (
          <Link key={c} href={categoryHref[c]} className="bg-background p-4 outline-none transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring">
            <dd className="font-heading text-3xl font-semibold tabular-nums">{contagem[c]}</dd>
            <dt className="text-sm text-muted-foreground">{categoryTitles[c]}</dt>
          </Link>
        ))}
      </dl>

      {camadas.map((c) => {
        const itens = componentsList.filter((i) => atomicRegistry[i.slug] === c)
        return (
          <section key={c} aria-labelledby={`camada-${c}`} className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 id={`camada-${c}`} className="font-heading text-xl font-semibold tracking-tight">
                  {categoryTitles[c]}
                </h2>
                <p className="text-sm text-muted-foreground">{categoryDescriptions[c]}</p>
              </div>
              <Link href={categoryHref[c]} className="text-sm text-primary underline-offset-4 hover:underline">
                Ver todos
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {itens.slice(0, 4).map((i) => (
                <CatalogCard key={i.slug} href={`/components/${i.slug}`} name={i.name} description={componentDocs[i.slug]?.description} />
              ))}
            </div>
          </section>
        )
      })}

      <section className="flex flex-col gap-6" aria-labelledby="tokens-ao-vivo">
      <div>
        <h2 id="tokens-ao-vivo" className="font-heading text-xl font-semibold tracking-tight">
          Tokens ao vivo
        </h2>
        <p className="text-muted-foreground text-sm">
          Componentes reais lendo os tokens do estilo ativo.
        </p>
      </div>

      {/* Cards de estatística — mostram primary, chart e progress juntos */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <Icon name={stat.icon} className="text-muted-foreground" size={1} />
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
                Link <Icon name="arrow_outward" size={0.875} />
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
      </section>
    </div>
  )
}
