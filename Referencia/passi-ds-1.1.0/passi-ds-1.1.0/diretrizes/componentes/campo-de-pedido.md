# Campo de pedido

Componente do PASSI DS 1.1.0 · página "Campo de pedido" no arquivo Figma.

O campo de pedido é onde a pessoa escreve para a IA. Ele sugere por onde começar, mostra quando a IA está gerando e deixa parar a qualquer momento. Embaixo, um aviso curto lembra que a IA pode errar.

## Campo de pedido

Campo de pedido · onde a pessoa escreve para a IA. Vazio mostra sugestões de pedido e o botão de enviar desabilitado. Digitando habilita o envio. Gerando troca o envio pelo botão Parar. O aviso de que a IA pode errar fica sempre visível embaixo.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Mostrar aviso | Liga/desliga |  | Ligado |
| Estado | Variante | Vazio, Digitando, Gerando | Vazio |

## Como usar

### Estados

Vazio com sugestões e envio desabilitado. Digitando com a borda azul e o envio liberado. Gerando com o botão Parar no lugar do envio.

Exemplos no Figma: Vazio; Digitando; Gerando.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- O texto de exemplo convida a perguntar: Pergunte algo sobre o livro.
- Sugestões são pedidos completos e curtos: Resuma o capítulo 3.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Enter envia e Shift+Enter quebra a linha. Tab passa por anexar e enviar. Durante a geração, Esc ou o botão Parar interrompem.
- Leitor de tela: O campo tem rótulo, mesmo que escondido na tela, por exemplo Pergunte algo sobre o livro. As sugestões são botões. O início e o fim da geração são anunciados de forma discreta, nunca palavra por palavra.
- Foco: O foco fica no campo depois de enviar, para a pessoa continuar a conversa.
- Cuidados: O botão Parar precisa estar sempre ao alcance do teclado enquanto a IA gera. O aviso de erro da IA fica visível, não só no leitor de tela.

## Tokens usados

Caixa: cor/fundo/superficie, cor/borda/controle e cor/borda/marca (2 px ao digitar), raio/extra. Sugestões: cor/fundo/superficie, cor/borda/padrao, raio/pilula. Pedido: cor/texto/padrao e cor/texto/terciario. Aviso: cor/texto/secundario. Botões: Botão de ícone e Botão.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Ofereça de 2 a 4 sugestões curtas para começar.
- Deixe a pessoa parar a geração a qualquer momento.
- Mantenha o aviso de que a IA pode errar sempre visível.

## NÃO faça

- Enviar o pedido sozinho enquanto a pessoa digita.
- Apagar o pedido se a geração falhar.
- Usar o campo de pedido onde um formulário comum resolve.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
