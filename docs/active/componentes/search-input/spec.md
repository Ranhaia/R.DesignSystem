# Spec — Search Input

Status: construído em 2026-11-25. Camada: organism (importa `input-group`, que já é molécula, além de `icon` e `kbd`).

## Objetivo

Campo de busca pronto, montado sobre o `input-group`: lupa no início e, no
fim, o botão de limpar (só quando há texto) ou a tecla do atalho.

## Comportamento

- `Esc` com texto limpa o campo. Limpar pelo botão devolve o foco ao campo.
- `shortcut` (uma tecla, ex.: `"/"`): apertada fora de outro campo e sem
  Ctrl, ⌘ ou Alt, leva o foco à busca. A tecla aparece com `kbd` enquanto o
  campo está vazio e é anunciada por `aria-keyshortcuts`.
- `onValueChange(texto)` recebe cada mudança, inclusive ao limpar. Em modo
  controlado (`value`), é por ele que o limpar chega ao dono do estado.
- A raiz é `<search>` (landmark). Correção automática, maiúscula automática e
  verificação ortográfica ficam desligadas, como em todo campo de busca.
- O "x" nativo do `type="search"` some: o limpar do componente o substitui.

## Textos

Do dicionário central (`searchInput.*`): nome acessível padrão "Buscar" e
"Limpar busca".
