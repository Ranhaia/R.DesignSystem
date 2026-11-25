# Spec — Tree

Status: construído em 2026-11-25. Camada: molecule (importa `checkbox`, que é átomo, e `icon`).

## Objetivo

Árvore de itens aninhados no padrão WAI-ARIA TreeView. Nasceu dentro do
`tree-select`, que agora a usa no painel; solta, serve para navegar ou
escolher em uma hierarquia que fica sempre à vista.

## Comportamento

- `role="tree"` com itens `treeitem`, `aria-level` e `aria-expanded`. O foco real fica no `<ul>`; o item ativo vai em `aria-activedescendant`.
- Teclado: setas movem, `→` abre ou desce ao primeiro filho, `←` fecha ou sobe ao pai, `Home`/`End`, `Enter` e `Espaço` escolhem.
- Item `disabled` não recebe escolha.
- Estado aberto, item ativo e `filter` (só esses valores, tudo aberto) podem ser controlados de fora.
- `isSelected` marca a escolha simples (`aria-selected` e o check). Com `checkState`, cada item ganha caixa de marcação (`aria-checked`, `mixed` no indeterminado) e `multiselectable` deve ser passado.

## Textos

Do dicionário central: `tree.expandir` e `tree.recolher` (nome acessível do botão da seta).