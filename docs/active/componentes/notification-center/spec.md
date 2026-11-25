# Spec — Notification Center

Status: construído em 2026-11-25. Camada: organism (importa `badge`, `button`, `icon`, `icon-button`, `popover`).

## Objetivo

Sino no cabeçalho do app com o número de não lidas; no clique abre um
`popover` com a lista de notificações, lidas e não lidas. Os dados e o estado
de lida são do produto: o componente mostra e avisa (`onSelect`,
`onMarkAllRead`).

## Partes

- `NotificationCenter`: `icon-button` (sino) + `badge` com o número (9+ acima
  de 9) + `popover` com a lista.
- `NotificationList`: a lista sozinha, para uma página de notificações.

## Acessibilidade

- O nome do sino traz o número ("Notificações, 2 não lidas"); o `badge` é
  `aria-hidden` para não repetir.
- Não lida: ponto `bg-primary`, título em `font-medium` e prefixo só para o
  leitor ("Não lida:"), nunca só a cor.

## Textos

Do dicionário central (`notifications.*`).
