import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { gerarCss } from "./css"
import { TOKENS_COR } from "./gerar"

const app = (f: string) => readFileSync(resolve(__dirname, "../../app", f), "utf8")

describe("tokens de cor gerados", () => {
  it("tokens-cor.css é exatamente o que o motor gera hoje (rode `npm run tokens:gerar`)", () => {
    expect(app("tokens-cor.css").replace(/\r\n/g, "\n")).toBe(gerarCss())
  })

  it("globals.css importa o arquivo gerado e não declara nenhum token de cor gerado", () => {
    const g = app("globals.css").replace(/\/\*[\s\S]*?\*\//g, "")
    expect(g).toMatch(/@import\s+["']\.\/tokens-cor\.css["']/)
    const sobra = TOKENS_COR.filter((t) => new RegExp(`(^|[\\s{;])${t}\\s*:`).test(g))
    expect(sobra).toEqual([])
  })

  it("todo contexto (preset × modo) declara todos os tokens", () => {
    const css = gerarCss()
    for (const sel of [":root {", ".dark {", ...["editorial", "tech", "soft", "midnight"].flatMap((p) => [`[data-style="${p}"] {`, `.dark[data-style="${p}"] {`])]) {
      const i = css.indexOf(sel)
      expect(i, sel).toBeGreaterThanOrEqual(0)
      const bloco = css.slice(i, css.indexOf("}", i))
      for (const t of TOKENS_COR) expect(bloco, `${sel} ${t}`).toContain(`${t}:`)
    }
  })
})
