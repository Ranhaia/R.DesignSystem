# Migração de ícones lucide-react → Google Material Symbols — Plano de Implementação

> ## ⚠️ PLANO EXECUTADO — NÃO REEXECUTAR
>
> Concluído em julho de 2026. As checkboxes abaixo **nunca foram
> marcadas** pelo executor, então elas mentem: aparentam trabalho
> pendente onde não há.
>
> Verificado contra o código em 2026-08-23 — a verificação foi por
> **resultado entregue**, não passo a passo. Existem `src/components/ui/icon.tsx`, `icon-button.tsx` e Material Symbols em `layout.tsx` e `globals.css`.
>
> Este arquivo é **registro histórico**. O trabalho vivo deste repo está
> em `_trabalho/`, e é o único lugar onde checkbox significa alguma
> coisa.



> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir `lucide-react` por Google Material Symbols em todo o projeto, via um componente `<Icon>` que renderiza `<svg viewBox="0 0 24 24"><text>` (não `<span>` de fonte), preservando os seletores `[&_svg]` dos 20 componentes-base do shadcn/ui sem editar nenhum deles, e expondo os eixos variáveis (fill/weight/grade/opticalSize/rounded) via CSS custom properties por preset com override pontual via props.

**Architecture:** Fonte `material-symbols` (npm, self-hosted) carregada via `import "material-symbols/rounded.css"` e `.../sharp.css` em `layout.tsx`. O componente `<Icon name="..." />` renderiza um `<svg>` com um `<text>` interno cujo conteúdo é o nome do ícone (ligature) e cujo `font-family`/`font-variation-settings` lê variáveis CSS (`--icon-*`) definidas por preset em `globals.css`, com override pontual via `style` inline quando uma prop é passada. Dimensionamento explícito (`size`, em rem) é aplicado via `style` inline (width/height), não via classe Tailwind `size-[Nrem]` — ver "Desvio da spec" abaixo.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, pacote npm `material-symbols` (variantes Rounded e Sharp), TypeScript (tipo `MaterialSymbol` exportado pelo próprio pacote, usado no prop `name` do `<Icon>` para validação em tempo de compilação).

## Desvio da spec (achado durante o planejamento, não estava no doc de arquitetura)

A spec (`docs/superpowers/specs/2026-07-28-icon-system-material-symbols-design.md`) descreve o prop `size` aplicando `size-[<n>rem]` — sintaxe de valor arbitrário do Tailwind. **Isso não funciona**: o Tailwind v4 (motor "oxide") extrai classes candidatas fazendo varredura estática do texto-fonte; uma classe montada em runtime via template string (`` `size-[${size}rem]` ``) nunca aparece literalmente em nenhum arquivo-fonte, então o Tailwind nunca gera o CSS correspondente — a classe fica sem efeito. Correção adotada neste plano: quando `size` é passado, aplicar `width`/`height` via `style` inline (funciona com qualquer valor em runtime, sem depender do scanner do Tailwind). Como `style` inline tem especificidade maior que qualquer classe, isso não conflita com os seletores ambiente `[&_svg:not([class*='size-'])]:size-4` dos 20 componentes-base — mesmo que esses seletores ainda apliquem `size-4` via classe (porque tecnicamente não há substring `"size-"` na `className` do nosso `<Icon>`), o `style` inline sempre vence visualmente. A API pública documentada na spec (`size` em rem) continua idêntica — só a implementação interna muda.

Também descoberto: a spec afirma "124 arquivos / 84 nomes de ícone distintos". A contagem de arquivos (124) está correta; a de nomes NÃO — o grep original que gerou esse número não capturava imports multi-linha. A contagem real, levantada neste plano, é **124 arquivos / 118 glifos distintos** (lucide reexporta vários ícones sob dois nomes — ex. `Check`/`CheckIcon`, `Trash2`/`Trash2Icon` — que são o mesmo SVG; contando por nome de export dá 137, por glifo real dá 118). Isso não muda a arquitetura, só o tamanho real do trabalho de migração.

## Global Constraints

- Nenhum dos 20 arquivos de componentes-base do shadcn (`button.tsx`, `dialog.tsx`, `select.tsx`, `dropdown-menu.tsx`, `context-menu.tsx`, `menubar.tsx`, `item.tsx`, `empty.tsx`, `input-group.tsx`, `attachment.tsx`, `button-group.tsx`, `combobox.tsx`, `command.tsx`, `kbd.tsx`, `marker.tsx`, `navigation-menu.tsx`, `tabs.tsx`, `toggle.tsx`, `breadcrumb-dropdown.tsx` e outros) pode ter seu seletor `[&_svg...]` editado — o `<Icon>` precisa renderizar um `<svg>` real como elemento raiz para continuar sendo alcançado por esses seletores.
- Só as variantes **Rounded** e **Sharp** do Material Symbols entram (Outlined fica de fora — fora de escopo).
- As classes prontas do pacote (`.material-symbols-rounded` etc.) não são usadas — só o `@font-face`. Nenhum ícone usa a classe do pacote diretamente.
- `npm run build` precisa passar sem erros de tipo/fonte ao final (critério de aceite da spec) — como o `name` do `<Icon>` é tipado com `MaterialSymbol` (união de ~3900 strings exportada pelo próprio pacote `material-symbols`), qualquer nome de ícone inválido na migração vira erro de `tsc` automaticamente. Use isso como rede de segurança: se um nome da tabela de mapeamento abaixo estiver errado, o build vai apontar exatamente onde.
- `lucide-react` sai do `package.json` só na última tarefa, depois de confirmado que nenhum arquivo mais importa dele.
- Idioma: comentários de código e mensagens de commit em português (convenção do projeto, ver `CLAUDE.md`).
- Não crie nenhum arquivo `.md` de documentação além deste plano.

---

## Tabela de mapeamento lucide → Material Symbol

Referência única para todas as tarefas de migração (5 a 10). "Glifo" agrupa nomes lucide que são o mesmo ícone. Nomes marcados **(conferir)** existem no catálogo (confirmados) mas a escolha semântica é discutível — troque se achar um nome melhor. Toda a tabela foi validada programaticamente contra `index.d.ts` do pacote `material-symbols@0.45.9` (união `MaterialSymbol`, ~3900 nomes) depois da primeira versão deste plano; 7 problemas reais foram corrigidos nessa validação:
- `AlertTriangle` e `Bell` (variantes sem sufixo "Icon") estavam ausentes da tabela — adicionadas aos grupos existentes.
- `AtomIcon` → `atom` não existe no catálogo → corrigido para `orbit`.
- `ChevronDownIcon` → `expand_more` e `ChevronUpIcon` → `expand_less` **não existem** no Material Symbols (existiam no Material Icons antigo, foram renomeados) → corrigidos para `keyboard_arrow_down`/`keyboard_arrow_up` em toda a tabela e nas 3 tarefas que citavam esses nomes em código (5, 6, 8).
- `HeadsetIcon` → `headset` não existe → corrigido para `headset_mic`.
- `Sparkles` → `auto_awesome` não existe nesta versão do catálogo → corrigido para `stars`.

| Glifo lucide (todas as variantes de export) | Material Symbol (`name`) |
|---|---|
| AlertCircleIcon, CircleAlertIcon | `error` |
| AlertTriangle, AlertTriangleIcon, TriangleAlertIcon | `warning` |
| AppWindowIcon | `web_asset` **(conferir)** |
| ArchiveIcon | `archive` |
| ArrowLeft, ArrowLeftIcon | `arrow_back` |
| ArrowRight, ArrowRightIcon | `arrow_forward` |
| ArrowUpIcon | `arrow_upward` |
| ArrowUpRight, ArrowUpRightIcon | `arrow_outward` |
| AtomIcon | `orbit` |
| AudioLinesIcon | `graphic_eq` |
| BadgeCheck, BadgeCheckIcon | `verified` |
| BarChart3Icon | `bar_chart` |
| Bell, BellIcon | `notifications` |
| BlocksIcon | `extension` |
| Bold | `format_bold` |
| BookmarkIcon | `bookmark` |
| BotIcon | `smart_toy` |
| Calculator | `calculate` |
| Calendar, CalendarIcon | `calendar_today` |
| CalendarPlusIcon | `calendar_add_on` **(conferir)** |
| Check, CheckIcon | `check` |
| CheckCircle2Icon, CircleCheckIcon | `check_circle` |
| ChevronDownIcon | `keyboard_arrow_down` |
| ChevronLeftIcon | `chevron_left` |
| ChevronRight, ChevronRightIcon | `chevron_right` |
| ChevronsUpDown | `unfold_more` |
| ChevronUpIcon | `keyboard_arrow_up` |
| CircleIcon | `circle` |
| CircleFadingArrowUpIcon | `update` **(conferir)** |
| CircleHelpIcon, HelpCircle | `help` |
| ClipboardIcon | `assignment` |
| ClipboardListIcon | `checklist` |
| ClockIcon | `schedule` |
| CloudUploadIcon | `cloud_upload` |
| CodeIcon | `code` |
| CombineIcon | `call_merge` **(conferir)** |
| CopyIcon | `content_copy` |
| CreditCard, CreditCardIcon | `credit_card` |
| Download | `download` |
| ExternalLinkIcon | `open_in_new` |
| EyeIcon | `visibility` |
| EyeOffIcon | `visibility_off` |
| FileIcon | `draft` |
| FileCheck2 | `fact_check` |
| FileTextIcon | `description` |
| GripVerticalIcon | `drag_indicator` |
| HandCoinsIcon | `payments` **(conferir)** |
| HeadsetIcon | `headset_mic` |
| HeartIcon | `favorite` |
| HomeIcon | `home` |
| ImageIcon | `image` |
| InboxIcon | `inbox` |
| InfoIcon | `info` |
| Italic | `format_italic` |
| KeyRoundIcon | `key` |
| LayoutDashboardIcon | `dashboard` |
| LayoutTemplateIcon | `space_dashboard` **(conferir)** |
| LifeBuoyIcon | `help_center` |
| Link2Icon | `link` |
| ListFilterIcon | `filter_list` |
| Loader2Icon, LoaderIcon | `progress_activity` |
| LogInIcon | `login` |
| LogOut | `logout` |
| MailIcon | `mail` |
| MailCheckIcon | `mark_email_read` **(conferir)** |
| MenuIcon | `menu` |
| MessageCircleIcon | `chat_bubble` |
| MessageSquareIcon | `chat` |
| Minus, MinusIcon | `remove` |
| MoreHorizontal, MoreHorizontalIcon | `more_horiz` |
| NetworkIcon | `hub` |
| OctagonXIcon | `dangerous` **(conferir)** |
| PaletteIcon | `palette` |
| PanelLeftIcon | `left_panel_open` |
| PartyPopperIcon, PopcornIcon | `celebration` |
| PencilIcon | `edit` |
| Plus, PlusIcon | `add` |
| PuzzleIcon | `extension` |
| QrCodeIcon | `qr_code` |
| RefreshCcwIcon, RefreshCwIcon | `refresh` |
| RocketIcon | `rocket_launch` |
| RotateCcwIcon | `restart_alt` |
| Search, SearchIcon | `search` |
| SendIcon | `send` |
| ServerCrashIcon | `cloud_off` **(conferir)** |
| Settings, SettingsIcon | `settings` |
| ShareIcon | `share` |
| ShieldIcon | `shield` |
| ShieldAlertIcon | `gpp_maybe` |
| ShieldCheckIcon | `verified_user` |
| SlashIcon | **não usar `<Icon>`** — ver caso especial na Tarefa 6 |
| SlidersHorizontalIcon | `tune` |
| Smile | `mood` |
| Sparkles | `stars` |
| StarIcon | `star` |
| TagIcon | `label` |
| TargetIcon | `target` |
| Trash2, Trash2Icon, TrashIcon | `delete` |
| TrendingUp | `trending_up` |
| Underline | `format_underlined` |
| User, UserIcon | `person` |
| UserCogIcon | `manage_accounts` |
| UserRoundXIcon | `person_cancel` **(conferir)** |
| Users, UsersIcon | `group` |
| UserXIcon | `person_off` |
| VolumeOffIcon | `volume_off` |
| Wallet | `wallet` |
| WalletIcon | `wallet` |
| WalletCardsIcon | `account_balance_wallet` **(conferir)** |
| XIcon | `close` |
| Zap | `bolt` |

### Conversão de tamanho (classe Tailwind → prop `size` em rem)

Regra: `size-N` → `size={N * 0.25}`. `h-N w-N` (mesmo N) → mesma coisa. Sem classe de tamanho → omitir o prop `size` (herda o auto-tamanho ambiente, igual hoje).

| Classe atual | prop `size` |
|---|---|
| `size-2` / `h-2 w-2` | `0.5` |
| `size-2.5` | `0.625` |
| `size-3` | `0.75` |
| `size-3.5` | `0.875` |
| `size-4` / `h-4 w-4` | `1` |
| `size-5` | `1.25` |
| `size-6` | `1.5` |
| `size-16` | `4` |

---

## File Structure

- Criar: `src/components/ui/icon.tsx` — o componente `<Icon>`.
- Modificar: `vitest.config.ts` — adiciona um projeto `unit` (ambiente `node`, sem browser) para rodar testes de lógica pura; hoje só existe o projeto `storybook`, cujo `include` não cobre arquivos `.test.ts` soltos (verificado: sem essa mudança, `npx vitest run` num `.test.ts` puro falha com "No test files found").
- Criar: `src/lib/icon-optical-size.ts` — função pura `computeOpticalSize`, extraída para ser testável sem depender de DOM/browser.
- Criar: `src/lib/icon-optical-size.test.ts` — teste da função acima.
- Criar: `src/components/ui/icon.stories.tsx` — stories cobrindo props e os 5 presets.
- Modificar: `src/app/layout.tsx` — imports das fontes.
- Modificar: `src/app/globals.css` — tokens `--icon-*` em `:root` e nos 4 blocos `[data-style="..."]`.
- Modificar: `src/app/estilo/page.tsx` — nova seção "Ícones".
- Modificar: 124 arquivos listados nas Tarefas 5–10 (troca de `lucide-react` por `<Icon>`).
- Modificar: `package.json` — remove `lucide-react`, adiciona `material-symbols`.

---

### Task 1: Instalar `material-symbols` e carregar as fontes

**Files:**
- Modify: `package.json`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: duas variáveis CSS globais fixas `--font-material-rounded` e `--font-material-sharp` (definidas na Tarefa 2, mas dependem das fontes carregadas aqui).

- [ ] **Step 1: Instalar o pacote**

```bash
npm install material-symbols
```

- [ ] **Step 2: Confirmar a versão e o tipo exportado**

```bash
node -e "console.log(require('material-symbols/package.json').version)"
```

Abra `node_modules/material-symbols/index.d.ts` e confirme que existe um type `MaterialSymbol` exportado (união de strings). Se o nome do type ou o caminho de import mudou de versão, ajuste os imports nas tarefas seguintes.

- [ ] **Step 3: Importar as fontes no layout**

Em `src/app/layout.tsx`, logo abaixo de `import "./globals.css"`:

```tsx
import "./globals.css";
import "material-symbols/rounded.css";
import "material-symbols/sharp.css";
```

- [ ] **Step 4: Rodar o dev server e confirmar que as fontes carregam**

```bash
npm run dev
```

Abra `http://localhost:3000`, abra o DevTools → Network → filtre por `woff2` → confirme 2 arquivos de fonte carregados (`material-symbols-rounded.woff2`, `material-symbols-sharp.woff2`), sem erro 404.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/app/layout.tsx
git commit -m "Instala pacote material-symbols e carrega fontes Rounded/Sharp"
```

---

### Task 2: Tokens `--icon-*` em `globals.css`

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `--font-material-rounded`, `--font-material-sharp` (fixas, `:root`), `--icon-font-family`, `--icon-fill`, `--icon-weight`, `--icon-grade`, `--icon-optical-size` (uma definição por preset, lidas pelo `<Icon>` na Tarefa 3).

- [ ] **Step 1: Adicionar as duas variáveis fixas + defaults do preset Padrão em `:root`**

Em `src/app/globals.css`, dentro do bloco `:root` (linha 191), logo depois do comentário de tipografia (`--font-heading`, por volta da linha 213), adicionar:

```css
  /* Material Symbols: duas variáveis fixas (nome de fonte real, carregada
     em layout.tsx) que cada preset referencia via --icon-font-family,
     conforme o preset for "rounded" ou "sharp". */
  --font-material-rounded: "Material Symbols Rounded";
  --font-material-sharp: "Material Symbols Sharp";

  /* Eixos do Material Symbols para o preset Padrão (rounded, sem fill,
     peso regular, sem grade, tamanho óptico 24 — ver tabela na spec). */
  --icon-font-family: var(--font-material-rounded);
  --icon-fill: 0;
  --icon-weight: 400;
  --icon-grade: 0;
  --icon-optical-size: 24;
```

- [ ] **Step 2: Adicionar os defaults de cada um dos 4 presets**

Em `[data-style="editorial"]` (linha 501), logo após `--hero-amplitude: 0.7;`:

```css
  --icon-font-family: var(--font-material-sharp);
  --icon-fill: 0;
  --icon-weight: 300;
  --icon-grade: 0;
  --icon-optical-size: 24;
```

Em `[data-style="tech"]` (linha 595), no mesmo padrão (logo após a declaração de `--hero-*` ou `--border-width` desse bloco):

```css
  --icon-font-family: var(--font-material-sharp);
  --icon-fill: 0;
  --icon-weight: 500;
  --icon-grade: -25;
  --icon-optical-size: 20;
```

Em `[data-style="soft"]` (linha 681):

```css
  --icon-font-family: var(--font-material-rounded);
  --icon-fill: 1;
  --icon-weight: 400;
  --icon-grade: 200;
  --icon-optical-size: 24;
```

Em `[data-style="midnight"]` (linha 787):

```css
  --icon-font-family: var(--font-material-rounded);
  --icon-fill: 0;
  --icon-weight: 400;
  --icon-grade: -25;
  --icon-optical-size: 24;
```

Não duplicar nada nos blocos `.dark[data-style="..."]` — esses só sobrescrevem cor, os tokens de ícone (como fonte/radius/sombra) ficam definidos uma vez só no bloco claro e continuam valendo no escuro por cascata (mesmo padrão já usado por `--font-sans`/`--radius`/`--shadow-*` no arquivo).

- [ ] **Step 3: Verificar visualmente**

Com o dev server rodando, abra `/estilo`, use o seletor de estilo na sidebar pra trocar entre os 5 presets, e confirme no DevTools (Elements → Computed) que `--icon-font-family`, `--icon-fill` etc. mudam de valor em `<html>` a cada troca.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "Adiciona tokens --icon-* por preset de estilo"
```

---

### Task 3: Função pura `computeOpticalSize` (TDD)

**Files:**
- Modify: `vitest.config.ts`
- Create: `src/lib/icon-optical-size.ts`
- Test: `src/lib/icon-optical-size.test.ts`

**Interfaces:**
- Produces: `computeOpticalSize(sizeRem: number): number` — consumida pelo `<Icon>` na Tarefa 4.

> Nota sobre testes: este projeto não tem um runner de teste de componente em jsdom — o único harness (`@storybook/addon-vitest`) roda stories reais dentro de um Chromium via Playwright (ver `vitest.config.ts`). Verificado durante o planejamento: `vitest.config.ts` hoje só declara UM projeto (`storybook`), com `include` restrito a `**/*.stories.@(js|jsx|mjs|ts|tsx)` e `**/*.mdx` — rodar `npx vitest run` contra um `.test.ts` puro sem adicionar um projeto novo falha com "No test files found" (confirmado empiricamente: `Test Files  no tests found` / exit code 1). O Step 1 abaixo adiciona um segundo projeto `unit` (ambiente `node`, sem browser) só para arquivos `src/**/*.test.ts` — isolado do projeto `storybook`, não muda nada do comportamento dele. Testes visuais/de integração do `<Icon>` em si ficam a cargo da Storybook story da Tarefa 4 + verificação manual (ver `CLAUDE.md` da sessão: "para mudanças de UI, rode o dev server e confira no navegador").

- [ ] **Step 1: Adicionar um projeto `unit` ao `vitest.config.ts` para testes puros (sem browser)**

Em `vitest.config.ts`, dentro do array `projects`, adicionar um novo objeto ANTES do objeto existente (`{ extends: true, plugins: [...], test: { name: 'storybook', ... } }`):

```ts
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
```

- [ ] **Step 2: Escrever o teste (vai falhar — o arquivo de implementação ainda não existe)**

```ts
// src/lib/icon-optical-size.test.ts
import { describe, expect, it } from "vitest"

import { computeOpticalSize } from "./icon-optical-size"

describe("computeOpticalSize", () => {
  it("converte rem para px (1rem = 16px) quando dentro da faixa 20-48", () => {
    expect(computeOpticalSize(1.5)).toBe(24)
  })

  it("satura em 20 (mínimo do eixo opsz) para tamanhos pequenos", () => {
    expect(computeOpticalSize(1)).toBe(20)
  })

  it("satura em 48 (máximo do eixo opsz) para tamanhos grandes", () => {
    expect(computeOpticalSize(4)).toBe(48)
  })

  it("não satura em valores dentro da faixa", () => {
    expect(computeOpticalSize(2)).toBe(32)
  })
})
```

- [ ] **Step 3: Rodar e confirmar que falha**

```bash
npx vitest run src/lib/icon-optical-size.test.ts
```

Esperado: FAIL com "Cannot find module './icon-optical-size'" (ou similar) — e a saída deve mostrar `|unit|`, não `|storybook (chromium)|`, confirmando que o novo projeto pegou o arquivo.

- [ ] **Step 4: Implementar**

```ts
// src/lib/icon-optical-size.ts

// Eixo "opsz" (optical size) do Material Symbols só aceita 20-48. O prop
// `size` do <Icon> é em rem (1rem = 16px); convertendo pra "px equivalente"
// e saturando na faixa do eixo, ícones grandes ganham traços mais grossos
// automaticamente sem o consumidor do <Icon> precisar pensar nisso.
export function computeOpticalSize(sizeRem: number): number {
  return Math.min(48, Math.max(20, sizeRem * 16))
}
```

- [ ] **Step 5: Rodar de novo e confirmar que passa**

```bash
npx vitest run src/lib/icon-optical-size.test.ts
```

Esperado: 4 testes PASS.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts src/lib/icon-optical-size.ts src/lib/icon-optical-size.test.ts
git commit -m "Adiciona projeto unit ao vitest e cálculo de optical size para o componente Icon"
```

---

### Task 4: Componente `<Icon>` + story

**Files:**
- Create: `src/components/ui/icon.tsx`
- Create: `src/components/ui/icon.stories.tsx`

**Interfaces:**
- Consumes: `computeOpticalSize` de `@/lib/icon-optical-size` (Tarefa 3); `cn` de `@/lib/utils`; type `MaterialSymbol` de `material-symbols`.
- Produces: `export function Icon(props: IconProps)`, usado em todas as Tarefas 5–10. Assinatura final:
  ```ts
  interface IconProps extends Omit<React.ComponentProps<"svg">, "name"> {
    name: MaterialSymbol
    size?: number
    rounded?: boolean
    fill?: boolean
    weight?: number
    grade?: number
    opticalSize?: number
  }
  ```

- [ ] **Step 1: Implementar o componente**

```tsx
// src/components/ui/icon.tsx
import * as React from "react"
import type { MaterialSymbol } from "material-symbols"

import { computeOpticalSize } from "@/lib/icon-optical-size"
import { cn } from "@/lib/utils"

interface IconProps extends Omit<React.ComponentProps<"svg">, "name"> {
  name: MaterialSymbol
  /** Tamanho em rem. Ausente = herda o auto-tamanho ambiente (ex.: size-4
      dentro de um Button), igual ao comportamento do lucide-react hoje. */
  size?: number
  /** true = Material Symbols Rounded, false = Sharp. Ausente = default do
      preset ativo (ver --icon-font-family em globals.css). */
  rounded?: boolean
  fill?: boolean
  weight?: number
  grade?: number
  opticalSize?: number
}

function Icon({
  name,
  size,
  rounded,
  fill,
  weight,
  grade,
  opticalSize,
  className,
  style,
  ...props
}: IconProps) {
  const resolvedOpticalSize =
    opticalSize ?? (size !== undefined ? computeOpticalSize(size) : undefined)

  return (
    <svg
      viewBox="0 0 24 24"
      data-slot="icon"
      aria-hidden="true"
      className={cn("shrink-0 select-none", className)}
      style={
        {
          ...(size !== undefined
            ? { width: `${size}rem`, height: `${size}rem` }
            : {}),
          ...(rounded !== undefined
            ? {
                "--icon-font-family": rounded
                  ? "var(--font-material-rounded)"
                  : "var(--font-material-sharp)",
              }
            : {}),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={24}
        fill="currentColor"
        style={{
          fontFamily: "var(--icon-font-family)",
          fontFeatureSettings: "'liga'",
          textRendering: "optimizeLegibility",
          fontVariationSettings: `'FILL' ${
            fill !== undefined ? (fill ? 1 : 0) : "var(--icon-fill)"
          }, 'wght' ${weight ?? "var(--icon-weight)"}, 'GRAD' ${
            grade ?? "var(--icon-grade)"
          }, 'opsz' ${resolvedOpticalSize ?? "var(--icon-optical-size)"}`,
        }}
      >
        {name}
      </text>
    </svg>
  )
}

export { Icon }
export type { IconProps }
```

- [ ] **Step 2: Rodar o type-check**

```bash
npx tsc --noEmit
```

Esperado: sem erros novos relacionados a `icon.tsx`.

- [ ] **Step 3: Story cobrindo props e presets**

```tsx
// src/components/ui/icon.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Icon } from "@/components/ui/icon"

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "home" },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const TamanhosEmRem: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Icon name="home" size={1} />
      <Icon name="home" size={1.5} />
      <Icon name="home" size={2} />
      <Icon name="home" size={3} />
    </div>
  ),
}

export const AutoTamanhoAmbiente: Story = {
  name: "Auto-tamanho (herda size-4 do botão)",
  render: () => (
    <button className="[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 inline-flex items-center gap-1 rounded-md border px-3 py-1.5">
      <Icon name="download" />
      Baixar
    </button>
  ),
}

export const EixosManuais: Story = {
  name: "Eixos via props (override do preset)",
  render: () => (
    <div className="flex items-end gap-4">
      <Icon name="favorite" size={2} rounded fill weight={700} />
      <Icon name="favorite" size={2} rounded={false} fill={false} weight={200} />
      <Icon name="favorite" size={2} grade={200} opticalSize={20} />
    </div>
  ),
}

export const IndicadorSolido: Story = {
  name: "Ponto sólido (fill como substituto de fill-current)",
  render: () => (
    <Icon name="circle" size={0.5} fill className="text-primary" />
  ),
}
```

- [ ] **Step 4: Rodar o dev server e conferir visualmente**

```bash
npm run storybook
```

Abra a story `Atoms/Icon`, confira as 4 variantes acima, e troque o preset de estilo na página `/estilo` do app (`npm run dev`, outro terminal) — os ícones no app devem mudar de variante/peso.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/icon.tsx src/components/ui/icon.stories.tsx
git commit -m "Adiciona componente Icon (Material Symbols via svg+text)"
```

---

### Task 5: Migrar `src/components/ui/` (25 arquivos)

**Files (25):** `accordion.tsx`, `alert.stories.tsx`, `attachment.stories.tsx`, `breadcrumb.tsx`, `button.stories.tsx`, `calendar.tsx`, `carousel.tsx`, `checkbox.tsx`, `combobox.tsx`, `command.tsx`, `context-menu.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `input-otp.tsx`, `menubar.tsx`, `native-select.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `radio-group.tsx`, `resizable.tsx`, `select.tsx`, `sheet.tsx`, `sidebar.tsx`, `sonner.tsx`, `spinner.tsx`.

**Interfaces:**
- Consumes: `Icon` de `@/components/ui/icon` (Tarefa 4), tabela de mapeamento acima.

**Algoritmo (aplicar em cada um dos 25 arquivos):**
1. Trocar o import de `lucide-react` por `import { Icon } from "@/components/ui/icon"` (posicionar no bloco de imports internos `@/...`, mantendo a ordem alfabética já usada no arquivo).
2. Para cada uso JSX `<XxxIcon .../>`, trocar por `<Icon name="material_symbol_name" .../>` usando a tabela de mapeamento.
3. Se a `className` tinha uma classe `size-N` (ou `h-N w-N` simétrico), remover essa classe do `className` e adicionar `size={N * 0.25}` como prop, usando a tabela de conversão. As demais classes (cor, `animate-spin`, `shrink-0`, `transition-*`, `fill-current`/`fill-*` — ver caso especial abaixo) continuam em `className`.
4. Se não havia classe de tamanho, não adicionar `size`.
5. Depois de migrar o arquivo, rodar `npx tsc --noEmit` — qualquer nome de ícone inválido aparece como erro nesse arquivo.

**Casos especiais neste diretório:**

**a) Indicador de seleção sólido (`dropdown-menu.tsx:138`, `context-menu.tsx:179`, `menubar.tsx:156`, `radio-group.tsx:39`)** — hoje usam `<CircleIcon className="size-2 fill-current" />` (ou `fill-primary`). O lucide `CircleIcon` é um círculo SEM preenchimento por padrão (`fill: none`); a classe `fill-current`/`fill-primary` é o que o torna um ponto sólido. No Material Symbols, "sólido" é o eixo `FILL` (não uma classe de cor de preenchimento), então a tradução correta é:

```tsx
// Antes (dropdown-menu.tsx / context-menu.tsx / menubar.tsx):
<CircleIcon className="size-2 fill-current" />
// Depois:
<Icon name="circle" size={0.5} fill />

// Antes (radio-group.tsx):
<CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
// Depois:
<Icon name="circle" size={0.5} fill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
```

Note que `fill-primary` (cor do preenchimento SVG) virou `text-primary` (cor de texto) — o `<text>` do `<Icon>` usa `fill="currentColor"`, então quem controla a cor é `color` (via classe `text-*`), não `fill-*`. `fill-current` sozinho (sem trocar a cor) simplesmente some, porque `currentColor` já é o default.

**b) `calendar.tsx` — slot `Chevron` do react-day-picker recebe um prop `size` (em px) que colide com o `size` do `<Icon>` (em rem)**

```tsx
// Antes:
Chevron: ({ className, orientation, ...props }) => {
  if (orientation === "left") {
    return <ChevronLeftIcon className={cn("size-4", className)} {...props} />
  }
  if (orientation === "right") {
    return <ChevronRightIcon className={cn("size-4", className)} {...props} />
  }
  return <ChevronDownIcon className={cn("size-4", className)} {...props} />
},
// Depois — NÃO espalhar {...props} no <Icon> (ele carrega um `size` em px
// do react-day-picker, que colidiria com o `size` em rem do Icon):
Chevron: ({ className, orientation }) => {
  if (orientation === "left") {
    return <Icon name="chevron_left" size={1} className={className} />
  }
  if (orientation === "right") {
    return <Icon name="chevron_right" size={1} className={className} />
  }
  return <Icon name="keyboard_arrow_down" size={1} className={className} />
},
```

**c) `breadcrumb.tsx` — só tem `ChevronRight` e `MoreHorizontal` (uso normal, sem `SlashIcon` — esse fica nos arquivos de `examples/`, ver Tarefa 6).**

**Exemplo completo trabalhado — `src/components/ui/checkbox.tsx` (o mais simples do lote, pra servir de referência de formato):**

```tsx
// Antes:
import { CheckIcon } from "lucide-react"
// ...
<CheckboxPrimitive.Indicator className="...">
  <CheckIcon className="size-3.5" />
</CheckboxPrimitive.Indicator>

// Depois:
import { Icon } from "@/components/ui/icon"
// ...
<CheckboxPrimitive.Indicator className="...">
  <Icon name="check" size={0.875} />
</CheckboxPrimitive.Indicator>
```

- [ ] **Step 1:** Migrar os 25 arquivos seguindo o algoritmo e os 2 casos especiais acima.
- [ ] **Step 2:** `npx tsc --noEmit` — corrigir qualquer nome de ícone rejeitado (consultar fonts.google.com/icons).
- [ ] **Step 3:** `npm run dev`, navegar por `/estilo`, `/components/*` (Storybook via `npm run storybook` também serve, já que 6 destes arquivos são `.stories.tsx`) e confirmar visualmente em pelo menos 2 dos 5 presets que os ícones aparecem (não em branco/tofu) e no tamanho certo.
- [ ] **Step 4: Commit**

```bash
git add src/components/ui/*.tsx
git commit -m "Migra componentes-base (src/components/ui) de lucide-react para Icon/Material Symbols"
```

---

### Task 6: Migrar `src/components/examples/` (70 arquivos)

**Files (70):** todos os arquivos listados por `grep -rl "lucide-react" src/components/examples` (ver lista completa — `alert-demo.tsx`, `alert-destructive.tsx`, `attachment-demo.tsx`, `badge-demo.tsx`, `breadcrumb-dropdown.tsx`, `breadcrumb-separator.tsx`, `button-demo.tsx`, `button-group-demo.tsx`, `button-group-dropdown.tsx`, `button-group-input.tsx`, `button-group-input-group.tsx`, `button-group-nested.tsx`, `button-group-orientation.tsx`, `button-group-popover.tsx`, `button-group-select.tsx`, `button-group-size.tsx`, `button-icon.tsx`, `button-rounded.tsx`, `button-size.tsx`, `collapsible-demo.tsx`, `combobox-demo.tsx`, `combobox-dropdown-menu.tsx`, `command-demo.tsx`, `command-dialog.tsx`, `date-picker-demo.tsx`, `date-picker-with-presets.tsx`, `date-picker-with-range.tsx`, `drawer-demo.tsx`, `dropdown-menu-dialog.tsx`, `empty-avatar-group.tsx`, `empty-background.tsx`, `empty-demo.tsx`, `empty-input-group.tsx`, `form-rhf-array.tsx`, `form-rhf-password.tsx`, `hover-card-demo.tsx`, `input-group-button-group.tsx`, `input-group-demo.tsx`, `input-group-dropdown.tsx`, `input-group-icon.tsx`, `input-group-label.tsx`, `input-group-spinner.tsx`, `input-group-tooltip.tsx`, `item-avatar.tsx`, `item-demo.tsx`, `item-dropdown.tsx`, `item-group.tsx`, `item-icon.tsx`, `item-link.tsx`, `item-size.tsx`, `kbd-input-group.tsx`, `marker-demo.tsx`, `navigation-menu-demo.tsx`, `sidebar-demo.tsx`, `spinner-custom.tsx`, `spinner-input-group.tsx`, `tabs-demo.tsx`, `toggle-demo.tsx`, `toggle-disabled.tsx`, `toggle-group-demo.tsx`, `toggle-group-disabled.tsx`, `toggle-group-lg.tsx`, `toggle-group-outline.tsx`, `toggle-group-single.tsx`, `toggle-group-sm.tsx`, `toggle-group-spacing.tsx`, `toggle-lg.tsx`, `toggle-outline.tsx`, `toggle-sm.tsx`, `toggle-with-text.tsx`).

**Interfaces:** mesmas da Tarefa 5 (consome `Icon` + tabela de mapeamento).

**Algoritmo:** idêntico ao da Tarefa 5, Steps 1–4 (nenhum arquivo deste diretório tem o caso especial do `calendar.tsx` ou do indicador de seleção — são todos usos diretos `<XxxIcon />` em JSX, a maioria com 1-3 ícones por arquivo).

**Caso especial neste diretório — `breadcrumb-separator.tsx` e `breadcrumb-dropdown.tsx` usam `<SlashIcon />` como separador customizado.** Material Symbols não tem um glifo de barra. Como o `<li>` do `BreadcrumbSeparator` (em `ui/breadcrumb.tsx`) já aplica `role="presentation" aria-hidden="true"`, a solução mais simples e correta é trocar o ícone por um caractere literal:

```tsx
// Antes:
<BreadcrumbSeparator>
  <SlashIcon />
</BreadcrumbSeparator>
// Depois:
<BreadcrumbSeparator>
  <span className="text-sm">/</span>
</BreadcrumbSeparator>
```

Aplicar essa troca nas 2 ocorrências de `breadcrumb-separator.tsx` e nas 2 de `breadcrumb-dropdown.tsx` (4 ocorrências no total), e remover `SlashIcon` do import (junto com `ChevronDownIcon` → `Icon name="keyboard_arrow_down"` no `breadcrumb-dropdown.tsx`, que também usa esse ícone normalmente).

**Sub-lotes sugeridos para revisão (mesma tarefa, 3 subagentes/commits se preferir dividir):**
- Lote A — família `button*`/`toggle*` (27 arquivos: todos os `button-*.tsx` e `toggle*.tsx`).
- Lote B — família `item*`/`input-group*`/`command*`/`combobox*`/`date-picker*` (26 arquivos).
- Lote C — resto (17 arquivos: `alert-*`, `attachment-demo`, `badge-demo`, `breadcrumb-*`, `collapsible-demo`, `drawer-demo`, `dropdown-menu-dialog`, `empty-*`, `form-rhf-*`, `hover-card-demo`, `marker-demo`, `navigation-menu-demo`, `sidebar-demo`, `tabs-demo`).

- [ ] **Step 1:** Migrar os 70 arquivos (em 1 ou 3 sub-lotes) seguindo o algoritmo + o caso especial do Slash.
- [ ] **Step 2:** `npx tsc --noEmit` sem erros.
- [ ] **Step 3:** `npm run storybook`, navegar pelas stories que usam esses `examples/*` (a maioria dos `.stories.tsx` da Tarefa 5 renderiza um `*-demo.tsx` como story `Examples`) e confirmar visualmente.
- [ ] **Step 4: Commit** (1 commit se migrado de uma vez, ou 1 por sub-lote)

```bash
git add src/components/examples/*.tsx
git commit -m "Migra src/components/examples de lucide-react para Icon/Material Symbols"
```

---

### Task 7: Migrar `src/components/patterns/` (9 arquivos)

**Files (9):** `crud.tsx`, `delete-flow.tsx`, `empty-state.tsx`, `error-state.tsx`, `filter-panel.tsx`, `filters.tsx`, `search-experience.tsx`, `success-feedback.tsx`, `upload.tsx`.

**Interfaces:** mesmas da Tarefa 5.

**Algoritmo:** idêntico ao da Tarefa 5 para 8 dos 9 arquivos (uso direto em JSX).

**Caso especial — `filter-panel.tsx` guarda ícone como VALOR, não como JSX direto.** Hoje:

```tsx
import { BarChart3Icon, CalendarIcon, CheckIcon, ClipboardIcon, ShieldIcon, UserIcon, XIcon, type LucideIcon } from "lucide-react"
// ...
const CAMPO_ICONE: Record<string, LucideIcon> = {
  produto: BarChart3Icon,
  corretora: ShieldIcon,
  segurado: UserIcon,
  status: ClipboardIcon,
  periodo: CalendarIcon,
}
// ...
interface ChipAtivo {
  id: string
  campo: string
  icon: LucideIcon
  label: string
  onRemove: () => void
}
// ...
<chip.icon aria-hidden="true" />
```

Depois (o dicionário passa a guardar STRINGS do Material Symbol, não componentes; `ChipAtivo.icon` vira `string`; a renderização passa a ser `<Icon name={chip.icon} />`):

```tsx
import { CheckIcon, XIcon } from "lucide-react" // CheckIcon/XIcon continuam de uso direto em outro ponto do arquivo — se não houver mais nenhum uso direto de ícone lucide no arquivo além do CAMPO_ICONE, remova a linha de import inteira
import type { MaterialSymbol } from "material-symbols"
import { Icon } from "@/components/ui/icon"
// ...
const CAMPO_ICONE: Record<string, MaterialSymbol> = {
  produto: "bar_chart",
  corretora: "shield",
  segurado: "person",
  status: "assignment",
  periodo: "calendar_today",
}
// ...
interface ChipAtivo {
  id: string
  campo: string
  icon: MaterialSymbol
  label: string
  onRemove: () => void
}
// ...
<Icon name={chip.icon} aria-hidden="true" />
```

(Confira o restante do arquivo: `CheckIcon` e `XIcon` também aparecem em outros pontos de `filter-panel.tsx` fora do `CAMPO_ICONE` — esses seguem o algoritmo padrão da Tarefa 5, viram `<Icon name="check" />` / `<Icon name="close" />` normalmente.)

- [ ] **Step 1:** Migrar os 8 arquivos "normais" seguindo o algoritmo da Tarefa 5.
- [ ] **Step 2:** Migrar `filter-panel.tsx` seguindo o caso especial acima.
- [ ] **Step 3:** `npx tsc --noEmit` sem erros (o `Record<string, MaterialSymbol>` vai pegar qualquer string errada na tabela também).
- [ ] **Step 4:** `npm run dev`, abrir a tela/pattern que usa `FilterPanelPattern` e confirmar visualmente que os chips de filtro mostram o ícone certo.
- [ ] **Step 5: Commit**

```bash
git add src/components/patterns/*.tsx
git commit -m "Migra src/components/patterns de lucide-react para Icon/Material Symbols"
```

---

### Task 8: Migrar `src/components/sidebar-07/` (5 arquivos)

**Files (5):** `app-sidebar.tsx`, `nav-components.tsx`, `nav-patterns.tsx`, `nav-templates.tsx`, `nav-user.tsx`.

**Interfaces:** mesmas da Tarefa 5.

**Algoritmo:** idêntico ao da Tarefa 5 para `app-sidebar.tsx`, `nav-patterns.tsx`, `nav-templates.tsx`, `nav-user.tsx` (uso direto em JSX).

**Caso especial — `nav-components.tsx` tem o mesmo padrão "ícone como valor" do `filter-panel.tsx` (Tarefa 7), aplicado a categorias do atomic design:**

```tsx
// Antes:
import { AtomIcon, ChevronDownIcon, CombineIcon, NetworkIcon, PuzzleIcon, type LucideIcon } from "lucide-react"
// ...
const categoryIcons: Record<NavCategory, LucideIcon> = {
  atom: AtomIcon,
  molecule: CombineIcon,
  organism: NetworkIcon,
  other: PuzzleIcon,
}
// ...
const CategoryIcon = categoryIcons[category]
// ...
<CategoryIcon className="size-4 shrink-0 max-md:size-3.5" />

// Depois:
import type { MaterialSymbol } from "material-symbols"
import { Icon } from "@/components/ui/icon"
// (ChevronDownIcon continua sendo usado direto em outro ponto do arquivo — migrar normalmente pra <Icon name="keyboard_arrow_down" />)
// ...
const categoryIcons: Record<NavCategory, MaterialSymbol> = {
  atom: "orbit",
  molecule: "call_merge",
  organism: "hub",
  other: "extension",
}
// ...
const categoryIconName = categoryIcons[category]
// ...
<Icon name={categoryIconName} size={1} className="shrink-0 max-md:size-3.5" />
```

Note que o `max-md:size-3.5` (breakpoint responsivo, tamanho MENOR em telas pequenas) **não tem equivalente direto via prop `size`** — o prop `size` do `<Icon>` é um valor fixo em rem, não pode variar por breakpoint via classe Tailwind. Mantenha `max-md:size-3.5` como classe (ela sobrescreve o `width`/`height` do `style` inline? **Não** — `style` inline sempre vence sobre classe, então `max-md:size-3.5` como classe NÃO vai funcionar aqui. Solução: usar `size={1}` (o valor "cheio", 4=1rem) só como fallback SEM prop, deixando o dimensionamento 100% por classe Tailwind neste caso específico (o padrão responsivo é mais importante que o cálculo automático de `opticalSize`):

```tsx
<Icon name={categoryIconName} className="size-4 shrink-0 max-md:size-3.5" />
```

Isso funciona porque, sem `size` prop, o `<Icon>` não aplica `style` inline nenhum — o dimensionamento fica 100% a cargo das classes Tailwind normais (`size-4`, `max-md:size-3.5`), exatamente como funcionava com o SVG do lucide. Aplicar esse mesmo ajuste (omitir `size`, manter `size-4 ... max-md:size-3.5` em `className`) em **todo lugar que usar `max-md:size-*`** — isso também aparece em `nav-patterns.tsx` e `nav-templates.tsx` (ver grep: `size-4 shrink-0 max-md:size-3.5` e `size-4 transition-transform duration-200 max-md:size-3.5`).

- [ ] **Step 1:** Migrar `app-sidebar.tsx` e `nav-user.tsx` seguindo o algoritmo da Tarefa 5.
- [ ] **Step 2:** Migrar `nav-patterns.tsx` e `nav-templates.tsx` seguindo o algoritmo da Tarefa 5, aplicando a regra de "omitir `size` prop e manter classes Tailwind responsivas" para todo `max-md:size-*`.
- [ ] **Step 3:** Migrar `nav-components.tsx` seguindo o caso especial acima.
- [ ] **Step 4:** `npx tsc --noEmit` sem erros.
- [ ] **Step 5:** `npm run dev`, abrir a sidebar principal do app, redimensionar a janela abaixo do breakpoint `md` e confirmar que os ícones da nav encolhem (max-md:size-3.5 ainda funcionando).
- [ ] **Step 6: Commit**

```bash
git add src/components/sidebar-07/*.tsx
git commit -m "Migra src/components/sidebar-07 de lucide-react para Icon/Material Symbols"
```

---

### Task 9: Migrar `src/app/templates/` + páginas soltas (13 arquivos)

**Files (13):** `src/app/templates/apolices-ativas/page.tsx`, `src/app/templates/dashboard-financeiro/page.tsx`, `src/app/templates/login-erro-validacao/page.tsx`, `src/app/templates/login-simples/page.tsx`, `src/app/templates/novo-sinistro/page.tsx`, `src/app/templates/onboarding/page.tsx`, `src/app/templates/recuperacao-senha/page.tsx`, `src/app/templates/selecao-perfil-corretora/page.tsx`, `src/app/page.tsx`, `src/app/teste-padrao/page.tsx`, `src/components/app-shell.tsx`, `src/components/doc/generic-playground.tsx`, `src/components/style-switcher.tsx` (8 templates + 5 arquivos soltos, confirmado por execução direta do grep abaixo — se o código mudou desde o planejamento, rode o grep de novo antes de começar).

**Interfaces:** mesmas da Tarefa 5.

**Algoritmo:** idêntico ao da Tarefa 5 (todos os usos são JSX direto, nenhum "ícone como valor" neste lote).

**Atenção especial:**
- `dashboard-financeiro/page.tsx` é o arquivo com mais ícones do lote (16 nomes) — inclui `size-16` (`text-muted-foreground size-16` num ícone grande de estado vazio) → vira `size={4}`.
- `style-switcher.tsx` usa `PuzzleIcon` (`size-4`) — vira `<Icon name="extension" size={1} />`, e também `Check`/`CheckIcon` → `<Icon name="check" />` (conferir qual variante o arquivo importa).

- [ ] **Step 1:** Rodar `grep -rl "lucide-react" --include="*.tsx" --include="*.ts" src/app/templates src/app/page.tsx src/app/teste-padrao/page.tsx src/components/app-shell.tsx src/components/doc/generic-playground.tsx src/components/style-switcher.tsx` e confirmar a lista de arquivos contra a acima.
- [ ] **Step 2:** Migrar os arquivos seguindo o algoritmo da Tarefa 5.
- [ ] **Step 3:** `npx tsc --noEmit` sem erros.
- [ ] **Step 4:** `npm run dev`, navegar por cada uma das 8 telas em `/templates/*` e pela home (`/`) em pelo menos 2 presets diferentes, confirmar visualmente.
- [ ] **Step 5: Commit**

```bash
git add src/app/templates src/app/page.tsx src/app/teste-padrao/page.tsx src/components/app-shell.tsx src/components/doc/generic-playground.tsx src/components/style-switcher.tsx
git commit -m "Migra templates e páginas soltas de lucide-react para Icon/Material Symbols"
```

---

### Task 10: Migrar `src/lib/*-docs.ts` (2 arquivos)

**Files (2):** `src/lib/component-docs.ts`, `src/lib/pattern-docs.ts`.

**Interfaces:** mesmas da Tarefa 5.

**Nota:** estes arquivos são `.ts` (não `.tsx`) mas contêm JSX inline em template de exemplos de código/preview (confirme a extensão real do arquivo antes de editar — se o JSX estiver dentro de string/template literal de "código de exemplo exibido na doc" em vez de JSX real, a troca é textual dentro da string, não uma troca de import real; abra o arquivo primeiro e confirme qual dos dois casos é, antes de aplicar o algoritmo).

- [ ] **Step 1:** Abrir os 2 arquivos e confirmar se os usos de ícone são JSX real (import + `<XxxIcon />`) ou texto de exemplo dentro de string.
- [ ] **Step 2:** Migrar seguindo o algoritmo da Tarefa 5 (se JSX real) ou substituição textual equivalente dentro das strings de exemplo (se for código-exemplo-como-string).
- [ ] **Step 3:** `npx tsc --noEmit` sem erros.
- [ ] **Step 4:** `npm run dev`, abrir as páginas de documentação de componentes/patterns que consomem `component-docs.ts`/`pattern-docs.ts` e confirmar visualmente.
- [ ] **Step 5: Commit**

```bash
git add src/lib/component-docs.ts src/lib/pattern-docs.ts
git commit -m "Migra src/lib/*-docs.ts de lucide-react para Icon/Material Symbols"
```

---

### Task 11: Seção "Ícones" na página `/estilo`

**Files:**
- Modify: `src/app/estilo/page.tsx`

**Interfaces:**
- Consumes: `Icon` de `@/components/ui/icon`.

Este é o critério de aceite visual da spec ("Os 5 presets renderizam ícones... visíveis na página /estilo"). Hoje essa página não tem nenhuma seção de ícones.

- [ ] **Step 1:** Adicionar o import e uma nova seção, logo após o `<Card>` de "Sidebar" (linha ~219 do arquivo atual):

```tsx
import type { MaterialSymbol } from "material-symbols"
import { Icon } from "@/components/ui/icon"

const iconSampler: { name: MaterialSymbol; label: string }[] = [
  { name: "home", label: "home" },
  { name: "search", label: "search" },
  { name: "favorite", label: "favorite" },
  { name: "settings", label: "settings" },
  { name: "delete", label: "delete" },
]
```

```tsx
<Card>
  <CardHeader>
    <CardTitle>Ícones</CardTitle>
    <CardDescription>
      Material Symbols — variante e eixos (fill/weight/grade/optical size)
      do estilo ativo, via --icon-* em globals.css.
    </CardDescription>
  </CardHeader>
  <CardContent className="grid grid-cols-3 gap-4 sm:grid-cols-5">
    {iconSampler.map((i) => (
      <div key={i.name} className="flex flex-col items-center gap-1.5 rounded-lg border p-4">
        <Icon name={i.name} size={1.5} />
        <p className="text-muted-foreground font-mono text-xs">{i.label}</p>
      </div>
    ))}
  </CardContent>
</Card>
```

- [ ] **Step 2:** `npx tsc --noEmit` sem erros.
- [ ] **Step 3:** `npm run dev`, abrir `/estilo`, trocar entre os 5 presets no seletor da sidebar, confirmar visualmente que os 5 ícones da nova seção mudam de variante (rounded/sharp), peso e preenchimento a cada troca.
- [ ] **Step 4: Commit**

```bash
git add src/app/estilo/page.tsx
git commit -m "Adiciona secao de icones na pagina /estilo para validar os 5 presets"
```

---

### Task 12: Remover `lucide-react` e verificação final

**Files:**
- Modify: `package.json`

**Interfaces:** nenhuma (tarefa de limpeza/verificação).

- [ ] **Step 1: Confirmar que não sobrou nenhum import**

```bash
grep -rl "lucide-react" --include="*.tsx" --include="*.ts" src
```

Esperado: nenhuma saída (comando sem resultado). Se aparecer algum arquivo, ele ficou de fora de uma tarefa anterior — migre antes de continuar.

- [ ] **Step 2: Remover a dependência**

```bash
npm uninstall lucide-react
```

- [ ] **Step 3: Build completo**

```bash
npm run build
```

Esperado: build passa sem erros (nem de tipo, nem de módulo faltando).

- [ ] **Step 4: Rodar o teste de lógica pura de novo (regressão)**

```bash
npx vitest run src/lib/icon-optical-size.test.ts
```

- [ ] **Step 5: Verificação visual final**

```bash
npm run dev
```

Navegar por `/estilo` (5 presets), pelo menos 3 templates em `/templates/*`, e a home — nenhum ícone quebrado/tofu/ausente.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "Remove lucide-react apos conclusao da migracao para Material Symbols"
```

---

## Critério de aceite final (da spec, conferido)

- [ ] Os 5 presets renderizam ícones com a variante (rounded/sharp) e eixos corretos, visíveis em `/estilo` (Tarefa 11) e nas telas existentes.
- [ ] Nenhum dos 20 componentes-base do shadcn foi editado nos seletores `[&_svg]` (só troca de import/uso de ícone).
- [ ] `npm run build` passa sem erros de fonte/tipo.
- [ ] `lucide-react` removido do `package.json` sem import órfão restante (Tarefa 12, Step 1).
