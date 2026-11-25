import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

// timeline: eventos em ordem (histórico de atividade), montada sobre o list.

const evento = (titulo: string, quando: string, extra: Record<string, unknown> = {}) =>
  h(
    TimelineItem,
    extra,
    h(TimelineMarker),
    h(
      TimelineContent,
      null,
      h(TimelineTitle, null, titulo),
      h(TimelineTime, { dateTime: quando }, quando),
      h(TimelineDescription, null, "detalhe"),
    ),
  )

const html = (props: Record<string, unknown> = {}) =>
  renderToString(h(Timeline, props, evento("Criado", "2026-11-01"), evento("Pago", "2026-11-02")))

describe("Timeline", () => {
  it("é uma lista ordenada do list, um li por evento", () => {
    const s = html()
    expect(s).toMatch(/^<ol[^>]*data-slot="timeline"/)
    expect(s).toContain('data-as="ol"')
    // Safari tira a semântica de lista de <ol> com display flex/grid
    expect(s).toMatch(/^<ol[^>]*role="list"/)
    expect(s.match(/<li[^>]*data-slot="timeline-item"/g)).toHaveLength(2)
  })

  it("data do evento sai em <time> com dateTime", () => {
    expect(html()).toMatch(/<time[^>]*dateTime="2026-11-01"[^>]*data-slot="timeline-time"|<time[^>]*data-slot="timeline-time"[^>]*dateTime="2026-11-01"/)
  })

  it("marcador e linha são decoração, fora do leitor de tela", () => {
    expect(html()).toMatch(/data-slot="timeline-marker"[^>]*aria-hidden="true"|aria-hidden="true"[^>]*data-slot="timeline-marker"/)
  })

  it("marcador aceita ícone e tom", () => {
    const s = renderToString(h(TimelineMarker, { tone: "primary" }, h("svg")))
    expect(s).toContain('data-tone="primary"')
    expect(s).toContain("<svg")
  })

  it("título é texto, não cabeçalho (não quebra a hierarquia da página)", () => {
    expect(html()).not.toMatch(/<h[1-6]/)
  })
})
