# Item de lista

Componente do PASSI DS 1.1.0 · página "Item de lista" no arquivo Figma.

O item de lista organiza conteúdos parecidos um embaixo do outro: capítulos, arquivos, pessoas ou configurações. Cada linha pode ter ícone, título, descrição, uma informação extra e uma seta.

## Item de lista

Item de lista · linha clicável para listas de conteúdo, configurações e resultados de busca. Largura flexível; altura mínima de 56 px.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Título | Texto |  | Capítulo 1 · Por que agora |
| Descrição | Texto |  | 18 páginas · 12 min de leitura |
| Meta | Texto |  | Novo |
| Mostrar descrição | Liga/desliga |  | Ligado |
| Mostrar início | Liga/desliga |  | Ligado |
| Mostrar meta | Liga/desliga |  | Desligado |
| Mostrar ícone final | Liga/desliga |  | Ligado |
| Trocar ícone de início | Troca de ícone ou componente |  |  |
| Estado | Variante | Padrão, Hover, Pressionado, Selecionado, Desabilitado | Padrão |

## Como usar

### Estados

Exemplos no Figma: Padrão; Hover; Pressionado; Selecionado; Desabilitado.

### Em uso

Uma lista com divisões sutis. O item selecionado indica onde a pessoa está.

### Com informação extra

A meta mostra contagens, datas ou status curtos à direita.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Título com a informação mais importante; descrição com o detalhe.
- Meta curta: datas, contagens ou status em uma ou duas palavras.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Quando a linha leva a outro lugar, ela é um link e recebe Tab. Botões dentro da linha recebem Tab separados.
- Leitor de tela: Itens ficam numa lista (ul ou ol). O título é o nome do link; a descrição e a informação extra são lidas depois.
- Foco: Anel de foco em volta da linha quando ela é clicável.
- Cuidados: A seta no fim é decorativa. O item selecionado é marcado em texto ou no código, não só pelo fundo.

## Tokens usados

Fundo: cor/fundo/sutil (hover), cor/fundo/sutil-hover (pressionado), cor/fundo/marca-sutil, cor/fundo/superficie. Texto: cor/texto/padrao, cor/texto/secundario, cor/texto/terciario, cor/texto/marca. Espaço: espaco/3. Canto: raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mantenha a mesma estrutura em todos os itens da lista.
- Use a seta quando o item abre outra tela.
- Coloque a informação mais importante no título.

## NÃO faça

- Misturar itens com e sem ícone na mesma lista.
- Descrições longas, com mais de uma linha.
- Esconder ações importantes só no hover.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
