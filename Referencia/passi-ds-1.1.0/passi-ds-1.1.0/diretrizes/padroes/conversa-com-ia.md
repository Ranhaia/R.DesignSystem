# Conversa com IA

Padrão do PASSI DS 1.1.0 · página "Conversa com IA" no arquivo Figma.

Tela de assistente montada só com componentes do PASSI. Começa avisando que a pessoa fala com uma IA, mostra de onde vêm as respostas e deixa parar, avaliar e chegar a uma pessoa. A cor da IA aparece só nos sinais, não na tela toda.

## Conversa com IA

Conversa com IA · tela pronta de assistente: histórico à esquerda, aviso de que a pessoa fala com uma IA no topo, mensagens com fontes e ações, e o Campo de pedido com o botão Parar. No celular, o histórico vira uma tela separada.

- Variantes · Plataforma: Computador, Celular

## Como usar

### Telas

No computador, o histórico fica à esquerda e a conversa ocupa o centro, com até 680 px de largura para facilitar a leitura. No celular, a conversa ocupa a tela e o histórico abre em outra tela.

## Feito com

Aviso de IA, Mensagem da conversa (Pessoa, IA com fontes, IA gerando), Campo de pedido, Rótulo de IA, Botão, Botão de ícone. Fundo: cor/fundo/pagina e cor/fundo/sutil no histórico.

## Faça

- Avise que é uma IA antes da primeira resposta.
- Mostre as fontes e ofereça avaliar cada resposta.
- Deixe sempre visível como parar e como falar com uma pessoa.
- Use a cor da IA só no avatar, no rótulo e nos avisos.

## NÃO faça

- Pintar a tela inteira com a cor da IA ou com gradientes.
- Dar nome e rosto de pessoa ao assistente.
- Esconder o histórico ou apagar conversas sem avisar.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
