# Spec — Announcement Banner

Status: construído em 2026-11-25. Camada: organism (importa `alert`, `icon-button`, `icon`).

## Objetivo

Faixa no topo do app com um recado para todas as pessoas (manutenção, novidade,
mudança de política), que cada uma pode fechar. Não é um alerta novo: é o
`alert` em largura total, sem cantos nem bordas laterais, com o fechar do
`icon-button`.

## Comportamento

- `role="region"` com nome ("Anúncio"): o recado está na página desde a carga e
  não interrompe o leitor de tela, ao contrário do `role="alert"` do `alert`.
- `dismissible` (padrão `true`) mostra o fechar; ao fechar a faixa sai e
  `onDismiss` avisa o produto, que decide se lembra disso entre visitas.
- `variant` repassa o do `alert` (`default`, `destructive`).

## Textos

Do dicionário central (`announcement.*`); `label` e `closeLabel` sobrescrevem.
