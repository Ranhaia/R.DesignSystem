"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// 2026-08-03: tamanho vem de --form-control-size (globals.css), não mais
// de "size-4" fixo. size-[var(--form-control-size)] é seguro no Tailwind
// v4 oxide porque o NOME da classe é estático — só o valor resolvido é
// dinâmico (mesmo padrão já usado em calendar.tsx com --cell-size).
// Trocar o preset ativo (ou um preset específico sobrescrever a
// variável) muda Checkbox E RadioGroupItem juntos, sem editar nenhum dos
// dois componentes. O ícone interno escala em proporção (7/8 do
// tamanho da caixa, igual à proporção original 14px/16px) via
// calc(), então não fica desproporcional em densidades diferentes.
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-[var(--form-control-size)] shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <Icon
          name="check"
          className="size-[calc(var(--form-control-size)*0.875)]"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
