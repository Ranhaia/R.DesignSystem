import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { describe, expect, it } from "vitest"

import { coletarComponente, coletarFonte } from "../../scripts/coletar-componente.mjs"
import { alinharAoModelo, diffColeta, mdNovo, mesclarMd, verificar } from "../../scripts/registrar-componente.mjs"
import { atomicRegistry } from "./atomic-registry"
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

  it("lista os componentes do R.DS que ele usa (composição)", () => {
    expect(c.compoe).toEqual(["skeleton"])
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

  it("lista tokens do CSS e a escala do Tailwind, sem prefixo de estado nem opacidade", () => {
    for (const t of [
      "bg-primary", "text-primary-foreground", "ring-ring", "border-ring", "bg-destructive",
      "duration-motion-fast", "ease-spring", "--scale-pressed", "--ai-gradient-rest",
      "--ai-gradient-hover", "shadow-sm", "rounded-md", "bg-ai-surface",
      "text-sm", "text-xs", "font-medium", "h-10", "px-4", "gap-2", "size-4",
    ]) expect(c.tokens).toContain(t)
    for (const t of ["inline-flex", "w-full", "bg-primary/90", "hover:bg-accent"])
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
    expect(c.compoe).toEqual(["button", "icon"])
    expect(coletarComponente("tabs", ROOT).compoe).toEqual([])
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

  it("composição ignora import só de estilo ou de tipo", () => {
    const src = `import { buttonVariants } from "@/components/ui/button"\nimport type { X } from "@/components/ui/x"\nimport { Icon } from "@/components/ui/icon"\nfunction Y() { return null }`
    expect(coletarFonte("y", src, new Set()).compoe).toEqual(["icon"])
  })

  it("token atrás de variante com colchete e barra", () => {
    const tokens = new Set(["bg-accent", "bg-input", "bg-muted"])
    const src = `function X() { return <div className="hover:bg-accent dark:hover:bg-input/50 group-data-[orientation=vertical]/tabs:bg-muted" /> }`
    expect(coletarFonte("x", src, tokens).tokens).toEqual(["bg-accent", "bg-input", "bg-muted"])
  })

  it("escala do Tailwind entra; medida relativa, valor entre colchete e utilitário sem escala ficam de fora", () => {
    const src = `function X() { return <div className="p-3 gap-1.5 text-sm font-medium size-4 -mt-1 max-w-lg w-full flex-1 h-[calc(100%-1px)] text-left items-center" /> }`
    expect(coletarFonte("x", src, new Set()).tokens).toEqual(["font-medium", "gap-1.5", "max-w-lg", "mt-1", "p-3", "size-4", "text-sm"])
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
  compoe: ["button", "icon"],
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

## Composição

Texto velho.

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

  it("Composição: lista gerada dos componentes usados, com link para o MD", () => {
    expect(md).toContain("## Composição\n\nUsa: [`button`](button.md) · [`icon`](icon.md).\n")
    expect(md).not.toContain("Texto velho.")
    const sozinho = mesclarMd(mdBase, { ...coletaBase, compoe: [] }, coletaBase)
    expect(sozinho).toContain("## Composição\n\nNão usa outro componente do R.DS.\n")
  })

  it("Tokens usados: uma linha por contexto, no formato da Acessibilidade, vinda da coleta", () => {
    expect(md).toContain("## Tokens usados\n\n- **Cor:** `bg-primary`\n- **Foco:** `ring-ring`\n")
    expect(md).not.toContain("bg-velho")
  })

  it("Tokens usados: linha longa quebra com recuo de 2 espaços e continua sendo uma linha de lista", () => {
    const muitos = { ...coletaBase, tokens: Array.from({ length: 12 }, (_, i) => `bg-cor-${i}`) }
    const longo = mesclarMd(mdBase, muitos, muitos)
    const linhas = longo.split("## Tokens usados\n\n")[1].split("\n## ")[0].trimEnd().split("\n")
    expect(linhas[0]).toMatch(/^- \*\*Cor:\*\* `bg-cor-0`/)
    expect(linhas.length).toBeGreaterThan(1)
    for (const l of linhas.slice(1)) expect(l).toMatch(/^ {2}`/)
    expect(mesclarMd(longo, muitos, muitos)).toBe(longo)
  })

  it("Tokens usados: sem token, 'Nenhum.'", () => {
    const nenhum = { ...coletaBase, tokens: [] }
    expect(mesclarMd(mdBase, nenhum, nenhum)).toContain("## Tokens usados\n\nNenhum.\n")
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

const modeloMini = `---
slug: exemplo                       # comentário do campo
nome: Exemplo
camada: atom
sinonimos: []
vizinhos: []
---

<!--
Instruções do modelo.
-->

# Exemplo

[a preencher: uma frase]

## Quando usar

- [a preencher]

## Anatomia

| Parte | O que é |
|---|---|

## Composição

## Faça

- [a preencher]
`

describe("componente novo nasce do modelo", () => {
  const md = mdNovo("meu-item", modeloMini, { nome: "Meu Item", camada: "molecule", sinonimos: ["item-meu"] })

  it("preenche o que já se sabe e mantém o resto por preencher", () => {
    expect(md).toMatch(/^---\nslug: meu-item\nnome: Meu Item\ncamada: molecule\nsinonimos: \[item-meu\]\nvizinhos: \[\]\n---\n/)
    expect(md).toContain("# Meu Item\n")
    expect(md).toContain("[a preencher: uma frase]")
    expect(md).not.toContain("<!--")
  })

  it("alinhar insere a seção que falta no lugar do modelo e não mexe no resto", () => {
    const velho = md.replace("## Composição\n\n", "").replace("- [a preencher]\n\n## Anatomia", "- Escrito.\n\n## Anatomia")
    const alinhado = alinharAoModelo(velho, modeloMini)
    expect(secoesDe(alinhado)).toEqual(["Quando usar", "Anatomia", "Composição", "Faça"])
    expect(alinhado).toContain("- Escrito.")
    expect(alinharAoModelo(alinhado, modeloMini)).toBe(alinhado)
  })

  it("registrar duas vezes dá o mesmo MD, inclusive com seção que nasceu vazia", () => {
    const uma = mesclarMd(alinharAoModelo(md, modeloMini), coletaBase, coletaBase)
    expect(uma).toContain("## Composição\n\nUsa: [`button`](button.md) · [`icon`](icon.md).\n\n## Faça")
    expect(mesclarMd(alinharAoModelo(uma, modeloMini), coletaBase, coletaBase)).toBe(uma)
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

// Declaração completa: todo MD tem as mesmas seções e campos do _modelo.md
// (a lista mora só lá), acessibilidade nas 4 chaves, toda proibição aponta a
// alternativa e nada fica por preencher. Régua: docs/componentes/_baliza.md.
const modelo = readFileSync(join(DOCS, "_modelo.md"), "utf8").replace(/\r\n/g, "\n")
const secoesDe = (md: string) => [...md.replace(/```[\s\S]*?```/g, "").matchAll(/^## (.+)$/gm)].map((m) => m[1].trim())
const camposDe = (md: string) =>
  Object.fromEntries([...(md.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "").matchAll(/^([\w-]+):[ \t]*([^#\n]*?)[ \t]*(?:#.*)?$/gm)].map((m) => [m[1], m[2]]))
const lista = (v: string | undefined) => (v ?? "").replace(/^\[|\]$/g, "").split(",").map((s) => s.trim()).filter(Boolean)
const secao = (md: string, titulo: string) => md.match(new RegExp(`^## ${titulo}\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "m"))?.[1] ?? ""
const sinonimos: Record<string, string[]> = JSON.parse(readFileSync(join(ROOT, "docs/sinonimos.json"), "utf8"))
// PASSI sugere ~4 KB de intenção; as tabelas geradas somam o resto.
const LIMITE_BYTES = 8 * 1024

// Molde curto da página de componente (H-doc-pagina-condensada, Fase 4). Mesmos números de _baliza.md, "Seção por seção".
const LIMITES_ITENS: Record<string, [number, number]> = {
  "Quando usar": [2, 3],
  "Quando NÃO usar": [2, 3],
  "Faça": [3, 3],
  "NÃO faça": [3, 3],
}

describe.each(slugsComMd)("%s declara todas as partes", (slug) => {
  const md = readFileSync(join(DOCS, `${slug}.md`), "utf8").replace(/\r\n/g, "\n")
  const fm = camposDe(md)

  it("mesmas seções do _modelo.md, na mesma ordem", () => {
    expect(secoesDe(md)).toEqual(secoesDe(modelo))
  })

  it("frontmatter completo e coerente com o código", () => {
    expect(Object.keys(fm)).toEqual(Object.keys(camposDe(modelo)))
    expect(fm.slug).toBe(slug)
    expect(fm.camada).toBe(atomicRegistry[slug])
    expect(existsSync(join(ROOT, fm.codigo)), fm.codigo).toBe(true)
    if (SEM_STORY.includes(slug)) expect(fm.story, "primitivo sem UI: story vazia").toBe("")
    else expect(existsSync(join(ROOT, fm.story)), fm.story).toBe(true)
    expect(lista(fm.vizinhos).length, "ao menos um vizinho").toBeGreaterThan(0)
    for (const v of lista(fm.vizinhos)) expect(slugsUi, `vizinho ${v}`).toContain(v)
    expect(lista(fm.referencias).length, "ao menos uma referência").toBeGreaterThan(0)
    // shortcut: sinônimos moram em dois lugares até todos os MDs existirem; depois o JSON passa a ser gerado dos MDs.
    expect(lista(fm.sinonimos)).toEqual(sinonimos[slug])
  })

  it("acessibilidade nas 4 chaves, todas preenchidas", () => {
    const a11y = secao(md, "Acessibilidade")
    for (const chave of ["Teclado", "Leitor de tela", "Foco", "Cuidados"])
      expect(a11y, chave).toMatch(new RegExp(`^- \\*\\*${chave}:\\*\\* \\S`, "m"))
  })

  it("toda proibição aponta a alternativa (→)", () => {
    for (const titulo of ["Quando NÃO usar", "NÃO faça"]) {
      const itens = secao(md, titulo).split("\n").filter((l) => l.startsWith("- "))
      expect(itens.length, titulo).toBeGreaterThan(0)
      for (const item of itens) expect(item, titulo).toContain("→")
    }
  })

  it("itens por seção dentro do molde curto", () => {
    for (const [titulo, [min, max]] of Object.entries(LIMITES_ITENS)) {
      const n = secao(md, titulo).split("\n").filter((l) => l.startsWith("- ")).length
      expect(n, `${titulo}: ${n} itens, o molde pede de ${min} a ${max}`).toBeGreaterThanOrEqual(min)
      expect(n, `${titulo}: ${n} itens, o molde pede de ${min} a ${max}`).toBeLessThanOrEqual(max)
    }
  })

  it("nada por preencher, sem comentário do modelo", () => {
    expect(md).not.toContain("[a preencher")
    expect(md).not.toContain("<!--")
  })

  it("exemplo mínimo importa do próprio componente", () => {
    expect(secao(md, "Exemplo mínimo")).toContain(`from "@/components/ui/${slug}"`)
  })

  it(`cabe em ${LIMITE_BYTES / 1024} KB`, () => {
    expect(Buffer.byteLength(md)).toBeLessThanOrEqual(LIMITE_BYTES)
  })
})

// Componentes que ainda não passaram pelo ciclo (H-memoria-replicar-lotes).
// Catraca: a lista só diminui. Ganhou MD → sai daqui.
const PENDENTES_MD = [
  "alert-dialog", "calendar", "carousel", "chart", "combobox", "command",
  "context-menu", "drawer", "dropdown-menu", "files", "form", "icon-button",
  "input-group", "menubar", "message", "multi-select", "navigation-menu",
  "pagination", "resizable", "scroll-area", "segmented-control", "sheet",
  "sidebar", "sonner", "speed-dial", "split-button", "stepper", "table",
  "time-picker", "toggle-group", "tree-select",
]
// Exceções conhecidas em 2026-10-28.
const SEM_EXEMPLO = ["icon"]
// Primitivo sem UI (Rafael, 2026-10-29): é base que os outros consomem e não renderiza nada, então não tem story e o MD
// deixa `story:` vazio.
const SEM_STORY = ["direction"]

describe("artefatos fixos de cada componente", () => {
  const readme = readFileSync(join(DOCS, "README.md"), "utf8")

  it.each(slugsUi)("%s", (slug) => {
    if (!SEM_STORY.includes(slug)) expect(existsSync(join(UI, `${slug}.stories.tsx`)), "story").toBe(true)
    expect(atomicRegistry[slug], "atomic-registry.ts").toBeDefined()
    expect(componentsList.some((c) => c.slug === slug), "components-registry.ts").toBe(true)
    if (!SEM_EXEMPLO.includes(slug)) expect(examplesMapping[slug], "examples-mapping.ts").toBeDefined()

    const temMd = slugsComMd.includes(slug)
    expect(temMd || PENDENTES_MD.includes(slug), "MD em docs/componentes/ (ou na lista PENDENTES_MD)").toBe(true)
    if (temMd) {
      expect(PENDENTES_MD, "tem MD: tirar de PENDENTES_MD").not.toContain(slug)
      expect(readme, "listado no README.md da porta de entrada").toContain(`](${slug}.md)`)
    }
  })

  it("SEM_STORY só tem componente que de fato não tem story", () => {
    for (const slug of SEM_STORY) {
      expect(slugsUi).toContain(slug)
      expect(existsSync(join(UI, `${slug}.stories.tsx`)), `${slug} ganhou story: tire da lista`).toBe(false)
    }
  })

  it("PENDENTES_MD só tem componente que existe", () => {
    for (const slug of PENDENTES_MD) expect(slugsUi).toContain(slug)
  })
})
