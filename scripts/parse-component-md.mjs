// Células de uma linha de tabela do MD. Um `|` dentro de crases (tipo em união, `A | B`) ou escapado não separa célula.
export function celulasTabela(linha) {
  const partes = []
  let atual = ""
  let emCodigo = false
  for (let i = 0; i < linha.length; i++) {
    const ch = linha[i]
    if (ch === "`") {
      emCodigo = !emCodigo
      atual += ch
    } else if (ch === "|" && !emCodigo && (i === 0 || linha[i - 1] !== "\\")) {
      partes.push(atual.trim())
      atual = ""
    } else {
      atual += ch
    }
  }
  partes.push(atual.trim())
  return partes.slice(1, -1)
}

export function parseMarkdownTable(tableText) {
  const lines = tableText.trim().split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith("|"))
  if (lines.length < 2) return []
  const rows = []
  for (let i = 2; i < lines.length; i++) {
    const rawCells = celulasTabela(lines[i])
    const cells = rawCells.map((c) => c.trim())
    if (cells.some((c) => c.length > 0)) {
      rows.push(cells)
    }
  }
  return rows
}

function parseBulletList(text) {
  if (!text) return undefined
  const lines = text.split("\n")
  const items = []
  let current = null
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    if (/^[-*]\s+/.test(line)) {
      if (current) items.push(current)
      current = line.replace(/^[-*]\s+/, "").trim()
    } else if (current) {
      current += " " + line
    }
  }
  if (current) items.push(current)
  return items.length > 0 ? items : undefined
}

function parseAccessibility(text) {
  if (!text) return undefined
  const acc = { keyboard: "", screenReader: "", focus: "", cautions: "" }
  const lines = text.split("\n")
  let currentKey = null

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    const m = line.match(/^[-*]\s+\*\*([^*:]+)(?:\*\*:\s*|:\*\*\s*)(.*)$/)
    if (m) {
      const label = m[1].toLowerCase().trim()
      const val = m[2].trim()
      if (label === "teclado") {
        currentKey = "keyboard"
        acc.keyboard = val
      } else if (label === "leitor de tela") {
        currentKey = "screenReader"
        acc.screenReader = val
      } else if (label === "foco") {
        currentKey = "focus"
        acc.focus = val
      } else if (label === "cuidados") {
        currentKey = "cautions"
        acc.cautions = val
      } else {
        currentKey = null
      }
    } else if (currentKey && !/^[-*#]/.test(line)) {
      acc[currentKey] = acc[currentKey] ? `${acc[currentKey]} ${line}` : line
    }
  }

  if (acc.keyboard || acc.screenReader || acc.focus || acc.cautions) {
    return acc
  }
  return undefined
}

// Uma linha de lista por contexto ("- **Cor:** `a` `b`"), com continuação recuada. Vazio ou "Nenhum." não vira aba.
function parseTokens(text) {
  if (!text) return undefined
  const grupos = []
  for (const raw of text.split("\n")) {
    const line = raw.trim()
    const m = line.match(/^[-*]\s+\*\*([^*:]+):\*\*\s*(.*)$/)
    if (m) grupos.push({ contexto: m[1].trim(), itens: [] })
    const atual = grupos[grupos.length - 1]
    if (atual) atual.itens.push(...Array.from((m ? m[2] : line).matchAll(/`([^`]+)`/g), (t) => t[1].trim()).filter(Boolean))
  }
  const comItens = grupos.filter((g) => g.itens.length > 0)
  return comItens.length > 0 ? comItens : undefined
}

export function parseComponentMd(content) {
  // Normalize newlines
  const text = content.replace(/\r\n/g, "\n")

  // 1. Frontmatter
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---/)
  const frontmatter = {}
  let body = text
  if (fmMatch) {
    const fmLines = fmMatch[1].split("\n")
    for (const line of fmLines) {
      const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
      if (kv) {
        let val = kv[2].trim()
        if (val.startsWith("[") && val.endsWith("]")) {
          val = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean)
        }
        frontmatter[kv[1]] = val
      }
    }
    body = text.slice(fmMatch[0].length).trim()
  }

  // 2. Sections: split by \n## 
  const parts = body.split(/\n(?=##\s+)/)
  const headerPart = parts[0]
  const sections = {}

  for (let i = 1; i < parts.length; i++) {
    const p = parts[i]
    const firstLineEnd = p.indexOf("\n")
    if (firstLineEnd !== -1) {
      const title = p.slice(0, firstLineEnd).replace(/^##\s+/, "").trim()
      const content = p.slice(firstLineEnd + 1).trim()
      sections[title] = content
    } else {
      const title = p.replace(/^##\s+/, "").trim()
      sections[title] = ""
    }
  }

  // Description from top level (after # Title and before first ##)
  const topMatch = headerPart.match(/^#\s+[^\n]+\n([\s\S]*)$/)
  const description = topMatch ? topMatch[1].trim().replace(/\s*\n\s*/g, " ") : ""

  // whenToUse
  let whenToUse = ""
  if (sections["Quando usar"]) {
    whenToUse = sections["Quando usar"]
      .split("\n")
      .map((l) => l.replace(/^[-*]\s+/, "").trim())
      .filter(Boolean)
      .join(" ")
  }

  // anatomy
  const anatomy = []
  if (sections["Anatomia"]) {
    const rows = parseMarkdownTable(sections["Anatomia"])
    for (const r of rows) {
      if (r[0]) {
        anatomy.push({ part: r[0].replace(/`/g, ""), description: r[1] || "" })
      }
    }
  }

  // variants
  const variants = []
  if (sections["Variantes"]) {
    const rows = parseMarkdownTable(sections["Variantes"])
    for (const r of rows) {
      if (r[0]) {
        const val = r[0].replace(/`/g, "")
        variants.push({
          name: val.charAt(0).toUpperCase() + val.slice(1),
          value: val,
          description: r[1] || "",
        })
      }
    }
  }

  // sizes
  const sizes = []
  if (sections["Tamanhos"]) {
    const rows = parseMarkdownTable(sections["Tamanhos"])
    for (const r of rows) {
      if (r[0]) {
        const val = r[0].replace(/`/g, "")
        const desc = r.length >= 3 ? `${r[1]} — ${r[2]}` : (r[1] || "")
        sizes.push({
          name: val,
          value: val,
          description: desc,
        })
      }
    }
  }

  // states
  const states = []
  if (sections["Estados"]) {
    const rows = parseMarkdownTable(sections["Estados"])
    for (const r of rows) {
      if (r[0]) {
        states.push({
          name: r[0],
          description: r[1] || "",
        })
      }
    }
  }

  // props
  const props = []
  if (sections["Props"]) {
    const rows = parseMarkdownTable(sections["Props"])
    for (const r of rows) {
      if (r[0]) {
        props.push({
          name: r[0].replace(/`/g, ""),
          type: r[1]?.replace(/`/g, "") || "",
          default: r[2]?.replace(/`/g, "") || undefined,
          description: r[3] || "",
        })
      }
    }
  }

  // doGuidelines
  const doGuidelines = []
  if (sections["Faça"]) {
    const items = sections["Faça"].split("\n").map((l) => l.replace(/^[-*]\s+/, "").trim()).filter(Boolean)
    doGuidelines.push(...items)
  }

  // dontGuidelines
  const dontGuidelines = []
  if (sections["NÃO faça"]) {
    const items = sections["NÃO faça"].split("\n").map((l) => l.replace(/^[-*]\s+/, "").trim()).filter(Boolean)
    dontGuidelines.push(...items)
  }

  // code
  let code = ""
  const codeMatch = (sections["Exemplo mínimo"] || "").match(/```(?:tsx|jsx|html)?\n([\s\S]*?)\n```/)
  if (codeMatch) {
    code = codeMatch[1].trim()
  }

  // Campos novos da página condensada
  const meta = frontmatter.nome
    ? {
        nome: frontmatter.nome,
        camada: frontmatter.camada || "",
        status: frontmatter.status || "",
        codigo: frontmatter.codigo || "",
        story: frontmatter.story || "",
        vizinhos: Array.isArray(frontmatter.vizinhos) ? frontmatter.vizinhos : [],
      }
    : undefined

  const whenToUseItems = parseBulletList(sections["Quando usar"])
  const whenNotToUse = parseBulletList(sections["Quando NÃO usar"])
  const contentList = parseBulletList(sections["Conteúdo"])
  const accessibility = parseAccessibility(sections["Acessibilidade"])
  const tokens = parseTokens(sections["Tokens usados"])

  // A página não interpreta Markdown: tira negrito e crase do texto (o código fica intacto).
  const semMd = (v) =>
    typeof v === "string"
      ? v.replace(/\*\*|`/g, "")
      : Array.isArray(v)
        ? v.map(semMd)
        : v && typeof v === "object"
          ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, semMd(x)]))
          : v

  const doc = {
    ...semMd({ description, whenToUse, anatomy, variants, states, sizes, doGuidelines, dontGuidelines }),
    code,
    props: semMd(props),
  }

  if (meta) doc.meta = semMd(meta)
  if (whenToUseItems) doc.whenToUseItems = semMd(whenToUseItems)
  if (whenNotToUse) doc.whenNotToUse = semMd(whenNotToUse)
  if (contentList) doc.content = semMd(contentList)
  if (accessibility) doc.accessibility = semMd(accessibility)
  if (tokens) doc.tokens = tokens

  return {
    slug: frontmatter.slug || "",
    frontmatter,
    doc,
  }
}
