import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { Tree, visibleTreeValues, type TreeNode } from "@/components/ui/tree"
import { IdiomaProvider } from "@/lib/idioma"

// tree: árvore solta no padrão WAI-ARIA TreeView (foco virtual por
// aria-activedescendant). É a mesma árvore que o tree-select usa no painel.

const dados: TreeNode[] = [
  {
    value: "a",
    label: "Pessoas",
    children: [
      { value: "a1", label: "Vida" },
      { value: "a2", label: "Saúde", disabled: true },
    ],
  },
  { value: "b", label: "Auto" },
]

describe("visibleTreeValues", () => {
  it("mostra só os filhos de quem está aberto", () => {
    expect(visibleTreeValues(dados, new Set())).toEqual(["a", "b"])
    expect(visibleTreeValues(dados, new Set(["a"]))).toEqual(["a", "a1", "a2", "b"])
  })
  it("com filtro, mostra só o filtro e abre tudo", () => {
    expect(visibleTreeValues(dados, new Set(), new Set(["a", "a2"]))).toEqual(["a", "a2"])
  })
})

describe("Tree", () => {
  const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
    const el = h(Tree, { data: dados, "aria-label": "Ramos", id: "t", ...props })
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }

  it("ul role=tree focável com li treeitem, nível e expansão", () => {
    const s = html({ defaultExpanded: ["a"] })
    expect(s).toMatch(/<ul[^>]*role="tree"[^>]*tabindex="0"[^>]*aria-label="Ramos"/i)
    expect(s.match(/role="treeitem"/g)).toHaveLength(4)
    expect(s).toMatch(/id="t-a"[^>]*role="treeitem"[^>]*aria-level="1"[^>]*aria-expanded="true"/)
    expect(s).toMatch(/id="t-a1"[^>]*aria-level="2"/)
    expect(s).toMatch(/id="t-a2"[^>]*aria-disabled="true"/)
  })

  it("fechado esconde os filhos", () => {
    expect(html().match(/role="treeitem"/g)).toHaveLength(2)
  })

  it("seleção simples marca aria-selected e o check", () => {
    const s = html({ isSelected: (v: string) => v === "b" })
    expect(s).toMatch(/id="t-b"[^>]*aria-selected="true"/)
    expect(s).toMatch(/id="t-a"[^>]*aria-selected="false"/)
  })

  it("com checkState vira caixa de marcação (aria-checked, mixed)", () => {
    const s = html({
      defaultExpanded: ["a"],
      checkState: (v: string) => (v === "a" ? "indeterminate" : v === "a1"),
      multiselectable: true,
    })
    expect(s).toContain('aria-multiselectable="true"')
    expect(s).toMatch(/id="t-a"[^>]*aria-checked="mixed"/)
    expect(s).toMatch(/id="t-a1"[^>]*aria-checked="true"/)
    expect(s).not.toContain("aria-selected")
  })

  it("item ativo vai no aria-activedescendant", () => {
    expect(html({ activeValue: "b" })).toContain('aria-activedescendant="t-b"')
  })

  it("botão de expandir fala o idioma", () => {
    expect(html()).toContain('aria-label="Expandir"')
    expect(html({}, "en")).toContain('aria-label="Expand"')
  })
})
