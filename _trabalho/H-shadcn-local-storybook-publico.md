---
tipo: historia
projeto: P-DS-SHADCN
epico: E-shadcn-local-case-publico
status: descartado
sinal: 🟡 Aguardando definição
sinal-desde: 2026-08-23
ciclo: C-2026-S01
estimativa:
perfil: front
dono:
tarefas: 0/2
criado: 2026-08-23
fechado: 2026-08-23
motivo-descarte: substituído pelo portal próprio de Design System, que é o que está deployado; Storybook deixou de ser necessário
origem:
---

# Storybook público

Rodar `build-storybook` e publicar, para cobrir a metade de catálogo do
case.

**Descartada em 2026-08-23.** O portal próprio de Design System assumiu
essa função. A infraestrutura do Storybook continua no repo
(`.storybook/`, script `build-storybook` no `package.json`) — descartar a
História não implica remover código. Se um dia o catálogo voltar a ser
necessário, isso é História nova, não repescagem desta.

## Plano

Obsoleto. Mantido só como registro do que se pretendia.

## Pré-requisitos

- [x] **Acesso** — repo no GitHub com push feito → `Ranhaia/R.DesignSystem`,
      branch `main` com upstream. Resolvido em outra frente; o plano
      antigo registrou como pendente por um mês. · verificado: claude ·
      2026-08-23
- [x] **Acesso** — projeto no Vercel. Confirmado pelo Rafael: o deploy
      existe e é o portal de Design System. · 2026-08-23
- [x] **Decisão** — subpath ou domínio separado? Prejudicada pelo
      descarte. · 2026-08-23

## Tarefas

- [ ] ~~Rodar `build-storybook` e corrigir o que quebrar~~
- [ ] ~~Publicar no destino decidido~~

## Contribuições

## Histórico
- C-2026-S01 — descartada antes de iniciar
