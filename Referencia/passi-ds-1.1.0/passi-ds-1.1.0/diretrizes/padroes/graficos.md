# Gráficos

Padrão do PASSI DS 1.1.0 · página "Gráficos" no arquivo Figma.

Cards de gráfico para painéis de acompanhamento, como a adoção de um design system. Cada card tem título, número principal, variação e o gráfico, sempre com as cores de dados do sistema.

## Gráficos

Gráficos · cards de dados prontos para painéis: Barras, Linha, Rosca, Indicador e Barras horizontais. As cores vêm das variáveis dados/1 a dados/5. Ajuste alturas e posições para os valores reais.

- Variantes · Tipo: Barras, Linha, Rosca, Indicador, Barras horizontais

## Como usar

### Tipos

Barras para comparar períodos, Linha para tendência, Rosca para partes de um todo, Indicador para um número com tendência e Barras horizontais para ranking.

### Cores de dados

Cinco cores com contraste entre si. A cor da marca destaca o dado mais importante.

### Variáveis usadas

Novas variáveis na coleção Cor: dados/1 a dados/5 e dados/grade, com valores para claro e escuro. Card: cor/fundo/superficie, cor/borda/padrao, raio/grande.

## Faça

- Comece o eixo das barras no zero.
- Destaque só o dado mais importante com a cor da marca.
- Escreva o título como uma pergunta que o gráfico responde.
- Mostre o número principal em texto, além do gráfico.

## NÃO faça

- Gráfico de pizza com mais de 5 fatias.
- Usar cores fora da paleta de dados.
- Gráficos 3D ou com sombras.
- Legendas longe do dado que explicam.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
