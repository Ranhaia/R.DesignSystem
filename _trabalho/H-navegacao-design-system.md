---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-documentacao-ds
status: progresso
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-08-23
ciclo:
estimativa: 2
perfil: front
dono: antigravity
tarefas: 2/3
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

Nenhum.

## Tarefas

- [x] Reorganizar a sidebar em Foundations / Components / Patterns
- [x] Agrupar Components por Atoms / Molecules / Organisms / Templates
- [ ] Criar as rotas-índice de cada grupo

## Contribuições

- 2026-10-28 · antigravity · Reorganização da sidebar com grupo Foundations (`src/components/sidebar-07/nav-foundations.tsx`) e registro central (`src/lib/foundations-registry.ts`). Validação com `npx tsc --noEmit` (0 erros) e `npm run test:unit` (1218/1218 testes passando).
- 2026-10-28 · antigravity · Agrupamento de Components por Atoms, Molecules, Organisms e Templates em `src/components/sidebar-07/nav-components.tsx` com sub-accordions e cabeçalho unificado. Validação com `npx tsc --noEmit` (0 erros) e `npm run test:unit` (1218/1218 testes passando).

## Histórico
