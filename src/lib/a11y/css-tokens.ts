// Tokens do globals.css aplicados pela cascata real: preset e modo ficam os dois no <html> (src/app/layout.tsx),
// então só especificidade e ordem decidem quem vence.

export type Contexto = { preset: "default" | "editorial" | "tech" | "soft" | "midnight"; modo: "claro" | "escuro" }
export type Bloco = { seletor: string; ordem: number; decl: Record<string, string> }

const PRESETS: Contexto["preset"][] = ["default", "editorial", "tech", "soft", "midnight"]
export const CONTEXTOS: Contexto[] = PRESETS.flatMap((preset) => (["claro", "escuro"] as const).map((modo) => ({ preset, modo })))
export const nomeContexto = (c: Contexto) => `${c.preset}/${c.modo}`

export function lerBlocos(css: string): Bloco[] {
  const s = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const blocos: Bloco[] = []
  let i = 0, ordem = 0
  while (i < s.length) {
    const abre = s.indexOf("{", i)
    if (abre < 0) break
    // Instruções soltas antes do bloco (@import …; @custom-variant …;) não fazem parte do seletor.
    const seletor = s.slice(i, abre).split(";").pop()!.trim()
    let prof = 1, j = abre + 1
    while (j < s.length && prof > 0) { if (s[j] === "{") prof++; else if (s[j] === "}") prof--; j++ }
    if (!seletor.startsWith("@")) {
      const corpo = s.slice(abre + 1, j - 1)
      const decl: Record<string, string> = {}
      for (const m of corpo.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) decl[m[1]] = m[2].trim()
      blocos.push({ seletor, ordem: ordem++, decl })
    }
    i = j
  }
  return blocos
}

// Devolve a especificidade se a parte do seletor casa com o contexto; null se não casa.
function casa(parte: string, c: Contexto): number | null {
  const p = parte.trim()
  const simples = p.match(/:root|\.dark|\[data-style=["']?[\w-]+["']?\]/g) ?? []
  if (simples.join("") !== p.replace(/\s+/g, "")) return null
  if (/\s/.test(p)) return null
  for (const s of simples) {
    if (s === ".dark" && c.modo !== "escuro") return null
    const st = s.match(/\[data-style=["']?([\w-]+)["']?\]/)
    if (st && st[1] !== c.preset) return null
  }
  return simples.length
}

export function tokensDoContexto(blocos: Bloco[], c: Contexto): Record<string, string> {
  const aplicaveis = blocos
    .map((b) => ({ b, esp: Math.max(-1, ...b.seletor.split(",").map((p) => casa(p, c) ?? -1)) }))
    .filter((x) => x.esp >= 0)
    .sort((x, y) => x.esp - y.esp || x.b.ordem - y.b.ordem)
  return Object.assign({}, ...aplicaveis.map((x) => x.b.decl))
}

export function resolver(tokens: Record<string, string>, nome: string, cadeia: string[] = []): string {
  if (cadeia.includes(nome)) throw new Error(`ciclo de var(): ${[...cadeia, nome].join(" → ")}`)
  const v = tokens[nome]
  if (v === undefined) throw new Error(`token não definido: ${[...cadeia, nome].join(" → ")}`)
  const m = v.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\)$/)
  if (!m) return v
  if (tokens[m[1]] === undefined && m[2] !== undefined) return m[2].trim()
  return resolver(tokens, m[1], [...cadeia, nome])
}
