import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// 2026-08-02: altura mínima corrigida de 22px pra 24px (min-h-6, não só
// padding) — py-0.5 sozinho (4px) + line-height de text-xs (16px) + borda
// (2px) fechava em 22px, abaixo da altura mínima de toque/leitura que o
// resto do catálogo usa (Chip/Tag já nascem em 24px via
// h-[calc(--spacing(5.5))], ver chip.tsx/tag.tsx). min-h-6 garante 24px
// mesmo que o conteúdo (ícone, número tabular) varie.
// leading-none no texto: o line-height padrão de text-xs (1rem/16px) cria
// um "meio-espaço" acima/abaixo da letra que deixa o texto visualmente
// mais baixo que o centro geométrico de um ícone ao lado (baseline vs.
// centro do glifo) — é a causa do desalinhamento reportado entre
// ícone+texto e texto+número dentro do badge. leading-none remove essa
// folga, os dois se alinham ao centro do flex (items-center) igualmente.
const badgeVariants = cva(
  "inline-flex w-fit min-h-6 shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs leading-none font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
