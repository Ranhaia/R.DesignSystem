# Tabela de dados

Padrão do PASSI DS 1.1.0 · página "Tabela de dados" no arquivo Figma.

A tabela organiza muitos itens em linhas e colunas, para comparar, ordenar e agir sobre eles. Aqui ela mostra o inventário de componentes de um design system, como sugere o livro.

## Tabela de dados

Tabela de dados · lista com colunas para comparar itens: barra com busca e filtros, cabeçalho com ordenação, linhas com seleção, selos de status, responsável, uso e ações, e paginação. Inclui os estados Com seleção e Vazia.

- Variantes · Tipo: Padrão, Com seleção, Vazia

## Como usar

### Padrão

Barra com título, busca, filtro e ação principal. A coluna “Atualizado” está ordenada.

### Com seleção

Ao marcar linhas, a barra escura mostra a contagem e as ações em lote.

### Vazia

Quando não há itens, explique o motivo e ofereça o primeiro passo.

## Feito com

Checkbox, Selo, Avatar, Campo de texto, Botão e Paginação. Linhas de 56 px com divisores cor/borda/padrao; cabeçalho em cor/fundo/sutil.

## Faça

- Alinhe números à direita e textos à esquerda.
- Mostre qual coluna está ordenada.
- Use selos para status, nunca só cor no texto.
- Mantenha a primeira coluna com o nome do item.

## NÃO faça

- Mais de 7 colunas visíveis ao mesmo tempo.
- Ações importantes só no menu de “mais opções”.
- Tabelas no celular. Prefira uma lista de cards.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
