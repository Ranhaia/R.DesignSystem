import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const tagVariants = cva(
  "inline-flex h-[calc(--spacing(5.5))] w-fit shrink-0 items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        primary: "bg-primary text-primary-foreground",
        success: "bg-success-100 text-success-900",
        warning: "bg-warning-100 text-warning-900",
        danger: "bg-danger-100 text-danger-900",
        "ai-generated":
          "border border-ai-interactive bg-ai-surface text-ai-text-high",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Tag: rótulo ESTÁTICO pra categorizar informação (não removível, sem ação
// própria) — diferente do Chip (critério de filtro ativo, tipicamente
// removível) e do Badge (contagem/status pontual). Fonte real:
// @nimbus-ds/tag (ver .build/componentes/tag.md) — TagProperties só expõe
// `children` e `appearance`, sem `icon`/`removable`/`onRemove`/`disabled`.
// Ícone (quando fizer sentido) é composição livre via children, não uma
// prop dedicada — mesmo comportamento que o próprio pacote Nimbus tem
// (README documenta "ícone + texto" como uso válido, mas o typedef não tem
// prop `icon`).
function Tag({
  className,
  variant = "default",
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
      className={cn(tagVariants({ variant }), className)}
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
      className={cn("h-[calc(--spacing(5.5))] w-20 rounded-sm", className)}
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
