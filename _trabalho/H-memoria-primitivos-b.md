---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: progresso
sinal: 🟡 Aguardando definição
sinal-desde: 2026-10-29
ciclo:
estimativa: 1
perfil: front
dono:
tarefas: 2/5
bloqueada-por:
criado: 2026-10-29
fechado:
motivo-descarte:
origem: H-memoria-replicar-lotes
---

# Memória dos componentes: primitivos, lote b

Fatia de [[H-memoria-replicar-lotes]] (Onda 2 da [[H-abas-padronizadas]]). Ordem por camada, decidida pelo Rafael em
2026-10-28; o Rafael revisa o texto depois (`status: piloto` até lá).

## Plano

Passar cada componente do lote pelo ciclo de memória, para a página `/components/<slug>` ficar completa como a do
Button: abas Visão geral, Exemplos, Código, Tokens e Acessibilidade, com "Quando NÃO usar" e Tokens por contexto.
Componentes do lote (primitivos, lote b): `text`, `title`, `direction`.

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

- [ ] **Decisão** — como tratar o componente `direction` no ciclo de memória de componentes?
      Contexto: `H-memoria-primitivos-b` incluiu `direction` como primitivo do lote b. Porém, o ADR ratificado `criterio-camadas.md` definiu lista fechada de 7 primitivos (`icon`, `label`, `skeleton`, `separator`, `text`, `title`, `box`), mantendo `direction` como `utilitySlugs = ["direction"]` (infraestrutura sem UI visual). Além disso, `direction` não possui `direction.stories.tsx` nem tokens CSS (`Tokens usados: Nenhum.`), o que reprova a trava de campos (`component-docs.campos.test.ts:163`) e a trava de memória (`memoria-componentes.test.ts:432/434`).
      A) Manter Direction como utilitário de infraestrutura (`utilitySlugs`) e adaptar a esteira/travas (`memoria-componentes.test.ts` e `component-docs.campos.test.ts`) para suportar componentes utilitários (camada opcional/utility, story opcional e tokens opcionais).
      B) Promover Direction a primitivo formal do Design System, adicionando `direction: "primitive"` ao `atomicRegistry` (atualizando `criterio-camadas.md`), criando `src/components/ui/direction.stories.tsx` e ajustando a asserção de tokens no teste para componentes com 0 tokens.
      C) Retirar Direction do escopo deste lote de primitivos (concluindo `H-memoria-primitivos-b` com `text` e `title`, que já estão verdes e validados) e tratar Direction em lote específico de utilitários de infraestrutura.
      Recomendo C se o objetivo for manter a lista fechada de primitivos e destravar a Onda 2 imediatamente, ou A se o objetivo for documentar Direction sem redefinir o Atomic Design. · pedido por: antigravity · 2026-10-29

## Tarefas

- [x] Registrar e declarar `text` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `title` (docs:registrar, intenção, vizinhos e referencias)
- [ ] Registrar e declarar `direction` (docs:registrar, intenção, vizinhos e referencias)
- [ ] Encaixar o lote no README, no PENDENTES_MD e no sinonimos.json
- [ ] Rodar tsc, test:unit e docs:check, todos verdes

## Contribuições

- 2026-10-29 · antigravity · text registrado e declarado em docs/componentes/text.md com props, tamanhos, estados, conteúdo, acessibilidade (4 chaves) e exemplo mínimo. Adicionado a docs/sinonimos.json, docs/componentes/README.md e removido de PENDENTES_MD. Comandos: npm run docs:registrar, npx tsc --noEmit, npm run docs:check, npm run test:unit (todos verdes).
- 2026-10-29 · antigravity · title registrado e declarado em docs/componentes/title.md com props (as, size), tamanhos h1-h6, estados, conteúdo, acessibilidade e exemplo mínimo desacoplando semântica de hierarquia visual. Adicionado a docs/sinonimos.json, docs/componentes/README.md e removido de PENDENTES_MD. Comandos: npm run docs:registrar, npx tsc --noEmit, npm run docs:check, npm run test:unit (todos verdes).
- 2026-10-29 · antigravity · Parado em direction: identificado conflito entre o lote (que lista direction como primitivo) e o ADR criterio-camadas.md / atomic-registry.ts (onde a lista de primitivos é fechada e direction é utilitySlug sem story, sem camada e sem tokens CSS, reprovando travas memoria-componentes.test.ts e component-docs.campos.test.ts). Aberta Decisão em Pré-requisitos com opções A/B/C; sinal alterado para 🟡 Aguardando definição e dono esvaziado.

## Histórico
