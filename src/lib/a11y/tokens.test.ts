import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { CONTEXTOS } from "./css-tokens"
import { medirTokens, relatorioTokens } from "./medir-tokens"
import { PARES } from "./pares"

const CSS =
  readFileSync(resolve(__dirname, "../../app/tokens-cor.css"), "utf8") +
  "\n" +
  readFileSync(resolve(__dirname, "../../app/globals.css"), "utf8")

describe("contraste dos tokens (perfil AA)", () => {
  const { medidas, erros } = medirTokens(CSS)

  it("todo par resolve em todos os 10 contextos", () => {
    expect(erros).toEqual([])
    expect(medidas).toHaveLength(PARES.length * CONTEXTOS.length)
  })

  it("ids são únicos e estáveis", () => {
    expect(new Set(medidas.map((m) => m.id)).size).toBe(medidas.length)
    expect(medidas[0].id).toMatch(/^token:default\/claro:[\w-]+\/[\w-]+$/)
  })

  it("gera o relatório docs/a11y/contraste-tokens.md", () => {
    const md = relatorioTokens(medidas)
    expect(md).toContain("# Contraste dos tokens")
    expect(md).toContain("default/escuro")
    mkdirSync(resolve(__dirname, "../../../docs/a11y"), { recursive: true })
    writeFileSync(resolve(__dirname, "../../../docs/a11y/contraste-tokens.md"), md)
  })

  // Fase 1: a reprovação por piso entra com a linha de base (Fase 3). Aqui só se mede.
})

describe("medirTokens com CSS sintético", () => {
  it("compõe borda transparente sobre o fundo e reporta falha", () => {
    const css = `:root { --background: #FFFFFF; --border: oklch(0 0 0 / 10%); --foreground: #000000; }`
    const { medidas } = medirTokens(css, [{ grupo: "t", frente: "--border", fundo: "--background", uso: "ui", wcag: "1.4.11" }, { grupo: "t", frente: "--foreground", fundo: "--background", uso: "texto", wcag: "1.4.3" }])
    const borda = medidas.find((m) => m.par.frente === "--border" && m.contexto === "default/claro")!
    expect(borda.passa).toBe(false)
    expect(borda.razao).toBeLessThan(3)
    expect(medidas.find((m) => m.par.frente === "--foreground" && m.contexto === "default/claro")!.razao).toBe(21)
  })
  it("token ausente vira erro com contexto e cadeia", () => {
    const { erros } = medirTokens(`:root { --background: #FFFFFF; }`, [{ grupo: "t", frente: "--nada", fundo: "--background", uso: "texto", wcag: "1.4.3" }])
    expect(erros[0]).toMatch(/default\/claro.*--nada/)
  })
})
