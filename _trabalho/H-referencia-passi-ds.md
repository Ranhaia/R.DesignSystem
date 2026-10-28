---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-documentacao-ds
status: entregue
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-27
ciclo:
estimativa: 1
perfil: design
dono:
tarefas: 5/5
bloqueada-por:
criado: 2026-10-27
fechado: 2026-10-27
motivo-descarte:
origem: pedido direto do Rafael em 2026-10-27
---

# PASSI DS como referência e MD por componente para a IA

Avaliar o PASSI DS 1.1.0 (`Referencia/passi-ds-1.1.0/`) e montar uma
estrutura para extrair as partes boas, com a documentação de cada
componente em MD — formato que o agente consome melhor que o
`component-docs.ts`.

## Plano

1. Avaliar o pacote e cruzar peça a peça com o catálogo do R.DS.
   Resultado em `Referencia/passi-ds-1.1.0/AVALIACAO.md` e `MAPA.md`.
2. Rafael decide os atritos abaixo. (Decidido: MD é fonte única; texto do PASSI adaptado com revisão posterior).
3. Criar a porta de entrada `docs/componentes/README.md`, o
   `_modelo.md` e o `sinonimos.json`.
4. Piloto: MD de 3 componentes com par ✅ no mapa (button, tabs,
   dialog). Validar com o Rafael antes de replicar.
5. Replicar vira História própria (ou entra em `H-replicar-doc-componentes`).

## Pré-requisitos

- [x] **Decisão — fonte única da documentação.** Resolvido pelo Rafael: (a) MD é a fonte; um script gera o `component-docs.ts` e um teste reprova se divergir.
- [x] **Decisão — texto narrativo vindo do PASSI.** Resolvido pelo Rafael: (c) Tudo pode ser adaptado do PASSI, e o Rafael revisa depois.
- [ ] **Decisão — cor de IA (atrito A3).** PASSI proíbe violeta e
  gradiente como decoração de IA; o `Button` do R.DS tem `ai-primary`
  com gradiente. Fica como backlog/decisão futura de design.

## Tarefas

- [x] Avaliar o pacote PASSI DS 1.1.0
- [x] Cruzar componentes, padrões e transversais com o R.DS
- [x] Criar `docs/componentes/README.md`, `_modelo.md` e `sinonimos.json`
- [x] Piloto com button, tabs e dialog
- [x] Validar o piloto com o Rafael

## Contribuições

- 2026-10-27 · antigravity · Avaliação (`AVALIACAO.md`) e mapa (`MAPA.md`) escritos ao lado do pacote intocado.
- 2026-10-27 · antigravity · Decisões alinhadas com Rafael (MD como fonte da verdade, adaptação do PASSI liberada para revisão). Criados `docs/componentes/README.md`, `_modelo.md`, `docs/sinonimos.json` e 3 pilotos prontos: `button.md`, `tabs.md` e `dialog.md`.
- 2026-10-27 · antigravity · Piloto validado por Rafael ("Concordo pode seguir"). Implementado o parser `scripts/parse-component-md.mjs`, o gerador `scripts/gerar-component-docs.mjs` (`npm run docs:gerar` / `docs:check`) e o teste de sincronia `src/lib/component-docs.sincronia.test.ts` (`npm run test:unit`) passando 100%. Entrega concluída.

## Histórico
