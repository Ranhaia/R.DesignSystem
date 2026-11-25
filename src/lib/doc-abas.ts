import type { ComponentDoc } from "./component-docs"

export interface LinhaVarianteProp {
  grupo: "Variantes" | "Tamanhos" | "Props"
  nome: string
  detalhe: string
  descricao: string
}

// Uma linha das abas Código, Tokens e Acessibilidade: rótulo à esquerda, texto ou códigos à direita.
export interface LinhaDoc {
  rotulo: string
  texto?: string
  codigos?: string[]
}

export interface VizinhosCamada {
  anterior?: string
  proximo?: string
}

export interface ItemFaixaMeta {
  rotulo: string
  valores: string[]
}

export interface SecaoItem {
  id: string
  label: string
}

export interface SecoesContexto {
  temTopo?: boolean
  temExemplos?: boolean
  temComposicao?: boolean
}

const tem = (l?: unknown[]) => Boolean(l && l.length > 0)

// A página é uma rolagem única; o nav âncora e as <section> saem desta lista, na ordem do Lume.
export function secoesDoComponente(doc?: ComponentDoc, ctx?: SecoesContexto): SecaoItem[] {
  const a = doc?.accessibility
  const candidatas: [string, string, boolean][] = [
    ["playground", "Playground", Boolean(ctx?.temTopo)],
    ["variantes", "Variantes", tem(doc?.variants)],
    ["tamanhos", "Tamanhos", tem(doc?.sizes)],
    ["estados", "Estados", tem(doc?.states)],
    ["exemplos", "Exemplos", Boolean(ctx?.temExemplos)],
    ["anatomia", "Anatomia", tem(doc?.anatomy)],
    ["composicao", "Composição", Boolean(ctx?.temComposicao) || Boolean(doc?.code?.trim()) || tem(doc?.props)],
    ["acessibilidade", "Acessibilidade", Boolean(a && Object.values(a).some((v) => typeof v === "string" && v.trim()))],
    ["tokens", "Tokens", tem(doc?.tokens)],
    [
      "uso",
      "Uso",
      Boolean(doc && itensQuandoUsar(doc).length) || tem(doc?.whenNotToUse) || tem(doc?.doGuidelines) || tem(doc?.dontGuidelines),
    ],
  ]
  return candidatas.filter(([, , ok]) => ok).map(([id, label]) => ({ id, label }))
}

export interface MetricaTopo {
  valor: number
  rotulo: string
}

// Os números do canto do cabeçalho: só o que o componente tem.
export function metricasDoTopo(doc?: ComponentDoc): MetricaTopo[] {
  const par = (n: number | undefined, um: string, varios: string) =>
    n ? [{ valor: n, rotulo: n === 1 ? um : varios }] : []
  return [
    ...par(doc?.variants?.length, "variante", "variantes"),
    ...par(doc?.sizes?.length, "tamanho", "tamanhos"),
    ...par(doc?.states?.length, "estado", "estados"),
  ]
}

export function itensQuandoUsar(doc: ComponentDoc): string[] {
  if (doc.whenToUseItems && doc.whenToUseItems.length > 0) {
    return doc.whenToUseItems
  }
  if (doc.whenToUse && doc.whenToUse.trim().length > 0) {
    return [doc.whenToUse]
  }
  return []
}

// O topo da página é o Playground quando o componente tem um; só sem ele cai no 1º exemplo estático.
export function previewDoTopo(ctx: {
  temPlayground: boolean
  temExemplo: boolean
}): "playground" | "exemplo" | undefined {
  if (ctx.temPlayground) return "playground"
  return ctx.temExemplo ? "exemplo" : undefined
}

// Os nomes são arquivos em kebab-case (button-default, dialog-demo) e a lista vem em ordem alfabética: sem isto o
// topo da página mostraria "button-as-child" em vez do uso padrão.
export function exemploPrincipal(nomes: string[]): string | undefined {
  return nomes.find((n) => /-default$/.test(n)) ?? nomes.find((n) => /-demo$/.test(n)) ?? nomes[0]
}

export function linhasVariantesProps(doc: ComponentDoc): LinhaVarianteProp[] {
  const linhas: LinhaVarianteProp[] = []

  const temVariantes = Boolean(doc.variants && doc.variants.length > 0)
  const temTamanhos = Boolean(doc.sizes && doc.sizes.length > 0)

  if (temVariantes) {
    for (const v of doc.variants) {
      linhas.push({
        grupo: "Variantes",
        nome: v.value || v.name,
        detalhe: "",
        descricao: v.description ?? "",
      })
    }
  }

  if (temTamanhos) {
    const propSize = doc.props?.find((p) => p.name === "size")
    linhas.push({
      grupo: "Tamanhos",
      nome: "size",
      detalhe: doc.sizes.map((s) => s.name || s.value).join(" · "),
      descricao: propSize?.description ?? "",
    })
  }

  if (doc.props && doc.props.length > 0) {
    for (const p of doc.props) {
      if (temVariantes && p.name === "variant") continue
      if (temTamanhos && p.name === "size") continue

      // No MD, "—" quer dizer "sem padrão".
      const temPadrao = Boolean(p.default) && p.default?.trim() !== "—"
      const detalhe = temPadrao ? `${p.type} = ${p.default}` : p.type

      linhas.push({
        grupo: "Props",
        nome: p.name,
        detalhe,
        descricao: p.description ?? "",
      })
    }
  }

  return linhas
}

export function vizinhosNaCamada(
  slug: string,
  lista: { slug: string }[],
  camada: Record<string, string>
): VizinhosCamada {
  const camadaDoSlug = camada[slug]
  if (!camadaDoSlug) return {}

  const daCamada = lista.filter((item) => camada[item.slug] === camadaDoSlug)
  const idx = daCamada.findIndex((item) => item.slug === slug)
  if (idx === -1) return {}

  const res: VizinhosCamada = {}
  if (idx > 0) {
    res.anterior = daCamada[idx - 1].slug
  }
  if (idx < daCamada.length - 1) {
    res.proximo = daCamada[idx + 1].slug
  }
  return res
}

const chavesAcessibilidade = [
  ["Teclado", "keyboard"],
  ["Leitor de tela", "screenReader"],
  ["Foco", "focus"],
  ["Cuidados", "cautions"],
] as const

export function linhasAcessibilidade(doc: ComponentDoc): LinhaDoc[] {
  const a = doc.accessibility
  if (!a) return []
  return chavesAcessibilidade
    .filter(([, chave]) => a[chave]?.trim())
    .map(([rotulo, chave]) => ({ rotulo, texto: a[chave] }))
}

export function linhasTokens(doc: ComponentDoc): LinhaDoc[] {
  return (doc.tokens ?? []).map((g) => ({ rotulo: g.contexto, codigos: g.itens }))
}

export function faixaMeta(doc: ComponentDoc): ItemFaixaMeta[] {
  if (!doc.meta) return []

  const itens: ItemFaixaMeta[] = []

  // `piloto` é o estado de revisão interna do R.DS: não aparece para quem usa.
  if (doc.meta.status && doc.meta.status.trim().length > 0 && doc.meta.status !== "piloto") {
    itens.push({ rotulo: "Status", valores: [doc.meta.status] })
  }
  if (doc.meta.camada && doc.meta.camada.trim().length > 0) {
    itens.push({ rotulo: "Camada", valores: [doc.meta.camada] })
  }
  if (doc.meta.vizinhos && doc.meta.vizinhos.length > 0) {
    itens.push({ rotulo: "Relacionados", valores: doc.meta.vizinhos })
  }

  return itens
}
