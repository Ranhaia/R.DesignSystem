# Seletor de cor

Componente do PASSI DS 1.1.0 · página "Seletor de cor" no arquivo Figma.

O seletor de cor deixa a pessoa escolher uma cor. Na maioria dos casos, amostras prontas bastam e evitam combinações ruins. O painel completo serve para quem precisa de qualquer cor.

## Amostra de cor

Amostra de cor · uma cor para escolher. Troque o preenchimento do círculo interno pela cor desejada.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Estado | Variante | Padrão, Hover, Pressionado, Selecionada | Padrão |

## Seletor de cor

Seletor de cor · Amostras (escolha rápida entre cores definidas), Campo (mostra a cor e o código) e Painel (escolha livre com saturação, matiz, código hexadecimal, opacidade e conta-gotas).

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Amostras, Campo, Painel | Amostras |

## Como usar

### Tipos

Prefira Amostras. Use o Painel só quando a pessoa realmente precisar de qualquer cor, como em ferramentas de criação.

Exemplos no Figma: Amostras; #2544EC; Campo; 100%; Cores do sistema; Painel.

### Amostra de cor

Exemplos no Figma: Padrão; Hover; Pressionado; Selecionada.

### Modo escuro

Exemplos no Figma: #2544EC; 100%; Cores do sistema.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Dê nome às amostras: Azul da marca.
- Mostre o código da cor para quem precisa copiar.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab entra nas amostras; setas passam de uma amostra para outra; Enter ou Espaço escolhem. No painel completo, o campo de código da cor é a alternativa ao arrasto.
- Leitor de tela: Cada amostra tem o nome da cor em texto, por exemplo Azul da marca, e anuncia se está selecionada.
- Foco: Anel de foco na amostra.
- Cuidados: A escolha nunca depende só de enxergar a cor: mostre o nome e o código. Avise quando a cor escolhida tiver pouco contraste com o texto.

## Tokens usados

Amostra: borda cor/borda/marca (selecionada), cor/borda/forte (hover) e cor/borda/controle (pressionado). Painel: cor/fundo/superficie, Sombra/Média, raio/grande. Gradientes de saturação e matiz são ilustrativos.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Ofereça amostras com as cores da marca antes da escolha livre.
- Mostre o código da cor para quem precisa copiar.
- Avise quando a cor escolhida tiver pouco contraste com o texto.

## NÃO faça

- Depender só da cor para identificar as amostras. Dê nome a cada uma na dica flutuante.
- Painéis de cor em formulários comuns.
- Esconder a cor atual depois da escolha.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
