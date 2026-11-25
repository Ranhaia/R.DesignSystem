# Spec — Data Table

Status: construído em 2026-11-25. Camada: organism (importa `table`, `input`,
`checkbox`, `dropdown-menu`, `button`, `icon`).

## Objetivo

A `table` para trabalhar com os dados, não só ler. Quem só mostra linhas usa
`table`; quem precisa procurar, filtrar, ordenar, escolher colunas, agir em
lote ou levar os dados para uma planilha usa `data-table`.

## Comportamento

- **Busca**: um campo procura em todas as colunas, sem diferenciar maiúscula
  nem acento.
- **Filtros**: coluna com `filtravel` ganha um menu com os valores distintos;
  marcar vários soma (OU dentro da coluna, E entre colunas).
- **Ordenação**: coluna com `ordenavel` vira botão no cabeçalho; o clique
  alterna crescente, decrescente e sem ordem. O cabeçalho anuncia `aria-sort`.
  Número ordena como número; texto ordena pelo idioma, com número natural.
- **Colunas visíveis**: menu Colunas; `oculta` faz a coluna começar escondida.
  A última coluna visível não pode sair.
- **Seleção em lote** (`selecionavel`): checkbox por linha e no cabeçalho
  (marca ou desmarca o que a vista mostra; fica indeterminado no meio).
  A seleção guarda a identidade de `idDaLinha`, então sobrevive a busca e
  ordem. `acoesEmLote` recebe as linhas marcadas.
- **Exportar CSV**: exporta as colunas visíveis das linhas selecionadas ou,
  sem seleção, das linhas da vista. Valor cru (não o `celula`), UTF-8 com
  BOM, e texto que a planilha leria como fórmula (`=`, `+`, `-`, `@`) recebe
  apóstrofo na frente.

## Textos

Do dicionário central (`dataTable.*` e `comum.*`). Títulos das colunas e
ações em lote são texto de produto: vêm por prop.
