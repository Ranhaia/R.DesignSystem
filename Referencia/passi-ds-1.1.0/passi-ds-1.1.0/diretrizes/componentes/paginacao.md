# Paginação

Componente do PASSI DS 1.1.0 · página "Paginação" no arquivo Figma.

A paginação divide listas longas em páginas menores e permite ir para a anterior, a próxima ou uma página específica.

## Página

Página · número dentro da Paginação.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Número | Texto |  | 2 |
| Estado | Variante | Atual, Padrão, Hover, Pressionado, Reticências | Atual |

## Paginação

Paginação · divide listas longas em páginas. Números para listas navegáveis, Simples quando a posição exata importa pouco, Compacta para espaços pequenos e celular.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Números, Simples, Compacta | Números |

## Como usar

### Tipos

Exemplos no Figma: Números; Simples; Compacta.

### Estados da página

Exemplos no Figma: Atual; Padrão; Hover; Pressionado; Reticências.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Anterior e Próxima, com nome completo para leitor de tela: Página 3.
- Mostre o total quando ajudar: Página 3 de 12.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab passa por Anterior, pelos números e por Próximo.
- Leitor de tela: Fica dentro de uma navegação com o nome Paginação. Cada número tem nome completo, por exemplo Página 3, e a página atual é marcada como atual.
- Foco: Anel de foco em cada botão. Depois de trocar de página, leve o foco para o começo da lista nova.
- Cuidados: Anterior e Próximo ficam desabilitados de forma anunciada na primeira e na última página.

## Tokens usados

Página atual: cor/fundo/invertido e cor/texto/invertido. Hover: cor/fundo/sutil. Pressionado: cor/fundo/sutil-hover. Texto: cor/texto/padrao, cor/texto/secundario. Canto: raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mostre a primeira, a última e as páginas vizinhas da atual.
- Desabilite “Anterior” na primeira página e “Próxima” na última.
- Mantenha a paginação no mesmo lugar em todas as páginas.

## NÃO faça

- Mostrar todos os números quando há muitas páginas.
- Paginar listas curtas, com menos de 20 itens.
- Áreas de clique menores que 36 px.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
