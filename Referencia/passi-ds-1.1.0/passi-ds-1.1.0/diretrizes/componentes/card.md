# Card

Componente do PASSI DS 1.1.0 · página "Card" no arquivo Figma.

O card agrupa informações sobre um mesmo assunto, como um artigo, um produto ou um indicador. Ele funciona como uma pequena vitrine que leva para o conteúdo completo.

## Card

Card · agrupa informações sobre um mesmo assunto em uma superfície. Tipos: Conteúdo (imagem em cima), Horizontal (imagem ao lado), Destaque (chamada na cor da marca) e Métrica (número em evidência). Troque a imagem pelo preenchimento do bloco “Imagem”.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Título | Texto |  | Governança sem burocracia |
| Descrição | Texto |  | Quem decide, quem mantém e como evoluir o design system sem travar os times de produto. |
| Tipo | Variante | Conteúdo, Horizontal, Destaque, Métrica | Conteúdo |

## Como usar

### Tipos

Exemplos no Figma: Conteúdo; Livro · 2ª edição; Destaque; Métrica; Horizontal.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Título curto, de até duas linhas, que faça sentido sozinho.
- Descrição de uma ou duas frases.
- A ação do card diz o destino: Ler artigo.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Quando o card inteiro é clicável, só o título é o link e recebe Tab. Botões dentro do card recebem Tab separados.
- Leitor de tela: O título do card é um título de seção (h2 ou h3, conforme a página) e é o nome do link. A imagem de capa costuma ser decorativa.
- Foco: Anel de foco em volta do card quando o título-link recebe foco.
- Cuidados: Não transforme o card inteiro em um link gigante com vários textos: o leitor de tela leria tudo como nome do link.

## Tokens usados

Fundo: cor/fundo/superficie ou cor/fundo/marca (destaque). Borda: cor/borda/padrao. Texto: cor/texto/padrao, cor/texto/secundario, cor/texto/sobre-marca. Espaço: espaco/2 a espaco/8. Canto: raio/grande.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mantenha uma única ação principal por card.
- Use títulos curtos, de até duas linhas.
- Mantenha cards de uma mesma lista com a mesma altura.

## NÃO faça

- Colocar vários botões e links dentro do mesmo card.
- Cards dentro de cards.
- Textos longos que deveriam estar na página de detalhe.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
