"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// SegmentedControl reaproveita a mesma primitiva Radix do ToggleGroup
// (src/components/ui/toggle-group.tsx), mas com duas diferenças
// deliberadas em relação ao "parente":
// 1. `type` é sempre "single" — nunca "multiple". A prop nem existe mais
//    na API pública deste componente (ver tipo de SegmentedControlProps
//    abaixo, que usa ToggleGroupSingleProps e omite "type").
// 2. Visual de "pill"/segmented mais definido: container com fundo
//    --muted (em vez de itens soltos), item ativo ganha fundo --background
//    + sombra, em vez do bg-accent chapado do ToggleGroup. Mesmo padrão
//    visual que TabsList/TabsTrigger já usa neste projeto para o mesmo
//    efeito de "abas em pílula" (src/components/ui/tabs.tsx).
const segmentedControlItemVariants = cva(
  "relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-inner border border-transparent px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all outline-none hover:text-foreground focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm dark:data-[state=on]:border-input dark:data-[state=on]:bg-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        sm: "h-7 text-xs",
        default: "h-8",
        lg: "h-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const SegmentedControlContext = React.createContext<
  VariantProps<typeof segmentedControlItemVariants>
>({
  size: "default",
})

function SegmentedControl({
  className,
  size,
  children,
  ...props
}: Omit<ToggleGroupPrimitive.ToggleGroupSingleProps, "type"> &
  VariantProps<typeof segmentedControlItemVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      data-slot="segmented-control"
      data-size={size}
      className={cn(
        "group/segmented-control inline-flex w-fit items-center justify-center rounded-outer-lg bg-muted p-0.75 radius-inset-0.75 text-muted-foreground",
        className
      )}
      {...props}
    >
      <SegmentedControlContext.Provider value={{ size }}>
        {children}
      </SegmentedControlContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function SegmentedControlItem({
  className,
  children,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof segmentedControlItemVariants>) {
  const context = React.useContext(SegmentedControlContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="segmented-control-item"
      data-size={context.size || size}
      className={cn(
        segmentedControlItemVariants({ size: context.size || size }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export {
  SegmentedControl,
  SegmentedControlItem,
  segmentedControlItemVariants,
}
