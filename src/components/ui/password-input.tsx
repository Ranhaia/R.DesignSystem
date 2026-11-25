"use client"

import * as React from "react"

import { useTexto, type ChaveTexto } from "@/lib/idioma"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

// Aplicação do Input para senha: o botão de mostrar/ocultar usa o endAction
// do próprio Input. `variant="new"` é o cadastro de senha: soma a força e a
// lista de requisitos, ligadas ao campo por aria-describedby.

const REQUISITOS: { chave: ChaveTexto; ok: (s: string) => boolean }[] = [
  { chave: "password.reqTamanho", ok: (s) => s.length >= 8 },
  // \p{…}: letra acentuada conta como letra (ç, é), não como símbolo
  { chave: "password.reqCaixa", ok: (s) => /\p{Ll}/u.test(s) && /\p{Lu}/u.test(s) },
  { chave: "password.reqNumero", ok: (s) => /\p{N}/u.test(s) },
  { chave: "password.reqSimbolo", ok: (s) => /[^\p{L}\p{N}]/u.test(s) },
]

type NivelSenha = "fraca" | "media" | "forte"

/** Força de 0 a 4 (um ponto por requisito) e o nível que ela representa. */
function avaliarSenha(senha: string) {
  const requisitos = REQUISITOS.map((r) => ({ chave: r.chave, ok: r.ok(senha) }))
  const forca = requisitos.filter((r) => r.ok).length
  const curta = !requisitos[0].ok // abaixo do tamanho mínimo é sempre fraca
  const nivel: NivelSenha | null = !senha ? null : curta || forca <= 1 ? "fraca" : forca <= 3 ? "media" : "forte"
  return { forca, nivel, requisitos }
}

const ROTULO_NIVEL: Record<NivelSenha, ChaveTexto> = {
  fraca: "password.fraca",
  media: "password.media",
  forte: "password.forte",
}

function PasswordInput({
  variant = "default",
  className,
  autoComplete,
  value,
  defaultValue,
  onChange,
  "aria-describedby": describedBy,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "type" | "endIcon" | "endAction"> & {
  /** `default`: entrar (só preencher). `new`: cadastro, com força e requisitos. */
  variant?: "default" | "new"
}) {
  const t = useTexto()
  const forcaId = React.useId()
  const [visivel, setVisivel] = React.useState(false)
  const [digitado, setDigitado] = React.useState(String(defaultValue ?? ""))
  const senha = value !== undefined ? String(value) : digitado
  const cadastro = variant === "new"
  const { forca, nivel, requisitos } = avaliarSenha(senha)

  return (
    <div data-slot="password-input" data-variant={variant} className={cn("flex flex-col gap-2", className)}>
      <Input
        {...props}
        type={visivel ? "text" : "password"}
        autoComplete={autoComplete ?? (cadastro ? "new-password" : "current-password")}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          setDigitado(e.target.value)
          onChange?.(e)
        }}
        aria-describedby={cn(describedBy, cadastro && forcaId) || undefined}
        endAction={{
          icon: visivel ? "visibility_off" : "visibility",
          onClick: () => setVisivel((v) => !v),
          "aria-label": visivel ? t("password.ocultar") : t("password.mostrar"),
        }}
      />
      {cadastro && (
        <div data-slot="password-strength" id={forcaId} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Progress value={forca * 25} aria-label={t("password.forca")} className="flex-1" />
            <span aria-live="polite" className="min-w-12 text-right text-xs text-muted-foreground">
              {nivel && t(ROTULO_NIVEL[nivel])}
            </span>
          </div>
          <ul className="flex flex-col gap-1 text-xs">
            {requisitos.map((r) => (
              <li
                key={r.chave}
                data-slot="password-requirement"
                data-ok={r.ok}
                className={cn("flex items-center gap-1.5", r.ok ? "text-foreground" : "text-muted-foreground")}
              >
                <Icon name={r.ok ? "check_circle" : "radio_button_unchecked"} size={1} aria-hidden="true" />
                {t(r.chave)}
                <span className="sr-only">{t(r.ok ? "password.cumprido" : "password.pendente")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export { PasswordInput, avaliarSenha }
