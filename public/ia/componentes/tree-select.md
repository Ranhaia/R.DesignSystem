---
slug: tree-select
nome: TreeSelect
camada: molecule
codigo: src/components/ui/tree-select.tsx
story: src/components/ui/tree-select.stories.tsx
status: piloto
sinonimos: [lista-em-arvore, árvore, arvore, tree]
vizinhos: [select, multi-select, combobox, list]
referencias: [passi:lista-em-arvore]
---

# TreeSelect

Campo de seleção em árvore que permite escolher itens estruturados em hierarquia dentro de um painel flutuante.
Suporta seleção única, múltipla independente ou em cascata com caixas de marcação.

## Quando usar

- Estruturas hierárquicas onde as opções possuem relação pai e filho, como categorias, departamentos ou ramos de seguro.
- Seleção com marcação em cascata (`checkable`), onde marcar uma categoria pai marca automaticamente todas as suas subcategorias.
- Filtro de opções multinível que necessita de busca integrada e contador de itens selecionados.

## Quando NÃO usar

- Lista plana e simples de opções com seleção única → `select`.
- Lista plana com seleção de múltiplos valores sem hierarquia → `multi-select`.
- Lista de opções planas muito longa com busca e digitação direta no campo → `combobox`.

## Anatomia

| Parte | O que é |
|---|---|
| `TreeSelect` | Componente principal que engloba o campo gatilho e o painel flutuante com a árvore de nós |
| `TreeSelectSkeleton` | Placeholder de carregamento que simula as dimensões e o formato do campo |
| Gatilho | Botão com papel combobox que exibe o placeholder, o valor único ou as tags dos itens marcados |
| Painel | Área flutuante PopoverContent contendo a busca, a árvore de opções e o rodapé de ações |

## Composição

Usa: [`checkbox`](checkbox.md) · [`icon`](icon.md) · [`skeleton`](skeleton.md) · [`popover`](popover.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `treeData` | `TreeSelectNode[]` | — | Estrutura hierárquica de nós com label, value e children |
| `value` | `string | null` · `string[]` | — | Valor ou lista de valores selecionados |
| `onValueChange` | `(value: any) => void` | — | Função disparada ao alterar a seleção |
| `checkable` | `boolean` | `false` | Habilita caixas de marcação com cascata entre pais e filhos |
| `multiple` | `boolean` | `false` | Permite selecionar múltiplos nós de forma independente |
| `showCheckedStrategy` | `child` · `parent` · `all` | `child` | Define se exibe no campo apenas as folhas, os pais ou ambos |
| `defaultExpandAll` | `boolean` | `false` | Inicia o componente com todos os ramos expandidos |
| `showSearch` | `boolean` | `true` | Exibe campo de busca rápida no topo do painel |
| `allowClear` | `boolean` | `false` | Exibe botão para limpar toda a seleção atual |
| `maxTagCount` | `number` | — | Limite máximo de tags visíveis antes de agrupar em contador |

## Variantes

Não tem variantes no código; o comportamento de seleção é definido pelas props booleanas `checkable` (cascata com caixas de marcação), `multiple` (múltipla independente) ou padrão (seleção única).

## Tamanhos

Tamanho único com altura de 36 px (`h-9`) no gatilho e painel com largura mínima de 300 px (`min-w-75`).

## Estados

| Estado | Como aparece |
|---|---|
| Vazio | Gatilho exibe o texto de placeholder com text-muted-foreground |
| Selecionado | Gatilho exibe o rótulo do item ou chips compactos com botão de remoção |
| Aberto | Painel flutuante exibe a árvore de nós com foco virtual via aria-activedescendant |
| Indeterminado | Caixa de marcação exibe traço horizontal quando o nó pai possui apenas parte dos filhos selecionados |
| Nó desabilitado | Opacidade reduzida em 50% e nó bloqueado para seleção ou cascata |
| Desabilitado | Campo inteiro inativo com opacity-50 e sem abertura do painel |

## Conteúdo

- Rótulos dos nós curtos e objetivos que caibam em uma linha: "Patrimonial", "Residencial".
- Mantenha hierarquia visual clara limitada a no máximo 3 níveis de profundidade.
- Use placeholders explicativos no campo e na busca: "Selecione o ramo...", "Buscar opções...".

## Acessibilidade

- **Teclado:** Tab foca o gatilho; Espaço ou Enter abre o painel. Dentro da árvore, setas Cima e Baixo navegam entre os nós visíveis. Seta Direita expande o nó pai e Seta Esquerda recolhe. Espaço marca/desmarca o item. Escape fecha o painel e devolve o foco ao gatilho.
- **Leitor de tela:** Gatilho possui `role="combobox"` com `aria-expanded` e `aria-haspopup="tree"`. A lista possui `role="tree"` e os nós possuem `role="treeitem"`, `aria-level` indicando profundidade e `aria-selected` ou `aria-checked` para status.
- **Foco:** O foco visual permanece no contêiner da árvore e se move virtualmente entre nós usando `aria-activedescendant`. Ao fechar, o foco retorna ao gatilho.
- **Cuidados:** Passe sempre `aria-label` quando não houver label visível associado ao campo (WCAG 4.1.2). Mantenha contraste adequado nos ícones de expansão e nas caixas de marcação indeterminadas.

## Tokens usados

- **Cor:** `bg-accent` `bg-input` `bg-muted` `border-border`
  `border-input` `border-ring` `text-accent-foreground`
  `text-foreground` `text-muted-foreground` `text-primary`
- **Tipografia:** `font-medium` `text-sm` `text-xs`
- **Espaço:** `gap-0.5` `gap-1` `gap-1.5` `gap-2` `h-5.5` `h-9`
  `max-h-72` `max-w-115` `max-w-32.5` `min-h-9` `min-w-0` `min-w-75`
  `p-0` `p-1` `pl-1.5` `pr-0.5` `pr-2` `px-1.5` `px-2.5` `px-3` `py-1`
  `py-1.5` `py-2` `py-4` `size-4` `size-5` `w-64`
- **Raio:** `rounded-md` `rounded-sm`
- **Sombra:** `shadow-md` `shadow-xs`
- **Movimento:** `duration-motion-base` `duration-motion-fast`
- **Foco:** `outline-ring` `ring-ring`

## Faça

- Limite a profundidade da árvore a no máximo 3 níveis para evitar sobrecarga cognitiva.
- Use `checkable` quando marcar uma categoria pai deva abranger todos os seus itens filhos.
- Ative `showSearch` para auxiliar a localização rápida em árvores com muitas opções.

## NÃO faça

- Usar árvore para listas de opções simples e sem nenhuma hierarquia → `select` ou `list`.
- Empregar para seleção múltipla plana sem relação entre categorias → `multi-select`.
- Forçar navegação em árvore dentro de formulários densos sem fornecer busca → ative `showSearch`.

## Exemplo mínimo

```tsx
import * as React from "react"
import { TreeSelect } from "@/components/ui/tree-select"

const categorias = [
  {
    value: "seguros",
    label: "Seguros",
    children: [
      { value: "auto", label: "Automóvel" },
      { value: "vida", label: "Vida" },
    ],
  },
]

export function ExemploTreeSelect() {
  const [selecao, setSelecao] = React.useState<string[]>(["auto"])

  return (
    <TreeSelect
      checkable
      treeData={categorias}
      value={selecao}
      onValueChange={setSelecao}
      aria-label="Ramos de seguro"
    />
  )
}
```
