import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { atomicRegistry, type AtomicCategory } from "./atomic-registry"

// Trava do critério de camadas (ver o comentário no topo de
// atomic-registry.ts): um componente só compõe componentes de camada
// abaixo da dele; organismo, que é o topo, também compõe organismo.
// Importar só estilo (`xxxVariants`) ou tipo não conta.

const UI_DIR = join(__dirname, "../components/ui")
const nivel: Record<AtomicCategory, number> = { primitive: 0, atom: 1, molecule: 2, organism: 3 }

const IMPORT = /import\s+(type\s+)?\{([^}]*)\}\s+from\s+["']@\/components\/ui\/([\w-]+)["']/g

export function composicoes(source: string) {
  const out = new Set<string>()
  for (const [, soTipo, nomes, slug] of source.matchAll(IMPORT)) {
    if (soTipo) continue
    const usados = nomes
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n && !n.startsWith("type ") && !/Variants$/.test(n))
    if (usados.length > 0) out.add(slug)
  }
  return out
}

describe("composicoes", () => {
  it("ignora import só de estilo ou de tipo", () => {
    const src = `import { buttonVariants, type Button } from "@/components/ui/button"\nimport type { X } from "@/components/ui/x"\nimport { Icon } from "@/components/ui/icon"`
    expect([...composicoes(src)]).toEqual(["icon"])
  })
})

const componentes = readdirSync(UI_DIR)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))

describe("todo componente de ui/ tem camada", () => {
  it.each(componentes)("%s", (slug) => {
    expect(slug in atomicRegistry).toBe(true)
  })
})

// Rafael, 2026-10-29: primitivo é a base que os outros consomem, e por isso pode não ter UI. O `direction` só entrega o
// contexto de direção de texto, e é primitivo (não há mais "utilitário" fora das camadas).
describe("primitivo é base e pode não ter UI", () => {
  it("direction é primitivo", () => {
    expect(atomicRegistry.direction).toBe("primitive")
  })
})

describe("componente só compõe camadas abaixo da dele", () => {
  const comCamada = componentes.filter((slug) => slug in atomicRegistry)
  it.each(comCamada)("%s", (slug) => {
    const camada = atomicRegistry[slug]
    const src = readFileSync(join(UI_DIR, `${slug}.tsx`), "utf8")
    const acima = [...composicoes(src)]
      .filter((dep) => dep in atomicRegistry && nivel[atomicRegistry[dep]] >= nivel[camada] && camada !== "organism")
      .map((dep) => `${dep} (${atomicRegistry[dep]})`)
    expect(acima, `${slug} é ${camada}`).toEqual([])
  })
})
