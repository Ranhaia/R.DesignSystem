---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: aguardando
sinal: 🟡 Aguardando definição
sinal-desde: 2026-10-28
ciclo:
estimativa: 5
perfil: front
dono:
tarefas: 1/3
bloqueada-por:
criado: 2026-10-28
fechado:
motivo-descarte:
origem: H-memoria-componentes-spike
---

# Replicar a memória para os demais componentes

Passar pelo ciclo os componentes que ainda não têm MD, seguindo a skill
`.claude/skills/componente-rds/SKILL.md` (caminho "existente sem MD") e a
régua `docs/componentes/_baliza.md`. A lista do que falta é
`PENDENTES_MD` em `src/lib/memoria-componentes.test.ts`. Grande demais
para um ciclo: entregar por lotes e fatiar.

Lotes, por camada:
1. Primitivos: `box`, `icon`, `label`, `skeleton`, `text`, `title` (o `separator` já foi, como prova da skill)
2. Atoms
3. Molecules
4. Organisms

## Pré-requisitos

- [ ] **Decisão** — o que fazer com [[H-replicar-doc-componentes]], que pede a mesma coisa no modelo antigo (narrativa como `[a preencher]`)?
      A) Descartar a antiga, com motivo "substituída por H-memoria-replicar-lotes" → um card só no quadro; nada se perde, o plano antigo não tem tarefa feita.
      B) Manter as duas → dois cards pedindo o mesmo trabalho.
      Recomendo A porque a antiga é bloqueada por duas Histórias que o novo modelo tornou sem sentido ([[H-validar-doc-button]] e [[H-conteudo-narrativo-button]]). · pedido por: claude · 2026-10-28
- [x] **Decisão** — ordem dos lotes.
      A) Os mais usados nas telas primeiro (input, select, card, field…) → a IA que monta telas ganha antes.
      B) Por camada, de primitivos a organismos → cada lote reaproveita a doc do anterior.
      Recomendo A porque o caso de uso principal do R.DS é gerar tela. · pedido por: claude · 2026-10-28
      **Resolvido pelo Rafael em 2026-10-28: B, por camada.**

## Tarefas

- [x] Definir os lotes
- [ ] Registrar cada lote (`docs:registrar`) e adaptar a intenção
- [ ] Revisão do Rafael por lote

## Contribuições

- 2026-10-28 · claude · Lotes definidos por camada (decisão do Rafael). O bloqueio pelo spike caiu: ele entrou na main no PR #22. O `separator` foi registrado e declarado em [[H-memoria-baliza-skill]], como prova da skill.

## Histórico
