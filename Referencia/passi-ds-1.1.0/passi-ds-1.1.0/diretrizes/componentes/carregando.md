# Carregando

Componente do PASSI DS 1.1.0 · página "Carregando" no arquivo Figma.

Quando algo demora, a pessoa precisa saber que o sistema está trabalhando. O indicador giratório serve para esperas curtas. O esqueleto mostra a forma do conteúdo antes de ele aparecer, o que faz a espera parecer menor.

## Carregando

Carregando · indicador giratório para esperas curtas, sem duração conhecida. Gire o “Arco” no código (animação de rotação contínua de 0,8 s). Use “Sobre cor” dentro de botões e fundos coloridos.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Cor | Variante | Marca, Neutro, Sobre cor | Marca |
| Tamanho | Variante | P, M, G | P |

## Esqueleto

Esqueleto · formas cinzas que antecipam o layout enquanto o conteúdo carrega. Aplique uma animação suave de brilho no código.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Texto, Item de lista, Card | Texto |

## Como usar

### Indicador giratório

P (16 px) dentro de botões e campos. M (24 px) em cards e listas. G (40 px) para a página inteira.

Exemplos no Figma: P; M; G; Neutro; Sobre cor.

### Esqueleto

Use quando já se sabe a forma do conteúdo: listas, cards e textos.

Exemplos no Figma: Texto; Item de lista; Card.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Para esperas longas, diga o que está acontecendo: Gerando seu PDF…
- Use reticências só enquanto algo acontece.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Não recebe foco.
- Leitor de tela: O indicador tem o nome Carregando e fica numa região que anuncia mudanças de forma discreta. O esqueleto fica escondido do leitor; anuncie só quando o conteúdo chegar.
- Foco: Não mova o foco enquanto carrega. Quando o conteúdo chega, o foco continua onde estava.
- Cuidados: Respeite quem pede menos movimento: o giro pode virar uma pulsação suave.

## Tokens usados

Indicador: cor/fundo/marca, cor/texto/padrao ou cor/texto/sobre-marca, com trilho transparente. Esqueleto: cor/fundo/sutil-hover sobre cor/fundo/superficie.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mostre o indicador só depois de meio segundo de espera.
- Prefira o esqueleto em listas e páginas de conteúdo.
- Explique esperas longas com um texto, como “Gerando seu PDF…”.

## NÃO faça

- Vários indicadores girando na mesma tela.
- Bloquear a tela inteira para carregar só uma parte.
- Esqueletos que não se parecem com o conteúdo final.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
