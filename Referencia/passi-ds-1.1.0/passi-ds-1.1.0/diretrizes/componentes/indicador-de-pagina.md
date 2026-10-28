# Indicador de página

Componente do PASSI DS 1.1.0 · página "Indicador de página" no arquivo Figma.

O indicador de página mostra, com pontos, em qual tela de um carrossel ou de uma introdução a pessoa está. O ponto alongado é a tela atual.

## Indicador de página

Indicador de página · pontos que mostram em qual tela de um carrossel ou introdução a pessoa está. O ponto ativo é alongado. Para mudar a posição, reordene o ponto “Ativo”.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Fundo | Variante | Claro, Sobre imagem | Claro |
| Quantidade | Variante | 3, 4, 5 | 3 |

## Como usar

### Quantidades

Exemplos no Figma: 3 telas; 4 telas; 5 telas.

### Sobre imagem

Uma cápsula escura garante contraste sobre fotos.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Para leitor de tela, diga a posição: Tela 2 de 4.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Pontos só informativos não recebem foco. Se forem clicáveis, cada ponto é um botão.
- Leitor de tela: Anuncie a posição em texto, por exemplo Tela 2 de 4, em vez de ler cada ponto.
- Foco: Anel de foco nos pontos clicáveis.
- Cuidados: A tela atual se diferencia pela forma alongada, não só pela cor. Pontos clicáveis precisam de área de toque de 24 px.

## Tokens usados

Ativo: cor/fundo/marca. Demais pontos: cor/borda/forte. Sobre imagem: branco com transparência sobre cápsula escura.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use em sequências curtas, de até 5 telas.
- Combine com setas ou gesto de arrastar.
- Centralize abaixo do conteúdo.

## NÃO faça

- Usar como única forma de navegar.
- Sequências longas com muitos pontos.
- Pontos pequenos demais para tocar, se forem clicáveis.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
