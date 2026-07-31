# Spec — Box (Atom)

Status: especificação + implementação criadas nesta sessão em
`src/components/ui/box.tsx`, `src/components/examples/box-demo.tsx`,
`src/components/ui/box.stories.tsx`. **Registros compartilhados
(`atomic-registry.ts`, `components-registry.ts`, `composition-registry.ts`,
`examples-mapping.ts`, `examples/registry.tsx`, `component-docs.ts`) não
foram editados aqui** — as linhas exatas ficam no relatório final da
tarefa, para outro processo colar.

Parente mais próximo (definido em `PLANO-LOOP-80-20-TEMPLATES.md`,
Fase 6.1, e confirmado no código): `Separator`/`AspectRatio` — primitivo
de layout puro, sem estado, sem variantes.

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/box` — README publicado**
   `https://unpkg.com/@nimbus-ds/box/README.md`
   → Descrição: "allows us to group and space elements or other
   components" — container flexível com controle visual (cor de fundo,
   borda: espessura/raio/estilo/cor, responsivo por breakpoint) e de
   posicionamento (padding interno, margin externo). Renderizável como
   qualquer elemento HTML ou componente React via prop `as`
   (polimorfismo). Shorthand de propriedades: `m`/`p` (margin/padding),
   `r`/`l`/`t`/`b` (right/left/top/bottom), `x`/`y` (eixos) — ex.: `ml`
   (marginLeft), `pb` (paddingBottom), `py` (paddingY). Doc completa
   linkada em nimbus.nuvemshop.com.br/documentation/atomic-components/box.
2. **`@nimbus-ds/box` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/box/dist/index.d.ts`
   → Confirma a API real: `Box` é um `PolymorphicForwardRefComponent`
   (aceita `"div"` como elemento default + `BoxBaseProps`).
   `BoxBaseProps` = `BoxProperties` (que estende `BoxSprinkle`) +
   atributos HTML nativos. `BoxSprinkle` expõe **100+ props de
   style-system**: dimensões (`width`, `height`, `maxWidth`, `minWidth`,
   `maxHeight`, `minHeight`), posicionamento (`top`/`right`/`bottom`/
   `left`, `position`), flexbox completo (`flex`, `flexGrow`,
   `flexShrink`, `flexWrap`, `flexDirection`, `justifyContent`,
   `alignItems`, `alignSelf`), grid completo (`gridTemplateColumns`,
   `gridTemplateRows`, `gridArea`, `gridTemplateAreas`, `gap`),
   espaçamento com todos os shorthands (`p`/`pl`/`pr`/`pt`/`pb`/`px`/
   `py`, `m`/`ml`/`mr`/`mt`/`mb`/`mx`/`my`), cor (`backgroundColor`,
   `color`, `borderColor`, `background`), borda (`borderRadius`,
   `borderWidth`, `borderStyle`), efeitos (`boxShadow`,
   `transitionDuration`, `zIndex`), tipografia (`fontSize`, `fontWeight`,
   `lineHeight`, `textAlign`, `textDecoration`), outros (`overflow`,
   `cursor`, `pointerEvents`, `display`, `scrollbarWidth`). Todas as
   props aceitam valor direto **ou** um objeto de condições responsivas
   (`Conditions<T>`: breakpoints `xs`/`md`/`lg`/`xl`/`xxl`) e, via
   `BoxConditions<T>`, também estados de interação (`focus`/`hover`/
   `active`/`disabled`) — ou seja, cada prop de estilo pode variar por
   breakpoint E por estado de interação simultaneamente.

**Não encontrado / não tentado:** não foi necessário buscar o bundle JS
compilado (`dist/index.js`) — README + typedef já foram suficientes e
consistentes entre si para confirmar o escopo real da API (nenhuma
ambiguidade a resolver via implementação compilada, diferente do caso do
Chip).

---

## Descrição

*(localizado do README oficial do `@nimbus-ds/box`, fonte 1 acima)*

Box é um utilitário de layout que permite agrupar e espaçar elementos ou
outros componentes — um container flexível com controle visual e de
posicionamento.

## Quando utilizar

*(localizado do README oficial, fonte 1 acima)*

- Construir containers.
- Agrupar componentes.
- Customizar fundo e bordas.
- Posicionar componentes (espaçamento interno/externo).

---

## Decisão de escopo importante (a mais relevante desta spec)

A API real do `@nimbus-ds/box` é, na prática, um **style-system
completo** (padrão Chakra UI/Styled System): 100+ props de estilo, cada
uma aceitando valor direto ou variação por 5 breakpoints × 4 estados de
interação. Isso é ordens de grandeza maior que qualquer outro átomo já
implementado neste catálogo (nenhum componente existente aqui, nem
Button, tem prop de estilo com sistema de breakpoint responsivo
embutido na prop).

Este catálogo **não tem, e não é escopo desta tarefa construir**, um
style-system próprio — só Tailwind + cva (ver `README.md`, seção
"Sistema de tokens"). Reimplementar as 100+ props do Nimbus 1:1 como
props React seria:

1. Inventar uma segunda linguagem de estilo paralela ao Tailwind, sem
   necessidade real — todo o espaço de estilos que essas props cobrem
   (padding, margin, display, flex, grid, cor, borda, sombra,
   responsivo) já é 100% alcançável hoje via `className` com utilitários
   Tailwind (inclusive classes arbitrárias e variantes responsivas
   `md:`/`lg:` nativas do próprio Tailwind).
2. Contradizer a regra fixa do projeto "nunca cor fixa fora de token" —
   props como `backgroundColor`/`color`/`borderColor` do Nimbus aceitam
   string livre; um Box com essas props precisaria de validação/whitelist
   de tokens para não virar porta de entrada de cor hardcoded.

**Decisão tomada:** implementar só o subconjunto que faz sentido em cima
de Tailwind puro — exatamente como instruído no briefing desta tarefa:
`asChild` (polimorfismo — equivalente funcional ao `as` do Nimbus,
usando o mecanismo `Slot.Root` já convencionado neste catálogo em
Chip/Badge/Button, em vez de uma segunda prop `as` de string de tag, que
não tem precedente em nenhum componente já existente aqui) e
`className` livre (herdado de `React.ComponentProps<"div">`, já cobre os
100+ casos de uso do Nimbus via classes Tailwind).

**Ficou de fora, deliberadamente**, todo o restante das ~100 props de
estilo do Nimbus (padding/margin com shorthands, display, flex, grid,
cor, borda, sombra, z-index, tipografia, overflow, cursor,
responsividade por breakpoint, variação por estado de interação). Nada
disso foi "esquecido" — é a decisão de escopo documentada aqui.

**Como reverter/ampliar:** se um padrão de uso repetido emergir (ex.:
todo Box do catálogo sempre usa as mesmas 3-4 combinações de
padding/display), a resposta recomendada é compor um componente
específico em cima de `Box` (ou usar `cva` local nesse componente novo),
não inflar este primitivo com props de estilo soltas. Ampliar `box.tsx`
depois é aditivo (novas props opcionais não quebram o uso atual via
`className`).

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | Um `<div>` (ou o filho, via `asChild`) com `data-slot="box"`. Nenhuma classe de estilo própria — 100% do visual vem de `className`. |

---

## Composição

Export único: **`Box`** (mesmo padrão de `Separator`, `AspectRatio` —
primitivos sem subcomponentes).

Entrada esperada em `composition-registry.ts`:
```ts
"box": ["Box"],
```

---

## Variantes

Não aplicável — Box não tem variante/size real na raiz. É primitivo de
layout puro, sem estado visual próprio (mesmo tratamento de
`Separator`/`AspectRatio`, que também não têm `variants`/`sizes` em
`component-docs.ts`).

---

## Tamanhos

Nenhum — ver seção Variantes acima.

---

## Estados

| Estado | Descrição |
|---|---|
| Default | Único estado — Box não tem interatividade nem estado próprio (não é clicável, não recebe foco). Qualquer estado visual (hover, disabled, etc.) é responsabilidade do conteúdo/`className` passado pelo chamador, não do Box em si. |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Renderiza as props no elemento filho (via Radix `Slot.Root`) em vez de `<div>` — mecanismo de polimorfismo já convencionado neste catálogo (Chip/Badge/Button), equivalente funcional à prop `as` do Nimbus. |
| `className` | `string` | — | Classes Tailwind livres — é o mecanismo real de estilização do Box (padding, margin, display, flex, grid, cor via token, borda, etc.), em vez de props nomeadas de estilo. Ver "Decisão de escopo importante" acima. |
| `...props` | `React.ComponentProps<"div">` | — | Demais atributos nativos do elemento raiz (inclui `children`). |

---

## Acessibilidade mínima exigida

- Box não tem semântica própria nem nome acessível — é um container
  genérico (`<div>` por padrão), igual a `Separator`/`AspectRatio`
  quando decorativos. Não aplicável "nome acessível" no sentido de
  label/aria — a responsabilidade de semântica correta (ex.: usar
  `asChild` com `<section aria-label="...">`, `<nav>`, `<main>`, etc.
  quando o conteúdo precisar de landmark) é de quem usa o Box, não do
  componente em si.
- Nenhum ícone, nenhuma cor hardcoded no componente — 100% do visual
  vem de `className` fornecido por quem consome, então a
  responsabilidade de usar tokens (não cor fixa) também é de quem usa,
  igual a qualquer `className` livre já aceito em todos os outros
  componentes do catálogo.

---

## Código de exemplo

```tsx
import { Box } from "@/components/ui/box"

// Box como container simples — padding/borda/cor via className
<Box className="rounded-md border bg-muted p-4 text-sm text-foreground">
  Conteúdo do container.
</Box>

// Box como layout flex
<Box className="flex items-center justify-between gap-2 rounded-md border p-4">
  <span>Rótulo</span>
  <span className="text-muted-foreground">Valor</span>
</Box>

// Box polimórfico via asChild — renderiza como <section>
<Box asChild className="rounded-md border border-dashed p-4">
  <section aria-label="Exemplo">Conteúdo</section>
</Box>
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado.)
