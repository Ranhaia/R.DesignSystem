"use client"

import * as React from "react"
import type { Temporal } from "temporal-polyfill"

import { useIdioma, useTexto, type Idioma } from "@/lib/idioma"
import { useTemporal, type TemporalApi } from "@/lib/temporal"
import { Calendar } from "@/components/ui/calendar"
import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Seletor de data sobre o InputGroup: campo digitável no formato do idioma
// (dd/mm/aaaa em pt-BR, mm/dd/yyyy em en) e o `calendar` num `popover`.
// O valor é Temporal.PlainDate (data de calendário, sem fuso); `Date` só
// aparece na fronteira com o `calendar` (paraDate / deDate).

type PlainDate = Temporal.PlainDate
type Periodo = { from: PlainDate | null; to: PlainDate | null }

const SEPARADOR = " – "
// dia/mês na ordem do idioma; o ano sempre com 4 dígitos
const ORDEM: Record<Idioma, "dmy" | "mdy"> = { "pt-BR": "dmy", en: "mdy" }

const dois = (n: number) => String(n).padStart(2, "0")

function formatarData(data: PlainDate | null, idioma: Idioma) {
  if (!data) return ""
  const [a, b] = ORDEM[idioma] === "dmy" ? [data.day, data.month] : [data.month, data.day]
  return `${dois(a)}/${dois(b)}/${data.year}`
}

/** Lê "dd/mm/aaaa" (ou "mm/dd/yyyy" em en). Data que não existe = null. */
function lerData(texto: string, idioma: Idioma, T: TemporalApi): PlainDate | null {
  const m = texto.trim().match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/)
  if (!m) return null
  const [a, b, year] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const [day, month] = ORDEM[idioma] === "dmy" ? [a, b] : [b, a]
  try {
    return T.PlainDate.from({ year, month, day }, { overflow: "reject" })
  } catch {
    return null
  }
}

/** Lê "início – fim" (traço comum também vale). Fim antes do início é invertido. */
function lerPeriodo(texto: string, idioma: Idioma, T: TemporalApi): Periodo | null {
  const partes = texto.split(/\s+[–-]\s+|\s*–\s*/)
  if (partes.length > 2) return null
  const from = lerData(partes[0], idioma, T)
  const to = partes[1] ? lerData(partes[1], idioma, T) : null
  if (!from || (partes[1] && !to)) return null
  return to && T.PlainDate.compare(to, from) < 0 ? { from: to, to: from } : { from, to }
}

/** PlainDate → Date à meia-noite local, para o `calendar`. Nunca por string ISO. */
const paraDate = (data: PlainDate) => new Date(data.year, data.month - 1, data.day)

/** Date (dia escolhido no `calendar`) → PlainDate, lendo os campos locais. */
const deDate = (data: Date, T: TemporalApi) =>
  T.PlainDate.from({ year: data.getFullYear(), month: data.getMonth() + 1, day: data.getDate() })

type BaseProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  /** Desliga a escolha de datas no calendário (ex.: só dias úteis). */
  isDateDisabled?: (data: PlainDate) => boolean
}

type DatePickerProps = BaseProps &
  (
    | {
        mode?: "single"
        value?: PlainDate | null
        defaultValue?: PlainDate | null
        onValueChange?: (value: PlainDate | null) => void
      }
    | {
        mode: "range"
        value?: Periodo
        defaultValue?: Periodo
        onValueChange?: (value: Periodo) => void
      }
  )

function DatePicker(props: DatePickerProps) {
  const {
    mode = "single",
    value,
    defaultValue,
    onValueChange,
    isDateDisabled,
    className,
    disabled,
    onBlur,
    onKeyDown,
    ...rest
  } = props
  const t = useTexto()
  const idioma = useIdioma()
  const T = useTemporal()
  const periodo = mode === "range"
  const vazio: PlainDate | Periodo | null = periodo ? { from: null, to: null } : null

  const [interno, setInterno] = React.useState<PlainDate | Periodo | null>(defaultValue ?? vazio)
  const atual = value !== undefined ? value : interno
  const [texto, setTexto] = React.useState<string | null>(null) // null = mostra o valor formatado
  const [aberto, setAberto] = React.useState(false)

  // value mudou por fora: o texto pendente cai
  React.useEffect(() => setTexto(null), [value])

  const umaData = periodo ? null : (atual as PlainDate | null)
  const intervalo = periodo ? (atual as Periodo) : null

  const formatado = periodo
    ? intervalo?.from
      ? formatarData(intervalo.from, idioma) + (intervalo.to ? SEPARADOR + formatarData(intervalo.to, idioma) : "")
      : ""
    : formatarData(umaData, idioma)

  const definir = (novo: PlainDate | Periodo | null) => {
    setInterno(novo)
    setTexto(null)
    ;(onValueChange as ((v: typeof novo) => void) | undefined)?.(novo)
  }

  const confirmar = () => {
    if (texto === null || !T) return
    if (!texto.trim()) return definir(vazio)
    const lido = periodo ? lerPeriodo(texto, idioma, T) : lerData(texto, idioma, T)
    // texto inválido volta ao último valor válido
    if (lido) definir(lido)
    else setTexto(null)
  }

  const desligado = isDateDisabled && T ? (d: Date) => isDateDisabled(deDate(d, T)) : undefined
  const mesInicial = umaData ?? intervalo?.from

  return (
    <InputGroup data-slot="date-picker" data-mode={mode} className={className}>
      <InputGroupInput
        {...rest}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        disabled={disabled}
        placeholder={rest.placeholder ?? (periodo ? t("datePicker.formato") + SEPARADOR + t("datePicker.formato") : t("datePicker.formato"))}
        value={texto ?? formatado}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={(e) => {
          confirmar()
          onBlur?.(e)
        }}
        onKeyDown={(e) => {
          // keyCode 229: Safari entrega o Enter que confirma a composição de IME com isComposing já falso
          if (e.key === "Enter" && texto !== null && !e.nativeEvent.isComposing && e.keyCode !== 229) {
            e.preventDefault()
            confirmar()
          }
          onKeyDown?.(e)
        }}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={aberto} onOpenChange={setAberto}>
          <PopoverTrigger asChild>
            <InputGroupButton size="icon-xs" aria-label={t("datePicker.abrir")} disabled={disabled || !T}>
              <Icon name="calendar_month" />
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            {T &&
              (periodo ? (
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  defaultMonth={mesInicial ? paraDate(mesInicial) : undefined}
                  disabled={desligado}
                  selected={
                    intervalo?.from
                      ? { from: paraDate(intervalo.from), to: intervalo.to ? paraDate(intervalo.to) : undefined }
                      : undefined
                  }
                  onSelect={(r) => {
                    definir({ from: r?.from ? deDate(r.from, T) : null, to: r?.to ? deDate(r.to, T) : null })
                  }}
                />
              ) : (
                <Calendar
                  mode="single"
                  defaultMonth={mesInicial ? paraDate(mesInicial) : undefined}
                  disabled={desligado}
                  selected={umaData ? paraDate(umaData) : undefined}
                  onSelect={(d) => {
                    definir(d ? deDate(d, T) : null)
                    setAberto(false)
                  }}
                />
              ))}
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { DatePicker, deDate, formatarData, lerData, lerPeriodo, paraDate }
export type { Periodo }
