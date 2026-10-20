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
- `card`, `table`, `tabs`, `message` e `bubble` são **moléculas** (Rafael,
  2026-10-19): mesmo raciocínio do Accordion, conferido com o mercado
  (abaixo).
- Os demais organismos que não compõem molécula (overlays e menus como
  `dialog`, `sheet`, `drawer`, `dropdown-menu`; e `calendar`, `carousel`,
  `chart`, `form`, `stepper`, `time-picker`, `resizable`) continuam
  organismos; revisão pendente.

## Conferência com o mercado (2026-10-19)

| Referência | Níveis | Onde ficam Card, Tabs, Accordion, Table |
|---|---|---|
| Pattern Lab (ferramenta oficial do Atomic Design), starterkit twig | atoms / molecules / organisms | `molecules`: card, tabs, accordion, alert, pagination. `atoms`: table (tabela HTML simples). No starterkit handlebars, `organisms/tables` |
| Nimbus (Nuvemshop), `packages/react/src` | atomic / composite | `composite`: Accordion, Alert, Card, Collapsible, Pagination, SegmentedControl, SplitButton, Table, Tabs (e também Modal, Sidebar, Stepper, TimePicker) |
| Material 3, Polaris, Carbon, Radix | não usam Atomic Design | sem equivalente |

- Card, Tabs e Accordion como molécula batem com as duas referências que
  classificam. Table varia; aqui o `table` é só a estrutura HTML (sem
  ordenação, filtro ou paginação), o que fica mais perto da molécula.
- Divergência consciente: o Nimbus põe Chip, IconButton, MultiSelect,
  Popover e Select como `atomic` ("indivisível para quem usa"). Aqui a
  regra olha a composição no código, então Chip e IconButton são
  moléculas e MultiSelect é organismo.

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
| card, table, tabs, message, bubble | organism | molecule | decisão explícita, conferida com o mercado |

## Consequências

- `excecao-atoms-label-embutida.md` deixa de ser exceção: `Label` é
  primitivo, então `Input`/`Select`/`NativeSelect` importá-lo cumpre a
  regra. Arquivada.
- Títulos das stories mudaram de grupo no Storybook (ex.:
  `Atoms/Icon` → `Primitivos/Icon`).
