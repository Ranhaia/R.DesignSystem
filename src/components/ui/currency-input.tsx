"use client"

import * as React from "react"

import { useIdioma, type Idioma } from "@/lib/idioma"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

// Campo de dinheiro sobre o InputGroup: digita livre, mostra no formato do
// idioma e da moeda ao sair do campo e entrega o número em onValueChange.

const casasDaMoeda = (idioma: Idioma, currency: string) =>
  new Intl.NumberFormat(idioma, { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2

/** Valor no formato do idioma, com as casas da moeda e sem o símbolo (ele fica no addon). */
function formatarDinheiro(n: number | null, idioma: Idioma, currency: string) {
  if (n === null) return ""
  const casas = casasDaMoeda(idioma, currency)
  return new Intl.NumberFormat(idioma, { minimumFractionDigits: casas, maximumFractionDigits: casas }).format(n)
}

function simboloMoeda(idioma: Idioma, currency: string) {
  const partes = new Intl.NumberFormat(idioma, { style: "currency", currency }).formatToParts(0)
  return partes.find((p) => p.type === "currency")?.value ?? currency
}

const esc = (c: string) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 * Lê o texto no formato do idioma, com ou sem símbolo. O milhar só vale em
 * grupos de 3 dígitos ("1.5" em pt-BR é inválido). Com `currency`, arredonda
 * nas casas dela. Inválido = null.
 */
function lerDinheiro(texto: string, idioma: Idioma, currency?: string) {
  const partes = new Intl.NumberFormat(idioma).formatToParts(1234.5)
  const milhar = partes.find((p) => p.type === "group")?.value ?? ","
  const decimal = partes.find((p) => p.type === "decimal")?.value ?? "."
  // sai o que não é dígito, sinal ou separador (símbolo da moeda, espaços)
  const limpo = texto.replace(new RegExp(`[^\\d\\-${esc(milhar)}${esc(decimal)}]`, "g"), "")
  const G = esc(milhar)
  const D = esc(decimal)
  const forma = new RegExp(`^-?(\\d+|\\d{1,3}(${G}\\d{3})+)(${D}\\d+)?$|^-?${D}\\d+$`)
  if (!forma.test(limpo)) return null
  let n = Number(limpo.split(milhar).join("").replace(decimal, "."))
  if (!Number.isFinite(n)) return null
  if (currency) {
    const fator = 10 ** casasDaMoeda(idioma, currency)
    n = Math.round(n * fator) / fator
  }
  return n
}

function CurrencyInput({
  className,
  value,
  defaultValue,
  onValueChange,
  currency = "BRL",
  onBlur,
  onKeyDown,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: number | null
  defaultValue?: number | null
  /** Recebe o valor em número (ou `null` quando o campo fica vazio). */
  onValueChange?: (value: number | null) => void
  /** Código ISO 4217 da moeda. */
  currency?: string
}) {
  const idioma = useIdioma()
  const [interno, setInterno] = React.useState<number | null>(defaultValue ?? null)
  const numero = value !== undefined ? value : interno
  const [texto, setTexto] = React.useState<string | null>(null) // null = mostra o valor formatado

  // value mudou por fora (reset, outro campo): o texto pendente cai
  React.useEffect(() => setTexto(null), [value])

  const confirmar = () => {
    if (texto === null) return
    // campo apagado fica vazio; texto inválido volta ao último valor válido
    const lido = texto.trim() ? (lerDinheiro(texto, idioma, currency) ?? numero) : null
    setInterno(lido)
    setTexto(null)
    if (lido !== numero) onValueChange?.(lido)
  }

  return (
    <InputGroup data-slot="currency-input" className={className}>
      <InputGroupAddon>
        <InputGroupText>{simboloMoeda(idioma, currency)}</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        {...props}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={texto ?? formatarDinheiro(numero, idioma, currency)}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={(e) => {
          confirmar()
          onBlur?.(e)
        }}
        onKeyDown={(e) => {
          // keyCode 229: Safari entrega o Enter que confirma a composição de IME com isComposing já falso
          if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) confirmar()
          onKeyDown?.(e)
        }}
        className="tabular-nums"
      />
    </InputGroup>
  )
}

export { CurrencyInput, formatarDinheiro, lerDinheiro, simboloMoeda }
