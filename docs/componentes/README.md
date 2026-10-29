# Componentes do R.DS — porta de entrada

Este arquivo é o primeiro que um agente lê antes de usar ou mexer em
componente. Ele **só roteia**: diz qual arquivo abrir. Não leia a pasta
inteira.

Cada componente tem um MD em `docs/componentes/<slug>.md`, com as mesmas
seções sempre na mesma ordem ([_modelo.md](_modelo.md)). O MD é a **fonte
da documentação** do componente (decisão de 2026-10-27, ver
`_trabalho/H-referencia-passi-ds.md`). O código continua em
`src/components/ui/<slug>.tsx`.

> `docs/active/componentes/<slug>/spec.md` é outra coisa: o registro de
> **construção** de um componente novo. Quando o componente fica pronto,
> o que vale para quem usa passa a morar aqui.

## Memória: vivo, coleta e histórico

Modelo do Rayner Lemos (TIM DS Brain), decidido em `_trabalho/E-memoria-componentes.md`:

- `<slug>.md` — **descritivo vivo**: o componente como ele é hoje.
- `coleta/<slug>.json` — o que o script leu do `.tsx` no último registro.
- `historico/<slug>.md` — **só acrescenta**: o que mudou na estrutura e por quê.

Mudou um componente? `npm run docs:registrar -- <slug> --motivo "por quê"`.
É o único que grava as seções geradas, a coleta e o histórico. O teste
`src/lib/memoria-componentes.test.ts` reprova código mudado sem registro.
O que a coleta não conseguiu ler e o auditor completou vai para
[historico/_lacunas.md](historico/_lacunas.md).

## Antes de tudo

1. Só componente do catálogo (`src/components/ui/`). Não invente peça.
2. Só token. Nada de cor, medida ou duração solta — regra e trava em
   `CLAUDE.md`, seção "Só token, num lugar só".
3. Pedido com nome vago ("toast", "modal", "abas")? Traduza pelo
   [sinonimos.json](../sinonimos.json).
4. Antes de montar uma tela inteira, veja se já existe um pattern em
   `src/components/patterns/`.
5. Texto de interface em português do Brasil, botão começa com verbo.

## Regras gerais (valem para todo componente)

Moram só aqui; os MDs não repetem. Adaptadas do PASSI DS para o que o R.DS já mede.

- **Meta de acessibilidade:** WCAG 2.2 AA, tendo a ABNT NBR 17225 como base brasileira. Contraste e alvo são medidos em `docs/a11y/` (`npm run test:a11y:todos`).
- **Só token** para cor, medida, raio, sombra, tempo e texto (`CLAUDE.md`, "Só token, num lugar só").
- **Claro e escuro, nos 5 presets,** sem mudar a marcação: quem muda são os tokens.
- **Foco visível** em tudo que é clicável: anel de 3 px em `ring`, só no `focus-visible`. Alvo mínimo de 24 px (44 px é a Regra da Casa).
- **Clicável tem 5 estados:** padrão, hover, pressionado, foco e desabilitado.
- **A cor nunca é o único sinal:** estado também tem ícone, forma ou texto.

## Como escrever um MD

Cada seção tem critério de aceite em [_baliza.md](_baliza.md), junto com a
tabela completa de "quando não usar → use". O passo a passo de criar,
mudar ou documentar um componente está em `.claude/skills/componente-rds/SKILL.md`.

## Árvore de decisão

Escolher o componente errado é o erro mais comum. Resolva aqui primeiro.

**Agir ou ir para outro lugar**
- Dispara uma ação → `button`. Leva a outra página → `link`.
- Ação só com ícone → `icon-button` (com `aria-label` e `tooltip`).
- Ação principal + variações → `split-button`. Várias ações flutuantes → `speed-dial`.
- Ações relacionadas lado a lado → `button-group`.

**Escolher**
- 1 de 2 a 4 opções, troca a visão na hora → `segmented-control`.
- 1 de poucas opções num formulário → `radio-group`.
- 1 de 5 ou mais → `select` (`native-select` no celular).
- Lista longa, com digitação → `combobox`. Várias de uma lista longa → `multi-select`.
- Opções independentes → `checkbox`. Liga/desliga que vale na hora → `switch`.
- Valor aproximado num intervalo → `slider`. Data → `calendar`. Hora → `time-picker`.

**Mostrar mensagem**
- Fica na página, perto do assunto → `alert`.
- Confirma algo e some sozinha → `sonner`.
- Interrompe para pedir decisão → `alert-dialog`. Tarefa focada (editar, preencher) → `dialog`.
- Painel lateral com conteúdo longo → `sheet`. No celular, vindo de baixo → `drawer`.
- Explica um elemento no hover/foco → `tooltip`. Painel pequeno no clique → `popover`.

**Organizar conteúdo**
- Visões do mesmo conteúdo, uma por vez → `tabs`. Etapas em sequência → `stepper`.
- Seções que abrem e fecham → `accordion` (uma só → `collapsible`).
- Agrupar informação de um assunto → `card`. Lista de itens parecidos → `item` / `list`.
- Status só de leitura → `badge`. Filtro ou seleção clicável → `chip` / `tag`.
- Carregando com formato conhecido → `skeleton`. Sem formato → `spinner`. Com porcentagem → `progress`.
- Nada para mostrar ainda → `empty`.

## Componentes documentados

Formato: `slug` — uma linha do que é. Os demais ainda vivem só em
`src/lib/component-docs.ts` até a migração (`H-replicar-doc-componentes`).

- [box](box.md) — Container flexível e sem estilo próprio para agrupar e organizar elementos.
- [button](button.md) — Dispara uma ação. Um primário por contexto.
- [dialog](dialog.md) — Janela sobre a tela para uma tarefa focada.
- [direction](direction.md) — Entrega o sentido de leitura aos componentes; não renderiza nada.
- [icon](icon.md) — Renderiza um glifo do Material Symbols com eixos variáveis.
- [label](label.md) — Rótulo acessível associado a controles de formulário.
- [separator](separator.md) — Linha fina entre grupos do mesmo container.
- [skeleton](skeleton.md) — Placeholder com pulso que antecipa a forma do conteúdo.
- [tabs](tabs.md) — Alterna visões do mesmo conteúdo sem sair da página.
- [text](text.md) — Formata blocos de texto e parágrafos com escala tipográfica e semântica.
- [title](title.md) — Aplica hierarquia visual e semântica a cabeçalhos e títulos de seções.

## Crédito

Estrutura, árvore de decisão e parte do texto de acessibilidade e
conteúdo adaptados do PASSI DS, de João Passini (joaopassini.com.br),
licença CC BY 4.0. Avaliação em `Referencia/passi-ds-1.1.0/AVALIACAO.md`.
