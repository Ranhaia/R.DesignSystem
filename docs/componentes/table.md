---
slug: table
nome: Table
camada: molecule
codigo: src/components/ui/table.tsx
story: src/components/ui/table.stories.tsx
status: piloto
sinonimos: [tabela, tabela-de-dados, data-table, grid-de-dados]
vizinhos: [list, item, card]
referencias: [passi:tabela-de-dados, shadcn:table]
---

# Table

Organiza informações em linhas e colunas para visualização, comparação e consulta estruturada.
Conta com contêiner responsivo com rolagem horizontal automática.

## Quando usar

- Listas densas de dados estruturados para comparação entre atributos: faturas, apólices ou transações.
- Exibição de registros tabulares com necessidade de cabeçalho descritivo e rodapé de totais.
- Conjunto de dados homogêneos que se beneficiam de ordenação por coluna e paginação.

## Quando NÃO usar

- Layout de página ou organização visual de blocos sem relação tabular → `box`.
- Lista simples de itens sem comparação direta entre colunas → `list` ou `item`.
- Visualização de itens ricos em telas pequenas de celular → `card`.

## Anatomia

| Parte | O que é |
|---|---|
| `Table` | Contêiner raiz com overflow horizontal que envolve o elemento table |
| `TableHeader` | Seção thead com borda inferior para os títulos das colunas |
| `TableBody` | Seção tbody que agrupa as linhas de dados |
| `TableFooter` | Seção tfoot com fundo bg-muted/50 para totais ou somatórios |
| `TableRow` | Linha tr com transição de cor no hover e estado selecionado |
| `TableHead` | Célula de cabeçalho th com altura de 40 px e alinhamento à esquerda |
| `TableCell` | Célula de dados td com espaçamento interno e suporte a checkbox |
| `TableCaption` | Legenda descritiva caption posicionada abaixo da tabela |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `children` (Table) | `React.ReactNode` | — | Conteúdo estruturado da tabela com cabeçalho, corpo e rodapé |
| `className` (Table) | `string` | — | Classes CSS adicionais aplicadas ao elemento table interno |
| `colSpan` · `rowSpan` (Cell, Head) | `number` | — | Mescla horizontal ou vertical de células nativas |

## Variantes

Não tem variantes no código; variações visuais de destaque ou seleção são controladas por `TableRow` via `data-state="selected"`.

## Tamanhos

Tamanho padrão com altura de cabeçalho de 40 px (`h-10`) e texto em `text-sm`.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Linhas com borda inferior sutil e fundo transparente |
| Hover | Linha ganha fundo `hover:bg-muted/50` |
| Selecionada | Linha com `data-[state=selected]:bg-muted` |
| Expandida | Linha com `has-aria-expanded:bg-muted/50` |

## Conteúdo

- Cabeçalhos de coluna curtos e claros com substantivos no singular: "Fatura", "Valor", "Status".
- Alinhe textos à esquerda e valores numéricos ou monetários à direita.
- Use `TableCaption` para descrever resumidamente o conjunto de dados exibido.

## Acessibilidade

- **Teclado:** Células não recebem foco por padrão. Controles interativos dentro das células (como botões, links e checkboxes) seguem a ordem natural do Tab. O contêiner permite navegação horizontal por setas quando há estouro de largura.
- **Leitor de tela:** Utiliza tags HTML semânticas nativas (`table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`). Leitores de tela associam automaticamente cabeçalhos `th` às células `td`. `TableCaption` fornece o resumo auditivo inicial.
- **Foco:** O foco recai exclusivamente sobre elementos interativos internos. Células que possuem checkbox ajustam espaçamento automaticamente para manter alvo adequado.
- **Cuidados:** Utilize cabeçalhos `TableHead` em todas as colunas para garantir leitura contextual (WCAG 1.3.1). Nunca monte tabelas sem cabeçalho semântico ou use tabelas apenas para fins de diagramação visual.

## Tokens usados

- **Cor:** `bg-muted` `text-foreground` `text-muted-foreground`
- **Tipografia:** `font-medium` `text-sm`
- **Espaço:** `h-10` `mt-4` `p-2` `pr-0` `px-2`

## Faça

- Alinhe textos à esquerda e números ou valores à direita.
- Use `TableCaption` para fornecer contexto claro sobre os dados.
- Mantenha os títulos das colunas concisos e descritivos.

## NÃO faça

- Usar tabela para construir grades e layouts gerais de página → `box`.
- Exibir listas de texto simples com apenas uma coluna em formato tabular → `list` ou `item`.
- Forçar muitas colunas comprimidas em telas móveis estreitas → `card`.

## Exemplo mínimo

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Fatura</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV-001</TableCell>
      <TableCell>Pago</TableCell>
      <TableCell className="text-right">R$ 250,00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
