import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva("", {
  variants: {
    size: {
      caption: "text-xs",
      base: "text-sm",
      highlight: "text-base",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    muted: {
      true: "text-muted-foreground",
      false: "text-foreground",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "regular",
    muted: false,
  },
})

// Elementos aceitos pela prop `as` — decisão do catálogo (ver
// docs/archive/componentes/text/spec.md): a fonte real (@nimbus-ds/text) só documenta
// "p" | "span", "div" foi incluído a pedido explícito do escopo desta tarefa.
type TextElement = "p" | "span" | "div"

function Text({
  className,
  as = "p",
  size,
  weight,
  muted,
  ...props
}: Omit<React.ComponentProps<"p">, "color"> &
  VariantProps<typeof textVariants> & {
    as?: TextElement
  }) {
  const Comp = as

  return (
    <Comp
      data-slot="text"
      data-size={size ?? "base"}
      data-weight={weight ?? "regular"}
      className={cn(textVariants({ size, weight, muted }), className)}
      {...props}
    />
  )
}

export { Text, textVariants }
