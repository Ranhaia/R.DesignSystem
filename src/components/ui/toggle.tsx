"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// 2026-08-02: estado "on" ganha dois reforços visuais além da cor de
// fundo/texto que já existia — peso da fonte (400→700, mais perceptível
// que manter font-medium fixo) e fill do ícone (contorno→preenchido).
// O fill é feito via CSS custom property (--icon-fill), não via prop
// React — o componente Icon (icon.tsx) já lê var(--icon-fill) como
// fallback no fontVariationSettings sempre que a prop `fill` não é
// passada explicitamente. Isso funciona automaticamente com qualquer
// <Icon> composto como children do Toggle, sem precisar tocar em cada
// tela/exemplo que já usa Toggle — só não funciona se o consumidor
// passar `fill` fixo no Icon filho (aí a prop explícita sempre vence a
// var, que é o comportamento correto/esperado do Icon).
// Importante: --icon-fill:0 é fixado no estado "off" também (não só :1
// no "on"), de propósito — é essa segunda declaração que desacopla o
// contorno/preenchido do preset ativo. --icon-fill já nasce em 1 no
// preset "soft" (ver globals.css); sem o "off" explícito, o ícone do
// Toggle nesse preset ficaria sempre preenchido, off ou on, herdando o
// valor do preset em vez de reagir ao próprio estado do componente — o
// comportamento contorno↔preenchido é uma característica do Toggle,
// não do preset, então precisa ser garantido nos dois estados, não só
// num deles.
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-normal whitespace-nowrap transition-[color,box-shadow,font-weight] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=off]:[--icon-fill:0] data-[state=on]:bg-accent data-[state=on]:font-bold data-[state=on]:text-accent-foreground data-[state=on]:[--icon-fill:1] dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
