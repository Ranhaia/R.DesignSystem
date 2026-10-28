import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parseComponentMd } from "./parse-component-md.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const DOCS_DIR = path.join(ROOT, "docs", "componentes")
const TARGET_FILE = path.join(ROOT, "src", "lib", "component-docs.ts")

export function escapeString(str) {
  if (typeof str !== "string") return '""'
  return JSON.stringify(str)
}

export function formatDocEntry(key, doc, indent = "  ") {
  const i2 = indent + "  "
  const i3 = indent + "    "
  const lines = []

  const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key)
  lines.push(`${indent}${formattedKey}: {`)
  lines.push(`${i2}description: ${escapeString(doc.description)},`)
  lines.push(`${i2}whenToUse: ${escapeString(doc.whenToUse)},`)

  // anatomy
  if (!doc.anatomy || doc.anatomy.length === 0) {
    lines.push(`${i2}anatomy: [],`)
  } else {
    lines.push(`${i2}anatomy: [`)
    for (const a of doc.anatomy) {
      lines.push(`${i3}{ part: ${escapeString(a.part)}, description: ${escapeString(a.description)} },`)
    }
    lines.push(`${i2}],`)
  }

  // variants
  if (!doc.variants || doc.variants.length === 0) {
    lines.push(`${i2}variants: [],`)
  } else {
    lines.push(`${i2}variants: [`)
    for (const v of doc.variants) {
      lines.push(`${i3}{ name: ${escapeString(v.name)}, value: ${escapeString(v.value)}, description: ${escapeString(v.description)} },`)
    }
    lines.push(`${i2}],`)
  }

  // states
  if (!doc.states || doc.states.length === 0) {
    lines.push(`${i2}states: [],`)
  } else {
    lines.push(`${i2}states: [`)
    for (const s of doc.states) {
      lines.push(`${i3}{ name: ${escapeString(s.name)}, description: ${escapeString(s.description)} },`)
    }
    lines.push(`${i2}],`)
  }

  // sizes
  if (!doc.sizes || doc.sizes.length === 0) {
    lines.push(`${i2}sizes: [],`)
  } else {
    lines.push(`${i2}sizes: [`)
    for (const s of doc.sizes) {
      lines.push(`${i3}{ name: ${escapeString(s.name)}, value: ${escapeString(s.value)}, description: ${escapeString(s.description)} },`)
    }
    lines.push(`${i2}],`)
  }

  // doGuidelines
  const doG = (doc.doGuidelines || []).map((g) => escapeString(g)).join(", ")
  lines.push(`${i2}doGuidelines: [${doG}],`)

  // dontGuidelines
  const dontG = (doc.dontGuidelines || []).map((g) => escapeString(g)).join(", ")
  lines.push(`${i2}dontGuidelines: [${dontG}],`)

  // code
  if (doc.code && doc.code.includes("\n")) {
    const safeCode = doc.code.replace(/`/g, "\\`").replace(/\${/g, "\\${")
    lines.push(`${i2}code: \`${safeCode}\`,`)
  } else {
    lines.push(`${i2}code: ${escapeString(doc.code || "")},`)
  }

  // props
  if (!doc.props || doc.props.length === 0) {
    lines.push(`${i2}props: [],`)
  } else {
    lines.push(`${i2}props: [`)
    for (const p of doc.props) {
      const defPart = p.default !== undefined ? ` default: ${escapeString(p.default)},` : ""
      lines.push(`${i3}{ name: ${escapeString(p.name)}, type: ${escapeString(p.type)},${defPart} description: ${escapeString(p.description)} },`)
    }
    lines.push(`${i2}],`)
  }

  // meta
  if (doc.meta) {
    const vizinhosStr = doc.meta.vizinhos && doc.meta.vizinhos.length > 0
      ? doc.meta.vizinhos.map((v) => escapeString(v)).join(", ")
      : ""
    lines.push(`${i2}meta: {`)
    lines.push(`${i3}nome: ${escapeString(doc.meta.nome || "")},`)
    lines.push(`${i3}camada: ${escapeString(doc.meta.camada || "")},`)
    lines.push(`${i3}status: ${escapeString(doc.meta.status || "")},`)
    lines.push(`${i3}codigo: ${escapeString(doc.meta.codigo || "")},`)
    lines.push(`${i3}story: ${escapeString(doc.meta.story || "")},`)
    lines.push(`${i3}vizinhos: [${vizinhosStr}],`)
    lines.push(`${i2}},`)
  }

  // whenToUseItems
  if (doc.whenToUseItems && doc.whenToUseItems.length > 0) {
    const items = doc.whenToUseItems.map((item) => escapeString(item)).join(", ")
    lines.push(`${i2}whenToUseItems: [${items}],`)
  }

  // whenNotToUse
  if (doc.whenNotToUse && doc.whenNotToUse.length > 0) {
    const items = doc.whenNotToUse.map((item) => escapeString(item)).join(", ")
    lines.push(`${i2}whenNotToUse: [${items}],`)
  }

  // content
  if (doc.content && doc.content.length > 0) {
    const items = doc.content.map((item) => escapeString(item)).join(", ")
    lines.push(`${i2}content: [${items}],`)
  }

  // accessibility
  if (doc.accessibility) {
    lines.push(`${i2}accessibility: {`)
    lines.push(`${i3}keyboard: ${escapeString(doc.accessibility.keyboard || "")},`)
    lines.push(`${i3}screenReader: ${escapeString(doc.accessibility.screenReader || "")},`)
    lines.push(`${i3}focus: ${escapeString(doc.accessibility.focus || "")},`)
    lines.push(`${i3}cautions: ${escapeString(doc.accessibility.cautions || "")},`)
    lines.push(`${i2}},`)
  }

  // tokens
  if (doc.tokens && doc.tokens.length > 0) {
    const items = doc.tokens.map((t) => escapeString(t)).join(", ")
    lines.push(`${i2}tokens: [${items}],`)
  }

  lines.push(`${indent}},`)
  return lines.join("\n")
}

export async function gerarComponentDocsTs() {
  // Load base docs from TypeScript file
  const baseModule = await import("../src/lib/component-docs.ts")
  const mergedDocs = { ...baseModule.componentDocs }

  // Read MD files
  const mdFiles = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
  const mdSlugs = []

  for (const file of mdFiles) {
    const fullPath = path.join(DOCS_DIR, file)
    const content = fs.readFileSync(fullPath, "utf8")
    const parsed = parseComponentMd(content)
    const slug = parsed.slug || path.basename(file, ".md")
    mdSlugs.push(slug)

    // Override or add to merged docs
    mergedDocs[slug] = parsed.doc
  }

  const header = `// Arquivo gerado a partir de docs/componentes/*.md pelo comando \`npm run docs:gerar\`.
// Para editar a documentação de um componente, altere o arquivo correspondente em
// docs/componentes/<slug>.md.
//
// Teste de sincronia em src/lib/component-docs.sincronia.test.ts reprova se este arquivo
// divergir dos MDs fonte.

export interface ComponentDocOption {
  name: string
  value: string
  description: string
}

export interface ComponentDocProp {
  name: string
  type: string
  default?: string
  description: string
}

export interface ComponentDoc {
  description: string
  whenToUse: string
  anatomy: { part: string; description: string }[]
  variants: ComponentDocOption[]
  states: { name: string; description: string }[]
  sizes: ComponentDocOption[]
  doGuidelines: string[]
  dontGuidelines: string[]
  code: string
  props: ComponentDocProp[]
  meta?: {
    nome: string
    camada: string
    status: string
    codigo: string
    story: string
    vizinhos: string[]
  }
  whenToUseItems?: string[]
  whenNotToUse?: string[]
  content?: string[]
  accessibility?: {
    keyboard: string
    screenReader: string
    focus: string
    cautions: string
  }
  tokens?: string[]
}

export const componentDocs: Record<string, ComponentDoc> = {
`

  const entries = Object.keys(mergedDocs).map((slug) => formatDocEntry(slug, mergedDocs[slug]))
  const footer = `}\n`

  return {
    content: header + entries.join("\n") + "\n" + footer,
    mdSlugs,
    totalSlugs: Object.keys(mergedDocs).length,
  }
}

async function principal() {
  const isCheck = process.argv.includes("--check")
  const { content, mdSlugs, totalSlugs } = await gerarComponentDocsTs()

  if (isCheck) {
    const existing = fs.readFileSync(TARGET_FILE, "utf8").replace(/\r\n/g, "\n")
    const target = content.replace(/\r\n/g, "\n")
    if (existing !== target) {
      console.error("❌ src/lib/component-docs.ts está desatualizado em relação aos MDs em docs/componentes/.")
      console.error("Execute `npm run docs:gerar` para atualizar.")
      process.exit(1)
    }
    console.log("✅ src/lib/component-docs.ts está em sincronia com docs/componentes/*.md.")
    return
  }

  fs.writeFileSync(TARGET_FILE, content, "utf8")
  console.log(`✅ src/lib/component-docs.ts gerado com sucesso (${totalSlugs} componentes no total, ${mdSlugs.length} derivados de MDs: ${mdSlugs.join(", ")}).`)
}

// Execute when run directly
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  principal().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
