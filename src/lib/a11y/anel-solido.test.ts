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
})
