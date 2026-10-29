# Execução em paralelo: worktree + AGY + Opus

**Status:** provisório (2026-10-28), aguardando ratificação do Rafael. Ratificada, move para `docs/archive/decisoes/`.

Várias Histórias ao mesmo tempo, sem uma pisar na outra. Comandos em `node scripts/paralelo.mjs`; validação em
`src/lib/paralelo.test.ts`.

## Quem faz o quê

| Papel | Quem | Faz |
|---|---|---|
| Orquestrador | Claude Opus (sessão principal) | calcula ondas, cria worktrees, despacha, confere cada resultado, roda teste de navegador, integra |
| Executor | AGY (`implement`, via `agy:lead`) | implementa uma História dentro do próprio worktree, roda `tsc` e `test:unit`, commita no branch |
| Decide | Rafael | quais Histórias entram, decisões que o AGY levantar, aprovação de push e PR |

## Fluxo

1. **Soltar.** Rafael diz quais Histórias entram (protocolo, regra 1). O orquestrador roda
   `node scripts/paralelo.mjs plano <slug...>`: devolve as **ondas** pelo `bloqueada-por` e o motivo de quem fica
   fora (🟡, já entregue, com dono, bloqueador pendente).
2. **Criar.** `criar <slug...>` monta só a 1ª onda: `.worktrees/<slug>` no branch `feat/<slug>`, nascido do
   `origin/main` (o `main` local costuma estar atrás), `node_modules` ligado por junction, `.env.local` copiado e o
   brief em `.worktrees/<slug>.brief.md`.
3. **Marcar.** No worktree de cada História, o orquestrador põe `status: progresso` e `dono: antigravity`. O AGY
   só marca tarefas e escreve `## Contribuições` da própria História.
4. **Despachar.** `despachar <slug>` imprime o comando. O orquestrador roda cada um **do seu worktree** (o estado do
   job do AGY é por worktree), em segundo plano, e espera com `agy:jobs wait`, um `wait` por job.
5. **Conferir.** Antes de aceitar: `git diff origin/main...HEAD --stat`, `npx tsc --noEmit`, `npm run test:unit` e
   cruzar as Contribuições com o que foi de fato rodado. Lacuna vira `continue --job <id>`. Leitura de código não é
   prova (protocolo).
6. **Navegador.** Só o orquestrador roda `npm run test:a11y:todos`, **um worktree por vez**. A trava global fica no
   `tmpdir` e vale entre worktrees; recusou, espera.
7. **Integrar.** PR por branch, na ordem da onda, com OK do Rafael para push e PR. Integrou, a próxima onda nasce do
   `origin/main` novo. `limpar <slug>` move o worktree para `C:\dev\_pode-apagar` (nada se apaga).

## O que o desenho protege

- **RAM:** Chromium ~830 MB cada, uma execução por vez. O brief proíbe o AGY de rodar teste de navegador.
- **Conflito:** uma História por worktree, e cada uma edita só a própria nota em `_trabalho/`. Arquivos
  compartilhados (registries, `globals.css`) conflitam na integração: integre um por vez e rebaseie o seguinte.
- **Decisão:** o AGY não decide escopo nem visual; levanta `Decisão` no formato do protocolo e segue para outra tarefa.
- **Base velha:** worktree nunca nasce do `main` local.

## Limites conhecidos

- `node_modules` é compartilhado: dependência nova num worktree vale para todos. O brief manda o AGY parar e
  registrar `Decisão`.
- `limpar` recusa branch que foi para PR por squash e teve a branch remota apagada (não dá para provar que o
  conteúdo está no origin). Dê push de novo ou mova à mão.
- Servidor dev num worktree: o AGY relatou que o Turbopack (padrão do `next dev` e do `next build`) recusa a
  junction do `node_modules`, que aponta para fora da raiz. Confirmei só que `next dev --webpack` sobe e serve a
  página; não reproduzi o erro do Turbopack. Use `--webpack` em worktree. A porta 3000 é da `main`; use outra
  (ex.: 3101).
- Quantos worktrees ao mesmo tempo aguentam a máquina **não foi medido**. Comece com 2 ou 3.
- O script não dispara o AGY sozinho; o orquestrador roda o comando, para ter o job sob controle.
- `wait` com exit 2 quer dizer "ainda rodando": reabra a espera do mesmo job. Um job pode terminar com `status ERROR` (chamada de função malformada no fim) e mesmo assim entregar o texto e o commit; confira o commit e rode tudo por conta própria, sem confiar no relatório.
- O AGY não vê o navegador. O visual é do orquestrador: abra a página, teste a aba por hash e a largura de celular (375 px). Foi assim que apareceram a lista de abas vazando e o `= —` nas props.
- O teste do Checker tem de usar dado no formato real do repositório. Um teste com nome de exemplo inventado (PascalCase, quando o dado é kebab-case) passou, e só o navegador mostrou o erro.
- Datas gravadas em nota e em `_pode-apagar` são as **locais** (UTC-3), não as UTC.
