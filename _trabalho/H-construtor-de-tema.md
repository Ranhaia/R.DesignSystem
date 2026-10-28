---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-Investigacao-Theming
status: entregue
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-28
ciclo:
estimativa: 3
perfil: front
dono:
tarefas: 6/6
bloqueada-por:
criado: 2026-10-28
fechado: 2026-10-28
motivo-descarte:
origem: E-memoria-componentes, ideia 1 do AIPIM (theme-builder), pedido do Rafael em 2026-10-28
---

# Construtor de tema do cliente

Uma tela no site do R.DS onde se digita a cor da marca de um cliente e se
vê, na hora, uma tela de exemplo com componentes reais, no claro e no
escuro, já com o tema dele. É o caso de uso principal do R.DS (protótipo
na identidade do cliente para teste de usabilidade), hoje só possível
editando `src/lib/cor/presets.ts` e rodando `npm run tokens:gerar`.

## Plano

**O que já existe e se reaproveita:**
- `gerarTema(fonte)` (`src/lib/cor/gerar.ts`) gera todos os tokens de cor dos dois modos a partir de uma cor só.
- O motor **já garante contraste AA para qualquer cor**: `gerar.test.ts` testa os 5 presets, 60 cores aleatórias e os extremos. Por isso a tela não precisa reprovar contraste, como faz a do AIPIM; ela mostra que passou.
- `src/lib/a11y/pares.ts` (os pares medidos) e `perfil.ts` (os pisos) dão a lista de checagens.

**O que o construtor acrescenta:**
1. **Daltonismo no motor.** Simular protanopia, deuteranopia e tritanopia (diferença de cor em OKLab, baliza do AIPIM em `tools/build_tokens.py`) para os pares que só a cor separa: `--destructive` × `--primary` (marca vermelha perto do vermelho de erro), `--chart-1` a `--chart-5` entre si e link × texto. Com teste sobre os 5 presets e as cores aleatórias do `gerar.test.ts`. **Se algum preset atual reprovar, para e vira Decisão** antes de mexer no motor.
2. **Fidelidade à marca.** Quando o motor troca a cor da marca para passar no contraste (ex.: usa o tom 40 em vez da cor digitada), a tela mostra lado a lado "sua cor" × "cor usada" e o porquê.
3. **A tela:** campo de cor (hex e seletor), modo nativo (claro ou escuro) e prévia isolada: o tema vale só na área de prévia, aplicado como variáveis CSS nos mesmos tokens. Nada de cor fixa fora de token.
4. **Painel de checagens:** contraste (todos passam, com a razão) e daltonismo (pode reprovar, com sugestão de ajuste).

Sugestão de lugar: `/fundamentos/cores/construtor`, com link na página de Cores.
Fora do escopo: raio e fonte (Decisão 2), uma cor por papel (o motor usa uma cor-fonte).

## Pré-requisitos

- [x] **Decisão** — O que sai do construtor.
      A) Só aplicar na hora, com a cor guardada no link (`?cor=E31A39`) → serve para protótipo e teste com cliente sem tocar no repositório; some quando fecha.
      B) Gerar o trecho para `presets.ts` (nome, cor, modo) para colar e rodar `tokens:gerar` → vira preset fixo do catálogo, mas exige commit.
      C) Os dois.
      Recomendo C: A atende a sessão de protótipo, e B é só copiar um texto quando o cliente vira preset. · pedido por: claude · 2026-10-28
      **Resolvido pelo Rafael em 2026-10-28: C, os dois.**
- [x] **Decisão** — Escopo do tema.
      A) Só cor → usa o motor como está; raio, sombra e fonte continuam dos 5 presets de estilo.
      B) Cor, raio e fonte → mais fiel à marca, mas mexe no sistema de presets de estilo e no `globals.css`.
      Recomendo A no primeiro corte, porque o motor de cor já está pronto e testado. · pedido por: claude · 2026-10-28
      **Resolvido pelo Rafael em 2026-10-28: A, só cor.**
- [x] **Decisão** — Quando a cor da marca não passa no contraste e o motor usa outra.
      A) Mostrar "sua cor" × "cor usada" e seguir com a usada → o protótipo continua AA.
      B) Deixar forçar a cor exata, com aviso → mais fiel ao cliente, mas o protótipo pode reprovar no teste com pessoas.
      Recomendo A porque o R.DS garante AA por construção, e B quebraria essa garantia. · pedido por: claude · 2026-10-28
      **Resolvido pelo Rafael em 2026-10-28: A, mostrar e seguir com a cor usada.**

## Tarefas

- [x] Daltonismo no motor: simulação, pares e teste sobre os presets e as cores aleatórias
- [x] Rota e entrada da cor (hex, seletor, modo nativo), com o tema gerado no navegador
- [x] Prévia isolada: tela de exemplo com `button`, `card`, `input`, `alert`, `tabs` e `badge`, no claro e no escuro
- [x] Painel de checagens: contraste, daltonismo e "sua cor × cor usada"
- [x] Saída conforme a Decisão 1
- [x] Prova: `test:unit`, `tsc` e navegador com a cor dos 5 presets e mais 2 cores de cliente

## Contribuições

- 2026-10-28 · claude · As 3 decisões foram fechadas pelo Rafael com as recomendações (saída C, escopo A, fidelidade A). Sinal 🟢. Aguarda o comando para entrar em execução.
- 2026-10-28 · claude · Rafael mandou começar. Branch `feat/construtor-de-tema`, empilhada sobre `feat/baliza-componentes` (PR #23 aberto).
- 2026-10-28 · claude · Daltonismo: `src/lib/cor/daltonismo.ts` (matrizes de Machado 2009 em sRGB linear; diferença em OKLab × 100; mínimo de 8 por par e 20 para link × texto, baliza do AIPIM). Verificador antes do código: 1ª execução vermelha por módulo ausente; 2ª com a matemática verde e os 5 presets reprovando (33 falhas). Parei antes de mexer no motor, como o plano previa: as falhas viraram catraca em `daltonismo.test.ts` e a correção virou [[H-presets-daltonismo]], com as 3 decisões já fechadas pelo Rafael. `vitest` do arquivo: 22/22.
- 2026-10-28 · antigravity · Lógica pura em `src/lib/cor/construtor.ts` (16/16 testes verdes), tela em `src/app/fundamentos/cores/construtor/page.tsx` e link na página de Cores (`src/app/fundamentos/cores/page.tsx`). Verificação completa com `vitest` (1217/1217 testes unitários passando) e `tsc` sem nenhum erro.
- 2026-10-28 · claude · Revisão do trabalho do AGY. Lógica fiel ao contrato do verificador (`construtor.test.ts`, escrito antes). Corrigido na tela: copiar mostrava sucesso mesmo quando falhava; a descrição prometia daltonismo "garantido"; dois `h1` na página; "Todas passam" fixo no código em vez de calculado; razão com ponto em vez de vírgula; visão "normal" em vez de "visão típica". Devolvi `dono` e as tarefas de tela ficaram sem `[x]` até a prova no navegador.
- 2026-10-28 · claude · Prova no navegador (dev server no worktree, webpack), lida pelo DOM, sem captura: nas 7 cores (5 presets, `#FFFF00`, `#0B8A4D`) o botão principal da prévia tem a mesma cor anunciada em "cor usada" nos dois modos, o contraste passa em todas e os grupos de daltonismo batem com o teste (default 2, editorial 5, tech 2, soft 4, midnight 2). O amarelo mostra "Cor adaptada" (`#626200`) com a explicação. Digitar a cor atualiza o link; nome de preset inválido desliga o botão de copiar. A prova também achou e corrigiu dois defeitos: a prévia nascia com a cor padrão e animava até a do link (agora a tela só se desenha depois de ler o link), e uma tentativa com `Suspense` deixava uma cópia escondida da tela (bloco `S:0` do streaming), revertida. Final: `vitest --project unit` 1217/1217, `tsc` sem erro.

## Histórico
