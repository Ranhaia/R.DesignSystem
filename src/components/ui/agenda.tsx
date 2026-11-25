"use client"

import * as React from "react"
import { addDays, addMonths, addWeeks, endOfDay, isSameDay, startOfDay, startOfWeek } from "date-fns"
import type { DayButton } from "react-day-picker"

import { useIdioma, useTexto } from "@/lib/idioma"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Icon } from "@/components/ui/icon"
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

// Agenda com três vistas. O mês monta sobre o Calendar: a grade, o foco e o
// teclado (setas, PageUp/PageDown, Home/End) vêm dele; Enter abre o dia.
// Semana e dia são colunas e lista de botões, navegáveis por Tab.

type EventoAgenda = {
  id: string
  titulo: string
  inicio: Date
  /** Sem fim: vale só no dia do início. */
  fim?: Date
  diaInteiro?: boolean
}

type VisaoAgenda = "mes" | "semana" | "dia"

/** Eventos que cruzam o dia: os de dia inteiro primeiro, depois por hora de início. */
function eventosDoDia(eventos: EventoAgenda[], dia: Date) {
  const ini = startOfDay(dia)
  const fim = endOfDay(dia)
  return eventos
    .filter((e) => e.inicio <= fim && (e.fim ?? e.inicio) >= ini)
    .sort((a, b) => Number(!!b.diaInteiro) - Number(!!a.diaInteiro) || a.inicio.getTime() - b.inicio.getTime())
}

function navegar(data: Date, visao: VisaoAgenda, passo: number) {
  return visao === "mes" ? addMonths(data, passo) : visao === "semana" ? addWeeks(data, passo) : addDays(data, passo)
}

// O DayButton do Calendar não recebe props nossas: os eventos chegam por contexto.
const EventosContext = React.createContext<EventoAgenda[]>([])
const MAX_NO_MES = 2

function DiaDoMes({ children, day, ...props }: React.ComponentProps<typeof DayButton>) {
  const t = useTexto()
  const doDia = eventosDoDia(React.useContext(EventosContext), day.date)
  return (
    <CalendarDayButton
      day={day}
      {...props}
      className="aspect-auto h-24 items-stretch justify-start gap-0.5 overflow-hidden rounded-outer-md p-1 text-left radius-inset-1"
    >
      <span className="self-end text-xs">{children}</span>
      {doDia.slice(0, MAX_NO_MES).map((e) => (
        <span key={e.id} data-slot="agenda-chip" className="truncate rounded-inner bg-current/10 px-1 text-xs">
          {e.titulo}
        </span>
      ))}
      {doDia.length > MAX_NO_MES && (
        <span className="px-1 text-xs opacity-70">{t("agenda.mais", { n: doDia.length - MAX_NO_MES })}</span>
      )}
    </CalendarDayButton>
  )
}

function Agenda({
  eventos,
  dataInicial,
  visaoInicial = "mes",
  onEventoClick,
  className,
  "aria-label": ariaLabel,
}: {
  eventos: EventoAgenda[]
  /** Dia em foco ao abrir. Padrão: hoje. */
  dataInicial?: Date
  visaoInicial?: VisaoAgenda
  onEventoClick?: (evento: EventoAgenda) => void
  className?: string
  "aria-label": string
}) {
  // shortcut: só não controlada (data e visão internas); vira controlada quando uma tela precisar sincronizar a URL.
  const t = useTexto()
  const idioma = useIdioma()
  const [data, setData] = React.useState(() => dataInicial ?? new Date())
  const [visao, setVisao] = React.useState<VisaoAgenda>(visaoInicial)

  const hora = new Intl.DateTimeFormat(idioma, { hour: "2-digit", minute: "2-digit" })
  const inicioSemana = startOfWeek(data)
  const titulo =
    visao === "mes"
      ? new Intl.DateTimeFormat(idioma, { month: "long", year: "numeric" }).format(data)
      : visao === "semana"
        ? new Intl.DateTimeFormat(idioma, { day: "numeric", month: "short", year: "numeric" }).formatRange(
            inicioSemana,
            addDays(inicioSemana, 6)
          )
        : new Intl.DateTimeFormat(idioma, { dateStyle: "full" }).format(data)

  // o botão clicado some ao trocar de vista: o foco vai para a lista do dia, não para o body
  const listaDia = React.useRef<HTMLDivElement>(null)
  const focarDia = React.useRef(false)
  React.useEffect(() => {
    if (visao === "dia" && focarDia.current) listaDia.current?.focus()
    focarDia.current = false
  }, [visao])

  const abrirDia = (dia: Date) => {
    setData(dia)
    setVisao("dia")
    focarDia.current = true
  }

  const evento = (e: EventoAgenda) => (
    <Button
      key={e.id}
      data-slot="agenda-evento"
      variant="secondary"
      size="sm"
      className="h-auto w-full min-w-0 justify-start gap-2 py-1 text-left"
      onClick={() => onEventoClick?.(e)}
    >
      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
        {e.diaInteiro ? t("agenda.diaInteiro") : hora.format(e.inicio)}
      </span>
      <span className="truncate">{e.titulo}</span>
    </Button>
  )

  return (
    <section data-slot="agenda" data-visao={visao} aria-label={ariaLabel} className={cn("flex flex-col gap-3", className)}>
      <div data-slot="agenda-toolbar" className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setData(new Date())}>
          {t("agenda.hoje")}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={t("agenda.anterior")}
          icon={<Icon name="chevron_left" size={1} aria-hidden="true" />}
          onClick={() => setData((d) => navegar(d, visao, -1))}
        />
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={t("agenda.proximo")}
          icon={<Icon name="chevron_right" size={1} aria-hidden="true" />}
          onClick={() => setData((d) => navegar(d, visao, 1))}
        />
        <h2 aria-live="polite" className="text-base font-medium first-letter:uppercase">
          {titulo}
        </h2>
        <SegmentedControl
          className="ml-auto"
          size="sm"
          aria-label={t("agenda.visao")}
          value={visao}
          onValueChange={(v) => v && setVisao(v as VisaoAgenda)}
        >
          <SegmentedControlItem value="mes">{t("agenda.mes")}</SegmentedControlItem>
          <SegmentedControlItem value="semana">{t("agenda.semana")}</SegmentedControlItem>
          <SegmentedControlItem value="dia">{t("agenda.dia")}</SegmentedControlItem>
        </SegmentedControl>
      </div>

      {visao === "mes" && (
        <EventosContext.Provider value={eventos}>
          <Calendar
            mode="single"
            selected={data}
            onDayClick={abrirDia}
            month={data}
            onMonthChange={setData}
            hideNavigation
            className="w-full p-0"
            classNames={{ root: "w-full", month_caption: "sr-only", day: "group/day relative flex-1 p-0.5 select-none" }}
            components={{ DayButton: DiaDoMes }}
            labels={{
              labelDayButton: (dia) => {
                const n = eventosDoDia(eventos, dia).length
                const nome = new Intl.DateTimeFormat(idioma, { dateStyle: "full" }).format(dia)
                return n ? `${nome}, ${t(n === 1 ? "agenda.umEvento" : "agenda.eventos", { n })}` : nome
              },
            }}
          />
        </EventosContext.Provider>
      )}

      {visao === "semana" && (
        <div className="grid grid-cols-7 gap-1 overflow-x-auto">
          {Array.from({ length: 7 }, (_, i) => addDays(inicioSemana, i)).map((dia) => (
            <div key={dia.toISOString()} data-slot="agenda-dia" className="flex min-w-24 flex-col gap-1">
              <Button
                variant={isSameDay(dia, new Date()) ? "secondary" : "ghost"}
                size="sm"
                className="h-auto flex-col gap-0 py-1"
                onClick={() => abrirDia(dia)}
              >
                <span className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat(idioma, { weekday: "short" }).format(dia)}
                </span>
                <span>{dia.getDate()}</span>
              </Button>
              {eventosDoDia(eventos, dia).map(evento)}
            </div>
          ))}
        </div>
      )}

      {visao === "dia" && (
        <div
          ref={listaDia}
          tabIndex={-1}
          aria-label={new Intl.DateTimeFormat(idioma, { dateStyle: "full" }).format(data)}
          role="group"
          data-slot="agenda-dia"
          className="flex flex-col gap-1 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
        >
          {eventosDoDia(eventos, data).length ? (
            eventosDoDia(eventos, data).map(evento)
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">{t("agenda.semEventos")}</p>
          )}
        </div>
      )}
    </section>
  )
}

export { Agenda, eventosDoDia, navegar, type EventoAgenda, type VisaoAgenda }
