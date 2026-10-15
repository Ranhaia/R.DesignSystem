// Junta os reports das stories (axe do addon-a11y + medições de alvo/foco) e grava docs/a11y/relatorio-componentes.md.
// Só grava quando a execução cobriu os 10 contextos (test:a11y:todos, somando os lotes); execução parcial só imprime o resumo.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import type { Reporter, TestModule } from "vitest/node"
import { CONTEXTOS, nomeContexto } from "./css-tokens"
import { relatorioComponentes, type ResultadoStory } from "./relatorio-componentes"

function contextoDoProjeto(nome: string): string {
  if (nome === "storybook") return "default/claro"
  if (nome.startsWith("storybook-")) {
    const resto = nome.slice("storybook-".length)
    const ultimoTraco = resto.lastIndexOf("-")
    if (ultimoTraco > 0) {
      return `${resto.slice(0, ultimoTraco)}/${resto.slice(ultimoTraco + 1)}`
    }
  }
  return nome
}

export default class ReporterComponentes implements Reporter {
  onTestRunEnd(modulos: ReadonlyArray<TestModule>) {
    const rs: ResultadoStory[] = []
    for (const m of modulos) {
      if (!m.project.name.startsWith("storybook")) continue
      for (const t of m.children.allTests()) {
        const meta = t.meta() as { storyId?: string; reports?: { type: string; result: any }[] }
        if (!meta.storyId) continue
        const medidas = meta.reports?.find((r) => r.type === "a11y-medidas")?.result
        if (!medidas && t.result().state !== "failed") continue // fixture com a11yMedir: false
        const axe = meta.reports?.find((r) => r.type === "a11y")?.result
        rs.push({
          storyId: meta.storyId,
          contexto: medidas?.contexto ?? contextoDoProjeto(m.project.name),
          axe: (axe?.violations ?? []).map((v: any) => ({
            regra: v.id,
            impacto: v.impact,
            ajuda: v.help,
            alvos: v.nodes.map((n: any) => n.target.join(" ")),
          })),
          alvos: medidas?.alvos ?? [],
          focos: medidas?.focos ?? [],
          erro: t.result().errors?.map((e) => e.message).join("; ") || undefined,
        })
      }
    }
    if (!rs.length) return
    // test:a11y:todos roda em lotes (um processo cada): cada lote deixa sua parte na pasta e o último junta tudo.
    const pasta = process.env.A11Y_PARCIAL
    if (pasta) {
      writeFileSync(join(pasta, `${process.pid}.json`), JSON.stringify(rs), "utf8")
      rs.splice(0, rs.length, ...readdirSync(pasta).flatMap((f) => JSON.parse(readFileSync(join(pasta, f), "utf8"))))
    }
    const medidos = new Set(rs.map((r) => r.contexto))
    const todos = CONTEXTOS.map(nomeContexto)
    if (!todos.every((c) => medidos.has(c))) {
      console.log(
        `[a11y] ${rs.length} stories medidas em ${medidos.size}/10 contextos; relatório só é gravado com test:a11y:todos.`
      )
      return
    }
    const dir =
      typeof import.meta.dirname !== "undefined"
        ? import.meta.dirname
        : dirname(fileURLToPath(import.meta.url))
    const destino = resolve(dir, "../../../docs/a11y/relatorio-componentes.md")
    mkdirSync(resolve(destino, ".."), { recursive: true })
    writeFileSync(destino, relatorioComponentes(rs, todos), "utf8")
    console.log(`[a11y] relatório gravado em docs/a11y/relatorio-componentes.md`)
  }
}
