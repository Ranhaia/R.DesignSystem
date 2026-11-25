import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { Agenda, eventosDoDia, navegar, type EventoAgenda } from "@/components/ui/agenda"
import { IdiomaProvider } from "@/lib/idioma"

// agenda: mês (sobre o calendar, com o teclado dele), semana e dia.

const d = (dia: number, hora = 9, min = 0) => new Date(2026, 10, dia, hora, min)
const eventos: EventoAgenda[] = [
  { id: "a", titulo: "Reunião", inicio: d(10, 14), fim: d(10, 15) },
  { id: "b", titulo: "Café", inicio: d(10, 8), fim: d(10, 9) },
  { id: "c", titulo: "Viagem", inicio: d(9, 0), fim: d(12, 23), diaInteiro: true },
  { id: "d", titulo: "Outro mês", inicio: new Date(2026, 11, 3, 10) },
]

describe("eventosDoDia", () => {
  it("pega quem cruza o dia, dia inteiro primeiro, depois por hora", () => {
    expect(eventosDoDia(eventos, d(10)).map((e) => e.id)).toEqual(["c", "b", "a"])
    expect(eventosDoDia(eventos, d(13)).map((e) => e.id)).toEqual([])
  })
  it("evento sem fim vale só no dia do início", () => {
    expect(eventosDoDia(eventos, new Date(2026, 11, 3)).map((e) => e.id)).toEqual(["d"])
  })
})

describe("navegar", () => {
  it("anda um mês, uma semana ou um dia", () => {
    expect(navegar(d(10), "mes", 1).getMonth()).toBe(11)
    expect(navegar(d(10), "semana", -1).getDate()).toBe(3)
    expect(navegar(d(10), "dia", 1).getDate()).toBe(11)
  })
})

describe("Agenda", () => {
  const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
    const el = h(Agenda, { eventos, dataInicial: d(10), "aria-label": "Agenda da equipe", ...props })
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }

  it("mês monta sobre o calendar, com os eventos nos dias", () => {
    const s = html()
    expect(s).toContain('data-slot="agenda"')
    expect(s).toContain('data-slot="calendar"')
    expect(s).toContain('role="grid"')
    expect(s).toContain("Café")
    expect(s).toContain("+1 mais")
    expect(s).toContain("novembro de 2026")
  })

  it("dia do mês diz quantos eventos tem", () => {
    expect(html()).toMatch(/aria-label="[^"]*10 de novembro[^"]*3 eventos"/)
  })

  it("semana mostra 7 dias com os eventos", () => {
    const s = html({ visaoInicial: "semana" })
    expect(s.match(/data-slot="agenda-dia"/g)).toHaveLength(7)
    expect(s).toContain("Café")
  })

  it("dia lista os eventos como botões, com hora", () => {
    const s = html({ visaoInicial: "dia" })
    expect(s.match(/data-slot="agenda-evento"/g)).toHaveLength(3)
    expect(s).toContain("08:00")
    expect(s).toContain("Dia inteiro")
  })

  it("dia vazio diz que está vazio", () => {
    expect(html({ visaoInicial: "dia", dataInicial: d(20) })).toContain("Nenhum evento")
  })

  it("fala inglês com o provider", () => {
    const s = html({}, "en")
    expect(s).toContain("Today")
    expect(s).toContain("November 2026")
    expect(s).not.toMatch(/Hoje|novembro/)
  })
})
