// Contexto (preset × modo) de uma story: aplicado no <html> como o app faz em src/app/layout.tsx,
// para a story ver exatamente a mesma cascata de tokens que a tela real.
import { CONTEXTOS, nomeContexto, type Contexto } from "./css-tokens"

const PRESETS = [...new Set(CONTEXTOS.map((c) => c.preset))]

export function contextoDosGlobals(globals: Record<string, unknown>): Contexto {
  const preset = (globals.style ?? "default") as Contexto["preset"]
  const modo = (globals.modo ?? "claro") as Contexto["modo"]
  if (!PRESETS.includes(preset)) throw new Error(`preset desconhecido: ${String(preset)}`)
  if (modo !== "claro" && modo !== "escuro") throw new Error(`modo desconhecido: ${String(modo)}`)
  return { preset, modo }
}

export const ehPadrao = (c: Contexto) => c.preset === "default" && c.modo === "claro"

export const nomeProjeto = (c: Contexto) => (ehPadrao(c) ? "storybook" : `storybook-${c.preset}-${c.modo}`)

// No modo navegador o Vitest acrescenta o navegador ao nome do projeto: "storybook-tech-claro (chromium)".
export function contextoDoProjeto(nome: string): string {
  const c = CONTEXTOS.find((c) => nome === nomeProjeto(c) || nome.startsWith(`${nomeProjeto(c)} (`))
  return c ? nomeContexto(c) : nome
}

// Contraste de token já é medido na camada 1 (tokens.test.ts); aqui só o default claro pega combinação errada dentro do componente.
export const regrasAxe = (c: Contexto) => (ehPadrao(c) ? [] : [{ id: "color-contrast", enabled: false }])

export function aplicarContextoNoHtml(c: Contexto, html: HTMLElement = document.documentElement) {
  html.dataset.style = c.preset
  html.classList.toggle("dark", c.modo === "escuro")
}
