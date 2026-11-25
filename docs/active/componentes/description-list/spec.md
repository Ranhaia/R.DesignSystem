# Spec — Description List

Status: construído em 2026-11-25. Camada: atom (reusa só o estilo do `text`).

## Objetivo

Pares rótulo/valor de uma ficha de detalhes (perfil, pedido, contrato), na
marcação semântica `<dl>`, `<dt>` e `<dd>`, para o leitor de tela anunciar a
relação entre rótulo e valor.

## Partes

- `DescriptionList` (`dl`): o conjunto. `layout="stacked"` (padrão) empilha
  rótulo sobre valor; `layout="inline"` põe rótulo e valor lado a lado numa
  grade, com a coluna de rótulos alinhada.
- `DescriptionItem` (`div`): agrupa um par, o agrupador válido dentro de `dl`.
- `DescriptionTerm` (`dt`): o rótulo, `text` base apagado.
- `DescriptionDetails` (`dd`): o valor, `text` base médio.

Um termo pode ter mais de um valor (vários `DescriptionDetails` no item).
