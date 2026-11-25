---
tipo: historia
codigo: 04B
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: entregue
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-29
ciclo:
estimativa: 1
perfil: front
dono:
tarefas: 8/8
bloqueada-por:
criado: 2026-10-29
fechado: 2026-10-29
motivo-descarte:
origem: H-memoria-replicar-lotes
---

# Memória dos componentes: molecules, lote b

Fatia de [[H-memoria-replicar-lotes]] (Onda 2 da [[H-abas-padronizadas]]). Ordem por camada, decidida pelo Rafael em
2026-10-28; o Rafael revisa o texto depois (`status: piloto` até lá).

## Plano

Passar cada componente do lote pelo ciclo de memória, para a página `/components/<slug>` ficar completa como a do
Button: abas Visão geral, Exemplos, Código, Tokens e Acessibilidade, com "Quando NÃO usar" e Tokens por contexto.
Componentes do lote (molecules, lote b): `card`, `chip`, `collapsible`, `empty`, `field`, `hover-card`.

Siga `.claude/skills/componente-rds/SKILL.md` (caminho "existente sem MD", passos 3 a 6), `docs/componentes/_baliza.md` e
`_modelo.md`. Modelos prontos: `docs/componentes/button.md`, `tabs.md`, `dialog.md` e `separator.md`.

Para cada componente do lote:

1. `npm run docs:registrar -- <slug> --motivo "Primeiro registro (memoria-molecules-b)"`. Cria o MD, a coleta e o
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

Precisão: o MD não pode afirmar o que o código não faz. Em Acessibilidade, Estados e Conteúdo só descreva comportamento que
está no `.tsx`, na story ou herdado do Radix/biblioteca (confira no código). O que o **chamador** precisa fazer (`aria-hidden`,
`aria-label`, `aria-busy`…) entra como instrução ("passe `aria-label`"), nunca como se o componente já fizesse. Em "Quando NÃO usar"
e "NÃO faça", escreva o slug entre crases (`→ \`card\``). Não mude testes existentes além de tirar o slug de `PENDENTES_MD`; se um
teste parecer errado para o seu componente, registre como Decisão.

Fora do escopo: não altere `src/components/ui/*.tsx`. Se achar defeito no componente (texto em inglês, falta de
`aria-label`…), documente a armadilha em Cuidados e registre o defeito em `## Contribuições`. Se o registro reprovar com
"Token sem contexto", pare e registre como Decisão. Lacuna que a coleta deveria ter lido: anote em `## Contribuições`, não
em `_lacunas.md`.

Prova de pronto: `npx tsc --noEmit`, `npm run test:unit` e `npm run docs:check`, todos verdes.

## Pré-requisitos

Nenhum além dos bloqueadores.

## Tarefas

- [x] Registrar e declarar `card` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `chip` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `collapsible` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `empty` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `field` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `hover-card` (docs:registrar, intenção, vizinhos e referencias)
- [x] Encaixar o lote no README, no PENDENTES_MD e no sinonimos.json
- [x] Rodar tsc, test:unit e docs:check, todos verdes

## Contribuições

- 2026-10-29 · antigravity · Verificação completa: npx tsc --noEmit (0 erros), npm run test:unit (29 arquivos, 1908 testes verdes) e npm run docs:check (sincronia e memória verdes). Passada concluída.
- 2026-10-29 · antigravity · Encaixar o lote no README, no PENDENTES_MD e no sinonimos.json: 6 slugs adicionados a docs/componentes/README.md em ordem alfabética e removidos de PENDENTES_MD em src/lib/memoria-componentes.test.ts (sinônimos já mapeados); 463 testes de memória verdes.
- 2026-10-29 · antigravity · Registrar e declarar `hover-card`: `npm run docs:registrar -- hover-card`, MD declarado com intenção, vizinhos e referências (shadcn:hover-card), docs:check verde.
- 2026-10-29 · antigravity · Registrar e declarar `field`: `npm run docs:registrar -- field`, suporte a tipos com pipe dentro de crases em tabelas de registrar-componente/parse-component-md, MD declarado com intenção, vizinhos e referências (passi:campo-de-texto, shadcn:field), docs:check verde.
- 2026-10-29 · antigravity · Registrar e declarar `empty`: `npm run docs:registrar -- empty`, MD declarado com intenção, vizinhos e referências (passi:microtexto, shadcn:empty), docs:check verde.
- 2026-10-29 · antigravity · Registrar e declarar `collapsible`: `npm run docs:registrar -- collapsible`, MD declarado com intenção, vizinhos e referências (shadcn:collapsible), docs:check verde.
- 2026-10-29 · antigravity · Registrar e declarar `chip`: `npm run docs:registrar -- chip`, MD declarado com intenção, vizinhos e referências (passi:etiqueta, spec:chip), docs:check verde.
- 2026-10-29 · antigravity · Registrar e declarar `card`: `npm run docs:registrar -- card`, MD declarado com intenção, vizinhos e referências (passi:card, shadcn:card), docs:check verde.

- 2026-10-29 · claude · Entregue no PR #38 (montado a partir da main, só com código e docs; as notas de _trabalho/ não sobem para o GitHub). Verificado antes: tsc, test:unit e docs:check rodados por mim, e as páginas conferidas no navegador. Texto `piloto`, à espera da revisão do Rafael.

## Histórico
