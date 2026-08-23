---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-shadcn-local-case-publico
status: aguardando
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-08-23
ciclo: C-2026-S01
estimativa: 4
perfil: front
dono:
tarefas: 0/3
criado: 2026-08-23
fechado:
motivo-descarte:
origem:
---

# 3 telas do domínio de seguros

Escopo fechado em 2026-07-22. Os estados de sistema (empty, error,
success, toast) são aplicados **dentro** destas telas, não como telas
isoladas extras.

## Plano

Mesmo padrão de rota do fluxo de login. Patterns já existentes:

- **Apólices ativas** — `card`/`table` + `badge` de status + pattern
  `filters` para filtrar por tipo e status. Estado vazio via pattern
  `empty-state`; falha de carga via `error-state`.
- **Novo sinistro** — pattern `multi-step-form` + pattern `upload` para
  envio de documentos + pattern `confirmation-dialog` no final. Sucesso
  via `success-feedback`.
- **Painel do corretor** — pattern `search-experience` + pattern
  `pagination`. Lista longa via `infinite-scroll` se necessário.

**Dados fictícios obrigatórios.** Nada de dado real de cliente ou apólice
— a tela vai ao ar num case público.

## Pré-requisitos

Nenhum.

## Tarefas

- [ ] Tela Apólices ativas
- [ ] Tela Novo sinistro
- [ ] Tela Painel do corretor

## Contribuições

## Histórico
