# R.DS — Instruções para Claude

## O que é este projeto

O nome do sistema é **R.DS** (decisão de 2026-10-19). A pasta do projeto é
`C:\dev\R.DS`, uma só; "shadcn-local" (pasta antiga) e "shadcn-local-a11y"
(worktree da branch `feat/a11y-trava`, já incorporada na `main`) só
aparecem em notas históricas. Não use esses nomes para o produto.

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
tokens/        → não é pasta própria: src/app/globals.css (medida, raio, sombra,
                 movimento) + src/app/tokens-cor.css (cor, gerado; não editar)
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
| Ajustar cor | `src/lib/cor/presets.ts` + `npm run tokens:gerar` (gera `src/app/tokens-cor.css`) + `docs/active/decisoes/` (se houver decisão pendente) |
| Ajustar outros tokens (spacing, raio, tipografia, movimento) | `src/app/globals.css` + `docs/active/decisoes/` (se houver decisão pendente sobre o token) |
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

- Categorização atomic design (Primitivos / Atoms / Molecules / Organisms):
  a camada sai do que o componente importa do DS. Critério e trava em
  `src/lib/atomic-registry.ts` + `atomic-registry.test.ts`; decisão em
  `docs/archive/decisoes/criterio-camadas.md`
- Tokens semânticos (não direction-aware vs. direction-aware) e os 5
  presets de estilo — ver `README.md`, seção "Sistema de tokens"
- ~~Regras do loop autônomo (decisão provisória em vez de travar quando
  Rafael não está disponível)~~ — **revogado em 2026-08-23.** O protocolo
  atual proíbe executor decidir arquitetura: bateu em decisão, marca a
  História como `🟡 Aguardando definição` com pré-requisito `Decisão` e
  vai para outra. Ver `C:\dev\_protocolo\PROTOCOLO.md`, regra 3.
- Nunca cor fixa fora de token, nunca componente inventado fora do
  catálogo em `src/components/ui/`
- **Testes de navegador (Storybook/vitest): uma execução por vez na
  máquina, com limite de Chromium.** Cada Chromium headless come ~830 MB;
  em 15/10/2026 execuções empilhadas esgotaram os 16 GB. Todos os
  contextos só via `npm run test:a11y:todos`. Os limites ficam em
  `scripts/a11y-trava.mjs`, única fonte: `LOTE` (contextos por vez no
  `test:a11y:todos`) e `MAX_NAVEGADORES` (teto que o `vitest.config.ts`
  aceita numa chamada direta). A trava do mesmo arquivo recusa uma 2ª
  execução. Recusado? Espere a outra terminar, não contorne. Mudou um
  limite? Rode `node scripts/verificar-a11y-todos.mjs`.

## Regras de trabalho

- Nunca invente valor de token, cor, medida ou estado.
- Toda validação técnica é reportada em linguagem de design.
- Todo achado sai de `open` por uma decisão explícita. Nunca marque
  `fixed` sem revalidar.
- Quem usa pode não ler: abra com contexto curto e pergunta de múltipla
  escolha.
- Detecte o MCP antes de usar, não confie no estado.

## Só token, num lugar só

- **Medida, espaço, tempo e texto vêm de token.** Em componente: escala do
  Tailwind, `--spacing(n)` ou `var(--token)`. No CSS à mão
  (`globals.css`): valor literal só dentro de uma declaração de token
  (`--nome: valor`); fora dela, `var()` ou `calc(var(--spacing) * n)`.
  Exceções: linha fina (≤3px) e o `0.01ms` do `prefers-reduced-motion`.
- **A trava é `src/lib/design-tokens.test.ts`**: reprova valor fixo em
  `src/components/` e em `src/app/globals.css`. Teste vermelho se corrige
  na causa, nunca afrouxando a regra.
- **Token novo segue o padrão da família**: valor em `:root` (o preset pode
  sobrescrever) e ponte em `@theme inline` quando precisa virar utilitário
  (ex.: `--motion-ease-spring` → `--ease-spring` → `ease-spring`). Um nome
  declarado uma vez só. Exceção: família sem namespace de tema no
  Tailwind v4 (ex.: duração) não vira classe pelo `@theme`; a ponte é um
  `@utility` (ver `duration-motion-*` no `globals.css`). O teste de tokens
  reprova duração nomeada usada em componente sem esse `@utility`.
- **Token é catálogo**: não sai só por estar sem uso hoje; ele define as
  opções permitidas.
- **Nada de classe CSS solta que repete componente** (`.btn`, `.card`,
  `.badge`…). O visual mora no componente; o CSS global só tem token,
  keyframes e regras de base.

## Mudou X → atualize Y (no mesmo commit)

Cada informação mora num lugar só; os outros apontam para ele. Ao mudar a
coluna da esquerda, atualize a da direita junto, ou o repositório começa a
se contradizer.

| Mudou | Atualize junto |
|---|---|
| Componente novo em `src/components/ui/` | `components-registry.ts`, `atomic-registry.ts`, `examples-mapping.ts`, demo em `components/examples/` + `examples/registry.tsx`, `<slug>.stories.tsx`, `docs/active/componentes/<slug>/spec.md` |
| Componente com arredondado dentro de arredondado | `src/components/ui/radius-concentric.stories.tsx` |
| Pattern novo | `patterns-registry.ts`, `components/patterns/registry.tsx`, `pattern-docs.ts` |
| Token novo ou família nova | `globals.css` (padrão acima) e a seção "Sistema de tokens" do `README.md` |
| Cor de um preset | `src/lib/cor/presets.ts` (cor-fonte, ou sobrescrita com motivo) + `npm run tokens:gerar`. Nunca editar `tokens-cor.css` nem declarar cor no `globals.css` |
| Como um projeto consome o DS (o que copiar, comando) | `README.md`, seções "Estrutura de pastas para novos projetos" e "Como importar os componentes" |
| Onde as coisas ficam, regras deste repo | este `CLAUDE.md` |
| Spec ou decisão finalizada | mover de `docs/active/` para `docs/archive/` |

Quem é o quê: **`CLAUDE.md`** orienta quem trabalha *dentro* do DS;
**`README.md`** orienta quem *usa* o DS num projeto. Não copie conteúdo de
um para o outro; aponte.

## Idioma

Sempre em Português do Brasil — comentários de código, planejamento e
respostas.
