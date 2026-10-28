---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: entregue
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-28
ciclo:
estimativa: 2
perfil: front
dono:
tarefas: 6/6
bloqueada-por:
criado: 2026-10-28
fechado: 2026-10-28
motivo-descarte:
origem: pedido direto do Rafael em 2026-10-28 ("separar em worktree com spike, em looping")
---

# Spike: memória de componentes com button, tabs e dialog

Provar o ciclo inteiro do [[E-memoria-componentes]] em 3 componentes,
no branch `spike/memoria-componentes`, antes de replicar.

## Plano

Loop Engineering: o verificador (`src/lib/memoria-componentes.test.ts`)
nasce antes do código e define "pronto".

- **Fase 0 — consertar o piloto.** Cada linha de Variantes e Tamanhos
  vira um valor que existe no código (hoje `ai-primary · ai-secondary`,
  `md / default` e `icon-*` quebram a prévia). Texto da página sem
  `**` nem crase crua, descrição sem quebra de linha no meio.
- **Fase 1 — coleta do código.** `scripts/coletar-componente.mjs` lê o
  `.tsx`: grupos do `cva`, props próprias (tipo e padrão), sub-componentes
  e tokens usados.
- **Fase 2 — registro e histórico.** `scripts/registrar-componente.mjs`
  é o escritor único: reescreve as seções geradas preservando a
  descrição do auditor, grava a coleta e acrescenta o diff no histórico.
- **Fase 3 — trava.** O teste reprova código mudado sem registro, MD
  editado à mão nas colunas geradas e componente sem os artefatos fixos.

## Pré-requisitos

Nenhum.

## Tarefas

- [x] Verificador escrito e falhando pelos motivos certos
- [x] Fase 0: piloto consertado
- [x] Fase 1: coleta do código
- [x] Fase 2: registro e histórico
- [x] Fase 3: trava de artefatos fixos
- [x] Suíte unit e `tsc` verdes

## Contribuições

- 2026-10-28 · claude · Worktree `.claude/worktrees/spike-memoria-componentes`, branch `spike/memoria-componentes` a partir da `origin/main`. Piloto de 2026-10-27 copiado do checkout principal (lá estava sem commit) e commitado como base (`d87a98d`). Linha de base: `vitest --project unit` 1034/1034.
- 2026-10-28 · claude · Verificador `src/lib/memoria-componentes.test.ts` (109 testes) escrito antes do código; 1ª execução vermelha por "Cannot find module coletar-componente.mjs".
- 2026-10-28 · claude · Fase 1: `scripts/coletar-componente.mjs` (AST do TypeScript): grupos do `cva`, props próprias com tipo e padrão (resolve type alias local e `VariantProps`), partes e tokens declarados no CSS do projeto. Iteração 1 do loop: todos os testes de coleta, mescla e diff verdes.
- 2026-10-28 · claude · Fase 2: `scripts/registrar-componente.mjs` + `npm run docs:registrar`. Registrados button, tabs e dialog: `docs/componentes/coleta/*.json`, `historico/*.md`, seções geradas reescritas preservando a descrição. Segundo registro idempotente ("coleta igual"). A coleta achou tokens que a lista à mão não tinha (`bg-ai-surface-highlight`, `ring-destructive`…). Auditor: "Raiz" virou `Button` na Anatomia; 4 descrições novas preenchidas.
- 2026-10-28 · claude · Fase 0: parser tira `**` e crase do texto e junta a descrição numa linha. Prova na página: `/components/button` (dev server no worktree, webpack) renderiza as 8 variantes com estilo e os 12 tamanhos com altura medida de 24 a 56 px, sem marcação crua.
- 2026-10-28 · claude · Fase 3: catraca `PENDENTES_MD` (76 componentes) + story, registros e exemplo por componente; exceções explícitas `direction` (utilitário) e `icon` (sem exemplo). Prova da trava: sabotei `tabs.tsx` (variante nova) e `button.md` (medida à mão) → `docs:registrar --check` saiu 1 acusando os dois; restaurado.
- 2026-10-28 · claude · Final: `vitest --project unit` 1143/1143, `tsc --noEmit` sem erro, `npm run docs:check` verde. Docs: `_modelo.md`, `README.md` da porta de entrada, `historico/_lacunas.md` e tabela "Mudou X → atualize Y" do `CLAUDE.md`.

## Histórico
