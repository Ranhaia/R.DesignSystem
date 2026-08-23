# Ideias de telas para exercitar o catálogo

Referência, não backlog. Toda ideia aqui já tem componente ou pattern
existente — nenhuma pressupõe construir algo novo. Domínio: mercado
segurador.

Extraído de `plans/current/loop-80-20-templates.md` em 2026-08-23, antes
de o arquivo ser aposentado. Três destas ideias já viraram trabalho real
em `_trabalho/H-shadcn-local-telas-seguros.md`.

Uma ideia só vira História quando o Rafael decidir — não por estar
listada aqui.

## Ideias de telas pra testar os componentes (pedido do Rafael pra amanhã)

Rafael pediu telas de dashboard e fluxos de login pra exemplificar/testar
os componentes, e disse aceitar mais ideias. Toda ideia abaixo já tem
componente ou pattern existente no catálogo (nenhuma pressupõe construir
algo novo antes de montar a tela) — contexto usado: mercado segurador,
já estabelecido como domínio real do Rafael.

**Login / autenticação**
- Login simples — `input` + `label` + `button` + `checkbox` ("lembrar-me")
  + link "esqueci senha".
- Login com erro de validação — `field` em estado de erro, mensagem
  inline (testa o padrão de erro do Field/Input).
- Recuperação de senha — `input` + `button` + feedback via `sonner`.
- Seleção de corretora/perfil antes de entrar — `select` ou `combobox`.
- Onboarding em etapas — reaproveita o pattern `multi-step-form` que já
  existe (não precisa criar nada).

**Dashboard / operação de seguros**
- Painel de apólices ativas — `card`/`table` + `badge` de status +
  pattern `filters` (já existe) pra filtrar por tipo/status.
- Novo sinistro — pattern `multi-step-form` + pattern `upload` (envio de
  documentos) + pattern `confirmation-dialog` no final.
- Painel do corretor (lista de clientes) — pattern `search-experience` +
  pattern `pagination` (ambos já existem).
- Cancelar apólice — pattern `delete-flow` (já existe, pensado
  exatamente pra ação destrutiva com confirmação).
- Confirmação de ação (ex: sinistro enviado, apólice renovada) — pattern
  `success-feedback` (já existe).
- Estado vazio (corretor sem clientes ainda, sem apólices) — pattern
  `empty-state` (já existe).
- Estado de erro (falha ao carregar dados da apólice) — pattern
  `error-state` (já existe).
- Central de notificações — pattern `toast-strategy` (já existe).
- Ação assistida por IA — usar o `Button` `variant="ai-primary"` recém
  criado pra algo como "Gerar resumo do sinistro com IA" ou "Sugerir
  cobertura com IA" — só componente já existe, mas o CASO DE USO ainda
  não foi validado com Rafael (é uma ideia, não uma decisão tomada).
- Lista longa de sinistros/histórico — pattern `infinite-scroll` (já
  existe).
- Fluxo de CRUD completo (cadastro de beneficiário, por exemplo) —
  pattern `crud` (já existe, cobre criar/editar/listar/excluir de uma
  vez).

