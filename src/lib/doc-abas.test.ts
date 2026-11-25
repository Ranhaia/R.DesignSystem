import { describe, expect, it } from "vitest"
import type { ComponentDoc } from "./component-docs"
import {
  exemploPrincipal,
  faixaMeta,
  itensQuandoUsar,
  linhasAcessibilidade,
  linhasTokens,
  linhasVariantesProps,
  metricasDoTopo,
  previewDoTopo,
  secoesDoComponente,
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

describe("secoesDoComponente: a ordem da rolagem única", () => {
  it("doc vazio e sem exemplos: nenhuma seção", () => {
    expect(secoesDoComponente(doc())).toEqual([])
  })

  it("segue a ordem Playground, Variantes, Tamanhos, Estados, Exemplos, Anatomia, Composição, Acessibilidade, Tokens, Uso", () => {
    const completo = doc({
      variants: [{ name: "A", value: "a", description: "" }],
      sizes: [{ name: "P", value: "p" }],
      states: [{ name: "Hover", description: "" }],
      anatomy: [{ part: "Raiz", description: "" }],
      accessibility: { keyboard: "Tab" },
      tokens: [{ contexto: "Cor", itens: ["--primary"] }],
      whenToUseItems: ["x"],
    } as Partial<ComponentDoc>)
    const ids = secoesDoComponente(completo, { temTopo: true, temExemplos: true, temComposicao: true }).map((s) => s.id)
    expect(ids).toEqual([
      "playground",
      "variantes",
      "tamanhos",
      "estados",
      "exemplos",
      "anatomia",
      "composicao",
      "acessibilidade",
      "tokens",
      "uso",
    ])
  })

  it("só inclui a seção que tem conteúdo", () => {
    const ids = secoesDoComponente(doc({ states: [{ name: "Hover", description: "" }] })).map((s) => s.id)
    expect(ids).toEqual(["estados"])
  })

  it("Uso aparece com Quando não usar ou Faça e não faça, mesmo sem Quando usar", () => {
    expect(secoesDoComponente(doc({ whenNotToUse: ["y"] })).map((s) => s.id)).toEqual(["uso"])
    expect(secoesDoComponente(doc({ doGuidelines: ["z"] })).map((s) => s.id)).toEqual(["uso"])
  })

  it("props sozinhas já abrem a seção Composição (tabela de props)", () => {
    expect(secoesDoComponente(doc({ props: [{ name: "a", type: "string" }] } as Partial<ComponentDoc>)).map((s) => s.id)).toEqual(["composicao"])
  })

  it("todo item traz rótulo em português e id único", () => {
    const todos = secoesDoComponente(
      doc({ code: "x", variants: [{ name: "A", value: "a", description: "" }] }),
      { temTopo: true, temExemplos: true, temComposicao: true }
    )
    expect(new Set(todos.map((s) => s.id)).size).toBe(todos.length)
    for (const s of todos) expect(s.label.length).toBeGreaterThan(0)
  })
})

describe("metricasDoTopo: números do cabeçalho", () => {
  it("conta variantes, tamanhos e estados; omite o que é zero", () => {
    const m = metricasDoTopo(
      doc({
        variants: [
          { name: "A", value: "a", description: "" },
          { name: "B", value: "b", description: "" },
        ],
        sizes: [{ name: "P", value: "p" }],
      } as Partial<ComponentDoc>)
    )
    expect(m).toEqual([
      { valor: 2, rotulo: "variantes" },
      { valor: 1, rotulo: "tamanho" },
    ])
  })

  it("singular quando é 1 e vazio quando não há nada", () => {
    expect(metricasDoTopo(doc())).toEqual([])
    expect(metricasDoTopo(doc({ states: [{ name: "x", description: "" }] }))).toEqual([{ valor: 1, rotulo: "estado" }])
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

  it("piloto é parâmetro interno de revisão: não aparece; descontinuado aparece", () => {
    const meta = { nome: "X", camada: "atom", codigo: "", story: "", vizinhos: [] }
    expect(faixaMeta(doc({ meta: { ...meta, status: "piloto" } }))).toEqual([{ rotulo: "Camada", valores: ["atom"] }])
    expect(faixaMeta(doc({ meta: { ...meta, status: "descontinuado" } }))[0]).toEqual({ rotulo: "Status", valores: ["descontinuado"] })
  })
})

describe("linhasAcessibilidade: mesma linha que Tokens e Anatomia", () => {
  it("sem dado, nenhuma linha", () => {
    expect(linhasAcessibilidade(doc())).toEqual([])
  })

  it("uma linha por chave, na ordem Teclado, Leitor de tela, Foco, Cuidados, pulando a vazia", () => {
    const a = { keyboard: "k", screenReader: "s", focus: "f", cautions: "c" }
    expect(linhasAcessibilidade(doc({ accessibility: a }))).toEqual([
      { rotulo: "Teclado", texto: "k" },
      { rotulo: "Leitor de tela", texto: "s" },
      { rotulo: "Foco", texto: "f" },
      { rotulo: "Cuidados", texto: "c" },
    ])
    expect(linhasAcessibilidade(doc({ accessibility: { ...a, focus: "  " } })).map((l) => l.rotulo)).toEqual([
      "Teclado", "Leitor de tela", "Cuidados",
    ])
  })
})

describe("linhasTokens: uma linha por contexto", () => {
  it("sem dado, nenhuma linha", () => {
    expect(linhasTokens(doc())).toEqual([])
    expect(linhasTokens(doc({ tokens: [] }))).toEqual([])
  })

  it("rótulo é o contexto e os códigos são os tokens dele", () => {
    const tokens = [
      { contexto: "Cor", itens: ["bg-primary", "text-primary"] },
      { contexto: "Movimento", itens: ["ease-spring"] },
    ]
    expect(linhasTokens(doc({ tokens }))).toEqual([
      { rotulo: "Cor", codigos: ["bg-primary", "text-primary"] },
      { rotulo: "Movimento", codigos: ["ease-spring"] },
    ])
  })
})
