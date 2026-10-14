import { describe, expect, it } from "vitest"
import { razao } from "../a11y/contraste"
import { PARES } from "../a11y/pares"
import { PISOS } from "../a11y/perfil"
import { paraOklch } from "./espaco"
import { gerarTema, TOKENS_COR } from "./gerar"
import { PRESETS } from "./presets"

const aleatorio = (semente: number) => () => {
  semente |= 0; semente = (semente + 0x6d2b79f5) | 0
  let t = Math.imul(semente ^ (semente >>> 15), 1 | semente)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const r = aleatorio(42)
const hex2 = () => Math.floor(r() * 256).toString(16).padStart(2, "0")
const ALEATORIAS = Array.from({ length: 60 }, () => `#${hex2()}${hex2()}${hex2()}`.toUpperCase())
const FONTES = [...Object.values(PRESETS).map((p) => p.fonte), ...ALEATORIAS, "#FFFF00", "#00FF00", "#FFFFFF", "#000000", "#808080"]

// --border é linha decorativa (não é o único limite de um controle): isenta do 3:1. O --input é o limite e precisa passar.
const MEDIDOS = PARES.filter((p) => p.frente !== "--border")

describe("motor de cor", () => {
  it("gera todos os tokens de cor nos dois modos, em hex", () => {
    const t = gerarTema("#7E2600")
    for (const modo of ["claro", "escuro"] as const)
      for (const tk of TOKENS_COR) expect(t[modo][tk], `${modo} ${tk}`).toMatch(/^#[0-9A-F]{6}$/)
  })

  it.each(FONTES)("fonte %s: todos os pares passam AA nos dois modos", (fonte) => {
    const t = gerarTema(fonte)
    const falhas: string[] = []
    for (const modo of ["claro", "escuro"] as const)
      for (const p of MEDIDOS) {
        const v = razao(t[modo][p.frente], t[modo][p.fundo])
        if (v < PISOS[p.uso]) falhas.push(`${modo} ${p.frente}/${p.fundo} = ${v}`)
      }
    expect(falhas).toEqual([])
  })

  it.each(FONTES)("fonte %s: fundo, superfícies e texto ficam quase cinza", (fonte) => {
    const t = gerarTema(fonte)
    for (const modo of ["claro", "escuro"] as const)
      for (const tk of ["--background", "--card", "--popover", "--muted", "--foreground", "--sidebar"] as const)
        expect(paraOklch(t[modo][tk]).C, `${modo} ${tk}`).toBeLessThanOrEqual(0.012)
  })

  it.each(FONTES)("fonte %s: no escuro o card fica acima do fundo (elevação)", (fonte) => {
    const t = gerarTema(fonte)
    expect(razao(t.escuro["--card"], "#000000")).toBeGreaterThan(razao(t.escuro["--background"], "#000000"))
  })

  it.each(Object.entries(PRESETS))("preset %s mantém a própria cor como ação no claro", (_, p) => {
    expect(gerarTema(p.fonte).claro["--primary"]).toBe(p.fonte.toUpperCase())
  })

  it("fonte clara demais vira o tom 40 da primária no claro", () => {
    const t = gerarTema("#FFFF00")
    expect(t.claro["--primary"]).not.toBe("#FFFF00")
    expect(razao(t.claro["--primary"], t.claro["--background"])).toBeGreaterThanOrEqual(3)
  })

  it("é determinístico", () => {
    expect(gerarTema("#1447E6")).toEqual(gerarTema("#1447E6"))
  })
})

// Ação e destrutivo no escuro precisam ser vivos, não pastel (tom 80 do M3 parece desabilitado).
describe("motor de cor: ação viva no escuro", () => {
  const CROMATICAS = FONTES.filter((f) => paraOklch(f).C >= 0.08)

  // "Vivo" = não mais lavado que a própria marca: pelo menos 85% do croma da fonte (teto 0,1, para fonte muito saturada).
  it.each(CROMATICAS)("fonte %s: ação no escuro mantém a saturação da fonte", (fonte) => {
    const minimo = Math.min(0.1, paraOklch(fonte).C * 0.85)
    expect(paraOklch(gerarTema(fonte).escuro["--primary"]).C).toBeGreaterThanOrEqual(minimo)
  })

  it.each(FONTES)("fonte %s: destrutivo no escuro é saturado", (fonte) => {
    expect(paraOklch(gerarTema(fonte).escuro["--destructive"]).C).toBeGreaterThanOrEqual(0.12)
  })

  it.each(FONTES)("fonte %s: se a própria fonte serve no escuro, ela é a ação no escuro", (fonte) => {
    const t = gerarTema(fonte)
    const fundo = t.escuro["--background"]
    const serve = razao(fonte, fundo) >= 3 && razao("#FFFFFF", fonte) >= 4.5
    if (serve) expect(t.escuro["--primary"]).toBe(fonte.toUpperCase())
  })

  it("o vermelho do Suave é o mesmo nos dois modos", () => {
    const t = gerarTema(PRESETS.soft.fonte)
    expect(t.escuro["--primary"]).toBe(t.claro["--primary"])
  })
})
