"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon, LogInIcon, ShieldCheckIcon } from "lucide-react"

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
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"

// Template "Login simples" — Fase 5A do PLANO-LOOP-80-20-TEMPLATES.md,
// 1ª de 5 rotas do fluxo de login (login-simples → login-erro-validacao →
// recuperacao-senha → selecao-perfil-corretora → onboarding). Cobre só o
// caminho feliz (vazio, preenchendo, senha oculta/visível, "manter
// conectado", carregando, sucesso) — erro de validação/credenciais é
// responsabilidade da próxima tela do fluxo (login-erro-validacao), mesmo
// componente em outro estado. Nenhuma peça nova: só Atoms/Molecules/
// Organisms já confirmados no catálogo.

export default function LoginSimplesTemplate() {
  const router = useRouter()
  const [senhaVisivel, setSenhaVisivel] = React.useState(false)
  const [manterConectado, setManterConectado] = React.useState(false)
  const [carregando, setCarregando] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Guarda contra reenvio: agora que o botão "Entrar" fica com
    // aria-disabled (não disabled nativo, ver comentário no botão), o
    // form ainda pode disparar onSubmit de novo (Enter, duplo clique).
    if (carregando) return
    setCarregando(true)

    // Simula a chamada de autenticação — caminho feliz desta tela sempre
    // termina em sucesso (credenciais inválidas ficam na próxima tela do
    // fluxo, login-erro-validacao).
    window.setTimeout(() => {
      router.push("/templates/selecao-perfil-corretora")
    }, 1200)
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Login simples
        </h1>
        <p className="text-muted-foreground text-sm">
          Composição de Organisms/Molecules/Atoms já existentes no catálogo —
          nenhuma peça nova foi criada. 1ª tela do fluxo de login (Fase 5A);
          só o caminho feliz — erro de validação/credenciais fica na próxima
          tela (login-erro-validacao).
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
                <Field>
                  <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome@corretora.com.br"
                    autoComplete="username"
                    autoFocus
                    required
                    disabled={carregando}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="senha">Senha</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="senha"
                      type={senhaVisivel ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                      disabled={carregando}
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

                {/* 2026-07-23: disabled nativo → aria-disabled. `disabled`
                    de verdade tira o elemento focado da árvore de
                    acessibilidade no instante em que vira true, e o foco
                    salta pro <body> (achado sistêmico da auditoria de
                    acessibilidade — não bloqueante, mas evitável). Com
                    aria-disabled o botão continua focável/anunciado; quem
                    bloqueia o reenvio é a guarda em handleSubmit acima. */}
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
