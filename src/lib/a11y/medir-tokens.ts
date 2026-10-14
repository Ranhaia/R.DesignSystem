import { razao } from "./contraste"
import { CONTEXTOS, lerBlocos, nomeContexto, resolver, tokensDoContexto } from "./css-tokens"
import { PARES, type Par } from "./pares"
import { PERFIL, PISOS } from "./perfil"

export type Medida = { id: string; contexto: string; par: Par; frente: string; fundo: string; razao: number; piso: number; passa: boolean }

const semTraco = (t: string) => t.replace(/^--/, "")

export function medirTokens(css: string, pares: Par[] = PARES) {
  const blocos = lerBlocos(css)
  const medidas: Medida[] = []
  const erros: string[] = []
  for (const c of CONTEXTOS) {
    const contexto = nomeContexto(c)
    const tokens = tokensDoContexto(blocos, c)
    for (const par of pares) {
      try {
        const frente = resolver(tokens, par.frente)
        const fundo = resolver(tokens, par.fundo)
        const r = razao(frente, fundo)
        const piso = PISOS[par.uso]
        medidas.push({ id: `token:${contexto}:${semTraco(par.frente)}/${semTraco(par.fundo)}`, contexto, par, frente, fundo, razao: r, piso, passa: r >= piso })
      } catch (e) {
        erros.push(`${contexto} · ${par.frente} / ${par.fundo}: ${(e as Error).message}`)
      }
    }
  }
  return { medidas, erros }
}

const fmt = (n: number) => n.toFixed(2).replace(".", ",")

export function relatorioTokens(medidas: Medida[]): string {
  const falhas = medidas.filter((m) => !m.passa)
  const linhas = [
    "# Contraste dos tokens",
    "",
    `Gerado por \`src/lib/a11y/tokens.test.ts\`. Não editar à mão. Perfil: **${PERFIL}** (texto ${fmt(PISOS.texto)}:1, interface ${fmt(PISOS.ui)}:1). Razão truncada, nunca arredondada. Cor com transparência composta sobre o fundo. Controle desabilitado é isento (WCAG) e não é medido.`,
    "",
    `**${medidas.length} medidas, ${falhas.length} abaixo do piso.**`,
    "",
  ]
  for (const contexto of [...new Set(medidas.map((m) => m.contexto))]) {
    linhas.push(`## ${contexto}`, "", "| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |", "|---|---|---|---|---|---|---|")
    for (const m of medidas.filter((x) => x.contexto === contexto)) {
      const res = m.passa ? "passa" : m.par.duvida ? "**dúvida**" : "**reprova**"
      linhas.push(`| ${m.par.grupo} | \`${m.par.frente}\` / \`${m.par.fundo}\` | \`${m.frente}\` | \`${m.fundo}\` | ${fmt(m.razao)} | ${fmt(m.piso)} | ${res} |`)
    }
    linhas.push("")
  }
  const duvidas = [...new Set(medidas.filter((m) => !m.passa && m.par.duvida).map((m) => m.par.duvida!))]
  if (duvidas.length) linhas.push("## Dúvidas de leitura do critério", "", ...duvidas.map((d) => `- ${d}`), "")
  return linhas.join("\n")
}
