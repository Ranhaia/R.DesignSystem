import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { categoryLabels } from "./atomic-registry"
import { abasFundamentos, foundationsList } from "./foundations-registry"

// Tudo mora na mesma base: Estilo, os fundamentos e a visão de componentes são abas de /fundamentos.
describe("abasFundamentos", () => {
  const abas = abasFundamentos()

  it("abre com Visão geral, depois Estilo, os fundamentos, e fecha com Componentes", () => {
    expect(abas[0]).toEqual({ href: "/fundamentos", label: "Visão geral" })
    expect(abas[1].href).toBe("/fundamentos/estilo")
    expect(abas.slice(2, -1).map((a) => a.href)).toEqual(foundationsList.map((f) => f.href))
    expect(abas.at(-1)).toEqual({ href: "/fundamentos/componentes", label: "Componentes" })
  })

  it("toda aba aponta para uma página que existe e vive dentro de /fundamentos", () => {
    for (const a of abas) {
      expect(a.href.startsWith("/fundamentos"), a.href).toBe(true)
      expect(existsSync(join(__dirname, "../app", a.href, "page.tsx")), a.href).toBe(true)
    }
  })

  it("rotas antigas só redirecionam: /estilo e /components não têm mais conteúdo próprio", () => {
    for (const rota of ["estilo", "components"]) {
      const src = require("node:fs").readFileSync(join(__dirname, "../app", rota, "page.tsx"), "utf8")
      expect(src, rota).toContain("redirect(")
    }
  })
})

describe("textos em português", () => {
  const ingles = /^(Colors|Typography|Spacing|Radius|Elevation|Motion|Icons|Accessibility|Foundations|Components|Patterns|Templates|Atoms|Molecules|Organisms)$/

  it("nenhum rótulo de fundamento ou camada fica em inglês", () => {
    const rotulos = [...foundationsList.map((f) => f.name), ...abasFundamentos().map((a) => a.label), ...Object.values(categoryLabels)]
    for (const r of rotulos) expect(r, r).not.toMatch(ingles)
  })
})
