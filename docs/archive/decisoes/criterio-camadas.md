# Critério de camadas: Primitivos, Atoms, Molecules, Organisms

Data: 2026-10-19
Status: aprovada (Rafael)

## Contexto

A classificação misturava três critérios sem dizer qual valia: o que o
componente importa, quantas peças exporta e o peso percebido. Resultado:
`multi-select` era átomo e importava `combobox` (molécula); `select`,
`combobox` e `dropdown-menu` (mesma família) estavam em três camadas; o
índice de Atoms dizia "não se decompõe em outros componentes" e metade
dos átomos importava outro componente.

## Decisão

A camada mínima sai do que o componente importa do DS:

| Camada | Regra |
|---|---|
| Primitivo | Fundação usada por todos. Não importa nada do DS. Lista fechada: `icon`, `label`, `skeleton`, `separator`, `text`, `title`, `box` |
| Átomo | Importa no máximo primitivos |
| Molécula | Combina átomos (e primitivos) |
| Organismo | Combina moléculas ou organismos |

- Reusar só estilo (`buttonVariants`) ou tipo não é composição.
- A regra dá o piso. Subir de camada sem dependência que justifique é
  decisão explícita registrada aqui.
- A trava é `src/lib/atomic-registry.test.ts`: reprova componente sem
  camada e componente que compõe camada igual ou acima da dele
  (organismo, o topo, pode compor organismo).

## Decisões explícitas acima do piso

- `accordion` é **molécula** (Rafael): conjunto de peças com um propósito,
  embora só importe primitivo.
- Os organismos que não compõem molécula (`card`, `table`, `tabs`,
  `message`, `bubble` e outros) ficaram onde estavam; revisão pendente.

## Mudanças aplicadas

| Componente | Antes | Depois | Por quê |
|---|---|---|---|
| icon, label, skeleton, separator, text, title, box | atom | primitive | camada nova |
| chip, icon-button | atom | molecule | compõem `Button` |
| tree-select | atom | molecule | compõe `Checkbox` e `Popover` |
| accordion | organism | molecule | decisão explícita |
| combobox | molecule | organism | compõe `InputGroup` (molécula) |
| files | molecule | organism | compõe `Collapsible` (molécula) |
| split-button | molecule | organism | compõe `ButtonGroup` e `DropdownMenu` |
| multi-select | atom | organism | compõe `Combobox` (organismo) |
| list | sem camada | atom | não importa nada; estava fora dos índices |

## Consequências

- `excecao-atoms-label-embutida.md` deixa de ser exceção: `Label` é
  primitivo, então `Input`/`Select`/`NativeSelect` importá-lo cumpre a
  regra. Arquivada.
- Títulos das stories mudaram de grupo no Storybook (ex.:
  `Atoms/Icon` → `Primitivos/Icon`).
