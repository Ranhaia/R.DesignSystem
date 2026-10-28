# Janela de ações

Padrão do PASSI DS 1.1.0 · página "Janela de ações" no arquivo Figma.

No celular, as ações sobre um item aparecem numa folha que sobe da parte de baixo da tela, perto do polegar. O botão flutuante abre atalhos para criar coisas novas.

## Janela de ações

Janela de ações · folha que sobe da base da tela no celular com ações sobre um item, folha de compartilhar e ações flutuantes que abrem a partir de um botão principal.

- Variantes · Tipo: Folha de ações, Compartilhar, Ações flutuantes

## Como usar

### Tipos

### Em uso

A folha sobe sobre a tela escurecida. Toque fora ou arraste a alça para baixo para fechar.

## Feito com

Botão (cancelar), Sobreposição, ícones e cor/fundo/superficie com cantos superiores de 24 px. Ações flutuantes com Sombra/Média e Sombra/Grande.

## Faça

- Coloque a ação destrutiva por último, em vermelho.
- Ofereça sempre um jeito claro de cancelar.
- Use títulos que lembrem sobre qual item a pessoa está agindo.

## NÃO faça

- Mais de 6 ações na mesma folha.
- Usar a folha de ações no computador. Prefira um Menu.
- Botão flutuante em telas que já têm uma ação principal visível.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
