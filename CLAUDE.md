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
2. **`_trabalho/`** — o trabalho deste repo: uma nota por Épico e por
   História, com status, ciclo e pré-requisitos no frontmatter. O quadro
   está em `C:\dev\Trabalho.base`, aberto pelo Obsidian com o vault
   `C:\dev`. As regras estão em `C:\dev\_protocolo\PROTOCOLO.md`; o
   resumo operacional está em `AGENTS.md`.
3. **`docs/superpowers/plans/`** — planos antigos, todos **executados**
   em julho de 2026 e com as checkboxes nunca marcadas. São registro
   histórico: não reexecutar, não "terminar". Cada um tem banner no topo
   dizendo isso.
4. **`README.md`** — visão geral técnica do projeto (stack, presets,
   estrutura de pastas).
5. Depois, use a receita de contexto por tarefa abaixo em vez de carregar
   `docs/` ou `plans/` inteiros.
6. Só então arquivos individuais em `src/`.

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

## Base de conhecimento — vault Obsidian

Caminho: `C:\base-conhecimento\Rafanhaia`

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
  `plans/done/loop-80-20-log-resumo.md`, Fase 0
- Tokens semânticos (não direction-aware vs. direction-aware) e os 5
  presets de estilo — ver `README.md`, seção "Sistema de tokens"
- ~~Regras do loop autônomo (decisão provisória em vez de travar quando
  Rafael não está disponível)~~ — **revogado em 2026-08-23.** O protocolo
  atual proíbe executor decidir arquitetura: bateu em decisão, marca a
  História como `🟡 Aguardando definição` com pré-requisito `Decisão` e
  vai para outra. Ver `C:\dev\_protocolo\PROTOCOLO.md`, regra 3.
- Nunca cor fixa fora de token, nunca componente inventado fora do
  catálogo em `src/components/ui/`

## Idioma

Sempre em Português do Brasil — comentários de código, planejamento e
respostas.
