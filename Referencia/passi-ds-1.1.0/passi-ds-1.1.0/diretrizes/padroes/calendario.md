# Calendário

Padrão do PASSI DS 1.1.0 · página "Calendário" no arquivo Figma.

O calendário ajuda a escolher uma data ou um período, como a data de uma mentoria ou as férias da equipe. Ele aparece sob o campo de data e mostra o mês inteiro de uma vez.

## Dia

Dia · uma célula do Calendário. Início, Meio e Fim formam um intervalo.

- Variantes · Estado: Padrão, Hover, Pressionado, Hoje, Selecionado, Início, Meio, Fim, Fora do mês, Desabilitado

## Calendário

Calendário · escolha de data ou de intervalo de datas, mostrado aberto sob um campo ou dentro de uma página. Hoje fica com contorno azul. Usa Dia, Botão e Botão de ícone.

- Variantes · Tipo: Data única, Intervalo, Com dias bloqueados

## Como usar

### Tipos

Data única fecha ao escolher o dia. Intervalo pede início e fim e confirma com “Aplicar”.

### Com campo de data

O calendário abre logo abaixo do campo. A pessoa também pode digitar a data direto.

### Estados do dia

## Feito com

Dia (novo), Botão de ícone (mês anterior e próximo), Botão (Limpar e Aplicar) e Campo de texto com ícone de calendário.

## Faça

- Marque o dia de hoje.
- Permita digitar a data, além de clicar.
- Mostre o período escolhido em texto, como “12 a 16 de out”.
- Comece a semana no domingo, como no calendário brasileiro.

## NÃO faça

- Usar calendário para datas distantes, como data de nascimento. Prefira três campos ou digitação.
- Deixar dias indisponíveis sem explicar o motivo.
- Esconder o ano quando ele importa.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
