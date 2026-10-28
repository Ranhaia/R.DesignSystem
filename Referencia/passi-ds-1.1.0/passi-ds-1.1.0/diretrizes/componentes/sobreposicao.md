# Sobreposição

Componente do PASSI DS 1.1.0 · página "Sobreposição" no arquivo Figma.

A sobreposição é uma camada escura e semitransparente que cobre a tela quando uma janela modal abre. Ela tira o foco do resto da página e mostra que a pessoa precisa responder antes de continuar.

## Sobreposição

Sobreposição · camada escura que cobre a tela atrás de janelas modais e gavetas, para focar a atenção. Estique até o tamanho da tela. A versão Desfocada também borra o conteúdo de trás.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Escura, Desfocada | Escura |

## Como usar

### Tipos

Escura escurece a tela. Desfocada também borra o fundo, útil quando o conteúdo de trás é muito chamativo.

Exemplos no Figma: Escura; Desfocada.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Não tem texto. O que importa está na janela por cima.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Não recebe foco. Clicar nela pode fechar a janela, mas Esc e o botão Fechar também precisam funcionar.
- Leitor de tela: Fica escondida do leitor de tela. O que importa é a Janela modal sobre ela.
- Foco: Nenhum.
- Cuidados: Escurecer o fundo ajuda quem enxerga; para o leitor de tela, quem isola o conteúdo é a marcação de janela modal.

## Tokens usados

cor/fundo/sobreposicao (preto com 60% de opacidade), igual nos modos claro e escuro.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use sempre atrás de janelas modais e gavetas laterais.
- Feche a janela ao clicar na sobreposição, quando a ação não for crítica.

## NÃO faça

- Usar a sobreposição sem nada por cima.
- Deixar o fundo tão escuro que a pessoa perca o contexto.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
