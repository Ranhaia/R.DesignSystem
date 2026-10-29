---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-documentacao-ds
status: entregue
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-08-23
ciclo:
estimativa: 1
perfil: front
dono:
tarefas: 4/4
criado: 2026-08-23
fechado: 2026-10-28
motivo-descarte:
origem:
---

# Validar a página de documentação do Button

O código do piloto foi escrito mas **nunca teve o build verificado**. O
sandbox reiniciou no meio e o `tsc` estourou o timeout — não há
confirmação de que compila.

## Plano

Rodar direto na máquina, que é mais rápido que o sandbox:

```bash
npx tsc --noEmit
```

Depois abrir `/components/button` e conferir visualmente.

Pontos que o plano antigo marcou como suspeitos:

- **Seção Variantes** — os 6 botões renderizam? O valor foi passado como
  `v.value as never` para caber na prop tipada `variant`. Funciona em
  runtime; conferir se o TS reclama.
- **Playground** — troca de variant e size, toggles de disabled e
  loading.
- **Tabela de Propriedades** — renderiza sem quebrar layout.

Esta História desbloqueia todo o resto do Épico: enquanto não se sabe se
compila, não faz sentido replicar o template para 59 componentes.

## Pré-requisitos

Nenhum.

## Tarefas

- [x] Rodar `npx tsc --noEmit` e registrar o resultado
- [x] Corrigir os erros que aparecerem
- [x] Conferir `/components/button` visualmente nos 3 pontos suspeitos
- [x] Registrar o que quebrou, se quebrou

## Contribuições

- 2026-10-28 · antigravity · Rodou `npx tsc --noEmit`. Resultado: 0 erros (TypeScript: No errors found).
- 2026-10-28 · antigravity · Verificação de erros: 0 erros encontrados no tsc; nenhuma correção de código necessária.
- 2026-10-28 · antigravity · Conferência dos 3 pontos suspeitos via SSR (react-dom/server) e HTML estático gerado (.next/server/app/components/button.html): Seção Variantes renderiza 8 botões reais sem queixa do TS; Playground renderiza com seletores e toggles; Tabela de Propriedades renderiza 11 linhas com overflow-x-auto. Leitura de código não é prova: inspeção visual em tela com servidor dev ativo reservada ao orquestrador (Regra 4 proíbe dev server no worktree).
- 2026-10-28 · antigravity · Registro de integridade: nada quebrou na página do Button. npx tsc --noEmit passou limpo (0 erros), npm run test:unit passou 100% (1217 testes), e o build com webpack gerou o HTML estático com sucesso (238 KB). Turbopack nativo acusa erro de symlink em node_modules no Windows (C:\node_modules_store), mas via --webpack o build compila sem erros.
- 2026-10-28 · claude (orquestrador) · Reconferi `tsc` (0 erros), `npm run test:unit` (1217 testes) e `npm run docs:check` no worktree. Conferência visual no navegador, com `next dev --webpack` na porta 3101: Variantes, 8 botões com o visual certo; Playground, variante (destructive), tamanho (lg, 48 px contra 40 px do padrão), Disabled (opacidade 0,5, sem clique) e Loading (spinner) respondem; Propriedades, 11 linhas sem estourar a página no desktop e rolando dentro da própria caixa em 375 px. Fora do escopo, sem decidir: o Playground oferece 6 das 8 variantes (sem `ai-primary` e `ai-secondary`) e 8 dos 12 tamanhos (sem `md`, `xl`, `icon-md`, `icon-xl`).
- 2026-10-28 · claude · Entregue. PR #25 mesclado pelo Rafael em 2026-10-28. As 4 tarefas têm prova de execução nas Contribuições acima: `tsc`, `npm run test:unit`, `npm run docs:check` e a conferência no navegador (Variantes, Playground e tabela de Propriedades). O relato do AGY sobre o Turbopack e a junction do `node_modules` não foi reproduzido: só se confirmou que `next dev --webpack` sobe.

## Histórico
