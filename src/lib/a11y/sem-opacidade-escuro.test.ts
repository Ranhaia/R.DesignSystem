import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

// Preenchimento do próprio controle com transparência só no escuro (ex.: dark:bg-destructive/60, dark:bg-input/30,
// dark:data-[state=on]:bg-input/30) deixa o componente com cara de desabilitado e invalida o contraste que o motor
// garante. Tons por cima de uma base sólida (hover, foco, halo de erro, realce de selecionado) continuam permitidos.
const UI = resolve(__dirname, "../../components/ui")
const PADRAO = /dark:(?:data-\[state=[\w-]+\]:)?bg-(?:primary|destructive|secondary|accent|input|muted|foreground|background|card|popover|sidebar)[\w-]*\/\d+/g

describe("componentes sem opacidade de cor só no escuro", () => {
  it("nenhum preenchimento dark:bg-<cor>/<n> (normal ou de estado) em src/components/ui", () => {
    const achados = readdirSync(UI)
      .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
      .flatMap((f) => [...readFileSync(resolve(UI, f), "utf8").matchAll(PADRAO)].map((m) => `${f}: ${m[0]}`))
    expect(achados).toEqual([])
  })
})
