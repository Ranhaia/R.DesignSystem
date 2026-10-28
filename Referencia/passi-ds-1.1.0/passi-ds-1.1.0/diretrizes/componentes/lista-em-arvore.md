# Lista em árvore

Componente do PASSI DS 1.1.0 · página "Lista em árvore" no arquivo Figma.

A lista em árvore mostra conteúdos organizados em níveis, como pastas e arquivos ou partes e capítulos de um livro. Cada nível fica um pouco mais para dentro, e as pastas abrem e fecham.

## Nó da árvore

Nó da árvore · uma linha da Lista em árvore. Pastas abrem e fecham; itens não têm seta. Use o recuo (preenchimento à esquerda) para indicar o nível.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Parte 3 · Governar |
| Mostrar quantidade | Liga/desliga |  | Ligado |
| Tipo | Variante | Pasta fechada, Pasta aberta, Item | Pasta fechada |
| Estado | Variante | Padrão, Hover, Pressionado, Selecionado | Padrão |

## Lista em árvore

Lista em árvore · mostra conteúdos organizados em níveis, como pastas e arquivos ou partes e capítulos. Exemplo pronto com 3 níveis.

## Como usar

### Em uso

Partes e capítulos do livro, com o capítulo atual selecionado.

### Nó da árvore

Exemplos no Figma: Pasta fechada · Padrão; Pasta fechada · Hover; Pasta fechada · Pressionado; Pasta fechada · Selecionado; Pasta aberta · Padrão; Pasta aberta · Hover; Pasta aberta · Pressionado; Pasta aberta · Selecionado; Item · Padrão; Item · Hover; Item · Pressionado; Item · Selecionado.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Nomes curtos, que caibam em uma linha.
- Mostre a quantidade dentro de pastas quando ajudar.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Setas para cima e para baixo passam pelos itens; seta para a direita abre uma pasta e para a esquerda fecha; Enter abre o item.
- Leitor de tela: Papéis tree e treeitem. Anuncia o nível, se a pasta está aberta ou fechada e a quantidade de itens.
- Foco: Só um item da árvore recebe Tab; dentro dela, as setas movem o foco.
- Cuidados: O recuo não é a única pista de nível: o leitor anuncia o nível e o ícone de pasta muda entre aberta e fechada.

## Tokens usados

Selecionado: cor/fundo/marca-sutil e cor/texto/marca. Hover: cor/fundo/sutil. Pressionado: cor/fundo/sutil-hover. Ícones: cor/texto/secundario. Recuo de 20 px por nível. Canto: raio/pequeno.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Limite a três níveis de profundidade.
- Mostre quantos itens há dentro de cada pasta.
- Mantenha aberto o caminho até o item selecionado.
- Permita abrir e fechar com as setas do teclado.

## NÃO faça

- Árvores com muitos níveis, que viram labirinto.
- Usar árvore para listas simples, sem níveis.
- Nomes longos que quebram em várias linhas.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
