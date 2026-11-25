import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { describe, expect, it } from "vitest"

import { gerarLlms } from "../../scripts/gerar-llms.mjs"

// llms.txt: índice para IA montar tela só com o que existe no R.DS.
// Trava: todo componente documentado aparece, todo link resolve e os
// arquivos em public/ estão em dia com docs/componentes/ (npm run docs:llms).

const ROOT = resolve(__dirname, "../..")
const PUBLIC = join(ROOT, "public")
const slugs = readdirSync(join(ROOT, "docs/componentes"))
  .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
  .map((f) => f.replace(/\.md$/, ""))

describe("llms.txt", () => {
  const arquivos = gerarLlms(ROOT)
  const llms = arquivos["llms.txt"]

  it("lista todo componente documentado", () => {
    for (const s of slugs) expect(llms).toContain(`/ia/componentes/${s}.md`)
  })

  it("todo link interno aponta para um arquivo gerado", () => {
    const links = [...llms.matchAll(/\]\((\/[^)]+)\)/g)].map((m) => m[1].slice(1))
    expect(links.length).toBeGreaterThan(slugs.length)
    for (const l of links) expect(Object.keys(arquivos)).toContain(l)
  })

  it("cada linha de componente tem descrição", () => {
    for (const s of slugs) expect(llms).toMatch(new RegExp(`/ia/componentes/${s}\\.md\\): \\S`))
  })

  it("AGENTS.md traz as regras de não inventar", () => {
    expect(arquivos["ia/AGENTS.md"]).toMatch(/token/i)
    expect(arquivos["ia/AGENTS.md"]).toContain("/llms.txt")
  })

  it("public/ está em dia (rode npm run docs:llms)", () => {
    for (const [rel, conteudo] of Object.entries(arquivos)) {
      const p = join(PUBLIC, rel)
      expect(existsSync(p), rel).toBe(true)
      expect(readFileSync(p, "utf8"), rel).toBe(conteudo)
    }
  })
})
