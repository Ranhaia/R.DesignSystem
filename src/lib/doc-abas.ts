import type { ComponentDoc } from "./component-docs"

export interface AbaItem {
  id: string
  label: string
}

export interface AbasContexto {
  temExemplos?: boolean
  temPlayground?: boolean
  temComposicao?: boolean
}

export interface LinhaVarianteProp {
  grupo: "Variantes" | "Tamanhos" | "Props"
  nome: string
  detalhe: string
  descricao: string
}

export interface VizinhosCamada {
  anterior?: string
  proximo?: string
}

export interface ItemFaixaMeta {
  rotulo: string
  valores: string[]
}

export const rotulosBlocosVisaoGeral: Record<string, string> = {
  "quando-usar": "Quando usar",
  "quando-nao-usar": "Quando não usar",
  "variantes-props": "Variantes e props",
  "estados": "Estados",
  "faca-nao-faca": "Faça e não faça",
}

export function abasDoComponente(
  doc?: ComponentDoc,
  ctx?: AbasContexto
): AbaItem[] {
  const abas: AbaItem[] = [{ id: "visao-geral", label: "Visão geral" }]

  const temExemplos =
    Boolean(ctx?.temExemplos) ||
    Boolean(ctx?.temPlayground) ||
    Boolean(doc?.variants && doc.variants.length > 0) ||
    Boolean(doc?.sizes && doc.sizes.length > 0)

  if (temExemplos) {
    abas.push({ id: "exemplos", label: "Exemplos" })
  }

  const temCodigo =
    Boolean(ctx?.temComposicao) ||
    Boolean(doc?.code && doc.code.trim().length > 0) ||
    Boolean(doc?.anatomy && doc.anatomy.length > 0)

  if (temCodigo) {
    abas.push({ id: "codigo", label: "Código" })
  }

  const temTokens = Boolean(doc?.tokens && doc.tokens.length > 0)
  if (temTokens) {
    abas.push({ id: "tokens", label: "Tokens" })
  }

  const temA11y = Boolean(
    doc?.accessibility &&
      Object.values(doc.accessibility).some(
        (v) => typeof v === "string" && v.trim().length > 0
      )
  )
  if (temA11y) {
    abas.push({ id: "acessibilidade", label: "Acessibilidade" })
  }

  return abas
}

export function abaAtiva(
  hashOuId: string | undefined,
  abas: { id: string }[]
): string {
  if (!hashOuId) return "visao-geral"
  const limpo = hashOuId.startsWith("#") ? hashOuId.slice(1) : hashOuId
  if (!limpo) return "visao-geral"
  const encontrada = abas.find((a) => a.id === limpo)
  return encontrada ? encontrada.id : "visao-geral"
}

export function blocosVisaoGeral(doc: ComponentDoc): string[] {
  const blocos: string[] = []

  const temQuandoUsar =
    Boolean(doc.whenToUseItems && doc.whenToUseItems.length > 0) ||
    Boolean(doc.whenToUse && doc.whenToUse.trim().length > 0)
  if (temQuandoUsar) {
    blocos.push("quando-usar")
  }

  const temQuandoNaoUsar = Boolean(
    doc.whenNotToUse && doc.whenNotToUse.length > 0
  )
  if (temQuandoNaoUsar) {
    blocos.push("quando-nao-usar")
  }

  const temVariantesProps =
    Boolean(doc.variants && doc.variants.length > 0) ||
    Boolean(doc.sizes && doc.sizes.length > 0) ||
    Boolean(doc.props && doc.props.length > 0)
  if (temVariantesProps) {
    blocos.push("variantes-props")
  }

  const temEstados = Boolean(doc.states && doc.states.length > 0)
  if (temEstados) {
    blocos.push("estados")
  }

  const temFacaNaoFaca =
    Boolean(doc.doGuidelines && doc.doGuidelines.length > 0) ||
    Boolean(doc.dontGuidelines && doc.dontGuidelines.length > 0)
  if (temFacaNaoFaca) {
    blocos.push("faca-nao-faca")
  }

  return blocos
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

      const detalhe = p.default ? `${p.type} = ${p.default}` : p.type

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

export function faixaMeta(doc: ComponentDoc): ItemFaixaMeta[] {
  if (!doc.meta) return []

  const itens: ItemFaixaMeta[] = []

  if (doc.meta.status && doc.meta.status.trim().length > 0) {
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
