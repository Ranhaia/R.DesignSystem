import { describe, expect, it } from "vitest"
import type { ComponentDoc } from "./component-docs"
import {
  abaAtiva,
  abasDoComponente,
  blocosVisaoGeral,
  exemploPrincipal,
  faixaMeta,
  itensQuandoUsar,
  linhasVariantesProps,
  previewDoTopo,
  vizinhosNaCamada,
} from "./doc-abas"

// Contrato da página condensada: H-doc-pagina-condensada, Fase 2. A página só renderiza o que estas funções decidem.
const vazio: ComponentDoc = {
  description: "d",
  whenToUse: "",
  anatomy: [],
  variants: [],
  states: [],
  sizes: [],
  doGuidelines: [],
  dontGuidelines: [],
  code: "",
  props: [],
}
const doc = (p: Partial<ComponentDoc> = {}): ComponentDoc => ({ ...vazio, ...p })
const ctx0 = { temExemplos: false, temComposicao: false }
const ids = (abas: { id: string }[]) => abas.map((a) => a.id)
const opcao = (value: string, description = "") => ({ name: value, value, description })

describe("abasDoComponente", () => {
  it("sem doc, só a Visão geral", () => {
    expect(abasDoComponente(undefined, ctx0)).toEqual([{ id: "visao-geral", label: "Visão geral" }])
  })

  it("doc antigo (sem MD): Visão geral, mais Exemplos e Código quando há o que mostrar", () => {
    const d = doc({ code: "<X />", variants: [opcao("a")] })
    expect(ids(abasDoComponente(d, ctx0))).toEqual(["visao-geral", "exemplos", "codigo"])
  })

  it("Exemplos aparece com exemplo cadastrado, mesmo sem variante", () => {
    expect(ids(abasDoComponente(doc(), { ...ctx0, temExemplos: true }))).toEqual(["visao-geral", "exemplos"])
  })

  it("Playground mora no topo da página: sozinho não cria a aba Exemplos", () => {
    expect(ids(abasDoComponente(doc(), { ...ctx0, temPlayground: true } as typeof ctx0))).toEqual(["visao-geral"])
  })

  it("Código aparece com anatomia ou composição, mesmo sem exemplo mínimo", () => {
    const anatomia = doc({ anatomy: [{ part: "Raiz", description: "x" }] })
    expect(ids(abasDoComponente(anatomia, ctx0))).toEqual(["visao-geral", "codigo"])
    expect(ids(abasDoComponente(doc(), { ...ctx0, temComposicao: true }))).toEqual(["visao-geral", "codigo"])
  })

  it("Tokens e Acessibilidade só aparecem com dado", () => {
    expect(ids(abasDoComponente(doc({ tokens: [] }), ctx0))).toEqual(["visao-geral"])
    expect(ids(abasDoComponente(doc({ tokens: ["bg-primary"] }), ctx0))).toEqual(["visao-geral", "tokens"])
    const a11y = { keyboard: "k", screenReader: "s", focus: "f", cautions: "c" }
    expect(ids(abasDoComponente(doc({ accessibility: a11y }), ctx0))).toEqual(["visao-geral", "acessibilidade"])
  })

  it("ordem fixa e rótulos em português", () => {
    const completo = doc({
      code: "x",
      variants: [opcao("a")],
      tokens: ["t"],
      accessibility: { keyboard: "k", screenReader: "s", focus: "f", cautions: "c" },
    })
    expect(abasDoComponente(completo, ctx0)).toEqual([
      { id: "visao-geral", label: "Visão geral" },
      { id: "exemplos", label: "Exemplos" },
      { id: "codigo", label: "Código" },
      { id: "tokens", label: "Tokens" },
      { id: "acessibilidade", label: "Acessibilidade" },
    ])
  })
})

describe("abaAtiva", () => {
  const abas = abasDoComponente(doc({ code: "x", tokens: ["t"] }), ctx0)

  it("aceita o id com ou sem #", () => {
    expect(abaAtiva("codigo", abas)).toBe("codigo")
    expect(abaAtiva("#codigo", abas)).toBe("codigo")
    expect(abaAtiva("tokens", abas)).toBe("tokens")
  })

  it("cai na Visão geral quando o valor falta, é lixo ou a aba não existe neste componente", () => {
    expect(abaAtiva(undefined, abas)).toBe("visao-geral")
    expect(abaAtiva("", abas)).toBe("visao-geral")
    expect(abaAtiva("#", abas)).toBe("visao-geral")
    expect(abaAtiva("lixo", abas)).toBe("visao-geral")
    expect(abaAtiva("acessibilidade", abas)).toBe("visao-geral")
  })
})

describe("blocosVisaoGeral", () => {
  it("doc vazio não tem bloco", () => {
    expect(blocosVisaoGeral(doc())).toEqual([])
  })

  it("doc antigo usa whenToUse como Quando usar e esconde Quando NÃO usar", () => {
    const d = doc({
      whenToUse: "Para X.",
      variants: [opcao("a")],
      states: [{ name: "Padrão", description: "" }],
      doGuidelines: ["Faça"],
      dontGuidelines: ["Não faça"],
    })
    expect(blocosVisaoGeral(d)).toEqual(["quando-usar", "variantes-props", "estados", "faca-nao-faca"])
  })

  it("ordem fixa com tudo preenchido", () => {
    const d = doc({
      whenToUseItems: ["a"],
      whenNotToUse: ["b → link"],
      props: [{ name: "x", type: "string", description: "" }],
      states: [{ name: "Padrão", description: "" }],
      dontGuidelines: ["Não faça"],
    })
    expect(blocosVisaoGeral(d)).toEqual(["quando-usar", "quando-nao-usar", "variantes-props", "estados", "faca-nao-faca"])
  })

  it("Variantes e props aparece só com props, e Faça e não faça só com um dos lados", () => {
    expect(blocosVisaoGeral(doc({ props: [{ name: "x", type: "t", description: "" }] }))).toEqual(["variantes-props"])
    expect(blocosVisaoGeral(doc({ doGuidelines: ["a"] }))).toEqual(["faca-nao-faca"])
  })
})

describe("itensQuandoUsar", () => {
  it("prefere a lista, cai na string antiga e devolve vazio sem nada", () => {
    expect(itensQuandoUsar(doc({ whenToUse: "a b", whenToUseItems: ["a", "b"] }))).toEqual(["a", "b"])
    expect(itensQuandoUsar(doc({ whenToUse: "Para X." }))).toEqual(["Para X."])
    expect(itensQuandoUsar(doc())).toEqual([])
  })
})

describe("linhasVariantesProps: uma tabela só", () => {
  const d = doc({
    variants: [opcao("default", "Principal"), opcao("ghost", "Discreto")],
    sizes: [opcao("sm", "32 px — Tabelas"), opcao("lg", "48 px — Chamada")],
    props: [
      { name: "variant", type: "default · ghost", default: "default", description: "Hierarquia visual" },
      { name: "size", type: "sm · lg", default: "sm", description: "Altura" },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no filho" },
      { name: "onClick", type: "() => void", description: "Ao clicar" },
    ],
  })

  it("variantes uma a uma, tamanhos numa linha só e as demais props", () => {
    expect(linhasVariantesProps(d)).toEqual([
      { grupo: "Variantes", nome: "default", detalhe: "", descricao: "Principal" },
      { grupo: "Variantes", nome: "ghost", detalhe: "", descricao: "Discreto" },
      { grupo: "Tamanhos", nome: "size", detalhe: "sm · lg", descricao: "Altura" },
      { grupo: "Props", nome: "asChild", detalhe: "boolean = false", descricao: "Renderiza no filho" },
      { grupo: "Props", nome: "onClick", detalhe: "() => void", descricao: "Ao clicar" },
    ])
  })

  it("sem lista de variantes ou de tamanhos, as props variant e size ficam na tabela", () => {
    const so = doc({ props: d.props })
    expect(linhasVariantesProps(so).map((l) => l.nome)).toEqual(["variant", "size", "asChild", "onClick"])
    expect(linhasVariantesProps(so).every((l) => l.grupo === "Props")).toBe(true)
  })

  it("tamanhos sem a prop size ficam com descrição vazia; doc vazio não tem linha", () => {
    expect(linhasVariantesProps(doc({ sizes: [opcao("sm"), opcao("lg")] }))).toEqual([
      { grupo: "Tamanhos", nome: "size", detalhe: "sm · lg", descricao: "" },
    ])
    expect(linhasVariantesProps(doc())).toEqual([])
  })

  it('padrão "—" do MD significa "sem padrão": só o tipo aparece', () => {
    const d = doc({
      props: [
        { name: "children", type: "React.ReactNode", default: "—", description: "Conteúdo" },
        { name: "disabled", type: "boolean", default: "false", description: "Desabilita" },
      ],
    })
    expect(linhasVariantesProps(d).map((l) => l.detalhe)).toEqual(["React.ReactNode", "boolean = false"])
  })
})

describe("previewDoTopo: o que ocupa o topo da página", () => {
  it("Playground vence o exemplo estático (o 'ou' da História não é 'sempre o exemplo')", () => {
    expect(previewDoTopo({ temPlayground: true, temExemplo: true })).toBe("playground")
    expect(previewDoTopo({ temPlayground: true, temExemplo: false })).toBe("playground")
  })

  it("sem Playground, o 1º exemplo; sem nenhum dos dois, nada", () => {
    expect(previewDoTopo({ temPlayground: false, temExemplo: true })).toBe("exemplo")
    expect(previewDoTopo({ temPlayground: false, temExemplo: false })).toBeUndefined()
  })
})

describe("exemploPrincipal: o exemplo do topo da página", () => {
  it("prefere o Default, depois o Demo, e por último o primeiro da lista", () => {
    // nomes no formato real de src/lib/examples-mapping.ts
    expect(exemploPrincipal(["button-as-child", "button-default", "button-demo"])).toBe("button-default")
    expect(exemploPrincipal(["dialog-close-button", "dialog-demo"])).toBe("dialog-demo")
    expect(exemploPrincipal(["alert-a", "alert-b"])).toBe("alert-a")
  })

  it("sem exemplo, nada", () => {
    expect(exemploPrincipal([])).toBeUndefined()
  })
})

describe("vizinhosNaCamada: Anterior e Próxima", () => {
  const lista = [{ slug: "a" }, { slug: "b" }, { slug: "c" }, { slug: "d" }, { slug: "e" }]
  const camada: Record<string, string> = { a: "atom", b: "molecule", c: "atom", d: "atom" }

  it("anda só dentro da camada, na ordem da lista", () => {
    expect(vizinhosNaCamada("c", lista, camada)).toEqual({ anterior: "a", proximo: "d" })
  })

  it("o primeiro não tem anterior e o último não tem próxima", () => {
    expect(vizinhosNaCamada("a", lista, camada)).toEqual({ proximo: "c" })
    expect(vizinhosNaCamada("d", lista, camada)).toEqual({ anterior: "c" })
  })

  it("único da camada, slug fora da lista ou sem camada: nada", () => {
    expect(vizinhosNaCamada("b", lista, camada)).toEqual({})
    expect(vizinhosNaCamada("zzz", lista, camada)).toEqual({})
    expect(vizinhosNaCamada("e", lista, camada)).toEqual({})
  })
})

describe("faixaMeta", () => {
  it("sem meta, nada", () => {
    expect(faixaMeta(doc())).toEqual([])
  })

  it("Status, Camada e Relacionados, nessa ordem", () => {
    const d = doc({
      meta: { nome: "Button", camada: "atom", status: "estavel", codigo: "c", story: "s", vizinhos: ["link", "icon-button"] },
    })
    expect(faixaMeta(d)).toEqual([
      { rotulo: "Status", valores: ["estavel"] },
      { rotulo: "Camada", valores: ["atom"] },
      { rotulo: "Relacionados", valores: ["link", "icon-button"] },
    ])
  })

  it("pula o que está vazio", () => {
    const d = doc({ meta: { nome: "X", camada: "atom", status: "", codigo: "", story: "", vizinhos: [] } })
    expect(faixaMeta(d)).toEqual([{ rotulo: "Camada", valores: ["atom"] }])
  })
})
