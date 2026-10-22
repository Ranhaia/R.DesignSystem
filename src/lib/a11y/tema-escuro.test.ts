import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { CONTEXTOS, lerBlocos, nomeContexto, tokensDoContexto } from "./css-tokens"

// O gerador de cor cobre todos os tokens de cor nos dois modos; sombra é escrita à mão no globals.css e,
// sem redeclarar no .dark[data-style=x], herda a sombra clara do preset (invisível sobre fundo escuro).
const CSS = readFileSync(resolve(__dirname, "../../app/globals.css"), "utf8")
const SOMBRAS = ["--shadow-2xs", "--shadow-xs", "--shadow-sm", "--shadow-md", "--shadow-lg", "--shadow-xl"]

describe("tema escuro", () => {
  const blocos = lerBlocos(CSS)

  it("nenhuma sombra do escuro é a mesma do claro do preset", () => {
    const vazadas = CONTEXTOS.filter((c) => c.modo === "escuro").flatMap((c) => {
      const escuro = tokensDoContexto(blocos, c)
      const claro = tokensDoContexto(blocos, { ...c, modo: "claro" })
      return SOMBRAS.filter((s) => escuro[s] === claro[s]).map((s) => `${nomeContexto(c)} ${s}`)
    })
    expect(vazadas).toEqual([])
  })

  it("declara color-scheme claro no :root e escuro no .dark", () => {
    const s = CSS.replace(/\/\*[\s\S]*?\*\//g, "")
    expect(/(^|\})\s*:root\s*\{[^}]*color-scheme:\s*light\s*;/.test(s), ":root sem color-scheme: light").toBe(true)
    expect(/(^|\})\s*\.dark\s*\{[^}]*color-scheme:\s*dark\s*;/.test(s), ".dark sem color-scheme: dark").toBe(true)
  })
})
