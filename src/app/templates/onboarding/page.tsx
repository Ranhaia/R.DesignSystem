"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRightIcon,
  CircleAlertIcon,
  PartyPopperIcon,
  RocketIcon,
  RotateCcwIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { useFluxoLogin } from "@/components/templates/fluxo-login-context"
import {
  formatarTelefone,
  NOME_REGEX,
  TELEFONE_MASCARA_MAX_LENGTH,
  TELEFONE_REGEX,
} from "@/lib/field-formatters"

// Template "Onboarding" — Fase 5A do PLANO-LOOP-80-20-TEMPLATES.md, 5ª e
// última rota do fluxo de login (login-simples → login-erro-validacao →
// recuperacao-senha → selecao-perfil-corretora → onboarding). Reaproveita o
// MECANISMO do Pattern multi-step-form.tsx (Progress + aria-live "Etapa X de
// Y" + foco programático no heading de cada etapa) reaplicado com conteúdo
// de onboarding de corretor, dentro do mesmo invólucro Card das 4 telas
// irmãs — não é cópia do Pattern, é o mesmo mecanismo reaplicado. A etapa 2
// (Switch de preferências) usa a composição validada em
// src/components/examples/field-switch.tsx. Nenhuma peça nova.
//
// 2026-07-23: persistência entre selecao-perfil-corretora e esta tela
// resolvida — decisão PROVISÓRIA anterior (100% state-local, sem nada
// entre rotas) foi substituída por Context (ratificado por Rafael, ver
// .build/telas/PENDENCIAS.md item 2.1): fluxo-login-context.tsx, montado
// em src/app/templates/layout.tsx. A tela de boas-vindas final personaliza
// com o nome capturado aqui NA etapa 1 (dado local, faz sentido continuar
// assim — é texto livre digitado nesta própria tela) + perfil/corretora
// vindos do Context (dado que já existia antes de chegar aqui).

const NOMES_ETAPAS = [
  "Dados profissionais",
  "Preferências de notificação",
  "Revisão e confirmação",
] as const

const CARGOS: Record<string, string> = {
  corretor: "Corretor",
  gestor: "Gestor",
  analista: "Analista",
}

// 2026-07-23: regex de telefone/nome movidas pra field-formatters.ts —
// configuração de contexto única (nome vs. nome completo vs. telefone),
// pedida pelo Rafael pra não repetir regex ad hoc por tela (era o caso
// aqui, com uma versão frouxa que aceitava várias formatações soltas em
// vez da máscara oficial). "Nome de exibição" é contexto "nome" (não
// exige espaço/2 palavras — pode ser um nome só ou apelido).

type CenarioConclusao = "sucesso" | "falha"

export default function OnboardingTemplate() {
  const { selecao } = useFluxoLogin()
  const [cenario, setCenario] = React.useState<CenarioConclusao>("sucesso")

  const [step, setStep] = React.useState(0)

  // Etapa 1 — dados profissionais
  const [nomeExibicao, setNomeExibicao] = React.useState("")
  const [cargo, setCargo] = React.useState("")
  const [telefone, setTelefone] = React.useState("")
  const [erroNome, setErroNome] = React.useState<string | null>(null)
  const [erroTelefone, setErroTelefone] = React.useState<string | null>(null)

  // Etapa 2 — preferências de notificação. E-mail vem ligado por padrão
  // (mesmo canal já usado no login), os outros dois desligados.
  const [notifEmail, setNotifEmail] = React.useState(true)
  const [notifPush, setNotifPush] = React.useState(false)
  const [notifSms, setNotifSms] = React.useState(false)

  // Etapa 3 — revisão e confirmação
  const [termosAceitos, setTermosAceitos] = React.useState(false)
  const [erroTermos, setErroTermos] = React.useState(false)

  const [enviando, setEnviando] = React.useState(false)
  const [erroSistema, setErroSistema] = React.useState(false)
  const [concluido, setConcluido] = React.useState(false)

  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const nomeRef = React.useRef<HTMLInputElement>(null)
  const telefoneRef = React.useRef<HTMLInputElement>(null)
  const termosRef = React.useRef<HTMLButtonElement>(null)
  const erroRef = React.useRef<HTMLDivElement>(null)
  const tituloSucessoRef = React.useRef<HTMLDivElement>(null)

  // Foco no heading da etapa a cada troca de step (mesmo mecanismo do
  // multi-step-form.tsx) — exceto no mount inicial, pra não competir com o
  // autoFocus do campo "Nome de exibição" da própria etapa 1: a spec pede os
  // dois (foco no heading ao entrar na etapa 1 E autoFocus no primeiro
  // campo), mas só um pode vencer o foco no mesmo instante. O autoFocus do
  // campo prevalece na entrada inicial (mesmo padrão de todas as telas
  // irmãs, que sempre autoFocam o primeiro campo); o foco no heading passa a
  // valer a partir da 1ª troca real de etapa (Avançar/Voltar), que é o caso
  // crítico de acessibilidade: sem ele, quem usa leitor de tela não tem
  // nenhuma pista de que o conteúdo mudou sem navegação de URL.
  const primeiraRenderizacao = React.useRef(true)
  React.useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  // Foco no primeiro campo inválido da etapa 1 (nome antes de telefone, na
  // ordem visual) — mesmo padrão já auditado em login-erro-validacao.
  React.useEffect(() => {
    if (erroNome) {
      nomeRef.current?.focus()
    } else if (erroTelefone) {
      telefoneRef.current?.focus()
    }
  }, [erroNome, erroTelefone])

  // Foco no Checkbox de termos ao falhar a validação da etapa 3 — o
  // controle que precisa ser corrigido é a marcação em si, não uma
  // mensagem solta.
  React.useEffect(() => {
    if (erroTermos) {
      termosRef.current?.focus()
    }
  }, [erroTermos])

  // Foco no título do banner ao entrar no estado de erro de sistema
  // (estado 8) — mesmo mecanismo já auditado em
  // login-erro-validacao/recuperacao-senha/selecao-perfil-corretora.
  React.useEffect(() => {
    if (erroSistema) {
      erroRef.current?.focus()
    }
  }, [erroSistema])

  // Foco no título da tela de boas-vindas (estado 9) — troca de conteúdo
  // relevante sem navegação de URL, mesmo mecanismo já auditado no
  // confirmacaoRef de recuperacao-senha.
  React.useEffect(() => {
    if (concluido) {
      tituloSucessoRef.current?.focus()
    }
  }, [concluido])

  function handleVoltar() {
    // Guarda: o botão usa aria-disabled (não disabled nativo) durante o
    // envio, então continua clicável no DOM — o bloqueio real é aqui.
    if (enviando) return
    setStep((atual) => Math.max(0, atual - 1))
  }

  function enviar() {
    setErroSistema(false)
    setEnviando(true)

    window.setTimeout(() => {
      if (cenario === "falha") {
        setEnviando(false)
        setErroSistema(true)
        return
      }

      setEnviando(false)
      setConcluido(true)
    }, 1200)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (enviando) return

    if (step === 0) {
      const nomeAparado = nomeExibicao.trim()
      const telefoneAparado = telefone.trim()
      const nomeVazio = !nomeAparado
      // Contexto "nome" (não "nome completo"): não exige espaço, só que
      // seja composto de letras reais — rejeita nome só com número/símbolo.
      const nomeFormatoInvalido = !nomeVazio && !NOME_REGEX.test(nomeAparado)
      const telefoneVazio = !telefoneAparado
      // Contexto "telefone": o valor já chega mascarado (ver
      // handleTelefoneChange) — só falta confirmar que a máscara está
      // completa, não parcial (usuário parou de digitar no meio).
      const telefoneInvalido =
        !telefoneVazio && !TELEFONE_REGEX.test(telefoneAparado)

      if (nomeVazio || nomeFormatoInvalido || telefoneVazio || telefoneInvalido) {
        setErroNome(
          nomeVazio
            ? "Informe seu nome de exibição."
            : nomeFormatoInvalido
              ? "Informe um nome válido (só letras)."
              : null
        )
        setErroTelefone(
          telefoneVazio
            ? "Informe seu telefone."
            : telefoneInvalido
              ? "Informe um telefone válido, com DDD."
              : null
        )
        return
      }

      setErroNome(null)
      setErroTelefone(null)
      setStep(1)
      return
    }

    if (step === 1) {
      setStep(2)
      return
    }

    // Etapa 3 — Concluir
    if (!termosAceitos) {
      setErroTermos(true)
      return
    }

    setErroTermos(false)
    enviar()
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Onboarding
        </h1>
        <p className="text-muted-foreground text-sm">
          Composição de Organisms/Molecules/Atoms já existentes no catálogo —
          nenhuma peça nova foi criada. 5ª e última rota do fluxo de login
          (Fase 5A), destino do caminho feliz de &ldquo;Seleção de
          perfil/corretora&rdquo;. Reaproveita o mecanismo do Pattern
          &ldquo;Multi-step form&rdquo; (Progress + aria-live + foco
          programático) para as 3 etapas de configuração inicial da conta.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Label htmlFor="cenario-conclusao" className="text-sm">
            Cenário de conclusão (demonstração)
          </Label>
          <Select
            value={cenario}
            onValueChange={(valor) => setCenario(valor as CenarioConclusao)}
          >
            <SelectTrigger id="cenario-conclusao" size="sm" className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sucesso">Sucesso</SelectItem>
              <SelectItem value="falha">Falha ao salvar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full rounded-lg border">
        <div className="bg-muted/30 flex min-h-[640px] items-center justify-center p-6">
          <Card className="w-full max-w-lg">
            <CardHeader className="items-center gap-3 text-center">
              <div className="flex w-full justify-center">
                <Badge variant="outline">Ambiente de demonstração</Badge>
              </div>

              {concluido ? (
                <>
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                    <PartyPopperIcon className="size-5" />
                  </div>
                  <CardTitle asChild>
                    <h2 ref={tituloSucessoRef} tabIndex={-1}>
                      Tudo pronto!
                    </h2>
                  </CardTitle>
                  <CardDescription>
                    Sua conta está configurada. Você já pode acessar o portal.
                  </CardDescription>
                </>
              ) : (
                <>
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                    <RocketIcon className="size-5" />
                  </div>
                  <CardTitle asChild>
                    <h2>Vamos configurar sua conta</h2>
                  </CardTitle>
                  <CardDescription>
                    Só mais alguns passos antes de acessar o portal
                  </CardDescription>
                </>
              )}
            </CardHeader>

            {concluido ? (
              <>
                <CardContent>
                  <p className="text-center text-sm">
                    Bem-vindo(a), {nomeExibicao}!
                    {selecao && (
                      <>
                        {" "}
                        Você está conectado como <strong>{selecao.perfil}</strong> na{" "}
                        <strong>{selecao.corretora}</strong>.
                      </>
                    )}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button type="button" fullWidth asChild>
                    <Link href="/templates/painel-corretor">
                      Ir para o Painel do corretor
                      <ArrowRightIcon />
                    </Link>
                  </Button>
                </CardFooter>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="contents">
                <CardContent className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <Progress value={((step + 1) / 3) * 100} />
                    <p
                      aria-live="polite"
                      className="text-muted-foreground text-xs"
                    >
                      Etapa {step + 1} de 3: {NOMES_ETAPAS[step]}
                    </p>
                  </div>

                  <h3
                    ref={headingRef}
                    tabIndex={-1}
                    className="font-heading text-base font-semibold outline-none"
                  >
                    {NOMES_ETAPAS[step]}
                  </h3>

                  {step === 0 && (
                    <div className="flex flex-col gap-4">
                      <Field data-invalid={!!erroNome}>
                        <FieldLabel htmlFor="nome-exibicao">
                          Nome de exibição
                        </FieldLabel>
                        <Input
                          id="nome-exibicao"
                          ref={nomeRef}
                          autoFocus
                          required
                          disabled={enviando}
                          value={nomeExibicao}
                          onChange={(event) => {
                            setNomeExibicao(event.target.value)
                            if (erroNome) setErroNome(null)
                          }}
                          aria-invalid={!!erroNome}
                          aria-describedby={
                            erroNome ? "nome-exibicao-erro" : undefined
                          }
                        />
                        {erroNome && (
                          <FieldError id="nome-exibicao-erro">
                            {erroNome}
                          </FieldError>
                        )}
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="cargo">Cargo/função</FieldLabel>
                        <Select
                          value={cargo}
                          onValueChange={setCargo}
                          disabled={enviando}
                        >
                          <SelectTrigger id="cargo" className="w-full">
                            <SelectValue placeholder="Selecione (opcional)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corretor">Corretor</SelectItem>
                            <SelectItem value="gestor">Gestor</SelectItem>
                            <SelectItem value="analista">Analista</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field data-invalid={!!erroTelefone}>
                        <FieldLabel htmlFor="telefone">Telefone</FieldLabel>
                        <Input
                          id="telefone"
                          ref={telefoneRef}
                          type="tel"
                          placeholder="(11) 91234-5678"
                          disabled={enviando}
                          value={telefone}
                          maxLength={TELEFONE_MASCARA_MAX_LENGTH}
                          onChange={(event) => {
                            setTelefone(formatarTelefone(event.target.value))
                            if (erroTelefone) setErroTelefone(null)
                          }}
                          aria-invalid={!!erroTelefone}
                          aria-describedby={
                            erroTelefone ? "telefone-erro" : undefined
                          }
                        />
                        {erroTelefone && (
                          <FieldError id="telefone-erro">
                            {erroTelefone}
                          </FieldError>
                        )}
                      </Field>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex flex-col gap-4">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldLabel htmlFor="notif-email">
                            Notificações por e-mail
                          </FieldLabel>
                          <FieldDescription>
                            Receba avisos de apólices e sinistros no seu
                            e-mail corporativo.
                          </FieldDescription>
                        </FieldContent>
                        <Switch
                          id="notif-email"
                          checked={notifEmail}
                          onCheckedChange={setNotifEmail}
                          disabled={enviando}
                        />
                      </Field>

                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldLabel htmlFor="notif-push">
                            Notificações push
                          </FieldLabel>
                          <FieldDescription>
                            Receba alertas em tempo real direto no navegador
                            ou app.
                          </FieldDescription>
                        </FieldContent>
                        <Switch
                          id="notif-push"
                          checked={notifPush}
                          onCheckedChange={setNotifPush}
                          disabled={enviando}
                        />
                      </Field>

                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldLabel htmlFor="notif-sms">
                            Alertas por SMS
                          </FieldLabel>
                          <FieldDescription>
                            Receba um SMS para eventos urgentes, como
                            sinistros críticos.
                          </FieldDescription>
                        </FieldContent>
                        <Switch
                          id="notif-sms"
                          checked={notifSms}
                          onCheckedChange={setNotifSms}
                          disabled={enviando}
                        />
                      </Field>
                    </div>
                  )}

                  {step === 2 &&
                    (erroSistema ? (
                      <div className="flex flex-col gap-4">
                        <Alert variant="destructive">
                          <CircleAlertIcon />
                          <AlertTitle ref={erroRef} tabIndex={-1}>
                            Não foi possível concluir sua configuração
                          </AlertTitle>
                          <AlertDescription>
                            Verifique sua conexão e tente novamente.
                          </AlertDescription>
                        </Alert>

                        <Button
                          type="button"
                          variant="outline"
                          fullWidth
                          onClick={enviar}
                        >
                          <RotateCcwIcon />
                          Tentar novamente
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <dt className="text-muted-foreground">
                            Nome de exibição
                          </dt>
                          <dd>{nomeExibicao || "—"}</dd>
                          <dt className="text-muted-foreground">
                            Cargo/função
                          </dt>
                          <dd>{cargo ? CARGOS[cargo] : "—"}</dd>
                          <dt className="text-muted-foreground">Telefone</dt>
                          <dd>{telefone || "—"}</dd>
                          <dt className="text-muted-foreground">
                            Notificações por e-mail
                          </dt>
                          <dd>{notifEmail ? "Ativado" : "Desativado"}</dd>
                          <dt className="text-muted-foreground">
                            Notificações push
                          </dt>
                          <dd>{notifPush ? "Ativado" : "Desativado"}</dd>
                          <dt className="text-muted-foreground">
                            Alertas por SMS
                          </dt>
                          <dd>{notifSms ? "Ativado" : "Desativado"}</dd>
                        </dl>

                        <Field data-invalid={erroTermos}>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="termos"
                              ref={termosRef}
                              checked={termosAceitos}
                              disabled={enviando}
                              onCheckedChange={(checked) => {
                                setTermosAceitos(checked === true)
                                if (erroTermos) setErroTermos(false)
                              }}
                              aria-invalid={erroTermos}
                              aria-describedby={
                                erroTermos ? "termos-erro" : undefined
                              }
                            />
                            <Label htmlFor="termos">
                              Li e aceito os Termos de Uso e a Política de
                              Privacidade
                            </Label>
                          </div>
                          {erroTermos && (
                            <FieldError id="termos-erro">
                              Você precisa aceitar os termos para continuar.
                            </FieldError>
                          )}
                        </Field>
                      </div>
                    ))}
                </CardContent>

                {!erroSistema && (
                  <CardFooter className="flex flex-col gap-4">
                    <div className="flex w-full justify-between">
                      {/* 2026-07-23: aria-disabled em vez de disabled nativo
                          nos dois botões — evita o salto de foco pro <body>
                          quando o botão focado vira "desabilitado" durante o
                          envio (ver button.tsx). handleVoltar já é seguro
                          mesmo chamado no step 0 (Math.max trava em 0). */}
                      <Button
                        type="button"
                        variant="outline"
                        aria-disabled={step === 0 || enviando}
                        onClick={handleVoltar}
                      >
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        aria-disabled={enviando}
                        aria-busy={enviando}
                      >
                        {enviando ? (
                          <>
                            <Spinner aria-hidden="true" />
                            Concluindo...
                          </>
                        ) : step === 2 ? (
                          "Concluir"
                        ) : (
                          "Avançar"
                        )}
                      </Button>
                    </div>

                    <p aria-live="polite" className="sr-only">
                      {enviando ? "Concluindo..." : ""}
                    </p>
                  </CardFooter>
                )}
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
