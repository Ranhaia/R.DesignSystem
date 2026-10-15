---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico:
status: aguardando
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-09-08
ciclo:
estimativa: 2
perfil: front
dono:
tarefas: 4/4
criado: 2026-09-08
fechado:
motivo-descarte:
origem: https://animata.design/docs/fabs/speed-dial
---

# Componente Speed Dial (FAB Actions Animado)

Implementar no catálogo de componentes o padrão **Speed Dial** (Floating Action Button que se expande em múltiplas ações secundárias), baseado na referência do [Animata — Animated Speed Dial](https://animata.design/docs/fabs/speed-dial).

## Contexto e Objetivo

O Speed Dial atende ao padrão de FAB interativo de ação rápida (categoria funcional `actions`), oferecendo:
- Disparo por clique/toque (sem barreira de hover, funcionando nativamente em mobile e desktop).
- Animação escalonada (*CSS stagger*) com rotação de ícone do gatilho e keyframes leves de escala e translação.
- Suporte multidirecional (`up`, `down`, `left`, `right`).
- Acessibilidade completa de teclado (navegação por setas e fechamento via `Escape`).

A especificação técnica detalhada está documentada em `docs/active/componentes/speed-dial/spec.md`.

## Tarefas

- [x] Implementar componente atômico `src/components/ui/speed-dial.tsx` com suporte a `direction`, botões de ação e navegação de setas
- [x] Implementar keyframes de stagger no CSS do Design System (`globals.css` com `@keyframes speed-dial-in-*`)
- [x] Aplicar tokens semânticos do DS (`bg-background/85`, `border-border/80`, `shadow-lg`, `hover:bg-accent` e suporte a `prefers-reduced-motion`)
- [x] Adicionar ao catálogo atômico (`src/lib/atomic-registry.ts`), índices (`components-registry.ts`) e demo (`speed-dial-demo.tsx`)

## Contribuições

- 2026-09-09 (Antigravity): Implementação completa do componente SpeedDial, keyframes de stagger em globals.css, demo para catálogo e Storybook.

## Histórico
