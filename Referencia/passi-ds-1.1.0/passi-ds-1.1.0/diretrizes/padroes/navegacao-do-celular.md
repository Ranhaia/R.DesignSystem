# Navegação do celular

Padrão do PASSI DS 1.1.0 · página "Navegação do celular" no arquivo Figma.

No celular, a navegação principal fica embaixo, ao alcance do polegar. No topo, a barra superior mostra onde a pessoa está, o botão de voltar e as ações da tela.

## Item da barra inferior

Item da barra inferior · destino principal do aplicativo no celular, com ícone e nome curto.

- Variantes · Estado: Ativo, Padrão

## Navegação do celular

Navegação do celular · barra inferior com os destinos principais (4 ou 5) e barras superiores com voltar, título e ações. A área de 20 px embaixo respeita a linha de gesto do celular.

- Variantes · Tipo: Barra inferior · 4 itens, Barra inferior · 5 itens, Barra inferior · botão central, Barra superior, Barra superior · título grande

## Como usar

### Barra inferior

De 3 a 5 destinos, sempre com ícone e nome. O destino atual ganha fundo azul claro.

### Barra superior

### Em uso

Barra superior e barra inferior na mesma tela.

## Feito com

Item da barra inferior (novo), Botão de ícone, Contador e ícones do sistema.

## Faça

- Use de 3 a 5 destinos na barra inferior.
- Mantenha a barra inferior igual em todas as telas principais.
- Deixe a área de toque de cada item com pelo menos 48 px.

## NÃO faça

- Usar a barra inferior para ações, como “Salvar”.
- Ícones sem nome embaixo.
- Esconder a barra inferior ao rolar em telas de navegação principal.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
