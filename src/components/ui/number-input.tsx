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

const esc = (c: string) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 * Lê o texto no formato do idioma. O milhar só vale em grupos de 3 dígitos:
 * "1.5" em pt-BR é inválido (null), nunca 15.
 */
function lerNumero(texto: string, idioma: Idioma) {
  const partes = new Intl.NumberFormat(idioma).formatToParts(-1234.5)
  // o espaço fino/sem quebra de alguns idiomas vira espaço comum
  const milhar = (partes.find((p) => p.type === "group")?.value ?? ",").replace(/\s/, " ")
  const decimal = partes.find((p) => p.type === "decimal")?.value ?? "."
  const limpo = texto.trim().replace(/\s/g, " ")
  const G = esc(milhar), D = esc(decimal)
  const forma = new RegExp(`^-?(\\d+|\\d{1,3}(${G}\\d{3})+)(${D}\\d+)?$|^-?${D}\\d+$`)
  if (!forma.test(limpo)) return null
  const n = Number(limpo.split(milhar).join("").replace(decimal, "."))
  return Number.isFinite(n) ? n : null
}

type Limites = { min?: number; max?: number; step: number }

/** Casas decimais de um número, inclusive em notação científica (1e-7). */
function casas(n: number) {
  const [base, exp] = String(n).split("e")
  return Math.max(0, (base.split(".")[1] ?? "").length - Number(exp ?? 0))
}

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

  // value mudou por fora (reset, outro campo): o texto pendente cai
  React.useEffect(() => setTexto(null), [value])

  const definir = (n: number | null) => {
    setInterno(n)
    setTexto(null)
    if (n !== numero) onValueChange?.(n)
  }
  /** Texto digitado e ainda não confirmado; inválido = o último número válido. */
  const atual = () => {
    if (texto === null) return numero
    if (!texto.trim()) return null
    return lerNumero(texto, idioma) ?? numero
  }
  const confirmar = () => {
    if (texto === null) return
    const n = atual()
    definir(n === null ? null : limitar(n, limites))
  }
  const passo = (d: 1 | -1) => definir(passoNumero(atual(), d, limites))
  const travado = disabled || props.readOnly
  // clicar em − ou + não tira o foco do campo
  const manterFoco = (e: React.MouseEvent) => e.preventDefault()

  return (
    <InputGroup data-slot="number-input" className={className} data-disabled={disabled || undefined}>
      <InputGroupAddon>
        <InputGroupButton
          size="icon-xs"
          tabIndex={-1}
          aria-label={t("numberInput.diminuir")}
          onMouseDown={manterFoco}
          disabled={travado || (numero !== null && min !== undefined && numero <= min)}
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
        aria-valuetext={numero === null ? undefined : formatarNumero(numero, idioma)}
        aria-valuemin={min}
        aria-valuemax={max}
        value={texto ?? formatarNumero(numero, idioma)}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={(e) => {
          confirmar()
          onBlur?.(e)
        }}
        onKeyDown={(e) => {
          if ((e.key === "ArrowUp" || e.key === "ArrowDown") && !props.readOnly) {
            e.preventDefault()
            passo(e.key === "ArrowUp" ? 1 : -1)
          } else if (e.key === "Enter" && texto !== null && !e.nativeEvent.isComposing && e.keyCode !== 229) {
            // keyCode 229: Safari entrega o Enter que confirma a composição de IME com isComposing já falso
            confirmar()
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
          onMouseDown={manterFoco}
          disabled={travado || (numero !== null && max !== undefined && numero >= max)}
          onClick={() => passo(1)}
        >
          <Icon name="add" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { NumberInput, formatarNumero, lerNumero, passoNumero }
