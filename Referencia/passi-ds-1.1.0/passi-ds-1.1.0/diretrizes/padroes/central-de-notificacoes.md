# Central de notificações

Padrão do PASSI DS 1.1.0 · página "Central de notificações" no arquivo Figma.

A central reúne tudo o que aconteceu enquanto a pessoa estava fora: comentários, menções e atualizações. Ela abre a partir do sino e separa o que é novo do que já foi visto.

## Item de notificação

Item de notificação · quem fez, o quê e quando. Não lida tem fundo azul claro e ponto azul.

- Variantes · Estado: Não lida, Lida

## Central de notificações

Central de notificações · painel que abre a partir do sino, com abas, grupos por data, itens lidos e não lidos e ação para marcar tudo como lido. Inclui o estado vazio e o botão com contador.

- Variantes · Tipo: Painel, Vazio, Botão com contador

## Como usar

### Tipos

### Item de notificação

## Feito com

Item de notificação (novo), Avatar, Abas, Contador, Botão e Botão de ícone. Não lida em cor/fundo/marca-sutil com ponto cor/fundo/marca.

## Faça

- Agrupe por data: hoje, esta semana, antes.
- Diga quem fez, o quê e onde, numa frase só.
- Deixe marcar como lida uma a uma ou todas de uma vez.
- Leve a pessoa direto ao conteúdo ao clicar.

## NÃO faça

- Notificar tudo. Deixe a pessoa escolher o que quer receber.
- Contadores com números enormes. Acima de 99, mostre “99+”.
- Apagar notificações sem a pessoa pedir.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
