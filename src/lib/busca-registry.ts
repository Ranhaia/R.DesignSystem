// Índice da busca nominal (⌘K / Ctrl+K no header). Não é uma lista nova:
// monta tudo a partir dos registros que já são fonte única — componentes
// (components-registry + atomic-registry), patterns e templates. Entrou
// componente, pattern ou template novo no registro dele, ele já aparece
// aqui sem mexer neste arquivo. Só "Fundamentos" é listado à mão, porque
// as páginas de fundamentos não têm registro próprio.
//
// Busca nominal = pelo nome (e pelo slug). Não procura em descrição nem em
// "quando usar": isso é trabalho de recomendação por contexto, outra peça.

import {
  atomicRegistry,
  categoryLabels,
  type AtomicCategory,
} from "./atomic-registry"
import { componentsList } from "./components-registry"
import { patternsList } from "./patterns-registry"
import { templatesList } from "./templates-registry"

export type GrupoBusca = AtomicCategory | "utility" | "pattern" | "template" | "foundation"

export interface ItemBusca {
  grupo: GrupoBusca
  nome: string
  slug: string
  href: string
}

export const rotulosGrupo: Record<GrupoBusca, string> = {
  ...categoryLabels,
  utility: "Utilitários",
  pattern: "Patterns",
  template: "Templates",
  foundation: "Fundamentos",
}

// Ordem dos grupos no resultado: do mais usado pra montar tela ao menos.
export const ordemGrupos: GrupoBusca[] = [
  "primitive",
  "atom",
  "molecule",
  "organism",
  "pattern",
  "template",
  "foundation",
  "utility",
]

const fundamentos: ItemBusca[] = [
  { grupo: "foundation", nome: "Folha de estilo", slug: "estilo", href: "/estilo" },
  { grupo: "foundation", nome: "Tipografia", slug: "tipografia", href: "/fundamentos/tipografia" },
  { grupo: "foundation", nome: "Cores", slug: "cores", href: "/fundamentos/cores" },
  { grupo: "foundation", nome: "Espaçamento", slug: "espacamento", href: "/fundamentos/espacamento" },
  { grupo: "foundation", nome: "Bordas", slug: "bordas", href: "/fundamentos/bordas" },
  { grupo: "foundation", nome: "Elevação", slug: "elevacao", href: "/fundamentos/elevacao" },
]

export const indiceBusca: ItemBusca[] = [
  ...componentsList.map((c) => ({
    // Componente fora do atomicRegistry (ex: "direction", "list") cai em
    // Utilitários em vez de sumir da busca.
    grupo: atomicRegistry[c.slug] ?? ("utility" as const),
    nome: c.name,
    slug: c.slug,
    href: `/components/${c.slug}`,
  })),
  ...patternsList.map((p) => ({
    grupo: "pattern" as const,
    nome: p.name,
    slug: p.slug,
    href: `/patterns/${p.slug}`,
  })),
  ...templatesList.map((t) => ({
    grupo: "template" as const,
    nome: t.name,
    slug: t.slug,
    href: `/templates/${t.slug}`,
  })),
  ...fundamentos,
]

// Minúsculas, sem acento, e hífen/sublinhado viram espaço: "Multi-Select",
// "multiselect" e "multi select" precisam se encontrar.
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// Pontua um item contra o termo. 0 = não casa. Quanto maior, mais acima.
// Cada palavra do termo precisa aparecer no nome ou no slug (busca por
// "dialog alert" acha "Alert Dialog"); o bônus vai pra casamento exato e
// por começo de palavra, que é como as pessoas digitam nome de componente.
export function pontuar(item: ItemBusca, termo: string): number {
  const t = normalizar(termo)
  if (!t) return 0

  const nome = normalizar(item.nome)
  const slug = normalizar(item.slug)
  const nomeColado = nome.replace(/ /g, "")
  const tColado = t.replace(/ /g, "")

  if (nome === t || slug === t || nomeColado === tColado) return 100
  if (nome.startsWith(t) || nomeColado.startsWith(tColado)) return 80

  const palavras = t.split(" ")
  const alvo = `${nome} ${slug}`
  const palavrasDoAlvo = alvo.split(" ")
  if (!palavras.every((p) => alvo.includes(p))) {
    return nomeColado.includes(tColado) ? 30 : 0
  }
  const todasNoComeco = palavras.every((p) =>
    palavrasDoAlvo.some((w) => w.startsWith(p))
  )
  return todasNoComeco ? 60 : 40
}

export interface GrupoResultado {
  grupo: GrupoBusca
  rotulo: string
  itens: ItemBusca[]
}

// Termo vazio devolve o índice inteiro, agrupado, em ordem alfabética.
// Com termo, o grupo que tem o melhor resultado sobe (quem busca "loading"
// quer ver o Pattern exato antes de um Atom que só contém a palavra); em
// empate, vale ordemGrupos.
export function buscar(termo: string, indice: ItemBusca[] = indiceBusca): GrupoResultado[] {
  const vazio = !normalizar(termo)
  const pontuados = indice
    .map((item) => ({ item, pontos: vazio ? 1 : pontuar(item, termo) }))
    .filter((r) => r.pontos > 0)

  return ordemGrupos
    .map((grupo) => {
      const doGrupo = pontuados
        .filter((r) => r.item.grupo === grupo)
        .sort((a, b) => b.pontos - a.pontos || a.item.nome.localeCompare(b.item.nome, "pt-BR"))
      return {
        grupo,
        rotulo: rotulosGrupo[grupo],
        melhor: doGrupo[0]?.pontos ?? 0,
        itens: doGrupo.map((r) => r.item),
      }
    })
    .filter((g) => g.itens.length > 0)
    .sort((a, b) => b.melhor - a.melhor)
    .map(({ grupo, rotulo, itens }) => ({ grupo, rotulo, itens }))
}
