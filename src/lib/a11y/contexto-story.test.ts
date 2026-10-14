import { describe, expect, it } from "vitest"
import { CONTEXTOS } from "./css-tokens"
import { contextoDosGlobals, nomeProjeto, regrasAxe } from "./contexto-story"

describe("contexto da story", () => {
  it("lê preset e modo dos globals, com padrão default/claro", () => {
    expect(contextoDosGlobals({})).toEqual({ preset: "default", modo: "claro" })
    expect(contextoDosGlobals({ style: "tech", modo: "escuro" })).toEqual({ preset: "tech", modo: "escuro" })
  })
  it("valor desconhecido nos globals é erro, não cai no padrão em silêncio", () => {
    expect(() => contextoDosGlobals({ style: "xpto" })).toThrow(/preset/)
    expect(() => contextoDosGlobals({ modo: "noite" })).toThrow(/modo/)
  })
  it("10 nomes de projeto únicos; o default claro mantém o nome storybook", () => {
    const nomes = CONTEXTOS.map(nomeProjeto)
    expect(new Set(nomes).size).toBe(10)
    expect(nomeProjeto({ preset: "default", modo: "claro" })).toBe("storybook")
    expect(nomeProjeto({ preset: "midnight", modo: "escuro" })).toBe("storybook-midnight-escuro")
  })
  it("color-contrast do axe só fica ligado no default claro", () => {
    expect(regrasAxe({ preset: "default", modo: "claro" })).toEqual([])
    for (const c of CONTEXTOS.slice(1)) expect(regrasAxe(c)).toEqual([{ id: "color-contrast", enabled: false }])
  })
})
