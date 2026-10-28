# Rádio

Componente do PASSI DS 1.1.0 · página "Rádio" no arquivo Figma.

O rádio serve para escolher uma única opção dentro de um grupo. Ao marcar uma, a anterior é desmarcada automaticamente.

## Rádio

Rádio · escolha de uma única opção dentro de um grupo. Sempre agrupe dois ou mais rádios e, quando possível, deixe uma opção marcada por padrão.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Livro digital |
| Descrição | Texto |  | Receba na hora, no seu e-mail. |
| Mostrar descrição | Liga/desliga |  | Ligado |
| Marcação | Variante | Desmarcado, Marcado | Desmarcado |
| Estado | Variante | Padrão, Hover, Pressionado, Foco, Erro, Desabilitado | Padrão |

## Como usar

### Estados

Exemplos no Figma: Padrão; Hover; Pressionado; Foco; Erro; Desabilitado.

### Em uso

Grupo de opções com uma escolha já feita. O título do grupo diz o que está sendo escolhido.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- O título do grupo é uma pergunta: Como prefere receber o livro?
- Opções curtas e paralelas, todas no mesmo formato.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab entra no grupo e para na opção marcada. Setas mudam a opção. Tab sai do grupo.
- Leitor de tela: Papel radio dentro de um radiogroup com nome. Anuncia a opção, se está marcada e a posição, por exemplo 2 de 3.
- Foco: Anel de foco de 2 px em volta do círculo.
- Cuidados: Sempre com uma pergunta que nomeia o grupo. Clicar no rótulo também marca.

## Tokens usados

Fundo: cor/fundo/superficie, cor/fundo/marca, cor/fundo/marca-hover, cor/fundo/marca-pressionado, cor/fundo/marca-sutil (desmarcado pressionado), cor/fundo/erro, cor/fundo/desabilitado. Borda: cor/borda/controle, cor/borda/marca, cor/borda/erro. Ponto: cor/texto/sobre-marca. Canto: raio/pilula.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use quando só uma opção pode ser escolhida.
- Deixe uma opção marcada por padrão, se fizer sentido.
- Ordene as opções de forma lógica: da mais comum para a menos comum.

## NÃO faça

- Grupos com mais de 6 opções. Nesse caso use Seleção.
- Um rádio sozinho. Para isso use Checkbox.
- Opções que se sobrepõem, como “1 a 5” e “5 a 10”.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
