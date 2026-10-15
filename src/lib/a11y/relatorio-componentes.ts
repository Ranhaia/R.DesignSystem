// Geração determinística do relatório de componentes em markdown (docs/a11y/relatorio-componentes.md).
// Reúne axe, medições de alvo (2.5.8), foco visível (2.4.7) e Regra da Casa (alvo < 44×44).
import type { MedidaAlvo, MedidaFoco } from "./medir-dom"
import { PERFIL, PISOS } from "./perfil"

export type ResultadoStory = {
  storyId: string
  contexto: string
  axe: { regra: string; impacto: string; ajuda: string; alvos: string[] }[]
  alvos: MedidaAlvo[]
  focos: MedidaFoco[]
  erro?: string // story que não renderizou / teste que quebrou
}

type AchadoBruto = {
  componente: string
  story: string
  storyId: string
  criterio: string
  severidade: string
  elemento: string
  medida: string
  motivo: string
  cor?: string | null
  fundo?: string | null
  ehWcag: boolean
  ehCasa: boolean
  contexto: string
}

const fmtNum = (n: number) => String(n).replace(".", ",")

const fmtTexto = (s: string) => s.replace(/(\d+)\.(\d+)/g, "$1,$2")

// Texto livre (nome acessível, ajuda do axe, erro) dentro de célula: | e quebra de linha quebrariam a tabela.
const cel = (s: string) => s.replace(/\r?\n/g, " ").replace(/\|/g, "\\|")

function traduzirImpacto(impacto: string): string {
  switch (impacto.toLowerCase()) {
    case "critical":
      return "crítica"
    case "serious":
      return "séria"
    case "moderate":
      return "moderada"
    case "minor":
      return "leve"
    default:
      return impacto
  }
}

function extrairAchados(rs: ResultadoStory[]): AchadoBruto[] {
  const achados: AchadoBruto[] = []

  for (const r of rs) {
    const [componente, ...restoStory] = r.storyId.split("--")
    const story = restoStory.join("--") || componente

    if (r.erro) {
      achados.push({
        componente,
        story,
        storyId: r.storyId,
        criterio: "Execução",
        severidade: "crítica",
        elemento: "story",
        medida: r.erro,
        motivo: r.erro,
        ehWcag: true,
        ehCasa: false,
        contexto: r.contexto,
      })
    }

    for (const v of r.axe) {
      achados.push({
        componente,
        story,
        storyId: r.storyId,
        criterio: `axe: ${v.regra}`,
        severidade: traduzirImpacto(v.impacto),
        elemento: v.alvos.join(" ") || "componente",
        medida: v.ajuda,
        motivo: v.ajuda,
        ehWcag: true,
        ehCasa: false,
        contexto: r.contexto,
      })
    }

    for (const a of r.alvos) {
      if (a.resultado === "reprova") {
        achados.push({
          componente,
          story,
          storyId: r.storyId,
          criterio: "WCAG 2.5.8 (Alvo)",
          severidade: "séria",
          elemento: a.elemento,
          medida: `${fmtNum(a.largura)}×${fmtNum(a.altura)} (${a.motivo ?? "menor que 24×24"})`,
          motivo: a.motivo ?? "menor que 24×24",
          ehWcag: true,
          ehCasa: false,
          contexto: r.contexto,
        })
      } else if (a.resultado === "espacamento" || (a.resultado === "passa" && a.casa)) {
        const desc =
          a.resultado === "espacamento"
            ? `${fmtNum(a.largura)}×${fmtNum(a.altura)} (exceção de espaçamento, < 44×44)`
            : `${fmtNum(a.largura)}×${fmtNum(a.altura)} (< 44×44)`
        achados.push({
          componente,
          story,
          storyId: r.storyId,
          criterio: "Regra da Casa (Alvo)",
          severidade: "🟡",
          elemento: a.elemento,
          medida: desc,
          motivo: a.resultado === "espacamento" ? "exceção de espaçamento" : "alvo menor que 44×44",
          ehWcag: false,
          ehCasa: true,
          contexto: r.contexto,
        })
      }
    }

    for (const f of r.focos) {
      if (f.resultado === "reprova") {
        const mot = f.motivo ? fmtTexto(f.motivo) : "foco reprovado"
        const med = f.cor && f.fundo ? `${mot} (${f.cor} sobre ${f.fundo})` : mot
        achados.push({
          componente,
          story,
          storyId: r.storyId,
          criterio: "WCAG 2.4.7 (Foco)",
          severidade: "séria",
          elemento: f.elemento,
          medida: med,
          motivo: mot,
          cor: f.cor,
          fundo: f.fundo,
          ehWcag: true,
          ehCasa: false,
          contexto: r.contexto,
        })
      }
    }
  }

  return achados
}

export function relatorioComponentes(rs: ResultadoStory[], contextos: string[]): string {
  const ordemContextos = new Map(contextos.map((c, i) => [c, i]))
  const todosContextosValidos = contextos.length === 10

  const todosAchados = extrairAchados(rs)

  // 1. Causas Comuns
  type CausaComum = {
    criterio: string
    motivo: string
    corFundo: string
    ocorrencias: number
    componentes: Set<string>
    stories: Set<string>
  }

  const mapaCausas = new Map<string, CausaComum>()
  for (const a of todosAchados) {
    const corFundo = a.cor && a.fundo ? `\`${a.cor}\` / \`${a.fundo}\`` : "-"
    const chave = `${a.criterio}:::${a.motivo}:::${corFundo}`
    let c = mapaCausas.get(chave)
    if (!c) {
      c = {
        criterio: a.criterio,
        motivo: a.motivo,
        corFundo,
        ocorrencias: 0,
        componentes: new Set(),
        stories: new Set(),
      }
      mapaCausas.set(chave, c)
    }
    c.ocorrencias++
    c.componentes.add(a.componente)
    c.stories.add(a.storyId)
  }

  const listaCausas = [...mapaCausas.values()].sort((a, b) => {
    if (b.ocorrencias !== a.ocorrencias) return b.ocorrencias - a.ocorrencias
    if (a.criterio !== b.criterio) return a.criterio.localeCompare(b.criterio)
    return a.motivo.localeCompare(b.motivo)
  })

  // 2. Agrupamento de achados por componente e chave de detalhe
  type AchadoAgrupado = {
    componente: string
    story: string
    criterio: string
    severidade: string
    elemento: string
    medida: string
    ehWcag: boolean
    ehCasa: boolean
    contextos: Set<string>
  }

  const achadosPorComponente = new Map<string, Map<string, AchadoAgrupado>>()
  for (const a of todosAchados) {
    let mapaComp = achadosPorComponente.get(a.componente)
    if (!mapaComp) {
      mapaComp = new Map()
      achadosPorComponente.set(a.componente, mapaComp)
    }
    const chaveDetalhe = `${a.story}:::${a.criterio}:::${a.severidade}:::${a.elemento}:::${a.medida}`
    let ach = mapaComp.get(chaveDetalhe)
    if (!ach) {
      ach = {
        componente: a.componente,
        story: a.story,
        criterio: a.criterio,
        severidade: a.severidade,
        elemento: a.elemento,
        medida: a.medida,
        ehWcag: a.ehWcag,
        ehCasa: a.ehCasa,
        contextos: new Set(),
      }
      mapaComp.set(chaveDetalhe, ach)
    }
    ach.contextos.add(a.contexto)
  }

  // Lista de todos os componentes conhecidos nas stories
  const todosComponentes = [...new Set(rs.map((r) => r.storyId.split("--")[0]))].sort()

  type InfoComponente = {
    nome: string
    resultado: "reprovou" | "passou (🟡)" | "passou"
    falhasWcag: number
    regraCasa: number
    achados: AchadoAgrupado[]
  }

  const componentesInfo: InfoComponente[] = todosComponentes.map((nome) => {
    const mapa = achadosPorComponente.get(nome)
    const achados = mapa ? [...mapa.values()] : []

    // Ordenação determinística dos achados do componente
    achados.sort((a, b) => {
      if (a.story !== b.story) return a.story.localeCompare(b.story)
      if (a.criterio !== b.criterio) return a.criterio.localeCompare(b.criterio)
      if (a.elemento !== b.elemento) return a.elemento.localeCompare(b.elemento)
      return a.medida.localeCompare(b.medida)
    })

    const falhasWcag = achados.filter((a) => a.ehWcag).length
    const regraCasa = achados.filter((a) => a.ehCasa).length
    const resultado = falhasWcag > 0 ? "reprovou" : regraCasa > 0 ? "passou (🟡)" : "passou"

    return { nome, resultado, falhasWcag, regraCasa, achados }
  })

  // Contagens do Resumo
  const totalStories = new Set(rs.map((r) => r.storyId)).size
  const totalMedicoes = rs.length
  const totalReprovados = componentesInfo.filter((c) => c.resultado === "reprovou").length
  const totalCasa = componentesInfo.filter((c) => c.resultado === "passou (🟡)").length
  const totalPassou = componentesInfo.filter((c) => c.resultado === "passou").length
  const totalFalhasWcag = componentesInfo.reduce((s, c) => s + c.falhasWcag, 0)
  const totalRegrasCasa = componentesInfo.reduce((s, c) => s + c.regraCasa, 0)

  // Montagem do Markdown
  const linhas: string[] = [
    "# Relatório de acessibilidade — Componentes",
    "",
    `Gerado por \`npm run test:a11y:todos\`. Não editar à mão. Perfil: **${PERFIL}** (alvo mínimo 24×24, foco contorno ≥ 2px e ≥ ${fmtNum(PISOS.ui)}:1).`,
    `Contextos medidos: ${contextos.join(", ")}.`,
    `Isenções consideradas: controles desabilitados, link em texto corrido. Coluna *na base* entra na Fase 3.`,
    "",
    "## Resumo",
    "",
    `- **Stories × Contextos:** ${totalMedicoes} medições (${totalStories} stories em ${contextos.length} contextos)`,
    `- **Componentes:** ${componentesInfo.length} componentes (${totalReprovados} reprovaram WCAG, ${totalCasa} passaram com Regra da Casa 🟡, ${totalPassou} passaram limpos)`,
    `- **Falhas WCAG:** ${totalFalhasWcag}`,
    `- **Regras da Casa (🟡):** ${totalRegrasCasa}`,
    "",
  ]

  // Seção Causas comuns
  if (listaCausas.length > 0) {
    linhas.push(
      "## Causas comuns",
      "",
      "| Critério | Motivo | Cor / Fundo | Ocorrências | Componentes | Stories |",
      "|---|---|---|---|---|---|"
    )
    for (const c of listaCausas) {
      linhas.push(
        `| ${c.criterio} | ${cel(c.motivo)} | ${c.corFundo} | ${c.ocorrencias} | ${c.componentes.size} | ${c.stories.size} |`
      )
    }
    linhas.push("")
  }

  // Tabela por componente
  linhas.push(
    "## Visão geral por componente",
    "",
    "| Componente | Resultado | Falhas WCAG | Regra da Casa |",
    "|---|---|---|---|"
  )
  for (const c of componentesInfo) {
    linhas.push(`| ${c.nome} | ${c.resultado} | ${c.falhasWcag} | ${c.regraCasa} |`)
  }
  linhas.push("")

  // Detalhes por componente
  linhas.push("## Detalhes por componente", "")

  for (const c of componentesInfo) {
    if (!c.achados.length) continue
    linhas.push(`### ${c.nome}`, "")
    linhas.push("| Critério | Severidade | Story | Elemento | Medida | Contextos |")
    linhas.push("|---|---|---|---|---|---|")
    for (const a of c.achados) {
      const ctxOrdenados = [...a.contextos].sort(
        (x, y) => (ordemContextos.get(x) ?? 999) - (ordemContextos.get(y) ?? 999)
      )
      const textoContextos =
        todosContextosValidos && ctxOrdenados.length === 10 ? "todos" : ctxOrdenados.join(", ")
      linhas.push(
        `| ${a.criterio} | ${a.severidade} | ${a.story} | \`${cel(a.elemento)}\` | ${cel(a.medida)} | ${textoContextos} |`
      )
    }
    linhas.push("")
  }

  return linhas.join("\n")
}
