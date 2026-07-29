# shadcn-local — Instruções para Claude

## O que é este projeto

Este é o **Design System operacional de Rafael** — não é o DS decorativo do
portfólio (esse fica em outro projeto, `P-portfolio-design-system`, no
vault Obsidian). Aqui o objetivo é diferente: um sistema de componentes
real e funcional (Next.js + shadcn/ui + Tailwind v4), estruturado em
atomic design, pensado pra ser comandado por IA e montar **telas
funcionais de interface** sob demanda — o caso de uso principal é gerar
protótipos rápidos, adaptáveis à identidade visual de um cliente, pra
rodar testes de usabilidade.

Trate este projeto como uma ferramenta de trabalho viva, não uma vitrine.

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

## Base de conhecimento — vault Obsidian

Caminho: `C:\Users\rca_1\Documents\!Obsidian!\Teste`

Quando precisar de contexto sobre o histórico deste projeto, decisões já
tomadas e o porquê delas, ou contexto de outros projetos de Rafael que
não está disponível aqui:

1. Leia `wiki/hot.md` primeiro (cache de contexto recente)
2. Se não for suficiente, leia `wiki/index.md`
3. A nota de projeto deste Design System operacional é
   `B01 Projetos/P-DS-SHADCN/P-DS-SHADCN.md`, com o histórico completo
   em `B01 Projetos/P-DS-SHADCN/Diário de Bordo.md` — é pra lá que vai
   todo raciocínio de decisão, sessão de trabalho e "porquê" que não
   deve ficar acumulado neste repositório
4. Só então leia páginas individuais da wiki

## Convenções já estabelecidas neste projeto

- Categorização atomic design (Atoms / Molecules / Organisms) — ver
  `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 0
- Tokens semânticos (não direction-aware vs. direction-aware) e os 5
  presets de estilo — ver `README.md`, seção "Sistema de tokens"
- Regras do loop autônomo (decisão provisória em vez de travar quando
  Rafael não está disponível) — ver `PLANO-LOOP-80-20-TEMPLATES.md`
- Nunca cor fixa fora de token, nunca componente inventado fora do
  catálogo em `src/components/ui/`

## Idioma

Sempre em Português do Brasil — comentários de código, planejamento e
respostas.
