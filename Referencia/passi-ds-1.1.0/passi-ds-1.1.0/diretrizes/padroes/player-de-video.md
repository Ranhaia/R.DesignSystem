# Player de vídeo

Padrão do PASSI DS 1.1.0 · página "Player de vídeo" no arquivo Figma.

O player mostra vídeos com controles claros: tocar, avançar, volume, legendas e tela cheia. Os controles aparecem sobre o vídeo e somem enquanto a pessoa assiste.

## Player de vídeo

Player de vídeo · Pausado (com botão grande de tocar e duração), Tocando (barra de controles com progresso, tempo, volume, legendas, ajustes e tela cheia) e Miniatura (flutuante, enquanto a pessoa navega). Troque a imagem do vídeo.

- Variantes · Estado: Pausado, Tocando, Miniatura

## Como usar

### Estados

## Feito com

Cor da marca no botão de tocar e no progresso; controles brancos sobre gradiente escuro para manter o contraste em qualquer vídeo. Ícones de mídia desenhados no mesmo traço do sistema.

## Faça

- Ofereça legendas em todos os vídeos.
- Mostre a duração antes de a pessoa apertar o play.
- Deixe os controles acessíveis pelo teclado (espaço para pausar).
- Não toque o vídeo sozinho com som.

## NÃO faça

- Esconder o botão de pausar.
- Vídeos que começam com som automaticamente.
- Controles pequenos demais para tocar no celular.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
