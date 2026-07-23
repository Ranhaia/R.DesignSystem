"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  KeyRoundIcon,
  MailCheckIcon,
  RotateCcwIcon,
  SendIcon,
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

// Template "Recuperação de senha" — Fase 5A do PLANO-LOOP-80-20-TEMPLATES.md,
// 3ª de 5 rotas construídas do fluxo de login (não a 3ª etapa da jornada do
// usuário: quem chega aqui vem do link "Esqueci minha senha" de
// login-simples/login-erro-validacao, e o único caminho de volta é para o
// login — esta tela não autentica ninguém). Cobre só o pedido de
// redefinição (capturar e-mail + confirmar envio + reenvio com cooldown),
// não a definição da nova senha em si. Sem estado de "e-mail não
// encontrado" — decisão de segurança/UX para evitar enumeração de contas
// (ver .build/telas/recuperacao-senha.md, seção "Lacunas"). Nenhuma peça
// nova: só Atoms/Molecules/Organisms já confirmados no catálogo.

const COOLDOWN_SEGUNDOS = 30
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RecuperacaoSenhaTemplate() {
  const [email, setEmail] = React.useState("")
  const [erroEmail, setErroEmail] = React.useState<string | null>(null)
  const [carregando, setCarregando] = React.useState(false)
  const [enviado, setEnviado] = React.useState(false)
  const [cooldown, setCooldown] = React.useState(0)

  const emailRef = React.useRef<HTMLInputElement>(null)
  const confirmacaoRef = React.useRef<HTMLDivElement>(null)

  // Foco no campo de e-mail ao falhar a validação (estado 3) — só dispara
  // quando um erro passa a existir, não quando é limpo pela digitação.
  React.useEffect(() => {
    if (erroEmail) {
      emailRef.current?.focus()
    }
  }, [erroEmail])

  // Foco no título da confirmação ao entrar no estado 5 — o Card troca de
  // conteúdo na mesma rota, sem navegação, então precisa ser anunciado
  // programaticamente (mesmo mecanismo do bannerRef em login-erro-validacao).
  React.useEffect(() => {
    if (enviado) {
      confirmacaoRef.current?.focus()
    }
  }, [enviado])

  // Contagem regressiva do cooldown de reenvio (estado 6) — lógica de
  // estado, sem componente novo.
  React.useEffect(() => {
    if (cooldown <= 0) return

    const id = window.setInterval(() => {
      setCooldown((atual) => Math.max(0, atual - 1))
    }, 1000)

    return () => window.clearInterval(id)
  }, [cooldown])

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
    if (erroEmail) setErroEmail(null)
  }

  function handleEnviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Guarda contra reenvio: o botão "Enviar" usa aria-disabled (não
    // disabled nativo) durante o carregamento — ver comentário no botão.
    if (carregando) return

    const emailAparado = email.trim()
    const emailVazio = !emailAparado
    const emailFormatoInvalido = !emailVazio && !EMAIL_REGEX.test(emailAparado)

    if (emailVazio || emailFormatoInvalido) {
      setErroEmail(
        emailVazio ? "Informe seu e-mail." : "Informe um e-mail válido."
      )
      return
    }

    // Formato válido: não confirma nem nega se o e-mail existe na base
    // (proteção contra enumeração de contas) — sempre segue para o estado
    // de confirmação.
    setErroEmail(null)
    setCarregando(true)

    window.setTimeout(() => {
      setCarregando(false)
      setEnviado(true)
      setCooldown(COOLDOWN_SEGUNDOS)
    }, 1200)
  }

  function handleReenviar() {
    if (cooldown > 0 || carregando) return

    setCarregando(true)
    window.setTimeout(() => {
      setCarregando(false)
      setCooldown(COOLDOWN_SEGUNDOS)
    }, 1200)
  }

  const cooldownFormatado = `00:${cooldown.toString().padStart(2, "0")}`

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Recuperação de senha
        </h1>
        <p className="text-muted-foreground text-sm">
          Composição de Organisms/Molecules/Atoms já existentes no catálogo —
          nenhuma peça nova foi criada. 3ª rota construída do fluxo de login
          (Fase 5A), destino do link &ldquo;Esqueci minha senha&rdquo; de
          &ldquo;Login simples&rdquo; e &ldquo;Login — erro de
          validação&rdquo;. Cobre só o pedido de redefinição (e-mail +
          confirmação + reenvio com cooldown), não a definição da nova senha.
        </p>
      </div>

      <div className="w-full rounded-lg border">
        <div className="bg-muted/30 flex min-h-[640px] items-center justify-center p-6">
          <Card className="w-full max-w-sm">
            <CardHeader className="items-center gap-3 text-center">
              <div className="flex w-full justify-center">
                <Badge variant="outline">Ambiente de demonstração</Badge>
              </div>

              {enviado ? (
                <>
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                    <MailCheckIcon className="size-5" />
                  </div>
                  <CardTitle asChild>
                    <h2>Verifique seu e-mail</h2>
                  </CardTitle>
                  <CardDescription>
                    Enviamos um link de redefinição para {email}
                  </CardDescription>
                </>
              ) : (
                <>
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                    <KeyRoundIcon className="size-5" />
                  </div>
                  <CardTitle asChild>
                    <h2>Esqueceu sua senha?</h2>
                  </CardTitle>
                  <CardDescription>
                    Informe seu e-mail corporativo para receber o link de
                    redefinição
                  </CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent>
              {enviado ? (
                <div className="flex flex-col gap-4">
                  <Alert>
                    <CheckCircle2Icon />
                    <AlertTitle ref={confirmacaoRef} tabIndex={-1}>
                      Link enviado
                    </AlertTitle>
                    <AlertDescription>
                      Não recebeu? Verifique a caixa de spam antes de
                      reenviar.
                    </AlertDescription>
                  </Alert>

                  {/* 2026-07-23: aria-disabled em vez de disabled nativo —
                      evita o salto de foco pro <body> quando o botão focado
                      vira "desabilitado" (ver button.tsx). handleReenviar já
                      guarda `cooldown > 0 || carregando` no início. */}
                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    aria-disabled={cooldown > 0 || carregando}
                    aria-busy={carregando}
                    onClick={handleReenviar}
                  >
                    {carregando ? (
                      <>
                        <Spinner aria-hidden="true" />
                        Reenviando...
                      </>
                    ) : cooldown > 0 ? (
                      <>
                        <RotateCcwIcon />
                        Reenviar em {cooldownFormatado}
                      </>
                    ) : (
                      <>
                        <RotateCcwIcon />
                        Reenviar e-mail
                      </>
                    )}
                  </Button>

                  <p aria-live="polite" className="sr-only">
                    {carregando
                      ? "Reenviando..."
                      : cooldown === 0
                        ? "Você já pode reenviar o e-mail."
                        : ""}
                  </p>

                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto self-start px-0"
                    asChild
                  >
                    <Link href="/templates/login-simples">
                      <ArrowLeftIcon />
                      Voltar para login
                    </Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleEnviar} className="flex flex-col gap-4">
                  <Field data-invalid={!!erroEmail}>
                    <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
                    <Input
                      id="email"
                      ref={emailRef}
                      type="email"
                      placeholder="nome@corretora.com.br"
                      autoComplete="email"
                      autoFocus
                      required
                      disabled={carregando}
                      value={email}
                      onChange={handleEmailChange}
                      aria-invalid={!!erroEmail}
                      aria-describedby={erroEmail ? "email-erro" : undefined}
                    />
                    {erroEmail && (
                      <FieldError id="email-erro">{erroEmail}</FieldError>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    fullWidth
                    aria-disabled={carregando}
                    aria-busy={carregando}
                  >
                    {carregando ? (
                      <>
                        <Spinner aria-hidden="true" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <SendIcon />
                        Enviar link de redefinição
                      </>
                    )}
                  </Button>

                  <p aria-live="polite" className="sr-only">
                    {carregando ? "Enviando..." : ""}
                  </p>

                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto self-start px-0"
                    asChild
                  >
                    <Link href="/templates/login-simples">
                      <ArrowLeftIcon />
                      Voltar para login
                    </Link>
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
