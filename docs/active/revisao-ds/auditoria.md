# Auditoria de Design System — shadcn-local

Data: 2026-07-22
Escopo: mapeamento factual dos tokens, organização Atomic Design e presets de marca. Sem juízo de valor, sem recomendações.

Fontes lidas:
- `src/app/globals.css`
- `src/lib/atomic-registry.ts`
- `src/lib/styles-registry.ts`
- `src/lib/component-docs.ts`
- `src/hooks/use-hero-tokens.ts`
- `src/app/layout.tsx`
- `src/components/app-shell.tsx`
- `src/components/patterns/registry.tsx`
- `src/app/templates/dashboard-financeiro/page.tsx`
- Estrutura de pastas `src/components/ui/*.tsx` e `src/components/patterns/*.tsx`
- Não há `tailwind.config.*` no projeto — confirma Tailwind v4 "CSS-first" (tudo configurado dentro de `globals.css` via `@import "tailwindcss"` + bloco `@theme inline`).

---

## 1. Tokens

Todos os tokens são variáveis CSS custom properties definidas em `:root` (tema claro) e `.dark` (tema escuro), dentro de `src/app/globals.css`. O bloco `@theme inline` (linhas 19-99) é a ponte entre essas variáveis e as classes utilitárias do Tailwind (ex.: `--color-primary: var(--primary)` é o que faz `bg-primary` funcionar).

### 1.1 Cor

Espaço de cor: **OKLCH** em 100% dos tokens de cor (exceto os tokens `--ai-*`, ver 1.5).

Pares "role + role-foreground" definidos em `:root`/`.dark`:
- `--background` / `--foreground`
- `--card` / `--card-foreground`
- `--popover` / `--popover-foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--muted` / `--muted-foreground`
- `--accent` / `--accent-foreground`
- `--destructive` / `--destructive-foreground`
- `--border`, `--input`, `--ring` (sem par "-foreground")
- `--chart-1` a `--chart-5` (paleta para o componente `chart`/recharts)
- `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` (namespace próprio, pode divergir do restante do app)

Todos esses têm o equivalente `--color-*` no bloco `@theme inline` (ex.: `--color-background`, `--color-primary`, `--color-sidebar-ring`), gerando as classes `bg-*`, `text-*`, `border-*` correspondentes.

### 1.2 Tipografia

Dois tokens de família de fonte:
- `--font-sans` (corpo/UI)
- `--font-heading` (títulos)

Valor padrão em `:root`: ambos apontam para `var(--font-inter), ui-sans-serif, system-ui, sans-serif`.

As variáveis `--font-inter`, `--font-lora`, `--font-space-grotesk`, `--font-jetbrains-mono`, `--font-poppins`, `--font-manrope` são geradas por `next/font/google` em `src/app/layout.tsx` e aplicadas todas simultaneamente na tag `<html>` via `fontVariables` (ficam todas disponíveis; o preset ativo decide qual `--font-sans`/`--font-heading` aponta para qual). Não há tokens de tamanho de fonte, peso, line-height ou letter-spacing em `globals.css` (tipografia fica restrita a família de fonte).

### 1.3 Espaçamento / Raio (Shape)

Token base: `--radius: 0.625rem` (em `:root`).

No `@theme inline`, dois grupos derivados de `--radius`:
- Escala "compatível" já usada pelos componentes: `--radius-sm = radius - 4px`, `--radius-md = radius - 2px`, `--radius-lg = radius`, `--radius-xl = radius + 4px`.
- Escala nova nomeada "estilo Nimbus" (aditiva, não substitui a anterior): `--radius-0-5` (0.5×), `--radius-1` (1×), `--radius-2` (2×) ... `--radius-6` (6×), mais `--radius-half` (50%), `--radius-full` (9999px) e `--radius-base` (= `--radius`). Todos múltiplos de `--radius`, então mudar `--radius` no preset escala as duas famílias de raio juntas.

Não há tokens de espaçamento (padding/margin/gap) customizados — o projeto usa a escala de spacing padrão do Tailwind v4, sem sobrescrita em `globals.css`.

### 1.4 Borda (border-width)

Token novo: `--border-width: 1px` em `:root`. Conectado via `--default-border-width: var(--border-width)` no `@theme inline` — essa é a variável de tema que o Tailwind v4 usa para o utilitário `border` (sem sufixo), permitindo mudar a espessura de borda do projeto inteiro trocando um único valor no preset ativo. Só o preset `tech` sobrescreve (`--border-width: 2px`); os demais herdam 1px de `:root`.

### 1.5 Elevação (shadow)

Seis níveis, todos definidos como sombra CSS completa (não só cor/opacidade): `--shadow-2xs`, `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`. Cada um tem valor próprio em `:root` (opacidades ~0.04-0.1, cor preta) e em `.dark` (mesma estrutura, opacidades maiores, ~0.3-0.45). Todos os 6 têm equivalente `--shadow-*` (sem "color-") no `@theme inline`.

### 1.6 Motion

Dois tokens, não usados pelo Tailwind (não aparecem no `@theme inline`), lidos diretamente via `getComputedStyle` por `useHeroTokens()` (`src/hooks/use-hero-tokens.ts`):
- `--hero-speed` (padrão `0.6` em `:root`)
- `--hero-amplitude` (padrão `1` em `:root`)

Alimentam props de velocidade/amplitude do background animado do Hero (componente Aurora/React Bits) na página de portfólio. `useHeroTokens()` também lê `--chart-1`, `--chart-2`, `--chart-3` e converte para hex (via elemento `<span>` sondado com `getComputedStyle`) para usá-los como `colorStops` do gradiente animado — ou seja, a cor do Hero é derivada dos tokens de chart do preset ativo, não tem token de cor próprio.

### 1.7 Tokens de IA (`--ai-*`)

Bloco próprio em `:root`, comentado como originário do "Nimbus Design System" (fonte citada no código: `nimbus.nuvemshop.com.br/documentation/ai-experiences/referencia-tecnica`, verificado contra `@nimbus-ds/tokens@9.6.0` e `@nimbus-ds/styles@9.65.0`). Únicos tokens de cor do arquivo em **hex**, não OKLCH (comentário explica: para não introduzir arredondamento sobre valores que não são originais do projeto). Sem bloco `.dark` — a Nimbus documenta que são idênticos em light/dark.

Tokens: `--ai-surface`, `--ai-surface-highlight`, `--ai-interactive`, `--ai-interactive-hover`, `--ai-interactive-pressed`, `--ai-text-low`, `--ai-text-high`. Todos têm equivalente `--color-ai-*` no `@theme inline`.

Além disso, dois gradientes (`--ai-gradient-rest`, `--ai-gradient-hover`, 3 stops, 50deg) — **não** entram no `@theme inline` (não são cor simples); são referenciados via `var()` direto no componente que os consome.

Consumo atual: comentário no código afirma que só o componente `Button` (variantes `ai-primary`/`ai-secondary`) usa esses tokens hoje. Nenhum dos 4 presets (editorial/tech/soft/midnight) sobrescreve nenhum token `--ai-*`.

### 1.8 Camada `@layer base`

Regra global: `* { border-border outline-ring/50 }` e `body { bg-background text-foreground }` — aplica os tokens de borda/anel/fundo/texto em todo elemento e no body.

---

## 2. Organização Atomic Design

Fonte de verdade: `src/lib/atomic-registry.ts`. O tipo `AtomicCategory` só define três valores: `"atom" | "molecule" | "organism"` — **não existe uma 4ª categoria "template" no registry**; "Templates" existe apenas como seção de navegação separada (ver 2.4).

Pasta `src/components/ui/` contém 60 arquivos de componente (`.tsx` sem `.stories.tsx`) + 59 arquivos `.stories.tsx` (total 119 arquivos `.tsx`). Dos 60 componentes, 59 estão categorizados em `atomicRegistry` e 1 (`direction`) é tratado como utilitário via `utilitySlugs`.

### 2.1 Atoms (24 entradas no registry)

`avatar`, `badge`, `button`, `checkbox`, `input`, `input-otp`, `kbd`, `label`, `progress`, `radio-group`, `separator`, `skeleton`, `slider`, `spinner`, `switch`, `textarea`, `toggle`, `tooltip`, `aspect-ratio`, `native-select`, `select`, `popover`, `item`, `marker`.

### 2.2 Molecules (14 entradas no registry)

`alert`, `sonner`, `breadcrumb`, `button-group`, `collapsible`, `combobox`, `empty`, `field`, `hover-card`, `input-group`, `pagination`, `toggle-group`, `scroll-area`, `attachment`.

Comentário no código sobre `sonner`: substituiu o antigo componente Toast do shadcn/ui; classificado como molecule (não utilitário) porque renderiza UI real para o usuário via portal/`toast()`. Migrado de utilitário para molecule em 2026-07-21, segundo o comentário no arquivo.

### 2.3 Organisms (21 entradas no registry)

`accordion`, `alert-dialog`, `calendar`, `card`, `carousel`, `chart`, `command`, `context-menu`, `dialog`, `dropdown-menu`, `drawer`, `form`, `menubar`, `message`, `bubble`, `navigation-menu`, `resizable`, `sheet`, `sidebar`, `table`, `tabs`.

Total categorizado: 24 + 14 + 21 = **59 componentes**.

### 2.4 Utilitários e "Templates" (fora do atomicRegistry)

- `utilitySlugs = ["direction"]`: componente `direction.tsx`, fora do catálogo visual Atoms/Molecules/Organisms, mas ainda com página própria em `/components`.
- Seção de navegação **"Templates"** (`src/components/app-shell.tsx`, linha 52-53): existe apenas 1 página registrada, `/templates/dashboard-financeiro` (arquivo `src/app/templates/dashboard-financeiro/page.tsx`), uma composição de página completa que importa numerosos componentes de `src/components/ui/*` (accordion, alert-dialog, attachment, chart/recharts, etc.). Não há um registry de "templates" equivalente ao `atomicRegistry`/`patternRegistry` — a rota é hardcoded no `app-shell.tsx`.
- **Patterns** (nível separado, acima de Organism/Template segundo o texto da própria UI em `src/components/pattern-index.tsx`: "Composições reutilizáveis acima de Organism/Template"): 15 arquivos de pattern em `src/components/patterns/*.tsx` (sem contar `.stories.tsx` e `registry.tsx`), todos catalogados em `src/components/patterns/registry.tsx` (`patternRegistry`, 15 entradas):
  `empty-state`, `loading`, `error-state`, `skeleton`, `success-feedback`, `search-experience`, `crud`, `multi-step-form`, `confirmation-dialog`, `delete-flow`, `pagination`, `infinite-scroll`, `filters`, `upload`, `toast-strategy`.

### 2.5 Itens "em construção" (fora do código, catalogados só como metadado)

`inProgressEntries` em `atomic-registry.ts` lista 12 componentes que existem em outro produto (Nimbus) mas não estão implementados neste projeto — aparecem nas páginas de índice como card desabilitado ("Em construção"):
- Atoms: `Chip`, `Tag`, `File Uploader`, `Icon Button`, `Link`, `List`, `Text`, `Box`, `Icon`, `MultiSelect`, `Thumbnail`, `Title`.
- Molecules: `SegmentedControl`, `SplitButton`.
- Organisms: `Stepper`, `TimePicker`.

### 2.6 Documentação estruturada (`component-docs.ts`)

`src/lib/component-docs.ts` define a interface `ComponentDoc` (description, whenToUse, anatomy, variants, states, sizes, doGuidelines, dontGuidelines, code, props). **Correção factual** (o comentário no topo do arquivo estava desatualizado no momento desta auditoria, dizendo que só `button` estaria preenchido — checado contra o conteúdo real do arquivo e corrigido em 2026-07-22): 59 componentes têm entrada em `componentDocs`, todos com `description`/`whenToUse` reais preenchidos (sourced de `ui.shadcn.com`, traduzidos). O que **de fato** ainda está como placeholder `"[a preencher]"` em todos os 59 é só `doGuidelines`/`dontGuidelines` — decisão registrada no `PLANO-LOOP-80-20-TEMPLATES.md`: a doc oficial do shadcn/ui não publica orientação de faça/não faça por componente, e inventar esse conteúdo violaria a regra do Rafael de não inventar texto narrativo. Slugs sem entrada no `componentDocs` (fora dos 59) continuam usando um formato de página antigo (Composição + Exemplos).

---

## 3. Presets de estilo (`data-style`)

Fonte de metadados: `src/lib/styles-registry.ts` (`stylesList`, 5 entradas incluindo `default`). Fonte dos tokens reais: `src/app/globals.css`, seletores `[data-style="..."]` e `.dark[data-style="..."]`.

Mecanismo: atributo `data-style` na tag `<html>` (controlado pelo StyleSwitcher, referenciado nos comentários). "default" (`Padrão`) não tem bloco próprio — usa só `:root`/`.dark`. Os outros 4 (`editorial`, `tech`, `soft`, `midnight`) têm bloco light (`[data-style="X"]`) e bloco dark (`.dark[data-style="X"]`) próprios em `globals.css`.

### 3.1 Editorial

Descrição no registry: "Serifada (Lora), cantos retos, quase sem sombra".

Bloco light sobrescreve: `--font-sans`/`--font-heading` (Lora), `--radius` (0.2rem), `--hero-speed` (0.35), `--hero-amplitude` (0.7), todos os 6 `--shadow-*`, `--primary`/`--primary-foreground`, `--secondary`/`--secondary-foreground`, `--card`/`--card-foreground`, `--popover`/`--popover-foreground`, `--muted`/`--muted-foreground`, `--accent`/`--accent-foreground`, `--border`, `--input`, `--ring`, `--chart-1` a `--chart-5`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-border`.

Não sobrescreve: `--border-width` (herda 1px), `--background`/`--foreground` (herda de `:root`), `--destructive`/`--destructive-foreground` (herda de `:root`), `--sidebar`/`--sidebar-foreground`/`--sidebar-accent`/`--sidebar-accent-foreground`/`--sidebar-ring` (herda de `:root`).

Bloco dark (`.dark[data-style="editorial"]`) sobrescreve: `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--input`, `--ring`, `--sidebar-primary`, `--sidebar-primary-foreground`. Não redefine `--shadow-*` no dark (herda os valores de `.dark` base) nem `--font-*`/`--radius`/`--hero-*` (herdam do bloco light do mesmo preset, que não é reescrito no dark).

### 3.2 Tech

Descrição no registry: "Título em mono, quinas 90°, sombra dura, borda 2px".

Bloco light sobrescreve: `--font-sans` (Space Grotesk), `--font-heading` (JetBrains Mono — única fonte de heading diferente da fonte sans no conjunto de presets), `--radius` (0rem), `--border-width` (2px — único preset que sobrescreve esse token), `--hero-speed` (1.4), `--hero-amplitude` (1.3), todos os 6 `--shadow-*`, `--primary`/`--primary-foreground`, `--secondary`/`--secondary-foreground`, `--card`/`--card-foreground`, `--popover`/`--popover-foreground`, `--muted`/`--muted-foreground`, `--accent`/`--accent-foreground`, `--border`, `--input`, `--ring`, `--chart-1` a `--chart-5`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-border`.

Não sobrescreve: `--background`/`--foreground`, `--destructive`/`--destructive-foreground`, `--sidebar`/`--sidebar-foreground`/`--sidebar-accent`/`--sidebar-accent-foreground`/`--sidebar-ring`.

Bloco dark sobrescreve: `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--input`, `--shadow-sm`/`--shadow-md`/`--shadow-lg` (mas não `--shadow-2xs`/`--shadow-xs`/`--shadow-xl`, que herdam do bloco light do mesmo preset), `--sidebar-primary`, `--sidebar-primary-foreground`.

### 3.3 Soft (Suave)

Descrição no registry: "Poppins, cantos bem arredondados, sombra difusa".

Bloco light sobrescreve: `--font-sans`/`--font-heading` (Poppins), `--radius` (1.35rem, o maior entre os presets), `--hero-speed` (0.5), `--hero-amplitude` (0.8), todos os 6 `--shadow-*` (cor base rosada `oklch(0.6 0.2 15)`, blur alto), `--primary`/`--primary-foreground`, `--secondary`/`--secondary-foreground`, `--card`/`--card-foreground`, `--popover`/`--popover-foreground`, `--muted`/`--muted-foreground`, `--accent`/`--accent-foreground`, `--border`, `--input`, `--ring`, `--chart-1` a `--chart-5`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-border`.

Não sobrescreve: `--border-width` (herda 1px), `--background`/`--foreground`, `--destructive`/`--destructive-foreground`, `--sidebar`/`--sidebar-foreground`/`--sidebar-accent`/`--sidebar-accent-foreground`/`--sidebar-ring`.

Bloco dark sobrescreve: `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--input`, `--sidebar-primary`, `--sidebar-primary-foreground`. Não redefine `--shadow-*` no dark (único preset, junto com editorial, que não toca em nenhuma sombra no bloco dark).

### 3.4 Midnight

Descrição no registry: "Sempre escuro, Manrope, sombra com glow". É o único preset cujo bloco light (`[data-style="midnight"]`, sem `.dark`) já sobrescreve as superfícies base `--background`/`--foreground`, deixando a interface escura mesmo sem a classe `.dark` na tag `<html>` — comentário no código confirma essa intenção.

Bloco light sobrescreve: `--font-sans`/`--font-heading` (Manrope), `--radius` (0.75rem), `--hero-speed` (0.9), `--hero-amplitude` (1.5), `--background`, `--foreground`, `--card`/`--card-foreground`, `--popover`/`--popover-foreground`, `--muted`/`--muted-foreground`, `--accent`/`--accent-foreground`, `--primary`/`--primary-foreground`, `--secondary`/`--secondary-foreground`, `--destructive`/`--destructive-foreground` (único preset que sobrescreve destructive no bloco light — comentário no código explica que foi adicionado depois, reaproveitando o mesmo tom do `.dark` base, porque o vermelho de `:root` não tinha contraste suficiente sobre o fundo escuro do preset), `--border`, `--input`, `--ring`, todos os 6 `--shadow-*` (cor violeta `oklch(0.72 0.19 292.5)`, estilo "glow"), `--chart-1` a `--chart-5`, e também `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` (único preset que sobrescreve o namespace `--sidebar-*` inteiro, incluindo `--sidebar`/`--sidebar-foreground`/`--sidebar-accent`/`--sidebar-accent-foreground`/`--sidebar-ring`, que os outros 3 presets não tocam).

Não sobrescreve: `--border-width` (herda 1px).

Bloco dark (`.dark[data-style="midnight"]`): **não existe no arquivo** — é o único dos 4 presets sem seletor `.dark[data-style="midnight"]` próprio. Como o bloco light de midnight já redefine `--background`/`--foreground`/etc. diretamente (sem depender de `.dark`), a aplicação da classe `.dark` junto com `data-style="midnight"` herda os valores do bloco `.dark` base (`:root`/.dark padrão) só para os tokens que midnight não sobrescreveu (ex.: `--destructive-foreground` vem do `.dark` base coincidentemente, já que midnight reusa o mesmo valor).

### 3.5 Tokens nunca sobrescritos por nenhum preset

Em nenhum dos 4 presets (`editorial`, `tech`, `soft`, `midnight`) aparecem sobrescritas para: `--ai-surface`, `--ai-surface-highlight`, `--ai-interactive`, `--ai-interactive-hover`, `--ai-interactive-pressed`, `--ai-text-low`, `--ai-text-high`, `--ai-gradient-rest`, `--ai-gradient-hover`. Esses tokens permanecem idênticos em todos os presets e temas (herdados de `:root`).

### 3.6 Tabela-resumo (o que cada preset sobrescreve versus herda)

| Grupo de token | default | editorial | tech | soft | midnight |
|---|---|---|---|---|---|
| `--font-sans`/`--font-heading` | Inter/Inter | Lora/Lora | Space Grotesk/JetBrains Mono | Poppins/Poppins | Manrope/Manrope |
| `--radius` | 0.625rem | 0.2rem | 0rem | 1.35rem | 0.75rem |
| `--border-width` | 1px (não sobrescrito) | herda 1px | 2px | herda 1px | herda 1px |
| `--hero-speed`/`--hero-amplitude` | 0.6/1 | 0.35/0.7 | 1.4/1.3 | 0.5/0.8 | 0.9/1.5 |
| `--shadow-*` (6 níveis) | base | sobrescreve os 6 (light); dark herda `.dark` base | sobrescreve os 6 (light); dark sobrescreve 3 de 6 (sm/md/lg) | sobrescreve os 6 (light); dark herda `.dark` base | sobrescreve os 6 (light, estilo glow); sem bloco `.dark` próprio |
| `--background`/`--foreground` | base | não sobrescreve | não sobrescreve | não sobrescreve | sobrescreve (fica escuro mesmo fora do modo dark) |
| `--primary` família | base | sobrescreve | sobrescreve | sobrescreve | sobrescreve |
| `--card`/`--popover`/`--muted`/`--accent` família | base | sobrescreve | sobrescreve | sobrescreve | sobrescreve |
| `--destructive` família | base | não sobrescreve (light nem dark) | não sobrescreve | não sobrescreve | sobrescreve no light (reaproveita valor do `.dark` base) |
| `--border`/`--input`/`--ring` | base | sobrescreve | sobrescreve | sobrescreve | sobrescreve |
| `--chart-1`..`--chart-5` | base | sobrescreve | sobrescreve | sobrescreve | sobrescreve |
| `--sidebar-primary`/`-foreground`/`-border` | base | sobrescreve | sobrescreve | sobrescreve | sobrescreve |
| `--sidebar`/`--sidebar-foreground`/`--sidebar-accent`/`-foreground`/`--sidebar-ring` | base | não sobrescreve | não sobrescreve | não sobrescreve | sobrescreve (único) |
| `--ai-*` (7 tokens + 2 gradientes) | base | não sobrescreve | não sobrescreve | não sobrescreve | não sobrescreve |

---

## 4. Observações estruturais adicionais (factuais)

- Não há arquivo `tailwind.config.js/ts` — confirma abordagem CSS-first do Tailwind v4 (tudo em `globals.css`).
- `useHeroTokens()` (`src/hooks/use-hero-tokens.ts`) é o único ponto do código que lê tokens CSS em runtime via `getComputedStyle` e `MutationObserver` sobre os atributos `data-style`/`class` do `<html>`, para animar o background do Hero na página de portfólio.
- A página `/estilo` (`src/app/estilo/page.tsx`) também referencia `data-style` (não inspecionada em detalhe nesta auditoria, mas identificada via busca).
- O componente `sidebar-07/app-sidebar.tsx` também contém a palavra "template" (não inspecionado em detalhe).
