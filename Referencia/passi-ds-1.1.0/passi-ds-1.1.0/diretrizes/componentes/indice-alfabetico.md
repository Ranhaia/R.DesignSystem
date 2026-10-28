# Índice alfabético

Componente do PASSI DS 1.1.0 · página "Índice alfabético" no arquivo Figma.

O índice alfabético leva direto a uma letra em listas longas, como glossários e contatos. No computador, é uma linha de letras acima da lista. No celular, é uma coluna na lateral, em que a pessoa toca ou arrasta sobre a letra.

## Índice alfabético

Índice alfabético · letras para pular direto a uma seção de listas longas em ordem alfabética, como glossários e contatos. Horizontal no computador, acima da lista, com a letra atual marcada. Vertical no celular, na lateral; ao arrastar, a letra aparece ampliada ao lado. Letras sem conteúdo ficam apagadas.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Orientação | Variante | Vertical, Horizontal | Vertical |
| Estado | Variante | Padrão, Arrastando, Letra atual | Padrão |

## Como usar

### Computador e celular

No computador, use a versão horizontal, acima da lista: cada letra é um link de 32 px, e a letra da seção que está na tela fica marcada enquanto a pessoa rola. No celular, use a versão vertical, na lateral da lista, com toque e arrasto.

Exemplos no Figma: Computador · Padrão; Computador · Letra atual.

### Estados

Letras com conteúdo ficam em azul; letras sem conteúdo ficam apagadas. No celular, a letra aparece ampliada enquanto a pessoa arrasta.

Exemplos no Figma: Celular · Padrão; Celular · Arrastando.

### Em uso

Glossário do livro com o índice na lateral.

Exemplos no Figma: A; B; C; D; G.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Letras maiúsculas, sem acento: A, B, C.
- Para leitor de tela, diga a seção: Ir para a letra G.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Cada letra com conteúdo é um link que leva à seção. No computador, Tab passa pelas letras e Enter abre a seção. Letras sem conteúdo não recebem foco.
- Leitor de tela: Fica numa navegação com o nome Índice alfabético. Letras sem conteúdo são anunciadas como indisponíveis ou ficam fora da leitura.
- Foco: Ao escolher uma letra, o foco vai para o título daquela seção.
- Cuidados: No celular, arrastar sobre as letras é atalho: tocar em cada letra precisa funcionar sozinho (WCAG 2.5.7). Cada letra tem área de toque de 24 px no celular e 32 px no computador.

## Tokens usados

Letras com conteúdo: cor/texto/marca. Sem conteúdo: cor/texto/terciario. Letra ativa e destaque: cor/fundo/marca com cor/texto/sobre-marca. Trilho ativo: cor/fundo/sutil. Horizontal: letra atual com cor/fundo/marca-sutil e sublinhado, canto raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use em listas com mais de 50 itens em ordem alfabética.
- Apague as letras que não têm conteúdo.
- Mostre a letra ampliada enquanto a pessoa arrasta.
- No computador, use a versão horizontal acima da lista.

## NÃO faça

- Usar em listas curtas ou fora de ordem alfabética.
- Letras pequenas demais para tocar.
- Esconder a busca: o índice complementa, não substitui.
- Usar a versão vertical, com arrasto, no computador.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
