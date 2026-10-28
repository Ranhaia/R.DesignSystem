# Menu lateral

Padrão do PASSI DS 1.1.0 · página "Menu lateral" no arquivo Figma.

O menu lateral organiza a navegação de aplicativos e áreas logadas. Ele fica sempre à esquerda, agrupa as seções por assunto e pode ser recolhido para dar mais espaço ao conteúdo.

## Item do menu lateral

Item do menu lateral · link com ícone dentro do Menu lateral. Na largura Recolhido mostra só o ícone; use uma Dica flutuante com o nome.

- Variantes · Largura: Expandido, Recolhido
- Variantes · Estado: Padrão, Hover, Pressionado, Ativo

## Menu lateral

Menu lateral · navegação de aplicativos e áreas logadas. Expandido mostra ícones e nomes em grupos; Recolhido mostra só ícones. A pessoa e a saída ficam no rodapé.

- Variantes · Largura: Expandido, Recolhido

## Como usar

### Larguras

### Em uso

Menu lateral ao lado do conteúdo principal de um aplicativo.

### Item do menu lateral

## Feito com

Item do menu lateral (novo), Campo de texto (busca), Botão de ícone (recolher), Contador, Avatar e ícones do sistema.

## Faça

- Agrupe as seções por assunto, com títulos curtos.
- Marque a seção atual com fundo e cor da marca.
- Deixe recolher o menu em telas menores.
- Mostre a dica flutuante com o nome quando estiver recolhido.

## NÃO faça

- Mais de 10 itens sem grupos.
- Ícones diferentes para a mesma seção em lugares diferentes.
- Esconder a saída da conta.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
