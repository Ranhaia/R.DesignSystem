# Spec — SegmentedControl (Molecule)

Status: implementado nesta sessão — código em `src/components/ui/segmented-control.tsx`,
demo em `src/components/examples/segmented-control-demo.tsx`, Storybook em
`src/components/ui/segmented-control.stories.tsx`.
Parente mais próximo (definido no prompt desta tarefa, Fase 6.1 do
`PLANO-LOOP-80-20-TEMPLATES.md`): **ToggleGroup**
(`src/components/ui/toggle-group.tsx`).

---

## Fonte(s) consultada(s)

1. **`@nimbus-ds/segmented-control` — README publicado**
   `https://unpkg.com/@nimbus-ds/segmented-control/README.md`
   → descrição, modos controlado/não-controlado (`selectedSegments` +
   `onSegmentsSelect`), `fullWidth`, `SegmentedControl.Button.Skeleton`.
2. **`@nimbus-ds/segmented-control` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/segmented-control/dist/index.d.ts`
   → `SegmentedControlButtonProperties` (`id` obrigatório, `label?`,
   `fullWidth?`), `SegmentedControlBaseProps` (`children`, `fullWidth?`),
   `ControlledSegmentedControlProperties` (`selectedSegments: string[]`,
   `onSegmentsSelect?`), `SegmentedControlContextValue`
   (`registerButton`/`unregisterButton`/`toggleSegment`/`isSelected`/`fullWidth`).
3. **`@nimbus-ds/segmented-control` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/segmented-control/dist/index.js`
   → confirma `role="group"` no container, `aria-label="Segmented control"`
   default, `role="button"` + `aria-pressed` em cada botão,
   `data-testid="segmented-control-container"`, e uma validação em tempo
   de execução que emite `console.error` se um
   `SegmentedControlButton` renderizar um elemento que não seja `<a>` ou
   `<button>`.
4. **Precedente interno real usado como base de implementação** (não é
   fonte externa, é o "parente" indicado no prompt desta tarefa):
   `src/components/ui/toggle-group.tsx` — mesma primitiva Radix
   (`ToggleGroup` de `radix-ui`), mesmo padrão de contexto pra propagar
   `size` aos itens.
5. **Fonte de comportamento real da primitiva usada** (não documentação,
   código-fonte instalado): `node_modules/@radix-ui/react-toggle-group/dist/index.d.ts`
   e `.../dist/index.mjs`, `node_modules/@radix-ui/react-toggle/dist/index.mjs`
   → confirmam que `ToggleGroup` com `type="single"` renderiza
   `role="radiogroup"` na raiz e `role="radio"` + `aria-checked` (em vez de
   `aria-pressed`) em cada item — usado pra documentar Acessibilidade
   abaixo com precisão, em vez de copiar a descrição de papéis ARIA do
   Nimbus (que usa `role="group"`/`aria-pressed`, API diferente da que
   este componente de fato usa).
6. `src/components/ui/tabs.tsx` — fonte do padrão visual "pill" (container
   `bg-muted` + `p-[3px]` + item ativo com `bg-background` + `shadow-sm`)
   reaproveitado aqui pra dar ao SegmentedControl o "estilo visual mais
   definido" pedido no prompt, em vez do `bg-accent` chapado do
   ToggleGroup padrão.
7. `src/lib/component-docs.ts` (entradas `chip`, `toggle-group`) e
   `src/lib/composition-registry.ts` — formato exato de saída exigido.

**Não encontrado / não assumido:** o Nimbus real não documenta uma escala
de `size` (sm/default/lg) para SegmentedControl — essa escala foi herdada
do ToggleGroup (parente indicado no prompt), não do Nimbus. Ver seção
Variantes/Tamanhos abaixo.

---

## Descrição

*(fonte 1 acima, traduzido/adaptado)*

SegmentedControl exibe um grupo de opções mutuamente excludentes num
formato de "abas em pílula" — visualmente parecido com ToggleGroup, mas
sempre seleção única (nunca múltipla) e com um item ativo destacado por
fundo e sombra dentro de um contêiner com fundo próprio.

## Quando utilizar

*(síntese das fontes 1–3, mais o objetivo do prompt desta tarefa)*

- Use para alternar entre um pequeno número de visões/modos mutuamente
  excludentes do mesmo conteúdo (ex.: "Dia / Semana / Mês", "Lista /
  Grade"), quando o destaque visual do item ativo precisa ser mais
  evidente do que o ToggleGroup padrão oferece.
- **Não confundir com componentes vizinhos**: use **ToggleGroup** quando
  precisar de seleção múltipla ou de um visual de botões com borda
  (`variant="outline"`) em vez de pílula; use **Tabs** quando as opções
  também controlam a troca de um painel de conteúdo abaixo (Tabs já
  acopla `TabsContent`); SegmentedControl não tem painel de conteúdo
  associado — é só o seletor.

---

## Anatomia

| Parte | Descrição |
|---|---|
| `SegmentedControl` | Root — `ToggleGroupPrimitive.Root` da Radix com `type="single"` fixado (não é uma prop exposta). Define `size` compartilhado via contexto (mesmo mecanismo do ToggleGroup) e o fundo `bg-muted` + `p-[3px]` do "trilho" da pílula. |
| `SegmentedControlItem` | Cada opção — `ToggleGroupPrimitive.Item`. Herda `size` do grupo se não especificar o próprio. Fica com `data-state="on"` (fundo `bg-background` + sombra) quando selecionado. |

---

## Composição

Dois exports nomeados, mesmo padrão do `ToggleGroup`/`ToggleGroupItem`:

```ts
"segmented-control": ["SegmentedControl", "SegmentedControlItem"],
```

Diferente do Nimbus (que usa padrão compound `SegmentedControl.Button` e
`SegmentedControl.Button.Skeleton`), este projeto usa dois componentes
nomeados separados — mesma decisão já tomada para `ToggleGroup`/
`ToggleGroupItem` neste catálogo. Não foi criado `SegmentedControl.Skeleton`
(o Nimbus tem um, mas nenhum componente de seleção já existente neste
catálogo — `ToggleGroup`, `RadioGroup` — tem skeleton próprio; manter
consistência em vez de inventar um caso isolado).

---

## Variantes

Nenhuma variante de cor/estilo (`variant`) — diferente do ToggleGroup, que
tem `default`/`outline`. **Decisão deliberada**: o objetivo deste
componente, definido no prompt da tarefa, é ter "estilo visual de
pill/segmented mais definido" — um único visual opinativo (pílula), não
uma escolha entre estilos. Se um visual alternativo for necessário no
futuro, é decisão de Rafael adicionar depois.

## Tamanhos

Herdados da escala já usada no `Toggle`/`ToggleGroup` deste catálogo (não
do Nimbus, que não documenta tamanhos para este componente):

| Nome | Valor da prop | Descrição |
|---|---|---|
| sm | `sm` | Item com `h-7`, texto `text-xs`. |
| default | `default` | Item com `h-8`. |
| lg | `lg` | Item com `h-9`. |

---

## Estados

| Estado | Descrição |
|---|---|
| Off | Item não selecionado — texto `text-muted-foreground`, sem fundo. |
| On (selecionado) | `data-state="on"` — fundo `bg-background`, texto `text-foreground`, `shadow-sm`. Sempre exatamente um item selecionado por grupo (seleção única). |
| Hover | Item não selecionado ganha `hover:text-foreground`. |
| Focus | `focus-visible:ring` + `z-10` (evita que o anel de foco seja cortado pelo item vizinho — mesmo mecanismo do ToggleGroup). |
| Disabled | `disabled:opacity-50 disabled:pointer-events-none`, herdado por item (prop `disabled` do `SegmentedControlItem`) ou pelo grupo inteiro (prop `disabled` do `SegmentedControl`, repassada pela Radix a todos os itens). |

---

## Props

### `SegmentedControl` (root)

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `value` / `defaultValue` | `string` | — | Valor selecionado (controlado / não-controlado). Sempre `string` — nunca array, porque `type` é fixado em `"single"`. |
| `onValueChange` | `(value: string) => void` | — | Callback disparado na troca de seleção. |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Aplicado a todos os itens via contexto, salvo item que sobrescreva o próprio `size`. |
| `disabled` | `boolean` | `false` | Desativa o grupo inteiro (repassado pela Radix a cada item). |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direção de navegação por teclado (herdado da Radix). |
| `...props` | `Omit<ToggleGroupPrimitive.ToggleGroupSingleProps, "type">` | — | Demais props nativas do `ToggleGroup.Root` da Radix, exceto `type` (fixado internamente, não é exposto). |

### `SegmentedControlItem`

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `value` | `string` | — (obrigatório) | Identifica a opção — precisa ser único dentro do grupo. |
| `size` | `"sm" \| "default" \| "lg"` | herdado do grupo | Sobrescreve o `size` do grupo só para este item, se necessário. |
| `disabled` | `boolean` | `false` | Desativa só este item. |
| `...props` | `React.ComponentProps<typeof ToggleGroupPrimitive.Item>` | — | Demais props nativas do `ToggleGroup.Item` da Radix. |

---

## Acessibilidade mínima exigida

- **Papéis ARIA corretos de graça, sem código extra**: como `type` é
  sempre `"single"`, a Radix renderiza automaticamente `role="radiogroup"`
  na raiz e `role="radio"` + `aria-checked` (não `aria-pressed`) em cada
  item — confirmado lendo o código-fonte instalado da Radix (fonte 5
  acima). Essa é a semântica correta pra um grupo de opções mutuamente
  excludentes, mais precisa que o `role="group"` + `aria-pressed` que o
  próprio Nimbus usa.
- **Navegação por teclado**: herdada do `RovingFocusGroup` da Radix — Tab
  entra no grupo pelo item focável (o selecionado, ou o primeiro), setas
  (`ArrowLeft`/`ArrowRight` em orientação horizontal,
  `ArrowUp`/`ArrowDown` em vertical) movem o foco e selecionam entre os
  itens, `Home`/`End` vão pro primeiro/último. Nenhum handler de teclado
  customizado foi escrito — mesma garantia que o `ToggleGroup` já dá
  neste catálogo.
- **Nome acessível do grupo**: `SegmentedControl` não define um
  `aria-label` default (diferente do Nimbus, que usa
  `"Segmented control"` fixo) — quem consumir o componente deve passar
  `aria-label` (ou `aria-labelledby`) próprio via `...props`, descrevendo
  o que o grupo controla (ex.: `aria-label="Período"`). Mesma
  responsabilidade que já recai sobre quem usa `ToggleGroup` hoje neste
  projeto — não é um comportamento novo.
- **Foco visível**: `focus-visible:ring-[3px] focus-visible:ring-ring/50`
  com `z-10` pra não ser cortado pelos itens vizinhos.
- **Nunca seleção vazia por engano**: como cada item vira `role="radio"`,
  o comportamento nativo de radiogroup da Radix é o mesmo de um
  `<input type="radio">` — uma vez que algo está selecionado, clicar
  de novo no item já selecionado não desmarca (diferente do
  `ToggleGroupItem` usado fora de um radiogroup). Comportamento herdado
  da Radix, não replicado manualmente.

---

## Código de exemplo

```tsx
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

<SegmentedControl aria-label="Período" defaultValue="semana">
  <SegmentedControlItem value="dia">Dia</SegmentedControlItem>
  <SegmentedControlItem value="semana">Semana</SegmentedControlItem>
  <SegmentedControlItem value="mes">Mês</SegmentedControlItem>
</SegmentedControl>

// Tamanho pequeno
<SegmentedControl size="sm" defaultValue="semana">
  <SegmentedControlItem value="dia">Dia</SegmentedControlItem>
  <SegmentedControlItem value="semana">Semana</SegmentedControlItem>
  <SegmentedControlItem value="mes">Mês</SegmentedControlItem>
</SegmentedControl>
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado.)
