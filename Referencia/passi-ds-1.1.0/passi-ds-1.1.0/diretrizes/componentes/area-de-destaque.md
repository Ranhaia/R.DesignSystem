# Área de destaque

Componente do PASSI DS 1.1.0 · página "Área de destaque" no arquivo Figma.

A área de destaque separa um trecho do texto principal para chamar atenção: uma dica, um exemplo prático, um alerta ou um resumo. É o mesmo recurso usado nos quadros do livro.

## Área de destaque

Área de destaque · caixa que separa um conteúdo do texto principal: dicas (Neutra), exemplos práticos (Marca), alertas para quem decide (Atenção), resumos (Escura) e espaços vazios esperando conteúdo (Tracejada).

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Neutra, Marca, Atenção, Escura, Tracejada | Neutra |

## Como usar

### Tipos

Exemplos no Figma: Fique por dentro; Neutra; Na prática; Marca; Para cobrar; Atenção; Resumo do capítulo; Escura; Tracejada.

### Em uso

No meio de um texto longo, o quadro “Na prática” interrompe a leitura na medida certa.

Exemplos no Figma: Na prática.

### Modo escuro

Exemplos no Figma: Fique por dentro; Na prática; Para cobrar.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Sobretítulo diz o tipo do conteúdo: Na prática, Para cobrar.
- Texto curto: o quadro complementa, não substitui o texto principal.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Não recebe foco, só os links e botões dentro dela.
- Leitor de tela: Use um título curto no começo, como Dica ou Atenção, para o leitor de tela saber que é um trecho à parte. Quando é um aviso importante, marque como região com nome.
- Foco: Nenhum.
- Cuidados: O tipo não depende só da cor da barra: o título ou o ícone dizem se é dica, exemplo, alerta ou resumo.

## Tokens usados

Neutra: cor/fundo/sutil. Marca: cor/fundo/marca-sutil com barra cor/borda/marca. Atenção: cor/fundo/alerta-sutil com barra cor/borda/alerta. Escura: modo Escuro. Tracejada: borda cor/borda/forte. Canto: raio/grande.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use no máximo um quadro a cada poucos parágrafos.
- Dê um sobretítulo que diga o tipo de conteúdo: “Na prática”, “Para cobrar”.
- Mantenha o texto do quadro curto.

## NÃO faça

- Colocar o conteúdo principal dentro do quadro.
- Vários quadros seguidos.
- Usar a cor de atenção para conteúdos comuns.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
