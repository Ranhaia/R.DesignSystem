// Catálogo que o assistente de recomendação lê, e a validação do que ele
// devolve. Sai dos registros e docs que já são fonte única (components,
// component-docs, patterns, pattern-docs); nada aqui é escrito à mão.
//
// A categoria Atom/Molecule/Organism fica de fora de propósito: a
// recomendação é por uso, e a classificação ainda tem inconsistências
// (ver docs/active/especificacoes/taxonomia-componentes.md). Se entrasse,
// o modelo herdaria o erro.

import { componentDocs } from "./component-docs"
import { componentsList } from "./components-registry"
import { patternDocs } from "./pattern-docs"
import { patternsList } from "./patterns-registry"

export interface ItemCatalogo {
  tipo: "componente" | "pattern"
  slug: string
  nome: string
  href: string
}

const ehPlaceholder = (t: string) => /\[a preencher\]/i.test(t)
const textos = (lista: string[]) => lista.filter((t) => !ehPlaceholder(t))
// pattern-docs anota a categoria em cada peça ("Button (Atom)"); tira.
const semCategoria = (t: string) => t.replace(/\s*\((?:Atom|Molecule|Organism)[^)]*\)/g, "")

// Só entra o que tem doc: sem "quando usar", o modelo chutaria.
export const itensCatalogo: ItemCatalogo[] = [
  ...componentsList
    .filter((c) => componentDocs[c.slug])
    .map((c) => ({ tipo: "componente" as const, slug: c.slug, nome: c.name, href: `/components/${c.slug}` })),
  ...patternsList
    .filter((p) => patternDocs[p.slug])
    .map((p) => ({ tipo: "pattern" as const, slug: `pattern:${p.slug}`, nome: p.name, href: `/patterns/${p.slug}` })),
]

const porSlug = new Map(itensCatalogo.map((i) => [i.slug, i]))

export function montarCatalogo(): string {
  const componentes = componentsList
    .filter((c) => componentDocs[c.slug])
    .map((c) => {
      const d = componentDocs[c.slug]
      const linhas = [`### ${c.name} (slug: ${c.slug})`, `- O que é: ${d.description}`, `- Quando usar: ${d.whenToUse}`]
      const evite = textos(d.dontGuidelines)
      if (evite.length) linhas.push(`- Evite: ${evite.join(" ")}`)
      if (d.variants.length) linhas.push(`- Variantes: ${d.variants.map((v) => v.name).join(", ")}`)
      return linhas.join("\n")
    })

  const patterns = patternsList
    .filter((p) => patternDocs[p.slug])
    .map((p) => {
      const d = patternDocs[p.slug]
      const linhas = [`### ${p.name} (slug: pattern:${p.slug})`]
      if (!ehPlaceholder(d.description)) linhas.push(`- O que é: ${d.description}`)
      if (!ehPlaceholder(d.whenToUse)) linhas.push(`- Quando usar: ${d.whenToUse}`)
      linhas.push(`- Composto por: ${d.composition.map(semCategoria).join("; ")}`)
      const evite = textos(d.dontGuidelines)
      if (evite.length) linhas.push(`- Evite: ${evite.join(" ")}`)
      return linhas.join("\n")
    })

  return `## Componentes\n\n${componentes.join("\n\n")}\n\n## Patterns (composições prontas)\n\n${patterns.join("\n\n")}`
}

export function montarInstrucoes(): string {
  return `Você é o assistente do Design System R.ds. A pessoa descreve um contexto de interface e você recomenda o melhor componente ou pattern DESTE catálogo.

Regras:
- Recomende só slugs que existem no catálogo abaixo. Nunca invente componente.
- Baseie a escolha em "Quando usar" e "Evite". Quando dois vizinhos competem (ex.: Select x Combobox, Dialog x Sheet, Chip x Tag), diga por que um e não o outro.
- Se o contexto descreve um fluxo ou uma situação recorrente (lista vazia, exclusão, busca, formulário em etapas), prefira o pattern.
- Se faltar informação que muda a escolha (ex.: quantidade de opções, mobile ou desktop, se a ação é irreversível), recomende o mais provável e preencha "faltaContexto" com a pergunta que decidiria.
- Se nada no catálogo atende, use slug "nenhum" e explique o que falta.
- Responda em português do Brasil, frases curtas e diretas.

${montarCatalogo()}`
}

export interface RespostaModelo {
  recomendacao: { slug: string; motivo: string }
  alternativas: { slug: string; quandoPreferir: string }[]
  faltaContexto: string | null
}

export interface Recomendacao {
  item: ItemCatalogo | null
  motivo: string
  alternativas: { item: ItemCatalogo; quandoPreferir: string }[]
  faltaContexto: string | null
}

// O modelo pode errar slug mesmo com a regra; o que não existe no catálogo
// não chega na tela. Recomendação principal inválida vira "nenhum".
export function validarResposta(r: RespostaModelo): Recomendacao {
  const item = porSlug.get(r.recomendacao.slug.trim()) ?? null
  const vistos = new Set(item ? [item.slug] : [])
  const alternativas = r.alternativas.flatMap((a) => {
    const alt = porSlug.get(a.slug.trim())
    if (!alt || vistos.has(alt.slug)) return []
    vistos.add(alt.slug)
    return [{ item: alt, quandoPreferir: a.quandoPreferir }]
  })
  return {
    item,
    motivo: r.recomendacao.motivo,
    alternativas,
    faltaContexto: r.faltaContexto?.trim() || null,
  }
}
