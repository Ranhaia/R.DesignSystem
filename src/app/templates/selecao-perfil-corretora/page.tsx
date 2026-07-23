"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleAlertIcon,
  RotateCcwIcon,
  UserCogIcon,
  UserXIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { useFluxoLogin } from "@/components/templates/fluxo-login-context"

// Template "Seleção de perfil/corretora" — Fase 5A do
// PLANO-LOOP-80-20-TEMPLATES.md, 4ª de 5 rotas do fluxo de login
// (login-simples → login-erro-validacao → recuperacao-senha →
// selecao-perfil-corretora → onboarding). Destino do caminho feliz de
// login: deixa escolher com qual combinação perfil+corretora continuar,
// cobrindo o caso de um login com mais de um vínculo. Nenhuma peça nova:
// choice cards via FieldSet/FieldLegend/FieldLabel/RadioGroup, mesmo padrão
// já documentado em src/components/examples/field-choice-card.tsx.
//
// A busca de vínculos é fictícia (setTimeout). Como não há um campo de
// formulário natural para simular erro/vazio (diferente das telas de
// login, em que digitar uma senha errada já demonstra o estado), o
// seletor "Cenário da busca" abaixo controla o resultado simulado —
// só para fins de demonstração deste catálogo, não faz parte da
// composição do Card em si.
type CenarioBusca = "sucesso" | "erro" | "vazio"
type StatusBusca = "carregando" | CenarioBusca

interface OpcaoVinculo {
  id: string
  valor: string
  iniciais: string
  perfil: string
  corretora: string
  descricao: string
}

const OPCOES: OpcaoVinculo[] = [
  {
    id: "opcao-1",
    valor: "corretor-alfa",
    iniciais: "CA",
    perfil: "Corretor",
    corretora: "Corretora Alfa Seguros",
    descricao:
      "Acesso completo às apólices e sinistros da Corretora Alfa Seguros",
  },
  {
    id: "opcao-2",
    valor: "gestor-beta",
    iniciais: "CB",
    perfil: "Gestor",
    corretora: "Corretora Beta Corretagem",
    descricao:
      "Gestão de equipe e relatórios da Corretora Beta Corretagem",
  },
  {
    id: "opcao-3",
    valor: "analista-alfa",
    iniciais: "CA",
    perfil: "Analista",
    corretora: "Corretora Alfa Seguros",
    descricao:
      "Consulta de apólices e sinistros da Corretora Alfa Seguros",
  },
]

export default function SelecaoPerfilCorretoraTemplate() {
  const router = useRouter()
  const { setSelecao } = useFluxoLogin()

  const [cenario, setCenario] = React.useState<CenarioBusca>("sucesso")
  const [statusBusca, setStatusBusca] = React.useState<StatusBusca>(
    "carregando"
  )
  // "" representa "nenhuma opção marcada" — evita alternar o RadioGroup
  // entre controlado (string) e não controlado (undefined) ao limpar a
  // seleção, já que nenhuma opção real usa valor vazio.
  const [selecionado, setSelecionado] = React.useState("")
  const [erroSelecao, setErroSelecao] = React.useState(false)
  const [confirmando, setConfirmando] = React.useState(false)

  const erroRef = React.useRef<HTMLDivElement>(null)
  const primeiroRadioRef = React.useRef<HTMLButtonElement>(null)

  function buscarVinculos(cenarioAlvo: CenarioBusca) {
    setStatusBusca("carregando")
    setSelecionado("")
    setErroSelecao(false)

    window.setTimeout(() => {
      setStatusBusca(cenarioAlvo)
    }, 1000)
  }

  // Busca inicial ao carregar a tela, e sempre que o cenário de
  // demonstração for trocado no seletor.
  React.useEffect(() => {
    buscarVinculos(cenario)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cenario])

  // Foco no primeiro rádio do grupo ao falhar a validação (estado 4) — o
  // controle que precisa ser corrigido é a própria seleção, não a
  // mensagem de erro.
  React.useEffect(() => {
    if (erroSelecao) {
      primeiroRadioRef.current?.focus()
    }
  }, [erroSelecao])

  // Foco no título do banner ao entrar no estado de erro de carregamento
  // (estado 5) — mesmo mecanismo já auditado em login-erro-validacao/
  // recuperacao-senha.
  React.useEffect(() => {
    if (statusBusca === "erro") {
      erroRef.current?.focus()
    }
  }, [statusBusca])

  function handleContinuar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Guarda contra reenvio: o botão "Continuar" usa aria-disabled (não
    // disabled nativo) durante a confirmação — ver comentário no botão.
    if (confirmando) return

    if (!selecionado) {
      setErroSelecao(true)
      return
    }

    setErroSelecao(false)
    setConfirmando(true)

    // Persistência entre telas (Context, decisão ratificada 2026-07-23):
    // grava perfil/corretora escolhidos antes de navegar, pra onboarding
    // (e depois as telas de 5B) conseguirem ler sem repetir a pergunta.
    const opcaoEscolhida = OPCOES.find((opcao) => opcao.valor === selecionado)
    if (opcaoEscolhida) {
      setSelecao({
        perfil: opcaoEscolhida.perfil,
        corretora: opcaoEscolhida.corretora,
      })
    }

    window.setTimeout(() => {
      router.push("/templates/onboarding")
    }, 1200)
  }

  const carregando = statusBusca === "carregando"

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Seleção de perfil/corretora
        </h1>
        <p className="text-muted-foreground text-sm">
          Composição de Organisms/Molecules/Atoms já existentes no catálogo —
          nenhuma peça nova foi criada. 4ª rota do fluxo de login (Fase 5A),
          destino do caminho feliz de &ldquo;Login simples&rdquo; e
          &ldquo;Login — erro de validação&rdquo;. Escolha um perfil e clique
          em &ldquo;Continuar&rdquo; sem selecionar nada para ver o erro de
          validação.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Label htmlFor="cenario-busca" className="text-sm">
            Cenário da busca (demonstração)
          </Label>
          <Select
            value={cenario}
            onValueChange={(valor) => setCenario(valor as CenarioBusca)}
          >
            <SelectTrigger id="cenario-busca" size="sm" className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sucesso">Sucesso (3 vínculos)</SelectItem>
              <SelectItem value="erro">Falha ao carregar</SelectItem>
              <SelectItem value="vazio">Vazio (sem vínculo)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full rounded-lg border">
        <div className="bg-muted/30 flex min-h-[640px] items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader className="items-center gap-3 text-center">
              <div className="flex w-full justify-center">
                <Badge variant="outline">Ambiente de demonstração</Badge>
              </div>
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                <UserCogIcon className="size-5" />
              </div>
              <CardTitle asChild>
                <h2>Escolha como continuar</h2>
              </CardTitle>
              <CardDescription>
                Você tem acesso a mais de um perfil ou corretora — selecione
                com qual deseja continuar
              </CardDescription>
            </CardHeader>

            {carregando && (
              <CardContent>
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-[76px] w-full rounded-md" />
                  <Skeleton className="h-[76px] w-full rounded-md" />
                  <Skeleton className="h-[76px] w-full rounded-md" />
                </div>
                <p aria-live="polite" className="sr-only">
                  Carregando perfis disponíveis...
                </p>
              </CardContent>
            )}

            {statusBusca === "erro" && (
              <CardContent className="flex flex-col gap-4">
                <Alert variant="destructive">
                  <CircleAlertIcon />
                  <AlertTitle ref={erroRef} tabIndex={-1}>
                    Não foi possível carregar seus perfis
                  </AlertTitle>
                  <AlertDescription>
                    Verifique sua conexão e tente novamente.
                  </AlertDescription>
                </Alert>

                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => buscarVinculos(cenario)}
                >
                  <RotateCcwIcon />
                  Tentar novamente
                </Button>
              </CardContent>
            )}

            {statusBusca === "vazio" && (
              <CardContent>
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <UserXIcon />
                    </EmptyMedia>
                    <EmptyTitle asChild>
                      <h3>Nenhum acesso liberado</h3>
                    </EmptyTitle>
                    <EmptyDescription>
                      Sua conta ainda não tem perfil ou corretora vinculados.
                      Fale com o suporte da sua corretora para liberar o
                      acesso.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </CardContent>
            )}

            {statusBusca === "sucesso" && (
              <form onSubmit={handleContinuar} className="contents">
                <CardContent>
                  <FieldSet>
                    <FieldLegend variant="label">
                      Perfil e corretora
                    </FieldLegend>
                    <RadioGroup
                      value={selecionado}
                      onValueChange={(valor) => {
                        setSelecionado(valor)
                        if (erroSelecao) setErroSelecao(false)
                      }}
                      aria-describedby={
                        erroSelecao ? "selecao-erro" : undefined
                      }
                    >
                      {OPCOES.map((opcao, indice) => (
                        <FieldLabel htmlFor={opcao.id} key={opcao.id}>
                          <Field orientation="horizontal">
                            <Avatar>
                              <AvatarFallback>
                                {opcao.iniciais}
                              </AvatarFallback>
                            </Avatar>
                            <FieldContent>
                              <FieldTitle>
                                {opcao.perfil}
                                <Badge variant="secondary">
                                  {opcao.corretora}
                                </Badge>
                              </FieldTitle>
                              <FieldDescription>
                                {opcao.descricao}
                              </FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              value={opcao.valor}
                              id={opcao.id}
                              disabled={confirmando}
                              ref={
                                indice === 0 ? primeiroRadioRef : undefined
                              }
                            />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {erroSelecao && (
                      <FieldError id="selecao-erro">
                        Selecione um perfil para continuar.
                      </FieldError>
                    )}
                  </FieldSet>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  {/* 2026-07-23: aria-disabled em vez de disabled nativo —
                      evita o salto de foco pro <body> quando o botão focado
                      vira "desabilitado" (ver button.tsx). */}
                  <Button
                    type="submit"
                    fullWidth
                    aria-disabled={confirmando}
                    aria-busy={confirmando}
                  >
                    {confirmando ? (
                      <>
                        <Spinner aria-hidden="true" />
                        Continuando...
                      </>
                    ) : (
                      <>
                        <ArrowRightIcon />
                        Continuar
                      </>
                    )}
                  </Button>

                  <p aria-live="polite" className="sr-only">
                    {confirmando ? "Continuando..." : ""}
                  </p>

                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto self-start px-0"
                    asChild
                  >
                    <Link href="/templates/login-simples">
                      <ArrowLeftIcon />
                      Usar outra conta
                    </Link>
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
