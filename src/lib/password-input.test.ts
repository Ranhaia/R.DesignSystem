import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { avaliarSenha, PasswordInput } from "@/components/ui/password-input"
import { IdiomaProvider } from "@/lib/idioma"

// password-input: aplicação do Input com mostrar/ocultar. Modo padrão é só
// preencher; `variant="new"` (cadastro) mostra a força e os requisitos.

describe("avaliarSenha", () => {
  it("vazia não tem força", () => {
    expect(avaliarSenha("")).toMatchObject({ forca: 0, nivel: null })
  })
  it("conta os 4 requisitos", () => {
    expect(avaliarSenha("abc").forca).toBe(0)
    expect(avaliarSenha("abcdefgh").forca).toBe(1)
    expect(avaliarSenha("abcdEFGH").forca).toBe(2)
    expect(avaliarSenha("abcdEFG1").forca).toBe(3)
    expect(avaliarSenha("abcdEF1!").forca).toBe(4)
  })
  it("letra acentuada é letra, não símbolo", () => {
    const r = avaliarSenha("ÁÉção12")
    expect(r.requisitos.find((x) => x.chave === "password.reqCaixa")?.ok).toBe(true)
    expect(r.requisitos.find((x) => x.chave === "password.reqSimbolo")?.ok).toBe(false)
  })
  it("curta é sempre fraca", () => {
    expect(avaliarSenha("Aa1!").nivel).toBe("fraca")
  })
  it("nível sai da força", () => {
    expect(avaliarSenha("abcdefgh").nivel).toBe("fraca")
    expect(avaliarSenha("abcdEFG1").nivel).toBe("media")
    expect(avaliarSenha("abcdEF1!").nivel).toBe("forte")
  })
})

describe("PasswordInput", () => {
  const html = (props: Record<string, unknown> = {}, idioma?: "en") => {
    const el = h(PasswordInput, { "aria-label": "Senha", ...props })
    return renderToString(idioma ? h(IdiomaProvider, { idioma, children: el }) : el)
  }

  it("padrão: campo de senha para entrar, sem avaliador", () => {
    const s = html()
    expect(s).toContain('type="password"')
    expect(s).toContain('autoComplete="current-password"')
    expect(s).toContain('aria-label="Mostrar senha"')
    expect(s).not.toContain('data-slot="password-strength"')
  })

  it("cadastro: new-password, força e os 4 requisitos ligados ao campo", () => {
    const s = html({ variant: "new", defaultValue: "abcdEF1!" })
    expect(s).toContain('autoComplete="new-password"')
    expect(s).toContain('data-slot="password-strength"')
    expect(s.match(/data-slot="password-requirement"/g)).toHaveLength(4)
    expect(s).toContain("Forte")
    const id = s.match(/data-slot="password-strength" id="([^"]+)"/)?.[1]
    expect(id).toBeTruthy()
    expect(s).toContain(`aria-describedby="${id}"`)
  })

  it("leitor de tela ouve o estado de cada requisito e o valor da barra", () => {
    const s = html({ variant: "new", defaultValue: "abcdEFG1" })
    expect(s.match(/>cumprido</g)).toHaveLength(3)
    expect(s.match(/>pendente</g)).toHaveLength(1)
    expect(s).toContain('aria-valuenow="75"')
  })

  it("autoComplete explícito vence", () => {
    expect(html({ autoComplete: "off" })).toContain('autoComplete="off"')
  })

  it("fala inglês com o provider", () => {
    const s = html({ variant: "new", defaultValue: "abc" }, "en")
    expect(s).toContain('aria-label="Show password"')
    expect(s).toContain("At least 8 characters")
    expect(s).not.toMatch(/Mostrar|caracteres/)
  })
})
