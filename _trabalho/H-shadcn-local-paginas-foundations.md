---
tipo: historia
projeto: P-DS-SHADCN
epico: E-shadcn-local-documentacao-ds
status: aguardando
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-08-23
ciclo:
estimativa: 3
perfil: front
dono:
tarefas: 0/3
bloqueada-por:
  - "[[H-shadcn-local-navegacao-design-system]]"
criado: 2026-08-23
fechado:
motivo-descarte:
origem:
---

# Páginas de Foundations

Nove páginas: Colors, Typography, Spacing, Grid, Radius, Elevation,
Motion, Icons, Accessibility.

## Plano

O conteúdo **já existe, espalhado**: em `/estilo`, nos 5 presets, e em
`src/app/globals.css`. Não é criar do zero — é reunir e organizar.

Fontes por página:

- **Colors, Typography, Spacing, Radius, Elevation** — os tokens dos 5
  presets em `globals.css`, que é onde mora o sistema de tokens
- **Motion** — os tokens `duration-motion-*` e o reset de
  `prefers-reduced-motion`, entregues no plano de motion de julho
- **Icons** — o sistema Material Symbols e o `icon.tsx`
- **Accessibility** — o diagnóstico em `docs/active/revisao-ds/` e as
  correções de contraste AA já feitas
- **Grid** — o único sem fonte pronta; pode virar pré-requisito de
  decisão se não houver convenção estabelecida

Depende da navegação existir primeiro — sem o grupo Foundations na
sidebar, as páginas não têm onde aparecer.

## Pré-requisitos

Nenhum além do bloqueador.

## Tarefas

- [ ] Levantar o conteúdo existente por página
- [ ] Montar as 9 rotas
- [ ] Marcar o que não tem fonte pronta como pendência

## Contribuições

## Histórico
