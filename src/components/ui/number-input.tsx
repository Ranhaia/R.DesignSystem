"use client"

import * as React from "react"

import { useIdioma, useTexto, type Idioma } from "@/lib/idioma"
import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

// Campo numérico sobre o InputGroup: − e + nas pontas, ↑/↓ no teclado,
// min/max/step e o número escrito no formato do idioma ativo.

function formatarNumero(n: number | null, idioma: Idioma) {
  return n === null ? "" : new Intl.NumberFormat(idioma, { maximumFractionDigits: 20 }).format(n)
}

/** Lê o texto no formato do idioma: tira o separador de milhar e troca a vírgula decimal. */
function lerNumero(texto: string, idioma: Idioma) {
  const partes = new Intl.NumberFormat(idioma).formatToParts(-1234.5)
  const milhar = partes.find((p) => p.type === "group")?.value ?? ""
  const decimal = partes.find((p) => p.type === "decimal")?.value ?? "."
  const limpo = texto.trim().split(milhar).join("").replace(decimal, ".").replace(/\s/g, "")
  if (!limpo || !/^-?\d*\.?\d+$|^-?\d+\.?$/.test(limpo)) return null
  return Number(limpo)
}

type Limites = { min?: number; max?: number; step: number }

const casas = (n: number) => (String(n).split(".")[1] ?? "").length

function limitar(n: number, { min, max }: Limites) {
  return Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n))
}

/** Um passo para cima (1) ou para baixo (-1), arredondado às casas do step e dentro dos limites. */
function passoNumero(valor: number | null, direcao: 1 | -1, limites: Limites) {
  if (valor === null) return limites.min ?? limitar(direcao * limites.step, limites)
  const c = Math.max(casas(limites.step), casas(valor))
  return limitar(Number((valor + direcao * limites.step).toFixed(c)), limites)
}

function NumberInput({
  className,
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step = 1,
  disabled,
  onBlur,
  onKeyDown,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "min" | "max" | "step" | "onChange"> & {
  value?: number | null
  defaultValue?: number | null
  /** Recebe o número (ou `null` quando o campo fica vazio). */
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
}) {
  const t = useTexto()
  const idioma = useIdioma()
  const [interno, setInterno] = React.useState<number | null>(defaultValue ?? null)
  const numero = value !== undefined ? value : interno
  const [texto, setTexto] = React.useState<string | null>(null) // null = mostra o número formatado
  const limites = { min, max, step }

  const definir = (n: number | null) => {
    setInterno(n)
    setTexto(null)
    onValueChange?.(n)
  }
  const passo = (d: 1 | -1) => definir(passoNumero(numero, d, limites))

  return (
    <InputGroup data-slot="number-input" className={className} data-disabled={disabled || undefined}>
      <InputGroupAddon>
        <InputGroupButton
          size="icon-xs"
          tabIndex={-1}
          aria-label={t("numberInput.diminuir")}
          disabled={disabled || (numero !== null && min !== undefined && numero <= min)}
          onClick={() => passo(-1)}
        >
          <Icon name="remove" />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput
        {...props}
        type="text"
        role="spinbutton"
        inputMode="decimal"
        autoComplete="off"
        disabled={disabled}
        aria-valuenow={numero ?? undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        value={texto ?? formatarNumero(numero, idioma)}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={(e) => {
          if (texto !== null) {
            const lido = lerNumero(texto, idioma)
            definir(lido === null ? null : limitar(lido, limites))
          }
          onBlur?.(e)
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault()
            const base = texto !== null ? lerNumero(texto, idioma) : numero
            definir(passoNumero(base, e.key === "ArrowUp" ? 1 : -1, limites))
          } else if (e.key === "Enter" && texto !== null && !e.nativeEvent.isComposing && e.keyCode !== 229) {
            const lido = lerNumero(texto, idioma)
            definir(lido === null ? null : limitar(lido, limites))
          }
          onKeyDown?.(e)
        }}
        className="text-center tabular-nums"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          tabIndex={-1}
          aria-label={t("numberInput.aumentar")}
          disabled={disabled || (numero !== null && max !== undefined && numero >= max)}
          onClick={() => passo(1)}
        >
          <Icon name="add" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { NumberInput, formatarNumero, lerNumero, passoNumero }
