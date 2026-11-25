import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { MultiSelect, adicionarValorLivre } from "@/components/ui/multi-select"

// multi-select com `creatable`: Enter num texto que não é opção vira chip.

describe("adicionarValorLivre", () => {
  it("acrescenta o texto aparado", () => {
    expect(adicionarValorLivre("  urgente ", ["a"])).toEqual(["a", "urgente"])
  })
  it("ignora vazio e repetido", () => {
    expect(adicionarValorLivre("   ", ["a"])).toBeNull()
    expect(adicionarValorLivre("a", ["a"])).toBeNull()
  })
})

describe("MultiSelect creatable", () => {
  const opcoes = [{ label: "Alfa", value: "alfa" }]
  it("valor livre aparece como chip com o próprio texto", () => {
    const s = renderToString(
      h(MultiSelect, { options: opcoes, value: ["alfa", "minha-tag"], onValueChange: () => {}, creatable: true, "aria-label": "Tags" })
    )
    expect(s).toContain("Alfa")
    expect(s).toContain("minha-tag")
    expect(s).toContain('data-creatable="true"')
  })
  it("sem creatable, nada muda", () => {
    const s = renderToString(h(MultiSelect, { options: opcoes, value: [], onValueChange: () => {}, "aria-label": "Tags" }))
    expect(s).not.toContain("data-creatable")
  })
})
