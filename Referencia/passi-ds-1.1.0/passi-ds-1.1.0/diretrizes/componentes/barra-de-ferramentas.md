# Barra de ferramentas

Componente do PASSI DS 1.1.0 · página "Barra de ferramentas" no arquivo Figma.

A barra de ferramentas reúne ações rápidas sobre um conteúdo, como editar, copiar ou compartilhar. Os botões de ícone ficam agrupados por assunto, separados por pequenos divisores.

## Barra de ferramentas

Barra de ferramentas · agrupa ações rápidas sobre um conteúdo. Separe grupos de ações com divisores. A versão Seleção aparece flutuando quando há itens selecionados.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Contagem | Texto |  | 3 capítulos selecionados |
| Tipo | Variante | Editor, Seleção, Vertical | Editor |

## Como usar

### Editor

Barra horizontal sobre um documento. Grupos: desfazer, edição, saída e mais opções.

### Seleção

Barra escura que flutua quando a pessoa seleciona itens. Mostra a contagem e as ações em lote.

### Vertical

Barra lateral compacta para navegação rápida.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Cada botão de ícone tem nome com verbo na dica flutuante.
- Na seleção, diga quantos itens estão marcados: 3 capítulos selecionados.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab entra na barra uma vez. Setas passam de um botão para outro. Tab sai da barra.
- Leitor de tela: Papel toolbar com um nome, por exemplo Formatação do texto. Cada botão de ícone tem nome em texto.
- Foco: Anel de foco no botão ativo. Os divisores não recebem foco.
- Cuidados: Todo botão com Dica flutuante. Botões de alternar, como negrito, anunciam se estão ligados.

## Tokens usados

Fundo: cor/fundo/superficie. Borda e divisores: cor/borda/padrao. Sombra: Sombra/Pequena ou Sombra/Grande (seleção). Espaço: espaco/1, espaco/2. Canto: raio/grande.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Agrupe ações relacionadas e separe com divisores.
- Mostre dica flutuante com o nome de cada ícone.
- Coloque as ações mais usadas primeiro.

## NÃO faça

- Mais de 10 ícones na mesma barra. Mova o resto para “mais opções”.
- Ícones sem nome acessível.
- Misturar ações de navegação com ações de edição.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
