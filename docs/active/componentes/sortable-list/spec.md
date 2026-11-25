# Spec — Sortable List

Status: construído em 2026-11-25. Camada: atom (importa só `icon`).
Sem biblioteca: decisão B, aprovada pelo Rafael em 2026-11-25 e conferida com
o guia `drag-and-drop` da modern-web-guidance.

## Objetivo

Uma lista em que a pessoa muda a ordem: prioridade, sequência de etapas,
ordem de exibição. Base do `kanban`.

## Ponteiro (mouse, toque, caneta)

- Arrasta pela alça (botão com ícone), não pelo item: o texto continua
  selecionável e a página rola fora da alça (`touch-action: none` só nela).
- Só o botão principal começa; um segundo toque é ignorado (segue um
  `pointerId`). O ponteiro fica capturado na alça.
- O item é erguido (sombra, escala) e segue o ponteiro; os outros não se
  mexem. Um marcador mostra onde ele cai, calculado pelo meio de cada item no
  layout. Soltar no mesmo lugar não muda nada. Esc cancela.
- A ordem muda uma vez, ao soltar.

## Teclado (pegar, mover, soltar)

- Espaço ou Enter na alça pega o item (`aria-pressed`). As setas do eixo da
  lista movem (↑↓ na vertical, ←→ na horizontal); a outra dupla não faz nada.
  Espaço ou Enter solta. Esc volta à posição de origem. Sair da alça solta.
- Sem pegar, as setas não fazem nada: não brigam com o leitor de tela.
- O foco fica na alça depois de cada movimento.
- Dica visível no item focado: "Espaço para reordenar", e com o item pego,
  "Setas movem · Espaço solta · Esc cancela".

## Leitor de tela

Alça com o nome do item ("Reordenar Revisar"). Uma região `role="status"`
anuncia pegar, mover, soltar e cancelar com a posição ("na posição 2 de 4"),
com atraso curto para o refoco da alça não engolir o anúncio.

## Limites

Controlada (`itens` + `onReordenar`). Fica de fora do guia, por ora: rolagem
automática durante o arrasto, animação de deslocamento (FLIP) dos vizinhos,
setas invertidas em direita-para-esquerda e `moveBefore` (o React reinsere o
nó, então campo ou mídia dentro do item pode perder o estado). Esc cancela o
arrasto de ponteiro mesmo sem foco na alça.

## Textos

Do dicionário central (`sortableList.*`).
