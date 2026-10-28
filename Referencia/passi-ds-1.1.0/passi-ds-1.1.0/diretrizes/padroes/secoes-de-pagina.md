# Seções de página

Padrão do PASSI DS 1.1.0 · página "Seções de página" no arquivo Figma.

Blocos prontos para montar páginas inteiras, como a página de um produto ou de um livro. Empilhe as seções na ordem que contar melhor a sua história.

## Seções de página

Seções de página · blocos prontos para montar páginas de venda e de conteúdo: Abertura, Benefícios, Números, Depoimento e Chamada final. Largura de 1440 px com margens de 80 px.

- Variantes · Tipo: Abertura, Benefícios, Números, Depoimento, Chamada final

## Como usar

### Abertura

A primeira dobra: o que é, para quem é e o que fazer agora.

### Benefícios

Três motivos, com ícone, título e texto curto.

### Números

Provas em números grandes. Usa o modo escuro para dar ritmo à página.

### Depoimento

Uma frase forte de quem já usou, com nome e cargo.

### Chamada final

Fecha a página repetindo a ação principal, na cor da marca.

## Feito com

Botão, Selo e Avatar. Fundos cor/fundo/pagina, cor/fundo/sutil, cor/fundo/marca e modo Escuro. Títulos em Display/Grande e Título/1.

## Faça

- Comece pela Abertura e termine com a Chamada final.
- Alterne fundos (claro, sutil, escuro, azul) para separar as seções.
- Use uma única ação principal em toda a página.

## NÃO faça

- Empilhar seções iguais seguidas.
- Depoimentos sem nome ou inventados em páginas reais.
- Mais de uma chamada final na mesma página.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
