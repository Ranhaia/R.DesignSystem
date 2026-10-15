"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

// 2026-08-03: mesmo mecanismo do Checkbox (ver comentário em checkbox.tsx)
// — tamanho vem de --form-control-size, não mais "size-4" fixo. O
// indicador interno (bolinha preenchida) usava size={0.5} (prop em rem,
// fixo em 8px = metade de 16px); trocado por className com calc() na
// mesma proporção (0.5x), pra continuar exatamente na metade do
// tamanho do círculo externo em qualquer densidade. Precisa ser
// className, não a prop `size` do Icon — `size` escreve width/height via
// style inline, que tem prioridade sobre qualquer classe Tailwind e
// travaria o indicador num valor fixo outra vez.
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-[var(--form-control-size)] shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <Icon
          name="circle"
          fill
          className="absolute top-1/2 left-1/2 size-[calc(var(--form-control-size)*0.5)] -translate-x-1/2 -translate-y-1/2 text-primary"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
