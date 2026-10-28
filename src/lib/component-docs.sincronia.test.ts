import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { gerarComponentDocsTs } from "../../scripts/gerar-component-docs.mjs"

const libFile = (f: string) => readFileSync(resolve(__dirname, f), "utf8")

describe("sincronia de documentação de componentes", () => {
  it("src/lib/component-docs.ts é exatamente o que é gerado a partir de docs/componentes/*.md (rode `npm run docs:gerar`)", async () => {
    const { content } = await gerarComponentDocsTs()
    const target = content.replace(/\r\n/g, "\n")
    const atual = libFile("component-docs.ts").replace(/\r\n/g, "\n")
    expect(atual).toBe(target)
  })
})
