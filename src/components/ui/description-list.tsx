import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { textVariants } from "@/components/ui/text"
import { cn } from "@/lib/utils"

const descriptionListVariants = cva("", {
  variants: {
    layout: {
      // rótulo em cima do valor, um par embaixo do outro
      stacked: "flex flex-col gap-4",
      // rótulo à esquerda, valor à direita; cada item ocupa uma linha da grade
      inline:
        "grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 *:data-[slot=description-item]:col-span-2 *:data-[slot=description-item]:grid *:data-[slot=description-item]:grid-cols-subgrid",
    },
  },
  defaultVariants: { layout: "stacked" },
})

function DescriptionList({
  className,
  layout,
  ...props
}: React.ComponentProps<"dl"> & VariantProps<typeof descriptionListVariants>) {
  return (
    <dl
      data-slot="description-list"
      data-layout={layout ?? "stacked"}
      className={cn(descriptionListVariants({ layout }), className)}
      {...props}
    />
  )
}

// <div> é o agrupador válido de um par dt/dd dentro de <dl>.
function DescriptionItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="description-item"
      className={cn("flex flex-col gap-y-1", className)}
      {...props}
    />
  )
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn(textVariants({ size: "base", muted: true }), className)}
      {...props}
    />
  )
}

function DescriptionDetails({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-details"
      // no inline, todo valor fica na coluna 2, mesmo o 2º de um mesmo rótulo
      className={cn(textVariants({ size: "base", weight: "medium" }), "in-data-[layout=inline]:col-start-2", className)}
      {...props}
    />
  )
}

export {
  DescriptionList,
  DescriptionItem,
  DescriptionTerm,
  DescriptionDetails,
  descriptionListVariants,
}
