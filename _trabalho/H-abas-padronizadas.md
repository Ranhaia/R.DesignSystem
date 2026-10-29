---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: progresso
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-29
ciclo:
estimativa: 2
perfil: front
dono: claude
tarefas: 5/5
bloqueada-por:
criado: 2026-10-29
fechado:
motivo-descarte:
origem:
---

# Abas da página do componente padronizadas

A lista de abas de `/components/<slug>` mostra uma barra de rolagem vertical, e as linhas de Anatomia, Estados,
Acessibilidade e Tokens são markup repetido, cada uma de um jeito. Esta História deixa as abas num formato só e tira
da tela o que é parâmetro interno. É a **Onda 1**; a Onda 2 (os 75 componentes sem MD) é
[[H-memoria-replicar-lotes]], que só começa depois desta.

## Plano

1. **Abas sem scroll.** Causa medida no navegador: o wrapper de `doc-tabs.tsx` usa `overflow-x-auto`, o que força
   `overflow-y: auto`; a lista tem 36 px (`h-9`) e o sublinhado da aba ativa (`after:-bottom-1.25`) passa 3 px. A
   lista passa a ter a altura do conteúdo, com o sublinhado e o anel de foco dentro dela. Em 375 px a rolagem
   horizontal só aparece se as abas não couberem; a vertical nunca.
2. **Uma linha só.** Um `DocLinhas` (rótulo à esquerda, valor à direita) em `src/components/doc/`, usado por
   Anatomia, Estados, Acessibilidade e Tokens.
3. **Tokens por contexto**, uma linha por contexto, no mesmo formato da Acessibilidade (`- **Cor:** …`): Cor,
   Tipografia, Espaço, Raio, Sombra, Movimento, Foco e Ícone. O coletor classifica (única fonte) e passa a ler também
   a escala do Tailwind (`text-sm`, `p-3`, `gap-2`). `ComponentDoc.tokens` vira lista de `{contexto, itens}`.
4. **Limpeza e trava.** O aviso "Em revisão: o PASSI…" sai das variantes `ai-*` do Button e vai para
   [[E-memoria-componentes]]; o status `piloto` deixa de aparecer na faixa. Um teste reprova `PASSI`, `Em revisão`,
   `⚠️` e `atrito` em qualquer campo exibido de `ComponentDoc`. O crédito do PASSI (CC BY 4.0) fica nos docs
   internos, porque a licença exige; só sai da tela.

Fora do escopo: cópias nos outros projetos (decisão 5 do Épico); a Onda 2.

## Pré-requisitos

- [x] **Decisão** — onde ficam os tokens do anel de foco (`ring-*`, `outline-*`).
      A) Linha própria "Foco" → espelha a linha Foco da aba Acessibilidade.
      B) Dentro de "Cor" → uma linha a menos, mas o anel se mistura com fundo e texto.
      **Resolvido pelo Rafael em 2026-10-29: A.**
- [x] **Decisão** — Tipografia e Espaço incluem a escala do Tailwind?
      A) Sim → a regra "só token" manda usar essa escala; sem ela, Tipografia fica quase vazia.
      B) Só tokens nomeados no CSS → menos ruído, mas as duas linhas quase não aparecem.
      **Resolvido pelo Rafael em 2026-10-29: A.**
- [x] **Decisão** — quando soltar a Onda 2.
      A) Depois desta pronta → o formato do MD muda aqui; replicar antes obrigaria a refazer 75 MDs.
      B) Em paralelo → ganha tempo e arrisca retrabalho.
      **Resolvido pelo Rafael em 2026-10-29: A.**
- [x] **Decisão** — modo de condução.
      **Resolvido pelo Rafael em 2026-10-29: Loop Engineering** (testes antes do código, até 5 tentativas por falha).

## Tarefas

- [x] Checker: testes da lista sem overflow vertical, do classificador de token, do parser e gerador de Tokens por contexto e da trava de texto proibido
- [x] Abas sem scroll (`doc-tabs.tsx`; `tabs.tsx` do DS ficou como estava)
- [x] `DocLinhas` único e Tokens por contexto (coletor, parser, gerador, modelo e página)
- [x] Limpar PASSI, "Em revisão" e `piloto` da tela, com a trava
- [x] Conferir no navegador (1024 px e 375 px) em button, dialog e separator

## Contribuições

- 2026-10-29 · claude · Diagnóstico feito e medido: scroll vertical de 3 px (altura 36, conteúdo 39) no wrapper das abas; só 4 dos 79 componentes têm as abas Tokens e Acessibilidade; o coletor já lê tokens dos 79 sem falha. Branch `feat/abas-padronizadas`, a partir do `origin/main`.
- 2026-10-29 · claude · Checker escrito antes do código: `npx vitest run --project unit` deu 16 testes vermelhos em 6 arquivos (classificador, parser, registro, coletor, `faixaMeta`, trava de texto, trava do wrapper).
- 2026-10-29 · claude · Abas: wrapper com `overflow-x-auto overflow-y-hidden p-1`. Medido no navegador: antes altura 36 e conteúdo 39 (barra vertical); depois 44 e 44, em 1024 px e em 375 px (rolagem só horizontal, 447 de conteúdo em 343), com o anel de foco inteiro à vista por teclado.
- 2026-10-29 · claude · `DocLinhas` (`src/components/doc/doc-linhas.tsx`) em Anatomia, Estados, Acessibilidade e Tokens; rótulo com a mesma largura (160 px) nas linhas de Tokens e de Acessibilidade, conferido no navegador. Tokens agrupados por `scripts/contexto-token.mjs`, que o coletor, o registro e o teste dos 79 componentes usam; `docs:registrar` rodou nos 4 MDs e `npm run docs:check` passou.
- 2026-10-29 · claude · Limpeza: variantes `ai-*` do Button sem o aviso (texto novo: "Ação principal/secundária que dispara IA"); ⚠️ e "Até corrigir" fora do Cuidados do Dialog; `piloto` fora da faixa (separator conferido no navegador). Trava em `src/lib/doc-texto-interno.test.ts` e regra na `_baliza.md`. Crédito do PASSI mantido nos docs internos.
- 2026-10-29 · claude · Prova final: `npx tsc --noEmit` sem erro, `npx vitest run --project unit` 29 arquivos e 1593 testes verdes, `npm run docs:check` verde. Não rodei `test:a11y:todos` (nenhum componente de `src/components/ui/` mudou). Achado fora do escopo: o `Dialog` ainda anuncia "Close" em inglês (X e botão do footer); é defeito do componente, não de documentação.

## Histórico
