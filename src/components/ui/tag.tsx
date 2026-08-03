import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// 2026-08-03: padrão visual unificado pra todas as variantes de cor —
// fundo claro + borda + texto escuro, sempre na mesma paleta de tom (ex.:
// danger usa só tons de --color-danger-*, nunca mistura com outra
// escala). Antes cada variante tinha uma lógica própria (default sem
// borda, primary chapado, success/warning/danger sem borda) — só
// "ai-generated" já seguia esse padrão (fundo claro + borda + texto),
// virou a referência pras demais.
// - default: sem escala de 10 passos própria (só existe pra
//   info/success/warning/danger) — reaproveita os tokens semânticos
//   neutros já existentes (--muted/--border/--muted-foreground) em vez
//   de criar uma escala nova só pra isso.
// - primary: --primary é um valor único por preset (sem variação clara/
//   escura) — fundo em --accent (o tom "claro" de destaque que cada
//   preset já define), borda em --primary com opacidade baixa (sutil,
//   não uma borda chapada), texto em --primary (mantém a cor de marca).
// - success/warning/danger: -100 (fundo) + -300 (borda, passo
//   intermediário da escala, contraste visível contra o -100) + -900
//   (texto) — três passos da MESMA escala de 10, nunca combina pedaço de
//   escalas diferentes.
const tagVariants = cva(
  "inline-flex min-h-6 w-fit shrink-0 items-center justify-center gap-1 rounded-sm border px-1.5 text-xs leading-none font-medium whitespace-nowrap transition-[color,box-shadow] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground",
        primary: "border-primary/20 bg-accent text-primary",
        success: "border-success-300 bg-success-100 text-success-900",
        warning: "border-warning-300 bg-warning-100 text-warning-900",
        danger: "border-danger-300 bg-danger-100 text-danger-900",
        "ai-generated":
          "border-ai-interactive bg-ai-surface text-ai-text-high",
      },
      // highlight: inverte fundo⇄texto de qualquer variant de cor e
      // remove a borda (não existe "borda" nesse modo — é a superfície
      // escura da própria escala que já faz o destaque). Pedido do
      // Rafael: precisa funcionar em cima de QUALQUER variant, não só
      // numa variante fixa chamada "destaque" — por isso é um eixo cva
      // próprio (boolean), combinável com o variant de cor.
      highlight: {
        true: "border-transparent",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        highlight: true,
        className: "bg-muted-foreground text-muted",
      },
      {
        variant: "primary",
        highlight: true,
        className: "bg-primary text-primary-foreground",
      },
      {
        variant: "success",
        highlight: true,
        className: "bg-success-900 text-success-100",
      },
      {
        variant: "warning",
        highlight: true,
        className: "bg-warning-900 text-warning-100",
      },
      {
        variant: "danger",
        highlight: true,
        className: "bg-danger-900 text-danger-100",
      },
      {
        variant: "ai-generated",
        highlight: true,
        className: "bg-ai-interactive text-ai-surface",
      },
    ],
    defaultVariants: {
      variant: "default",
      highlight: false,
    },
  }
)

// Tag: rótulo ESTÁTICO pra categorizar informação (não removível, sem ação
// própria) — diferente do Chip (critério de filtro ativo, tipicamente
// removível) e do Badge (contagem/status pontual). Fonte real:
// @nimbus-ds/tag (ver docs/archive/componentes/tag/spec.md) — TagProperties só expõe
// `children` e `appearance`, sem `icon`/`removable`/`onRemove`/`disabled`.
// Ícone (quando fizer sentido) é composição livre via children, não uma
// prop dedicada — mesmo comportamento que o próprio pacote Nimbus tem
// (README documenta "ícone + texto" como uso válido, mas o typedef não tem
// prop `icon`).
function Tag({
  className,
  variant = "default",
  highlight = false,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="tag"
      data-variant={variant}
      data-highlight={highlight}
      className={cn(tagVariants({ variant, highlight }), className)}
      {...props}
    />
  )
}

// Tag.Skeleton: placeholder de carregamento com o mesmo formato do tag
// real. Mesmo raciocínio do Chip.Skeleton (tamanho único, largura é uma
// estimativa nossa pra cobrir o caso comum de um rótulo curto — ajustar via
// className quando o tag real for mais largo).
function TagSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton
      data-slot="tag-skeleton"
      className={cn("h-6 w-20 rounded-sm", className)}
      {...props}
    />
  )
}

// Object.assign (em vez de `Tag.Skeleton = TagSkeleton`) — mesmo motivo do
// Chip.Skeleton em chip.tsx: `function Tag(...)` não tem essa propriedade
// no seu tipo inferido, Object.assign devolve a interseção sem precisar de
// cast/any.
const TagWithSkeleton = Object.assign(Tag, { Skeleton: TagSkeleton })

export { TagWithSkeleton as Tag, tagVariants }
