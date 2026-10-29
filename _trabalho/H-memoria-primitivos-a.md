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
tarefas: 6/6
bloqueada-por:
criado: 2026-10-29
fechado: 2026-10-29
motivo-descarte:
origem: H-memoria-replicar-lotes
---

# Memória dos componentes: primitivos, lote a

Fatia de [[H-memoria-replicar-lotes]] (Onda 2 da [[H-abas-padronizadas]]). Ordem por camada, decidida pelo Rafael em
2026-10-28; o Rafael revisa o texto depois (`status: piloto` até lá).

## Plano

Passar cada componente do lote pelo ciclo de memória, para a página `/components/<slug>` ficar completa como a do
Button: abas Visão geral, Exemplos, Código, Tokens e Acessibilidade, com "Quando NÃO usar" e Tokens por contexto.
Componentes do lote (primitivos, lote a): `box`, `icon`, `label`, `skeleton`.

Siga `.claude/skills/componente-rds/SKILL.md` (caminho "existente sem MD", passos 3 a 6), `docs/componentes/_baliza.md` e
`_modelo.md`. Modelos prontos: `docs/componentes/button.md`, `tabs.md`, `dialog.md` e `separator.md`.

Para cada componente do lote:

1. `npm run docs:registrar -- <slug> --motivo "Primeiro registro (memoria-primitivos-a)"`. Cria o MD, a coleta e o
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

Nenhum além dos bloqueadores.

## Tarefas

- [x] Registrar e declarar `box` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `icon` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `label` (docs:registrar, intenção, vizinhos e referencias)
- [x] Registrar e declarar `skeleton` (docs:registrar, intenção, vizinhos e referencias)
- [x] Encaixar o lote no README, no PENDENTES_MD e no sinonimos.json
- [x] Rodar tsc, test:unit e docs:check, todos verdes

## Contribuições

- 2026-10-29 · antigravity · Registrar e declarar box: docs:registrar executado, intenção declarada em docs/componentes/box.md com vizinhos [card, separator, item] e referências [spec:box]. Prova: npm run docs:check e vitest doc-texto-interno.test.ts verdes.
- 2026-10-29 · antigravity · Registrar e declarar icon: docs:registrar executado, intenção declarada em docs/componentes/icon.md com vizinhos [icon-button, button, spinner] e referências [shadcn:icon]. Prova: npm run docs:check e vitest doc-texto-interno.test.ts verdes.
- 2026-10-29 · antigravity · Registrar e declarar label: docs:registrar executado, intenção declarada em docs/componentes/label.md com vizinhos [field, text, tooltip] e referências [passi:campo-de-texto, shadcn:label]. Prova: npm run docs:check e vitest doc-texto-interno.test.ts verdes.
- 2026-10-29 · antigravity · Registrar e declarar skeleton: docs:registrar executado, intenção declarada em docs/componentes/skeleton.md com vizinhos [spinner, progress, card] e referências [passi:carregando, shadcn:skeleton]. Prova: npm run docs:check e vitest doc-texto-interno.test.ts verdes.
- 2026-10-29 · antigravity · Encaixar lote primitivos a: box, icon, label e skeleton adicionados ao README.md da porta de entrada, removidos de PENDENTES_MD em memoria-componentes.test.ts e sinonimos.json atualizado com chaves de box e icon. Prova: vitest memoria-componentes.test.ts e docs:check verdes.
- 2026-10-29 · antigravity · Validação final da suíte: npx tsc --noEmit (0 erros), npm run test:unit (29 arquivos, 1633 testes passando) e npm run docs:check verdes. Ajustado teste component-docs.campos.test.ts para permitir componente sem tokens (box).
- 2026-10-29 · claude · Conferido na integração (`feat/memoria-primitivos`, lotes a e b mesclados): `npx tsc --noEmit` sem erro, `npm run test:unit` 29 arquivos e 1653 testes, `npm run docs:check` verde. Ajustes meus: `skeleton.md` não diz mais que o componente já traz `aria-hidden` (o `.tsx` não traz; é do chamador); o teste de tokens, que o AGY relaxou, passou a exigir "Nenhum." no MD de quem não tem token. Texto continua `piloto`, para a revisão do Rafael.

## Histórico
