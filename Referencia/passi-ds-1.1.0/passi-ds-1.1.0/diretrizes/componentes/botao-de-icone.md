# Botão de ícone

Componente do PASSI DS 1.1.0 · página "Botão de ícone" no arquivo Figma.

O botão de ícone executa uma ação usando só um símbolo, como fechar, curtir ou compartilhar. Ele economiza espaço, mas só funciona com ícones que todo mundo reconhece.

## Botão de ícone

Botão de ícone · ação representada só por um ícone, como fechar, curtir ou mais opções. Sempre acompanhe de uma dica flutuante e de um nome acessível (texto alternativo).

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Ícone | Troca de ícone ou componente |  |  |
| Tipo | Variante | Primário, Secundário, Contorno, Fantasma | Primário |
| Tamanho | Variante | P, M, G | P |
| Estado | Variante | Padrão, Hover, Pressionado, Foco, Desabilitado | Padrão |

## Como usar

### Tipos

Exemplos no Figma: Primário; Secundário; Contorno; Fantasma.

### Tamanhos

P (32 px), M (40 px) e G (48 px). No celular, use M ou G para garantir uma área de toque confortável.

Exemplos no Figma: P; M; G.

### Estados

Exemplos no Figma: Padrão; Hover; Pressionado; Foco; Desabilitado.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- O nome acessível e a dica flutuante dizem a ação com verbo: Fechar, Copiar link.
- Use o mesmo nome em todas as telas para o mesmo ícone.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega ao botão. Enter ou Espaço executam a ação.
- Leitor de tela: Papel button. Como não há texto visível, dê um nome em texto, por exemplo Fechar ou Compartilhar capítulo. O ícone fica escondido do leitor.
- Foco: Anel de foco de 2 px, ou borda azul por fora nos tipos sem fundo.
- Cuidados: Sempre com Dica flutuante mostrando o mesmo nome. Área de toque de pelo menos 24 px, mesmo no tamanho P. Botões de alternar, como curtir, anunciam se estão ligados ou desligados.

## Tokens usados

As mesmas do Botão: cor/fundo/marca, cor/fundo/invertido, cor/fundo/sutil, cor/fundo/fantasma-hover, os estados pressionado (cor/fundo/marca-pressionado, cor/fundo/invertido-pressionado, cor/fundo/sutil-hover, cor/fundo/fantasma-pressionado), cor/borda/forte, cor/borda/foco. Canto: raio/pilula.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use ícones conhecidos: fechar, busca, mais opções, compartilhar.
- Adicione uma dica flutuante com o nome da ação.
- Dê um nome acessível para leitores de tela.

## NÃO faça

- Usar ícone sozinho para ações raras ou ambíguas.
- Colocar muitos botões de ícone lado a lado sem espaço.
- Usar o tipo Primário para várias ações na mesma área.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
