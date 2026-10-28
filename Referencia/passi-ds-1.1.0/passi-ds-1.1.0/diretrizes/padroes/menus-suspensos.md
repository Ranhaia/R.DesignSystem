# Menus suspensos

Padrão do PASSI DS 1.1.0 · página "Menus suspensos" no arquivo Figma.

Menus que abrem sobre a página: o menu de contexto, com submenus, o menu da conta, que abre a partir do avatar, e o mega menu, para sites com muitas seções.

## Menus suspensos

Menus suspensos · Contexto com submenu (clique com o botão direito), Conta (a partir do avatar) e Mega menu (navegação com muitas seções, com destaque). Usa Item de menu, Avatar, Item de navegação e Selo.

- Variantes · Tipo: Contexto com submenu, Conta, Mega menu

## Como usar

### Contexto e conta

### Mega menu

Abre a partir de um item da navegação principal. Organize em colunas por assunto e use o destaque para a ação mais importante.

## Feito com

Item de menu, Avatar, Item de navegação, Selo e ícones. Painéis com cor/fundo/superficie, Sombra/Média ou Sombra/Grande, raio/grande e raio/extra.

## Faça

- Mostre uma seta nos itens que abrem submenu.
- Feche o menu ao escolher uma opção ou apertar Esc.
- No mega menu, use descrições curtas para cada link.

## NÃO faça

- Mais de um nível de submenu.
- Mega menus no celular. Use o menu em tela cheia.
- Abrir menus só com o hover, sem clique.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
