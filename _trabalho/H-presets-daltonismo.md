---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-Investigacao-Theming
status: aguardando
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-28
ciclo:
estimativa: 2
perfil: front
dono:
tarefas: 0/4
bloqueada-por:
criado: 2026-10-28
fechado:
motivo-descarte:
origem: H-construtor-de-tema (a simulação de daltonismo reprovou os 5 presets)
---

# Presets que passam no daltonismo

A simulação de daltonismo (`src/lib/cor/daltonismo.ts`) mediu os 5 presets
em 2026-10-28: **33 falhas**. Elas estão listadas como conhecidas na catraca
de `src/lib/cor/daltonismo.test.ts`, que reprova qualquer falha nova.

| Preset | O que reprova | Quem é afetado |
|---|---|---|
| default (preto) | Link × texto em todas as visões (1,8 no claro, 0,4 no escuro; mínimo 20) | Todo mundo: o link é preto como o texto e o sublinhado só aparece no hover |
| soft (vermelho) | Erro × ação no escuro: 5,3 em visão típica, 1,6 em protanopia | Todo mundo: o botão principal e o de excluir ficam quase iguais |
| editorial (marrom) | Erro × ação no escuro (1,5 em deuteranopia; 7,4 em visão típica), mais gráficos | Quase todo mundo no escuro |
| tech, midnight | Pares de cor de gráfico, sob daltonismo | Quem tem daltonismo, em gráficos |

## Pré-requisitos

- [x] **Decisão** — Link no meio do texto.
      A) Sublinhado sempre visível no link (não só no hover) → resolve em qualquer cor de marca, inclusive preto; muda o visual do link em todas as telas.
      B) Manter sem sublinhado e o motor dar ao link uma cor diferente do texto → o link do preset default deixa de ser preto.
      Recomendo A porque a cor sozinha nunca basta (WCAG 1.4.1) e o PASSI pede sublinhado no texto (`link.md`). · pedido por: claude · 2026-10-28
- [x] **Decisão** — Erro × ação quando a marca é vermelha ou marrom (soft, editorial).
      A) O motor afasta o vermelho de erro da cor da marca quando os dois ficam perto → muda o vermelho de erro só nesses presets.
      B) Manter e confiar no texto do botão ("Excluir") → nada muda; com daltonismo, e no soft escuro até sem, os dois botões parecem iguais.
      Recomendo A porque no soft escuro a diferença já falha na visão típica. · pedido por: claude · 2026-10-28
- [x] **Decisão** — Cores de gráfico.
      A) O motor gera a paleta de gráfico com distância segura para daltonismo → as cores dos gráficos mudam nos 5 presets.
      B) Manter as cores e exigir rótulo ou padrão em todo gráfico (a cor nunca é o único sinal) → nada muda na cor; vira regra no MD do `chart`.
      Recomendo A, com B como regra de qualquer jeito, porque o R.DS gera telas por IA e a IA nem sempre põe rótulo. · pedido por: claude · 2026-10-28

**Resolvido pelo Rafael em 2026-10-28:** 1-A (sublinhado sempre visível),
2-A (o motor afasta o erro da marca), 3-A com B (paleta de gráfico segura e
rótulo obrigatório no MD do `chart`). Com o sublinhado fixo, o par
"Link × texto" sai de `PARES_DALTONISMO`: a cor deixa de ser o único sinal.

## Tarefas

- [ ] Link conforme a Decisão 1
- [ ] Erro × ação conforme a Decisão 2
- [ ] Gráficos conforme a Decisão 3
- [ ] Esvaziar `CONHECIDAS` em `daltonismo.test.ts` (catraca) e conferir os 5 presets no navegador

## Contribuições

- 2026-10-28 · claude · As 3 decisões foram fechadas pelo Rafael com as recomendações. Aguarda o comando para entrar em execução.

## Histórico
