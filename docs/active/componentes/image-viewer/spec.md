# Spec — Image Viewer

Status: construído em 2026-11-26. Camada: organism (importa `dialog`, `icon-button`).

## Objetivo

Ver uma imagem grande por cima da página, com zoom, arrastar e, quando há
mais de uma, galeria. É o `dialog` em tela cheia: foco preso, Esc fecha, o
foco volta ao gatilho (tudo do `dialog`).

## Partes

- Barra: posição ("2 de 5"), reduzir, ampliar e fechar (`icon-button`).
- Palco: a imagem; com mais de uma, anterior e próxima nas laterais.
- Miniaturas (com mais de uma): botões com `aria-current` na atual.
- Título do dialog = `alt` da imagem atual (só para leitor de tela).

## Zoom e arrastar

- De 1× a 4×, em passos de 0,5: botões, roda do mouse, `+`, `-`, `0`, e duplo
  clique (alterna 1× ↔ 2×).
- Com zoom, arrastar com o ponteiro move a imagem (pointer capture). Trocar de
  imagem volta a 1×.
- Zoom e posição zeram ao trocar de imagem (também quando o `index` muda por
  fora) e ao fechar. Índice fora da lista é limitado às pontas.
- Limites conhecidos: sem pinça de dois dedos (no toque, duplo toque e
  botões), arrasto sem limite de borda, setas do teclado não invertem em RTL.
- Não usa `scroll-axis-lock` (recurso de um navegador só): o arrastar é por
  ponteiro.

## Teclado

Setas esquerda e direita trocam a imagem (dando a volta nas pontas); Tab passa
pela barra, pelas setas e pelas miniaturas; Esc fecha.

## Decisão

Sobre o `dialog` do R.DS (Radix) e não o `<dialog>` nativo: é o componente da
casa, já com foco preso, retorno de foco e animação.

## Textos

`imageViewer.*` e `comum.fechar` no dicionário central.
