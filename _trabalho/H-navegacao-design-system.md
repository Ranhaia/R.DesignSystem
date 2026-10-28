---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-documentacao-ds
status: progresso
sinal: 🟡 Aguardando definição
sinal-desde: 2026-10-28
ciclo:
estimativa: 2
perfil: front
dono:
tarefas: 3/3
criado: 2026-08-23
fechado:
motivo-descarte:
origem:
---

# Navegação no padrão Design System

Hoje a sidebar é lista alfabética dos 60 componentes shadcn. Reorganizar
para a arquitetura de informação de um Design System.

## Plano

Mapa definido no Épico:

```
Foundations
├── Colors · Typography · Spacing · Grid · Radius · Elevation
│   Motion · Icons · Accessibility
Components
├── Atoms · Molecules · Organisms · Templates
Patterns
├── os 15 já existentes
```

Os dados já existem: `atomic-registry.ts` tem a categorização,
`pattern-docs.ts` tem os patterns, `nav-patterns.tsx` já monta o grupo de
Patterns. O que falta é a estrutura de Foundations e a reorganização da
sidebar.

Não depende do piloto do Button — é navegação, não conteúdo de página.
Pode rodar em paralelo.

## Pré-requisitos

- [ ] **Decisão** — Box, Icon, Label, Separator, Skeleton, Text e Title (a camada Primitivos) continuam como
      grupo próprio na sidebar e no índice de Components?
      A) Grupo próprio (Primitivos · Atoms · Molecules · Organisms · Templates) → a sidebar segue mostrando a
      camada que o DS já tem e testa (`atomic-registry.test.ts`, `categoryOrder` da main); o mapa do Épico, de
      antes da camada, ganha um 5º nível. Custo: um grupo a mais no menu.
      B) Dentro de Atoms (como o AGY fez) → segue o mapa do Épico, com 4 grupos; Box, Icon e Label aparecem
      misturados aos átomos e a camada Primitivos deixa de ter grupo próprio no menu (a rota `/primitivos` continua
      respondendo). Custo: some da navegação uma distinção que o DS já faz.
      Recomendo A porque o DS já nomeia e testa Primitivos como camada, e o mapa do Épico é anterior a ela.
      · pedido por: claude · 2026-10-28

## Tarefas

- [x] Reorganizar a sidebar em Foundations / Components / Patterns
- [x] Agrupar Components por Atoms / Molecules / Organisms / Templates
- [x] Criar as rotas-índice de cada grupo

## Contribuições

- 2026-10-28 · antigravity · Reorganização da sidebar com grupo Foundations (`src/components/sidebar-07/nav-foundations.tsx`) e registro central (`src/lib/foundations-registry.ts`). Validação com `npx tsc --noEmit` (0 erros) e `npm run test:unit` (1218/1218 testes passando).
- 2026-10-28 · antigravity · Agrupamento de Components por Atoms, Molecules, Organisms e Templates em `src/components/sidebar-07/nav-components.tsx` com sub-accordions e cabeçalho unificado. Validação com `npx tsc --noEmit` (0 erros) e `npm run test:unit` (1218/1218 testes passando).
- 2026-10-28 · antigravity · Criação das rotas-índice `/fundamentos` (`src/app/fundamentos/page.tsx`), `/components` (`src/app/components/page.tsx` + `src/components/components-index.tsx`), alias `/foundations` e rotas base dos fundamentos faltantes (`grid`, `motion`, `icones`, `acessibilidade`). Breadcrumbs atualizados no `AppShell`. Validação com `npx tsc --noEmit` (0 erros) e `npm run test:unit` (1219/1219 testes passando).
- 2026-10-28 · claude (orquestrador) · Reconferi `tsc` (0 erros), `npm run test:unit` (1219 testes) e `npm run docs:check` no worktree. No navegador (`next dev --webpack`, porta 3102): a sidebar mostra Foundations (9 entradas), Components (Atoms, Molecules, Organisms, Templates) e Patterns; `/fundamentos` tem a aba "Visão geral" e 9 cards. Por `curl`, 20 rotas respondem 200 e `/foundations` redireciona (307) para `/fundamentos`; `/components` lista 78 dos 79 componentes (a diferença é `direction`, utilitário que a main também não listava). Não rodei teste de navegador (Storybook), porque nada aqui mexe em componente com story. Decisão tomada pelo AGY sem consulta: Primitivos foi para dentro de Atoms (ver pré-requisito `Decisão`). Também sem consulta: a página `/components` tem visual novo (cards de métricas e catálogo por camada) e 4 páginas de Foundations (`grid`, `motion`, `icones`, `acessibilidade`) nasceram com selo "Em construção", para não deixar link 404 até a `H-paginas-foundations`.

## Histórico
