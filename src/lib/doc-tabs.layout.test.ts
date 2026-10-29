import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

// H-abas-padronizadas: `overflow-x-auto` sozinho vira `overflow-y: auto` e a lista de abas ganhava barra vertical (o
// sublinhado da aba ativa passava 3 px). A medida real é conferida no navegador; esta trava impede a volta do erro.

const fonte = readFileSync(resolve(__dirname, "../components/doc/doc-tabs.tsx"), "utf8")

describe("DocTabs: lista de abas", () => {
  it("o wrapper que rola na horizontal nunca rola na vertical", () => {
    const wrappers = [...fonte.matchAll(/className="([^"]*overflow-x-auto[^"]*)"/g)].map((m) => m[1])
    expect(wrappers.length).toBeGreaterThan(0)
    for (const w of wrappers) expect(w, "falta overflow-y-hidden").toContain("overflow-y-hidden")
  })

  it("o wrapper reserva folga para o anel de foco (3 px) em vez de cortá-lo", () => {
    const wrapper = fonte.match(/className="([^"]*overflow-x-auto[^"]*)"/)?.[1] ?? ""
    expect(wrapper).toMatch(/(^|\s)p-1(\s|$)/)
  })
})
