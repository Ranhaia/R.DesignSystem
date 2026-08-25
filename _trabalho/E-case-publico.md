---
tipo: epico
projeto: 🎨 P-DS-SHADCN
status: progresso
criado: 2026-08-23
---

# Case público do Design System

Transformar o racional do shadcn-local (Atomic Design + tokens globais +
acessibilidade real com leitor de tela) num Case público, publicado a
partir do portfólio.

## Contexto herdado

O portfólio (`anhaia-portfolio`, deployado no Vercel) é HTML/CSS/JS
estático — **incompatível** com os componentes React do shadcn-local. Ele
não vai importar componente nenhum: só conta a história e linka pro
shadcn-local deployado como prova viva.

## Decisões tomadas em 2026-07-22

- Deploy do shadcn-local: repositório novo no GitHub + import no Vercel,
  projeto separado do `anhaia-portfolio`. **Feito** — o remote é
  `Ranhaia/R.DesignSystem`, branch `main`, e o portal está no ar.
- Escopo da v1, além do fluxo de login: 3 telas do domínio de seguros —
  Apólices ativas, Novo sinistro, Painel do corretor. Escolhidas por
  cobrirem listagem/filtro, fluxo multi-etapa com upload e confirmação, e
  busca/paginação, sem inflar o escopo.
- Arquitetura de rotas: tudo em `src/app/templates/`, mesmo padrão do
  `dashboard-financeiro` existente.

## Mudança de rumo em 2026-08-23

O Storybook saiu do escopo. No lugar dele, o próprio portal de Design
System assumiu a função de catálogo. Ver
`H-storybook-publico`, descartada com motivo.

## Risco registrado

Dados de exemplo nas telas de seguros precisam ser fictícios antes de
publicar. Nada de dado real de cliente ou apólice.
