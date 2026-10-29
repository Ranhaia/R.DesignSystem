import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

import { coletarComponente } from "../../scripts/coletar-componente.mjs"
import { agruparTokens, CONTEXTOS, contextoDoToken } from "../../scripts/contexto-token.mjs"
import { componentsList } from "./components-registry"

// H-abas-padronizadas: a aba Tokens tem uma linha por contexto (Cor, Tipografia…), como a Acessibilidade tem uma por
// chave. A classificação mora num lugar só, `scripts/contexto-token.mjs`, e esta trava cobre todos os componentes.

const ROOT = resolve(__dirname, "../..")

describe("contextoDoToken", () => {
  const tabela: Record<string, string[]> = {
    Cor: ["bg-primary", "text-primary-foreground", "border-ring", "border-ai-interactive", "fill-muted", "stroke-border", "--ai-gradient-rest", "--popover", "--sidebar-accent", "--color-border"],
    Tipografia: ["text-sm", "text-xs", "text-2xl", "font-heading", "font-sans", "font-medium", "leading-none", "tracking-tight"],
    Espaço: ["p-3", "px-4", "gap-1.5", "size-4", "h-9", "w-75", "min-h-0", "max-w-lg", "mt-1", "--form-control-size"],
    Raio: ["rounded-md", "rounded-full", "rounded-r-md", "rounded-outer-lg", "rounded-inner", "radius-inset-0.75", "--radius"],
    Sombra: ["shadow-sm", "shadow-xs", "shadow-lg"],
    Movimento: ["duration-motion-fast", "ease-spring", "animate-accordion-down", "--scale-pressed", "--motion-ease-spring"],
    Foco: ["ring-ring", "ring-offset-background", "ring-destructive", "outline-ring"],
    Ícone: ["--icon-fill", "--icon-font-family", "--font-material-rounded"],
  }

  for (const [contexto, tokens] of Object.entries(tabela))
    it.each(tokens)(`${contexto}: %s`, (token) => {
      expect(contextoDoToken(token)).toBe(contexto)
    })

  it("o que não é token não tem contexto", () => {
    for (const t of ["inline-flex", "w-full", "flex-1", "h-[calc(100%-1px)]", "text-left", "bg-primary/90", "hover:bg-accent"])
      expect(contextoDoToken(t), t).toBeNull()
  })

  it("a lista de contextos é a que a página mostra, nesta ordem", () => {
    expect(CONTEXTOS).toEqual(["Cor", "Tipografia", "Espaço", "Raio", "Sombra", "Movimento", "Foco", "Ícone"])
  })
})

describe("agruparTokens", () => {
  it("agrupa na ordem dos contextos, só os que têm token, e mantém a ordem dos itens", () => {
    expect(agruparTokens(["ring-ring", "bg-primary", "shadow-sm", "bg-accent", "ease-spring"])).toEqual([
      { contexto: "Cor", itens: ["bg-primary", "bg-accent"] },
      { contexto: "Sombra", itens: ["shadow-sm"] },
      { contexto: "Movimento", itens: ["ease-spring"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ])
  })

  it("sem token, sem grupo", () => {
    expect(agruparTokens([])).toEqual([])
  })

  it("token sem contexto reprova, dizendo onde classificar", () => {
    expect(() => agruparTokens(["bg-primary", "xyz-1"])).toThrow(/xyz-1.*contexto-token\.mjs/)
  })
})

describe("todos os componentes", () => {
  it.each(componentsList.map((c) => c.slug))("%s: todo token coletado tem contexto", (slug) => {
    const semContexto = coletarComponente(slug, ROOT).tokens.filter((t: string) => contextoDoToken(t) === null)
    expect(semContexto, "classifique em scripts/contexto-token.mjs").toEqual([])
  })
})
