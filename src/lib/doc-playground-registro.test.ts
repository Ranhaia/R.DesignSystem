import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

// A página do componente roda no servidor. Um registro importado de um arquivo "use client" chega lá como referência
// opaca: `registro[slug]` dá undefined e o playground some sem erro nenhum (aconteceu com os 22 do genérico). Por isso
// o registro mora num arquivo sem "use client", e só o componente com estado é cliente.
const lerFonte = (caminho: string) => readFileSync(join(__dirname, "..", caminho), "utf8")
const ehCliente = (fonte: string) => /^\s*["']use client["']/.test(fonte)

describe("registro do playground genérico", () => {
  const registro = () => lerFonte("components/doc/generic-playground-registry.tsx")

  it("mora num arquivo que o servidor consegue ler (sem use client)", () => {
    expect(registro()).toMatch(/export const genericPlaygroundRegistry\b/)
    expect(ehCliente(registro())).toBe(false)
  })

  it("o componente com estado continua cliente e lê o registro desse arquivo", () => {
    const componente = lerFonte("components/doc/generic-playground.tsx")
    expect(ehCliente(componente)).toBe(true)
    expect(componente).toMatch(/from "\.\/generic-playground-registry"/)
    expect(componente).not.toMatch(/export const genericPlaygroundRegistry\b/)
  })

  it("a página decide o topo lendo o registro do arquivo de servidor", () => {
    const pagina = lerFonte("app/components/[slug]/page.tsx")
    expect(pagina).toMatch(/genericPlaygroundRegistry[^"]*from "@\/components\/doc\/generic-playground-registry"/)
  })
})
