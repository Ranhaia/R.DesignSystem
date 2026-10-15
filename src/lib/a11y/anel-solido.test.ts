import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

// O motor de cor gera --ring sólido com 3:1 contra o fundo. Aplicar transparência no anel de foco
// (ex.: focus-visible:ring-ring/50) derruba o contraste para ~2,1–2,7:1 e reprova o SC 2.4.7 em todos os presets.
// O halo de erro (aria-invalid:ring-destructive/20) não é indicador de foco e continua permitido.
const UI = resolve(__dirname, "../../components/ui")
const PADROES = [/ring-ring\/\d+/g, /focus(?:-visible)?:(?:ring|outline)-[\w-]+\/\d+/g]

describe("anel de foco sólido", () => {
  it("nenhum anel de foco translúcido em src/components/ui", () => {
    const achados = readdirSync(UI)
      .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
      .flatMap((f) => {
        const txt = readFileSync(resolve(UI, f), "utf8")
        return PADROES.flatMap((p) => [...txt.matchAll(p)].map((m) => `${f}: ${m[0]}`))
      })
    expect(achados).toEqual([])
  })

  it("contorno de foco tem pelo menos 2px (nada de outline-1 / ring-1 no foco)", () => {
    const achados = readdirSync(UI)
      .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
      .flatMap((f) => [...readFileSync(resolve(UI, f), "utf8").matchAll(/focus(?:-visible)?:(?:outline|ring)-1(?![\w.])/g)].map((m) => `${f}: ${m[0]}`))
    expect(achados).toEqual([])
  })

  it("globals.css não deixa o contorno padrão translúcido (outline-ring/<n>)", () => {
    const css = readFileSync(resolve(__dirname, "../../app/globals.css"), "utf8")
    expect(css.match(/outline-ring\/\d+/g) ?? []).toEqual([])
  })

  it("globals.css define o foco por teclado padrão com 2px sólidos", () => {
    const css = readFileSync(resolve(__dirname, "../../app/globals.css"), "utf8")
    expect(css).toMatch(/:focus-visible\s*\{\s*@apply[^;]*outline-2[^;]*outline-solid/)
  })

  // Item de menu que mostra foco só pelo fundo precisa também de contorno no foco por teclado.
  it("item com foco por preenchimento também tem contorno no focus-visible", () => {
    const achados = readdirSync(UI)
      .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
      .filter((f) => {
        const t = readFileSync(resolve(UI, f), "utf8")
        return /focus:bg-/.test(t) && !/focus-visible:(?:outline-2|ring-2|ring-\[3px\])/.test(t)
      })
    expect(achados).toEqual([])
  })
})
