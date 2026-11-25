---
tipo: historia
codigo: 047
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

# Memória dos componentes: atoms, lote c

Fatia de [[H-memoria-replicar-lotes]] (Onda 2 da [[H-abas-padronizadas]]). Ordem por camada, decidida pelo Rafael em
2026-10-28; o Rafael revisa o texto depois (`status: piloto` até lá).

## Plano

Passar cada componente do lote pelo ciclo de memória, para a página `/components/<slug>` ficar completa como a do
Button: abas Visão geral, Exemplos, Código, Tokens e Acessibilidade, com "Quando NÃO usar" e Tokens por contexto.
Componentes do lote (atoms, lote c): `native-select`, `popover`, `progress`, `radio-group`, `select`, `slider`.

Siga `.claude/skills/componente-rds/SKILL.md` (caminho "existente sem MD", passos 3 a 6), `docs/componentes/_baliza.md` e
`_modelo.md`. Modelos prontos: `docs/componentes/button.md`, `tabs.md`, `dialog.md` e `separator.md`.

Para cada componente do lote:

1. `npm run docs:registrar -- <slug> --motivo "Primeiro registro (memoria-atoms-c)"`. Cria o MD, a coleta e o
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

- [x] Registrar e declarar `native-select` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `popover` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `progress` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `radio-group` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `select` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `slider` (docs:registrar, intenção, vizinhos e referencias)
- [x] Encaixar o lote no README, no PENDENTES_MD e no sinonimos.json
- [x] Rodar tsc, test:unit e docs:check, todos verdes

## Contribuições

- 2026-10-29 · antigravity · Registrar e declarar native-select: docs:registrar executado, intenção declarada em docs/componentes/native-select.md com vizinhos [select, radio-group, combobox] e referências [passi:selecao, shadcn:native-select]. Prova: npm run docs:check e vitest doc-texto-interno.test.ts verdes.
- 2026-10-29 · antigravity · Registrar e declarar popover: docs:registrar executado, intenção declarada em docs/componentes/popover.md com vizinhos [tooltip, dialog, dropdown-menu] e referências [passi:popover, shadcn:popover]. Prova: npm run docs:check e vitest memoria-componentes (popover) verdes.
- 2026-10-29 · antigravity · Registrar e declarar progress: docs:registrar executado, intenção declarada em docs/componentes/progress.md com vizinhos [spinner, skeleton, stepper] e referências [passi:barra-de-progresso, shadcn:progress]. Prova: npm run docs:check e vitest memoria-componentes (progress) verdes.
- 2026-10-29 · antigravity · Registrar e declarar radio-group: docs:registrar executado, intenção declarada em docs/componentes/radio-group.md com vizinhos [checkbox, select, segmented-control] e referências [passi:radio, shadcn:radio-group]. Prova: npm run docs:check e vitest memoria-componentes (radio-group) verdes.
- 2026-10-29 · antigravity · Registrar e declarar select: docs:registrar executado, intenção declarada em docs/componentes/select.md com vizinhos [native-select, combobox, radio-group, dropdown-menu] e referências [passi:selecao, shadcn:select]. Prova: npm run docs:check e vitest memoria-componentes (select) verdes.
- 2026-10-29 · antigravity · Registrar e declarar slider: docs:registrar executado, intenção declarada em docs/componentes/slider.md com vizinhos [input, select, progress] e referências [passi:controle-deslizante, shadcn:slider]. Prova: npm run docs:check e vitest memoria-componentes (slider) verdes.
- 2026-10-29 · antigravity · Encaixar lote atoms c: native-select, popover, progress, radio-group, select e slider adicionados ao README.md da porta de entrada, removidos de PENDENTES_MD em memoria-componentes.test.ts e sinonimos.json verificado. Prova: vitest memoria-componentes.test.ts e docs:check verdes.
- 2026-10-29 · antigravity · Validação final do lote atoms c: npx tsc --noEmit (sem erros), npm run test:unit (29 arquivos, 1713 testes verdes) e npm run docs:check verdes. Passada concluída.

- 2026-10-29 · claude · Entregue no PR #37 (montado a partir da main, só com código e docs; as notas de _trabalho/ não sobem para o GitHub). Verificado antes: tsc, test:unit e docs:check rodados por mim, e as páginas conferidas no navegador. Texto `piloto`, à espera da revisão do Rafael.

## Histórico
