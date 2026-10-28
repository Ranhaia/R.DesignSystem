# Card de produto

Padrão do PASSI DS 1.1.0 · página "Card de produto" no arquivo Figma.

Cards para vender: mostram o produto, a avaliação, o preço e a ação de compra. Incluem também o item do carrinho e o resumo do pedido, que fecham a compra.

## Card de produto

Card de produto · vitrine de compra com capa, avaliação, preço e ação; item do carrinho com quantidade; e resumo do pedido. Troque a capa azul pela imagem real do produto.

- Variantes · Tipo: Vertical, Horizontal, Item do carrinho, Resumo do pedido

## Como usar

### Tipos

### Carrinho

Itens do carrinho ao lado do resumo do pedido.

## Feito com

Selo, Botão, Botão de ícone, Divisor e estrelas de avaliação em cor/fundo/alerta. Preços em Título/3.

## Faça

- Mostre o preço final com clareza, incluindo parcelas.
- Mostre o preço anterior riscado só quando houver desconto real.
- Deixe a ação de compra sempre visível.
- Explique custos extras antes do fim da compra.

## NÃO faça

- Esconder taxas até o último passo.
- Selos de urgência falsos, como “últimas unidades” em produto digital.
- Botões de compra pequenos ou de baixo contraste.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
