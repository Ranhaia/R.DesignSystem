# Cantos e sombras

Fundamento do PASSI DS 1.1.0 · página "Cantos e sombras" no arquivo Figma.

Cantos arredondados deixam a interface mais amigável; a regra é simples: quanto maior o elemento, maior o canto. As sombras mostram o que está mais perto da pessoa, como menus e janelas que flutuam sobre a página.

## Como usar

### Cantos

Variáveis da coleção “Raio”.

### Sombras

Estilos de efeito. Use só em elementos que flutuam; cards parados na página usam borda, não sombra.

### Camadas

O que cria uma superfície é a cor de fundo e a borda fina, não a sombra. No modo claro, a superfície é branca sobre a página levemente acinzentada; no escuro, ela é um pouco mais clara que a página. A sombra fica para o que flutua por cima do conteúdo.

### Bordas

borda/fina (1 px) para cards, campos e divisores. borda/grossa (2 px) para seleção e destaque. A borda fica sempre por dentro do elemento (Inside no Figma, box-sizing: border-box no código): um botão de 40 px continua com 40 px com ou sem borda. O foco não é borda: é um contorno (outline) desenhado por fora, que não muda o tamanho nem empurra os vizinhos.

