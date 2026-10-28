# Planos e preços

Padrão do PASSI DS 1.1.0 · página "Planos e preços" no arquivo Figma.

Páginas de preço comparam opções lado a lado. O plano recomendado fica no centro, destacado, e cada card mostra preço, ação e o que está incluído.

## Card de plano

Card de plano · nome, descrição, preço, ação e lista de recursos. Use Destaque=Sim em um único plano, o recomendado.

- Variantes · Destaque: Não, Sim

## Grade de planos

Grade de planos · título, alternância Mensal/Anual e três cards de plano lado a lado, com o recomendado no centro.

## Como usar

### Card de plano

### Grade de planos

Valores e planos de exemplo. Troque pelos seus.

## Feito com

Card de plano (novo), Botão, Selo e Controle segmentado (mensal ou anual). Plano recomendado com borda cor/borda/marca e Sombra/Grande.

## Faça

- Mostre no máximo 3 ou 4 planos.
- Destaque um único plano recomendado.
- Use os mesmos recursos na mesma ordem em todos os cards.
- Deixe claro o período: por mês, por ano, para sempre.

## NÃO faça

- Esconder o preço atrás de “fale conosco” no plano mais comum.
- Letras miúdas com condições importantes.
- Comparar recursos diferentes em cada card.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
