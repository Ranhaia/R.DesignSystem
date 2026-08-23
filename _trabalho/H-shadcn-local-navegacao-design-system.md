---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-shadcn-local-documentacao-ds
status: aguardando
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-08-23
ciclo:
estimativa: 2
perfil: front
dono:
tarefas: 0/3
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

- [ ] Reorganizar a sidebar em Foundations / Components / Patterns
- [ ] Agrupar Components por Atoms / Molecules / Organisms / Templates
- [ ] Criar as rotas-índice de cada grupo

## Contribuições

## Histórico
