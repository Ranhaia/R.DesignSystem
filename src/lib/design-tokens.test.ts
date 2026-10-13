import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

// Diretriz do DS: medida, espaço e texto só por token (escala do Tailwind,
// --spacing(), var(--token)), para tudo acompanhar o rem. Única exceção:
// linha fina (≤3px) em borda, anel, contorno, raio ou sombra, ou como ajuste
// dentro de calc() que compensa uma dessas linhas.

const COMPONENTS_DIR = join(__dirname, "../components")
const HAIRLINE = /^-?(ring|ring-offset|border|border-[xytblrse]|outline|outline-offset|rounded|rounded-[a-z]+|shadow|divide-[xy])$/
const MAX_HAIRLINE_PX = 3

// Valor arbitrário de utilitário: `utilitario-[valor]`, sem ser variante
// (`data-[state=open]:`), que termina com `]:`.
const ARBITRARY = /(?:^|[\s"'`:])(!?-?[a-z][a-z0-9-]*?)-\[([^\]\s"'`]+)\](?!:)/g
const LENGTH = /(-?\d*\.?\d+)(px|rem|em)\b/g

export function fixedValues(source: string) {
  const out: string[] = []
  for (const [, utility, value] of source.matchAll(ARBITRARY)) {
    for (const [literal, num, unit] of value.matchAll(LENGTH)) {
      const hairline =
        unit === "px" &&
        Math.abs(Number(num)) <= MAX_HAIRLINE_PX &&
        (HAIRLINE.test(utility) || value.includes("calc("))
      if (!hairline) out.push(`${utility}-[${value}] (${literal})`)
    }
  }
  return out
}

describe("fixedValues", () => {
  it("reprova px, rem e em soltos", () => {
    expect(fixedValues('className="w-[72px] text-[0.8rem] mr-[-0.45em]"')).toHaveLength(3)
  })
  it("aceita linha fina em borda, anel, raio e sombra", () => {
    expect(fixedValues('"focus-visible:ring-[3px] rounded-[2px] border-[1.5px] shadow-[0_0_0_1px_var(--x)]"')).toEqual([])
  })
  it("reprova linha grossa mesmo em borda", () => {
    expect(fixedValues('"rounded-[4px]"')).toHaveLength(1)
  })
  it("aceita ajuste fino dentro de calc() e valores sem unidade de comprimento", () => {
    expect(fixedValues('"h-[calc(100%-1px)] scale-[0.98] top-[50%] max-h-[80vh] grid-cols-[1fr_auto] w-[--spacing(4)]"')).toEqual([])
  })
  it("reprova px grosso dentro de calc()", () => {
    expect(fixedValues('"rounded-[calc(var(--radius)-5px)]"')).toHaveLength(1)
  })
  it("ignora variantes com colchete", () => {
    expect(fixedValues('"data-[side=bottom]:slide-in-from-top-2 has-[>svg]:px-3"')).toEqual([])
  })
})

describe("componentes do DS só usam token", () => {
  // ui, patterns, templates, examples, doc e demais pastas de src/components
  const files = (readdirSync(COMPONENTS_DIR, { recursive: true }) as string[])
    .map((f) => f.replaceAll("\\", "/"))
    .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
  it.each(files)("%s", (file) => {
    expect(fixedValues(readFileSync(join(COMPONENTS_DIR, file), "utf8"))).toEqual([])
  })
})
