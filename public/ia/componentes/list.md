---
slug: list
nome: List
camada: atom
codigo: src/components/ui/list.tsx
story: src/components/ui/list.stories.tsx
status: piloto
sinonimos: [lista]
vizinhos: [item, table, tree-select]
referencias: [passi:item-de-lista, shadcn:list, spec:list]
---

# List

Organiza informações textuais ou blocos de conteúdo verticalmente em lista. Suporta formato ordenado ou não ordenado, com ou sem marcadores visuais.

## Quando usar

- Apresentar sequências textuais de itens relacionados, como requisitos, recursos ou regras.
- Estruturar instruções passo a passo numeradas onde a ordem de execução importa (as="ol").
- Agrupar verticalmente componentes como Item em uma lista sem marcadores visuais (variant="none").

## Quando NÃO usar

- Linhas complexas com avatar, metadados e múltiplos botões de ação → `item`
- Dados tabulares bidimensionais com colunas, ordenação e paginação → `table`
- Estruturas de pastas ou dados hierárquicos com múltiplos níveis recolhíveis → `tree-select`

## Anatomia

| Parte | O que é |
|---|---|
| `List` | Container raiz renderizado como ul ou ol que define o espaçamento vertical entre itens |
| `ListItem` | Elemento li individual para texto corrido ou composição com outros componentes |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `none` · `marker` | `none` | Controla a visibilidade dos marcadores nativos (bullet ou números) |
| `as` | `ListElement` | `ul` | Elemento HTML semântico da lista (ul para não ordenada ou ol para ordenada) |

## Variantes

| Valor | Quando usar |
|---|---|
| `none` | Lista limpa sem marcador visual, ideal para layout ou composição com itens customizados |
| `marker` | Exibe marcadores nativos: marcadores circulares no ul ou numeração sequencial no ol |

## Tamanhos

Tamanho único baseado na tipografia de 14 px (`text-sm`) e espaçamento vertical compacto de 4 px (`gap-1`).

## Estados

Só leitura: a lista em si não recebe foco nem possui estados interativos nativos.

## Conteúdo

- Mantenha padrão gramatical uniforme entre os itens (todos começando por verbo ou substantivo).
- Frases completas levam ponto final; termos curtos ou palavras isoladas dispensam pontuação.
- Em listas ordenadas com ol, certifique-se de que a sequência numérica representa ordem cronológica ou prioridade.

## Acessibilidade

- **Teclado:** Não recebe foco direto; elementos interativos contidos nos itens recebem Tab normalmente.
- **Leitor de tela:** Usa tags semânticas ul, ol e li; anuncia o número total de itens e a posição relativa de cada um.
- **Foco:** Nenhum no container da lista; o foco flui sequencialmente pelos elementos focáveis internos.
- **Cuidados:** Use semântica nativa ol quando a ordem for essencial para compreensão; nunca use caracteres visuais manuais no lugar de marcadores de lista.

## Tokens usados

- **Cor:** `text-foreground` `text-muted-foreground`
- **Tipografia:** `leading-normal` `text-sm`
- **Espaço:** `gap-1`

## Faça

- Use as="ol" com variant="marker" quando a ordem for cronológica ou sequencial.
- Agrupe linhas compostas por Item utilizando variant="none" para manter a semântica de lista.
- Mantenha paralelismo gramatical e extensão semelhante entre os itens da mesma lista.

## NÃO faça

- Usar List para exibir dados tabulares comparativos em múltiplas colunas → `table`
- Montar árvores com múltiplos níveis e expansão hierárquica → `tree-select`
- Montar linhas de lista densas com avatar e botões acoplados em texto livre → `item`

## Exemplo mínimo

```tsx
import { List, ListItem } from "@/components/ui/list"

<List variant="marker">
  <ListItem>Documento de identidade com foto</ListItem>
  <ListItem>Comprovante de residência atualizado</ListItem>
</List>

<List as="ol" variant="marker">
  <ListItem>Preencha o formulário inicial.</ListItem>
  <ListItem>Envie os documentos solicitados.</ListItem>
</List>
```
