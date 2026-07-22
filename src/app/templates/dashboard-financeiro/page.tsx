"use client"

import { Bar, BarChart, Cell } from "recharts"
import {
  BarChart3Icon,
  BellIcon,
  ClipboardListIcon,
  FileTextIcon,
  HandCoinsIcon,
  HeadsetIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  TargetIcon,
  UserIcon,
  WalletIcon,
  WalletCardsIcon,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Attachment, AttachmentContent, AttachmentMedia, AttachmentTitle, AttachmentDescription } from "@/components/ui/attachment"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Message, MessageAvatar, MessageContent, MessageHeader } from "@/components/ui/message"
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
import { Slider } from "@/components/ui/slider"

// Template "Dashboard financeiro" — Fase 4 do PLANO-LOOP-80-20-TEMPLATES.md.
// Equivalente em variedade de composição ao print de referência (Contribution
// History, Claimable Balance, Set a new milestone, Payout Threshold, QR
// connect, New Chat + sidebar agrupada), domínio traduzido para PT-BR e
// adaptado (não é cópia do conteúdo original). Só reaproveita peças já
// confirmadas nas Fases 2 e 3 — nenhum componente novo foi criado aqui.
//
// A "sidebar" abaixo é uma peça mockada dentro do Template (igual ao padrão
// já usado em examples/sidebar-demo.tsx, com SidebarProvider próprio) — não é
// a navegação real do portal, que continua na AppSidebar global.

const navGroups = [
  {
    label: "Planejamento",
    items: [
      { name: "Metas", icon: TargetIcon },
      { name: "Contribuições", icon: HandCoinsIcon },
    ],
  },
  {
    label: "Suporte",
    items: [
      { name: "Central de ajuda", icon: LifeBuoyIcon },
      { name: "Novo chat", icon: MessageSquareIcon },
    ],
  },
  {
    label: "Visão geral",
    items: [
      { name: "Painel", icon: LayoutDashboardIcon, active: true },
      { name: "Relatórios", icon: BarChart3Icon },
    ],
  },
  {
    label: "Conta",
    items: [
      { name: "Perfil", icon: UserIcon },
      { name: "Conectar carteira", icon: WalletCardsIcon },
    ],
  },
]

const contributionData = [
  { semana: "Sem 1", valor: 420 },
  { semana: "Sem 2", valor: 680 },
  { semana: "Sem 3", valor: 510 },
  { semana: "Sem 4", valor: 790 },
  { semana: "Sem 5", valor: 640 },
  { semana: "Sem 6", valor: 860 },
]

// Antes era 1 cor hardcoded (#2563eb) pra todas as barras — Rafael pediu
// pra usar as paletas do DS em vez de azul fixo. Aplicamos a escala
// categórica (10 hues, ver globals.css "PRIMITIVOS GLOBAIS DE COR" —
// construída justamente pra tabela/gráfico) 1 cor por barra via <Cell>,
// pra realmente mostrar a paleta funcionando no chart, não só documentada
// em token. chartConfig.valor.color fica só como cor de referência (usada
// se algum tooltip/legenda genérico do shadcn precisar de --color-valor).
const chartColors = [
  "var(--color-categorical-1)",
  "var(--color-categorical-6)",
  "var(--color-categorical-8)",
  "var(--color-categorical-4)",
  "var(--color-categorical-9)",
  "var(--color-categorical-2)",
]

const chartConfig = {
  valor: {
    label: "Contribuição",
    color: "var(--color-categorical-1)",
  },
} satisfies ChartConfig

export default function DashboardFinanceiroTemplate() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Dashboard financeiro
        </h1>
        <p className="text-muted-foreground text-sm">
          Composição de Organisms/Molecules/Atoms já existentes no catálogo —
          nenhuma peça nova foi criada. Conteúdo fictício, só pra validar a
          variedade de composição (cards, form, slider, chat, QR, sidebar
          agrupada).
        </p>
      </div>

      <div className="w-full rounded-lg border">
        <SidebarProvider className="min-h-[880px]">
          <Sidebar collapsible="none" className="h-full">
            <SidebarHeader className="p-3 text-sm font-medium">
              Recompensas
            </SidebarHeader>
            <SidebarContent>
              {navGroups.map((group) => (
                <SidebarGroup key={group.label}>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton isActive={item.active}>
                          <item.icon />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>

          <div className="min-w-0 flex-1 space-y-4 p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Claimable Balance — stat card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>Saldo disponível para resgate</CardDescription>
                  <WalletIcon className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-2xl font-bold">R$ 1.284,00</div>
                  <p className="text-muted-foreground text-xs">
                    Liberado após atingir a meta do mês
                  </p>
                  <Button size="sm" className="w-full">
                    Resgatar
                  </Button>
                </CardContent>
              </Card>

              {/* Contribution History — chart card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Histórico de contribuições</CardTitle>
                  <CardDescription>Últimas 6 semanas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[160px] w-full">
                    <BarChart accessibilityLayer data={contributionData}>
                      <Bar dataKey="valor" radius={4}>
                        {contributionData.map((entry, index) => (
                          <Cell
                            key={entry.semana}
                            fill={chartColors[index % chartColors.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Set a new milestone — form card com Button Group + Alert Dialog */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Definir nova meta</CardTitle>
                  <CardDescription>Crie um novo alvo de contribuição</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="meta-nome">Nome da meta</Label>
                      <Input id="meta-nome" placeholder="Ex: Reserva do trimestre" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="meta-valor">Valor alvo</Label>
                      <Input id="meta-valor" placeholder="R$ 0,00" />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <ButtonGroup className="w-full">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          Cancelar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Descartar nova meta?</AlertDialogTitle>
                          <AlertDialogDescription>
                            As informações preenchidas neste formulário serão
                            perdidas.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Continuar editando</AlertDialogCancel>
                          <AlertDialogAction>Descartar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button className="flex-1">Criar</Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>

              {/* Payout Threshold — slider card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Limite de repasse</CardTitle>
                  <CardDescription>
                    Valor mínimo para liberar o próximo repasse
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Slider defaultValue={[65]} max={100} step={1} />
                  <div className="text-muted-foreground flex justify-between text-xs">
                    <span>R$ 0</span>
                    <span>R$ 2.000</span>
                  </div>
                </CardContent>
              </Card>

              {/* QR connect */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Conectar via QR code</CardTitle>
                  <CardDescription>Escaneie no app para vincular a conta</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-3">
                  <div className="bg-muted flex size-28 items-center justify-center rounded-md">
                    <QrCodeIcon className="text-muted-foreground size-16" />
                  </div>
                  <Badge variant="outline">Aguardando conexão</Badge>
                </CardContent>
              </Card>

              {/* Card com item colapsável — Accordion */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Detalhes da conta</CardTitle>
                  <CardDescription>Informações e preferências</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="dados">
                      <AccordionTrigger>
                        <span className="flex items-center gap-2">
                          <FileTextIcon className="size-4" />
                          Dados cadastrais
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        Nome, CPF/CNPJ e endereço de cobrança usados nos
                        repasses.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="recebimento">
                      <AccordionTrigger>
                        <span className="flex items-center gap-2">
                          <ClipboardListIcon className="size-4" />
                          Método de recebimento
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        Pix cadastrado como forma padrão de repasse.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="seguranca">
                      <AccordionTrigger>
                        <span className="flex items-center gap-2">
                          <ShieldCheckIcon className="size-4" />
                          Segurança
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        Verificação em duas etapas ativada.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* New Chat — Message + Bubble/Attachment + input de envio */}
              <Card className="lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base">Novo chat</CardTitle>
                    <CardDescription>Suporte · Marina Pereira</CardDescription>
                  </div>
                  <BellIcon className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Message align="start">
                      <MessageAvatar>
                        <Avatar>
                          <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                      <MessageContent>
                        <MessageHeader>Marina · 09:14</MessageHeader>
                        <p className="bg-muted rounded-xl px-3 py-2 text-sm">
                          Oi! Vi que sua meta do trimestre está quase lá.
                        </p>
                      </MessageContent>
                    </Message>

                    <Message align="end">
                      <MessageContent>
                        <MessageHeader>Você · 09:16</MessageHeader>
                        <p className="bg-primary text-primary-foreground rounded-xl px-3 py-2 text-sm">
                          Faltam só R$ 340. Vou anexar o comprovante da última
                          contribuição.
                        </p>
                      </MessageContent>
                    </Message>

                    <Attachment className="max-w-sm">
                      <AttachmentMedia>
                        <FileTextIcon />
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>comprovante-contribuicao.pdf</AttachmentTitle>
                        <AttachmentDescription>128 KB</AttachmentDescription>
                      </AttachmentContent>
                    </Attachment>
                  </div>

                  <InputGroup>
                    <InputGroupInput placeholder="Escreva uma mensagem..." />
                    <InputGroupAddon align="inline-end">
                      <MessageCircleIcon className="size-4" />
                    </InputGroupAddon>
                  </InputGroup>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button size="sm" variant="outline">
                    <HeadsetIcon className="size-4" />
                    Falar com humano
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}
