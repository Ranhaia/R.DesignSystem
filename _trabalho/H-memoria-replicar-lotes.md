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
tarefas: 0/3
bloqueada-por:
  - "[[H-memoria-componentes-spike]]"
criado: 2026-10-28
fechado:
motivo-descarte:
origem: H-memoria-componentes-spike
---

# Replicar a memória para os demais componentes

Passar os componentes que ainda não têm MD pelo ciclo do spike:
`docs:registrar` gera a parte estrutural; a intenção vem adaptada do
PASSI onde `Referencia/passi-ds-1.1.0/MAPA.md` marca ✅, e o Rafael
revisa. Grande demais para um ciclo: entregar por lotes e fatiar.

## Pré-requisitos

- [ ] **Decisão** — o que fazer com [[H-replicar-doc-componentes]], que pede a mesma coisa no modelo antigo (narrativa como `[a preencher]`)?
      A) Descartar a antiga, com motivo "substituída por H-memoria-replicar-lotes" → um card só no quadro; nada se perde, o plano antigo não tem tarefa feita.
      B) Manter as duas → dois cards pedindo o mesmo trabalho.
      Recomendo A porque a antiga é bloqueada por duas Histórias que o novo modelo tornou sem sentido ([[H-validar-doc-button]] e [[H-conteudo-narrativo-button]]). · pedido por: claude · 2026-10-28
- [ ] **Decisão** — ordem dos lotes.
      A) Os mais usados nas telas primeiro (input, select, card, field…) → a IA que monta telas ganha antes.
      B) Por camada, de primitivos a organismos → cada lote reaproveita a doc do anterior.
      Recomendo A porque o caso de uso principal do R.DS é gerar tela. · pedido por: claude · 2026-10-28

## Tarefas

- [ ] Definir os lotes
- [ ] Registrar cada lote (`docs:registrar`) e adaptar a intenção
- [ ] Revisão do Rafael por lote

## Contribuições

## Histórico
