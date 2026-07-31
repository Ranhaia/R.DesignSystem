# Reorganização da Estrutura de Pastas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganizar a raiz do projeto (`.build/`, `.review/`, os `PLANO-*.md`, `TAXONOMIA-COMPONENTES.md`) numa estrutura `docs/active/` + `docs/archive/` + `plans/current/` + `plans/done/` que permite carregar só o contexto relevante por tipo de tarefa, sem precisar apontar a pasta inteira. Aplicar a regra de retenção: só ficam documentados decisão de design (ADR), plano finalizado (resumo) ou especificação criada/alterada — tentativas, rascunhos e exploração descartada saem.

**Architecture:** Esta é uma reorganização mecânica de arquivos (`git mv` + edição de referências), não uma mudança de código de produção. `src/` não é tocado, exceto 2 comentários em `globals.css` que citam o caminho antigo de um plano. Os pipelines `/construir-telas` e `/revisar-ds` (11 arquivos de agente/comando em `.claude/`) escrevem hoje direto em `.build/`/`.review/` — este plano atualiza esses caminhos para que os próximos runs já escrevam no lugar certo, e adiciona ao `telas-revisor` um passo de "graduação" (`docs/active/telas/<slug>/` → `docs/archive/telas/<slug>/` quando o veredito for "pronta"), pra estrutura não voltar a acumular bagunça sozinha.

**Tech Stack:** Bash (`git mv`, `mkdir`), Markdown, Grep/Edit para referências cruzadas. Ambiente Windows com Git Bash disponível via a tool `Bash`.

## Global Constraints

- Nunca usar `git add -A`/`git add .` — sempre listar arquivos por nome (há mudanças não relacionadas já pendentes no repo: `package.json`, componentes `src/app/fundamentos/*`, etc. — não misturar no commit desta reorganização).
- Nunca commitar sem pedido explícito do Rafael — as tasks abaixo terminam em "Commit" porque este plano assume que ele já pediu a reorganização; se estiver rodando isso via `executing-plans`/`subagent-driven-development` fora dessa conversa, confirme antes do primeiro commit.
- `git mv` preserva histórico — nada aqui é destrutivo de verdade (recuperável via `git log`/`git show`), mas trate como irreversível-de-fato: não pule a checagem de "nenhuma referência quebrada" no final de cada task.
- Todo caminho citado abaixo é exato (checado por `Read`/`Grep` antes de escrever este plano) — se algo não bater ao executar, pare e não improvise.
- `src/`, `README.md`, `components.json`, `TAXONOMIA-COMPONENTES.md` (conteúdo) não mudam — só o **caminho** de `TAXONOMIA-COMPONENTES.md` muda.

---

## Visão da estrutura final

```
docs/
  active/
    especificacoes/
      taxonomia-componentes.md
    decisoes/
      decisoes-provisorias-loop-80-20.md
    revisao-ds/
      auditoria.md
      comparativo.md
      acessibilidade.md
      diagnostico.md
    telas/          (vazio agora — próxima tela em construção entra aqui)
    componentes/    (vazio agora — próximo componente em construção entra aqui)
  archive/
    telas/
      login-simples/{spec.md, acessibilidade.md, diagnostico.md}
      login-erro-validacao/{spec.md, acessibilidade.md, diagnostico.md}
      recuperacao-senha/{spec.md, acessibilidade.md, diagnostico.md}
      selecao-perfil-corretora/{spec.md, acessibilidade.md, diagnostico.md}
      onboarding/{spec.md, acessibilidade.md, diagnostico.md}
      apolices-ativas/{spec.md, acessibilidade.md, diagnostico.md}
      novo-sinistro/{spec.md, acessibilidade.md, diagnostico.md, mobile.md}
      painel-corretor/{spec.md, acessibilidade.md, diagnostico.md}
      retroativo-mobile.md
    componentes/
      chip/{spec.md, acessibilidade.md}
      text/spec.md, box/spec.md, link/spec.md, title/spec.md, tag/spec.md,
      list/spec.md, thumbnail/spec.md, icon-button/spec.md,
      file-uploader/spec.md, stepper/spec.md, segmented-control/spec.md,
      split-button/spec.md, time-picker/spec.md, multi-select/spec.md
    decisoes/
      pendencias-fase5.md
plans/
  current/
    loop-80-20-templates.md   (era PLANO-LOOP-80-20-TEMPLATES.md, sem o Log)
    design-system-piloto.md    (era PLANO-DESIGN-SYSTEM.md)
  done/
    loop-80-20-log-resumo.md    (resumo condensado do Log removido acima)
```

`tokens/` e `components/`, citados no seu pedido original, **não viram pastas próprias**: já existem — `tokens/` é `src/app/globals.css`, `components/` é `src/components/ui/`. Criar pastas duplicadas fragmentaria a fonte da verdade. A "receita de contexto por tarefa" (task final deste plano, dentro do `CLAUDE.md`) aponta pra esses caminhos reais.

---

### Task 1: Criar o esqueleto de pastas novo

**Files:**
- Create: `docs/active/especificacoes/`, `docs/active/decisoes/`, `docs/active/revisao-ds/`, `docs/active/telas/.gitkeep`, `docs/active/componentes/.gitkeep`, `docs/archive/telas/`, `docs/archive/componentes/`, `docs/archive/decisoes/`, `plans/current/`, `plans/done/`

- [ ] **Step 1: Criar os diretórios**

```bash
mkdir -p "docs/active/especificacoes" "docs/active/decisoes" "docs/active/revisao-ds" \
         "docs/active/telas" "docs/active/componentes" \
         "docs/archive/telas" "docs/archive/componentes" "docs/archive/decisoes" \
         "plans/current" "plans/done"
```

- [ ] **Step 2: Criar os `.gitkeep` das pastas que ficam vazias por enquanto**

```bash
touch "docs/active/telas/.gitkeep" "docs/active/componentes/.gitkeep"
```

- [ ] **Step 3: Verificar**

```bash
find docs plans -type d
```

Esperado: as 10 pastas do Step 1 listadas.

- [ ] **Step 4: Commit**

```bash
git add docs/active/telas/.gitkeep docs/active/componentes/.gitkeep
git commit -m "chore: criar esqueleto de docs/active, docs/archive e plans"
```

(As outras pastas ainda não têm arquivo versionável — `git add` de diretório vazio não faz nada; elas entram no commit da task que primeiro colocar um arquivo nelas.)

---

### Task 2: Migrar as 8 telas de `.build/telas/` para `docs/archive/telas/<slug>/`

Todas as 8 telas do fluxo (login, recuperação de senha, seleção de perfil, onboarding, apólices, novo sinistro, painel do corretor) têm diagnóstico fechado ("pronta") — ver `.build/telas/PENDENCIAS.md`, Fase 5A e 5B fechadas. Por isso vão direto para `archive`, não para `active`.

**Files:**
- Move (com rename): os 25 arquivos de tela abaixo.

- [ ] **Step 1: Criar as 8 subpastas e mover com `git mv`**

```bash
for slug in login-simples login-erro-validacao recuperacao-senha selecao-perfil-corretora onboarding apolices-ativas novo-sinistro painel-corretor; do
  mkdir -p "docs/archive/telas/$slug"
  git mv ".build/telas/$slug.md"              "docs/archive/telas/$slug/spec.md"
  git mv ".build/telas/acessibilidade-$slug.md" "docs/archive/telas/$slug/acessibilidade.md"
  git mv ".build/telas/diagnostico-$slug.md"    "docs/archive/telas/$slug/diagnostico.md"
done
git mv ".build/telas/mobile-novo-sinistro.md" "docs/archive/telas/novo-sinistro/mobile.md"
```

- [ ] **Step 2: Verificar — nenhum arquivo de tela deve sobrar em `.build/telas/` exceto `RETROATIVO-MOBILE.md` e `PENDENCIAS.md`**

```bash
ls .build/telas/
```

Esperado: só `RETROATIVO-MOBILE.md` e `PENDENCIAS.md`.

```bash
find docs/archive/telas -type f | wc -l
```

Esperado: `25` (24 dos 8 trios + 1 `mobile.md` extra do novo-sinistro).

- [ ] **Step 3: Commit**

```bash
git add docs/archive/telas
git commit -m "chore: arquivar specs/diagnosticos das 8 telas da Fase 5 em docs/archive/telas"
```

---

### Task 3: Migrar `RETROATIVO-MOBILE.md` e `PENDENCIAS.md`

**Files:**
- Move: `.build/telas/RETROATIVO-MOBILE.md` → `docs/archive/telas/retroativo-mobile.md`
- Move: `.build/telas/PENDENCIAS.md` → `docs/archive/decisoes/pendencias-fase5.md`

- [ ] **Step 1: Mover**

```bash
git mv ".build/telas/RETROATIVO-MOBILE.md" "docs/archive/telas/retroativo-mobile.md"
git mv ".build/telas/PENDENCIAS.md" "docs/archive/decisoes/pendencias-fase5.md"
```

- [ ] **Step 2: Verificar que `.build/telas/` ficou vazio**

```bash
ls .build/telas/ 2>&1
```

Esperado: erro "no such file or directory" (a pasta some quando fica vazia) ou listagem vazia.

- [ ] **Step 3: Commit**

```bash
git add docs/archive/telas/retroativo-mobile.md docs/archive/decisoes/pendencias-fase5.md
git commit -m "chore: arquivar RETROATIVO-MOBILE e PENDENCIAS da Fase 5"
```

---

### Task 4: Migrar os 15 componentes de `.build/componentes/` para `docs/archive/componentes/<slug>/`

Os 15 componentes da Fase 6.1 e o ajuste de contraste da Fase 6.2 já estão commitados (`0da08d1`, `20c99eb`) — trabalho fechado, vai para `archive`.

**Files:**
- Move (com rename): os 16 arquivos abaixo (chip tem 2, os outros 14 têm 1).

- [ ] **Step 1: Mover `chip` (único com auditoria de acessibilidade)**

```bash
mkdir -p "docs/archive/componentes/chip"
git mv ".build/componentes/chip.md" "docs/archive/componentes/chip/spec.md"
git mv ".build/componentes/acessibilidade-chip.md" "docs/archive/componentes/chip/acessibilidade.md"
```

- [ ] **Step 2: Mover os outros 14 (1 arquivo cada)**

```bash
for slug in text box link title tag list thumbnail icon-button file-uploader stepper segmented-control split-button time-picker multi-select; do
  mkdir -p "docs/archive/componentes/$slug"
  git mv ".build/componentes/$slug.md" "docs/archive/componentes/$slug/spec.md"
done
```

- [ ] **Step 3: Verificar — `.build/` inteiro deve deixar de existir**

```bash
find docs/archive/componentes -type f | wc -l
```

Esperado: `16`.

```bash
ls .build 2>&1
```

Esperado: erro "no such file or directory" (pasta vazia removida) — se `.build/` ainda existir com algo dentro, pare e investigue antes de seguir (pode ter sobrado arquivo que este plano não previu).

- [ ] **Step 4: Commit**

```bash
git add docs/archive/componentes
git commit -m "chore: arquivar specs dos 15 componentes da Fase 6.1/6.2 em docs/archive/componentes"
```

---

### Task 5: Migrar `.review/` para `docs/active/revisao-ds/`

Os 4 arquivos de `.review/` são sempre sobrescritos no próximo `/revisar-ds` — ficam em `active` (diagnóstico vivo do design system), não em `archive`.

**Files:**
- Move: `.review/auditoria.md`, `.review/comparativo.md`, `.review/acessibilidade.md`, `.review/diagnostico.md` → `docs/active/revisao-ds/` (mesmo nome de arquivo).

- [ ] **Step 1: Mover**

```bash
git mv ".review/auditoria.md" "docs/active/revisao-ds/auditoria.md"
git mv ".review/comparativo.md" "docs/active/revisao-ds/comparativo.md"
git mv ".review/acessibilidade.md" "docs/active/revisao-ds/acessibilidade.md"
git mv ".review/diagnostico.md" "docs/active/revisao-ds/diagnostico.md"
```

- [ ] **Step 2: Verificar**

```bash
ls .review 2>&1
find docs/active/revisao-ds -type f
```

Esperado: `.review` não existe mais; `docs/active/revisao-ds` lista os 4 arquivos.

- [ ] **Step 3: Commit**

```bash
git add docs/active/revisao-ds
git commit -m "chore: mover .review para docs/active/revisao-ds"
```

---

### Task 6: Migrar `TAXONOMIA-COMPONENTES.md` e corrigir suas 2 referências dentro do plano ativo

**Files:**
- Move: `TAXONOMIA-COMPONENTES.md` → `docs/active/especificacoes/taxonomia-componentes.md`
- Modify: `PLANO-LOOP-80-20-TEMPLATES.md:400,851,860` (referências ao caminho antigo — dentro da parte "current" do arquivo, linhas 1–453, que a Task 8 ainda vai mover pra `plans/current/`; corrija aqui, antes da Task 8, para não perder o rastro)

- [ ] **Step 1: Mover**

```bash
git mv "TAXONOMIA-COMPONENTES.md" "docs/active/especificacoes/taxonomia-componentes.md"
```

- [ ] **Step 2: Corrigir as 3 referências em `PLANO-LOOP-80-20-TEMPLATES.md`**

Linha 400 (dentro da Fase 6, checklist): trocar `TAXONOMIA-COMPONENTES.md` por `docs/active/especificacoes/taxonomia-componentes.md`.

Linhas 851 e 860 (dentro da Fase 6, subseção da taxonomia por função): mesma troca.

Use `Edit` com `replace_all: true` no arquivo `PLANO-LOOP-80-20-TEMPLATES.md`, substituindo a string literal `` `TAXONOMIA-COMPONENTES.md` `` por `` `docs/active/especificacoes/taxonomia-componentes.md` ``.

- [ ] **Step 3: Verificar que não sobrou referência ao caminho antigo fora de arquivos já arquivados**

```bash
grep -rn "TAXONOMIA-COMPONENTES.md" --include="*.md" --include="*.ts" --include="*.tsx" --include="*.css" . \
  --exclude-dir=node_modules --exclude-dir=docs
```

Esperado: nenhum resultado (o único arquivo fora de `docs/` que citava o nome era `PLANO-LOOP-80-20-TEMPLATES.md`, já corrigido).

- [ ] **Step 4: Commit**

```bash
git add docs/active/especificacoes/taxonomia-componentes.md PLANO-LOOP-80-20-TEMPLATES.md
git commit -m "chore: mover TAXONOMIA-COMPONENTES.md para docs/active/especificacoes e atualizar referencias"
```

---

### Task 7: Migrar `PLANO-DESIGN-SYSTEM.md` e corrigir suas referências ao outro plano

**Files:**
- Move: `PLANO-DESIGN-SYSTEM.md` → `plans/current/design-system-piloto.md`
- Modify: o próprio arquivo, linhas 88–89 (referências a `PLANO-LOOP-80-20-TEMPLATES.md`)

- [ ] **Step 1: Mover**

```bash
git mv "PLANO-DESIGN-SYSTEM.md" "plans/current/design-system-piloto.md"
```

- [ ] **Step 2: Corrigir as referências internas**

Em `plans/current/design-system-piloto.md`, linha 88, o trecho:
```
(ver `PLANO-LOOP-80-20-TEMPLATES.md`).
```
vira:
```
(ver `plans/current/loop-80-20-templates.md`).
```

Linha 89, o trecho:
```
Detalhe completo no Log de `PLANO-LOOP-80-20-TEMPLATES.md`.
```
vira:
```
Detalhe completo em `plans/done/loop-80-20-log-resumo.md`.
```

(Esse segundo arquivo só vai existir depois da Task 8 — a referência já fica correta esperando por ele.)

- [ ] **Step 3: Verificar**

```bash
grep -n "PLANO-LOOP-80-20-TEMPLATES" "plans/current/design-system-piloto.md"
```

Esperado: nenhum resultado.

- [ ] **Step 4: Commit**

```bash
git add plans/current/design-system-piloto.md
git commit -m "chore: mover PLANO-DESIGN-SYSTEM.md para plans/current e atualizar referencia cruzada"
```

---

### Task 8: Dividir `PLANO-LOOP-80-20-TEMPLATES.md` em `plans/current/` + `docs/active/decisoes/` + `plans/done/`

O arquivo tem 2344 linhas: linhas 1–426 são o plano vivo (Fases 0–6, regras, modo autônomo — isso é o que continua ativo), linhas 427–453 são uma tabela de "Decisões provisórias — revisar" (ADR ainda não ratificado por Rafael), e linhas 454–2344 são o "Log" (histórico dia a dia de ~33 entradas — candidato a resumo por já estar tudo em `git log`/`git show` se precisar do texto completo de novo).

**Files:**
- Create: `plans/current/loop-80-20-templates.md` (linhas 1–426 do arquivo original + 2 linhas de ponteiro)
- Create: `docs/active/decisoes/decisoes-provisorias-loop-80-20.md` (linhas 427–453, verbatim)
- Create: `plans/done/loop-80-20-log-resumo.md` (resumo condensado das linhas 454–2344)
- Delete: `PLANO-LOOP-80-20-TEMPLATES.md` (o conteúdo se torna os 3 arquivos acima)

- [ ] **Step 1: Ler o arquivo original inteiro**

```bash
wc -l PLANO-LOOP-80-20-TEMPLATES.md
```

Confirme que ainda são 2344 linhas (se o número mudou desde que este plano foi escrito, pare — alguém editou o arquivo nesse meio tempo, releia antes de continuar).

- [ ] **Step 2: Criar `docs/active/decisoes/decisoes-provisorias-loop-80-20.md`**

Copie **verbatim** as linhas 427–453 do arquivo original (o cabeçalho `## Decisões provisórias — revisar`, a nota em itálico, e a tabela completa de 14 linhas — Fase 4, Fase 3, Fase 6.1 ×11, Fase 6.2). Adicione no topo:

```markdown
# Decisões provisórias — Loop 80/20 Templates

> Movido de `PLANO-LOOP-80-20-TEMPLATES.md` (agora `plans/current/loop-80-20-templates.md`) em 2026-07-30. Toda decisão tomada em Modo Autônomo entra aqui — é a primeira coisa que Rafael confere ao voltar.

```

seguido da tabela verbatim.

- [ ] **Step 3: Criar `plans/current/loop-80-20-templates.md`**

Copie as linhas 1–426 do arquivo original **sem alteração de conteúdo** (essas 3 referências a `TAXONOMIA-COMPONENTES.md` e as 5 a `PLANO-DESIGN-SYSTEM.md` já foram corrigidas nas Tasks 6 e 7 — confirme que a versão que você está copiando já reflete essas correções). No final do arquivo, troque o que era `## Decisões provisórias — revisar` (linha 427 em diante) e `## Log` (linha 454 em diante) por:

```markdown
## Decisões provisórias — revisar

Ver `docs/active/decisoes/decisoes-provisorias-loop-80-20.md`.

## Log

Resumo condensado em `plans/done/loop-80-20-log-resumo.md`. Histórico
completo dia-a-dia (se precisar do texto original de novo) está em
`git log -p -- PLANO-LOOP-80-20-TEMPLATES.md` antes do commit desta
reorganização.
```

- [ ] **Step 4: Criar `plans/done/loop-80-20-log-resumo.md`**

Este é o passo que exige leitura e condensação de verdade — não é cópia mecânica. Para **cada** uma das ~33 entradas `###`/`##` do Log original (linhas 454–2344), escreva 1–3 bullets seguindo esta regra:

- **Manter:** o que foi entregue/decidido de fato, decisões difíceis de reverter e por quê, o que ficou pendente ao final da entrada.
- **Cortar:** narração passo a passo de como se chegou lá, troubleshooting de ambiente/infra (a menos que a causa raiz seja reaproveitável, ex: "cache do Turbopack corrompido — apagar `.next`"), qualquer coisa que uma entrada posterior já supera/corrige.

Exemplo já resolvido, pra calibrar o nível de detalhe (baseado na entrada real "2026-07-20 — Fase 0 e Fase 1 concluídas", linhas 459–481 do original):

```markdown
### 2026-07-20 — Fase 0 e Fase 1 concluídas

- Categorização dos 60 componentes aprovada por Rafael sem ajustes;
  `src/lib/atomic-registry.ts` criado (slug → categoria + lista "em
  construção"), validado 1:1 contra `components-registry.ts`.
- Navegação (`nav-components.tsx`) reagrupada por Atoms/Molecules/
  Organisms, com páginas-índice novas (`/atoms`, `/molecules`,
  `/organisms`).
```

(Note: cortamos a menção ao ambiente sandbox sem shell — foi uma limitação pontual daquela sessão, sem lição reaproveitável, e a entrada seguinte já mostra o `npm install` resolvendo o ambiente.)

Lista das ~33 entradas a percorrer (data — título, linha de início no arquivo original, antes das Tasks 1-7 moverem tudo — releia o arquivo local pra confirmar o número de linha exato no momento de executar, pode ter mudado):

1. 2026-07-20 — Fase 0 e Fase 1 concluídas
2. 2026-07-20 — Fases 2, 3 e 4 concluídas (modo autônomo)
3. 2026-07-20 — Ajuste de UX na navegação (Fase 1)
4. 2026-07-20 — Ícone por categoria na navegação
5. 2026-07-20 — Ícone + tooltip no modo recolhido (ícone-only)
6. 2026-07-20 — Template de documentação do Button replicado pros 58 componentes
7. 2026-07-20 — Playground genericizado (12 componentes)
8. 2026-07-21 — Fase 5 antecipada: os 15 Patterns construídos do zero
9. 2026-07-21 — Hierarquia final: Patterns fica entre Organisms e Templates
10. 2026-07-21 — Taxonomia por função (proposta) + decisão de arquitetura: Storybook híbrido
11. 2026-07-21 — Storybook instalado e piloto aprovado; Git inicializado; Button: elevation + API icon/label
12. 2026-07-21 — Tokens de Shape completos + painel único no Storybook
13. 2026-07-21 — Migração completa pro Storybook: 55 componentes + 14 patterns restantes
14. 2026-07-21 — Auditoria contra a Nimbus + Sonner reclassificado como Molecule
15. 2026-07-21 — Variações extras nas stories (131 stories novas em 33 arquivos)
16. 2026-07-21 — Description/whenToUse reais preenchidos em component-docs.ts
17. 2026-07-21 — Button: variantes ai-primary/ai-secondary + fullWidth + Button.Skeleton
18. 2026-07-22 — Loop: overlays (Tooltip e família) não herdavam tokens de marca por preset
19. (bloco "Ideias de telas pra testar os componentes" — se estiver dentro do intervalo do Log, trate como 1 entrada; se for antes da linha 454, ignore aqui, já faz parte do plano vivo)
20. 2026-07-22 — Pipeline `/construir-telas` (agentes autônomos via terminal)
21. 2026-07-23 — Fase 5A construída (pipeline autônomo) + fechamento de pendências
22. 2026-07-22 — Correção de contraste AA no accent do preset Suave
23. 2026-07-22 — R.ds logo no menu, nav Templates reorganizada, elevação do Button, bg do modal
24. 2026-07-23 — Ajustes de sidebar/header (compactação + fixação)
25. 2026-07-23 — Novo Pattern "Filter Panel" (ícone por campo de filtro)
26. 2026-07-23 — 4 ajustes no header (app-shell.tsx)
27. 2026-07-23 — Correção: Sheet mobile abre da direita, não da esquerda
28. 2026-07-23 — Datas em pt-BR com dia da semana + timestamp em America/Sao_Paulo
29. 2026-07-23 — Menu mobile fecha só quando a página termina de carregar
30. 2026-07-23 — Referência de paleta ATLAS pra revisão futura dos tokens primitivos
31. 2026-07-23 — Vercel Web Analytics
32. 2026-07-28 — Bug real de overflow mobile encontrado e corrigido; 5º estágio no pipeline `/construir-telas`
33. 2026-07-28 — Reconciliação: `novo-sinistro` existia, só nunca foi commitada
34. 2026-07-28 — Resolução dos 3 itens sem contexto
35. 2026-07-30 — Recuperação depois de queda de energia; Chip (1/15 da Fase 6.1) concluído; Icon (6.0) corrigido
36. 2026-07-30 — Fase 6.1 fechada: os 14 componentes restantes construídos em paralelo
37. (entrada final sobre Fase 6.2 — contraste AA — leia o final do arquivo original, é a mais recente, corresponde ao commit `20c99eb`)

Para cada uma, use o mesmo formato do exemplo do Step 4 (título `###` com data, 1–3 bullets). Adicione no topo do arquivo:

```markdown
# Log resumido — Loop 80/20 Templates

> Condensado de `PLANO-LOOP-80-20-TEMPLATES.md` em 2026-07-30. Histórico
> completo (narração dia-a-dia) descartado deste repositório — recuperável
> via `git log -p` se necessário. Plano ativo: `plans/current/loop-80-20-templates.md`.

```

- [ ] **Step 5: Apagar o arquivo original**

```bash
git rm "PLANO-LOOP-80-20-TEMPLATES.md"
```

- [ ] **Step 6: Verificar**

```bash
ls PLANO-LOOP-80-20-TEMPLATES.md 2>&1
wc -l plans/current/loop-80-20-templates.md docs/active/decisoes/decisoes-provisorias-loop-80-20.md plans/done/loop-80-20-log-resumo.md
```

Esperado: o primeiro comando dá erro (arquivo não existe mais). `loop-80-20-templates.md` deve ter ~430 linhas. `decisoes-provisorias-loop-80-20.md` deve ter ~30 linhas. `loop-80-20-log-resumo.md` deve ter entre 100–250 linhas (33 entradas × 1–4 linhas cada + títulos) — se estiver muito maior que isso, a condensação não cortou narrativa suficiente; se tiver menos de 60 linhas, provavelmente cortou informação demais (decisões difíceis de reverter não podem sumir).

- [ ] **Step 7: Commit**

```bash
git add plans/current/loop-80-20-templates.md docs/active/decisoes/decisoes-provisorias-loop-80-20.md plans/done/loop-80-20-log-resumo.md
git rm PLANO-LOOP-80-20-TEMPLATES.md 2>/dev/null
git commit -m "chore: dividir PLANO-LOOP-80-20-TEMPLATES.md em plans/current, docs/active/decisoes e plans/done"
```

---

### Task 9: Atualizar os 6 agentes/comandos do pipeline `/construir-telas`

**Files:**
- Modify: `.claude/commands/construir-telas.md`
- Modify: `.claude/agents/telas-planejador.md`
- Modify: `.claude/agents/telas-construtor.md`
- Modify: `.claude/agents/telas-acessibilidade.md`
- Modify: `.claude/agents/telas-mobile.md`
- Modify: `.claude/agents/telas-revisor.md`

- [ ] **Step 1: `construir-telas.md`** — trocar as 3 ocorrências de `.build/telas/`:

```
1. Delegue ao subagente telas-planejador. Espere `.build/telas/<slug>.md`.
```
→
```
1. Delegue ao subagente telas-planejador. Espere `docs/active/telas/<slug>/spec.md`.
```

```
3. Delegue ao telas-acessibilidade. Espere `.build/telas/acessibilidade-<slug>.md`.
4. Delegue ao telas-revisor. Mostre `.build/telas/diagnostico-<slug>.md`.
```
→
```
3. Delegue ao telas-acessibilidade. Espere `docs/active/telas/<slug>/acessibilidade.md`.
4. Delegue ao telas-revisor. Mostre `docs/active/telas/<slug>/diagnostico.md` (ou `docs/archive/telas/<slug>/diagnostico.md` se o veredito for "pronta" e o telas-revisor já tiver graduado a pasta — ver Task 11).
```

- [ ] **Step 2: `telas-planejador.md`** — 2 mudanças:

Referência ao plano (linha 9): trocar `` `PLANO-LOOP-80-20-TEMPLATES.md` `` por `` `plans/current/loop-80-20-templates.md` ``.

Caminho de saída (linha 12): trocar `` `.build/telas/<slug>.md` `` por `` `docs/active/telas/<slug>/spec.md` `` (crie a subpasta `docs/active/telas/<slug>/` se não existir).

- [ ] **Step 3: `telas-construtor.md`** — 3 ocorrências de `.build/telas/<slug>.md` (linhas 9 e 15) trocam para `docs/active/telas/<slug>/spec.md`.

- [ ] **Step 4: `telas-acessibilidade.md`** — linha 9 (`.build/telas/<slug>.md`) vira `docs/active/telas/<slug>/spec.md`; linha 18 (`.build/telas/acessibilidade-<slug>.md`) vira `docs/active/telas/<slug>/acessibilidade.md`.

- [ ] **Step 5: `telas-mobile.md`** — linha 28 (`.build/telas/mobile-<slug>.md`) vira `docs/active/telas/<slug>/mobile.md`.

- [ ] **Step 6: `telas-revisor.md`** — linha 9 (`.build/telas/<slug>.md`, `.build/telas/acessibilidade-<slug>.md`) vira `docs/active/telas/<slug>/spec.md`, `docs/active/telas/<slug>/acessibilidade.md`; linha 12 (`.build/telas/diagnostico-<slug>.md`) vira `docs/active/telas/<slug>/diagnostico.md`.

- [ ] **Step 7: Verificar que nenhuma referência a `.build/` sobrou nos 6 arquivos**

```bash
grep -rn "\.build/" .claude/commands/construir-telas.md .claude/agents/telas-*.md
```

Esperado: nenhum resultado.

- [ ] **Step 8: Commit**

```bash
git add .claude/commands/construir-telas.md .claude/agents/telas-planejador.md .claude/agents/telas-construtor.md .claude/agents/telas-acessibilidade.md .claude/agents/telas-mobile.md .claude/agents/telas-revisor.md
git commit -m "chore: apontar pipeline /construir-telas para docs/active/telas em vez de .build/telas"
```

---

### Task 10: Atualizar o comando `/revisar-ds` e os 4 agentes de revisão do design system

**Files:**
- Modify: `.claude/commands/revisar-ds.md`
- Modify: `.claude/agents/auditor-ds.md`
- Modify: `.claude/agents/pesquisador-ds.md`
- Modify: `.claude/agents/acessibilidade-ds.md`
- Modify: `.claude/agents/revisor-ds.md`

- [ ] **Step 1: Em cada um dos 5 arquivos, trocar toda ocorrência de `.review/` por `docs/active/revisao-ds/`** (mesmo nome de arquivo depois da barra — `.review/auditoria.md` → `docs/active/revisao-ds/auditoria.md`, etc. — use `Edit` com `replace_all: true` em cada arquivo, já que a string `.review/` se repete várias vezes em cada um).

- [ ] **Step 2: Verificar**

```bash
grep -rn "\.review/" .claude/commands/revisar-ds.md .claude/agents/auditor-ds.md .claude/agents/pesquisador-ds.md .claude/agents/acessibilidade-ds.md .claude/agents/revisor-ds.md
```

Esperado: nenhum resultado.

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/revisar-ds.md .claude/agents/auditor-ds.md .claude/agents/pesquisador-ds.md .claude/agents/acessibilidade-ds.md .claude/agents/revisor-ds.md
git commit -m "chore: apontar pipeline /revisar-ds para docs/active/revisao-ds em vez de .review"
```

---

### Task 11: Adicionar o passo de "graduação" ao `telas-revisor.md`

Sem isso, toda tela nova aprovada fica presa em `docs/active/telas/` para sempre e a Task 2 deste plano (mover pra `archive`) teria que se repetir manualmente a cada tela.

**Files:**
- Modify: `.claude/agents/telas-revisor.md`

- [ ] **Step 1: Adicionar um item 4 ao final da lista numerada** (depois do item 3 sobre severidade, antes do parágrafo final "Não decida por conta própria corrigir nada"):

```markdown
4. Se o veredito for "pronta" (sem bloqueantes), mova a pasta inteira de
   `docs/active/telas/<slug>/` para `docs/archive/telas/<slug>/` (`git mv`
   dos arquivos, ou `Bash` com `mkdir -p` + `mv` se não houver git
   disponível no ambiente) depois de escrever o diagnóstico — é assim que
   `docs/active/telas/` fica só com telas ainda em aberto. Se o veredito
   for "precisa retrabalho", **não mova** — deixe em `active` até a
   próxima rodada do pipeline confirmar "pronta".
```

- [ ] **Step 2: Verificar**

```bash
grep -n "docs/archive/telas" .claude/agents/telas-revisor.md
```

Esperado: 1 resultado (a linha nova).

- [ ] **Step 3: Commit**

```bash
git add .claude/agents/telas-revisor.md
git commit -m "feat: telas-revisor gradua tela aprovada de docs/active para docs/archive automaticamente"
```

---

### Task 12: Atualizar as 2 referências em `src/app/globals.css`

**Files:**
- Modify: `src/app/globals.css:240,345`

- [ ] **Step 1: Ler o contexto exato das 2 linhas antes de editar**

```bash
grep -n -B2 -A2 "PLANO-LOOP-80-20" src/app/globals.css
```

- [ ] **Step 2: Trocar `PLANO-LOOP-80-20-TEMPLATES.md` por `plans/current/loop-80-20-templates.md`** nas 2 ocorrências (linhas 240 e 345), via `Edit` com `replace_all: true` no arquivo `src/app/globals.css`, string exata `` PLANO-LOOP-80-20-TEMPLATES.md `` → `` plans/current/loop-80-20-templates.md ``.

- [ ] **Step 3: Verificar**

```bash
grep -n "PLANO-LOOP-80-20-TEMPLATES.md" src/app/globals.css
```

Esperado: nenhum resultado.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "chore: atualizar referencia ao plano em globals.css apos reorganizacao de pastas"
```

---

### Task 13: Reescrever `CLAUDE.md` com a nova estrutura e a receita de contexto por tarefa

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Substituir a seção "Como se orientar rápido"**

Old string:
```markdown
## Como se orientar rápido (nesta ordem, economiza contexto)

1. **`graphify-out/GRAPH_REPORT.md`** — mapa estrutural do código (nós
   mais conectados, conexões inesperadas, comunidades). Leia isso antes
   de explorar arquivo por arquivo. Se não existir ou estiver muito
   desatualizado (mudanças grandes desde a última extração), regenerar:
   `graphify extract . --code-only && graphify cluster-only .`
2. **`PLANO-LOOP-80-20-TEMPLATES.md`** — prioridade atual de construção
   (o que fazer agora, em que ordem, com que regras). Este é o plano
   ativo.
3. **`PLANO-DESIGN-SYSTEM.md`** — plano do piloto de documentação
   (Button), pausado, retomar quando o loop acima chegar na Fase 5.
4. **`README.md`** — visão geral técnica do projeto (stack, presets,
   estrutura de pastas).
5. Só então arquivos individuais em `src/`.
```

New string:
```markdown
## Como se orientar rápido (nesta ordem, economiza contexto)

1. **`graphify-out/GRAPH_REPORT.md`** — mapa estrutural do código (nós
   mais conectados, conexões inesperadas, comunidades). Leia isso antes
   de explorar arquivo por arquivo. Se não existir ou estiver muito
   desatualizado (mudanças grandes desde a última extração), regenerar:
   `graphify extract . --code-only && graphify cluster-only .`
2. **`plans/current/loop-80-20-templates.md`** — prioridade atual de
   construção (o que fazer agora, em que ordem, com que regras). Este é
   o plano ativo.
3. **`plans/current/design-system-piloto.md`** — plano do piloto de
   documentação (Button), pausado, retomar quando o loop acima chegar na
   Fase 5.
4. **`README.md`** — visão geral técnica do projeto (stack, presets,
   estrutura de pastas).
5. Depois, use a receita de contexto por tarefa abaixo em vez de carregar
   `docs/` ou `plans/` inteiros.
6. Só então arquivos individuais em `src/`.
```

- [ ] **Step 2: Substituir a seção "Onde vive o quê"**

Old string:
```markdown
## Onde vive o quê — regra importante

Este projeto guarda **só código + planejamento corrente**. Não vira
arquivo de histórico.

- **Fica aqui**: código real (`src/`), tokens (`globals.css`), os
  `PLANO-*.md` enquanto estiverem ativos (refletem o estado atual e os
  próximos passos, são reescritos/atualizados conforme o trabalho
  avança), `README.md`.
- **NÃO fica aqui**: raciocínio completo de decisões antigas, histórico
  de sessões, o "porquê" narrado passo a passo de cada escolha já
  fechada. Isso vai para o vault Obsidian.

Quando uma fase de um `PLANO-*.md` for concluída, resuma o que foi
decidido e o porquê, e arquive essa narrativa no vault (ver abaixo) —
deixe neste arquivo só o essencial pro próximo passo, não o histórico
completo de como se chegou ali.
```

New string:
```markdown
## Estrutura de pastas e receita de contexto por tarefa

Este projeto guarda **só código + planejamento corrente + documentação
viva**. Não vira arquivo de histórico.

```
tokens/        → não é pasta própria: é src/app/globals.css
components/    → não é pasta própria: é src/components/ui/
docs/
  active/
    especificacoes/    # specs em vigor (ex: taxonomia-componentes.md)
    decisoes/           # ADRs e decisões provisórias ainda não ratificadas
    revisao-ds/          # último diagnóstico do /revisar-ds (sempre sobrescrito)
    telas/<slug>/          # spec + auditorias de uma tela AINDA em construção
    componentes/<slug>/     # spec de um componente AINDA em construção
  archive/
    telas/<slug>/           # tela finalizada (diagnóstico "pronta")
    componentes/<slug>/      # componente finalizado
    decisoes/                 # decisões já resolvidas/ratificadas
plans/
  current/    # PLANO-*.md ativos (o que fazer agora)
  done/        # resumo curto de fases/planos já concluídos
```

Quando um item de `docs/active/` for finalizado (diagnóstico "pronta" ou
decisão ratificada por mim), mova a pasta inteira pra `docs/archive/`
equivalente — é isso que mantém `active/` pequeno e relevante. O
`telas-revisor` já faz isso sozinho para telas (ver
`.claude/agents/telas-revisor.md`); para componentes e decisões, é manual
por enquanto.

### Receita de contexto por tipo de tarefa

| Tarefa | Pastas a carregar |
|---|---|
| Ajustar tokens (cor, spacing, tipografia) | `src/app/globals.css` + `docs/active/decisoes/` (se houver decisão pendente sobre o token) |
| Criar/editar componente | `src/components/ui/` + `docs/active/componentes/<slug>/` (ou `docs/archive/componentes/<slug>/` pra consultar um já fechado) |
| Construir tela (`/construir-telas`) | `docs/active/telas/<slug>/` + `src/lib/templates-registry.ts` + `src/lib/atomic-registry.ts` |
| Documentar uma decisão nova (ADR) | `docs/active/decisoes/` |
| Revisar/aprovar um plano | `plans/current/` + o `docs/active/` correspondente à fase |
| Rodar `/revisar-ds` | `docs/active/revisao-ds/` (é o output) |

- **Fica aqui**: código real (`src/`), `docs/active/` e `docs/archive/`
  (specs, ADRs e diagnósticos são artefatos, não narrativa), os
  `plans/current/*.md` enquanto ativos, resumos em `plans/done/`,
  `README.md`.
- **NÃO fica aqui**: o raciocínio completo dia a dia de como se chegou a
  uma decisão, histórico de sessão narrado passo a passo. Isso vai para
  o vault Obsidian.

Quando uma fase de um plano em `plans/current/` for concluída, resuma o
que foi decidido e o porquê num arquivo novo em `plans/done/`, remova
esse trecho do `current`, e — se quiser preservar o racional completo —
arquive a narrativa integral no vault (ver abaixo).
```

- [ ] **Step 3: Substituir as 2 referências restantes em "Convenções já estabelecidas neste projeto"**

Old string:
```markdown
- Categorização atomic design (Atoms / Molecules / Organisms) — ver
  `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 0
```
New string:
```markdown
- Categorização atomic design (Atoms / Molecules / Organisms) — ver
  `plans/current/loop-80-20-templates.md`, Fase 0
```

Old string:
```markdown
- Regras do loop autônomo (decisão provisória em vez de travar quando
  Rafael não está disponível) — ver `PLANO-LOOP-80-20-TEMPLATES.md`
```
New string:
```markdown
- Regras do loop autônomo (decisão provisória em vez de travar quando
  Rafael não está disponível) — ver `plans/current/loop-80-20-templates.md`
```

- [ ] **Step 4: Verificar que nenhuma referência ao caminho antigo sobrou em `CLAUDE.md`**

```bash
grep -n "PLANO-LOOP-80-20-TEMPLATES.md\|PLANO-DESIGN-SYSTEM.md" CLAUDE.md
```

Esperado: nenhum resultado.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: atualizar CLAUDE.md com a nova estrutura docs/plans e a receita de contexto por tarefa"
```

---

### Task 14: Verificação final de ponta a ponta

**Files:** nenhum (só leitura/checagem)

- [ ] **Step 1: Confirmar que `.build/` e `.review/` não existem mais**

```bash
ls .build .review 2>&1
```

Esperado: erro "no such file or directory" para os dois.

- [ ] **Step 2: Confirmar que não sobrou nenhuma referência viva aos caminhos antigos fora de `git log`**

```bash
grep -rln "\.build/\|\.review/\|PLANO-LOOP-80-20-TEMPLATES\.md\|PLANO-DESIGN-SYSTEM\.md\|^TAXONOMIA-COMPONENTES\.md" \
  --include="*.md" --include="*.ts" --include="*.tsx" --include="*.css" . \
  --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=docs --exclude-dir=plans
```

Esperado: nenhum resultado (tudo que sobrar deve estar só dentro de `docs/`/`plans/`, arquivado, o que é esperado — arquivo histórico pode citar o próprio nome antigo em prosa).

- [ ] **Step 3: Conferir a árvore final**

```bash
find docs plans -type f | sort
```

Confira contra a "Visão da estrutura final" no topo deste plano — mesma lista de arquivos (nomes podem ter sido ajustados durante a Task 8, mas a contagem deve bater: 25 arquivos em `docs/archive/telas` + 2 avulsos, 16 em `docs/archive/componentes`, 1 em `docs/archive/decisoes`, 1 em `docs/active/especificacoes`, 1 em `docs/active/decisoes`, 4 em `docs/active/revisao-ds`, 2 `.gitkeep`, 2 em `plans/current`, 1 em `plans/done`).

- [ ] **Step 4: `git status` limpo (nada da reorganização deveria continuar pendente)**

```bash
git status
```

Esperado: as únicas modificações pendentes são as que já existiam ANTES deste plano (ver lista no início da conversa — `package.json`, `src/app/fundamentos/*`, etc.) — nada relacionado a `.build/`, `.review/`, `PLANO-*.md` ou `TAXONOMIA-COMPONENTES.md`.

Nenhum commit nesta task — é só checagem. Se algo estiver fora do esperado, volte pra task correspondente antes de considerar a reorganização concluída.

---

## Self-Review

**Cobertura do pedido original:**
- Estrutura `tokens/, components/, docs/active, docs/archive, plans/current, plans/done` → coberta (Tasks 1–8), com a ressalva explícita de que `tokens/`/`components/` apontam pros caminhos reais já existentes em vez de pastas vazias duplicadas.
- Regra de retenção (ADR / plano finalizado / spec) → aplicada em cada decisão de arquivamento (Tasks 2–8): toda tela/componente tem diagnóstico fechado (spec+decisão, não tentativa), a tabela de decisões provisórias virou ADR em `docs/active/decisoes/`, o Log virou resumo em `plans/done/`.
- "Apagar tentativas que não vingaram/rascunhos que mudaram" → não havia nenhum arquivo desse tipo solto na raiz (tudo em `.build/`/`.review/` já era spec ou diagnóstico fechado); o único conteúdo efetivamente descartado (não só movido) é a narrativa bruta do Log, coberto pela Task 8.
- Carregar contexto por tarefa sem pasta inteira → a tabela "Receita de contexto por tipo de tarefa" na Task 13 cobre os 5 exemplos citados no pedido original (tokens, componente, tela, documentar, revisar).

**Placeholder scan:** nenhum "TODO"/"a definir" — a única task com conteúdo gerado no momento da execução (não pré-escrito neste plano) é a Task 8 Step 4 (resumo do Log), que tem rubrica + exemplo completo + lista fechada de 33 entradas com critério de verificação objetivo (contagem de linhas do resultado).

**Consistência de nomes:** convenção `spec.md`/`acessibilidade.md`/`diagnostico.md`/`mobile.md` usada de forma idêntica em Tasks 2, 4, 9 e 11.

---

## Execução

Este plano tem 14 tasks sequenciais com dependências reais entre elas (Task 6 e 7 precisam terminar antes da Task 8 porque a Task 8 copia o conteúdo já corrigido; Task 9–11 dependem das Tasks 2 e 5 já terem movido os arquivos de destino). Recomendo **executing-plans** (execução em lote nesta sessão, com checkpoints) em vez de subagent-driven-development — é reorganização mecânica, não exige revisão de design por task.
