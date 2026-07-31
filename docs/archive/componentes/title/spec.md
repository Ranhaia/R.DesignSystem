# Spec — Title (Atom)

Status: implementação criada nesta sessão (Fase 6.1 do
`PLANO-LOOP-80-20-TEMPLATES.md`). Arquivos: `src/components/ui/title.tsx`,
`src/components/examples/title-demo.tsx`, `src/components/ui/title.stories.tsx`.
Registries compartilhados (`atomic-registry.ts`, `components-registry.ts`,
`composition-registry.ts`, `examples-mapping.ts`, `examples/registry.tsx`,
`component-docs.ts`) **não foram editados** por este agente — as linhas
exatas foram devolvidas em texto para outro processo colar.

Parente mais próximo (definido na tarefa): Label/Text — Title é um átomo
tipográfico formal para headings (h1-h6), controlando o elemento HTML real
via prop `as`. Não importa de `text.tsx` (componente construído em paralelo
por outro agente, pode não existir ainda).

---

## Fonte(s) consultada(s)

1. **`@nimbus-ds/title` — README publicado**
   `https://unpkg.com/@nimbus-ds/title/README.md`
   → Descrição real: "aplica hierarquia visual e semântica ao conteúdo de
   uma página". Confirma a existência de duas hierarquias independentes:
   **semântica** (tags h1-h6) e **visual** (tokens tipográficos que podem
   aumentar/diminuir a proeminência de um título sem interferir na
   semântica) — é exatamente o racional por trás de `as` (semântico) vs.
   `size` (visual) que a tarefa pediu.
2. **`@nimbus-ds/title` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/title/dist/index.d.ts`
   → `TitleProps` = `TitleProperties & HTMLAttributes<HTMLHeadingElement>`,
   `children: ReactNode` obrigatório. Prop `as` aceita só `"h1"|"h2"|"h3"|"h4"|"h5"|"h6"`.
   Defaults documentados no typedef: `fontSize: "base"`, `fontWeight:
   "regular"`, `lineHeight: "base"`, `textAlign: "left"`, `color:
   "neutral-textLow"`, **`as: "h1"`**. Também expõe `fontWeight`
   ("regular"|"medium"|"bold"), `lineHeight`, `textAlign`
   ("left"|"right"|"center"|"justify") e `color` (tokens de cor, ex.
   `primary-textHigh`, `danger-textLow`) como sprinkles independentes —
   não replicados aqui (ver seção Decisões abaixo).
3. **`@nimbus-ds/title` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/title/dist/index.js`
   → Só expôs um objeto de dimensões do skeleton (`width`/`height` por
   nível h1-h6), não os valores reais de `font-size`/`font-weight`/
   `line-height` — esses ficam num pacote externo (`@nimbus-ds/styles`)
   não incluído no bundle consultado. **Não encontrado**: valores px/rem
   reais da escala tipográfica do Nimbus — não inventados a partir disso.
4. **Precedente interno já existente neste projeto** (parente de padrão de
   código, conforme instrução da tarefa): `src/components/ui/label.tsx`
   (estrutura mínima, `data-slot`) e `src/components/ui/chip.tsx` (cva +
   `data-slot` + `data-variant`).
5. **Convenção de heading já estabelecida no projeto** (grep em `src/`):
   toda página/seção já usa o padrão `font-heading text-{tamanho}
   font-{peso} [tracking-tight]` diretamente em JSX (ex.:
   `src/app/page.tsx`, `src/components/portfolio/hero.tsx`,
   `src/app/patterns/[slug]/page.tsx`, `src/components/ui/card.tsx`
   `CardTitle`). Usado como base real e já aprovada implicitamente
   (produção) para a escala visual do Title — ver Decisões.
6. `src/lib/component-docs.ts` (entrada `chip`) e `src/lib/composition-registry.ts`
   — formato exato de saída exigido.

---

## Descrição

*(localizado/adaptado do README oficial do `@nimbus-ds/title`, fonte 1
acima)*

Title é um componente de texto usado para aplicar hierarquia visual e
semântica ao conteúdo de uma página.

## Quando utilizar

*(localizado/adaptado do README oficial, fonte 1 acima)*

- Use para títulos e subtítulos de telas, páginas, blocos de texto, seções
  ou outros componentes.
- A hierarquia **semântica** é controlada pela tag HTML real (h1 a h6,
  prop `as`) — h1 tem o maior nível hierárquico no documento, h6 o menor.
  Importante para leitores de tela e SEO.
- A hierarquia **visual** (prop `size`, ver Variantes) pode aumentar ou
  diminuir a proeminência de um título sem interferir na semântica — ou
  seja, `as` e `size` são independentes por design, não só por acidente de
  implementação.

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | Um dos elementos `<h1>`–`<h6>`, escolhido via prop `as` (default `h2` — ver Decisões), com `data-slot="title"`, `data-as` e `data-size`. |

Título não tem subcomponentes — é um único elemento textual, igual ao
`Label`.

---

## Composição

Export único: **`Title`** (mesmo padrão de `Label`/`Badge`/`Chip` —
componente sem subcomponentes compostos).

Entrada esperada em `composition-registry.ts`:
```ts
"title": ["Title"],
```

---

## Variantes (`size`)

**Decisão provisória — escala não é 1:1 com o Nimbus.** O bundle JS do
Nimbus não expôs os valores reais de `font-size`/`font-weight` da escala
tipográfica (fonte 3 — ficam num pacote externo não incluído no bundle).
Não inventei números a partir de um dado que não existia na fonte. Em vez
disso, a escala abaixo reaproveita o padrão tipográfico que **já está em
produção neste projeto**, repetido de forma idêntica em pelo menos 8
arquivos diferentes (fonte 5): `font-heading text-{tamanho} font-{peso}
[tracking-tight]`. Título formaliza esse padrão informal num componente
único, decrescente de h1 (maior) a h6 (menor):

| Nome | Valor da prop `size` | Classes aplicadas |
|---|---|---|
| H1 | `h1` | `text-4xl font-bold tracking-tight` |
| H2 | `h2` | `text-3xl font-bold tracking-tight` |
| H3 | `h3` | `text-2xl font-semibold tracking-tight` (mesma classe já usada como "título de página" em `src/app/page.tsx`, `hero.tsx`, `patterns/[slug]/page.tsx` etc.) |
| H4 | `h4` | `text-xl font-semibold tracking-tight` |
| H5 | `h5` | `text-lg font-semibold` (mesma classe já usada como "título de seção" em `patterns/[slug]/page.tsx`, `components/[slug]/page.tsx`) |
| H6 | `h6` | `text-base font-semibold` |

`size` é **independente** de `as`: por padrão `size` acompanha `as` (se
`size` não for informado, usa o mesmo nível de `as` — ver Props), mas pode
divergir explicitamente. Caso de uso legítimo documentado no README do
Nimbus e reforçado na tarefa: um `<h3>` semântico (correto na árvore do
documento) estilizado visualmente como H1 porque aquela seção precisa de
mais destaque na tela.

Todos os níveis usam `font-heading` (token semântico de fonte já existente
no projeto — muda por preset de estilo) e `text-balance` (utilitário já
usado em títulos de outros componentes do catálogo — `Empty`, `Item`,
`Field` — para evitar quebra de linha desequilibrada em títulos curtos).

---

## Tamanhos

Não existe uma prop `size` estilo Badge/Avatar (pequeno/médio/grande)
separada de heading — a prop `size` **é** a escala de heading (h1-h6), ver
Variantes acima. Não há uma segunda escala independente disso.

---

## Estados

Nenhum. Title é puramente apresentacional/textual — não tem estado de
interação (não é focável, não tem hover/disabled). Mesmo tratamento que
`Skeleton` e `Separator` já têm hoje (`states: []`).

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h2"` | Elemento HTML real renderizado — controla a hierarquia **semântica** do documento (importante para leitor de tela e SEO). **Decisão diverge do Nimbus** (fonte 2, default real lá é `"h1"`) — a tarefa pediu explicitamente default `h2`, documentado aqui como decisão intencional do Rafael/tarefa, não erro. |
| `size` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | segue `as` quando omitido | Escala **visual** aplicada (ver Variantes) — independente de `as`. |
| `children` | `React.ReactNode` | — (obrigatório) | Texto do título. Mesmo nome do Nimbus (fonte 2). |
| `...props` | `React.ComponentProps<"h1">` (menos `size`, que é sobrescrita pela variante) | — | Demais atributos nativos do elemento raiz (id, onClick, aria-*, etc.). |

---

## Acessibilidade mínima exigida

- **Nome acessível**: garantido de graça — `children` é o próprio
  conteúdo textual do elemento heading nativo (`<h1>`–`<h6>`), sempre
  anunciado como heading por leitores de tela, com nível correto conforme
  `as`.
- **Hierarquia de documento**: por ser polimórfico via `as` (elemento
  HTML real, não `role="heading"` simulado em `<div>`/`<span>`), o Title
  nunca quebra a árvore de headings do documento — diferente do problema
  que `CardTitle` teve até 2026-07-23 (comentário em `card.tsx`, fonte 4:
  CardTitle era sempre `<div>`, WCAG 1.3.1/2.4.6, corrigido depois com
  `asChild`). Title evita esse gap desde o início ao expor `as` como prop
  de primeira classe, obrigando quem usa a escolher a tag certa (default
  `h2`, nunca renderiza `<div>`).
- **Contraste**: usa `text-foreground` (token semântico já validado pelo
  agente `acessibilidade-ds` do projeto para os presets existentes) — sem
  cor fixa fora de token.
- Nenhum ícone envolvido.

---

## Código de exemplo

```tsx
import { Title } from "@/components/ui/title"

// Título de página (semântico = visual, ambos h1)
<Title as="h1">Painel do corretor</Title>

// Título de seção dentro da página (default as="h2")
<Title>Apólices ativas</Title>

// Hierarquia semântica e visual divergindo de propósito: h3 correto na
// árvore do documento, mas com destaque visual de H1
<Title as="h3" size="h1">
  Destaque desta seção
</Title>
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado. O README do
Nimbus consultado não publica orientação de faça/não faça por componente,
mesma situação já registrada no `chip.md`.)

---

## Decisões não-técnicas tomadas sem fonte 100% clara

| Decisão | Alternativa considerada | Como reverter |
|---|---|---|
| `as` default `"h2"` (task pediu explicitamente; Nimbus real usa `"h1"`) | Seguir o default do Nimbus (`h1`) | Trocar `as = "h2"` por `as = "h1"` na assinatura de `Title` em `title.tsx` |
| Escala de `size` (h1=text-4xl…h6=text-base) baseada no padrão já em produção no projeto, não em valores reais do Nimbus (não encontrados no bundle) | Tentar decodificar `@nimbus-ds/styles` (pacote externo) para achar os valores reais em px/rem | Ajustar os valores dentro de `titleVariants` em `title.tsx` — é a única fonte da escala, nada duplicado em outro arquivo |
| `size` default = acompanha `as` quando omitido (em vez de ter um default fixo próprio tipo sempre `"h2"`) | Default fixo de `size` independente de `as` | Trocar `const resolvedSize = size ?? as` por `const resolvedSize = size ?? "h2"` (ou o valor fixo desejado) em `title.tsx` |
| `text-balance` aplicado em todos os níveis | Não aplicar, ou aplicar só nos níveis maiores (h1-h3) | Remover `text-balance` da string base do `cva` em `title.tsx` |
| Não replicadas as props `fontWeight`/`lineHeight`/`textAlign`/`color` livres do Nimbus (que permitem qualquer combinação solta) | Expor essas props soltas também | Adicionar props extras em `Title` e novas variantes no `cva`, se Rafael quiser paridade maior com a API solta do Nimbus |

## Confirmações

- Zero cor hardcoded fora de token: `title.tsx` só usa `font-heading`
  (token de família), `text-foreground` (token semântico de cor) e classes
  de tamanho/peso do Tailwind (`text-*`, `font-*`) — nenhum hex, nenhum
  `rgb()`/`hsl()` literal.
- Ícones: nenhum usado (Title é puramente textual).
- Nome acessível: garantido nativamente — `children` é o conteúdo do
  próprio elemento heading real (`<h1>`–`<h6>`), sempre anunciado
  corretamente por leitores de tela.
