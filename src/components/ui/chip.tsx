import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Skeleton } from "@/components/ui/skeleton"

// 2026-08-03: altura corrigida de 22px (h-[calc(--spacing(5.5))], 5.5 x
// 4px) pra 24px — mesmo bug/mesma correção já aplicada em badge.tsx e
// tag.tsx (min-h-6 + leading-none, não só padding/altura fixa, robusto a
// conteúdo variável como o botão de remover interno, que já é 24px via
// size="icon-xs").
const chipVariants = cva(
  "inline-flex min-h-6 w-fit shrink-0 items-center justify-center gap-1 rounded-sm px-1.5 text-xs leading-none font-medium whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 has-disabled:pointer-events-none has-disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        "ai-generated":
          "border border-ai-interactive bg-ai-surface text-ai-text-high",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Chip({
  className,
  variant = "default",
  asChild = false,
  children,
  icon,
  removable = false,
  onRemove,
  removeLabel = "Remover",
  disabled = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & {
    asChild?: boolean
    icon?: React.ReactNode
    removable?: boolean
    onRemove?: () => void
    removeLabel?: string
    disabled?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="chip"
      data-variant={variant}
      className={cn(
        chipVariants({ variant }),
        removable && "pr-0.5",
        disabled && "opacity-50",
        className
      )}
      aria-disabled={disabled ? "true" : undefined}
      {...props}
    >
      {icon}
      {children}
      {removable && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={removeLabel}
          disabled={disabled}
          onClick={onRemove}
        >
          <Icon name="close" />
        </Button>
      )}
    </Comp>
  )
}

// Chip.Skeleton: placeholder de carregamento com o mesmo formato do chip
// real. Tamanho único (Chip não tem escala de size, ver spec) — largura é
// uma estimativa nossa pra cobrir o caso comum de um chip de texto curto,
// mesmo raciocínio do Button.Skeleton (ajustar via className quando o chip
// real for mais largo).
function ChipSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton
      data-slot="chip-skeleton"
      className={cn("h-6 w-20 rounded-sm", className)}
      {...props}
    />
  )
}

// Object.assign (em vez de `Chip.Skeleton = ChipSkeleton`) — mesmo motivo do
// Button.Skeleton em button.tsx: `function Chip(...)` não tem essa
// propriedade no seu tipo inferido, Object.assign devolve a interseção sem
// precisar de cast/any.
const ChipWithSkeleton = Object.assign(Chip, { Skeleton: ChipSkeleton })

export { ChipWithSkeleton as Chip, chipVariants }
