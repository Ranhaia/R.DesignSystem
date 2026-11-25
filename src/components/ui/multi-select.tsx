"use client"

import * as React from "react"
import { useTexto } from "@/lib/idioma"

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
// `docs/archive/componentes/multi-select/spec.md`.
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

/** Novo `value` com o texto digitado como valor livre; `null` se vazio ou repetido. */
function adicionarValorLivre(texto: string, value: string[]) {
  const novo = texto.trim()
  return !novo || value.includes(novo) ? null : [...value, novo]
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
  /** Aceita valor digitado: Enter num texto que não é opção vira chip (campo de tags). */
  creatable?: boolean
}

function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder,
  emptyText,
  disabled = false,
  className,
  id,
  name,
  "aria-label": ariaLabel,
  creatable = false,
}: MultiSelectProps) {
  const t = useTexto()
  emptyText ??= t("comum.semResultado")
  placeholder ??= t("comum.selecione")
  const anchor = useComboboxAnchor()

  const labelByValue = React.useMemo(
    () =>
      Object.fromEntries(options.map((option) => [option.value, option.label])),
    [options]
  )

  const [texto, setTexto] = React.useState("")
  // valor livre já escolhido continua na lista, para dar para desmarcar
  const itens = React.useMemo(() => {
    const opcoes = options.map((option) => option.value)
    return creatable ? [...opcoes, ...value.filter((v) => !(v in labelByValue))] : opcoes
  }, [options, value, creatable, labelByValue])

  return (
    <Combobox
      items={itens}
      itemToStringLabel={(item: string) => labelByValue[item] ?? item}
      multiple
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      id={id}
      name={name}
      {...(creatable && {
        inputValue: texto,
        onInputValueChange: (novo: string) => setTexto(novo),
      })}
    >
      <ComboboxChips
        ref={anchor}
        data-slot="multi-select"
        data-creatable={creatable || undefined}
        className={cn("min-w-56", className)}
      >
        {value.map((item) => (
          <ComboboxChip key={item}>{labelByValue[item] ?? item}</ComboboxChip>
        ))}
        <ComboboxChipsInput
          aria-label={ariaLabel ?? placeholder}
          placeholder={value.length === 0 ? placeholder : undefined}
          onKeyDown={(e) => {
            // Enter com opção destacada é do Combobox; sem destaque, o texto vira chip.
            // keyCode 229: Safari entrega o Enter da composição de IME com isComposing já falso
            if (!creatable || e.key !== "Enter" || e.currentTarget.getAttribute("aria-activedescendant")) return
            if (e.nativeEvent.isComposing || e.keyCode === 229) return
            const novo = adicionarValorLivre(texto, value)
            e.preventDefault()
            if (novo) onValueChange(novo)
            setTexto("")
          }}
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
// subcomponente estático (ver docs/archive/componentes/multi-select/spec.md) — não é
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

export { MultiSelectWithSkeleton as MultiSelect, adicionarValorLivre }
