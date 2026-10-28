import { describe, expect, it } from "vitest"
import { checagensContraste, corDaUrl, fidelidade, sugestao, trechoPreset, urlDaCor, variaveisDoTema } from "./construtor"
import { PARES_DALTONISMO } from "./daltonismo"
import { gerarTema, TOKENS_COR } from "./gerar"
import { PRESETS } from "./presets"

// Lógica pura do construtor de tema (H-construtor-de-tema). A tela só
// mostra o que estas funções devolvem.

describe("variaveisDoTema", () => {
  it("devolve uma variável CSS por token de cor, pronta para o style da prévia", () => {
    const v = variaveisDoTema(gerarTema("#1447E6").claro)
    expect(Object.keys(v).sort()).toEqual([...TOKENS_COR].sort())
    for (const valor of Object.values(v)) expect(valor).toMatch(/^#[0-9A-F]{6}$/)
  })
})

describe("cor no link", () => {
  it("lê cor e modo", () => {
    expect(corDaUrl("?cor=E31A39&modo=escuro")).toEqual({ cor: "#E31A39", nativo: "escuro" })
  })

  it("aceita minúscula, # codificado e modo ausente (claro)", () => {
    expect(corDaUrl("?cor=e31a39")).toEqual({ cor: "#E31A39", nativo: "claro" })
    expect(corDaUrl("?cor=%23E31A39")).toEqual({ cor: "#E31A39", nativo: "claro" })
  })

  it("ignora cor inválida, ausente ou modo desconhecido", () => {
    expect(corDaUrl("")).toBeNull()
    expect(corDaUrl("?cor=xyz")).toBeNull()
    expect(corDaUrl("?cor=E31A3")).toBeNull()
    expect(corDaUrl("?cor=E31A39&modo=sepia")).toEqual({ cor: "#E31A39", nativo: "claro" })
  })

  it("escreve o link e volta igual", () => {
    expect(urlDaCor("#E31A39", "escuro")).toBe("?cor=E31A39&modo=escuro")
    expect(corDaUrl(urlDaCor("#7E2600", "claro"))).toEqual({ cor: "#7E2600", nativo: "claro" })
  })
})

describe("trechoPreset", () => {
  it("segue o formato de src/lib/cor/presets.ts", () => {
    expect(trechoPreset("acme", "#E31A39", "claro")).toBe('  acme: { fonte: "#E31A39", nativo: "claro" },')
    expect(trechoPreset("cliente-acme", "#1447E6", "escuro")).toBe('  "cliente-acme": { fonte: "#1447E6", nativo: "escuro" },')
  })

  it("recusa nome que não serve de slug", () => {
    for (const nome of ["", "Acme", "minha marca", "ação", "1acme"]) expect(() => trechoPreset(nome, "#E31A39", "claro")).toThrow()
  })
})

describe("fidelidade à marca", () => {
  it("diz, por modo, a cor digitada e a cor que o botão principal usa", () => {
    const f = fidelidade("#1447E6", gerarTema("#1447E6"))
    expect(f.map((x) => x.modo)).toEqual(["claro", "escuro"])
    expect(f[0]).toEqual({ modo: "claro", sua: "#1447E6", usada: "#1447E6", igual: true })
  })

  it("marca quando o motor trocou a cor para passar no contraste", () => {
    const [claro] = fidelidade("#FFFF00", gerarTema("#FFFF00"))
    expect(claro.igual).toBe(false)
    expect(claro.usada).not.toBe("#FFFF00")
  })
})

describe("checagensContraste", () => {
  it.each(Object.entries(PRESETS))("%s: todas passam, com razão e piso", (_, preset) => {
    const c = checagensContraste(gerarTema(preset.fonte))
    expect(c.length).toBeGreaterThan(0)
    for (const x of c) {
      expect(x.razao).toBeGreaterThanOrEqual(x.piso)
      expect(x.passa).toBe(true)
    }
  })

  it("cobre os dois modos e não mede a linha decorativa (--border)", () => {
    const c = checagensContraste(gerarTema("#7E2600"))
    expect(new Set(c.map((x) => x.modo))).toEqual(new Set(["claro", "escuro"]))
    expect(c.some((x) => x.frente === "--border")).toBe(false)
  })
})

describe("sugestao", () => {
  it("todo grupo do daltonismo tem uma sugestão em pt-BR, sem exclamação", () => {
    for (const grupo of new Set(PARES_DALTONISMO.map((p) => p.grupo))) {
      const s = sugestao(grupo)
      expect(s.length).toBeGreaterThan(10)
      expect(s).not.toContain("!")
    }
  })
})
