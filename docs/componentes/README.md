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
- Opções de alternância em barra compacta → `toggle-group`.
- Opções estruturadas em árvore com seleção em cascata → `tree-select`.
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
- Dados estruturados em linhas e colunas → `table`.
- Status só de leitura → `badge`. Filtro ou seleção clicável → `chip` / `tag`.
- Carregando com formato conhecido → `skeleton`. Sem formato → `spinner`. Com porcentagem → `progress`.
- Nada para mostrar ainda → `empty`.

## Componentes documentados

Formato: `slug` — uma linha do que é. Os demais ainda vivem só em
`src/lib/component-docs.ts` até a migração (`H-replicar-doc-componentes`).

- [accordion](accordion.md) — Organiza o conteúdo em seções empilhadas que expandem e recolhem.
- [alert](alert.md) — Exibe uma mensagem contextual fixa na página para informar ou alertar.
- [aspect-ratio](aspect-ratio.md) — Mantém a proporção exata entre largura e altura de imagens, vídeos e embeds.
- [attachment](attachment.md) — Exibe anexo de arquivo com mídia, metadados e ações rápidas.
- [avatar](avatar.md) — Representa visualmente uma pessoa, conta ou organização com fallback.
- [badge](badge.md) — Rótulo compacto para destacar status, contagem ou metadado.
- [box](box.md) — Container flexível e sem estilo próprio para agrupar e organizar elementos.
- [breadcrumb](breadcrumb.md) — Mostra a localização da página atual na hierarquia do site.
- [bubble](bubble.md) — Exibe mensagens em formato de balão com alinhamento direcional.
- [button](button.md) — Dispara uma ação. Um primário por contexto.
- [button-group](button-group.md) — Agrupa visualmente botões e controles relacionados com bordas unificadas.
- [card](card.md) — Agrupa informações e ações sobre o mesmo assunto em uma superfície delimitada.
- [checkbox](checkbox.md) — Permite marcar ou desmarcar opções independentes em formulários.
- [chip](chip.md) — Sinaliza critérios ou atributos ativos aplicados a uma busca ou filtragem de lista.
- [collapsible](collapsible.md) — Alterna a visibilidade de uma seção de conteúdo secundário sob demanda.
- [dialog](dialog.md) — Janela sobre a tela para uma tarefa focada.
- [direction](direction.md) — Entrega o sentido de leitura aos componentes; não renderiza nada.
- [empty](empty.md) — Comunica um estado vazio em listas, tabelas ou telas sem dados.
- [field](field.md) — Estrutura controles de formulário combinando rótulo, descrição e mensagens de erro.
- [file-uploader](file-uploader.md) — Área interativa para envio de arquivos por clique ou arrastar e soltar.
- [hover-card](hover-card.md) — Exibe uma prévia flutuante de informações enriquecidas no hover ou foco.
- [icon](icon.md) — Renderiza um glifo do Material Symbols com eixos variáveis.
- [icon-button](icon-button.md) — Botão representado exclusivamente por um ícone visual.
- [input](input.md) — Campo de entrada para capturar textos ou valores de linha única.
- [input-group](input-group.md) — Agrupa campos de entrada com botões, ícones ou textos na mesma borda.
- [input-otp](input-otp.md) — Campo especializado para captura de códigos de verificação pontuais (OTP/2FA).
- [item](item.md) — Linha estruturada para exibir informações com mídia, texto e ações.
- [kbd](kbd.md) — Indica teclas ou combinações de atalhos de teclado em formato visual compacto.
- [label](label.md) — Rótulo acessível associado a controles de formulário.
- [link](link.md) — Permite navegar entre páginas, seções internas ou sites externos.
- [list](list.md) — Organiza informações textuais ou blocos de conteúdo verticalmente em lista.
- [marker](marker.md) — Exibe status em linha, notas de sistema ou divisores rotulados em conversas.
- [message](message.md) — Estrutura cada turno de fala em interfaces conversacionais ou chat.
- [native-select](native-select.md) — Menu suspenso nativo do navegador para seleção simples em dispositivos móveis.
- [pagination](pagination.md) — Divide listas longas em páginas sequenciais numeradas.
- [popover](popover.md) — Painel flutuante no clique para conteúdo rico ou configurações rápidas.
- [progress](progress.md) — Barra que indica o andamento de tarefas com duração determinada.
- [radio-group](radio-group.md) — Opções exclusivas para escolher exatamente uma alternativa visível.
- [scroll-area](scroll-area.md) — Área de rolagem customizada e consistente entre navegadores.
- [select](select.md) — Menu suspenso customizado para selecionar uma opção em listas estruturadas.
- [segmented-control](segmented-control.md) — Alternador em pílula contínua para seleção única entre 2 a 4 opções.
- [separator](separator.md) — Linha fina entre grupos do mesmo container.
- [skeleton](skeleton.md) — Placeholder com pulso que antecipa a forma do conteúdo.
- [slider](slider.md) — Controle deslizante para ajustar valores contínuos ou faixas em um trilho.
- [sonner](sonner.md) — Confirma uma ação ou exibe um aviso rápido sem interromper a pessoa.
- [speed-dial](speed-dial.md) — Botão de ação flutuante que se expande em sequência de ações secundárias.
- [spinner](spinner.md) — Indicador giratório para esperas de tempo indeterminado.
- [switch](switch.md) — Controle deslizante binário que alterna entre ativado e desativado com efeito imediato.
- [table](table.md) — Organiza informações em linhas e colunas para visualização e consulta estruturada.
- [tabs](tabs.md) — Alterna visões do mesmo conteúdo sem sair da página.
- [tag](tag.md) — Rótulo estático para categorização, metadados e status.
- [text](text.md) — Formata blocos de texto e parágrafos com escala tipográfica e semântica.
- [textarea](textarea.md) — Campo de entrada multilinha que expande verticalmente conforme o conteúdo.
- [thumbnail](thumbnail.md) — Miniatura visual com proporção fixa e fallback integrado.
- [title](title.md) — Aplica hierarquia visual e semântica a cabeçalhos e títulos de seções.
- [toggle](toggle.md) — Botão de dois estados que alterna entre ativado e desativado.
- [toggle-group](toggle-group.md) — Agrupa botões de alternância de dois estados para seleção única ou múltipla.
- [tooltip](tooltip.md) — Balão flutuante com dica curta ao passar o mouse ou receber foco.
- [tree-select](tree-select.md) — Campo de seleção em árvore para opções hierárquicas em painel flutuante.

## Crédito

Estrutura, árvore de decisão e parte do texto de acessibilidade e
conteúdo adaptados do PASSI DS, de João Passini (joaopassini.com.br),
licença CC BY 4.0. Avaliação em `Referencia/passi-ds-1.1.0/AVALIACAO.md`.
