import { describe, expect, it } from "vitest"
import { checarDaltonismo, diferenca, PARES_DALTONISMO, simular, VISOES } from "./daltonismo"
import { paraOklch } from "./espaco"
import { gerarTema, type Token } from "./gerar"
import { PRESETS } from "./presets"

describe("simulação de daltonismo", () => {
  it.each(VISOES)("%s: branco, preto e cinza não mudam", (visao) => {
    for (const hex of ["#FFFFFF", "#000000", "#808080"]) expect(simular(hex, visao)).toBe(hex)
  })

  it("visão típica devolve a própria cor", () => {
    expect(simular("#E31A39", "normal")).toBe("#E31A39")
  })

  it("protanopia e deuteranopia aproximam vermelho de verde; tritanopia não", () => {
    const normal = diferenca("#D7263D", "#2E7D32")
    for (const visao of ["protanopia", "deuteranopia"] as const)
      expect(diferenca(simular("#D7263D", visao), simular("#2E7D32", visao))).toBeLessThan(normal / 2)
    expect(diferenca(simular("#D7263D", "tritanopia"), simular("#2E7D32", "tritanopia"))).toBeGreaterThan(normal / 2)
  })

  it("tritanopia aproxima azul de verde", () => {
    const normal = diferenca("#1E88E5", "#43A047")
    expect(diferenca(simular("#1E88E5", "tritanopia"), simular("#43A047", "tritanopia"))).toBeLessThan(normal)
  })

  it("diferença é zero para a mesma cor e simétrica", () => {
    expect(diferenca("#7E2600", "#7E2600")).toBe(0)
    expect(diferenca("#7E2600", "#1447E6")).toBeCloseTo(diferenca("#1447E6", "#7E2600"), 10)
  })
})

describe("checarDaltonismo", () => {
  const tema = gerarTema("#1447E6")

  it("os pares cobrem erro × ação, as 5 cores de gráfico entre si e link × texto", () => {
    const grupos = new Set(PARES_DALTONISMO.map((p) => p.grupo))
    expect(grupos).toEqual(new Set(["Erro × ação", "Gráfico", "Link × texto"]))
    expect(PARES_DALTONISMO.filter((p) => p.grupo === "Gráfico")).toHaveLength(10)
  })

  it("reprova quando erro e ação têm a mesma cor, em todas as visões e nos dois modos", () => {
    const igual = (m: Record<Token, string>) => ({ ...m, "--destructive": m["--primary"] })
    const falhas = checarDaltonismo({ claro: igual(tema.claro), escuro: igual(tema.escuro) }).filter((f) => f.grupo === "Erro × ação")
    expect(falhas).toHaveLength(2 * VISOES.length)
    expect(falhas[0]).toMatchObject({ a: "--destructive", b: "--primary", valor: 0 })
  })

  it("cada falha diz modo, par, visão, valor e mínimo", () => {
    const cinza = Object.fromEntries(Object.keys(tema.claro).map((k) => [k, "#808080"])) as Record<Token, string>
    const [f] = checarDaltonismo({ claro: cinza, escuro: cinza })
    expect(Object.keys(f).sort()).toEqual(["a", "b", "grupo", "minimo", "modo", "valor", "visao"])
  })
})

// Falhas dos 5 presets medidas em 2026-10-28. A correção muda o visual e é
// Decisão do Rafael (H-presets-daltonismo); até lá, catraca: nada novo reprova
// e a lista só diminui. Nunca afrouxe o mínimo para esvaziar a lista.
const l = (modo: string, par: string, ...visoes: string[]) => visoes.map((v) => `${modo} ${par} ${v}`)
const TODAS = ["normal", "protanopia", "deuteranopia", "tritanopia"]
const CONHECIDAS: Record<string, string[]> = {
  default: [...l("claro", "--primary/--foreground", ...TODAS), ...l("escuro", "--primary/--foreground", ...TODAS)],
  editorial: [
    ...l("claro", "--destructive/--primary", "protanopia"), ...l("claro", "--chart-1/--chart-2", "protanopia"),
    ...l("claro", "--chart-1/--chart-5", "deuteranopia"), ...l("claro", "--primary/--foreground", "protanopia"),
    ...l("escuro", "--destructive/--primary", ...TODAS), ...l("escuro", "--chart-1/--chart-2", "deuteranopia"),
    ...l("escuro", "--chart-2/--chart-3", "protanopia"),
  ],
  tech: [
    ...l("claro", "--chart-2/--chart-3", "tritanopia"), ...l("claro", "--chart-3/--chart-4", "protanopia"),
    ...l("escuro", "--chart-1/--chart-2", "protanopia"), ...l("escuro", "--chart-1/--chart-5", "deuteranopia"),
    ...l("escuro", "--chart-3/--chart-4", "deuteranopia"),
  ],
  soft: [
    ...l("claro", "--destructive/--primary", "protanopia"), ...l("claro", "--chart-1/--chart-2", "protanopia"),
    ...l("claro", "--chart-1/--chart-5", "deuteranopia"), ...l("escuro", "--destructive/--primary", ...TODAS),
    ...l("escuro", "--chart-2/--chart-3", "protanopia"),
  ],
  midnight: [...l("claro", "--chart-3/--chart-4", "protanopia"), ...l("escuro", "--chart-1/--chart-5", "deuteranopia")],
}

describe("os 5 presets (catraca do daltonismo)", () => {
  const falhasDe = (fonte: string) => checarDaltonismo(gerarTema(fonte)).map((f) => `${f.modo} ${f.a}/${f.b} ${f.visao}`)

  it.each(Object.entries(PRESETS))("%s: nenhuma falha nova", (nome, preset) => {
    expect(falhasDe(preset.fonte).filter((f) => !CONHECIDAS[nome].includes(f))).toEqual([])
  })

  it.each(Object.entries(PRESETS))("%s: falha corrigida sai da lista", (nome, preset) => {
    const atuais = falhasDe(preset.fonte)
    expect(CONHECIDAS[nome].filter((f) => !atuais.includes(f))).toEqual([])
  })
})

// Sanidade da conversão usada: OKLab do motor, sem duplicar fórmula.
it("diferença usa o mesmo OKLab do motor de cor", () => {
  const { L } = paraOklch("#FFFFFF")
  expect(diferenca("#FFFFFF", "#000000")).toBeCloseTo(L * 100, 0)
})
