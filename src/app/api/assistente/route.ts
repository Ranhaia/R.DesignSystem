import { google } from "@ai-sdk/google"
import { generateText, Output } from "ai"
import { z } from "zod"

import { montarInstrucoes, validarResposta } from "@/lib/assistente-catalogo"

// Assistente de recomendação: recebe um contexto descrito em texto e
// devolve o componente ou pattern do catálogo que melhor atende. Mesmo
// padrão do assistente do Site-Relatorio (AI SDK + Gemini, catálogo
// inteiro no system prompt), com resposta estruturada em vez de chat.
//
// Chave: GOOGLE_GENERATIVE_AI_API_KEY (lida pelo @ai-sdk/google).

export const maxDuration = 30

const MODELO = "gemini-2.5-flash"
const MIN_CARACTERES = 10
const MAX_CARACTERES = 1000

// Limite simples por IP pra rota pública não virar custo aberto. Em
// memória: vale por instância (serverless pode ter várias), então é
// contenção, não garantia.
const JANELA_MS = 60_000
const MAX_POR_JANELA = 8
const acessos = new Map<string, number[]>()

function excedeuLimite(ip: string): boolean {
  const agora = Date.now()
  const recentes = (acessos.get(ip) ?? []).filter((t) => agora - t < JANELA_MS)
  recentes.push(agora)
  acessos.set(ip, recentes)
  return recentes.length > MAX_POR_JANELA
}

const esquema = z.object({
  recomendacao: z.object({
    slug: z.string().describe('Slug exato do catálogo, ou "nenhum".'),
    motivo: z.string().describe("Por que este atende o contexto, citando o vizinho descartado quando houver."),
  }),
  alternativas: z
    .array(
      z.object({
        slug: z.string(),
        quandoPreferir: z.string().describe("Em que variação do contexto esta seria melhor."),
      })
    )
    .max(3),
  faltaContexto: z
    .string()
    .nullable()
    .describe("Pergunta que decidiria a escolha, se faltar informação. null se não faltar."),
})

const instrucoes = montarInstrucoes()

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { erro: "O assistente ainda não tem chave de API configurada." },
      { status: 503 }
    )
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"
  if (excedeuLimite(ip)) {
    return Response.json(
      { erro: "Muitas perguntas seguidas. Espere um minuto e tente de novo." },
      { status: 429 }
    )
  }

  const corpo = (await req.json().catch(() => null)) as { contexto?: unknown } | null
  const contexto = typeof corpo?.contexto === "string" ? corpo.contexto.trim() : ""
  if (contexto.length < MIN_CARACTERES || contexto.length > MAX_CARACTERES) {
    return Response.json(
      { erro: `Descreva o contexto em ${MIN_CARACTERES} a ${MAX_CARACTERES} caracteres.` },
      { status: 400 }
    )
  }

  try {
    const { output } = await generateText({
      model: google(MODELO),
      system: instrucoes,
      prompt: contexto,
      output: Output.object({ schema: esquema }),
    })
    return Response.json(validarResposta(output))
  } catch (e) {
    console.error("[assistente]", e)
    return Response.json(
      { erro: "Não consegui gerar a recomendação agora. Tente de novo." },
      { status: 502 }
    )
  }
}
