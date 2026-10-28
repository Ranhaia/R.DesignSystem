import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { parseComponentMd } from "../../scripts/parse-component-md.mjs"
import { componentDocs } from "./component-docs"

// Contrato do dado da página condensada: H-doc-pagina-condensada, Fase 1.
const parse = (md: string) => parseComponentMd(md).doc as any

const docsDir = resolve(__dirname, "../../docs/componentes")
const slugsComMd = readdirSync(docsDir)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
  .map((f) => f.replace(/\.md$/, ""))

const COMPLETO = `---
slug: demo
nome: Demo
camada: molecule
codigo: src/components/ui/demo.tsx
story: src/components/ui/demo.stories.tsx
status: piloto
sinonimos: [d]
vizinhos: [alfa, beta]
referencias: [shadcn:demo]
---

# Demo

Frase de abertura.

## Quando usar

- Primeiro caso.
- Segundo caso com \`codigo\`.

## Quando NÃO usar

- Vai para outra página → \`link\`.

## Conteúdo

- Verbo + objeto.

## Acessibilidade

- **Teclado:** Tab chega.
- **Leitor de tela:** papel \`button\`.
- **Foco:** fica no botão.
- **Cuidados:** use \`aria-disabled\`.

## Tokens usados

\`bg-primary\` \`--scale-pressed\`
\`ring-ring\`

## Faça

- Algo.
`

const MINIMO = `---
slug: enxuto
nome: Enxuto
camada: atom
codigo: src/components/ui/enxuto.tsx
story: src/components/ui/enxuto.stories.tsx
status: piloto
---

# Enxuto

Só a frase.
`

describe("parseComponentMd: campos da página condensada", () => {
  it("extrai meta, listas, acessibilidade e tokens de um MD completo", () => {
    const doc = parse(COMPLETO)
    expect(doc.meta).toEqual({
      nome: "Demo",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/demo.tsx",
      story: "src/components/ui/demo.stories.tsx",
      vizinhos: ["alfa", "beta"],
    })
    expect(doc.whenToUseItems).toEqual(["Primeiro caso.", "Segundo caso com codigo."])
    expect(doc.whenNotToUse).toEqual(["Vai para outra página → link."])
    expect(doc.content).toEqual(["Verbo + objeto."])
    expect(doc.accessibility).toEqual({
      keyboard: "Tab chega.",
      screenReader: "papel button.",
      focus: "fica no botão.",
      cautions: "use aria-disabled.",
    })
    expect(doc.tokens).toEqual(["bg-primary", "--scale-pressed", "ring-ring"])
  })

  it("mantém o que já existia: whenToUse continua string e os 10 campos antigos seguem lá", () => {
    const doc = parse(COMPLETO)
    expect(doc.whenToUse).toBe("Primeiro caso. Segundo caso com codigo.")
    expect(doc.description).toBe("Frase de abertura.")
    for (const k of ["anatomy", "variants", "states", "sizes", "doGuidelines", "dontGuidelines", "code", "props"]) {
      expect(doc, k).toHaveProperty(k)
    }
  })

  it("deixa o campo ausente quando a seção não existe", () => {
    const doc = parse(MINIMO)
    expect(doc.meta).toMatchObject({ nome: "Enxuto", camada: "atom", status: "piloto", vizinhos: [] })
    for (const k of ["whenToUseItems", "whenNotToUse", "content", "accessibility", "tokens"]) {
      expect(doc[k], k).toBeUndefined()
    }
  })

  it("lê o button.md real", () => {
    const doc = parse(readFileSync(resolve(docsDir, "button.md"), "utf8"))
    expect(doc.meta).toMatchObject({ nome: "Button", camada: "atom", status: "estavel", codigo: "src/components/ui/button.tsx" })
    expect(doc.meta.vizinhos).toEqual(["link", "icon-button", "split-button", "button-group"])
    expect(doc.whenToUseItems).toHaveLength(2)
    expect(doc.whenNotToUse).toHaveLength(3)
    expect(doc.whenNotToUse.every((i: string) => i.includes("→"))).toBe(true)
    expect(doc.content).toHaveLength(3)
    expect(doc.accessibility.keyboard).toMatch(/^Tab chega/)
    expect(doc.accessibility.cautions).toMatch(/aria-disabled/)
    expect(doc.tokens).toContain("bg-primary")
    expect(doc.tokens).toContain("--scale-pressed")
    expect(doc.tokens.length).toBeGreaterThan(20)
    expect(doc.tokens.some((t: string) => t.includes("`"))).toBe(false)
  })
})

describe("component-docs.ts gerado: campos novos só em quem tem MD", () => {
  it("existe ao menos um MD", () => {
    expect(slugsComMd.length).toBeGreaterThan(0)
  })

  it.each(Object.keys(componentDocs))("%s", (slug) => {
    const d = componentDocs[slug] as any
    if (slugsComMd.includes(slug)) {
      expect(d.meta?.nome, "meta").toBeTruthy()
      expect(d.whenToUseItems?.length, "whenToUseItems").toBeGreaterThan(0)
      expect(d.whenNotToUse?.length, "whenNotToUse").toBeGreaterThan(0)
      expect(Object.values(d.accessibility ?? {}).filter(Boolean), "accessibility").toHaveLength(4)
      expect(Array.isArray(d.tokens), "tokens").toBe(true)
    } else {
      for (const k of ["meta", "whenToUseItems", "whenNotToUse", "content", "accessibility", "tokens"]) {
        expect(d[k], k).toBeUndefined()
      }
    }
  })
})
