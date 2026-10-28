# Abas

Componente do PASSI DS 1.1.0 · página "Abas" no arquivo Figma.

As abas dividem um conteúdo em partes e mostram uma de cada vez, sem sair da página. A aba ativa fica destacada para a pessoa saber onde está.

## Aba

Aba · item dentro de Abas. Use o estilo Linha. O estilo Pílula está descontinuado e sai na versão 2.0: para filtrar ou alternar a visão de uma área, use Controle segmentado.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Capítulos |
| Mostrar ícone | Liga/desliga |  | Desligado |
| Mostrar contador | Liga/desliga |  | Desligado |
| Estilo | Variante | Linha, Pílula | Linha |
| Estado | Variante | Ativa, Padrão, Hover, Pressionado, Desabilitada | Ativa |

## Abas

Abas · alterna entre visões de um mesmo conteúdo sem sair da página. Troque o estado de cada aba para mudar a seleção. Use o estilo Linha; o estilo Pílula está descontinuado (use Controle segmentado) e sai na versão 2.0.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Estilo | Variante | Linha, Pílula | Linha |

## Como usar

### Estilos

Linha é o estilo das abas: troca entre partes de um mesmo conteúdo. O estilo Pílula está descontinuado e sai na versão 2.0. Para filtrar ou alternar a visão de uma área, use o Controle segmentado.

Exemplos no Figma: Linha; Pílula (descontinuado).

### Estados da aba

Exemplos no Figma: Linha · Ativa; Linha · Padrão; Linha · Hover; Linha · Pressionado; Linha · Desabilitada; Pílula · Ativa; Pílula · Padrão; Pílula · Hover.

### Com ícone e contador

O contador mostra quantos itens existem em cada aba.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Uma ou duas palavras por aba: Capítulos, Notas.
- Substantivos, não verbos.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab entra na lista de abas e para na aba ativa. Setas trocam de aba. Tab de novo leva ao conteúdo.
- Leitor de tela: Papéis tablist, tab e tabpanel. Anuncia a aba, se está selecionada e a posição, por exemplo 2 de 4.
- Foco: Anel de foco na aba. A aba ativa se diferencia também pela linha de 2 px, não só pela cor.
- Cuidados: Abas trocam conteúdo na mesma página. Para levar a outra página, use links de navegação.

## Tokens usados

Linha: cor/borda/padrao, cor/borda/forte (hover), cor/borda/controle (pressionado) e cor/texto/padrao (ativa, 2 px). Pílula: cor/fundo/sutil (hover), cor/fundo/sutil-hover (pressionado) e cor/fundo/invertido (ativa). Texto: cor/texto/secundario. Canto: raio/pilula.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use nomes curtos, de uma ou duas palavras.
- Mantenha a ordem das abas fixa.
- Mostre a primeira aba aberta por padrão.

## NÃO faça

- Mais de 6 abas lado a lado.
- Usar abas para etapas em sequência. Para isso use Passos.
- Abas que levam para outras páginas.
- Usar o estilo Pílula em telas novas. Para filtros, use Controle segmentado.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
