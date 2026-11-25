# Spec — Back To Top

Status: construído em 2026-11-25. Camada: organism (importa `icon-button`, `icon`).

## Objetivo

Botão flutuante no canto inferior direito que aparece depois de a pessoa rolar
a página (`threshold`, padrão 400 px de rolagem) e leva ao começo.

## Comportamento

- Escondido com `visibility` (fica fora da ordem do Tab), não desmontado.
- Rolagem suave só quando não há `prefers-reduced-motion: reduce`; com ela, o
  salto é direto. O aparecer/sumir usa `motion-safe:transition-[opacity,visibility]`.
- Ao clicar, o foco vai para o `main` (ou o documento), já que o botão some
  no topo.
- Rolagem da janela (`window`). Área rolável interna fica para depois.

## Textos

Do dicionário central (`backToTop.rotulo`); `label` sobrescreve.
