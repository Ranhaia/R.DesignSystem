# Comparativo — shadcn-local vs. sistemas de design públicos

Data: 2026-07-22
Escopo: comparar, ponto a ponto, os fatos levantados em `.review/auditoria.md` contra o que a documentação pública de Material Design 3 (M3), Radix UI Themes, Shopify Polaris, IBM Carbon Design System e Nimbus (Tiendanube/Nuvemshop) publicam sobre nomenclatura de token, escalas de tipografia/espaçamento/raio e cobertura de componentes. Nenhuma recomendação é feita — apenas diferenças, cada uma com a URL efetivamente consultada.

Nota sobre acesso às fontes: `m3.material.io` é um site que exige JavaScript para renderizar conteúdo; a ferramenta de fetch direto usada nesta pesquisa retornou apenas "This website requires JavaScript." para `m3.material.io/styles/color/roles`, `m3.material.io/styles/typography/overview`, `m3.material.io/styles/shape/corner-radius-scale` e `m3.material.io/components`. Todas as afirmações sobre M3 abaixo vêm, portanto, de resumos de busca (WebSearch) que citam essas mesmas URLs como fonte primária, não de leitura direta do HTML — isso é sinalizado em cada item. Para Radix UI Themes, Shopify Polaris, IBM Carbon e Nimbus, o conteúdo abaixo vem de fetch direto das páginas (texto renderizado obtido com sucesso).

---

## 1. Nomenclatura/taxonomia de token de cor

**shadcn-local (fato, da auditoria):** pares `--role` / `--role-foreground` (ex.: `--primary`/`--primary-foreground`, `--card`/`--card-foreground`), mais tokens sem par (`--border`, `--input`, `--ring`), um namespace próprio para `--sidebar-*`, e um bloco `--ai-*` isolado com sufixos de função (`-surface`, `-surface-highlight`, `-interactive`, `-interactive-hover`, `-interactive-pressed`, `-text-low`, `-text-high`) explicitamente copiado da documentação da Nimbus.

**Material Design 3:** usa "color roles" (Primary, Surface, Error etc.) em que cada role tem um token `on-<role>` correspondente para o conteúdo (texto/ícone) sobre aquela superfície — conceitualmente parecido com o padrão "role + role-foreground" do projeto, mas o M3 nomeia o par como `on-<role>` (ex.: `on-surface`, `on-primary`) em vez de `<role>-foreground`, e insere um prefixo de camada no nome do token real: `--md-sys-color-<token>`. Fonte: resumo de busca citando `m3.material.io/styles/color/roles` e `m3.material.io/foundations/design-tokens` (conteúdo não lido diretamente, ver nota acima).

**Radix UI Themes:** não usa pares role/foreground. Cada cor (accent ou gray) é uma escala numerada de 12 passos (`--accent-1` a `--accent-12`, `--gray-1` a `--gray-12`) com convenção de uso por faixa (1–2 fundo, 3–5 componentes interativos, 6–8 bordas, 9–10 cor sólida, 11–12 texto acessível), mais tokens funcionais à parte (`--accent-surface`, `--accent-indicator`, `--accent-track`, `--accent-contrast`) e tokens de camada de fundo globais (`--color-background`, `--color-panel-solid`/`--color-panel-translucent`, `--color-surface`, `--color-overlay`). Fonte: `https://www.radix-ui.com/themes/docs/theme/color` (fetch direto).

**Shopify Polaris:** token = `elemento` (`bg`, `bg-surface`, `bg-fill`, `text`, `border`, `icon`) + `role` + `prominence` opcional + `state` opcional, ex. `--p-color-bg-surface-hover`; distingue ainda "specialty tokens" (concept + semantic token, ex. tokens específicos de navegação) dos "semantic tokens" genéricos. É uma convenção mais granular/composta que o par binário do projeto. Fonte: `https://polaris-react.shopify.com/design/colors/color-tokens` (fetch direto).

**IBM Carbon:** token = `elemento` geral (`background`, `text`, `border`...) + papel específico dentro do grupo (ex. `$text-secondary`, `$border-subtle`), com estado de interação anexado ao final (`$background-hover`). Carbon distingue "core tokens" (10 grupos: Background, Layer, Field, Border, Text, Link, Icon, Support, Focus, Skeleton) de "component tokens" (próprios de um componente, não reutilizáveis). Não há um par fixo "cor + cor-do-texto-sobre-ela" generalizado como no projeto — o mapeamento texto/superfície é feito escolhendo o token de texto compatível com o token de fundo em uso, não por um `-foreground` automático. Fonte: `https://carbondesignsystem.com/elements/color/overview/` (fetch direto).

**Nimbus (Tiendanube/Nuvemshop):** 5 categorias de cor (Primary, Success, Warning, Danger, Neutral), cada uma com até 10 tokens por sufixo de função: `-background` (só Neutral), `-surface`, `-surface-highlight`, `-interactive`, `-interactive-hover`, `-interactive-pressed`, `-text-low`, `-text-high`, `-disabled-surface`/`-disabled-text` (só Neutral). Fonte: `https://nimbus.tiendanube.com/documentation/tokens/color` (fetch direto). **Divergência interna ao próprio projeto**: o bloco `--ai-*` do shadcn-local usa exatamente essa convenção de sufixo de função da Nimbus, mas o restante da paleta do projeto (`--primary`, `--card`, `--muted` etc.) usa a convenção shadcn/ui de par role+foreground — ou seja, o arquivo `globals.css` mistura duas taxonomias de nomenclatura de cor diferentes, uma por bloco de tokens.

---

## 2. Tipografia, espaçamento e raio: escalas numeradas/nomeadas

**shadcn-local (fato, da auditoria):** só existem tokens de família de fonte (`--font-sans`, `--font-heading`). Não há token de tamanho de fonte, peso, line-height, letter-spacing nem de espaçamento (padding/margin/gap) — o projeto usa a escala padrão do Tailwind v4 para spacing, sem sobrescrita.

### 2.1 Tipografia

**Radix UI Themes:** tem uma escala numerada de 9 passos (`size="1"` a `"9"`) para tipografia, e cada passo define três valores simultâneos — tamanho de fonte, letter-spacing e line-height — todos pensados para uso combinado (ex.: passo 3 = `16px` / `0em` / `24px`; passo 9 = `60px` / `-0.025em` / `60px`). Também define uma escala de peso nomeada (`Light=300`, `Regular=400`, `Medium=500`, `Bold=700`) e tokens de família de fonte separados por papel (`--default-font-family` para texto, mais famílias próprias para `Code`, `Em`/ênfase e `Quote`). Fonte: `https://www.radix-ui.com/themes/docs/theme/typography` (fetch direto).

**Shopify Polaris:** tem uma escala numerada de tamanho de fonte com 13 passos nomeados por múltiplos de 25 (`--p-font-size-275`=11px ... `--p-font-size-1000`=40px), escala de peso (`--p-font-weight-regular`=450, `-medium`=550, `-semibold`=650, `-bold`=700), escala de letter-spacing nomeada (`-densest`/`-denser`/`-dense`/`-normal`) e escala de line-height numerada (`--p-font-line-height-300`=12px ... `-1200`=48px). Fonte: `https://polaris.shopify.com/tokens/font` (fetch direto).

**Nimbus:** tem tamanhos de fonte divididos em duas famílias semânticas — Title (`font-size-title-h1` a `h6`, de 2rem a 0.75rem) e Body (`font-size-body-caption`/`base`/`highlight`) — mais uma escala numérica paralela (`font-size-3`, `font-size-3-5`, `font-size-4`... até `font-size-16`) com os mesmos valores absolutos reaproveitados sob nomes semânticos diferentes; e uma escala de peso de 3 valores (regular 400, medium 500, bold 600) e de line-height espelhando os tamanhos. O texto da própria doc explica que os tamanhos "foram baseados nos valores de espaçamento", múltiplos de 4px sobre uma base de 16px=1rem. Fonte: `https://nimbus.tiendanube.com/documentation/tokens/typography` (fetch direto).

**Material Design 3:** define uma escala de 15 tokens de tipografia fixos, organizados em 5 categorias (Display, Headline, Title, Body, Label) x 3 tamanhos (Large/Medium/Small) — ex. Display Large=57px, Body Large=16px, Label Small=11px — com nome de token no formato `--md-sys-typescale-<categoria>-<tamanho>-<propriedade>` (propriedade = font/size/line-height/weight). Fonte: resumo de busca citando `m3.material.io/styles/typography/overview` e `developer.android.com/design/ui/wear/guides/styles/typography/type-scale-tokens` (conteúdo não lido diretamente).

**IBM Carbon:** a navegação do site lista "Typography" como um dos "Elements" de primeira classe (ao lado de Color, 2x Grid, Motion, Spacing) — confirma que existe uma seção dedicada de tipografia na documentação, mas o conteúdo específico de tokens de tamanho/peso de Carbon não foi lido nesta pesquisa (a página `/elements/2x-grid/overview` foi lida, mas não a página de Typography). Fonte da existência da seção: `https://carbondesignsystem.com/elements/2x-grid/overview/` (menu de navegação capturado no fetch, fetch direto).

**Divergência a registrar:** dos 5 sistemas de referência consultados, Radix Themes, Polaris e Nimbus têm — confirmado por leitura direta das páginas de token — escalas explícitas e numeradas de tamanho de fonte, peso e line-height como tokens de primeira classe, publicados lado a lado com a paleta de cor. M3 aparenta ter o mesmo padrão (via busca, não confirmado por leitura direta). O shadcn-local não tem nenhum desses três tipos de token — só família de fonte.

### 2.2 Espaçamento

**Radix UI Themes:** escala numerada de 9 passos (`--space-1`=4px ... `--space-9`=64px), usada tanto em props de layout (`margin`, `padding`, `gap`) quanto disponível como variável CSS. Existe ainda um fator de escala único (`--scaling`, prop `scaling` no componente `Theme`) que multiplica toda a escala de espaçamento/fonte de uma vez — mecanismo parecido em espírito com o `--radius` único do shadcn-local, mas aplicado ao espaçamento, algo que o projeto auditado não tem. Fonte: `https://www.radix-ui.com/themes/docs/theme/spacing` (fetch direto).

**Shopify Polaris:** escala numerada de 18 passos com nomes em múltiplos de 25/50/100 (`--p-space-0`=0px, `--p-space-100`=4px, `--p-space-400`=16px ... `--p-space-3200`=128px), mais tokens de espaçamento específicos de componente que referenciam a escala (`--p-space-card-padding: var(--p-space-400)`, `--p-space-button-group-gap: var(--p-space-200)`). Fonte: `https://polaris.shopify.com/tokens/space` (fetch direto).

**Nimbus:** escala de 21 passos baseada em grid de 4px sobre base de 16px=1rem (`spacing-0-5`=0.125rem ... `spacing-20`=5rem), com papel de uso descrito para alguns passos (ex. `spacing-4` = "espaçamento interno de componentes como containers ou cards"). Fonte: `https://nimbus.tiendanube.com/documentation/tokens/spacing` (fetch direto).

**IBM Carbon:** não tem uma escala de "spacing" isolada — o espaçamento é derivado do "2x Grid", cuja unidade mínima é o "mini unit" de 8px; margens e paddings são sempre múltiplos fixos de mini unit (padding padrão = 16px = 2 mini units em todos os breakpoints), e há uma "sizing scale" explícita em mini units (8px=1x, 16px=2x, 24px=3x, 32px=4x, 48px=6x, 64px=8x, 80px=10x) usada tanto para espaçamento vertical quanto para dimensionar componentes. Fonte: `https://carbondesignsystem.com/elements/2x-grid/overview/` (fetch direto).

**Divergência a registrar:** todos os 4 sistemas de referência lidos diretamente (Radix Themes, Polaris, Nimbus, Carbon) publicam uma escala de espaçamento numerada e explícita como token de design de primeira classe. O shadcn-local, segundo a auditoria, não sobrescreve nem declara nenhum token de espaçamento — usa a escala padrão (não customizada) do Tailwind v4.

### 2.3 Raio (shape)

**shadcn-local (fato, da auditoria):** duas famílias de raio, ambas derivadas de um único token base `--radius` por multiplicação (`--radius-sm/md/lg/xl` = radius ∓ px fixo; `--radius-0-5` a `--radius-6` + `half`/`full`/`base` = múltiplos do mesmo `--radius`). Mudar `--radius` no preset escala as duas famílias juntas.

**Radix UI Themes:** escala de 6 passos (`--radius-1` a `--radius-6`) mais um ajuste de tema (`radius`, prop do componente `Theme`, valores nomeados `none`/`small`/`medium`/`large`/`full`) que funciona como um "fator" (`--radius-factor`) que multiplica toda a escala de uma vez — mecanismo estruturalmente parecido com o do shadcn-local (uma variável controla todas as demais), mas exposto como 5 opções nomeadas fixas em vez de um valor livre em rem. O raio também não é absoluto por componente: alguns componentes (ex. Checkbox) nunca ficam 100% arredondados mesmo em `radius="full"`, por design. Fonte: `https://www.radix-ui.com/themes/docs/theme/radius` (fetch direto).

**Shopify Polaris:** escala numerada e fixa em px (`--p-border-radius-0`=0px, `-050`=2px, `-100`=4px, `-150`=6px, `-200`=8px, `-300`=12px, `-400`=16px, `-500`=20px, `-750`=30px, `-full`=9999px) — valores absolutos, não proporcionais a uma variável única de tema. Fonte: `https://polaris.shopify.com/tokens/border` (fetch direto).

**Nimbus:** escala baseada em múltiplos de 4px, com nomenclatura quase idêntica à "escala estilo Nimbus" citada na auditoria do projeto — `shape-border-radius-0-5`, `-1`, `-2`... `-6`, mais `-half` (50%) e `-full` (9999px) e um `shape-border-radius-base` (0.375rem). Fonte: `https://nimbus.tiendanube.com/documentation/tokens/shape` (fetch direto). **Divergência estrutural a registrar:** apesar do nome/estrutura dos passos ser praticamente idêntico ao do shadcn-local, a doc da Nimbus lista cada passo com um valor absoluto fixo em rem (0.125rem, 0.25rem, 0.5rem... 1.5rem) — não descreve esses passos como múltiplos de uma variável de tema única que muda por preset. No shadcn-local, todos os passos da "escala estilo Nimbus" são múltiplos relativos de `--radius`, então trocar `--radius` no preset ativo desloca a escala inteira — um comportamento de escalonamento único que a documentação da Nimbus lida não descreve para sua própria escala.

**Material Design 3:** escala de shape com passos nomeados fixos (não relativos a uma variável única): None=0dp, Extra-small=4dp, Small=8dp, Medium=12dp, Large=16dp, Extra-large=24dp (e variações estendidas citadas em fontes secundárias, como Extra-extra-large=48dp), além de Full=9999dp para pill/circular. Cada componente do M3 é associado a um passo fixo da escala (ex. botões usam "Full", cards usam "Medium/Large"), em vez de todos os componentes escalarem juntos a partir de uma única variável. Fonte: resumo de busca citando `m3.material.io/styles/shape/corner-radius-scale` (conteúdo não lido diretamente).

**IBM Carbon:** a navegação de "Elements" do site não lista uma categoria dedicada de "Shape" ou "Radius" ao lado de Color/Spacing/Typography (a lista capturada foi: 2x Grid, Accessibility, Content, Color, Icons, Pictograms, Motion, Spacing, Themes, Typography — sem "Shape"/"Corner radius"). Isso não confirma que Carbon não tenha tokens de raio (podem existir em nível de componente), apenas que não há uma página de "Elements" dedicada e publicamente destacada para isso como há para Color/Spacing/Typography. Fonte: `https://carbondesignsystem.com/elements/2x-grid/overview/` (menu capturado no fetch direto).

---

## 3. Border-width

**shadcn-local (fato, da auditoria):** um único token `--border-width` (1px por padrão; só o preset `tech` o sobrescreve para 2px).

**Shopify Polaris:** escala numerada e explícita de espessura de borda (`--p-border-width-0`=0px, `-0165`=0.66px, `-025`=1px, `-050`=2px, `-100`=4px) — múltiplos passos fixos, não um único token global de espessura. Fonte: `https://polaris.shopify.com/tokens/border` (fetch direto).

**Nimbus:** também tem uma escala de 5 passos de espessura de borda (`shape-border-width-1`=0.0625rem/1px ... `-5`=1.25rem), dentro do mesmo grupo de tokens "Shape" que trata os raios. Fonte: `https://nimbus.tiendanube.com/documentation/tokens/shape` (fetch direto).

**Radix UI Themes:** nas páginas de Color, Typography, Spacing e Radius lidas diretamente nesta pesquisa não apareceu nenhum token de espessura de borda dedicado (`--border-width-*`) — ausência não confirmada de forma exaustiva (não foram lidas todas as páginas do tema, ex. "Shadows"/"Cursors"), mas não encontrada nas páginas consultadas.

**Divergência a registrar:** Polaris e Nimbus publicam escalas numeradas de border-width com múltiplos passos; o shadcn-local tem um único token de espessura global por preset (não uma escala).

---

## 4. Cobertura de componentes

### 4.1 Itens "em construção" do shadcn-local vs. catálogo real da Nimbus

A auditoria lista 12 componentes marcados como "em construção" (não implementados), citados como existentes "em outro produto (Nimbus)": Atoms — `Chip`, `Tag`, `File Uploader`, `Icon Button`, `Link`, `List`, `Text`, `Box`, `Icon`, `MultiSelect`, `Thumbnail`, `Title`; Molecules — `SegmentedControl`, `SplitButton`; Organisms — `Stepper`, `TimePicker`.

Cruzando com o catálogo publicado da Nimbus (fontes: `https://nimbus.tiendanube.com/documentation/atomic-components` e `https://nimbus.tiendanube.com/documentation/composite-components`, ambas fetch direto):

- Confirmados 1:1 no catálogo real da Nimbus, com o mesmo nome: `Badge`(não citado, mas existe), `Box`, `Button`, `Checkbox`, `Chip`, `Divider`, `File Uploader`, `Icon Button`, `Icon`, `Input`, `Label`, `Link`, `List`, `Popover`, `Progress Bar`, `Radio`, `Select`, `Skeleton`, `Slider`, `Spinner`, `Stack`, `Tag`, `Text`, `Textarea`, `Thumbnail`, `Title`, `Toast`, `Toggle`, `Tooltip` (atômicos) e `Accordion`, `Alert`, `Card`, `Modal`, `Pagination`, `Scroll Pane`, `Segmented Control`, `Sidebar`, `SplitButton`, `Stepper`, `Table`, `Tabs` (compostos).
- Especificamente da lista "em construção" do shadcn-local: `Chip`, `Tag`, `File Uploader`, `Icon Button`, `Link`, `List`, `Text`, `Box`, `Icon`, `Thumbnail`, `Title` (atoms) e `SegmentedControl`, `SplitButton` (molecules) e `Stepper` (organism) **têm correspondência direta e nominal** no catálogo publicado da Nimbus lido nesta pesquisa.
- `MultiSelect` e `TimePicker` **não apareceram** nominalmente nas duas páginas de catálogo (atômico e composto) lidas nesta pesquisa — não é possível confirmar nem negar a existência desses dois componentes em outra parte da documentação da Nimbus (ex. seção "Experiências de IA", não lida em detalhe).

### 4.2 Convergências de "essencial" entre o shadcn-local e as referências

Componentes presentes no shadcn-local (segundo `atomic-registry.ts`) que também aparecem como itens de primeira classe em pelo menos 3 dos 4 catálogos lidos diretamente (Radix Themes, Polaris, Carbon v10, Nimbus): `Button`, `Checkbox`, `Radio`(-group), `Select`, `Switch`(→ Toggle na Nimbus/Carbon), `Tabs`, `Dialog`, `Popover`, `Tooltip`, `Avatar`, `Badge`, `Progress`, `Slider`, `Accordion`, `Breadcrumb`, `Pagination`, `Separator`(→ Divider/Horizontal rule), `Skeleton`. Fontes: `https://www.radix-ui.com/themes/docs/theme/color` (lista de componentes no menu, fetch direto), `https://polaris-react.shopify.com/components` (fetch direto), `https://v10.carbondesignsystem.com/community/component-index/` (menu de navegação capturado no fetch, que lista os componentes core do v10: Accordion, Breadcrumb, Button, Checkbox, Code snippet, Content switcher, Data table, Date picker, Dropdown, File uploader, Form, Inline loading, Link, List, Loading, Modal, Notification, Number input, Overflow menu, Pagination, Progress bar, Progress indicator, Radio button, Search, Select, Slider, Structured list, Tabs, Tag, Text input, Tile, Toggle, Tooltip, UI shell header/left panel/right panel), e `https://nimbus.tiendanube.com/documentation/atomic-components` + `/composite-components` (fetch direto).

`Kbd` (atom do shadcn-local) tem equivalente direto em Polaris ("Keyboard key", categoria Images and icons) — não é um item exclusivo/atípico do projeto auditado. Fonte: `https://polaris-react.shopify.com/components` (fetch direto).

### 4.3 O que as referências tratam como "essencial" e não aparece nos 59 componentes categorizados do shadcn-local

- **Link / Text / Heading como componentes de tipografia dedicados**: Radix Themes tem `Text`, `Heading`, `Link`, `Blockquote`, `Code`, `Em`, `Quote`, `Strong` como componentes de primeira classe na categoria "Typography" (fonte: `https://www.radix-ui.com/themes/docs/theme/typography`, fetch direto); Polaris tem `Text` e `Link` como componentes próprios (fonte: `https://polaris-react.shopify.com/components`, fetch direto). No shadcn-local, segundo a auditoria, nenhum desses (Link, Text, Heading/Title) aparece entre os 59 componentes categorizados em `atomicRegistry` — `Link` e `Text`/`Title` estão exatamente na lista de itens "em construção" do próprio projeto (ver 4.1).
- **Callout**: Radix Themes tem um componente `Callout` (distinto de `Alert Dialog`) na lista de componentes. O shadcn-local tem `alert` (molecule) mas nenhum componente chamado/equivalente a "Callout" nos 59 categorizados. Fonte: `https://www.radix-ui.com/themes/docs/theme/color` (menu de componentes, fetch direto).
- **Tile / Structured list**: Carbon v10 lista `Tile` e `Structured list` como componentes core. Não aparecem nomeados entre os 59 componentes do shadcn-local. Fonte: `https://v10.carbondesignsystem.com/community/component-index/` (fetch direto).
- **Chip como componente selecionável de primeira classe**: M3 trata "Chips" (filter/input/suggestion) como categoria de componente de seleção (fonte: resumo de busca citando `m3.material.io/components`, não lido diretamente); no shadcn-local, `Chip` está listado como atom "em construção" — consistente com ser tratado como essencial nas referências mas ainda não implementado no projeto.
- **Data visualization como domínio próprio**: Carbon documenta uma seção "Data visualizations" separada (com Chart types, Chart anatomy, Color palettes, Axes and labels, Legends, Dashboards) ao lado dos elementos/componentes, sinalizando um tratamento mais extenso do que um único componente `chart`. O shadcn-local tem um único organism `chart` (recharts) com 5 tokens `--chart-1..5`. Fonte da existência da seção Carbon: página de navegação de `https://carbondesignsystem.com/elements/2x-grid/overview/` (fetch direto, menu lateral cita "Data visualization Get started..."); conteúdo da seção não lido em detalhe.

### 4.4 Ausências não confirmadas (não é possível afirmar que as referências não têm)

Os tokens `--ai-*` e as variantes `ai-primary`/`ai-secondary` do componente `Button` no shadcn-local vêm, segundo a própria auditoria, da documentação de "AI experiences" da Nimbus (`nimbus.nuvemshop.com.br/documentation/ai-experiences/referencia-tecnica`) — essa página específica não foi lida nesta pesquisa (não fetchada), então não é possível confirmar aqui se a Nimbus documenta um componente `Button` com variantes de IA equivalentes, nem comparar a cobertura desse ponto contra M3/Radix/Polaris/Carbon (nenhum dos quatro teve uma seção de "AI experiences" localizada nas páginas lidas, exceto a menção de "IBM Design for AI" como área de prática de alto nível no menu do site da Carbon, não explorada em detalhe).

---

## 5. Presets de marca / troca de pacotes de tokens inteiros

**shadcn-local (fato, da auditoria):** 4 presets (`editorial`, `tech`, `soft`, `midnight`) via atributo `data-style`, cada um sobrescrevendo diretamente dezenas de custom properties individuais — fonte, radius, border-width (só tech), as 6 sombras, toda a paleta de cor (primary/secondary/card/popover/muted/accent/border/input/ring/chart-1..5/sidebar-primary), e em alguns casos até `--background`/`--foreground` (midnight) ou `--destructive` (midnight, só light) — um modelo de "pacote de tokens" hard-coded por preset, sem um mecanismo gerador que derive os valores de um parâmetro único.

**Radix UI Themes:** o mecanismo de tema é parametrizado, não um pacote de valores por preset — um pequeno conjunto de props no componente `Theme` (`accentColor`, `grayColor`, `radius`, `scaling`, `panelBackground`) já deriva automaticamente a escala inteira correspondente (12 passos de cor, 6 passos de raio, 9 passos de espaçamento) a partir de uma escolha simples, em vez de cada tema reescrever manualmente cada token de cor/raio individualmente. Fonte: `https://www.radix-ui.com/themes/docs/theme/color` + `/radius` + `/spacing` (fetch direto, todas as três).

**IBM Carbon:** tem 4 temas shipados (White, Gray 10, Gray 90, Gray 100), cada um "nomeado pela cor de fundo primária", com os mesmos nomes de token em todos os temas mas valores de cor diferentes — porém os 4 temas de Carbon variam **apenas cor** (o texto da doc não menciona troca de tipografia, raio ou espessura de borda por tema). Isso diverge do shadcn-local, cujos 4 presets trocam simultaneamente família de fonte, radius, sombra, border-width (no caso do tech) e cor. Fonte: `https://carbondesignsystem.com/elements/color/overview/` (fetch direto).

**Material Design 3:** a busca indica que M3 tem "dynamic color" — geração algorítmica de uma paleta tonal completa a partir de uma única cor semente (em vez de paletas fixas por preset hand-authored) — mas essa informação vem de resumo de busca citando páginas de `m3.material.io`, sem confirmação por leitura direta (site requer JavaScript).

**Shopify Polaris e Nimbus:** nas páginas lidas nesta pesquisa (color, typography, spacing, shape, tokens overview de ambos) não foi encontrada nenhuma menção a múltiplos presets de marca inteiros comparáveis aos 4 do shadcn-local — a documentação de ambos descreve um conjunto canônico único de tokens (com variante dark mencionada apenas para Nimbus, cujos tokens de IA "são idênticos em light/dark" segundo a auditoria do projeto). Essa é uma ausência observada nas páginas lidas, não uma confirmação exaustiva de que Polaris/Nimbus nunca ofereçam múltiplos temas de marca em outro lugar da documentação.

---

## 6. Resumo das fontes efetivamente consultadas

- Material Design 3 (`m3.material.io/styles/color/roles`, `/styles/typography/overview`, `/styles/shape/corner-radius-scale`, `/foundations/design-tokens`, `/components`): **conteúdo não lido diretamente** — site requer JavaScript; usados apenas resumos de busca que citam essas URLs.
- Radix UI Themes: `https://www.radix-ui.com/themes/docs/theme/color`, `/typography`, `/spacing`, `/radius` — lidos diretamente.
- Shopify Polaris: `https://polaris-react.shopify.com/design/colors/color-tokens`, `/design/typography`, `/components`, `https://polaris.shopify.com/tokens/font`, `/tokens/space`, `/tokens/border` — lidos diretamente.
- IBM Carbon: `https://carbondesignsystem.com/elements/color/overview/`, `/elements/2x-grid/overview/`, `https://v10.carbondesignsystem.com/community/component-index/` — lidos diretamente.
- Nimbus (Tiendanube/Nuvemshop): `https://nimbus.tiendanube.com/documentation/tokens`, `/tokens/color`, `/tokens/typography`, `/tokens/spacing`, `/tokens/shape`, `/atomic-components`, `/composite-components` — lidos diretamente.
