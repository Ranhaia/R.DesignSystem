---
slug: tree
nome: Tree
camada: molecule
codigo: src/components/ui/tree.tsx
story: src/components/ui/tree.stories.tsx
status: piloto
sinonimos: [arvore, árvore, treeview, tree-view, hierarquia, arvore-de-itens, pastas, estrutura-em-arvore]
vizinhos: [tree-select, accordion, navigation-menu]
referencias: [passi:lista-em-arvore, spec:tree]
---

# Tree

Lista de itens em níveis, em que cada pasta abre e fecha. Mostra uma hierarquia sempre à vista e deixa escolher ou marcar itens nela.

## Quando usar

- Conteúdo em níveis que a pessoa percorre sem abrir painel, como ramos de seguro, pastas ou partes e capítulos.
- Escolher ou marcar itens dentro de uma hierarquia, com a caixa de marcação (`checkState`).
- Árvore de apoio a outra peça, como o painel do `tree-select`.

## Quando NÃO usar

- Escolher um valor numa hierarquia dentro de um campo de formulário → `tree-select`
- Lista plana, sem níveis → `select`
- Navegar entre páginas do app → `navigation-menu`

## Anatomia

| Parte | O que é |
|---|---|
| `Tree` | A lista inteira: `ul` com papel `tree`, que recebe o foco e controla o item ativo |
| Item | Uma linha `li` com papel `treeitem`, recuada pelo nível |
| Seta | Botão que abre e fecha a pasta; só aparece em item com filhos |
| Caixa de marcação | Aparece em cada item quando há `checkState`; mostra marcado, vazio ou indeterminado |

## Composição

Usa: [`checkbox`](checkbox.md) · [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `aria-label` (ul) | `string` | — | Nome acessível da árvore. Obrigatório quando não há título visível |
| `data` | `TreeNode[]` | — | Os itens: `label`, `value` único, `children` e `disabled` |
| `expanded` | `Set<string>` | — | Valores abertos, quando quem usa controla a abertura |
| `defaultExpanded` | `Iterable<string>` | — | Valores abertos no primeiro desenho |
| `onExpandedChange` | `(abertos: Set<string>) => void` | — | Chamada ao abrir ou fechar uma pasta, com o novo conjunto |
| `filter` | `Set<string>` · `null` | `null` | Mostra só estes valores, com tudo aberto. Serve para resultado de busca |
| `activeValue` | `string` · `null` | — | Item com o foco virtual, quando quem usa controla |
| `onActiveValueChange` | `(valor: string) => void` | — | Chamada quando o item ativo muda, por seta ou mouse |
| `onSelect` | `(valor: string) => void` | — | Chamada no clique, Enter ou Espaço num item que não está desabilitado |
| `isSelected` | `(valor: string) => boolean` | — | Diz se o item está escolhido; ele ganha o check e o destaque |
| `checkState` | `(valor: string) => CheckState` | — | Liga a caixa de marcação em cada item: `true`, `false` ou `"indeterminate"` |
| `multiselectable` | `boolean` | — | Avisa o leitor de tela que mais de um item pode ficar escolhido |

## Variantes

Não tem variante: a escolha simples e a marcação saem das props isSelected e checkState.

## Tamanhos

Não tem tamanho: a linha segue o texto, e o recuo é de 4,5 unidades por nível.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Texto em `text-sm`, sem fundo |
| Hover e ativo | `bg-accent` com `text-accent-foreground`; o ativo ganha contorno de foco por dentro |
| Escolhido | Texto em `font-medium` e check em `text-primary`; com marcação, a caixa mostra o estado |
| Desabilitado | `opacity-50` e sem clique |
| Aberto | A seta gira 90° |

## Conteúdo

- Nome curto, que caiba em uma linha: `Pessoas`, `Auto`. O texto é cortado com reticências, não quebra.
- Substantivo, sem ponto final.
- Ordene do mais usado ao menos usado, e não passe de três níveis.

## Acessibilidade

- **Teclado:** `Tab` entra na árvore; `↓` e `↑` movem; `→` abre a pasta ou desce ao primeiro filho; `←` fecha ou sobe ao pai; `Home` e `End` vão ao primeiro e ao último; `Enter` e `Espaço` escolhem.
- **Leitor de tela:** `tree` e `treeitem`, com `aria-level`, `aria-expanded` nas pastas e `aria-selected` ou `aria-checked` (`mixed` no indeterminado). A seta tem nome: "Expandir" ou "Recolher".
- **Foco:** fica no `ul`, e o item ativo vai em `aria-activedescendant`. Só a árvore recebe `Tab`; dentro dela as setas movem.
- **Cuidados:** o recuo não é a única pista de nível, pois o leitor anuncia `aria-level`. Passe `multiselectable` com `checkState`. A cor sozinha não indica o escolhido (WCAG 1.4.1): há check ou caixa.

## Tokens usados

- **Cor:** `bg-accent` `bg-muted` `text-accent-foreground`
  `text-muted-foreground` `text-primary`
- **Tipografia:** `font-medium` `text-sm` `text-xs`
- **Espaço:** `gap-1.5` `min-w-0` `pr-2` `py-1` `size-5`
- **Raio:** `rounded-sm`
- **Movimento:** `duration-motion-fast`
- **Foco:** `outline-ring`

## Faça

- Dê nome acessível à árvore com `aria-label`.
- Abra o caminho até o item escolhido com `defaultExpanded`.
- Mostre só os resultados de uma busca com `filter`.

## NÃO faça

- Usar árvore para lista sem níveis → `select`
- Passar de três níveis → reagrupe os itens ou divida em duas telas
- Esquecer `multiselectable` ao usar `checkState` → passe as duas props juntas

## Exemplo mínimo

```tsx
import { Tree, type TreeNode } from "@/components/ui/tree"

const ramos: TreeNode[] = [
  {
    value: "pessoas",
    label: "Pessoas",
    children: [
      { value: "vida", label: "Vida" },
      { value: "saude", label: "Saúde" },
    ],
  },
  { value: "pet", label: "Pet" },
]

<Tree
  aria-label="Ramos de seguro"
  data={ramos}
  defaultExpanded={["pessoas"]}
  isSelected={(valor) => valor === "vida"}
  onSelect={(valor) => abrir(valor)}
/>
```
