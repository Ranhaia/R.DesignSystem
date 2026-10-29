---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: aguardando
sinal: 🟡 Aguardando definição
sinal-desde: 2026-10-28
ciclo:
estimativa: 2
perfil: front
dono:
tarefas: 0/3
bloqueada-por:
  - "[[H-abas-padronizadas]]"
criado: 2026-10-28
fechado:
motivo-descarte:
origem: H-memoria-baliza-skill
---

# A página do componente mostrar o que o MD declara

Hoje o MD tem Quando NÃO usar, Conteúdo, Acessibilidade e Tokens usados,
mas `/components/<slug>` só mostra os campos antigos do `ComponentDoc`.
Resultado: a IA lê mais do que a pessoa vê. Equalizar os dois lados.

## Plano

Acrescentar os campos ao `ComponentDoc`, ao parser e ao gerador, e
renderizar as seções na página (`src/app/components/[slug]/page.tsx`) e
no índice lateral.

## Pré-requisitos

- [ ] **Decisão** — Onde as seções novas aparecem na página.
      A) Seguindo a ordem do MD: Quando NÃO usar logo depois de Quando utilizar; Conteúdo e Acessibilidade antes de Boas práticas → página e MD lidos na mesma ordem.
      B) Num bloco "Diretrizes" no fim da página → a página atual muda menos, mas a decisão entre vizinhos fica longe do topo.
      Recomendo A porque "Quando NÃO usar" só ajuda se for lido antes de escolher a peça. · pedido por: claude · 2026-10-28

## Tarefas

- [ ] Campos novos no `ComponentDoc`, no parser e no gerador
- [ ] Seções na página e no índice lateral
- [ ] Conferir no navegador com button, tabs, dialog e separator

## Contribuições

## Histórico
