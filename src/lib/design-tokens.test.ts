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

// CSS escrito à mão (globals.css): valor de medida ou tempo só pode nascer
// numa declaração de token (`--nome: valor`). Fora dela, só var()/--spacing().
// Exceções: linha fina (≤3px) e o 0.01ms do bloco prefers-reduced-motion.
const CSS_LITERAL = /(-?\d*\.?\d+)(px|rem|em|ms|s)\b/g

export function cssFixedValues(source: string) {
  const out: string[] = []
  source
    .replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, "")) // mantém nº da linha
    .split(/\r?\n/)
    .forEach((line, i) => {
      const t = line.trim()
      if (!t || t.startsWith("--") || t.startsWith("@")) return
      const value = t.match(/:\s*(.+)$/)?.[1]
      if (!value) return
      for (const [literal, num, unit] of value.matchAll(CSS_LITERAL)) {
        if (unit === "px" && Math.abs(Number(num)) <= MAX_HAIRLINE_PX) continue
        if (literal === "0.01ms") continue
        out.push(`linha ${i + 1}: ${t}`)
      }
    })
  return out
}

describe("cssFixedValues", () => {
  it("aceita valor fixo dentro de declaração de token", () => {
    expect(cssFixedValues(":root {\n  --motion-duration-fast: 150ms;\n  --radius: 0.625rem;\n}")).toEqual([])
  })
  it("reprova medida e tempo fixos fora de token", () => {
    expect(cssFixedValues(".x {\n  padding: 0 1rem;\n  transition: all 150ms;\n  transform: translateY(12px);\n}")).toHaveLength(3)
  })
  it("aceita var(), --spacing(), linha fina, número sem unidade e reduced-motion", () => {
    expect(
      cssFixedValues(
        ".x {\n  padding: calc(var(--spacing) * 4);\n  transform: translateY(--spacing(3)) scale(0.85);\n  border: 1px solid var(--border);\n  transition-duration: 0.01ms !important;\n}"
      )
    ).toEqual([])
  })
  it("ignora at-rules e comentários", () => {
    expect(cssFixedValues("@media (min-width: 768px) {\n/* padding: 1rem; */\n}")).toEqual([])
  })
})

describe("globals.css só usa token fora das declarações de token", () => {
  it("src/app/globals.css", () => {
    const css = readFileSync(join(__dirname, "../app/globals.css"), "utf8")
    expect(cssFixedValues(css)).toEqual([])
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

// Utilitário de token que o Tailwind não gera falha em silêncio: a classe
// fica no componente e o navegador usa o padrão. Foi o que aconteceu com
// duration-motion-* (o v4 não tem namespace de tema para duration, então a
// ponte em @theme não criava classe). Toda duração nomeada usada em
// componente precisa de um @utility no globals.css.
describe("durações nomeadas usadas em componente existem no globals.css", () => {
  const css = readFileSync(join(__dirname, "../app/globals.css"), "utf8")
  const declared = new Set([...css.matchAll(/@utility (duration-[a-z-]+)\s*\{/g)].map((m) => m[1]))
  const used = new Set<string>()
  for (const f of readdirSync(COMPONENTS_DIR, { recursive: true }) as string[]) {
    if (!f.endsWith(".tsx")) continue
    const src = readFileSync(join(COMPONENTS_DIR, f), "utf8")
    for (const [, name] of src.matchAll(/(?:^|[\s"'`:])(duration-[a-z][a-z-]*)(?=[\s"'`])/g)) used.add(name)
  }
  it.each([...used])("%s", (name) => {
    expect(declared.has(name)).toBe(true)
  })
})
