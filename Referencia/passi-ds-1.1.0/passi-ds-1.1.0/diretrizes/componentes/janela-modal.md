# Janela modal

Componente do PASSI DS 1.1.0 · página "Janela modal" no arquivo Figma.

A janela modal aparece por cima da tela e pede uma decisão ou uma informação curta antes de continuar. O fundo escurece para focar a atenção na janela.

## Janela modal

Janela modal · interrompe a tela para pedir uma decisão ou uma informação curta. Sempre com Sobreposição atrás, título claro e ação principal à direita. Tipos: Padrão (560 px), Confirmação (420 px) e Formulário (560 px).

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Título | Texto |  | Baixar o arquivo do PASSI DS |
| Descrição | Texto |  | O arquivo será duplicado na sua conta do Figma. |
| Tipo | Variante | Padrão, Confirmação, Formulário | Padrão |

## Como usar

### Tipos

Exemplos no Figma: Padrão; Confirmação; Formulário.

### Em uso

A janela aparece centralizada, com a sobreposição cobrindo o resto da tela.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Título como pergunta ou ação: Excluir capítulo?
- Diga a consequência na descrição.
- O botão principal repete o verbo do título: Excluir capítulo.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab e Shift+Tab ficam presos dentro da janela. Esc fecha, a não ser em decisões que exigem resposta.
- Leitor de tela: Papel dialog marcado como modal, com o título como nome e a descrição ligada. O resto da página fica inacessível enquanto a janela está aberta.
- Foco: Ao abrir, o foco vai para o primeiro campo ou para o título. Ao fechar, volta para o botão que abriu.
- Cuidados: Na janela de perigo, o foco inicial vai para Cancelar, não para Excluir. Use para decisões curtas; formulários longos merecem uma página.

## Tokens usados

Janela: cor/fundo/superficie, Sombra/Grande, raio/extra. Divisor das ações: cor/borda/padrao. Espaço: espaco/3 a espaco/6. Fundo da tela: Sobreposição (cor/fundo/sobreposicao).

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Escreva o título como uma pergunta ou ação clara.
- Use o verbo da ação no botão: “Excluir capítulo”, não “Sim”.
- Feche com Esc, com o “x” e com “Cancelar”.
- Leve o foco do teclado para dentro da janela.

## NÃO faça

- Abrir uma modal sobre outra modal.
- Usar para mensagens que poderiam ser um Aviso rápido.
- Formulários longos dentro da modal. Prefira uma página.
- Abrir sem que a pessoa tenha pedido.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
