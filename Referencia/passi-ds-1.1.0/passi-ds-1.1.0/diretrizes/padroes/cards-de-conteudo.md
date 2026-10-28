# Cards de conteúdo

Padrão do PASSI DS 1.1.0 · página "Cards de conteúdo" no arquivo Figma.

Cards para listar artigos, capítulos e notícias. Cada formato serve a um lugar: grade de artigos, lista lateral, destaque da página e listas numeradas de mais lidos.

## Cards de conteúdo

Cards de conteúdo · vitrines para artigos, capítulos e notícias: Artigo, Artigo horizontal, Destaque e Compacto (lista numerada). Troque a imagem pelo preenchimento do bloco “Imagem”.

- Variantes · Tipo: Artigo, Artigo horizontal, Destaque, Compacto

## Como usar

### Tipos

### Grade de artigos

Três colunas no computador, uma no celular. Todos os cards da linha com a mesma altura.

### Mais lidos

O tipo Compacto em sequência numerada, para barras laterais.

## Feito com

Selo (categoria), Avatar (autor) e ícones. Cards com cor/fundo/superficie, cor/borda/padrao e raio/grande; Destaque com gradiente da cor da marca.

## Faça

- Use imagens com a mesma proporção em toda a grade.
- Mostre o tempo de leitura.
- Deixe o card inteiro clicável, não só o título.

## NÃO faça

- Resumos com mais de duas linhas.
- Misturar tipos de card na mesma grade.
- Imagens genéricas que não dizem nada sobre o conteúdo.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
