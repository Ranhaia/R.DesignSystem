"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TimePickerFormat = "24h" | "12h"
type TimePickerPeriod = "AM" | "PM"

function pad2(n: number) {
  return n.toString().padStart(2, "0")
}

// `value` é sempre "HH:mm" em 24h — formato único de armazenamento,
// independente do `format` usado só pra exibição/seleção (12h com AM/PM é
// derivado a partir daqui, nunca guardado separado). Evita o estado
// controlado ter duas fontes de verdade (hora 24h vs. hora 12h + período).
function parseValue(value: string | undefined) {
  if (!value) return null
  const match = /^([01]?\d|2[0-3]):([0-5]?\d)$/.exec(value)
  if (!match) return null
  return { hour: Number(match[1]), minute: Number(match[2]) }
}

function to12h(hour24: number): { hour12: number; period: TimePickerPeriod } {
  const period: TimePickerPeriod = hour24 >= 12 ? "PM" : "AM"
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  return { hour12, period }
}

function to24h(hour12: number, period: TimePickerPeriod) {
  const base = hour12 % 12
  return period === "PM" ? base + 12 : base
}

function formatDisplay(
  value: string | undefined,
  format: TimePickerFormat
): string | null {
  const parsed = parseValue(value)
  if (!parsed) return null
  if (format === "24h") {
    return `${pad2(parsed.hour)}:${pad2(parsed.minute)}`
  }
  const { hour12, period } = to12h(parsed.hour)
  return `${pad2(hour12)}:${pad2(parsed.minute)} ${period}`
}

const HOURS_24 = Array.from({ length: 24 }, (_, i) => i)
const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1)

interface TimePickerProps
  extends Omit<
    React.ComponentProps<"button">,
    "onChange" | "value" | "children"
  > {
  /** Horário controlado, sempre em "HH:mm" 24h (ex.: "14:30"). */
  value?: string
  onValueChange?: (value: string) => void
  /** Formato de exibição/seleção — o `value` armazenado continua 24h em
      qualquer um dos dois. Default "24h". */
  format?: TimePickerFormat
  /** Intervalo entre minutos selecionáveis (1 a 60). Default 5 — decisão
      provisória deste projeto (não vem de nenhuma fonte pública), diverge
      do default "30" do modo dropdown da @nimbus-ds/time-picker (ver
      docs/archive/componentes/time-picker/spec.md) por ser mais granular sem virar
      uma lista de 60 itens. Reversível via prop a qualquer momento. */
  minuteStep?: number
  placeholder?: string
  disabled?: boolean
  /** className do PopoverContent (o className "solto" no componente vai
      pro Button de trigger, mesmo padrão do DatePickerDemo). */
  contentClassName?: string
}

function TimePicker({
  value,
  onValueChange,
  format = "24h",
  minuteStep = 5,
  placeholder = "Selecione um horário",
  disabled = false,
  className,
  contentClassName,
  ...props
}: TimePickerProps) {
  const parsed = parseValue(value)
  const hour12Data = parsed ? to12h(parsed.hour) : null

  const minutes = React.useMemo(() => {
    const step = minuteStep > 0 && minuteStep <= 60 ? minuteStep : 5
    return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step)
  }, [minuteStep])

  function commit(hour: number, minute: number) {
    onValueChange?.(`${pad2(hour)}:${pad2(minute)}`)
  }

  function handleHourChange(raw: string) {
    const minute = parsed?.minute ?? minutes[0] ?? 0
    if (format === "12h") {
      const period = hour12Data?.period ?? "AM"
      commit(to24h(Number(raw), period), minute)
    } else {
      commit(Number(raw), minute)
    }
  }

  function handleMinuteChange(raw: string) {
    const hour = parsed?.hour ?? 0
    commit(hour, Number(raw))
  }

  function handlePeriodChange(raw: string) {
    const hour12 = hour12Data?.hour12 ?? 12
    const minute = parsed?.minute ?? minutes[0] ?? 0
    commit(to24h(hour12, raw as TimePickerPeriod), minute)
  }

  const display = formatDisplay(value, format)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-40 justify-start text-left font-normal",
            !display && "text-muted-foreground",
            className
          )}
          {...props}
        >
          <Icon name="calendar_today" />
          {display ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("flex w-auto gap-2 p-3", contentClassName)}
        align="start"
      >
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Hora</span>
          <Select
            value={
              format === "24h"
                ? (parsed ? String(parsed.hour) : undefined)
                : (hour12Data ? String(hour12Data.hour12) : undefined)
            }
            onValueChange={handleHourChange}
            disabled={disabled}
          >
            <SelectTrigger size="sm" className="w-18" aria-label="Hora">
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent>
              {(format === "24h" ? HOURS_24 : HOURS_12).map((h) => (
                <SelectItem key={h} value={String(h)}>
                  {pad2(h)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Minuto</span>
          <Select
            value={parsed ? String(parsed.minute) : undefined}
            onValueChange={handleMinuteChange}
            disabled={disabled}
          >
            <SelectTrigger size="sm" className="w-18" aria-label="Minuto">
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {pad2(m)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {format === "12h" && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Período</span>
            <Select
              value={hour12Data?.period}
              onValueChange={handlePeriodChange}
              disabled={disabled}
            >
              <SelectTrigger
                size="sm"
                className="w-17"
                aria-label="Período"
              >
                <SelectValue placeholder="--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export { TimePicker }
export type { TimePickerFormat, TimePickerPeriod, TimePickerProps }
