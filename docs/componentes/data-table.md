---
slug: data-table
nome: Data Table
camada: organism
codigo: src/components/ui/data-table.tsx
story: src/components/ui/data-table.stories.tsx
status: piloto
sinonimos: [tabela-de-dados, grid-de-dados, datagrid, data-grid, tabela-com-filtro, exportar-csv]
vizinhos: [table, list, pagination]
referencias: [passi:padroes/tabela-de-dados, spec:data-table]
---

# Data Table

Tabela montada sobre a `table` para trabalhar com os dados: procurar, filtrar, ordenar, escolher as colunas, agir sobre várias linhas de uma vez e levar tudo para uma planilha em CSV.

## Quando usar

- Muitos itens que a pessoa precisa comparar, achar ou ordenar (faturas, pedidos, usuários).
- A mesma ação vale para vários itens de uma vez (`selecionavel` + `acoesEmLote`).
- A pessoa precisa levar os dados para uma planilha.

## Quando NÃO usar

- Poucas linhas só para ler, sem busca nem ação → `table`
- No celular, ou itens com pouco para comparar → `list` ou cards
- Milhares de linhas vindas do servidor → busque e pagine no servidor e use `table` com `pagination`

## Anatomia

| Parte | O que é |
|---|---|
| `DataTable` | Raiz `<div data-slot="data-table">`; o `className` vai nela. |
| Barra | `<div data-slot="data-table-toolbar">` com a busca (`input`), um filtro por coluna `filtravel` (`dropdown-menu`), a contagem e as ações em lote, o menu Colunas e Exportar CSV. |
| Tabela | A `table`, com cabeçalho ordenável (`button` + `aria-sort`) e, com `selecionavel`, a coluna de `checkbox`. |
| Vazio | Uma linha que ocupa todas as colunas com o texto de `vazio`. |

## Composição

Usa: [`button`](button.md) · [`checkbox`](checkbox.md) · [`dropdown-menu`](dropdown-menu.md) · [`icon`](icon.md) · [`input`](input.md) · [`table`](table.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `dados` | `T[]` | — | As linhas. Qualquer objeto. |
| `colunas` | `ColunaDados<T>[]` | — | Uma por coluna: `chave`, `titulo` e, se precisar, `ordenavel`, `filtravel`, `numerica`, `oculta` e `celula` (o que desenhar na célula). |
| `idDaLinha` | `(linha: T, indice: number) => string` | `(_l, i) => String(i)` | Identidade da linha. Passe um id real para a seleção sobreviver a dados que mudam. |
| `selecionavel` | `boolean` | `false` | Liga a coluna de checkbox e a seleção em lote. |
| `ordemInicial` | `Ordem<T>` | `null` | Coluna e direção (`asc`/`desc`) com que a tabela abre. |
| `nomeArquivo` | `string` | `dados.csv` | Nome do arquivo do Exportar CSV. |
| `acoesEmLote` | `(selecionadas: T[]) => React.ReactNode` | — | Botões que aparecem na barra quando há linhas marcadas; recebe as linhas. |
| `className` | `string` | — | Classes extras na raiz. |
| `aria-label` | `string` | — | Nome da tabela para o leitor de tela. Obrigatório. |
| `vazio` | `React.ReactNode` | — | O que dizer sem linhas: o motivo e o primeiro passo. Padrão: "Nenhum resultado encontrado." |

## Variantes

Sem variante: o que muda a tabela são as props das colunas (`ordenavel`, `filtravel`, `numerica`, `oculta`) e `selecionavel`.

## Tamanhos

Sem tamanho: a densidade é a da `table`.

## Estados

| Estado | Como aparece |
|---|---|
| Ordenada | Seta para cima ou para baixo no cabeçalho da coluna; as outras ordenáveis mostram a seta dupla apagada |
| Filtrada | O botão do filtro mostra quantos valores estão marcados, ex.: "Status (2)" |
| Com seleção | Linha marcada com o fundo de selecionada; a barra mostra "N selecionadas" e as ações em lote |
| Seleção parcial | Checkbox do cabeçalho indeterminado |
| Vazia | Uma linha com o texto de `vazio` |

## Conteúdo

- A primeira coluna é o nome do item: ela também nomeia o checkbox da linha ("Selecionar Ana Souza").
- Títulos de coluna e ações em lote são texto de produto e vêm por prop; busca, filtros, Colunas e Exportar vêm do dicionário (pt-BR ou en).
- Status com `badge` na `celula`, nunca só a cor do texto.

## Acessibilidade

- **Teclado:** Tab passa pela busca, filtros, Colunas, Exportar, cabeçalhos ordenáveis e checkboxes. Enter ou Espaço ordena, marca e abre os menus; nos menus, setas navegam e Espaço marca sem fechar.
- **Leitor de tela:** A tabela tem nome (`aria-label`); a coluna ordenada anuncia `aria-sort`; cada checkbox diz qual linha marca; a contagem de selecionadas é anunciada ao mudar (`aria-live`).
- **Foco:** Anel de foco de cada peça (`input`, `button`, `checkbox`).
- **Cuidados:** Até 7 colunas visíveis; deixe as outras com `oculta`. O CSV usa o valor cru e neutraliza texto que a planilha leria como fórmula.

## Tokens usados

- **Cor:** `text-muted-foreground`
- **Tipografia:** `text-sm`
- **Espaço:** `gap-2` `gap-3` `h-24` `max-w-xs` `ml-3` `mr-3` `w-0`

## Faça

- Passe `idDaLinha` com um id real.
- Marque números com `numerica`, para alinharem à direita.
- Diga em `vazio` por que está vazio e qual o primeiro passo.

## NÃO faça

- Mais de 7 colunas visíveis → esconda as menos usadas com `oculta`
- Ação importante só no menu → coloque o botão em `acoesEmLote`
- Tabela no celular → `list` ou cards

## Exemplo mínimo

```tsx
import { DataTable } from "@/components/ui/data-table"

const pedidos = [{ id: "1", cliente: "Ana", valor: 30 }]

export function ExemploPedidos() {
  return (
    <DataTable
      aria-label="Pedidos"
      dados={pedidos}
      idDaLinha={(p) => p.id}
      selecionavel
      colunas={[
        { chave: "cliente", titulo: "Cliente", ordenavel: true },
        { chave: "valor", titulo: "Valor", ordenavel: true, numerica: true },
      ]}
    />
  )
}
```
