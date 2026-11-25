import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { CodeBlock } from "@/components/ui/code-block"
import { IdiomaProvider } from "@/lib/idioma"

// code-block: código em <pre><code> com botão de copiar (icon-button).

const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
  const el = h(CodeBlock, { code: "npm i\nnpm run dev", ...props })
  return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
}

describe("CodeBlock", () => {
  it("código em pre/code, rolável pelo teclado", () => {
    const s = html()
    expect(s).toMatch(/<pre[^>]*data-slot="code-block-pre"[^>]*tabindex="0"|<pre[^>]*tabindex="0"[^>]*data-slot="code-block-pre"/i)
    expect(s).toMatch(/<code[^>]*>npm i\nnpm run dev<\/code>/)
  })

  it("botão de copiar é icon-button nomeado, type=button, nunca desabilitado", () => {
    const s = html()
    expect(s).toMatch(/<button[^>]*data-slot="icon-button"/)
    expect(s).toContain('aria-label="Copiar código"')
    expect(s).toContain('type="button"')
    expect(s).not.toMatch(/<button[^>]*\sdisabled(=""|\s|>)/)
  })

  it("aviso de copiado é role=status, fora do botão e vazio em repouso", () => {
    const s = html()
    expect(s).toMatch(/<\/button><span[^>]*role="status"[^>]*><\/span>/)
  })

  it("linguagem aparece no cabeçalho e vai para data-language", () => {
    const s = html({ language: "bash" })
    expect(s).toContain('data-language="bash"')
    expect(s).toMatch(/data-slot="code-block-language"[^>]*>bash</)
  })

  it("rótulo do botão nomeia o conteúdo quando há título", () => {
    expect(html({ title: "Instalação" })).toContain('aria-label="Copiar código: Instalação"')
  })

  it("fala inglês com o provider", () => {
    const s = html({}, "en")
    expect(s).toContain('aria-label="Copy code"')
    expect(s).not.toContain("Copiar")
  })
})
