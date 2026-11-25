"use client"

import * as React from "react"

import { useTexto } from "@/lib/idioma"
import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

// Campo de busca montado sobre o InputGroup: lupa no início, limpar quando há
// texto, Esc limpa e `shortcut` (uma tecla) leva o foco ao campo.

/** O atalho só vale fora de outro campo e sem modificador, para não roubar a digitação. */
function atalhoDisparou(e: KeyboardEvent, shortcut?: string) {
  if (!shortcut || e.ctrlKey || e.metaKey || e.altKey) return false
  const alvo = e.target as HTMLElement | null
  if (alvo && (alvo.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(alvo.tagName))) return false
  return e.key.toLowerCase() === shortcut.toLowerCase()
}

function SearchInput({
  className,
  value,
  defaultValue,
  onChange,
  onValueChange,
  onKeyDown,
  shortcut,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  /** Recebe o texto a cada mudança, inclusive ao limpar. */
  onValueChange?: (value: string) => void
  /** Tecla que leva o foco ao campo (ex.: "/"). Aparece com `kbd`. */
  shortcut?: string
}) {
  const t = useTexto()
  const ref = React.useRef<HTMLInputElement>(null)
  const [digitado, setDigitado] = React.useState(String(defaultValue ?? ""))
  const texto = value !== undefined ? String(value) : digitado

  const mudar = (novo: string) => {
    setDigitado(novo)
    onValueChange?.(novo)
  }
  const limpar = () => {
    mudar("")
    ref.current?.focus()
  }

  React.useEffect(() => {
    if (!shortcut) return
    const ouvir = (e: KeyboardEvent) => {
      if (!atalhoDisparou(e, shortcut)) return
      e.preventDefault()
      ref.current?.focus()
    }
    document.addEventListener("keydown", ouvir)
    return () => document.removeEventListener("keydown", ouvir)
  }, [shortcut])

  return (
    <InputGroup data-slot="search-input" className={className}>
      <InputGroupAddon>
        <Icon name="search" />
      </InputGroupAddon>
      <InputGroupInput
        aria-label={t("searchInput.buscar")}
        {...props}
        ref={ref}
        type="search"
        value={texto}
        aria-keyshortcuts={shortcut}
        onChange={(e) => {
          mudar(e.target.value)
          onChange?.(e)
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && texto) {
            e.preventDefault()
            mudar("")
          }
          onKeyDown?.(e)
        }}
        // a lupa e o limpar já existem; tira o "x" nativo do type=search
        className="[&::-webkit-search-cancel-button]:appearance-none"
      />
      {(texto || shortcut) && (
        <InputGroupAddon align="inline-end">
          {texto ? (
            <InputGroupButton size="icon-xs" aria-label={t("searchInput.limpar")} onClick={limpar}>
              <Icon name="close" />
            </InputGroupButton>
          ) : (
            <Kbd aria-hidden="true">{shortcut}</Kbd>
          )}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

export { SearchInput, atalhoDisparou }
