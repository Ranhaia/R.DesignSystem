# Controle segmentado

Componente do PASSI DS 1.1.0 · página "Controle segmentado" no arquivo Figma.

O controle segmentado alterna entre poucas opções que se excluem, como mensal e anual. A troca é imediata e todas as opções ficam sempre visíveis.

## Segmento

Segmento · uma opção dentro do Controle segmentado. Use o componente completo, não este item solto.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Mensal |
| Estado | Variante | Selecionado, Padrão, Hover, Pressionado, Desabilitado | Selecionado |

## Controle segmentado

Controle segmentado · alterna entre 2 a 4 visões ou opções exclusivas, como “Mensal / Anual”. Troque o estado de cada opção para mudar a seleção. Substitui o estilo Pílula das Abas, que está descontinuado.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Opções | Variante | 2, 3, 4 | 2 |

## Como usar

### Quantidade de opções

Exemplos no Figma: 2 opções; 3 opções; 4 opções.

### Estados do segmento

Exemplos no Figma: Selecionado; Padrão; Hover; Pressionado; Desabilitado.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Uma ou duas palavras por opção: Mensal, Anual.
- Todas as opções no mesmo formato e com tamanho parecido.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab entra no controle e para na opção ativa. Setas mudam a opção.
- Leitor de tela: Funciona como um grupo de rádios: papel radiogroup com nome e cada segmento como radio. Anuncia a opção selecionada.
- Foco: Anel de foco na opção que recebe o teclado.
- Cuidados: Use no máximo 5 opções, com textos curtos. A opção ativa se diferencia também pelo fundo branco e pela sombra, não só pela cor do texto.

## Tokens usados

Trilho: cor/fundo/sutil. Opção no hover: cor/fundo/fantasma-hover; pressionada: cor/fundo/fantasma-pressionado. Opção selecionada: cor/fundo/superficie com Sombra/Pequena. Texto: cor/texto/padrao e cor/texto/secundario. Canto: raio/pilula.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use de 2 a 4 opções com textos curtos.
- Mostre o resultado da troca na hora, na mesma tela.
- Mantenha as opções com larguras parecidas.
- Use para filtrar ou alternar a visão de uma área, no lugar do estilo Pílula das Abas.

## NÃO faça

- Trocar entre partes de um mesmo conteúdo, como capítulos e notas. Para isso use Abas.
- Textos longos que quebram em duas linhas.
- Mais de 4 opções. Prefira Seleção.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
