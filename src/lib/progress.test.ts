import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { Progress } from "@/components/ui/progress"

// progress: barra (padrão) ou anel (`shape="circle"`), mesma API e mesma
// acessibilidade (role=progressbar com aria-valuenow).

describe("Progress", () => {
  it("barra continua sendo o padrão", () => {
    const html = renderToString(h(Progress, { value: 40, "aria-label": "x" }))
    expect(html).toContain('data-shape="bar"')
    expect(html).not.toContain("<svg")
  })
  it("anel anuncia o valor e desenha o arco proporcional", () => {
    const html = renderToString(
      h(Progress, { shape: "circle", value: 25, "aria-label": "x" })
    )
    expect(html).toContain('role="progressbar"')
    expect(html).toContain('aria-valuenow="25"')
    expect(html).toContain('data-shape="circle"')
    expect(html).toContain("<svg")
    // pathLength=100 → o traço visível é o próprio valor
    expect(html).toContain('stroke-dashoffset="75"')
  })
  it("anel sem valor fica vazio, sem quebrar", () => {
    const html = renderToString(h(Progress, { shape: "circle", "aria-label": "x" }))
    expect(html).toContain('stroke-dashoffset="100"')
  })
  it("arco é relativo ao max e preso a 0–100", () => {
    const meio = renderToString(h(Progress, { shape: "circle", value: 100, max: 200, "aria-label": "x" }))
    expect(meio).toContain('stroke-dashoffset="50"')
    const acima = renderToString(h(Progress, { shape: "circle", value: 150, "aria-label": "x" }))
    expect(acima).toContain('stroke-dashoffset="0"')
  })
})
