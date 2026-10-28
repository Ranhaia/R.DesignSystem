# Etiqueta

Componente do PASSI DS 1.1.0 · página "Etiqueta" no arquivo Figma.

A etiqueta é clicável. Serve para filtrar listas, escolher categorias ou mostrar escolhas que a pessoa pode remover, como filtros aplicados em uma busca.

## Etiqueta

Etiqueta · item clicável para filtrar, selecionar categorias ou mostrar escolhas que podem ser removidas. Diferente do Selo, que só informa.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Design system |
| Mostrar ícone | Liga/desliga |  | Desligado |
| Removível | Liga/desliga |  | Desligado |
| Tamanho | Variante | M, P | M |
| Estado | Variante | Padrão, Hover, Pressionado, Selecionada, Desabilitada | Padrão |

## Como usar

### Estados

A etiqueta selecionada ganha fundo azul claro e um ícone de confirmação.

Exemplos no Figma: M · Padrão; M · Hover; M · Pressionado; M · Selecionada; M · Desabilitada; P · Padrão; P · Hover; P · Pressionado; P · Selecionada; P · Desabilitada.

### Filtros

Grupo de etiquetas para filtrar conteúdo. Mais de uma pode ficar selecionada.

### Removíveis

Mostram escolhas já feitas. O “x” remove a escolha.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Uma ou duas palavras: Design system.
- Use o mesmo nome do filtro em todas as telas.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Etiquetas de filtro recebem Tab e alternam com Espaço ou Enter. O x de remover é um botão próprio.
- Leitor de tela: Etiqueta de filtro é um botão que anuncia se está selecionada. O botão de remover tem nome completo, por exemplo Remover filtro Design.
- Foco: Anel de foco na etiqueta e, separado, no botão de remover.
- Cuidados: O x precisa de área de toque de 24 px. Etiqueta que só informa, sem ação, deve ser um Selo.

## Tokens usados

Fundo: cor/fundo/superficie, cor/fundo/sutil (hover), cor/fundo/sutil-hover (pressionado), cor/fundo/marca-sutil, cor/fundo/desabilitado. Borda: cor/borda/forte, cor/borda/marca. Texto: cor/texto/padrao, cor/texto/marca. Espaço: espaco/1 a espaco/3. Canto: raio/pilula.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use textos curtos, de uma ou duas palavras.
- Deixe claro quais filtros estão ativos.
- Ofereça “Limpar filtros” quando houver muitos selecionados.

## NÃO faça

- Usar etiqueta para status. Para isso use Selo.
- Esconder o resultado do filtro longe das etiquetas.
- Misturar etiquetas removíveis e selecionáveis no mesmo grupo.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
