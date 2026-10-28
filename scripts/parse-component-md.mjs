export function parseMarkdownTable(tableText) {
  const lines = tableText.trim().split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith("|"))
  if (lines.length < 2) return []
  const rows = []
  for (let i = 2; i < lines.length; i++) {
    const rawCells = lines[i].split("|").slice(1, -1)
    const cells = rawCells.map((c) => c.trim())
    if (cells.some((c) => c.length > 0)) {
      rows.push(cells)
    }
  }
  return rows
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
          val = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
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
    }
  }

  // Description from top level (after # Title and before first ##)
  const topMatch = headerPart.match(/^#\s+[^\n]+\n([\s\S]*)$/)
  const description = topMatch ? topMatch[1].trim() : ""

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

  return {
    slug: frontmatter.slug || "",
    frontmatter,
    doc: {
      description,
      whenToUse,
      anatomy,
      variants,
      states,
      sizes,
      doGuidelines,
      dontGuidelines,
      code,
      props,
    },
  }
}
