---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: entregue
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-29
ciclo:
estimativa: 1
perfil: front
dono:
tarefas: 2/2
bloqueada-por:
criado: 2026-10-29
fechado: 2026-10-29
motivo-descarte:
origem: H-memoria-primitivos-b
---

# Memória do `direction` (utilitário sem UI)

O `direction` é o único componente do catálogo que o ciclo de memória não consegue registrar como está. Levantado pelo
AGY ao executar [[H-memoria-primitivos-b]] e confirmado pelo orquestrador: o `criterio-camadas.md` (ratificado em
2026-10-19) fecha a lista de primitivos em 7 peças e deixa o `direction` como `utilitySlugs` em `atomic-registry.ts`
(infraestrutura, sem UI); ele não tem `direction.stories.tsx` nem classes de token (`Tokens usados: Nenhum.`), e a trava
`memoria-componentes.test.ts` exige story e camada para todo componente com MD.

## Plano

Depois da Decisão: registrar o `direction` pelo ciclo (`npm run docs:registrar -- direction`), na opção escolhida.

## Pré-requisitos

- [x] **Decisão** — como o `direction` entra no ciclo de memória?
      A) Manter como utilitário e ensinar as travas a aceitar utilitário (camada `utility`, story opcional, tokens opcionais) → a lista de 7 primitivos não muda; mexe em duas travas.
      B) Promover a primitivo: `direction: "primitive"` no `atomic-registry.ts`, atualizar o `criterio-camadas.md` e criar `direction.stories.tsx` → o catálogo passa a ter 8 primitivos; reabre uma decisão já ratificada.
      C) Deixar sem MD, de propósito, e registrar a exceção nas travas (como já é o `icon` em `SEM_EXEMPLO`) → nenhuma mudança de catálogo, mas o `direction` continua fora do MD.
      Recomendo A porque o `direction` é infraestrutura de verdade (um provider de sentido de leitura) e a trava serve a todo utilitário futuro; B reabriria um ADR só por uma peça. · pedido por: claude · 2026-10-29
      **Resolvido pelo Rafael em 2026-10-29: o `direction` é primitivo.** "A ideia do primitivo é que ele seja a base para
      que os outros elementos consumam; faz parte que eles não tenham UI." Caminho da opção B, sem criar story (primitivo
      sem UI não precisa de uma).

## Tarefas

- [x] Aplicar a opção escolhida nas travas e no catálogo
- [x] Registrar o `direction` (docs:registrar, intenção, README, sinonimos.json e PENDENTES_MD)

## Contribuições

- 2026-10-29 · claude · Checker antes: 3 testes vermelhos (`atomic-registry.test.ts` e `memoria-componentes.test.ts`). Depois: `direction: "primitive"` em `atomic-registry.ts` e `utilitySlugs` removido (nada mais o usava); `SEM_STORY = ["direction"]` na trava da memória (com teste de que a exceção só vale para quem não tem story; MD com `story:` vazio); ADR `criterio-camadas.md` emendado (lista de primitivos passa a 8, e "primitivo pode não ter UI"); `direction.md` escrito e registrado, com README. Prova: `npx tsc --noEmit` sem erro, `npm run test:unit` 29 arquivos e 1668 testes, `npm run docs:check` verde, e `/components/direction` e `/primitivos` conferidos no navegador (abas Visão geral, Exemplos, Código e Acessibilidade; sem link de story; Direction no índice de Primitivos).

## Histórico
