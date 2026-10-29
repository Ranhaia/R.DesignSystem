// Contexto de cada token (H-abas-padronizadas): a aba Tokens da página tem uma linha por contexto, como a Acessibilidade
// tem uma por chave. Fonte única da classificação; o coletor usa `ehEscalaTailwind` e o registro usa `agruparTokens`.

// A ordem é a da página.
export const CONTEXTOS = ["Cor", "Tipografia", "Espaço", "Raio", "Sombra", "Movimento", "Foco", "Ícone"]

const NUM = String.raw`(?:\d+(?:\.\d+)?)`
const TAMANHO = String.raw`(?:3xs|2xs|xs|sm|md|lg|xl|[2-7]xl)`

// Escala do Tailwind que a regra "só token" manda usar. Medida relativa (`w-full`, `flex-1`) e valor entre colchete não entram.
const ESCALA_TIPOGRAFIA = [
  /^text-(?:xs|sm|base|lg|xl|[2-9]xl)$/,
  /^font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
  new RegExp(`^leading-(?:none|tight|snug|normal|relaxed|loose|${NUM})$`),
  /^tracking-(?:tighter|tight|normal|wide|wider|widest)$/,
]
const ESPACO = "p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y|size|w|h|min-w|min-h|max-w|max-h|inset|inset-x|inset-y|top|right|bottom|left|start|end"
const ESCALA_ESPACO = [
  new RegExp(`^(?:${ESPACO})-(?:${NUM}|px)$`),
  new RegExp(`^(?:w|min-w|max-w)-${TAMANHO}$`),
]

export const ehEscalaTailwind = (base) => [...ESCALA_TIPOGRAFIA, ...ESCALA_ESPACO].some((r) => r.test(base))

const REGRAS_CLASSE = [
  ["Foco", /^(?:ring|ring-offset|outline)-/],
  ["Raio", /^(?:rounded|radius-inset)(?:-|$)/],
  ["Sombra", /^shadow-/],
  ["Movimento", /^(?:duration|ease|animate|delay)-/],
  ["Tipografia", /^(?:font-|leading-|tracking-)/],
  ["Tipografia", /^text-(?:xs|sm|base|lg|xl|[2-9]xl)$/],
  // Alinhamento e quebra de texto não são cor.
  [null, /^text-(?:left|center|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip)$/],
  ["Cor", /^(?:bg|text|border|border-[trblxy]|fill|stroke|from|via|to|decoration|divide|placeholder|caret|accent)-/],
  ["Espaço", { test: (t) => ESCALA_ESPACO.some((r) => r.test(t)) }],
]

const REGRAS_VARIAVEL = [
  ["Ícone", /^--(?:icon|font-material)/],
  ["Movimento", /^--(?:motion|scale|ease|animate)/],
  ["Raio", /^--radius/],
  ["Sombra", /^--shadow/],
  ["Tipografia", /^--(?:font|text|leading|tracking)/],
  ["Espaço", /^--(?:spacing|container)|-(?:size|width|height)$/],
  // O resto das variáveis do CSS é cor (--primary, --ai-*, --sidebar-*, --color-*).
  ["Cor", /^--/],
]

// Contexto de um token já coletado; null quando não é token (alinhamento, `w-full`, valor com variante ou colchete).
export function contextoDoToken(token) {
  if (!/^-{0,2}[\w.-]+$/.test(token)) return null
  const regras = token.startsWith("--") ? REGRAS_VARIAVEL : REGRAS_CLASSE
  for (const [contexto, regra] of regras) if (regra.test(token)) return contexto
  return null
}

// Agrupa na ordem de CONTEXTOS, só os que têm token; os itens ficam na ordem recebida.
export function agruparTokens(tokens) {
  const grupos = new Map(CONTEXTOS.map((c) => [c, []]))
  const sem = []
  for (const t of tokens) {
    const contexto = contextoDoToken(t)
    if (contexto) grupos.get(contexto).push(t)
    else sem.push(t)
  }
  if (sem.length) throw new Error(`Token sem contexto: ${sem.join(", ")}. Classifique em scripts/contexto-token.mjs.`)
  return [...grupos].filter(([, itens]) => itens.length).map(([contexto, itens]) => ({ contexto, itens }))
}
