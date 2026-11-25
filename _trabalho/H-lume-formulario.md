---
tipo: historia
codigo: 05H
projeto: 🎨 P-DS-SHADCN
epico: E-alinhamento-lume
status: progresso
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-11-25
ciclo:
estimativa: 3
perfil: front
dono: claude
tarefas: 5/6
aceite: 0/2
bloqueada-por:
criado: 2026-11-25
fechado:
motivo-descarte:
origem:
manual_order:
---

# Lume: componentes de formulário

## Plano

Depois de H-dicionario-idioma. Novos ou completados, montados sobre input, input-group, field, button, icon-button, calendar, popover: campo numérico, campo de dinheiro (Intl), campo de senha, campo de busca, campo de tags, seletor de data digitável com período. Cada um pelo ciclo da skill componente-rds.

## Pré-requisitos

## Critérios de aceite

- [ ] Os seis campos aparecem no catálogo com página, story e exemplos
- [ ] Número e dinheiro formatam no idioma ativo

## Tarefas

- [x] Campo numérico
- [x] Campo de dinheiro
- [x] Campo de senha
- [x] Campo de busca
- [x] Campo de tags
- [ ] Seletor de data

## Definition of Done

- [ ] Rodou o que entregou: comando e resultado estão na Contribuição de cada tarefa
- [ ] Nenhuma Contribuição alega validação só por inspeção do código; toda prova é de execução
- [ ] Alteração feita fora do versionamento (painel, dashboard, variável de ambiente) virou migration ou arquivo de config no repo

## Contribuições
- 2026-11-25 · claude · password-input: npm run test:unit 2413/2413, tsc limpo, conferido em /components/password-input; PR #46
- 2026-11-25 · claude · number-input: src/lib/number-input.test.ts 13/13, tsc limpo, docs:check verde, conferido em /components/number-input; PR #52
- 2026-11-25 · claude · currency-input: src/lib/currency-input.test.ts 7/7, tsc limpo, docs:check verde, conferido em /components/currency-input; PR #54
- 2026-11-25 · claude · search-input: src/lib/search-input.test.ts 9/9, tsc limpo, docs:check verde, conferido em /components/search-input (limpar, Esc, atalho /); PR #49
- 2026-11-25 · claude · multi-select prop creatable: src/lib/multi-select.test.ts 7/7, tsc limpo, docs:check verde, conferido em /components/multi-select (exemplo Livre); PR #61

## Histórico

- 2026-11-25 · claude · História criada.
- 2026-11-25 · claude · Pegou a História por ordem do Rafael.
- 2026-11-25 · claude · Decisão do Rafael (2026-11-25): date-picker usa Temporal.PlainDate como valor, com temporal-polyfill (única dependência aprovada) carregado por import dinâmico só onde não há Temporal nativo; Date só na fronteira com o calendar (paraDate/deDate). Conferido com modern-web-guidance, guia capture-location-agnostic-data.
