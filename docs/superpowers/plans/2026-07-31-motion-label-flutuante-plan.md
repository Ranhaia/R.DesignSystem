# Motion design: label flutuante — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar uma fundação de tokens de motion em `globals.css` e o padrão de label flutuante (prop `label` + `animatedLabel`) em `Input`, `Textarea`, `SelectTrigger` e `NativeSelect`, sem quebrar nenhum uso existente desses quatro componentes.

**Architecture:** Cada componente ganha duas props novas (`label`, `animatedLabel`) e passa a renderizar `Label` (de `label.tsx`) internamente quando `label` está presente — três branches de retorno por componente: sem label (idêntico a hoje), label fixa (fluxo normal), label animada (wrapper `relative` + `Label` `absolute` com `transition-[top,left,transform,color]` disparada por `group-has-[...]`/`group-focus-within`/`group-data-[...]`, conforme o mecanismo de gatilho de cada elemento). Só os tokens de duração em `globals.css` são compartilhados entre os quatro — cada arquivo de componente duplica sua própria estrutura de wrapper, por decisão já registrada na spec (filosofia shadcn/ui: cada arquivo se basta sozinho).

**Tech Stack:** Next.js 16 + React 19 + Tailwind v4 (CSS `@theme inline`, `:has()`, `group-*`) + Radix UI (`select.tsx`) + Storybook 10. Motion 100% CSS — nenhuma lib nova.

**Spec de origem:** `docs/superpowers/specs/2026-07-31-motion-label-flutuante-design.md` (status: aprovado).

## Global Constraints

- Motion 100% CSS via `transition`/`transform` do Tailwind + tokens novos — sem Framer Motion ou qualquer lib de animação nova.
- `prefers-reduced-motion: reduce` tratado uma única vez na fundação (`globals.css`), nunca componente a componente.
- `field.tsx` não é tocado nesta entrega.
- Fora de escopo: `Combobox`, `InputGroup`, ou qualquer campo não listado (`Input`, `Textarea`, `SelectTrigger`, `NativeSelect`).
- `label` ausente → componente renderiza exatamente como hoje (mesmo JSX, sem wrapper) — compatibilidade total com todo uso existente.
- `animatedLabel` só tem efeito quando `label` está presente; sozinho (sem `label`) não faz nada.
- Nunca cor fixa fora de token semântico (regra geral do projeto, `plans/current/loop-80-20-templates.md`).
- Nenhum hook ou componente compartilhado novo entre os quatro arquivos — só os tokens de `globals.css` são reaproveitados.

## Mapa de arquivos

| Arquivo | Ação |
|---|---|
| `src/app/globals.css` | Modificar — 3 tokens de duração + bridge `@theme inline` + bloco `prefers-reduced-motion` |
| `docs/active/decisoes/excecao-atoms-label-embutida.md` | Criar — ADR da exceção arquitetural |
| `src/components/ui/input.tsx` | Modificar — props `label`/`animatedLabel` |
| `src/components/ui/textarea.tsx` | Modificar — props `label`/`animatedLabel` |
| `src/components/ui/select.tsx` | Modificar — `SelectTrigger` ganha props `label`/`animatedLabel` |
| `src/components/ui/native-select.tsx` | Modificar — `"use client"` + estado local + props `label`/`animatedLabel` |
| `src/components/examples/input-fixed-label.tsx`, `input-floating-label.tsx` | Criar |
| `src/components/examples/textarea-fixed-label.tsx`, `textarea-floating-label.tsx` | Criar |
| `src/components/examples/select-fixed-label.tsx`, `select-floating-label.tsx` | Criar |
| `src/components/examples/native-select-fixed-label.tsx`, `native-select-floating-label.tsx` | Criar |
| `src/lib/examples-mapping.ts` | Modificar — 4 arrays (`input`, `textarea`, `select`, `native-select`) |
| `src/components/examples/registry.tsx` | Modificar — 8 novas entradas `dynamic(...)` |
| `src/components/ui/input.stories.tsx`, `textarea.stories.tsx`, `select.stories.tsx`, `native-select.stories.tsx` | Modificar — 2 stories novas cada |
| `src/lib/component-docs.ts` | Modificar — 2 props novas em cada uma das 4 entradas (`input`, `textarea`, `select`, `"native-select"`) |

---

### Task 1: Fundação de tokens de motion em `globals.css`

**Files:**
- Modify: `src/app/globals.css:19-59` (bridge `@theme inline`), `src/app/globals.css:191-192` (`:root`), `src/app/globals.css:956` (fim do arquivo)

**Interfaces:**
- Produces: classes utilitárias Tailwind `duration-motion-fast` (150ms), `duration-motion-base` (200ms), `duration-motion-slow` (350ms) — consumidas pelas Tasks 3-6.

- [ ] **Step 1: Adicionar a ponte no bloco `@theme inline`**

Em `src/app/globals.css`, localizar o bloco que termina em (linhas 51-59):

```css
  --font-sans: var(--font-sans);
  --font-heading: var(--font-heading);
  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --color-background: var(--background);
```

Substituir por (insere 4 linhas novas entre `--shadow-xl` e `--color-background`):

```css
  --font-sans: var(--font-sans);
  --font-heading: var(--font-heading);
  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);

  /* Fundação de motion — ver docs/superpowers/specs/2026-07-31-motion-label-flutuante-design.md.
     Mesma mecânica de --radius-sm acima: ponte de :root pra utilitário
     Tailwind (duration-motion-fast/base/slow). */
  --duration-motion-fast: var(--motion-duration-fast);
  --duration-motion-base: var(--motion-duration-base);
  --duration-motion-slow: var(--motion-duration-slow);
  --color-background: var(--background);
```

- [ ] **Step 2: Adicionar os valores base em `:root`**

Localizar (linha 191-192):

```css
:root {
  --radius: 0.625rem;
```

Substituir por:

```css
:root {
  --radius: 0.625rem;
  --motion-duration-fast: 150ms;
  --motion-duration-base: 200ms;
  --motion-duration-slow: 350ms;
```

- [ ] **Step 3: Adicionar o reset global de `prefers-reduced-motion`**

No fim de `src/app/globals.css` (depois do último `}` do bloco `.dark[data-style="midnight"]`, linha 956), adicionar:

```css

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Verificar**

Rodar:
```bash
grep -n "duration-motion-fast" src/app/globals.css
grep -n "prefers-reduced-motion: reduce" src/app/globals.css
```
Esperado: 2 ocorrências de `duration-motion-fast` (bridge + `:root`) e 1 de `prefers-reduced-motion: reduce`.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: adicionar fundacao de tokens de motion (duration + reduced-motion)"
```

---

### Task 2: Registrar a exceção arquitetural (ADR)

**Files:**
- Create: `docs/active/decisoes/excecao-atoms-label-embutida.md`

**Interfaces:**
- Nenhuma — documentação pura, não bloqueia nem é bloqueada pelas outras tasks.

- [ ] **Step 1: Criar o arquivo de decisão**

Criar `docs/active/decisoes/excecao-atoms-label-embutida.md` com o conteúdo:

```markdown
# Exceção arquitetural: Input/SelectTrigger/NativeSelect deixam de ser Atoms "burros"

Data: 2026-07-31
Status: aprovada (Rafael, via spec de motion design)

## Contexto

Convenção estabelecida em `plans/current/loop-80-20-templates.md` (Fase 0):
`input`, `select`, `native-select` são **Atoms**; `label` é **Atom**
separado; `field` é a **Molecule** que os compõe. Um Atom não deveria
conhecer outro Atom.

## Decisão

Com a entrega de motion design (label flutuante, ver
`docs/superpowers/specs/2026-07-31-motion-label-flutuante-design.md`),
`Input`, `SelectTrigger` e `NativeSelect` passam a **importar e renderizar
`Label` internamente** quando a prop `label` é usada — API de conveniência
(`<Input label="Nome" />`) em vez de composição (`<Field><FieldLabel/><Input/></Field>`).

Isso foi decidido conscientemente pela ergonomia de API: o pedido de
origem era "o Input resolver isso sozinho", não uma composição de dois
componentes.

## Consequências

- `input.tsx`, `select.tsx` (`SelectTrigger`) e `native-select.tsx` agora
  importam `@/components/ui/label` — quebra pontual da separação
  atom/molecule, só para esses três arquivos.
- `field.tsx`/`FieldLabel` não foram alterados e continuam sendo a forma
  recomendada de composição explícita quando não se quer a label
  embutida.
- Quando `label` está ausente, os três componentes continuam idênticos ao
  comportamento anterior — a exceção só se ativa sob uso explícito da
  prop nova.
- `Textarea` também ganhou as props `label`/`animatedLabel` pela mesma
  razão, mas `textarea` já não tinha nenhuma restrição de "Atom burro"
  documentada além da genérica — citado aqui por completude.
```

- [ ] **Step 2: Commit**

```bash
git add docs/active/decisoes/excecao-atoms-label-embutida.md
git commit -m "docs: registrar excecao arquitetural de Atoms com label embutida"
```

---

### Task 3: `Input` — props `label`/`animatedLabel`

**Files:**
- Modify: `src/components/ui/input.tsx`
- Create: `src/components/examples/input-fixed-label.tsx`, `src/components/examples/input-floating-label.tsx`
- Modify: `src/lib/examples-mapping.ts:34`, `src/components/examples/registry.tsx:120-121`, `src/components/ui/input.stories.tsx`, `src/lib/component-docs.ts:511-514`

**Interfaces:**
- Consumes: `duration-motion-fast` (Task 1).
- Produces: `Input` aceita `label?: React.ReactNode` e `animatedLabel?: boolean` (default `false`) — mesmo padrão de API replicado nas Tasks 4-6.

- [ ] **Step 1: Reescrever `src/components/ui/input.tsx`**

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function Input({
  className,
  type,
  id,
  label,
  animatedLabel = false,
  placeholder,
  ...props
}: React.ComponentProps<"input"> & {
  label?: React.ReactNode
  animatedLabel?: boolean
}) {
  const generatedId = React.useId()
  const inputId = label ? (id ?? generatedId) : id

  const inputEl = (
    <input
      type={type}
      id={inputId}
      data-slot="input"
      placeholder={label && animatedLabel ? (placeholder ?? " ") : placeholder}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )

  if (!label) {
    return inputEl
  }

  if (!animatedLabel) {
    return (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={inputId}>{label}</Label>
        {inputEl}
      </div>
    )
  }

  return (
    <div className="group/floating-label relative" data-slot="input-label-wrapper">
      {inputEl}
      <Label
        htmlFor={inputId}
        // pointer-events-none: a label fica sobreposta ao texto do campo em
        // repouso, como um placeholder — sem isso, clicar nela não foca o
        // input por baixo.
        className={cn(
          "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-[top,left,transform,color] duration-motion-fast ease-out",
          "group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:top-0 group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:left-0 group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:-translate-y-full group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:text-foreground"
        )}
      >
        {label}
      </Label>
    </div>
  )
}

export { Input }
```

- [ ] **Step 2: Verificar tipos**

```bash
npx tsc --noEmit
```
Esperado: sem erros novos relacionados a `input.tsx`.

- [ ] **Step 3: Criar `src/components/examples/input-fixed-label.tsx`**

```tsx
import { Input } from "@/components/ui/input"

export default function InputFixedLabel() {
  return (
    <Input
      label="Nome completo"
      placeholder="Digite seu nome"
      className="max-w-sm"
    />
  )
}
```

- [ ] **Step 4: Criar `src/components/examples/input-floating-label.tsx`**

```tsx
import { Input } from "@/components/ui/input"

export default function InputFloatingLabel() {
  return <Input label="Nome completo" animatedLabel className="max-w-sm" />
}
```

- [ ] **Step 5: Registrar em `src/lib/examples-mapping.ts`**

Localizar (linha 34):
```ts
  "input": ["input-demo", "input-disabled", "input-file", "input-with-button", "input-with-label", "input-with-text"],
```
Substituir por:
```ts
  "input": ["input-demo", "input-disabled", "input-file", "input-fixed-label", "input-floating-label", "input-with-button", "input-with-label", "input-with-text"],
```

- [ ] **Step 6: Registrar em `src/components/examples/registry.tsx`**

Localizar (linhas 120-121):
```tsx
  "input-file": dynamic(() => import("@/components/examples/input-file")),
  "input-group-button": dynamic(() => import("@/components/examples/input-group-button")),
```
Substituir por:
```tsx
  "input-file": dynamic(() => import("@/components/examples/input-file")),
  "input-fixed-label": dynamic(() => import("@/components/examples/input-fixed-label")),
  "input-floating-label": dynamic(() => import("@/components/examples/input-floating-label")),
  "input-group-button": dynamic(() => import("@/components/examples/input-group-button")),
```

- [ ] **Step 7: Adicionar stories em `src/components/ui/input.stories.tsx`**

Adicionar aos imports (depois de `import InputFile from "@/components/examples/input-file"`):
```tsx
import InputFixedLabel from "@/components/examples/input-fixed-label"
import InputFloatingLabel from "@/components/examples/input-floating-label"
```

Adicionar ao fim do arquivo, depois de `export const WithText`:
```tsx

export const FixedLabel: Story = {
  render: () => <InputFixedLabel />,
}

export const FloatingLabel: Story = {
  render: () => <InputFloatingLabel />,
}
```

- [ ] **Step 8: Atualizar props em `src/lib/component-docs.ts`**

Localizar a entrada `input:` (linhas 511-514):
```ts
    props: [
      { name: "type", type: "string", default: '"text"', description: "Tipo nativo do input (email, password, number...)." },
      { name: "...props", type: 'React.ComponentProps<"input">', description: "Todos os atributos nativos de <input>." },
    ],
```
Substituir por:
```ts
    props: [
      { name: "type", type: "string", default: '"text"', description: "Tipo nativo do input (email, password, number...)." },
      { name: "label", type: "React.ReactNode", description: "Rótulo renderizado internamente via Label. Ausente = comportamento idêntico ao anterior, sem wrapper." },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Com label presente, ativa o padrão de label flutuante (motion) em vez da label fixa acima do campo." },
      { name: "...props", type: 'React.ComponentProps<"input">', description: "Todos os atributos nativos de <input>." },
    ],
```

- [ ] **Step 9: Verificar e commitar**

```bash
npx tsc --noEmit
git add src/components/ui/input.tsx src/components/examples/input-fixed-label.tsx src/components/examples/input-floating-label.tsx src/lib/examples-mapping.ts src/components/examples/registry.tsx src/components/ui/input.stories.tsx src/lib/component-docs.ts
git commit -m "feat: adicionar label flutuante ao Input"
```

---

### Task 4: `Textarea` — props `label`/`animatedLabel`

**Files:**
- Modify: `src/components/ui/textarea.tsx`
- Create: `src/components/examples/textarea-fixed-label.tsx`, `src/components/examples/textarea-floating-label.tsx`
- Modify: `src/lib/examples-mapping.ts:70`, `src/components/examples/registry.tsx:206-207`, `src/components/ui/textarea.stories.tsx`, `src/lib/component-docs.ts:1062-1064`

**Interfaces:**
- Consumes: `duration-motion-fast` (Task 1). Mesmo padrão de API da Task 3 (`label`/`animatedLabel`), aplicado de forma independente a este arquivo.

- [ ] **Step 1: Reescrever `src/components/ui/textarea.tsx`**

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function Textarea({
  className,
  id,
  label,
  animatedLabel = false,
  placeholder,
  ...props
}: React.ComponentProps<"textarea"> & {
  label?: React.ReactNode
  animatedLabel?: boolean
}) {
  const generatedId = React.useId()
  const textareaId = label ? (id ?? generatedId) : id

  const textareaEl = (
    <textarea
      id={textareaId}
      data-slot="textarea"
      placeholder={label && animatedLabel ? (placeholder ?? " ") : placeholder}
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )

  if (!label) {
    return textareaEl
  }

  if (!animatedLabel) {
    return (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={textareaId}>{label}</Label>
        {textareaEl}
      </div>
    )
  }

  return (
    <div className="group/floating-label relative" data-slot="textarea-label-wrapper">
      {textareaEl}
      <Label
        htmlFor={textareaId}
        // pointer-events-none: a label ocupa o canto do campo em repouso,
        // como um placeholder — sem isso, clicar nela não foca o textarea
        // por baixo.
        className={cn(
          "pointer-events-none absolute top-3 left-3 text-muted-foreground transition-[top,left,transform,color] duration-motion-fast ease-out",
          "group-has-[textarea:focus,textarea:not(:placeholder-shown)]/floating-label:top-0 group-has-[textarea:focus,textarea:not(:placeholder-shown)]/floating-label:left-0 group-has-[textarea:focus,textarea:not(:placeholder-shown)]/floating-label:-translate-y-full group-has-[textarea:focus,textarea:not(:placeholder-shown)]/floating-label:text-foreground"
        )}
      >
        {label}
      </Label>
    </div>
  )
}

export { Textarea }
```

- [ ] **Step 2: Verificar tipos**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Criar `src/components/examples/textarea-fixed-label.tsx`**

```tsx
import { Textarea } from "@/components/ui/textarea"

export default function TextareaFixedLabel() {
  return (
    <Textarea
      label="Mensagem"
      placeholder="Escreva sua mensagem"
      className="max-w-sm"
    />
  )
}
```

- [ ] **Step 4: Criar `src/components/examples/textarea-floating-label.tsx`**

```tsx
import { Textarea } from "@/components/ui/textarea"

export default function TextareaFloatingLabel() {
  return <Textarea label="Mensagem" animatedLabel className="max-w-sm" />
}
```

- [ ] **Step 5: Registrar em `src/lib/examples-mapping.ts`**

Localizar (linha 70):
```ts
  "textarea": ["textarea-demo", "textarea-disabled", "textarea-with-button", "textarea-with-label", "textarea-with-text"],
```
Substituir por:
```ts
  "textarea": ["textarea-demo", "textarea-disabled", "textarea-fixed-label", "textarea-floating-label", "textarea-with-button", "textarea-with-label", "textarea-with-text"],
```

- [ ] **Step 6: Registrar em `src/components/examples/registry.tsx`**

Localizar (linhas 206-207):
```tsx
  "textarea-disabled": dynamic(() => import("@/components/examples/textarea-disabled")),
  "textarea-with-button": dynamic(() => import("@/components/examples/textarea-with-button")),
```
Substituir por:
```tsx
  "textarea-disabled": dynamic(() => import("@/components/examples/textarea-disabled")),
  "textarea-fixed-label": dynamic(() => import("@/components/examples/textarea-fixed-label")),
  "textarea-floating-label": dynamic(() => import("@/components/examples/textarea-floating-label")),
  "textarea-with-button": dynamic(() => import("@/components/examples/textarea-with-button")),
```

- [ ] **Step 7: Adicionar stories em `src/components/ui/textarea.stories.tsx`**

Adicionar aos imports (depois de `import TextareaDisabled from "@/components/examples/textarea-disabled"`):
```tsx
import TextareaFixedLabel from "@/components/examples/textarea-fixed-label"
import TextareaFloatingLabel from "@/components/examples/textarea-floating-label"
```

Adicionar ao fim do arquivo, depois de `export const WithText`:
```tsx

export const FixedLabel: Story = {
  render: () => <TextareaFixedLabel />,
}

export const FloatingLabel: Story = {
  render: () => <TextareaFloatingLabel />,
}
```

- [ ] **Step 8: Atualizar props em `src/lib/component-docs.ts`**

Localizar a entrada `textarea:` (linhas 1062-1064):
```ts
    props: [
      { name: "...props", type: 'React.ComponentProps<"textarea">', description: "Todos os atributos nativos de <textarea>." },
    ],
```
Substituir por:
```ts
    props: [
      { name: "label", type: "React.ReactNode", description: "Rótulo renderizado internamente via Label. Ausente = comportamento idêntico ao anterior, sem wrapper." },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Com label presente, ativa o padrão de label flutuante (motion) em vez da label fixa acima do campo." },
      { name: "...props", type: 'React.ComponentProps<"textarea">', description: "Todos os atributos nativos de <textarea>." },
    ],
```

- [ ] **Step 9: Verificar e commitar**

```bash
npx tsc --noEmit
git add src/components/ui/textarea.tsx src/components/examples/textarea-fixed-label.tsx src/components/examples/textarea-floating-label.tsx src/lib/examples-mapping.ts src/components/examples/registry.tsx src/components/ui/textarea.stories.tsx src/lib/component-docs.ts
git commit -m "feat: adicionar label flutuante ao Textarea"
```

---

### Task 5: `SelectTrigger` — props `label`/`animatedLabel`

**Files:**
- Modify: `src/components/ui/select.tsx`
- Create: `src/components/examples/select-fixed-label.tsx`, `src/components/examples/select-floating-label.tsx`
- Modify: `src/lib/examples-mapping.ts:55`, `src/components/examples/registry.tsx:177-178`, `src/components/ui/select.stories.tsx`, `src/lib/component-docs.ts:1496-1501`

**Interfaces:**
- Consumes: `duration-motion-fast` (Task 1).
- Produces: `SelectTrigger` aceita `label?: React.ReactNode` e `animatedLabel?: boolean` — associação de acessibilidade via `aria-labelledby` + `htmlFor`/`id` (Radix `role="combobox"` não é elemento de formulário nativo).

- [ ] **Step 1: Editar `src/components/ui/select.tsx` — imports**

Localizar (linhas 1-7):
```tsx
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
```
Substituir por:
```tsx
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { Icon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
```

- [ ] **Step 2: Reescrever `SelectTrigger`**

Localizar a função `SelectTrigger` inteira (linhas 27-51):
```tsx
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon name="keyboard_arrow_down" size={1} className="opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
```
Substituir por:
```tsx
function SelectTrigger({
  className,
  size = "default",
  children,
  id,
  label,
  animatedLabel = false,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
  label?: React.ReactNode
  animatedLabel?: boolean
}) {
  const generatedId = React.useId()
  const triggerId = label ? (id ?? generatedId) : id
  const labelId = label ? `${generatedId}-label` : undefined

  const triggerEl = (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      id={triggerId}
      aria-labelledby={labelId}
      className={cn(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon name="keyboard_arrow_down" size={1} className="opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )

  if (!label) {
    return triggerEl
  }

  if (!animatedLabel) {
    return (
      <div className="flex flex-col gap-1.5">
        <Label id={labelId} htmlFor={triggerId}>
          {label}
        </Label>
        {triggerEl}
      </div>
    )
  }

  return (
    <div className="group/floating-label relative w-fit" data-slot="select-trigger-label-wrapper">
      {triggerEl}
      <Label
        id={labelId}
        htmlFor={triggerId}
        // pointer-events-none: a label fica sobreposta ao SelectValue em
        // repouso — sem isso, clicar nela não abre o menu por baixo.
        className={cn(
          "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-[top,left,transform,color] duration-motion-fast ease-out",
          "group-has-[[data-slot=select-trigger]:focus,[data-slot=select-trigger]:not([data-placeholder])]/floating-label:top-0 group-has-[[data-slot=select-trigger]:focus,[data-slot=select-trigger]:not([data-placeholder])]/floating-label:left-0 group-has-[[data-slot=select-trigger]:focus,[data-slot=select-trigger]:not([data-placeholder])]/floating-label:-translate-y-full group-has-[[data-slot=select-trigger]:focus,[data-slot=select-trigger]:not([data-placeholder])]/floating-label:text-foreground"
        )}
      >
        {label}
      </Label>
    </div>
  )
}
```

- [ ] **Step 3: Verificar tipos**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Criar `src/components/examples/select-fixed-label.tsx`**

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectFixedLabel() {
  return (
    <Select>
      <SelectTrigger label="Plano" className="w-56">
        <SelectValue placeholder="Selecione um plano" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="mensal">Mensal</SelectItem>
        <SelectItem value="anual">Anual</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

- [ ] **Step 5: Criar `src/components/examples/select-floating-label.tsx`**

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectFloatingLabel() {
  return (
    <Select>
      <SelectTrigger label="Plano" animatedLabel className="w-56">
        <SelectValue placeholder="Selecione um plano" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="mensal">Mensal</SelectItem>
        <SelectItem value="anual">Anual</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

- [ ] **Step 6: Registrar em `src/lib/examples-mapping.ts`**

Localizar (linha 55):
```ts
  "select": ["select-demo", "select-scrollable"],
```
Substituir por:
```ts
  "select": ["select-demo", "select-fixed-label", "select-floating-label", "select-scrollable"],
```

- [ ] **Step 7: Registrar em `src/components/examples/registry.tsx`**

Localizar (linhas 177-178):
```tsx
  "select-demo": dynamic(() => import("@/components/examples/select-demo")),
  "select-scrollable": dynamic(() => import("@/components/examples/select-scrollable")),
```
Substituir por:
```tsx
  "select-demo": dynamic(() => import("@/components/examples/select-demo")),
  "select-fixed-label": dynamic(() => import("@/components/examples/select-fixed-label")),
  "select-floating-label": dynamic(() => import("@/components/examples/select-floating-label")),
  "select-scrollable": dynamic(() => import("@/components/examples/select-scrollable")),
```

- [ ] **Step 8: Adicionar stories em `src/components/ui/select.stories.tsx`**

Adicionar aos imports (depois de `import SelectDemo from "@/components/examples/select-demo"`):
```tsx
import SelectFixedLabel from "@/components/examples/select-fixed-label"
import SelectFloatingLabel from "@/components/examples/select-floating-label"
```

Adicionar ao fim do arquivo, depois de `export const Scrollable`:
```tsx

export const FixedLabel: Story = {
  render: () => <SelectFixedLabel />,
}

export const FloatingLabel: Story = {
  render: () => <SelectFloatingLabel />,
}
```

- [ ] **Step 9: Atualizar props em `src/lib/component-docs.ts`**

Localizar a entrada `select:` (linhas 1496-1501):
```ts
    props: [
      { name: "value / defaultValue", type: "string", description: "(Select) valor selecionado." },
      { name: "onValueChange", type: "(value: string) => void", description: "(Select) callback de mudança." },
      { name: "size", type: '"sm" | "default"', default: '"default"', description: "(SelectTrigger) dimensão." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o select ou um item." },
    ],
```
Substituir por:
```ts
    props: [
      { name: "value / defaultValue", type: "string", description: "(Select) valor selecionado." },
      { name: "onValueChange", type: "(value: string) => void", description: "(Select) callback de mudança." },
      { name: "size", type: '"sm" | "default"', default: '"default"', description: "(SelectTrigger) dimensão." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o select ou um item." },
      { name: "label", type: "React.ReactNode", description: "(SelectTrigger) Rótulo renderizado internamente via Label. Ausente = comportamento idêntico ao anterior, sem wrapper." },
      { name: "animatedLabel", type: "boolean", default: "false", description: "(SelectTrigger) Com label presente, ativa o padrão de label flutuante (motion)." },
    ],
```

- [ ] **Step 10: Verificar e commitar**

```bash
npx tsc --noEmit
git add src/components/ui/select.tsx src/components/examples/select-fixed-label.tsx src/components/examples/select-floating-label.tsx src/lib/examples-mapping.ts src/components/examples/registry.tsx src/components/ui/select.stories.tsx src/lib/component-docs.ts
git commit -m "feat: adicionar label flutuante ao SelectTrigger"
```

---

### Task 6: `NativeSelect` — `"use client"` + estado local + props `label`/`animatedLabel`

**Files:**
- Modify: `src/components/ui/native-select.tsx`
- Create: `src/components/examples/native-select-fixed-label.tsx`, `src/components/examples/native-select-floating-label.tsx`
- Modify: `src/lib/examples-mapping.ts:46`, `src/components/examples/registry.tsx:162-163`, `src/components/ui/native-select.stories.tsx`, `src/lib/component-docs.ts:1410-1413`

**Interfaces:**
- Consumes: `duration-motion-fast` (Task 1).
- Produces: `NativeSelect` aceita `label?: React.ReactNode` e `animatedLabel?: boolean`. Diferente das Tasks 3-5 (CSS puro), o gatilho "tem valor" vem de estado React (`hasValue`), porque `<select>` nativo não tem `:placeholder-shown`.

- [ ] **Step 1: Reescrever `src/components/ui/native-select.tsx`**

```tsx
"use client"

import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function NativeSelect({
  className,
  size = "default",
  id,
  label,
  animatedLabel = false,
  value,
  defaultValue,
  onChange,
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
  label?: React.ReactNode
  animatedLabel?: boolean
}) {
  const generatedId = React.useId()
  const selectId = label ? (id ?? generatedId) : id
  // hasValue nasce de value/defaultValue explícitos — se nenhum dos dois
  // for passado, o browser ainda seleciona a 1ª <option> por padrão, e essa
  // seleção implícita não é capturada aqui. Uso com animatedLabel deve
  // sempre passar value ou defaultValue (mesmo que "").
  const [hasValue, setHasValue] = React.useState(
    () => !!(value ?? defaultValue)
  )

  React.useEffect(() => {
    if (value !== undefined) {
      setHasValue(!!value)
    }
  }, [value])

  const selectEl = (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
      data-has-value={hasValue}
    >
      <select
        data-slot="native-select"
        data-size={size}
        id={selectId}
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => {
          setHasValue(!!event.target.value)
          onChange?.(event)
        }}
        className={cn(
          "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/30 dark:hover:bg-input/50",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />
      <Icon
        name="keyboard_arrow_down"
        size={1}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
      {label && animatedLabel && (
        <Label
          htmlFor={selectId}
          // pointer-events-none: a label fica sobreposta ao valor
          // selecionado em repouso — sem isso, clicar nela não abre o
          // <select> por baixo.
          className={cn(
            "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-[top,left,transform,color] duration-motion-fast ease-out",
            "group-focus-within/native-select:top-0 group-focus-within/native-select:left-0 group-focus-within/native-select:-translate-y-full group-focus-within/native-select:text-foreground",
            "group-data-[has-value=true]/native-select:top-0 group-data-[has-value=true]/native-select:left-0 group-data-[has-value=true]/native-select:-translate-y-full group-data-[has-value=true]/native-select:text-foreground"
          )}
        >
          {label}
        </Label>
      )}
    </div>
  )

  if (!label || animatedLabel) {
    return selectEl
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={selectId}>{label}</Label>
      {selectEl}
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
```

- [ ] **Step 2: Verificar tipos**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Criar `src/components/examples/native-select-fixed-label.tsx`**

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectFixedLabel() {
  return (
    <NativeSelect label="País" defaultValue="br" className="w-56">
      <NativeSelectOption value="br">Brasil</NativeSelectOption>
      <NativeSelectOption value="pt">Portugal</NativeSelectOption>
    </NativeSelect>
  )
}
```

- [ ] **Step 4: Criar `src/components/examples/native-select-floating-label.tsx`**

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectFloatingLabel() {
  return (
    <NativeSelect label="País" animatedLabel defaultValue="" className="w-56">
      <NativeSelectOption value="">Selecione</NativeSelectOption>
      <NativeSelectOption value="br">Brasil</NativeSelectOption>
      <NativeSelectOption value="pt">Portugal</NativeSelectOption>
    </NativeSelect>
  )
}
```

- [ ] **Step 5: Registrar em `src/lib/examples-mapping.ts`**

Localizar (linha 46):
```ts
  "native-select": ["native-select-demo", "native-select-disabled", "native-select-groups", "native-select-invalid"],
```
Substituir por:
```ts
  "native-select": ["native-select-demo", "native-select-disabled", "native-select-fixed-label", "native-select-floating-label", "native-select-groups", "native-select-invalid"],
```

- [ ] **Step 6: Registrar em `src/components/examples/registry.tsx`**

Localizar (linhas 162-163):
```tsx
  "native-select-disabled": dynamic(() => import("@/components/examples/native-select-disabled")),
  "native-select-groups": dynamic(() => import("@/components/examples/native-select-groups")),
```
Substituir por:
```tsx
  "native-select-disabled": dynamic(() => import("@/components/examples/native-select-disabled")),
  "native-select-fixed-label": dynamic(() => import("@/components/examples/native-select-fixed-label")),
  "native-select-floating-label": dynamic(() => import("@/components/examples/native-select-floating-label")),
  "native-select-groups": dynamic(() => import("@/components/examples/native-select-groups")),
```

- [ ] **Step 7: Adicionar stories em `src/components/ui/native-select.stories.tsx`**

Adicionar aos imports (depois de `import NativeSelectDemo from "@/components/examples/native-select-demo"`):
```tsx
import NativeSelectFixedLabel from "@/components/examples/native-select-fixed-label"
import NativeSelectFloatingLabel from "@/components/examples/native-select-floating-label"
```

Adicionar ao fim do arquivo, depois de `export const Invalid`:
```tsx

export const FixedLabel: Story = {
  render: () => <NativeSelectFixedLabel />,
}

export const FloatingLabel: Story = {
  render: () => <NativeSelectFloatingLabel />,
}
```

- [ ] **Step 8: Atualizar props em `src/lib/component-docs.ts`**

Localizar a entrada `"native-select":` (linhas 1410-1413):
```ts
    props: [
      { name: "size", type: '"sm" | "default"', default: '"default"', description: "Dimensão do select." },
      { name: "...props", type: 'React.ComponentProps<"select">', description: "Todos os atributos nativos de <select>." },
    ],
```
Substituir por:
```ts
    props: [
      { name: "size", type: '"sm" | "default"', default: '"default"', description: "Dimensão do select." },
      { name: "label", type: "React.ReactNode", description: "Rótulo renderizado internamente via Label. Ausente = comportamento idêntico ao anterior, sem wrapper." },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Com label presente, ativa o padrão de label flutuante (motion). O gatilho de \"tem valor\" é estado React, não CSS puro — ver decisão provisória se precisar revisar." },
      { name: "...props", type: 'React.ComponentProps<"select">', description: "Todos os atributos nativos de <select>." },
    ],
```

- [ ] **Step 9: Verificar e commitar**

```bash
npx tsc --noEmit
git add src/components/ui/native-select.tsx src/components/examples/native-select-fixed-label.tsx src/components/examples/native-select-floating-label.tsx src/lib/examples-mapping.ts src/components/examples/registry.tsx src/components/ui/native-select.stories.tsx src/lib/component-docs.ts
git commit -m "feat: adicionar label flutuante ao NativeSelect"
```

---

### Task 7: Verificação final consolidada

**Files:**
- Nenhum arquivo novo — só verificação e atualização de status na spec.

**Interfaces:**
- Consumes: resultado de todas as Tasks 1-6.

- [ ] **Step 1: Typecheck completo do projeto**

```bash
npx tsc --noEmit
```
Esperado: 0 erros.

- [ ] **Step 2: Grep de sanidade — nenhuma cor fixa fora de token nos 4 arquivos tocados**

```bash
grep -nE "#[0-9a-fA-F]{3,8}|oklch\(" src/components/ui/input.tsx src/components/ui/textarea.tsx src/components/ui/select.tsx src/components/ui/native-select.tsx
```
Esperado: nenhuma ocorrência (só classes de token como `text-muted-foreground`, `text-foreground`, `border-input`).

- [ ] **Step 3: Grep de sanidade — as 8 novas entradas de exemplo existem nos 2 registries**

```bash
grep -c "fixed-label\|floating-label" src/lib/examples-mapping.ts src/components/examples/registry.tsx
```
Esperado: 8 em cada arquivo (2 por componente × 4 componentes).

- [ ] **Step 4: Atualizar o status da spec de origem**

Em `docs/superpowers/specs/2026-07-31-motion-label-flutuante-design.md`, localizar a linha 4:
```
Status: aprovado, pronto para plano de implementação
```
Substituir por:
```
Status: implementado (2026-07-31) — pendente QA visual manual do Rafael (5 presets × claro/escuro, prefers-reduced-motion, NativeSelect por teclado). Ver docs/superpowers/plans/2026-07-31-motion-label-flutuante-plan.md.
```

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-07-31-motion-label-flutuante-design.md
git commit -m "docs: marcar spec de label flutuante como implementada, pendente QA visual"
```

---

## Nota para o QA visual do Rafael (fora do escopo automatizável)

Depois da Task 7, ainda falta a checagem manual que só um humano faz (já prevista na spec):
- `npm run dev` → abrir as stories `FixedLabel`/`FloatingLabel` de Input, Textarea, Select e NativeSelect nos 5 presets (Padrão, Editorial, Tech, Suave, Midnight) × claro/escuro.
- Ativar `prefers-reduced-motion: reduce` no navegador e confirmar que a label ainda muda de posição (funcionalidade), só sem a transição animada.
- Testar `NativeSelectFloatingLabel` por teclado (Tab + setas), não só mouse.
