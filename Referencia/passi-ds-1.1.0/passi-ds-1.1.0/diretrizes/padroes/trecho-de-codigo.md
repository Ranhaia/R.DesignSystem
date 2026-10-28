# Trecho de código

Padrão do PASSI DS 1.1.0 · página "Trecho de código" no arquivo Figma.

O trecho de código mostra exemplos para quem vai implementar, como as variáveis do design system em CSS. Ele mantém a formatação, colore a sintaxe e permite copiar com um clique.

## Trecho de código

Trecho de código · mostra código com cores de sintaxe, números de linha, nome do arquivo e botão Copiar. Também há Terminal e o código Em linha, para usar no meio de textos. Fonte IBM Plex Mono.

- Variantes · Tipo: Bloco, Terminal, Em linha
- Variantes · Tema: Claro, Escuro

## Como usar

### Bloco

### Terminal e em linha

### Variáveis usadas

Sintaxe: cor/texto/marca (propriedades), cor/texto/sucesso (valores de variável), cor/texto/alerta (números e cores), cor/texto/terciario (comentários). Fundo: cor/fundo/sutil ou modo Escuro.

## Faça

- Mostre exemplos curtos e completos, que funcionem ao copiar.
- Indique o nome do arquivo ou a linguagem.
- Mantenha as cores de sintaxe com contraste suficiente.

## NÃO faça

- Imagens de código. Sempre use texto, para poder copiar.
- Linhas muito longas que exigem rolagem lateral.
- Misturar código e explicação no mesmo bloco.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
