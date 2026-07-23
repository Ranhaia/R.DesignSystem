"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CircleAlertIcon,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
  ShieldCheckIcon,
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"

// Template "Login — erro de validação" — Fase 5A do PLANO-LOOP-80-20-
// TEMPLATES.md, 2ª de 5 rotas do fluxo de login (login-simples →
// login-erro-validacao → recuperacao-senha → selecao-perfil-corretora →
// onboarding). Mesmo formulário de login-simples, em estados de erro: (1/2)
// validação client-side (campo obrigatório vazio / e-mail com formato
// inválido) e (3) rejeição do backend ("e-mail ou senha incorretos"), que
// convivem no mesmo formulário. Nenhuma peça nova: Alert + FieldError do
// catálogo, sem componente novo.
//
// Senha de demonstração para simular sucesso no reenvio: "corretor123"
// (8+ caracteres). Qualquer outra senha válida em formato simula
// "credenciais incorretas" de novo.
const SENHA_DEMO_CORRETA = "corretor123"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginErroValidacaoTemplate() {
  const router = useRouter()

  const [email, setEmail] = React.useState("corretor@exemplo.com.br")
  const [senha, setSenha] = React.useState("")
  const [senhaVisivel, setSenhaVisivel] = React.useState(false)
  const [manterConectado, setManterConectado] = React.useState(false)
  const [carregando, setCarregando] = React.useState(false)

  const [erroEmail, setErroEmail] = React.useState<string | null>(null)
  const [erroSenha, setErroSenha] = React.useState<string | null>(null)
  // Estado inicial já entra com o banner de credenciais incorretas visível
  // (estado 3), pedido explícito da especificação — é o estado mais rico
  // visualmente e precisa ficar demonstrável assim que a tela carrega.
  const [erroCredenciais, setErroCredenciais] = React.useState(true)

  const emailRef = React.useRef<HTMLInputElement>(null)
  const senhaRef = React.useRef<HTMLInputElement>(null)
  const bannerRef = React.useRef<HTMLDivElement>(null)

  // Foco no primeiro campo inválido (estados 1 e 2) — e-mail antes de
  // senha, na ordem visual. Só dispara quando um erro de campo passa a
  // existir (não quando é limpo pela digitação).
  React.useEffect(() => {
    if (erroEmail) {
      emailRef.current?.focus()
    } else if (erroSenha) {
      senhaRef.current?.focus()
    }
  }, [erroEmail, erroSenha])

  // Foco no banner de credenciais incorretas (estado 3). O valor da senha
  // já foi limpo (setSenha("")) no mesmo evento que ativa erroCredenciais
  // antes deste efeito rodar — o .focus() do banner sempre roda depois da
  // limpeza do campo, nunca antes (evita leitura de estado inconsistente).
  React.useEffect(() => {
    if (erroCredenciais) {
      bannerRef.current?.focus()
    }
  }, [erroCredenciais])

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
    // Corrigindo (estado 4): cada campo limpa seu próprio erro ao ser
    // editado, sem esperar um novo envio.
    if (erroEmail) setErroEmail(null)
    if (erroCredenciais) setErroCredenciais(false)
  }

  function handleSenhaChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSenha(event.target.value)
    if (erroSenha) setErroSenha(null)
    if (erroCredenciais) setErroCredenciais(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Guarda contra reenvio: o botão "Entrar" usa aria-disabled (não
    // disabled nativo) durante o carregamento — ver comentário no botão.
    if (carregando) return

    const emailAparado = email.trim()
    const emailVazio = !emailAparado
    const emailFormatoInvalido = !emailVazio && !EMAIL_REGEX.test(emailAparado)
    const senhaVazia = !senha

    const proximoErroEmail = emailVazio
      ? "Informe seu e-mail."
      : emailFormatoInvalido
        ? "Informe um e-mail válido."
        : null
    const proximoErroSenha = senhaVazia ? "Informe sua senha." : null

    // Estados 1/2: erro de campo. Não sobrepõe com o erro de credenciais —
    // o erro é do campo, não da combinação, então o banner some.
    if (proximoErroEmail || proximoErroSenha) {
      setErroCredenciais(false)
      setErroEmail(proximoErroEmail)
      setErroSenha(proximoErroSenha)
      return
    }

    // Formato válido nos dois campos: reenvia (estado 5, carregando).
    setErroEmail(null)
    setErroSenha(null)
    setErroCredenciais(false)
    setCarregando(true)

    window.setTimeout(() => {
      if (senha === SENHA_DEMO_CORRETA) {
        // Estado 6: sucesso, mesmo destino de login-simples.
        router.push("/templates/selecao-perfil-corretora")
        return
      }

      // Estado 3: credenciais incorretas — limpa a senha (boa prática de
      // segurança) antes de sinalizar o erro; o efeito que foca o banner
      // roda só depois, já com a senha limpa.
      setCarregando(false)
      setSenha("")
      setErroCredenciais(true)
    }, 1200)
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Login, erro de validação
        </h1>
        <p className="text-muted-foreground text-sm">
          Mesmo formulário de &ldquo;Login simples&rdquo; em estado de erro —
          2ª tela do fluxo de login (Fase 5A). A tela já carrega no estado de
          credenciais incorretas (banner). Deixe e-mail ou senha em branco,
          ou digite um e-mail sem &ldquo;@&rdquo;, para ver os erros de
          campo. Senha de demonstração para simular sucesso no reenvio:{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            corretor123
          </code>
          .
        </p>
      </div>

      <div className="w-full rounded-lg border">
        <div className="bg-muted/30 flex min-h-[640px] items-center justify-center p-6">
          <Card className="w-full max-w-sm">
            <CardHeader className="items-center gap-3 text-center">
              <div className="flex w-full justify-center">
                <Badge variant="outline">Ambiente de demonstração</Badge>
              </div>
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                <ShieldCheckIcon className="size-5" />
              </div>
              <CardTitle asChild>
                <h2>Entrar</h2>
              </CardTitle>
              <CardDescription>
                Acesse o portal com sua conta de corretor
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {erroCredenciais && (
                  <Alert variant="destructive">
                    <CircleAlertIcon />
                    <AlertTitle ref={bannerRef} tabIndex={-1}>
                      E-mail ou senha incorretos
                    </AlertTitle>
                    <AlertDescription>
                      Confira os dados e tente novamente.
                    </AlertDescription>
                  </Alert>
                )}

                <Field data-invalid={!!erroEmail}>
                  <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
                  <Input
                    id="email"
                    ref={emailRef}
                    type="email"
                    placeholder="nome@corretora.com.br"
                    autoComplete="username"
                    required
                    disabled={carregando}
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={!!erroEmail}
                    aria-describedby={erroEmail ? "email-erro" : undefined}
                  />
                  {erroEmail && <FieldError id="email-erro">{erroEmail}</FieldError>}
                </Field>

                <Field data-invalid={!!erroSenha}>
                  <FieldLabel htmlFor="senha">Senha</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="senha"
                      ref={senhaRef}
                      type={senhaVisivel ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                      disabled={carregando}
                      value={senha}
                      onChange={handleSenhaChange}
                      aria-invalid={!!erroSenha}
                      aria-describedby={erroSenha ? "senha-erro" : undefined}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        size="icon-xs"
                        aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                        aria-pressed={senhaVisivel}
                        disabled={carregando}
                        onClick={() => setSenhaVisivel((visivel) => !visivel)}
                      >
                        {senhaVisivel ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {erroSenha && <FieldError id="senha-erro">{erroSenha}</FieldError>}
                </Field>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="manter-conectado"
                      checked={manterConectado}
                      onCheckedChange={(checked) =>
                        setManterConectado(checked === true)
                      }
                      disabled={carregando}
                    />
                    <Label htmlFor="manter-conectado">Manter-me conectado</Label>
                  </div>

                  <Button variant="link" size="sm" className="h-auto px-0" asChild>
                    <Link href="/templates/recuperacao-senha">
                      Esqueci minha senha
                    </Link>
                  </Button>
                </div>

                {/* 2026-07-23: aria-disabled em vez de disabled nativo —
                    evita o salto de foco pro <body> quando o botão focado
                    vira "desabilitado" durante o loading (ver comentário
                    equivalente em button.tsx). */}
                <Button
                  type="submit"
                  fullWidth
                  aria-disabled={carregando}
                  aria-busy={carregando}
                >
                  {carregando ? (
                    <>
                      <Spinner aria-hidden="true" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      <LogInIcon />
                      Entrar
                    </>
                  )}
                </Button>

                <p aria-live="polite" className="sr-only">
                  {carregando ? "Entrando..." : ""}
                </p>
              </form>
            </CardContent>

            <CardFooter>
              <p className="text-muted-foreground text-sm">
                Ainda não tem acesso? Fale com o suporte da sua corretora.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
