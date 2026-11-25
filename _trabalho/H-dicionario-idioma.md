---
tipo: historia
codigo: 05G
projeto: 🎨 P-DS-SHADCN
epico: E-alinhamento-lume
status: entregue
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-11-25
ciclo:
estimativa: 1
perfil: front
dono:
tarefas: 5/5
aceite: 2/2
bloqueada-por:
criado: 2026-11-25
fechado: 2026-11-25
motivo-descarte:
origem:
manual_order:
---

# Dicionário central de idioma (pt/en)

## Plano

Provider de idioma no DS (padrão pt-BR) com dicionário pt/en em src/lib/i18n. Todo texto de sistema dos componentes (aria-label, sr-only, placeholder) sai do dicionário. Trava: teste que reprova texto de sistema fixo em src/components/ui/ e chaves divergentes entre pt e en. Base para as outras Histórias do Épico.

## Pré-requisitos

## Critérios de aceite

- [x] Trocar o idioma para en faz leitor de tela ouvir os textos de sistema em inglês, sem mistura
- [x] Em pt nenhum componente fala inglês (Close, Loading, Previous slide somem)

## Tarefas

- [x] Teste-trava de texto fixo e chaves pt/en
- [x] Dicionário e provider
- [x] Migrar textos de breadcrumb, carousel, combobox, dialog, pagination, sheet, sidebar, spinner, time-picker, tree-select
- [x] Calendar segue o idioma do provider
- [x] Doc: README e llms.txt

## Definition of Done

- [x] Rodou o que entregou: comando e resultado estão na Contribuição de cada tarefa
- [x] Nenhuma Contribuição alega validação só por inspeção do código; toda prova é de execução
- [x] Alteração feita fora do versionamento (painel, dashboard, variável de ambiente) virou migration ou arquivo de config no repo

## Contribuições
- 2026-11-25 · claude · npm run test:unit: 2384/2384 verdes; tsc limpo; PR #45
- 2026-11-25 · claude · npm run test:unit: 2384/2384 verdes; tsc limpo; PR #45
- 2026-11-25 · claude · npm run test:unit: 2384/2384 verdes; tsc limpo; PR #45
- 2026-11-25 · claude · npm run test:unit: 2384/2384 verdes; tsc limpo; PR #45
- 2026-11-25 · claude · npm run test:unit: 2384/2384 verdes; tsc limpo; PR #45
- 2026-11-25 · claude · Entregue: Dicionário central pt-BR/en em src/lib/idioma, 21 componentes migrados, trava idioma.test.ts; PR #45 mesclado

## Histórico

- 2026-11-25 · claude · História criada.
- 2026-11-25 · claude · Pegou a História por ordem do Rafael.
- 2026-11-25 · claude · Critérios marcados por ordem do Rafael (2026-11-25); prova: render em en no idioma.test.ts
