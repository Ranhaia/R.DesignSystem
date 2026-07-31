import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Title: átomo tipográfico formal para headings (h1-h6). Duas props
// independentes, de propósito diferente (ver docs/archive/componentes/title/spec.md):
// - `as`: qual elemento HTML real é renderizado (semântica/hierarquia de
//   documento, importante pra leitor de tela e SEO).
// - `size`: qual escala visual é aplicada (hierarquia visual). Por padrão
//   `size` acompanha `as` (um <h1> parece um H1), mas pode divergir de
//   propósito — ex.: um <h2> semântico estilizado visualmente como H1 é um
//   caso legítimo de design system (title menor na árvore do documento,
//   mas que precisa se destacar mais na tela que o H1 real da página).
const titleVariants = cva("font-heading text-balance text-foreground", {
  variants: {
    size: {
      h1: "text-4xl font-bold tracking-tight",
      h2: "text-3xl font-bold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: {
    size: "h2",
  },
})

type TitleElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

function Title({
  as = "h2",
  size,
  className,
  ...props
}: Omit<React.ComponentProps<"h1">, "size"> &
  VariantProps<typeof titleVariants> & {
    /** Elemento HTML real renderizado — controla a hierarquia semântica do documento. */
    as?: TitleElement
  }) {
  const Comp = as
  const resolvedSize = size ?? as

  return (
    <Comp
      data-slot="title"
      data-as={as}
      data-size={resolvedSize}
      className={cn(titleVariants({ size: resolvedSize }), className)}
      {...props}
    />
  )
}

export { Title, titleVariants }
