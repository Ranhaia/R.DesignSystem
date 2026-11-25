import { readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { describe, expect, it } from "vitest"

import { dicionario, formatar, IDIOMAS } from "./dicionario"

// Trava do dicionário central (H-dicionario-idioma): todo texto de sistema
// dos componentes (o que o leitor de tela fala ou o placeholder mostra) sai
// do dicionário, e pt e en têm as mesmas chaves.

const UI = resolve(__dirname, "../../components/ui")
const fontes = readdirSync(UI)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
  .map((f) => ({
    f,
    // comentário não é texto de interface
    src: readFileSync(join(UI, f), "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, ""),
  }))

// Atributo, padrão de prop ou ramo de condição com texto começando por letra.
const TEXTO_FIXO = [
  /aria-label=["'][A-Za-zÀ-ú]/,
  /sr-only["'][^>]*>\s*[A-Za-zÀ-ú]/,
  /\b(placeholder|title)=["'][A-Za-zÀ-ú]/,
  />\s*[A-ZÀ-Ú][a-zà-ú]+( [a-zà-ú]+)*\s*</, // texto visível no JSX
  /\b\w*(Label|Text|label|title|description|Title|Description|placeholder)\s*=\s*["'][A-Za-zÀ-ú]/,
  /"aria-label"\s*\]?\)?\s*(\?\?|:|=)\s*["'][A-Za-zÀ-ú]/,
  /(\?\?|\?|:)\s*["'][A-ZÀ-Ú][a-zà-ú]+( [a-zà-ú]+)*[.…]?["']/,
]

describe("dicionário de idioma", () => {
  it("pt-BR e en têm exatamente as mesmas chaves, todas preenchidas", () => {
    const [pt, en] = IDIOMAS.map((i) => dicionario[i])
    expect(Object.keys(en).sort()).toEqual(Object.keys(pt).sort())
    for (const i of IDIOMAS) for (const [k, v] of Object.entries(dicionario[i])) expect(v.trim(), `${i}:${k}`).not.toBe("")
  })

  it("formatar troca {variável}", () => {
    expect(formatar("{n} itens", { n: 3 })).toBe("3 itens")
  })

  it("nenhum componente tem texto de sistema fixo", () => {
    const achados = fontes.flatMap(({ f, src }) =>
      src.split("\n").flatMap((linha, i) =>
        TEXTO_FIXO.some((re) => re.test(linha)) ? [`${f}:${i + 1}: ${linha.trim()}`] : []
      )
    )
    expect(achados).toEqual([])
  })

  it("o provider troca o texto que o componente fala", async () => {
    const { renderToString } = await import("react-dom/server")
    const { createElement: h } = await import("react")
    const { IdiomaProvider } = await import("./index")
    const { Spinner } = await import("@/components/ui/spinner")
    const { Pagination } = await import("@/components/ui/pagination")
    const html = (idioma?: "pt-BR" | "en") =>
      renderToString(
        idioma
          ? h(IdiomaProvider, { idioma, children: [h(Spinner, { key: 1 }), h(Pagination, { key: 2 })] })
          : h("div", null, h(Spinner), h(Pagination))
      )
    expect(html()).toContain('aria-label="Carregando"') // sem provider: pt-BR
    expect(html("en")).toContain('aria-label="Loading"')
    expect(html("en")).toContain('aria-label="pagination"')
    expect(html("en")).not.toMatch(/Carregando|paginação/i)
  })

  it("toda chave usada nos componentes existe no dicionário", () => {
    const usadas = fontes.flatMap(({ src }) => [...src.matchAll(/\bt\(\s*["']([\w.-]+)["']/g)].map((m) => m[1]))
    expect(usadas.length).toBeGreaterThan(20)
    for (const k of usadas) expect(Object.keys(dicionario["pt-BR"]), k).toContain(k)
  })
})
