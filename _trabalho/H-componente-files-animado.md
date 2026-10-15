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
tarefas: 5/5
criado: 2026-09-08
fechado:
motivo-descarte:
origem: https://animate-ui.com/docs/primitives/radix/files
---

# Componente Files Animado (Árvore de Arquivos e Pastas)

Adicionar ao catálogo do Design System a primitive/componente `Files` inspirada no [Animate UI - Radix Files](https://animate-ui.com/docs/primitives/radix/files), permitindo exibir estruturas hierárquicas de pastas e arquivos com animações suaves de expansão/recolhimento e interação.

## Contexto e Objetivo

O Animate UI disponibiliza primitivas animadas não-estilizadas (baseadas em Radix UI + Motion ou Base UI). A primitiva `Files` organiza listas de diretórios onde a abertura de pastas e a renderização de arquivos usam física de spring e transições fluidas.

A especificação técnica detalhada está documentada em `docs/active/componentes/files/spec.md`.

## Tarefas

- [x] Decidir motor de animação: adotar abordagem nativa com Tailwind v4 e tokens em `globals.css` (zero runtime JS extra)
- [x] Implementar componente atômico `src/components/ui/files.tsx` (`Files`, `Folder`, `FolderTrigger`, `FolderContent`, `File`, etc.)
- [x] Aplicar tokens semânticos do DS (sem cores fixas, suporte a dark/light mode e `prefers-reduced-motion`)
- [x] Registrar no catálogo atômico (`src/lib/atomic-registry.ts`) e índices de componentes (`components-registry.ts`)
- [x] Criar exemplo interativo / demo na página do componente (`files-demo.tsx`) e no Storybook (`files.stories.tsx`)

## Contribuições

- 2026-09-09 (Antigravity): Implementação completa do componente Files, integração com tokens de motion em globals.css, demo para catálogo e Storybook.

## Histórico
