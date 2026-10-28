import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { describe, expect, it } from "vitest"

import { coletarComponente, coletarFonte } from "../../scripts/coletar-componente.mjs"
import { diffColeta, mesclarMd, verificar } from "../../scripts/registrar-componente.mjs"
import { atomicRegistry, utilitySlugs } from "./atomic-registry"
import { componentDocs } from "./component-docs"
import { componentsList } from "./components-registry"
import { examplesMapping } from "./examples-mapping"

// Memória de componentes (E-memoria-componentes): a parte estrutural do MD
// sai do .tsx (coleta), um script só grava (registro) e esta trava reprova
// código mudado sem registro, coluna gerada editada à mão e componente sem
// os artefatos fixos.

const ROOT = resolve(__dirname, "../..")
const DOCS = join(ROOT, "docs/componentes")
const UI = join(ROOT, "src/components/ui")

const slugsComMd = readdirSync(DOCS)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
  .map((f) => f.replace(/\.md$/, ""))

const slugsUi = readdirSync(UI)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))

describe("coleta do código: button", () => {
  const c = coletarComponente("button", ROOT)

  it("lê os valores do grupo variant do cva, na ordem do código", () => {
    expect(c.variantes).toEqual([
      "default", "destructive", "outline", "secondary", "ghost", "link", "ai-primary", "ai-secondary",
    ])
  })

  it("lê os tamanhos com a medida em px e marca o alias", () => {
    expect(c.tamanhos.map((t) => t.valor)).toEqual([
      "xs", "sm", "default", "md", "lg", "xl", "icon-xs", "icon-sm", "icon", "icon-md", "icon-lg", "icon-xl",
    ])
    const t = Object.fromEntries(c.tamanhos.map((x) => [x.valor, x]))
    expect(t.xs.px).toBe(24)
    expect(t["icon-xl"].px).toBe(56)
    expect(t.md.igualA).toBe("default")
    expect(t.default.igualA).toBeNull()
  })

  it("lista as partes (funções de componente) na ordem do código", () => {
    expect(c.partes).toEqual(["Button", "ButtonSkeleton"])
  })

  it("lê props próprias com tipo e padrão, inclusive de type alias local e VariantProps", () => {
    const p = Object.fromEntries(c.props.filter((x) => x.parte === "Button").map((x) => [x.nome, x]))
    expect(p.variant.padrao).toBe("default")
    expect(p.variant.tipo).toContain("`ai-primary`")
    expect(p.size.tipo).toContain("`icon-xl`")
    expect(p.asChild).toMatchObject({ tipo: "`boolean`", padrao: "false" })
    expect(p.fullWidth).toMatchObject({ tipo: "`boolean`", padrao: "false" })
    for (const nome of ["children", "icon", "label"]) expect(p[nome]?.tipo).toBe("`React.ReactNode`")
    expect(p.className).toBeUndefined()
  })

  it("resolve VariantProps<typeof x>[\"grupo\"] para a lista de valores", () => {
    const size = c.props.find((x) => x.parte === "ButtonSkeleton" && x.nome === "size")
    expect(size?.tipo).toContain("`icon-xl`")
    expect(size?.padrao).toBe("default")
  })

  it("lista só tokens declarados no CSS do projeto, sem prefixo de estado nem opacidade", () => {
    for (const t of [
      "bg-primary", "text-primary-foreground", "ring-ring", "border-ring", "bg-destructive",
      "duration-motion-fast", "ease-spring", "--scale-pressed", "--ai-gradient-rest",
      "--ai-gradient-hover", "shadow-sm", "rounded-md", "bg-ai-surface",
    ]) expect(c.tokens).toContain(t)
    for (const t of ["inline-flex", "h-10", "px-4", "w-full", "bg-primary/90", "hover:bg-accent"])
      expect(c.tokens).not.toContain(t)
    expect([...c.tokens].sort()).toEqual(c.tokens)
  })
})

describe("coleta do código: tabs e dialog", () => {
  it("tabs: partes, variantes do TabsList e props com padrão", () => {
    const c = coletarComponente("tabs", ROOT)
    expect(c.partes).toEqual(["Tabs", "TabsList", "TabsTrigger", "TabsContent"])
    expect(c.variantes).toEqual(["default", "line"])
    expect(c.tamanhos).toEqual([])
    expect(c.props.find((p) => p.nome === "orientation")).toMatchObject({ parte: "Tabs", padrao: "horizontal" })
    expect(c.props.find((p) => p.nome === "variant")).toMatchObject({ parte: "TabsList", padrao: "default" })
    expect(c.tokens).toEqual(expect.arrayContaining(["rounded-outer-lg", "rounded-inner", "radius-inset-0.75", "bg-muted"]))
  })

  it("dialog: sem cva, props de partes diferentes ficam separadas", () => {
    const c = coletarComponente("dialog", ROOT)
    expect(c.variantes).toEqual([])
    expect(c.partes).toEqual(expect.arrayContaining(["Dialog", "DialogContent", "DialogFooter", "DialogTitle"]))
    const close = c.props.filter((p) => p.nome === "showCloseButton")
    expect(close).toEqual([
      expect.objectContaining({ parte: "DialogContent", tipo: "`boolean`", padrao: "true" }),
      expect.objectContaining({ parte: "DialogFooter", tipo: "`boolean`", padrao: "false" }),
    ])
  })
})

describe("coleta: casos de borda", () => {
  it("arquivo sem cva nem props próprias", () => {
    const c = coletarFonte("x", `export function X(props: React.ComponentProps<"div">) { return <div data-slot="x" {...props} /> }`, new Set())
    expect(c).toMatchObject({ variantes: [], tamanhos: [], props: [], partes: ["X"] })
  })

  it("medida fracionada e tamanho sem altura", () => {
    const src = `const v = cva("", { variants: { size: { a: "h-7.5", b: "px-2" } } })\nfunction X() { return null }`
    const c = coletarFonte("x", src, new Set())
    expect(c.tamanhos).toEqual([
      { valor: "a", px: 30, igualA: null },
      { valor: "b", px: null, igualA: null },
    ])
  })

  it("token atrás de variante com colchete e barra", () => {
    const tokens = new Set(["bg-accent", "bg-input", "bg-muted"])
    const src = `function X() { return <div className="hover:bg-accent dark:hover:bg-input/50 group-data-[orientation=vertical]/tabs:bg-muted" /> }`
    expect(coletarFonte("x", src, tokens).tokens).toEqual(["bg-accent", "bg-input", "bg-muted"])
  })
})

const coletaBase = {
  slug: "x",
  partes: ["X", "XItem"],
  variantes: ["a", "b", "c"],
  tamanhos: [
    { valor: "sm", px: 32, igualA: null },
    { valor: "md", px: 40, igualA: null },
    { valor: "icon-sm", px: 32, igualA: null },
  ],
  props: [
    { nome: "variant", parte: "X", tipo: "`a` · `b` · `c`", padrao: "a" },
    { nome: "dense", parte: "XItem", tipo: "`boolean`", padrao: "false" },
  ],
  tokens: ["bg-primary", "ring-ring"],
}

const mdBase = `---
slug: x
---

# X

Descrição.

## Quando usar

- Texto do auditor que não pode mudar.

## Anatomia

| Parte | O que é |
|---|---|
| \`X\` | Raiz |
| Ícone (opcional) | Parte visual escrita pelo auditor |

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| \`variant\` | velho | velho | Hierarquia |
| \`removida\` | \`string\` | — | Saiu do código |
| \`value\` · \`defaultValue\` (X) | \`string\` | — | Herdada do Radix |

## Variantes

| Valor | Quando usar |
|---|---|
| \`a\` · \`b\` | Desc AB |
| \`velha\` | Não existe mais |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| \`md / sm\` | 99 px | Desc MS |
| \`icon-*\` | qualquer | Só ícone |

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Escrito pelo auditor |

## Tokens usados

\`bg-velho\`

## Faça

- Algo.
`

describe("mesclarMd", () => {
  const anterior = { ...coletaBase, props: [...coletaBase.props, { nome: "removida", parte: "X", tipo: "`string`", padrao: null }] }
  const md = mesclarMd(mdBase, coletaBase, anterior)

  it("Variantes: um valor por linha, na ordem do código, descrição preservada", () => {
    expect(md).toContain("| `a` | Desc AB |")
    expect(md).toContain("| `b` | Desc AB |")
    expect(md).toContain("| `c` | [a preencher] |")
    expect(md).not.toContain("velha")
  })

  it("Tamanhos: medida do código, descrição por chave composta ou glob", () => {
    expect(md).toContain("| `sm` | 32 px | Desc MS |")
    expect(md).toContain("| `md` | 40 px | Desc MS |")
    expect(md).toContain("| `icon-sm` | 32 px | Só ícone |")
    expect(md).not.toContain("99 px")
  })

  it("Props: atualiza tipo e padrão, mantém herdada, tira a que saiu do código, acrescenta a nova", () => {
    expect(md).toContain("| `variant` | `a` · `b` · `c` | `a` | Hierarquia |")
    expect(md).toContain("| `value` · `defaultValue` (X) | `string` | — | Herdada do Radix |")
    expect(md).not.toContain("removida")
    expect(md).toContain("| `dense` (XItem) | `boolean` | `false` | [a preencher] |")
  })

  it("Anatomia: mantém linha do auditor e acrescenta parte que falta", () => {
    expect(md).toContain("| `X` | Raiz |")
    expect(md).toContain("| Ícone (opcional) | Parte visual escrita pelo auditor |")
    expect(md).toContain("| `XItem` | [a preencher] |")
  })

  it("Tokens usados: lista inteira vem da coleta", () => {
    expect(md).toContain("`bg-primary` `ring-ring`")
    expect(md).not.toContain("bg-velho")
  })

  it("não toca nas seções de intenção", () => {
    for (const trecho of ["- Texto do auditor que não pode mudar.", "| Padrão | Escrito pelo auditor |", "## Faça\n\n- Algo."])
      expect(md).toContain(trecho)
  })

  it("seção sem dado no código fica como está (tamanho único em prosa)", () => {
    const semTamanho = { ...coletaBase, tamanhos: [] }
    const prosa = mdBase.replace(/## Tamanhos[\s\S]*?(?=## Estados)/, "## Tamanhos\n\nUm só: 36 px.\n\n")
    expect(mesclarMd(prosa, semTamanho, semTamanho)).toContain("## Tamanhos\n\nUm só: 36 px.\n")
  })

  it("é idempotente", () => {
    expect(mesclarMd(md, coletaBase, coletaBase)).toBe(md)
  })
})

describe("diffColeta", () => {
  it("coleta igual não gera linha", () => {
    expect(diffColeta(coletaBase, coletaBase)).toEqual([])
  })

  it("lista o que entrou, saiu e mudou", () => {
    const nova = {
      ...coletaBase,
      variantes: ["a", "c", "d"],
      props: [{ ...coletaBase.props[0], padrao: "c" }, coletaBase.props[1]],
    }
    const linhas = diffColeta(coletaBase, nova).join("\n")
    expect(linhas).toContain("+ `d`")
    expect(linhas).toContain("− `b`")
    expect(linhas).toMatch(/`variant`.*padrão/)
  })

  it("sem coleta anterior é primeiro registro", () => {
    expect(diffColeta(null, coletaBase).join("\n")).toMatch(/Primeiro registro/)
  })
})

describe("trava da memória (repositório real)", () => {
  it("todo MD está registrado: coleta em dia com o código, seções geradas sem edição à mão, histórico presente", () => {
    expect(verificar(ROOT)).toEqual([])
  })

  it.each(slugsComMd)("%s: variantes e tamanhos da página existem no código", (slug) => {
    const c = coletarComponente(slug, ROOT)
    const doc = componentDocs[slug]
    for (const v of doc.variants) expect(c.variantes).toContain(v.value)
    for (const s of doc.sizes) expect(c.tamanhos.map((t) => t.valor)).toContain(s.value)
  })

  it.each(slugsComMd)("%s: texto da página sem marcação crua de Markdown", (slug) => {
    const d = componentDocs[slug]
    const textos = [
      d.description, d.whenToUse, ...d.doGuidelines, ...d.dontGuidelines,
      ...d.anatomy.flatMap((a) => [a.part, a.description]),
      ...d.variants.map((v) => v.description), ...d.sizes.map((s) => s.description),
      ...d.states.flatMap((s) => [s.name, s.description]),
      ...d.props.flatMap((p) => [p.name, p.type, p.description]),
    ]
    for (const t of textos) expect(t).not.toMatch(/\*\*|`/)
    expect(d.description).not.toContain("\n")
  })
})

// Componentes que ainda não passaram pelo ciclo (H-memoria-replicar-lotes).
// Catraca: a lista só diminui. Ganhou MD → sai daqui.
const PENDENTES_MD = [
  "accordion", "alert-dialog", "alert", "aspect-ratio", "attachment",
  "avatar", "badge", "box", "breadcrumb", "bubble", "button-group",
  "calendar", "card", "carousel", "chart", "checkbox", "chip", "collapsible",
  "combobox", "command", "context-menu", "direction", "drawer",
  "dropdown-menu", "empty", "field", "file-uploader", "files", "form",
  "hover-card", "icon-button", "icon", "input-group", "input-otp", "input",
  "item", "kbd", "label", "link", "list", "marker", "menubar", "message",
  "multi-select", "native-select", "navigation-menu", "pagination",
  "popover", "progress", "radio-group", "resizable", "scroll-area",
  "segmented-control", "select", "separator", "sheet", "sidebar", "skeleton",
  "slider", "sonner", "speed-dial", "spinner", "split-button", "stepper",
  "switch", "table", "tag", "text", "textarea", "thumbnail", "time-picker",
  "title", "toggle-group", "toggle", "tooltip", "tree-select",
]
// Exceções conhecidas em 2026-10-28.
const SEM_EXEMPLO = ["icon"]

describe("artefatos fixos de cada componente", () => {
  const readme = readFileSync(join(DOCS, "README.md"), "utf8")

  it.each(slugsUi)("%s", (slug) => {
    const utilitario = utilitySlugs.includes(slug)
    if (!utilitario) {
      expect(existsSync(join(UI, `${slug}.stories.tsx`)), "story").toBe(true)
      expect(atomicRegistry[slug], "atomic-registry.ts").toBeDefined()
    }
    expect(componentsList.some((c) => c.slug === slug), "components-registry.ts").toBe(true)
    if (!SEM_EXEMPLO.includes(slug)) expect(examplesMapping[slug], "examples-mapping.ts").toBeDefined()

    const temMd = slugsComMd.includes(slug)
    expect(temMd || PENDENTES_MD.includes(slug), "MD em docs/componentes/ (ou na lista PENDENTES_MD)").toBe(true)
    if (temMd) {
      expect(PENDENTES_MD, "tem MD: tirar de PENDENTES_MD").not.toContain(slug)
      expect(readme, "listado no README.md da porta de entrada").toContain(`](${slug}.md)`)
    }
  })

  it("PENDENTES_MD só tem componente que existe", () => {
    for (const slug of PENDENTES_MD) expect(slugsUi).toContain(slug)
  })
})
