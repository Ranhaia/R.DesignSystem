# Spec — Timeline

Status: construído em 2026-11-25. Camada: molecule (importa `list`).

## Objetivo

Eventos em ordem, como o histórico de atividade de um pedido ou chamado. É o
`list` como `<ol>` (a ordem importa), com marcador e linha ligando os eventos.

## Partes

- `Timeline` (`ol`, com `role="list"` porque o Safari tira a semântica de
  lista quando o `ol` tem `display: flex`).
- `TimelineItem` (`li`): coluna do marcador + conteúdo; a linha até o próximo
  evento é o `::before` do item. O último não tem linha.
- `TimelineMarker`: ponto, ou o ícone passado como filho. `tone` `default`,
  `primary` ou `destructive`. Decorativo (`aria-hidden`): o estado precisa
  estar também no título.
- `TimelineContent`, `TimelineTitle` (texto, não cabeçalho), `TimelineTime`
  (`<time>` com `dateTime`), `TimelineDescription`.

## Reaproveitamento

Avaliado `item`: ele é uma linha de lista com mídia e ações, sem a coluna do
marcador nem a linha de ligação; montar sobre ele traria partes que a linha do
tempo não usa. Ficou o `list`/`ListItem`, que dá a semântica da lista ordenada.
