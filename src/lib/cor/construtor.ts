import { razao } from "../a11y/contraste"
import { PARES } from "../a11y/pares"
import { PISOS } from "../a11y/perfil"
import { PARES_DALTONISMO } from "./daltonismo"
import { type TemaGerado, type Token, TOKENS_COR } from "./gerar"

export type Modo = "claro" | "escuro"

export type FidelidadeModo = {
  modo: Modo
  sua: string
  usada: string
  igual: boolean
}

export type ChecagemContraste = {
  modo: Modo
  grupo: string
  frente: string
  fundo: string
  razao: number
  piso: number
  passa: boolean
}

/**
 * Converte os tokens de um tema gerado em pares de variáveis CSS (--token: valor),
 * prontos para o style da prévia.
 */
export function variaveisDoTema(tokens: Record<string, string>): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const token of TOKENS_COR) {
    if (tokens[token]) {
      vars[token] = tokens[token].toUpperCase()
    }
  }
  return vars
}

/**
 * Lê a cor e o modo nativo da query string da URL (?cor=E31A39&modo=escuro).
 * Cor inválida ou ausente devolve null. Modo desconhecido vira "claro".
 */
export function corDaUrl(search: string): { cor: string; nativo: Modo } | null {
  if (!search) return null
  const query = search.startsWith("?") ? search.slice(1) : search
  const params = new URLSearchParams(query)
  const corParam = params.get("cor")
  if (!corParam) return null

  const limpo = corParam.replace(/^#/, "").trim()
  if (!/^[0-9a-fA-F]{6}$/.test(limpo)) return null

  const modoParam = params.get("modo")
  const nativo: Modo = modoParam === "escuro" ? "escuro" : "claro"

  return {
    cor: `#${limpo.toUpperCase()}`,
    nativo,
  }
}

/**
 * Monta a query string com a cor e o modo nativo (?cor=E31A39&modo=escuro).
 */
export function urlDaCor(cor: string, nativo: Modo): string {
  const hex = cor.replace(/^#/, "").toUpperCase()
  return `?cor=${hex}&modo=${nativo}`
}

/**
 * Devolve uma linha no formato de src/lib/cor/presets.ts para cadastrar um preset.
 * Nome precisa ser slug válido (^[a-z][a-z0-9-]*$).
 */
export function trechoPreset(nome: string, cor: string, nativo: Modo): string {
  if (!/^[a-z][a-z0-9-]*$/.test(nome)) {
    throw new Error(`Nome de preset inválido: "${nome}". Use apenas letras minúsculas, números e hífens, iniciando com letra.`)
  }

  const chave = nome.includes("-") ? `"${nome}"` : nome
  const hex = cor.startsWith("#") ? cor.toUpperCase() : `#${cor.toUpperCase()}`

  return `  ${chave}: { fonte: "${hex}", nativo: "${nativo}" },`
}

/**
 * Compara a cor digitada com a cor que o botão principal (--primary) realmente usa em cada modo.
 */
export function fidelidade(fonte: string, tema: TemaGerado | { claro: Record<Token, string>; escuro: Record<Token, string> }): FidelidadeModo[] {
  const hexFonte = fonte.startsWith("#") ? fonte.toUpperCase() : `#${fonte.toUpperCase()}`

  return (["claro", "escuro"] as const).map((modo) => {
    const usada = (tema[modo]["--primary"] ?? "").toUpperCase()
    return {
      modo,
      sua: hexFonte,
      usada,
      igual: hexFonte === usada,
    }
  })
}

/**
 * Avalia o contraste WCAG AA de todos os pares relevantes do tema, exceto a linha decorativa (--border).
 */
export function checagensContraste(
  tema: TemaGerado | { claro: Record<string, string>; escuro: Record<string, string> }
): ChecagemContraste[] {
  const resultados: ChecagemContraste[] = []

  for (const modo of ["claro", "escuro"] as const) {
    for (const par of PARES) {
      if (par.frente === "--border") continue

      const frente = tema[modo][par.frente]
      const fundo = tema[modo][par.fundo]
      if (!frente || !fundo) continue

      const r = razao(frente, fundo)
      const piso = PISOS[par.uso]

      resultados.push({
        modo,
        grupo: par.grupo,
        frente: par.frente,
        fundo: par.fundo,
        razao: r,
        piso,
        passa: r >= piso,
      })
    }
  }

  return resultados
}

const SUGESTOES_DALTONISMO: Record<string, string> = {
  "Erro × ação": "Use ícone ou distancie o botão destrutivo da ação principal para reforçar o perigo além da cor.",
  "Gráfico": "Dê rótulo ou padrão a cada série: estas cores se confundem.",
  "Link × texto": "Mantenha o sublinhado visível ou aumente a diferença entre link e texto.",
}

/**
 * Sugestão em pt-BR de ajuste de design quando um par de cores falha no daltonismo.
 */
export function sugestao(grupo: string): string {
  return SUGESTOES_DALTONISMO[grupo] ?? "Use texto, ícones ou reforço de forma para não depender apenas da cor."
}
