# Seleção

Componente do PASSI DS 1.1.0 · página "Seleção" no arquivo Figma.

A seleção mostra uma lista de opções que abre sob o campo. Ela economiza espaço quando há muitas alternativas, como cargos, estados ou países.

## Seleção

Seleção · escolha de uma opção em uma lista que abre sob o campo. Use quando houver mais de 5 opções; com menos, prefira Rádio ou Controle segmentado.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Cargo |
| Valor | Texto |  | Selecione uma opção |
| Ajuda | Texto |  | Usamos para personalizar os exemplos. |
| Mostrar rótulo | Liga/desliga |  | Ligado |
| Mostrar ajuda | Liga/desliga |  | Ligado |
| Estado | Variante | Padrão, Hover, Aberto, Preenchido, Erro, Desabilitado | Padrão |

## Como usar

### Estados

Exemplos no Figma: Padrão; Hover; Aberto; Preenchido; Erro; Desabilitado.

### Aberta

A lista abre colada ao campo, com a opção atual marcada. Ela usa o componente Item de menu.

Exemplos no Figma: Claro; Escuro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Rótulo com o que está sendo escolhido: Cargo.
- Opções curtas, em ordem lógica, começando com letra maiúscula.
- Selecione uma opção enquanto nada foi escolhido.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega ao campo. Enter, Espaço ou seta para baixo abrem a lista. Setas mudam a opção, Enter escolhe e Esc fecha sem mudar.
- Leitor de tela: Papel combobox com lista do tipo listbox, ou o elemento select nativo. O rótulo é o nome e a opção escolhida é lida como valor.
- Foco: Borda azul de 2 px. Ao fechar a lista, o foco volta para o campo.
- Cuidados: Prefira o select nativo do navegador quando não precisar de busca. Para listas longas com busca, use Campo com sugestões.

## Tokens usados

Campo: as mesmas do Campo de texto. Lista: cor/fundo/superficie, cor/borda/padrao, Sombra/Média, raio/grande. Opções: Item de menu.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Ordene as opções de forma lógica: alfabética, por frequência ou por tamanho.
- Use quando houver mais de 5 opções.
- Mostre o texto “Selecione uma opção” enquanto nada foi escolhido.

## NÃO faça

- Usar para 2 ou 3 opções. Prefira Rádio ou Controle segmentado.
- Listas muito longas sem busca. Acima de 15 opções, adicione um campo de busca.
- Ações dentro da lista. Para ações use Menu.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
