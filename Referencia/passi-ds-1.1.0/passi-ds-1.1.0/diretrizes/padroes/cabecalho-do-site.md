# Cabeçalho do site

Padrão do PASSI DS 1.1.0 · página "Cabeçalho do site" no arquivo Figma.

O cabeçalho fica no topo de todas as páginas. Ele mostra a marca, as seções principais do site e as ações mais importantes, como entrar ou comprar.

## Item de navegação

Item de navegação · link do menu principal do site. O estado Ativo marca a página atual com um traço azul.

- Variantes · Estado: Padrão, Hover, Pressionado, Ativo

## Cabeçalho do site

Cabeçalho do site · topo fixo com marca, navegação principal e ações. No celular, a navegação vai para um menu que abre em tela cheia. Usa Item de navegação, Botão e Botão de ícone.

- Variantes · Tipo: Computador, Computador com aviso, Celular, Celular com menu aberto

## Como usar

### Computador

Marca à esquerda, navegação no centro e ações à direita. A página atual fica marcada.

### Com faixa de aviso

Uma faixa fina acima do cabeçalho para promoções ou avisos importantes. Use com moderação.

### Celular

No celular ficam só a marca, a busca e o botão de menu. O menu abre em tela cheia, com itens grandes para o toque.

### Item de navegação

## Feito com

Item de navegação (novo), Botão (Primário e Contorno), Botão de ícone (busca, menu, fechar). Fundo cor/fundo/pagina com linha cor/borda/padrao.

## Faça

- Mantenha no máximo 5 a 7 itens na navegação principal.
- Marque a página atual.
- Deixe a ação principal (comprar, assinar) sempre visível.
- No celular, use itens com pelo menos 48 px de altura.

## NÃO faça

- Esconder a busca em sites com muito conteúdo.
- Menus com dois níveis no celular.
- Mudar a ordem dos itens entre páginas.
- Faixas de aviso que não podem ser fechadas e aparecem sempre.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
