---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-memoria-componentes
status: entregue
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-28
ciclo:
estimativa: 2
perfil: design
dono:
tarefas: 6/6
bloqueada-por:
criado: 2026-10-28
fechado: 2026-10-28
motivo-descarte:
origem: pedido direto do Rafael em 2026-10-28 ("tudo que tenha MD do Passi seja lido… criar as skills para manter o fluxo vivo")
---

# Baliza do PASSI, modelo equalizado e skill do ciclo

Ler os 109 MDs do PASSI como referência (não cópia), equalizar o modelo
do R.DS com o que faltava e criar o fluxo que todo componente segue, novo
ou existente.

## Plano

Loop Engineering. O verificador ganhou a "declaração completa": seções e
campos iguais aos do `_modelo.md`, acessibilidade nas 4 chaves, toda
proibição com `→`, nada por preencher e limite de tamanho. A skill só
conta como pronta depois de passar num componente real, de ponta a ponta.

## Pré-requisitos

Nenhum.

## Tarefas

- [x] Ler os 109 MDs do PASSI (4 frentes no AGY) e conferir as afirmações principais
- [x] Escrever `docs/componentes/_baliza.md`
- [x] Equalizar o `_modelo.md` (Composição gerada, `[a preencher]` explícito) e o README (regras gerais)
- [x] Registro cria o MD a partir do modelo e alinha os MDs existentes
- [x] Skill `.claude/skills/componente-rds/SKILL.md`, `AGENTS.md` e trava no CI
- [x] Provar a skill no `separator`

## Contribuições

- 2026-10-28 · claude · Leitura no AGY (Gemini, modo pesquisa), em 4 frentes: componentes 1 a 26, componentes 27 a 52, porta/padrões/decisões/agentes (40 arquivos) e fundamentos/conteúdo (17). Cobertura de 109 de 109. Conferido nos arquivos: as 52 seções "Regras gerais" idênticas, as 52 linhas de meta WCAG/ABNT e a proibição de gradiente de IA em `ia-no-produto.md`. Uma afirmação do AGY estava errada ("falta `sinonimos.json`"): o arquivo existe, com 69 de 79 slugs.
- 2026-10-28 · claude · `_baliza.md`: tabela adota/adapta/recusa, critério de aceite por seção, critérios WCAG, limites de quantidade, 42 arestas "situação → use" e as divergências que dependem de decisão (A3, sombra, tipos de alert).
- 2026-10-28 · claude · Coleta lê a composição (imports do DS). O registro cria o MD a partir do `_modelo.md` (`mdNovo`) e põe as seções na ordem do modelo (`alinharAoModelo`). Defeito achado pela trava e corrigido com teste: a seção que nasce vazia deixava o registro não idempotente.
- 2026-10-28 · claude · Skill `componente-rds` (provar que a peça não existe → construir → registrar → declarar → encaixar → provar), ponteiro no `AGENTS.md` e `.github/workflows/trava.yml` (`test:unit` + `docs:check` em todo PR; não roda no Storybook).
- 2026-10-28 · claude · Prova no `separator`: registrar criou o MD; a intenção foi escrita a partir do código, do `divisor.md` do PASSI e do texto antigo (lido do git). A página `/components/separator` mostrou a descrição e as props certas, sem marcação crua. Lacuna achada e corrigida na skill: o texto antigo sai do `component-docs.ts` quando o MD nasce, então a fonte passa a ser o git. Final: `vitest --project unit` 1179/1179, `tsc` sem erro, `docs:check` verde.

## Histórico
