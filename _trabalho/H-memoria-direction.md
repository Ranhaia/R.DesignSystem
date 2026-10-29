---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: aguardando
sinal: 🟡 Aguardando definição
sinal-desde: 2026-10-29
ciclo:
estimativa: 1
perfil: front
dono:
tarefas: 0/2
bloqueada-por:
criado: 2026-10-29
fechado:
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

- [ ] **Decisão** — como o `direction` entra no ciclo de memória?
      A) Manter como utilitário e ensinar as travas a aceitar utilitário (camada `utility`, story opcional, tokens opcionais) → a lista de 7 primitivos não muda; mexe em duas travas.
      B) Promover a primitivo: `direction: "primitive"` no `atomic-registry.ts`, atualizar o `criterio-camadas.md` e criar `direction.stories.tsx` → o catálogo passa a ter 8 primitivos; reabre uma decisão já ratificada.
      C) Deixar sem MD, de propósito, e registrar a exceção nas travas (como já é o `icon` em `SEM_EXEMPLO`) → nenhuma mudança de catálogo, mas o `direction` continua fora do MD.
      Recomendo A porque o `direction` é infraestrutura de verdade (um provider de sentido de leitura) e a trava serve a todo utilitário futuro; B reabriria um ADR só por uma peça. · pedido por: claude · 2026-10-29

## Tarefas

- [ ] Aplicar a opção escolhida nas travas e no catálogo
- [ ] Registrar o `direction` (docs:registrar, intenção, README, sinonimos.json e PENDENTES_MD)

## Contribuições

## Histórico
