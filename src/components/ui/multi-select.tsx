"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox"

// MultiSelect é uma composição fixa (multiple sempre ligado) sobre o
// Combobox — não sobre o Select "pai" deste catálogo (select.tsx, radix-ui,
// sem suporte a multi-seleção) e não reimplementado do zero. Reaproveita
// literalmente ComboboxChips/ComboboxChip/ComboboxChipsInput (padrão já
// construído e validado em combobox.tsx, linhas 244–307) pra exibir as
// seleções como chips removíveis dentro do próprio campo — é o mesmo
// desenho que o `@nimbus-ds/multi-select` real usa (chips + input + popover
// sobre @floating-ui/react). Ver decisão completa e fontes em
// `.build/componentes/multi-select.md`.
//
// Por que ComboboxChip (não o átomo genérico Chip): ComboboxChip/
// ComboboxChipRemove estão amarrados ao contexto interno de teclado do
// Combobox (navegação entre chips, remover o último com Backspace). Trocar
// por Chip aqui quebraria silenciosamente esse comportamento — avaliado e
// descartado, ver mesma nota em multi-select.md.
export interface MultiSelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  /** Opções disponíveis para seleção. */
  options: MultiSelectOption[]
  /** Valores selecionados atualmente (array de `value`, sempre controlado). */
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  /** Nome acessível do campo de busca — obrigatório sempre que não houver
   *  um <label> visível associado (mesma regra do Combobox, ver
   *  node_modules/@base-ui/react/docs/react/components/combobox.md). Sem
   *  isso, cai no `placeholder` como fallback, mas placeholder não é
   *  substituto confiável de nome acessível — prefira passar esta prop. */
  "aria-label"?: string
}

function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Selecione...",
  emptyText = "Nenhum resultado encontrado.",
  disabled = false,
  className,
  id,
  name,
  "aria-label": ariaLabel,
}: MultiSelectProps) {
  const anchor = useComboboxAnchor()

  const labelByValue = React.useMemo(
    () =>
      Object.fromEntries(options.map((option) => [option.value, option.label])),
    [options]
  )

  return (
    <Combobox
      items={options.map((option) => option.value)}
      itemToStringLabel={(item: string) => labelByValue[item] ?? item}
      multiple
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      id={id}
      name={name}
    >
      <ComboboxChips
        ref={anchor}
        data-slot="multi-select"
        className={cn("min-w-56", className)}
      >
        {value.map((item) => (
          <ComboboxChip key={item}>{labelByValue[item] ?? item}</ComboboxChip>
        ))}
        <ComboboxChipsInput
          aria-label={ariaLabel ?? placeholder}
          placeholder={value.length === 0 ? placeholder : undefined}
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {labelByValue[item] ?? item}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}

// MultiSelect.Skeleton: placeholder de carregamento, mesmo mecanismo de
// Chip.Skeleton (chip.tsx) e Button.Skeleton (button.tsx). Existe porque o
// `@nimbus-ds/multi-select` real também expõe `MultiSelect.Skeleton` como
// subcomponente estático (ver .build/componentes/multi-select.md) — não é
// invenção deste projeto.
function MultiSelectSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      data-slot="multi-select-skeleton"
      className={cn("h-9 w-56 rounded-md", className)}
      {...props}
    />
  )
}

const MultiSelectWithSkeleton = Object.assign(MultiSelect, {
  Skeleton: MultiSelectSkeleton,
})

export { MultiSelectWithSkeleton as MultiSelect }
