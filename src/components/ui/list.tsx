import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Elementos aceitos pela prop `as` — fonte real (@nimbus-ds/list, ver
// .build/componentes/list.md): `ListProperties.as` é exatamente
// "ul" | "ol", sem outras opções documentadas.
type ListElement = "ul" | "ol"

const listVariants = cva("flex flex-col gap-1 text-sm text-foreground", {
  variants: {
    variant: {
      // Sem marcador visual — uso mais comum neste catálogo: agrupar
      // ListItem (com Item/ItemContent dentro, ou texto simples) numa
      // lista vertical, sem bullet/numerador. NÃO existe na fonte real
      // do Nimbus (o List de lá sempre mostra marcador) — decisão
      // provisória deste catálogo, documentada em list.md, mesmo tipo
      // de divergência já registrada em chip.md (prop onRemove).
      none: "list-none",
      // Marcador nativo visível — bullet (<ul>) ou numerador (<ol>),
      // comportamento 1:1 com a fonte real do Nimbus ("composed of a
      // bullet point or a numerator and a text").
      marker: "list-inside marker:text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "none",
  },
})

function List({
  className,
  as = "ul",
  variant = "none",
  ...props
}: React.ComponentPropsWithoutRef<"ul"> &
  VariantProps<typeof listVariants> & {
    as?: ListElement
  }) {
  const Comp = as

  return (
    <Comp
      data-slot="list"
      data-as={as}
      data-variant={variant}
      className={cn(
        listVariants({ variant }),
        variant === "marker" && (as === "ol" ? "list-decimal" : "list-disc"),
        className
      )}
      {...props}
    />
  )
}

function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="list-item"
      className={cn("text-sm leading-normal text-foreground", className)}
      {...props}
    />
  )
}

export { List, ListItem, listVariants }
