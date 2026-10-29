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
tarefas: 4/4
bloqueada-por:
criado: 2026-10-29
fechado: 2026-10-29
motivo-descarte:
origem: H-memoria-replicar-lotes
---

# Memória dos componentes: primitivos, lote b

Fatia de [[H-memoria-replicar-lotes]] (Onda 2 da [[H-abas-padronizadas]]). Ordem por camada, decidida pelo Rafael em
2026-10-28; o Rafael revisa o texto depois (`status: piloto` até lá).

## Plano

Passar cada componente do lote pelo ciclo de memória, para a página `/components/<slug>` ficar completa como a do
Button: abas Visão geral, Exemplos, Código, Tokens e Acessibilidade, com "Quando NÃO usar" e Tokens por contexto.
Componentes do lote (primitivos, lote b): `text` e `title`. O `direction` saiu do lote e foi resolvido em [[H-memoria-direction]] (primitivo sem UI).

Siga `.claude/skills/componente-rds/SKILL.md` (caminho "existente sem MD", passos 3 a 6), `docs/componentes/_baliza.md` e
`_modelo.md`. Modelos prontos: `docs/componentes/button.md`, `tabs.md`, `dialog.md` e `separator.md`.

Para cada componente do lote:

1. `npm run docs:registrar -- <slug> --motivo "Primeiro registro (memoria-primitivos-b)"`. Cria o MD, a coleta e o
   histórico e regenera `src/lib/component-docs.ts`. Não edite à mão `docs/componentes/coleta/`, `historico/` nem
   `component-docs.ts`.
2. Troque todo `[a preencher]` por texto em português do Brasil, seguindo a baliza. Fontes, nesta ordem: o `.tsx` e a
   story (nunca descreva o que o código não faz); o PASSI (`Referencia/passi-ds-1.1.0/MAPA.md` aponta o arquivo; leia-o
   inteiro e **adapte, não copie**); `docs/archive/componentes/<slug>/spec.md`, se houver; o texto antigo da entrada em
   `git show HEAD:src/lib/component-docs.ts`.
3. Frontmatter: `vizinhos` (ao menos 1 slug que existe) e `referencias` (ao menos 1: `passi:<arquivo>`,
   `shadcn:<slug>` ou `spec:<slug>`); `status: piloto`.
4. Limites que a trava cobra (`src/lib/memoria-componentes.test.ts`): Quando usar de 2 a 3 itens; Quando NÃO usar de 2 a 3,
   cada um terminando em → e o slug de um componente que existe; Faça 3; NÃO faça 3 (erro → alternativa); Acessibilidade com as 4 chaves;
   exemplo mínimo que importa do próprio componente; até 8 KB.
5. O texto do MD é o que a página mostra: **nada de "em revisão", "PASSI", ⚠️ nem código de História** no corpo (a trava é
   `src/lib/doc-texto-interno.test.ts`). O nome do PASSI só entra em `referencias`, no frontmatter.
6. Encaixe: acrescente a linha do componente em "Componentes documentados" de `docs/componentes/README.md`
   (`- [slug](slug.md) — uma linha`), tire o slug de `PENDENTES_MD` em `src/lib/memoria-componentes.test.ts` e crie a
   chave em `docs/sinonimos.json` se faltar.

Fora do escopo: não altere `src/components/ui/*.tsx`. Se achar defeito no componente (texto em inglês, falta de
`aria-label`…), documente a armadilha em Cuidados e registre o defeito em `## Contribuições`. Se o registro reprovar com
"Token sem contexto", pare e registre como Decisão. Lacuna que a coleta deveria ter lido: anote em `## Contribuições`, não
em `_lacunas.md`.

Prova de pronto: `npx tsc --noEmit`, `npm run test:unit` e `npm run docs:check`, todos verdes.

## Pré-requisitos

Nenhum além dos bloqueadores. A Decisão que o AGY levantou sobre o `direction` (utilitário, sem story e sem tokens) foi para [[H-memoria-direction]], e o lote fechou só com `text` e `title`.

## Tarefas

- [x] Registrar e declarar `text` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `title` (docs:registrar, intenção, vizinhos e referencias)
- [x] Encaixar o lote no README, no PENDENTES_MD e no sinonimos.json
- [x] Rodar tsc, test:unit e docs:check, todos verdes

## Contribuições

- 2026-10-29 · antigravity · text registrado e declarado em docs/componentes/text.md com props, tamanhos, estados, conteúdo, acessibilidade (4 chaves) e exemplo mínimo. Adicionado a docs/sinonimos.json, docs/componentes/README.md e removido de PENDENTES_MD. Comandos: npm run docs:registrar, npx tsc --noEmit, npm run docs:check, npm run test:unit (todos verdes).
- 2026-10-29 · antigravity · title registrado e declarado em docs/componentes/title.md com props (as, size), tamanhos h1-h6, estados, conteúdo, acessibilidade e exemplo mínimo desacoplando semântica de hierarquia visual. Adicionado a docs/sinonimos.json, docs/componentes/README.md e removido de PENDENTES_MD. Comandos: npm run docs:registrar, npx tsc --noEmit, npm run docs:check, npm run test:unit (todos verdes).
- 2026-10-29 · antigravity · Parado em direction: identificado conflito entre o lote (que lista direction como primitivo) e o ADR criterio-camadas.md / atomic-registry.ts (onde a lista de primitivos é fechada e direction é utilitySlug sem story, sem camada e sem tokens CSS, reprovando travas memoria-componentes.test.ts e component-docs.campos.test.ts). Aberta Decisão em Pré-requisitos com opções A/B/C; sinal alterado para 🟡 Aguardando definição e dono esvaziado.
- 2026-10-29 · claude · Fatiada: o lote fechou com `text` e `title` (escopo ajustado ao que entregou) e o `direction` virou [[H-memoria-direction]], com a Decisão que o AGY levantou (opções A/B/C). Conferido na integração (`feat/memoria-primitivos`): `npx tsc --noEmit` sem erro, `npm run test:unit` 1653 testes, `npm run docs:check` verde.

## Histórico
