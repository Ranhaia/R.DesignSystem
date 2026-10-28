# Link

Componente do PASSI DS 1.1.0 · página "Link" no arquivo Figma.

O link leva a pessoa para outra página, seção ou site. No meio de um texto ele é sempre sublinhado, para ser reconhecido mesmo por quem não distingue cores.

## Link

Link · leva a outra página, seção ou site. No meio de textos é sempre sublinhado, para não depender só da cor. Marca para links de destaque, Neutro para links dentro de textos longos. Ligue Abre outro site para mostrar o ícone de abrir fora.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Mostrar seta | Liga/desliga |  | Desligado |
| Texto | Texto |  | Ler o primeiro capítulo |
| Abre outro site | Liga/desliga |  | Desligado |
| Tipo | Variante | Marca, Neutro | Marca |
| Tamanho | Variante | M, P | M |
| Estado | Variante | Padrão, Hover, Pressionado, Foco, Desabilitado | Padrão |

## Como usar

### Tipos e estados

No hover, o link Marca ganha um tom mais forte e o Neutro fica azul. Pressionados, os dois avançam mais um tom. No foco pelo teclado, aparece um contorno azul.

Exemplos no Figma: Marca · Padrão; Marca · Hover; Marca · Pressionado; Marca · Foco; Marca · Desabilitado; Neutro · Padrão; Neutro · Hover; Neutro · Pressionado.

### Com seta

A seta indica que o link avança para outra etapa ou página. O ícone de abrir fora indica que o link abre outro site, em outra aba.

### Dentro de um texto

Use o tipo Neutro no meio de parágrafos para não competir com o conteúdo.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- O texto diz o destino: Ler o capítulo 1.
- Evite Clique aqui e Saiba mais soltos.
- Avise no texto quando o link abre outro site ou baixa um arquivo.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega ao link. Enter abre o destino.
- Leitor de tela: Papel link. O nome é o próprio texto. Links que abrem outro site mostram o ícone de abrir fora e avisam no nome, com o texto escondido “(abre em outra aba)”.
- Foco: Borda azul de 2 px em volta do texto.
- Cuidados: Sublinhado no meio de textos. Em navegação, como migalhas de pão e menus, o sublinhado pode sair, porque a posição já mostra que dá para clicar. Texto que diz o destino, nunca Clique aqui. Link leva a outro lugar; para executar uma ação, use Botão.

## Tokens usados

Texto: cor/texto/marca, cor/texto/marca-hover (hover), cor/texto/marca-pressionado (pressionado), cor/texto/padrao (neutro), cor/texto/desabilitado. Ícones (seta e abrir fora): a mesma cor do texto. Foco: cor/borda/foco.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Escreva o destino no texto: “Ler o primeiro capítulo”.
- Mantenha o sublinhado no meio de textos.
- Use o ícone de abrir fora quando o link abre outro site.

## NÃO faça

- Textos como “clique aqui” ou “saiba mais” soltos.
- Usar link para ações, como salvar ou enviar. Use Botão.
- Diferenciar o link só pela cor.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
