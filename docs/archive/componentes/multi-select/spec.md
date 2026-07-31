# Spec — MultiSelect (Atom)

Status: implementado — código real em `src/components/ui/multi-select.tsx`,
`src/components/examples/multi-select-demo.tsx`,
`src/components/ui/multi-select.stories.tsx`.
Parente(s) indicados na tarefa (Fase 6.1): Select (`select.tsx`) e Combobox
(`combobox.tsx`). Parente **real** usado na implementação: Combobox — ver
"Decisão de arquitetura" abaixo.

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/multi-select` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/multi-select/dist/index.d.ts`
   → API real confirmada:
   ```ts
   export interface MultiSelectOption { label: string; value: string }
   export interface MultiSelectProperties {
     name: string
     id: string
     appearance?: "success" | "warning" | "danger" | "neutral"
     options: MultiSelectOption[]
     onChange?: (values: MultiSelectOption[]) => void
     value?: MultiSelectOption[]
     zIndex?: keyof typeof multiSelect.properties.zIndex
   }
   export type MultiSelectBaseProps = MultiSelectProperties &
     Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "value">
   export interface MultiSelectComponents { Skeleton: typeof MultiSelectSkeleton }
   export declare const MultiSelect: React.FC<MultiSelectBaseProps> & MultiSelectComponents
   ```
   Confirma: (a) API monolítica — um único componente `MultiSelect`, não um
   conjunto de subcomponentes de composição livre; (b) `MultiSelectBaseProps`
   estende `InputHTMLAttributes<HTMLInputElement>` — a raiz real do Nimbus é
   baseada em `<input>`, não em `<button>`/`<select>` nativo; (c)
   `MultiSelect.Skeleton` existe como subcomponente estático, mesmo mecanismo
   já usado neste projeto em `Chip.Skeleton`/`Button.Skeleton`.
2. **`@nimbus-ds/multi-select` — README publicado**
   `https://unpkg.com/@nimbus-ds/multi-select/README.md`
   → "Use a multi-select box when a user needs to select more than one
   option from a list." Guia de instalação (yarn/npm) e link pra
   documentação completa no portal Nimbus (não acessível publicamente via
   unpkg — portal requer navegação própria, não seguido nesta sessão).
3. **`@nimbus-ds/multi-select` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/multi-select/dist/index.js`
   → confirma no comportamento real: seleções são renderizadas como
   **chips removíveis com handler de clique próprio** dentro do campo;
   `data-testid`s observados: `option-selected-${value}` (por item
   selecionado), `arrow-element`, `popover-container`, `popover-overlay`;
   abertura/fechamento do painel via callback de visibilidade; texto de
   placeholder exibido quando não há seleção; fecha ao clicar fora. O bundle
   está minificado e importa `@nimbus-ds/chip`/`@nimbus-ds/text` de fora do
   arquivo — não foi possível extrair `aria-label`/`role` exatos do chip
   interno a partir deste bundle isolado (não assumido).
4. **`@nimbus-ds/select` — README publicado**
   `https://unpkg.com/@nimbus-ds/select/README.md`
   → confirma que o Select "irmão" do Nimbus é **single-select apenas**
   ("selecting a single option from a dropdown list") e recomenda Checkbox
   pra múltiplas opções — ou seja, no próprio Nimbus, MultiSelect já é um
   componente **separado** de Select, não uma variante dele. Evidência a
   favor de MultiSelect ser um Atom próprio (como já registrado em
   `atomic-registry.ts`, `inProgressEntries`), não uma prop nova em cima do
   Select existente.
5. **`node_modules/@base-ui/react/docs/react/components/combobox.md`**
   (pacote já instalado neste projeto, fonte primária da implementação) →
   trecho de guidelines de acessibilidade: *"Avoid when not rendering an
   input: Use Select instead of Combobox if no input is being rendered,
   which includes accessibility features specific to a listbox without an
   input."* Avaliado e não se aplica aqui: a composição final **sempre**
   renderiza um `<input>` real (`ComboboxChipsInput`), então Combobox é a
   escolha correta segundo a própria orientação do Base UI — não Select.
6. **`node_modules/@base-ui/react/docs/react/components/select.md`**
   → confirma que `@base-ui/react` Select (diferente do radix-ui/Select já
   usado em `select.tsx` deste catálogo) tem suporte nativo a `multiple`, e
   traz um exemplo de referência oficial de multi-select. Consultado e
   **descartado** como base da implementação depois de cruzar com a fonte 3
   (Nimbus real usa chips removíveis + input, não um botão de Select
   simples com texto "+N mais") — ver "Decisão de arquitetura" abaixo.
7. **Precedente interno já existente neste projeto** (não é fonte externa,
   mas é o "parente mais próximo" real e já revisado por Rafael):
   `src/components/ui/combobox.tsx` —
   - `ComboboxChips`/`ComboboxChip`/`ComboboxChipsInput` (linhas 244–307):
     padrão "chips + input" pronto, incluindo remoção por clique e o
     comportamento de teclado interno do Base UI (navegação entre chips,
     apagar o último com Backspace) amarrado ao contexto do Combobox.
   - `ComboboxContent` com prop `anchor` + `useComboboxAnchor()` (linhas
     100–135 e 309–311): mecanismo já existente especificamente para
     ancorar o painel de opções no container de chips em vez de no input de
     texto — usado tal como está, sem alteração.
   - `data-chips={!!anchor}` em `ComboboxContent` (linha 125): confirma que
     esse caminho já foi desenhado no código existente para o cenário de
     multi-seleção com chips, mesmo sem um componente "MultiSelect" próprio
     até agora.
8. `src/components/ui/chip.tsx` — comparado linha a linha com `ComboboxChip`
   pra decidir qual reaproveitar (ver "Chip vs. ComboboxChip" abaixo).
9. `src/lib/component-docs.ts` (entradas `chip`, `combobox`) e
   `.build/componentes/chip.md` — formato exato de saída exigido.

**Não encontrado / não assumido:** guidelines de texto (do/dont) do
MultiSelect no portal Nimbus (só o README curto do pacote foi acessível via
unpkg, o portal completo não) — por isso `doGuidelines`/`dontGuidelines`
continuam placeholder, mesma regra já aplicada a todos os outros
componentes deste catálogo. Comportamento exato de `aria-label` do chip
interno do Nimbus real também não encontrado (bundle minificado, fonte
externa ao arquivo lido) — não assumido; a implementação aqui usa o
`aria-label`/`removeLabel` já validado em `ComboboxChip`/`Chip` deste
projeto.

---

## Decisão de arquitetura — por que Combobox, não Select

A tarefa apontava dois parentes possíveis (Select e Combobox). Na prática:

- **Select (`select.tsx`, radix-ui) não serve**: radix-ui/Select não tem
  modo `multiple` — reaproveitar exigiria reescrever a primitiva inteira, e
  a fonte 4 acima confirma que o próprio Nimbus trata Select como
  estritamente single-select.
- **`@base-ui/react` Select (fonte 6) foi considerado e descartado**: tem
  `multiple` nativo, mas por padrão renderiza como um botão de Select
  comum ("Selecionar idiomas (+2 mais)"), sem chips removíveis
  individualmente — e colocar um botão de remover (Chip removível) dentro
  do `<button>` do trigger do Select seria HTML inválido (`<button>`
  aninhado em `<button>`), quebrando foco e leitura de tela.
- **Combobox (`combobox.tsx`) é a escolha final**: já resolve exatamente
  esse problema — `ComboboxChips` é uma `<div>` (não um botão), então cada
  `ComboboxChip` pode ter seu próprio botão de remover sem aninhamento
  inválido. A fonte 3 (bundle real do Nimbus) confirma que essa é também a
  arquitetura real do `@nimbus-ds/multi-select` (chips removíveis + campo
  de busca + popover). A ressalva do próprio Base UI (fonte 5, "evite
  Combobox sem input") não se aplica porque a composição final sempre tem
  um `<input>` real (`ComboboxChipsInput`).

## Chip vs. ComboboxChip

Avaliado como pedido na tarefa. **Decisão: manter `ComboboxChip`, não usar
o átomo genérico `Chip`.** Motivo: `ComboboxChip`/`ComboboxChipRemove` são
primitivas do Base UI amarradas ao contexto interno do `ComboboxChips` —
delas vem de graça a navegação por teclado entre chips e o apagar-o-último-
com-Backspace. `Chip` (o átomo em `chip.tsx`) não participa desse contexto;
trocar quebraria esse comportamento silenciosamente, sem erro de tipo pra
avisar. Visualmente as duas já são quase idênticas (mesma altura
`h-[calc(--spacing(5.5))]`, mesmo `bg-muted`/`text-foreground`,
`rounded-sm`/`px-1.5`/`text-xs`/`font-medium`) — a divergência não é visual,
é funcional, então não há ganho real em trocar.

---

## Descrição

*(baseado no README real do `@nimbus-ds/multi-select`, fonte 2 acima,
adaptado ao formato de descrição já usado nas outras entradas deste
catálogo)*

Campo de seleção múltipla: permite escolher mais de uma opção de uma lista,
exibindo cada escolha como um chip removível dentro do próprio campo.

## Quando utilizar

*(síntese das fontes 2 e 3 acima)*

- Use quando o usuário precisa escolher **mais de uma** opção de uma lista
  de opções pré-definidas (fonte 2, README do Nimbus).
- Use quando as seleções feitas precisam ficar visíveis e serem removíveis
  individualmente sem reabrir a lista completa (chips no campo).
- **Não confunda com componentes vizinhos**: use **Select** (`select.tsx`)
  quando só uma opção pode ser escolhida por vez; use **Combobox**
  (`combobox.tsx`) em modo single quando o objetivo é buscar-e-escolher um
  único valor com autocompletar.

---

## Anatomia

| Parte | Descrição |
|---|---|
| `MultiSelect` | Elemento único — não há subcomponentes de composição livre expostos (API monolítica, como o `@nimbus-ds/multi-select` real, fonte 1). Internamente compõe `Combobox` (`multiple`) + `ComboboxChips` + `ComboboxChip` + `ComboboxChipsInput` + `ComboboxContent` + `ComboboxList` + `ComboboxItem` + `ComboboxEmpty`, todos de `combobox.tsx`, sem duplicar lógica. |
| Campo de chips + busca (`ComboboxChips`) | `<div>` com borda, foco em anel — contém um `ComboboxChip` por valor selecionado e o campo de texto de busca. Ancorado (`useComboboxAnchor`) pra o painel de opções abrir relativo a este container, não ao texto digitado. |
| Chip de seleção (`ComboboxChip`) | Um por valor selecionado, com botão de remover próprio (`ComboboxChipRemove`) — clique ou Backspace (com o campo vazio) remove a última seleção. |
| Campo de busca (`ComboboxChipsInput`) | Filtra as opções visíveis por texto (compara contra o `label`, não o `value` — via `itemToStringLabel`). Mostra `placeholder` só quando não há nenhuma seleção. |
| Painel de opções (`ComboboxContent` → `ComboboxList` → `ComboboxItem`) | Lista flutuante (portal) das opções que batem com o filtro atual, cada uma com indicador de check quando selecionada. |
| Estado vazio (`ComboboxEmpty`) | Mensagem exibida quando a busca não encontra nenhuma opção (`emptyText`). |
| `MultiSelect.Skeleton` | Placeholder de carregamento, mesmo formato do campo real — mesmo mecanismo de `Chip.Skeleton`/`Button.Skeleton`. Existe porque o Nimbus real também expõe `MultiSelect.Skeleton` (fonte 1). |

---

## Composição

Export único: **`MultiSelect`** (API monolítica, decisão justificada acima
e sourced na fonte 1 — o Nimbus real também expõe só `MultiSelect` +
`.Skeleton`, sem subcomponentes). Internamente reaproveita 100% das
primitivas já exportadas por `combobox.tsx` — nenhuma lógica de
posicionamento, filtro ou teclado foi duplicada.

Entrada esperada em `composition-registry.ts`:
```ts
"multi-select": ["MultiSelect"],
```

---

## Variantes

Nenhuma. O typedef real do Nimbus tem uma prop `appearance?: "success" |
"warning" | "danger" | "neutral"` (fonte 1) — **decisão: não replicada**.
Esse enum é de validação de formulário (estado de erro/sucesso/aviso), não
uma variante visual de identidade — e o padrão já estabelecido neste
catálogo pra esse tipo de estado é `aria-invalid` (ver `input.tsx`,
`input-group.tsx`), não uma prop `appearance` própria por componente.
Replicar criaria dois padrões divergentes pro mesmo conceito dentro do
mesmo catálogo — decisão provisória, reversível se Rafael preferir alinhar
com o Nimbus aqui.

`zIndex` (fonte 1) também não foi replicado — este catálogo já resolve
empilhamento de painéis flutuantes globalmente via classe (`z-50`, igual a
`combobox.tsx`/`select.tsx`), não expõe isso como prop pública em nenhum
outro componente.

---

## Tamanhos

Nenhum. Mesmo tratamento que `Chip` (`sizes: []`) — o typedef do Nimbus não
expõe prop de tamanho pro campo inteiro.

---

## Estados

| Estado | Descrição |
|---|---|
| Vazio (sem seleção) | Mostra o `placeholder`. |
| Com seleções | Cada valor selecionado aparece como chip; `placeholder` some. |
| Aberto | Painel de opções visível, ancorado no campo de chips. |
| Item em destaque | Navegação por teclado dentro do painel (herdado do Combobox). |
| Busca sem resultado | `ComboboxEmpty` visível com o texto de `emptyText`. |
| Disabled | Campo, chips e busca desativados (prop `disabled`). |
| Removendo um chip | Clique no botão "x" do chip ou Backspace com o campo de busca vazio remove a última seleção — comportamento nativo do `ComboboxChips`, sem código adicional. |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `options` | `{ label: string; value: string }[]` | — (obrigatório) | Lista de opções disponíveis. Mesmo shape de `MultiSelectOption` do Nimbus real (fonte 1). |
| `value` | `string[]` | — (obrigatório, controlado) | Valores selecionados atualmente. |
| `onValueChange` | `(value: string[]) => void` | — (obrigatório) | Callback disparado quando a seleção muda (por clique num item, remoção de chip ou Backspace). |
| `placeholder` | `string` | `"Selecione..."` | Texto exibido no campo de busca quando não há seleção. |
| `emptyText` | `string` | `"Nenhum resultado encontrado."` | Texto exibido quando a busca não encontra nenhuma opção. |
| `disabled` | `boolean` | `false` | Desativa campo, chips e busca. |
| `className` | `string` | — | Aplicada ao container de chips (`ComboboxChips`). |
| `id` / `name` | `string` | — | Repassados à raiz do Combobox (uso em formulários). |
| `aria-label` | `string` | — | Nome acessível do campo de busca. Ver Acessibilidade abaixo — obrigatório sempre que não houver `<label>` visível associado. |

---

## Acessibilidade mínima exigida

- **Nome acessível garantido**: o campo de busca real (`ComboboxChipsInput`,
  o elemento focável/digitável) sempre recebe um `aria-label` — ou o valor
  explícito da prop `aria-label`, ou, na ausência dela, o texto de
  `placeholder` como fallback. Isso segue a mesma regra documentada pelo
  próprio Base UI para Combobox (fonte 5: *"If `<Combobox.Input>` is the
  form control, label it with a native `<label>`... or provide an
  `aria-label` when no visible label is rendered"*). Recomendado: sempre
  passar `aria-label` explícito (ou compor com `Field`/`FieldLabel` já
  existentes no catálogo) em vez de depender só do fallback de
  `placeholder`.
- **Navegação por teclado funcional, herdada do Combobox**: setas para
  navegar entre opções no painel, Enter/Espaço para marcar/desmarcar,
  Escape para fechar, Backspace (campo de busca vazio) ou clique no botão
  "x" pra remover a última seleção — nada disso foi reimplementado, vem
  de graça do `Combobox`/`ComboboxChips`/`ComboboxChip` já testados.
  Cada item do painel (`ComboboxItem`) mostra indicador de check
  (`aria-selected` nativo do Base UI) quando selecionado.
  Cada botão de remover chip (`ComboboxChipRemove`, dentro de
  `ComboboxChip`) já é um `<button>` real, alcançável via Tab.
- **Sem `<button>` aninhado em `<button>`**: motivo central da escolha de
  arquitetura acima — `ComboboxChips` é uma `<div>`, não um botão, então os
  botões de remover chip nunca ficam dentro de outro elemento interativo.
- **Cor**: nenhuma cor fixa fora de token — todas as classes vêm
  literalmente de `combobox.tsx` (`bg-muted`, `text-foreground`,
  `border-input`, `ring-ring/50`, `bg-popover`, `text-popover-foreground`,
  `bg-accent`, `text-destructive`), sem overrides de cor no
  `multi-select.tsx`.

---

## Código de exemplo

```tsx
import * as React from "react"
import { MultiSelect } from "@/components/ui/multi-select"

const ramos = [
  { value: "auto", label: "Auto" },
  { value: "residencial", label: "Residencial" },
  { value: "vida", label: "Vida" },
  { value: "viagem", label: "Viagem" },
  { value: "empresarial", label: "Empresarial" },
  { value: "pet", label: "Pet" },
]

function Exemplo() {
  const [value, setValue] = React.useState<string[]>(["auto", "vida"])

  return (
    <MultiSelect
      options={ramos}
      value={value}
      onValueChange={setValue}
      placeholder="Selecione os ramos..."
      aria-label="Ramos de seguro"
    />
  )
}

// Placeholder de carregamento
<MultiSelect.Skeleton />
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado. O portal
completo de documentação do Nimbus, que poderia ter guidelines de texto
específicas do MultiSelect, não foi acessível via unpkg nesta sessão — ver
"Não encontrado / não assumido" acima.)
