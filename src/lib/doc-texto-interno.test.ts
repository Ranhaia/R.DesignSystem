import { describe, expect, it } from "vitest"

import { componentDocs } from "./component-docs"

// H-abas-padronizadas: o que está "em revisão" é parâmetro interno do R.DS (vai para _trabalho/, não para o MD). Nenhum
// campo que a página exibe pode carregar o aviso, o nome da referência (PASSI) ou o código de uma História.

// O código de História tem H maiúsculo (H-referencia-passi-ds); `h-px` e `h-5` são classe do Tailwind e podem aparecer.
const INTERNO = [/\bpassi\b|em revisão|⚠|atrito [A-Z]\d/i, /\bH-[a-z]/]

function textos(valor: unknown, caminho: string): [string, string][] {
  if (typeof valor === "string") return [[caminho, valor]]
  if (Array.isArray(valor)) return valor.flatMap((v, i) => textos(v, `${caminho}[${i}]`))
  if (valor && typeof valor === "object")
    return Object.entries(valor).flatMap(([k, v]) => textos(v, `${caminho}.${k}`))
  return []
}

describe("texto exibido na página do componente", () => {
  it.each(Object.keys(componentDocs))("%s não expõe aviso de revisão, PASSI nem código de História", (slug) => {
    const achados = textos(componentDocs[slug], slug)
      .filter(([, t]) => INTERNO.some((r) => r.test(t)))
      .map(([c, t]) => `${c}: ${t.slice(0, 80)}`)
    expect(achados, "mova o aviso para _trabalho/ (Épico ou História)").toEqual([])
  })
})
