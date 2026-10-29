---
tipo: epico
projeto: 🎨 P-DS-SHADCN
status: progresso
criado: 2026-10-28
---

# Memória de componentes (PASSI + Rayner)

Cada componente do R.DS ganha uma memória legível por máquina: o que ele
é hoje (descritivo vivo), o que mudou e por quê (histórico), com a parte
estrutural lida do código, sem ninguém transcrever.

- **Formato** vem do PASSI DS: um MD curto por componente, seções fixas,
  porta de entrada que só roteia, sinônimos. Avaliação em
  `Referencia/passi-ds-1.1.0/AVALIACAO.md`; origem em
  [[H-referencia-passi-ds]].
- **Ciclo** vem do Rayner Lemos (TIM DS Brain): coleta da fonte, humano
  audita, vivo × histórico separados, escritor único, artefatos fixos.
  Nota no vault: `wiki/concepts/Memoria Persistente de Design System.md`.

Continua o [[E-documentacao-ds]]: a página `/components/<slug>` segue
lendo `src/lib/component-docs.ts`, agora gerado a partir dos MDs.

## Decisões já tomadas — não reabrir

1. **O MD é a fonte única** da documentação; `component-docs.ts` é
   gerado e um teste reprova divergência. (Rafael, 2026-10-27)
2. **Texto narrativo pode ser adaptado do PASSI**, e o Rafael revisa
   depois. Substitui a decisão 3 do [[E-documentacao-ds]]. (Rafael,
   2026-10-27)
3. **A parte estrutural sai do código**: variantes, tamanhos, props,
   anatomia e tokens são lidos do `.tsx` por script. O humano só escreve
   intenção. (Rafael, 2026-10-28)
4. **Histórico num arquivo por componente**, só acrescenta:
   `docs/componentes/historico/<slug>.md`. (Rafael, 2026-10-28)
5. **Paridade com as cópias nos projetos** (`central-esg` etc.) **fora
   do escopo** deste Épico. (Rafael, 2026-10-28)
6. **Spike em worktree, em Loop Engineering** (verificador antes do
   código). (Rafael, 2026-10-28)
7. **O PASSI é baliza, não cópia.** Os 109 MDs foram lidos inteiros, e a
   régua do R.DS está em `docs/componentes/_baliza.md`. (Rafael, 2026-10-28)
8. **Todo componente passa pelo ciclo**, inclusive os novos. O passo a passo
   está em `.claude/skills/componente-rds/SKILL.md`, e a trava roda no CI
   (`.github/workflows/trava.yml`). (Rafael, 2026-10-28)
9. **Replicação por camada**, de primitivos a organismos. (Rafael, 2026-10-28)

## Decisões pendentes (visuais, do Rafael)

O PASSI e o R.DS divergem nestes pontos (detalhe em `_baliza.md`). Até
haver decisão, vale o código atual:

- [ ] **Decisão** — Gradiente de IA no `button` (atrito A3).
      A) Manter `ai-primary` com gradiente → a ação de IA continua chamando atenção, contra o PASSI e o `ia-no-produto.md`.
      B) Trocar por cor plana com rótulo e ícone de IA → mais sóbrio, mas muda o visual de quem já usa a variante.
      Sem recomendação: é escolha de marca. · pedido por: claude · 2026-10-28
      (O aviso "em revisão" saiu da página do Button em 2026-10-29, por [[H-abas-padronizadas]]: revisão é parâmetro interno e fica só aqui.)
- [ ] **Decisão** — Sombra em superfície parada (`card`, elevação do `button`).
      A) Manter `shadow-sm` → o visual atual não muda.
      B) Superfície só com cor e borda, sombra só no que flutua (PASSI) → visual mais plano, revisar os 5 presets.
      Recomendo A até rodar teste com cliente, porque B mexe em todos os presets. · pedido por: claude · 2026-10-28
- [ ] **Decisão** — Tipos de `alert`.
      A) Manter `default` e `destructive` → nada muda.
      B) Criar os 4 do PASSI (informação, sucesso, atenção, erro) → cobre mais casos, mas pede tokens de status novos.
      Recomendo B quando as telas de seguro precisarem de sucesso ou atenção; até lá, A. · pedido por: claude · 2026-10-28

## Como o ciclo do Rayner fica no R.DS

| Rayner | R.DS |
|---|---|
| Fonte legível (Figma) | O `.tsx` (`cva`, tipos, `data-slot`, classes) |
| Coleta, ninguém transcreve | `scripts/coletar-componente.mjs` |
| Humano audita | Seções de intenção do MD + coluna de descrição das tabelas geradas |
| Descritivo vivo | `docs/componentes/<slug>.md` |
| Histórico só acrescenta | `docs/componentes/historico/<slug>.md` |
| Escritor único | `npm run docs:registrar` — único que grava as seções geradas, a coleta e o histórico |
| Main × Branch | A coleta guardada (`docs/componentes/coleta/<slug>.json`) é a da main; registrar na branch gera o diff |
| Auditoria ensina a coleta | `docs/componentes/historico/_lacunas.md` |
| Artefatos fixos | Teste que cobra MD, story, exemplo e registros de cada componente |

## Histórias

- [[H-memoria-componentes-spike]] — fases 0 a 3, piloto com button, tabs e dialog
- [[H-memoria-baliza-skill]] — leitura do PASSI, baliza, modelo equalizado, skill e CI
- [[H-memoria-replicar-lotes]] — fase 4, os demais componentes por camada; fatiada em 14 lotes (`H-memoria-primitivos-a` e `-b`, `H-memoria-atoms-a` a `-d`, `H-memoria-molecules-a` a `-d`, `H-memoria-organisms-a` a `-d`), uma camada por vez
- [[H-conteudo-transversal]] — fase 5, `docs/conteudo/`
- [[H-pagina-secoes-memoria]] — a página do site mostrar o que o MD já declara

## Ideias para avaliar depois (do PASSI)

- Doc de padrões no formato do PASSI (`padroes/`), com a seção "Feito com", para os 15 patterns.
- Formato de ADR do PASSI ("o que a regra diz", decisão, por quê, consequências, alternativa descartada) em `docs/active/decisoes/`.
- Lint semântico como o `verificar.mjs`: `aria-label` em `size="icon"`, glossário nas telas, um primário por tela.
- Contraste também em APCA e um preset de alto contraste (`prefers-contrast: more`).
- 10 componentes ainda sem chave em `docs/sinonimos.json`.

## Ideias para avaliar depois (do AIPIM, de Talis Galhardi, MIT)

Leitura completa em 2026-10-28: repositório `github.com/talis-galhardi/aipim`
(cerca de 210 arquivos de texto, em 4 frentes no AGY) e Storybook publicado,
com as afirmações principais conferidas nas fontes. Cada ideia vira História
só se o Rafael quiser. Por valor para o uso do R.DS (a IA monta telas na marca do cliente):

1. **Construtor de tema do cliente.** O R.DS já gera o tema inteiro a partir de uma cor (`gerarTema`), mas só no build. Falta a tela: digitar a cor da marca, ver as checagens, receber sugestão de ajuste e gravar o preset. (AIPIM: `theme-builder/`) → virou [[H-construtor-de-tema]], junto com a ideia 2.
2. **Daltonismo no motor de cor.** Simular protanopia, deuteranopia e tritanopia (OKLab) com diferença mínima entre os pares que importam (erro × sucesso, ação × fundo, link × texto). O R.DS não tem nada disso. (`tools/build_tokens.py`)
3. **Checagens além do axe:** zoom 200%, reflow a 320 px, fonte raiz em 200% (testa a regra do rem), espaçamento WCAG 1.4.12 e cores forçadas. (`tools/verify_web.py`, `docs/pt-br/verification.md`)
4. **Seção "Decisão" no MD do componente:** o porquê de um comportamento proposital, para a IA não "consertar". (8 de 24 componentes, ex.: `brazilian-field.md`)
5. **Roteiro de leitor de tela:** o que a voz deve falar em cada tecla, mais uma tabela de conferência por leitor (VoiceOver, NVDA, TalkBack), com status. (`combobox.md`, `datepicker.md`)
6. **Tabelas de cor e de medidas geradas:** parte × estado × token, com o valor no claro e no escuro, e altura, padding, gap e ícone por tamanho. A coleta do R.DS já lê as classes, então dá para gerar. (`tools/build_specs.py`)
7. **A página e o Storybook renderizam o próprio MD,** dividido em abas, em vez de recopiar os campos. É o caminho para [[H-pagina-secoes-memoria]]. (`.storybook/docs-tabs.js`)
8. **Campo brasileiro:** CPF, CNPJ com letras (IN RFB 2.229/2024), CEP, data digitada e reais; máscara ao digitar, checagem ao sair do campo. O R.DS só tem nome e telefone (`src/lib/field-formatters.ts`). Serve às telas de seguro.
9. **Lint de escrita no CI:** travessão, exclamação, reticências, gerúndio de arremate, lista de clichês em PT. (`tools/check_copy.py`)
10. **"Faça / não faça" como story executável,** com o axe desligado só no exemplo errado. (`stories/_dodont.js`)
11. **Números da prosa conferidos contra o código** ("79 componentes"). (`tools/check_facts.py`)
12. **`llms.txt` gerado e travado no CI.** (`tools/build_ai.py`)
13. **CI mais seguro:** actions fixadas por hash, `permissions: contents: read`, Dependabot agrupado. Vale para `.github/workflows/trava.yml`.
14. **Uma entrada por componente na barra lateral do Storybook.** (`.storybook/manager.js`)
15. Figma (fora do foco por ora): variáveis com os mesmos nomes do código, plugin que só aplica o tema e registro de "diferente de propósito" (`docs/figma-sync-log.md`).

Não se aplicam ao R.DS: tradução com carimbo de hash (o R.DS é só pt-BR), tokens para Swift e Compose (o R.DS é só web), formulário de issue para pedir componente (o passo 1 da skill já cobre).
