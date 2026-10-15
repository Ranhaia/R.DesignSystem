import { describe, expect, it } from "vitest"
import { CONTEXTOS, lerBlocos, nomeContexto, resolver, tokensDoContexto } from "./css-tokens"

const CSS = `
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));
@theme inline { --color-primary: var(--primary); }
/* comentário com { chaves } */
:root { --a: #111111; --b: var(--a); --c: #FFFFFF; --x: var(--nada, #222222); }
.dark { --a: #EEEEEE; --c: #000000; }
[data-style="tech"] { --a: #00FF00; --d: #123456; }
.dark[data-style="tech"] { --c: #0000FF; }
body .dark { --a: #FF0000; }
html, :root.dark { --e: #ABCDEF; }
@media (prefers-color-scheme: dark) { :root { --a: #999999; } }
`

describe("css-tokens", () => {
  const blocos = lerBlocos(CSS)
  const t = (preset: string, modo: string) => tokensDoContexto(blocos, { preset, modo } as never)

  it("tem 10 contextos", () => {
    expect(CONTEXTOS).toHaveLength(10)
    expect(CONTEXTOS.map(nomeContexto)).toContain("midnight/escuro")
  })
  it("ignora @theme, @media e comentários", () => {
    expect(t("default", "claro")["--color-primary"]).toBeUndefined()
    expect(t("default", "claro")["--a"]).toBe("#111111")
  })
  it("modo escuro sobrescreve o :root", () => {
    expect(t("default", "escuro")["--a"]).toBe("#EEEEEE")
  })
  it("preset claro vence o .dark por vir depois com a mesma especificidade", () => {
    expect(t("tech", "escuro")["--a"]).toBe("#00FF00")
  })
  it(".dark[data-style] vence tudo", () => {
    expect(t("tech", "escuro")["--c"]).toBe("#0000FF")
    expect(t("tech", "claro")["--c"]).toBe("#FFFFFF")
  })
  it("seletor com combinador não casa; :root.dark casa no escuro", () => {
    expect(t("default", "escuro")["--a"]).toBe("#EEEEEE")
    expect(t("default", "escuro")["--e"]).toBe("#ABCDEF")
    expect(t("default", "claro")["--e"]).toBeUndefined()
  })
  it("resolve cadeia de var() e fallback", () => {
    expect(resolver(t("default", "claro"), "--b")).toBe("#111111")
    expect(resolver(t("default", "claro"), "--x")).toBe("#222222")
  })
  it("erro quando não resolve ou há ciclo", () => {
    expect(() => resolver(t("default", "claro"), "--inexistente")).toThrow(/--inexistente/)
    expect(() => resolver({ "--p": "var(--q)", "--q": "var(--p)" }, "--p")).toThrow(/ciclo/)
  })
})
