---
slug: sortable-list
nome: Sortable List
camada: atom
codigo: src/components/ui/sortable-list.tsx
story: src/components/ui/sortable-list.stories.tsx
status: piloto
sinonimos: [lista-arrastavel, lista-arrastável, reordenar, arrastar-e-soltar, drag-and-drop, sortable, ordenar-arrastando]
vizinhos: [list, item, data-table]
referencias: [spec:sortable-list]
---

# Sortable List

Lista em que a pessoa muda a ordem dos itens arrastando pela alça, com mouse, toque ou teclado. É a base do `kanban`.

## Quando usar

- A ordem é dado da pessoa: prioridade, sequência de etapas, ordem de exibição.
- Poucos itens (dezenas), todos visíveis.

## Quando NÃO usar

- Ordem por critério (nome, data, valor) → ordenação da `data-table`
- Itens que passam entre grupos → `kanban`
- Lista só de leitura → `list`

## Anatomia

| Parte | O que é |
|---|---|
| `SortableList` | Raiz `<div data-slot="sortable-list">` com a lista `<ul>` (nomeada por `aria-label`) e a região de status. |
| Item | `<li data-slot="sortable-list-item">`, com `data-pego` enquanto pego ou erguido. |
| Alça | `<button data-slot="sortable-list-handle">` com `aria-pressed`; só ela começa o arrasto. |
| Marcador | `data-slot="sortable-list-marker"`: a linha onde o item vai cair. |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `itens` | `T[]` | — | Os itens, na ordem atual. |
| `idDoItem` | `(item: T) => string` | — | Identidade estável de cada item (chave e foco). |
| `rotuloDoItem` | `(item: T) => string` | — | Nome do item na alça e nos anúncios. |
| `onReordenar` | `(itens: T[]) => void` | — | Recebe a nova ordem: ao soltar (ponteiro) ou a cada seta (teclado). |
| `children` | `(item: T) => React.ReactNode` | — | Conteúdo de cada item, ao lado da alça. |
| `orientacao` | `Orientacao` | `vertical` | `vertical` (↑↓) ou `horizontal` (←→). |
| `className` | `string` | — | Classes extras na raiz. |
| `aria-label` | `string` | — | Nome da lista para o leitor de tela. Obrigatório. |

## Variantes

Sem variante: `orientacao` escolhe o eixo (`vertical` ou `horizontal`), e com ele as setas.

## Tamanhos

Sem tamanho: cada item tem o espaço do conteúdo; a alça tem área de toque fixa da escala (`size-8`).

## Estados

| Estado | Como aparece |
|---|---|
| Pego (teclado) | Alça preenchida na cor principal (`aria-pressed`), item com sombra e escala |
| Erguido (ponteiro) | Item segue o ponteiro com sombra; o marcador mostra onde cai |
| Foco | Anel no item inteiro e a dica de teclado ao lado |

## Conteúdo

- `rotuloDoItem` é curto e único: ele nomeia a alça e os anúncios.
- Dicas e anúncios vêm do dicionário (pt-BR ou en).

## Acessibilidade

- **Teclado:** Espaço ou Enter na alça pega o item; setas do eixo movem; Espaço ou Enter solta; Esc volta à origem; sair da alça solta. Sem pegar, as setas não fazem nada.
- **Leitor de tela:** A alça diz "Reordenar <item>" e se está pega. A região de status anuncia pegar, mover, soltar e cancelar com a posição ("na posição 2 de 4").
- **Foco:** Fica na alça depois de cada movimento; o anel aparece no item inteiro.
- **Cuidados:** A ordem visual é a do DOM, então o leitor e o Tab seguem o que se vê. Limites: sem rolagem automática durante o arrasto, sem animação dos vizinhos e sem inverter as setas em direita-para-esquerda; campo ou mídia dentro do item pode perder o estado ao mudar de posição.

## Tokens usados

- **Cor:** `bg-accent` `bg-card` `bg-primary` `text-card-foreground`
  `text-muted-foreground` `text-primary-foreground`
- **Tipografia:** `text-sm` `text-xs`
- **Espaço:** `gap-2` `h-0.5` `inset-x-0` `inset-y-0` `min-w-0` `p-2`
  `size-8` `w-0.5`
- **Raio:** `rounded-full` `rounded-md` `rounded-sm`
- **Sombra:** `shadow-lg`
- **Foco:** `ring-ring`

## Faça

- Dê a cada item um `idDoItem` estável.
- Salve a ordem em `onReordenar`: a lista é controlada.
- Use `horizontal` para etapas lado a lado.

## NÃO faça

- Arrastar pelo item inteiro → a alça deixa o texto selecionável
- Centenas de itens → filtre ou pagine
- Ordem que a pessoa não escolhe → ordene pela coluna

## Exemplo mínimo

```tsx
import * as React from "react"

import { SortableList } from "@/components/ui/sortable-list"

export function ExemploPrioridade() {
  const [itens, setItens] = React.useState(["Alta", "Média", "Baixa"])
  return (
    <SortableList aria-label="Prioridades" itens={itens} idDoItem={(i) => i} rotuloDoItem={(i) => i} onReordenar={setItens}>
      {(i) => i}
    </SortableList>
  )
}
```
