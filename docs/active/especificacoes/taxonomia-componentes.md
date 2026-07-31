# Taxonomia dos componentes — nota de referência

> **Status: proposta, ainda não aplicada em nenhum arquivo de dados
> (`atomic-registry.ts`, `component-docs.ts` etc.).** Rafael disse "vamos
> ajustar depois" — este documento existe pra registrar o raciocínio por
> trás de cada categoria antes de esquecer, não pra travar a decisão.
> Mesmo padrão usado na Fase 0 do `PLANO-LOOP-80-20-TEMPLATES.md`
> (proposta primeiro, aprovação/ajuste depois).

## Por que uma taxonomia por função, além de Atom/Molecule/Organism

Atom/Molecule/Organism descreve **complexidade estrutural** (de quantas
peças menores um componente é feito). Não descreve **pra que ele serve**.
Um Button (Atom) e um DropdownMenu (Organism) são estruturalmente muito
diferentes, mas os dois são, na prática, formas de disparar uma ação —
faz sentido conseguir agrupar por função também, principalmente pensando
numa IA de prototipação que precise escolher "que componente eu uso pra
resolver X" sem se importar com a complexidade estrutural.

A categoria (`category`) é um campo **adicional**, não substitui
Atom/Molecule/Organism. Um componente carrega os dois: `type: "atom"` +
`category: "actions"`, por exemplo.

## As 8 categorias propostas

### `actions`
Componentes cujo papel principal é deixar o usuário disparar uma ação
imediata.

`button` · `button-group` · `toggle` · `toggle-group`

### `forms`
Componentes de captura/edição de dados — o que entra num formulário.

`calendar` · `checkbox` · `combobox` · `field` · `form` · `input` ·
`input-group` · `input-otp` · `label` · `native-select` ·
`radio-group` · `select` · `slider` · `switch` · `textarea`

**Observação:** `calendar` entrou aqui por ser essencialmente um
seletor de data (input especializado), não por parecer visualmente um
form. Vale revisar se você prefere tratá-lo como `data-display` ou uma
categoria própria de "date & time" caso o catálogo cresça nessa
direção.

### `selection-menus`
Menus onde o usuário escolhe uma ação ou opção dentro de uma lista
flutuante — diferente de `forms` porque não é um campo persistente na
tela, é um menu que abre, escolhe, fecha.

`command` · `context-menu` · `dropdown-menu` · `menubar`

**Observação:** `navigation-menu` ficou de fora dessa categoria de
propósito — foi pra `navigation`, porque seu papel semântico é
navegação entre seções do site/produto, não um menu de ações
genérico. Se na prática ele for usado mais como um DropdownMenu
qualquer no seu DS, pode fazer sentido mover pra cá.

### `feedback`
Comunica o estado do sistema de volta pro usuário (sucesso, erro,
carregando, vazio).

`alert` · `empty` · `progress` · `skeleton` · `spinner`

### `data-display`
Apresenta conteúdo/informação — o "conteúdo" da tela, não a ação nem o
feedback.

`attachment` · `avatar` · `badge` · `bubble` · `card` · `carousel` ·
`chart` · `item` · `kbd` · `marker` · `message` · `table`

**Observação:** `card` e `carousel` são os casos mais discutíveis dessa
categoria — os dois têm um argumento razoável pra estar em `layout`
também (são "moldura"/"organizador" de conteúdo, não o conteúdo em
si). Deixei em `data-display` porque na prática o conteúdo que
carregam é o que importa mais pro uso, mas é uma escolha, não um fato.

### `overlay`
Superfícies que flutuam por cima da página, geralmente num portal —
diferente de `data-display`/`feedback` porque a característica que
define a categoria é **onde** o componente renderiza (por cima de
tudo), não o que ele mostra.

`alert-dialog` · `dialog` · `drawer` · `hover-card` · `popover` ·
`sheet` · `tooltip`

### `navigation`
Ajuda o usuário a se orientar e mover entre seções/páginas.

`accordion` · `breadcrumb` · `navigation-menu` · `pagination` ·
`sidebar` · `tabs`

**Observação:** `accordion` é o caso mais discutível — a função dele é
"revelar/esconder conteúdo", que é tão (ou mais) uma questão de
`layout` quanto de navegação. Deixei em `navigation` seguindo a
convenção mais comum em design systems de mercado (Carbon, Polaris),
mas é o item que eu revisaria primeiro se você quiser ajustar algo.

### `layout`
Estrutura/organiza espaço na tela — não é conteúdo, é a "moldura" ao
redor do conteúdo.

`aspect-ratio` · `collapsible` · `resizable` · `scroll-area` ·
`separator`

## Casos que valem uma segunda olhada (resumo)

| Componente | Categoria proposta | Alternativa razoável |
|---|---|---|
| `accordion` | navigation | layout |
| `calendar` | forms | data-display |
| `carousel` | data-display | layout |
| `card` | data-display | layout |
| `navigation-menu` | navigation | selection-menus |

## Metodologia do `commonPartners` (dado relacionado, já derivado)

Diferente da taxonomia (que é julgamento/categorização), `commonPartners`
foi gerado a partir de **evidência real**: um script varreu os imports de
`@/components/ui/*` nos arquivos que já têm composição de verdade no
projeto (o Template `dashboard-financeiro`, o `/teste-padrao`, e os 15
Patterns — 18 arquivos no total) e contou quais componentes aparecem
juntos no mesmo arquivo.

**Ressalva importante:** a amostra ainda é pequena (18 arquivos, a
maioria pequena). Pares que aparecem juntos em só 1 arquivo não são um
sinal confiável — é fácil um componente aparecer "junto" com outro só
porque os dois foram usados na mesma tela grande (o Template), sem
nenhuma relação de uso real entre eles. Só considerei confiável o que
apareceu em **2 ou mais arquivos independentes**:

- `button` ↔ `alert-dialog` (4×), `input` (3×), `attachment` /
  `avatar` / `badge` / `card` / `label` / `field` / `alert` /
  `spinner` (2× cada)
- `avatar` ↔ `badge` / `card` / `input` (2×)
- `badge` ↔ `avatar` / `button` / `card` / `input` / `label` (2×)
- `input` ↔ `progress` / `select` / `table` / `field` /
  `alert-dialog` (2×)
- `progress` ↔ `select` (2×)

Esse dado vai crescer e ficar mais confiável conforme mais
Templates/Patterns/Jornadas forem construídos — é um campo que se
alimenta da prática, não de suposição.

## Próximos passos

1. Rafael revisa as 8 categorias e os 5 casos discutíveis da tabela
   acima, ajusta o que fizer sentido.
2. Só depois disso, aplicar `category` em `atomic-registry.ts` (ou um
   novo arquivo `component-taxonomy.ts`, a decidir) e `commonPartners`
   em `component-docs.ts`.
3. Storybook sendo instalado por Rafael via terminal nesta mesma
   janela — quando estiver pronto, decidir junto qual desses dados
   (taxonomia, commonPartners) vai virar `tags`/metadata de story vs.
   fica só como referência interna do catálogo.
