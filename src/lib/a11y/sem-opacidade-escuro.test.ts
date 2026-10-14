import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

// Opacidade só no modo escuro sobre token de cor (ex.: dark:bg-destructive/60) deixa o componente com cara de
// desabilitado e invalida o contraste que o motor de cor garante. A cor do escuro vem do token, não de transparência.
const UI = resolve(__dirname, "../../components/ui")
const PADRAO = /dark:[\w:[\]=-]*?(?:bg|text|border|ring|outline|fill|stroke)-(?:primary|destructive|secondary|accent|input|muted|foreground|background|card|popover|sidebar)[\w-]*\/\d+/g

describe("componentes sem opacidade de cor só no escuro", () => {
  it("nenhum dark:<cor>/<n> em src/components/ui", () => {
    const achados = readdirSync(UI)
      .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
      .flatMap((f) => [...readFileSync(resolve(UI, f), "utf8").matchAll(PADRAO)].map((m) => `${f}: ${m[0]}`))
    expect(achados).toEqual([])
  })
})
