---
slug: combobox
nome: Combobox
camada: organism
codigo: src/components/ui/combobox.tsx
story: src/components/ui/combobox.stories.tsx
status: piloto
sinonimos: [campo-com-sugestoes, autocomplete, autocompletar, typeahead]
vizinhos: [select, multi-select, command]
referencias: [passi:campo-com-sugestoes, shadcn:combobox]
---

# Combobox

Combina um campo de entrada de texto com menu suspenso de sugestões filtradas sob demanda, suportando seleção única ou múltipla por chips.

## Quando usar

- Seleção em listas longas com mais de 15 opções que necessitam de filtro por digitação (países, cidades, cargos).
- Seleção múltipla de itens exibidos como etiquetas removíveis com campo de busca integrado.

## Quando NÃO usar

- Poucas opções fixas de 2 a 4 alternativas visíveis diretamente na tela → `radio-group`.
- Listas curtas de 5 a 15 opções que não necessitam de busca por digitação → `select`.
- Busca global ou paleta rápida de comandos e atalhos de teclado da aplicação → `command`.

## Anatomia

| Parte | O que é |
|---|---|
| `ComboboxValue` | Exibe o valor textual da opção selecionada |
| `ComboboxTrigger` | Botão com ícone de seta para abrir e fechar a lista flutuante |
| `ComboboxClear` | Botão interno para limpar o valor selecionado |
| `ComboboxInput` | Campo de busca baseado em `InputGroup` com gatilho e botão de limpar embutidos |
| `ComboboxContent` | Painel flutuante em portal com posicionamento e animação de entrada |
| `ComboboxList` | Container com rolagem vertical para as opções |
| `ComboboxItem` | Item individual selecionável com indicador de marcação |
| `ComboboxGroup` | Agrupador visual de itens relacionados |
| `ComboboxLabel` | Rótulo descritivo do grupo de opções |
| `ComboboxCollection` | Provedor de dados para coleções dinâmicas de itens |
| `ComboboxEmpty` | Mensagem apresentada quando a busca não retorna resultados |
| `ComboboxSeparator` | Linha divisória horizontal entre grupos |
| `ComboboxChips` | Container flexível para modo de seleção múltipla com chips |
| `ComboboxChip` | Etiqueta individual de seleção com botão de remoção |
| `ComboboxChipsInput` | Campo de entrada de texto dentro do container de chips |

## Composição

Usa: [`button`](button.md) · [`icon`](icon.md) · [`input-group`](input-group.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `items` (Combobox) | `T[]` | — | Lista de itens e valores disponíveis para seleção |
| `value` · `onValueChange` (Combobox) | `T` · `T[]` | — | Valor selecionado no modo controlado |
| `multiple` (Combobox) | `boolean` | `false` | Habilita seleção múltipla em conjunto com `ComboboxChips` |
| `showTrigger` (ComboboxInput) | `boolean` | `true` | Exibe o botão com ícone de seta na extremidade direita do campo |
| `showClear` (ComboboxInput) | `boolean` | `false` | Exibe o botão de limpar quando há valor preenchido |
| `disabled` (ComboboxInput) | `boolean` | `false` | Desativa o campo de entrada e os botões anexados |
| `side` (ComboboxContent) | `top` · `right` · `bottom` · `left` | `bottom` | Lado preferencial de abertura do painel flutuante |
| `sideOffset` (ComboboxContent) | `number` | `6` | Distância em pixels entre o campo e o painel flutuante |
| `align` (ComboboxContent) | `start` · `center` · `end` | `start` | Alinhamento do painel em relação ao campo |
| `alignOffset` (ComboboxContent) | `number` | `0` | Deslocamento em pixels no alinhamento |
| `showRemove` (ComboboxChip) | `boolean` | `true` | Exibe o botão com ícone de fechar para remover o chip |

## Variantes

Nenhuma no componente raiz. O modo de seleção é alternado entre único ou múltiplo através da prop `multiple`.

## Tamanhos

Sem medidas fixas. O campo e o painel acompanham a largura do container ou da âncora (`w-(--anchor-width)`), com altura mínima de 36 px (`min-h-9`).

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Campo de entrada com borda `border-input` e ícone de seta |
| Foco / Aberto | Anel de foco `ring-[3px] ring-ring` e painel flutuante `bg-popover` visível com sombra `shadow-md` |
| Item em destaque | Fundo `bg-accent` e texto `text-accent-foreground` navegável por setas |
| Selecionado | Ícone de marcação (check) visível à direita do item |
| Vazio | Mensagem do `ComboboxEmpty` centralizada quando a busca não encontra opções |
| Desabilitado | Opacidade reduzida em 50% e eventos de ponteiro desativados |

## Conteúdo

- Rótulo ou placeholder indicando a ação: "Buscar cidade..." ou "Selecione um tema...".
- Mensagem de estado vazio clara orientando a pessoa: "Nenhum resultado encontrado para a busca.".
- Chips no modo múltiplo mostram o nome da opção com botão de remoção rotulado como "Remover".

## Acessibilidade

- **Teclado:** Digitação filtra a lista; ArrowDown e ArrowUp percorrem os itens sugeridos. Enter confirma a seleção; Esc fecha o painel mantendo o foco no campo. No modo múltiplo com campo vazio, Backspace remove o último chip selecionado.
- **Leitor de tela:** O campo possui papel `combobox` com `aria-expanded` e `aria-haspopup="listbox"`. O painel atua como `listbox` e cada sugestão como `option` com `aria-selected`. Anúncios de itens filtrados são comunicados ao leitor.
- **Foco:** O foco permanece no campo de texto (`ComboboxInput` ou `ComboboxChipsInput`) durante a navegação pelas sugestões destacadas via `aria-activedescendant`.
- **Cuidados:** Forneça sempre rótulo acessível associado via `label` ou `aria-label` no campo (WCAG 1.3.1 e 4.1.2). Não oculte o estado vazio sem oferecer feedback textual claro quando nenhum item corresponder ao filtro.

## Tokens usados

- **Cor:** `bg-accent` `bg-border` `bg-input` `bg-muted` `bg-popover`
  `border-destructive` `border-input` `border-ring`
  `text-accent-foreground` `text-foreground` `text-muted-foreground`
  `text-popover-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs`
- **Espaço:** `gap-1` `gap-1.5` `gap-2` `h-8` `h-px` `m-1` `max-h-96`
  `mb-0` `min-h-9` `min-w-16` `ml-1` `mx-1` `my-1` `p-0` `p-1` `pl-2`
  `pr-0` `pr-8` `px-1.5` `px-2` `px-2.5` `px-3` `py-1.5` `py-2`
  `right-2` `size-4` `size-5`
- **Raio:** `rounded-md` `rounded-sm`
- **Sombra:** `shadow-md` `shadow-xs`
- **Foco:** `ring-destructive` `ring-foreground` `ring-ring`

## Faça

- Comece a filtrar as opções a partir do primeiro caractere digitado.
- Ofereça mensagem amigável no `ComboboxEmpty` orientando a conferir a grafia quando nada for encontrado.
- Permita limpar a busca rapidamente usando `showClear` ou tecla Escape.

## NÃO faça

- Listas curtas com menos de 7 opções → `select`.
- Limpar o texto que a pessoa digitou acidentalmente ao fechar o painel → preserve o estado até a escolha.
- Omitir o botão de remoção nos chips em modo múltiplo → use `showRemove={true}`.

## Exemplo mínimo

```tsx
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const cidades = ["Belo Horizonte", "Curitiba", "Porto Alegre", "São Paulo"]

export function ExemploCombobox() {
  return (
    <Combobox items={cidades}>
      <ComboboxInput placeholder="Buscar cidade..." />
      <ComboboxContent>
        <ComboboxEmpty>Nenhuma cidade encontrada.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```
