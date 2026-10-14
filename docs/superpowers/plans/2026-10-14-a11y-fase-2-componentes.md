# Trava de acessibilidade, Fase 2 (camada de componentes): plano de implementação

> **Para agentes:** executar tarefa a tarefa, na ordem. Cada tarefa termina com testes verdes e commit. Passos com checkbox (`- [ ]`).
> **Execução:** o orquestrador (Claude) despacha para AGY staffer e revisa (Haiku) diff + saída dos testes entre tarefas.

**Goal:** toda story do DS é renderizada nos 10 contextos (5 presets × claro/escuro), passa pelo axe e por medições próprias de alvo (WCAG 2.5.8) e foco visível (2.4.7), e o resultado vira `docs/a11y/relatorio-componentes.md`.

**Architecture:** o Storybook passa a aplicar preset e modo **no `<html>`**, como o app (`src/app/layout.tsx`): `data-style` + classe `.dark`. O Vitest ganha 10 projetos `storybook*`, um por contexto, cada um com `initialGlobals` próprio (`storybookTest({ initialGlobals })`, suportado pelo addon-vitest 10.5). Um `afterEach` global do preview mede alvo e foco no DOM real e registra o resultado como report (`reporting.addReport`), ao lado do report do axe. Um reporter do Vitest (lado Node) lê os reports de todos os testes e escreve o relatório.

**Tech Stack:** Storybook 10.5 (`@storybook/nextjs-vite`, addon-a11y, addon-vitest), Vitest 4 browser mode (Playwright/Chromium), TypeScript.

**Spec:** `docs/superpowers/specs/2026-10-14-trava-acessibilidade-design.md` (seção 4)

## Global Constraints

- Perfil Standard (AA): alvo mínimo 24×24 (2.5.8), 44×44 só como Regra da Casa (🟡, não reprova); foco com contorno ≥ 2px e ≥ 3:1 contra o fundo atrás.
- **Nesta fase nada reprova por falha de acessibilidade já existente** (mesma regra da Fase 1): axe, alvo e foco são medidos e relatados. A reprovação entra na Fase 3, junto com a linha de base. O teste reprova só quando a medição em si quebra (story não renderiza, hook lança erro).
- Medição de base em 2026-10-14 (`default/claro`, 386 stories): 0 testes falhando, 60 stories com violação de axe. Com `a11y.test: 'error'` essas 60 reprovariam hoje, por isso o modo `'error'` liga na Fase 3 (ver Tarefa 4, decisão registrada).
- `color-contrast` do axe só no `default/claro`.
- Nenhuma dependência nova.
- Não editar componentes de `src/components/ui/` nem `src/app/globals.css`.
- Todo texto (comentários, mensagens, relatório) em português do Brasil.
- Achado já conhecido que deve aparecer no relatório: `Switch` com ~32×18 (reprova 2.5.8 se não cumprir a exceção de espaçamento).

## Mapa de arquivos

| Arquivo | Papel |
|---|---|
| `.storybook/preview.tsx` (modificar) | global `modo`; `style` e `.dark` no `<html>`; `color-contrast` só no default claro; `afterEach` das medições |
| `vitest.config.ts` (modificar) | 10 projetos `storybook*`; reporter do relatório |
| `package.json` (modificar) | scripts `test:a11y` e `test:a11y:todos` |
| `src/lib/a11y/contexto-story.ts` (criar) | funções puras: contexto a partir dos globals, nome do projeto, regras do axe por contexto |
| `src/lib/a11y/contexto-story.test.ts` (criar) | unitário das funções acima |
| `src/lib/a11y/medir-dom.ts` (criar) | medições no navegador: `medirAlvos`, `medirFoco` |
| `src/lib/a11y/medicoes.stories.tsx` (criar) | stories-fixture com `play` que provam as medições (passa / reprova conhecidos) e o contexto no `<html>` |
| `src/lib/a11y/relatorio-componentes.ts` (criar) | função pura que monta o markdown |
| `src/lib/a11y/relatorio-componentes.test.ts` (criar) | unitário do markdown |
| `src/lib/a11y/reporter-componentes.ts` (criar) | reporter Vitest: junta reports e grava o relatório |
| `docs/a11y/relatorio-componentes.md` (gerado) | saída |

---

### Tarefa 1: Contexto no `<html>` e global `modo`

**Files:**
- Create: `src/lib/a11y/contexto-story.ts`, `src/lib/a11y/contexto-story.test.ts`
- Modify: `.storybook/preview.tsx`
- Create: `src/lib/a11y/medicoes.stories.tsx` (só a story `Contexto` nesta tarefa)

**Interfaces:**
- Produces:
  - `contextoDosGlobals(globals: Record<string, unknown>): Contexto` (tipo `Contexto` de `css-tokens.ts`; default `{ preset: "default", modo: "claro" }`)
  - `nomeProjeto(c: Contexto): string` → `"storybook"` para default/claro, senão `` `storybook-${preset}-${modo}` ``
  - `regrasAxe(c: Contexto): { id: string; enabled: boolean }[]` → `[]` no default/claro, `[{ id: "color-contrast", enabled: false }]` nos outros
  - `aplicarContextoNoHtml(c: Contexto, html?: HTMLElement): void`

- [ ] **Step 1: teste unitário que falha** (`src/lib/a11y/contexto-story.test.ts`)

```ts
import { describe, expect, it } from "vitest"
import { CONTEXTOS } from "./css-tokens"
import { contextoDosGlobals, nomeProjeto, regrasAxe } from "./contexto-story"

describe("contexto da story", () => {
  it("lê preset e modo dos globals, com padrão default/claro", () => {
    expect(contextoDosGlobals({})).toEqual({ preset: "default", modo: "claro" })
    expect(contextoDosGlobals({ style: "tech", modo: "escuro" })).toEqual({ preset: "tech", modo: "escuro" })
  })
  it("valor desconhecido nos globals é erro, não cai no padrão em silêncio", () => {
    expect(() => contextoDosGlobals({ style: "xpto" })).toThrow(/preset/)
    expect(() => contextoDosGlobals({ modo: "noite" })).toThrow(/modo/)
  })
  it("10 nomes de projeto únicos; o default claro mantém o nome storybook", () => {
    const nomes = CONTEXTOS.map(nomeProjeto)
    expect(new Set(nomes).size).toBe(10)
    expect(nomeProjeto({ preset: "default", modo: "claro" })).toBe("storybook")
    expect(nomeProjeto({ preset: "midnight", modo: "escuro" })).toBe("storybook-midnight-escuro")
  })
  it("color-contrast do axe só fica ligado no default claro", () => {
    expect(regrasAxe({ preset: "default", modo: "claro" })).toEqual([])
    for (const c of CONTEXTOS.slice(1)) expect(regrasAxe(c)).toEqual([{ id: "color-contrast", enabled: false }])
  })
})
```

- [ ] **Step 2:** `npx vitest run --project unit src/lib/a11y/contexto-story.test.ts` → FAIL (módulo não existe).

- [ ] **Step 3: implementação** (`src/lib/a11y/contexto-story.ts`)

```ts
// Contexto (preset × modo) de uma story: aplicado no <html> como o app faz em src/app/layout.tsx,
// para a story ver exatamente a mesma cascata de tokens que a tela real.
import { CONTEXTOS, type Contexto } from "./css-tokens"

const PRESETS = [...new Set(CONTEXTOS.map((c) => c.preset))]

export function contextoDosGlobals(globals: Record<string, unknown>): Contexto {
  const preset = (globals.style ?? "default") as Contexto["preset"]
  const modo = (globals.modo ?? "claro") as Contexto["modo"]
  if (!PRESETS.includes(preset)) throw new Error(`preset desconhecido: ${String(preset)}`)
  if (modo !== "claro" && modo !== "escuro") throw new Error(`modo desconhecido: ${String(modo)}`)
  return { preset, modo }
}

export const ehPadrao = (c: Contexto) => c.preset === "default" && c.modo === "claro"

export const nomeProjeto = (c: Contexto) => (ehPadrao(c) ? "storybook" : `storybook-${c.preset}-${c.modo}`)

// Contraste de token já é medido na camada 1 (tokens.test.ts); aqui só o default claro pega combinação errada dentro do componente.
export const regrasAxe = (c: Contexto) => (ehPadrao(c) ? [] : [{ id: "color-contrast", enabled: false }])

export function aplicarContextoNoHtml(c: Contexto, html: HTMLElement = document.documentElement) {
  html.dataset.style = c.preset
  html.classList.toggle("dark", c.modo === "escuro")
}
```

- [ ] **Step 4:** rodar o unitário → PASS.

- [ ] **Step 5: preview** (`.storybook/preview.tsx`). Trocar o comentário do topo (ele diz que `data-style` em div é equivalente, o que deixou de ser verdade: `.dark[data-style=…]` exige os dois no mesmo elemento). Adicionar o global `modo`, aplicar o contexto no `<html>` no corpo do decorator (síncrono, antes de a story pintar; também roda quando o global muda na toolbar) e desligar `color-contrast` fora do default claro num `beforeEach`, que roda antes do `afterEach` do addon e altera o mesmo objeto `parameters` que ele lê:

```tsx
import { aplicarContextoNoHtml, contextoDosGlobals, regrasAxe } from '../src/lib/a11y/contexto-story'

// globalTypes, ao lado de style:
    modo: {
      description: 'Modo claro ou escuro (classe .dark no <html>)',
      defaultValue: 'claro',
      toolbar: {
        title: 'Modo',
        icon: 'contrast',
        items: [
          { value: 'claro', title: 'Claro' },
          { value: 'escuro', title: 'Escuro' },
        ],
        dynamicTitle: true,
      },
    },

// decorator: o wrapper perde data-style
  decorators: [
    (Story, context) => {
      aplicarContextoNoHtml(contextoDosGlobals(context.globals))
      return (
        <div className="antialiased font-sans">
          <TooltipProvider>
            <Story />
          </TooltipProvider>
        </div>
      )
    },
  ],
  beforeEach: (context) => {
    const regras = regrasAxe(contextoDosGlobals(context.globals))
    if (!regras.length) return
    const a11y = (context.parameters.a11y ??= {})
    a11y.config = { ...a11y.config, rules: [...(a11y.config?.rules ?? []), ...regras] }
  },
```

- [ ] **Step 6: story-fixture `Contexto`** (`src/lib/a11y/medicoes.stories.tsx`) que prova o `<html>` no navegador:

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { contextoDosGlobals, regrasAxe } from './contexto-story'

const meta: Meta = {
  title: 'Testes/A11y medições',
  parameters: { a11yMedir: false }, // fixtures das próprias medições não entram no relatório
}
export default meta

export const Contexto: StoryObj = {
  render: () => <p>contexto</p>,
  play: async ({ globals, parameters }) => {
    const c = contextoDosGlobals(globals)
    const html = document.documentElement
    await expect(html.dataset.style).toBe(c.preset)
    await expect(html.classList.contains('dark')).toBe(c.modo === 'escuro')
    for (const r of regrasAxe(c)) await expect(parameters.a11y?.config?.rules).toContainEqual(r)
  },
}
```

- [ ] **Step 7:** `npx vitest run --project storybook src/lib/a11y/medicoes.stories.tsx` → PASS. Rodar `npx vitest run --project storybook` inteiro → 0 testes falhando (antes: 386 passando). Conferir no `npm run storybook` que a toolbar mostra "Modo" e que trocar para Escuro escurece a story.

- [ ] **Step 8: commit**

```bash
git add src/lib/a11y/contexto-story.ts src/lib/a11y/contexto-story.test.ts src/lib/a11y/medicoes.stories.tsx .storybook/preview.tsx
git commit -m "feat(storybook): preset e modo aplicados no <html> como no app; color-contrast só no default claro"
```

---

### Tarefa 2: Matriz de 10 contextos e scripts

**Files:**
- Modify: `vitest.config.ts`, `package.json`

**Interfaces:**
- Consumes: `CONTEXTOS` (`css-tokens.ts`), `nomeProjeto` (Tarefa 1)
- Produces: projetos Vitest `storybook` (default/claro) e `storybook-<preset>-<modo>` (os outros 9); scripts `test:a11y`, `test:a11y:todos`

- [ ] **Step 1: config.** Trocar o projeto `storybook` único por um por contexto:

```ts
import { CONTEXTOS } from './src/lib/a11y/css-tokens';
import { nomeProjeto } from './src/lib/a11y/contexto-story';

// dentro de test.projects, no lugar do projeto storybook:
      ...CONTEXTOS.map((c) => ({
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            initialGlobals: { style: c.preset, modo: c.modo },
          }),
        ],
        test: {
          name: nomeProjeto(c),
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' as const }],
          },
        },
      })),
```

- [ ] **Step 2: scripts** (`package.json`):

```json
"test:a11y": "vitest run --project storybook",
"test:a11y:todos": "vitest run --project \"storybook*\"",
```

- [ ] **Step 3:** `npx vitest list --project "storybook*" --filesOnly` lista 10 projetos; `npm run test:a11y:todos -- src/lib/a11y/medicoes.stories.tsx` → 10 PASS (a story `Contexto` prova que cada projeto recebeu seu preset/modo). Se os 10 navegadores em paralelo estourarem memória, limitar com `fileParallelism`/`maxWorkers` no projeto e registrar o motivo em comentário.

- [ ] **Step 4: commit**

```bash
git add vitest.config.ts package.json
git commit -m "test(a11y): matriz de 10 contextos no projeto storybook; scripts test:a11y e test:a11y:todos"
```

---

### Tarefa 3: Medições de alvo e foco no DOM

**Files:**
- Create: `src/lib/a11y/medir-dom.ts`
- Modify: `src/lib/a11y/medicoes.stories.tsx` (fixtures com `play`)

**Interfaces:**
- Produces:

```ts
export type MedidaAlvo = { elemento: string; largura: number; altura: number; resultado: "passa" | "espacamento" | "isento" | "reprova"; motivo?: string; casa: boolean }
export type MedidaFoco = { elemento: string; largura: number; cor: string | null; fundo: string; razao: number | null; resultado: "passa" | "reprova"; motivo?: string }
export function medirAlvos(raiz?: ParentNode): MedidaAlvo[]
export function medirFoco(raiz?: ParentNode, limite?: number): Promise<MedidaFoco[]>
```

Regras (spec seção 4):
- **Alvo:** interativos visíveis (`SELETOR_INTERATIVO`). Isentos: desabilitado (`:disabled`, `aria-disabled="true"`, não é alvo operável) e link em texto corrido (`a` cujo pai tem texto próprio). Elemento visualmente oculto (≤ 1px, `opacity: 0`, `visibility: hidden`) não é alvo. ≥ 24×24 passa. Menor: exceção de espaçamento — círculo de 24px no centro não pode tocar outro alvo (distância centro→retângulo < 12) nem o círculo de outro alvo pequeno (distância entre centros < 24); alvos aninhados um no outro não contam entre si. `casa = largura < 44 || altura < 44`.
- **Foco:** percorre com `userEvent.tab()` (`storybook/test`) a partir do `body`, até repetir o primeiro, voltar ao `body` ou chegar a `limite` (padrão 50). Para cada elemento focado espera as transições (`getAnimations()`), lê `outline` e anéis de `box-shadow` (offset 0, blur 0, espalhamento > 0; largura visível = espalhamento − maior espalhamento das sombras acima, que é como o Tailwind empilha `ring-offset` + `ring`). Cor de qualquer formato (`oklch`, `oklab`, `color-mix`) é convertida pelo próprio navegador num canvas 1×1. Fundo = composição dos `background-color` dos ancestrais até o primeiro opaco (branco se nenhum). Passa se algum contorno tem largura ≥ 2 e `razao(cor, fundo)` ≥ 3. Sem contorno nenhum → reprova com motivo "foco só por preenchimento ou invisível".

- [ ] **Step 1: fixtures que falham** (acrescentar em `medicoes.stories.tsx`). Cada uma afirma o resultado esperado de um caso conhecido:

```tsx
import { medirAlvos, medirFoco } from './medir-dom'

const box = (w: number, h: number) => ({ width: `${w / 16}rem`, height: `${h / 16}rem` })

export const AlvoGrandePassa: StoryObj = {
  render: () => <button style={box(24, 24)} aria-label="ok" />,
  play: async () => {
    const [m] = medirAlvos()
    await expect(m.resultado).toBe('passa')
    await expect(m.casa).toBe(true)
  },
}
export const AlvoPequenoIsoladoUsaEspacamento: StoryObj = {
  render: () => <button style={box(16, 16)} aria-label="ok" />,
  play: async () => await expect(medirAlvos()[0].resultado).toBe('espacamento'),
}
export const AlvosPequenosColadosReprovam: StoryObj = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <button style={box(16, 16)} aria-label="a" />
      <button style={box(16, 16)} aria-label="b" />
    </div>
  ),
  play: async () => await expect(medirAlvos().map((m) => m.resultado)).toEqual(['reprova', 'reprova']),
}
export const DesabilitadoELinkEmTextoSaoIsentos: StoryObj = {
  render: () => (
    <div>
      <button disabled style={box(10, 10)} aria-label="x" />
      <p>leia <a href="#a">aqui</a> o resto</p>
    </div>
  ),
  play: async () => await expect(medirAlvos().map((m) => m.resultado)).toEqual(['isento', 'isento']),
}
export const FocoComContornoPassa: StoryObj = {
  render: () => <button className="focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-black bg-white p-2">a</button>,
  play: async () => {
    const [f] = await medirFoco()
    await expect(f.resultado).toBe('passa')
    await expect(f.largura).toBeGreaterThanOrEqual(2)
  },
}
export const FocoComAnelPassa: StoryObj = {
  render: () => <button className="outline-none focus-visible:ring-[3px] focus-visible:ring-black bg-white p-2">a</button>,
  play: async () => await expect((await medirFoco())[0].resultado).toBe('passa'),
}
export const FocoSoPorPreenchimentoReprova: StoryObj = {
  render: () => <button className="outline-none focus-visible:bg-black focus-visible:text-white p-2">a</button>,
  play: async () => await expect((await medirFoco())[0].resultado).toBe('reprova'),
}
export const FocoFinoReprova: StoryObj = {
  render: () => <button className="focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-black p-2">a</button>,
  play: async () => await expect((await medirFoco())[0].resultado).toBe('reprova'),
}
export const FocoClaroDemaisReprova: StoryObj = {
  render: () => <div style={{ background: '#fff', padding: '0.5rem' }}><button className="focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[#ddd] p-2">a</button></div>,
  play: async () => await expect((await medirFoco())[0].resultado).toBe('reprova'),
}
```

(Classes fixas como `outline-[#ddd]` são aceitas aqui porque é fixture de teste em `src/lib/a11y/`, fora de `src/components/ui/`, onde a trava de tokens atua.)

- [ ] **Step 2:** `npx vitest run --project storybook src/lib/a11y/medicoes.stories.tsx` → FAIL (`medir-dom` não existe).

- [ ] **Step 3: implementação** (`src/lib/a11y/medir-dom.ts`)

```ts
// Medições no DOM real que o axe não faz: tamanho de alvo (WCAG 2.5.8, perfil AA) e foco visível (2.4.7 + protocolo A11Y.md).
// Roda no navegador (afterEach do preview do Storybook). Não reprova nada sozinha: devolve medidas.
import { userEvent } from "storybook/test"
import { compor, paraHex, razao, type Rgba } from "./contraste"
import { PISOS } from "./perfil"

export const SELETOR_INTERATIVO =
  'button, a[href], input:not([type="hidden"]), select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="switch"], [role="tab"], [role="menuitem"], [role="option"]'
export const ALVO_MIN = 24
export const ALVO_CASA = 44
const FOCO_MIN = 2
const EPS = 0.01 // subpixel: 23.995 conta como 24

export type MedidaAlvo = { elemento: string; largura: number; altura: number; resultado: "passa" | "espacamento" | "isento" | "reprova"; motivo?: string; casa: boolean }
export type MedidaFoco = { elemento: string; largura: number; cor: string | null; fundo: string; razao: number | null; resultado: "passa" | "reprova"; motivo?: string }

const r1 = (n: number) => Math.round(n * 10) / 10

export function descrever(el: Element): string {
  const tag = el.tagName.toLowerCase()
  const slot = el.getAttribute("data-slot")
  const role = el.getAttribute("role")
  const nome = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 30)
  return `${tag}${slot ? `[data-slot=${slot}]` : ""}${role ? `[role=${role}]` : ""}${nome ? ` "${nome}"` : ""}`
}

function visivel(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  const cs = getComputedStyle(el)
  return r.width > 1 && r.height > 1 && cs.visibility !== "hidden" && cs.opacity !== "0" && !el.closest("[inert]")
}

function isencao(el: HTMLElement): string | null {
  if (el.matches(':disabled, [aria-disabled="true"]')) return "desabilitado"
  if (el.tagName === "A" && [...(el.parentElement?.childNodes ?? [])].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent!.trim()))
    return "link em texto corrido"
  return null
}

const centro = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
const pequeno = (r: DOMRect) => r.width < ALVO_MIN - EPS || r.height < ALVO_MIN - EPS
function distPontoRet(p: { x: number; y: number }, r: DOMRect) {
  const dx = Math.max(r.left - p.x, 0, p.x - r.right)
  const dy = Math.max(r.top - p.y, 0, p.y - r.bottom)
  return Math.hypot(dx, dy)
}

export function medirAlvos(raiz: ParentNode = document.body): MedidaAlvo[] {
  const els = [...raiz.querySelectorAll<HTMLElement>(SELETOR_INTERATIVO)].filter(visivel)
  const rects = els.map((e) => e.getBoundingClientRect())
  return els.map((el, i) => {
    const r = rects[i]
    const base = { elemento: descrever(el), largura: r1(r.width), altura: r1(r.height), casa: r.width < ALVO_CASA - EPS || r.height < ALVO_CASA - EPS }
    const isento = isencao(el)
    if (isento) return { ...base, resultado: "isento" as const, motivo: isento }
    if (!pequeno(r)) return { ...base, resultado: "passa" as const }
    const c = centro(r)
    const colide = els.some((outro, j) => {
      if (j === i || el.contains(outro) || outro.contains(el)) return false
      return distPontoRet(c, rects[j]) < ALVO_MIN / 2 || (pequeno(rects[j]) && Math.hypot(c.x - centro(rects[j]).x, c.y - centro(rects[j]).y) < ALVO_MIN)
    })
    return colide
      ? { ...base, resultado: "reprova" as const, motivo: "menor que 24×24 e sem espaçamento de 24px" }
      : { ...base, resultado: "espacamento" as const }
  })
}

// O navegador converte qualquer cor CSS (oklch, oklab, color-mix…) para sRGB ao pintar: lemos o pixel.
let ctx: CanvasRenderingContext2D | null = null
export function rgbaDoNavegador(cor: string): Rgba {
  ctx ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", { willReadFrequently: true })!
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#000"
  ctx.fillStyle = cor
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  return { r: r / 255, g: g / 255, b: b / 255, a: a / 255 }
}

export function fundoAtras(el: Element): Rgba {
  const camadas: Rgba[] = []
  for (let n = el.parentElement; n; n = n.parentElement) {
    const c = rgbaDoNavegador(getComputedStyle(n).backgroundColor)
    if (c.a > 0) camadas.push(c)
    if (c.a >= 1) break
  }
  return camadas.reduceRight<Rgba>((fundo, c) => compor(c, fundo), { r: 1, g: 1, b: 1, a: 1 })
}

function dividirSombras(v: string): string[] {
  const partes: string[] = []
  let nivel = 0, atual = ""
  for (const ch of v) {
    if (ch === "(") nivel++
    if (ch === ")") nivel--
    if (ch === "," && nivel === 0) { partes.push(atual); atual = "" } else atual += ch
  }
  return [...partes, atual].map((s) => s.trim()).filter((s) => s && s !== "none")
}

// Anéis (offset 0, blur 0, espalhamento > 0). A primeira sombra fica por cima: a largura visível de cada uma é o que sobra além das de cima.
export function aneis(boxShadow: string): { largura: number; cor: string }[] {
  let cobertura = 0
  const out: { largura: number; cor: string }[] = []
  for (const s of dividirSombras(boxShadow)) {
    if (/\binset\b/.test(s)) continue
    const cor = s.match(/(?:rgba?|oklch|oklab|lab|lch|hsla?|color)\([^)]*\)|#[0-9a-f]{3,8}\b/i)?.[0]
    const [x = 0, y = 0, blur = 0, esp = 0] = s.replace(cor ?? "", "").match(/-?[\d.]+px/g)?.map(parseFloat) ?? []
    if (!cor || x || y || blur || esp <= 0) continue
    const largura = esp - cobertura
    cobertura = Math.max(cobertura, esp)
    if (largura > 0) out.push({ largura, cor })
  }
  return out
}

const hex = (c: Rgba) => paraHex(c)

export function medirFocoDe(el: HTMLElement): MedidaFoco {
  const cs = getComputedStyle(el)
  const fundo = fundoAtras(el)
  const contornos = [...aneis(cs.boxShadow)]
  const lo = parseFloat(cs.outlineWidth)
  if (cs.outlineStyle !== "none" && lo > 0) contornos.unshift({ largura: lo, cor: cs.outlineColor })
  const elemento = descrever(el)
  if (!contornos.length) return { elemento, largura: 0, cor: null, fundo: hex(fundo), razao: null, resultado: "reprova", motivo: "foco só por preenchimento ou invisível" }
  const medidos = contornos.map((c) => {
    const cor = compor(rgbaDoNavegador(c.cor), fundo)
    return { largura: r1(c.largura), cor: hex(cor), razao: razao(hex(cor), hex(fundo)) }
  })
  const melhor = medidos.find((m) => m.largura >= FOCO_MIN - EPS && m.razao >= PISOS.ui) ?? medidos.sort((a, b) => b.razao - a.razao)[0]
  const passa = melhor.largura >= FOCO_MIN - EPS && melhor.razao >= PISOS.ui
  return {
    elemento, ...melhor, fundo: hex(fundo),
    resultado: passa ? "passa" : "reprova",
    motivo: passa ? undefined : melhor.largura < FOCO_MIN - EPS ? `contorno de ${melhor.largura}px (mínimo 2px)` : `contraste ${melhor.razao}:1 (mínimo 3:1)`,
  }
}

export async function medirFoco(raiz: ParentNode = document.body, limite = 50): Promise<MedidaFoco[]> {
  ;(document.activeElement as HTMLElement | null)?.blur?.()
  const vistos = new Set<Element>()
  const out: MedidaFoco[] = []
  for (let i = 0; i < limite; i++) {
    await userEvent.tab()
    const el = document.activeElement as HTMLElement | null
    if (!el || el === document.body || vistos.has(el)) break
    vistos.add(el)
    if (!raiz.contains(el)) continue
    await Promise.all(el.getAnimations().map((a) => a.finished.catch(() => undefined)))
    out.push(medirFocoDe(el))
  }
  ;(document.activeElement as HTMLElement | null)?.blur?.()
  return out
}
```

Conferir que `paraHex` aceita `Rgba` (`src/lib/cor/espaco.ts`); se a assinatura for outra, adaptar só a função `hex` acima.

- [ ] **Step 4:** rodar as fixtures → PASS. Se `FocoComContornoPassa` falhar por `:focus-visible` não casar com foco programático, trocar `userEvent` de `storybook/test` por `userEvent` de `vitest/browser` (Tab real via CDP) **apenas dentro de `medirFoco`**, importado de forma dinâmica sob `import.meta.env.VITEST` para não quebrar o Storybook fora do Vitest, e registrar a razão num comentário.

- [ ] **Step 5: commit**

```bash
git add src/lib/a11y/medir-dom.ts src/lib/a11y/medicoes.stories.tsx
git commit -m "feat(a11y): medições de alvo (2.5.8) e foco visível (2.4.7) no DOM, com fixtures"
```

---

### Tarefa 4: Hook global das medições e decisão sobre o modo do axe

**Files:**
- Modify: `.storybook/preview.tsx`

**Interfaces:**
- Consumes: `medirAlvos`, `medirFoco` (Tarefa 3), `contextoDosGlobals`, `nomeContexto`
- Produces: em cada teste de story, além do report `type: "a11y"` do addon, um report

```ts
{ type: "a11y-medidas", version: 1, status: "passed" | "warning",
  result: { contexto: string /* "tech/escuro" */, alvos: MedidaAlvo[], focos: MedidaFoco[] } }
```

- [ ] **Step 1:** no preview, `afterEach` (pula se `parameters.a11yMedir === false` ou `viewMode !== 'story'`):

```tsx
import { nomeContexto } from '../src/lib/a11y/css-tokens'
import { medirAlvos, medirFoco } from '../src/lib/a11y/medir-dom'

  afterEach: async ({ parameters, globals, reporting, viewMode, canvasElement }) => {
    if (parameters.a11yMedir === false || viewMode !== 'story') return
    // Portais (Dialog, Popover, Tooltip) renderizam fora do canvas: mede no body inteiro.
    void canvasElement
    const alvos = medirAlvos(document.body)
    const focos = await medirFoco(document.body)
    const falhou = [...alvos, ...focos].some((m) => m.resultado === 'reprova')
    reporting.addReport({
      type: 'a11y-medidas',
      version: 1,
      // Fase 2: mede e relata. 'warning' até existir a linha de base (Fase 3), que passa a reprovar o que estiver fora dela.
      status: falhou ? 'warning' : 'passed',
      result: { contexto: nomeContexto(contextoDosGlobals(globals)), alvos, focos },
    })
  },
```

(Remover a linha `void canvasElement` e o parâmetro se o lint reclamar; ela só documenta a escolha.)

- [ ] **Step 2: modo do axe.** Manter `parameters.a11y.test: 'todo'` e trocar o comentário por:

```ts
    a11y: {
      // Fase 2 da trava (docs/superpowers/specs/2026-10-14-trava-acessibilidade-design.md): o axe mede e relata.
      // Vira 'error' na Fase 3, junto com a linha de base; antes disso, as 60 stories com violação já
      // existente reprovariam. O resultado completo está em docs/a11y/relatorio-componentes.md.
      test: 'todo',
    },
```

- [ ] **Step 3:** `npx vitest run --project storybook --reporter=json --outputFile=<scratchpad>/medidas.json` → 0 falhas; conferir no JSON que todo teste de story (exceto as fixtures) tem report `a11y-medidas` e que o `Switch` aparece com ~32×18.

- [ ] **Step 4: commit**

```bash
git add .storybook/preview.tsx
git commit -m "feat(a11y): hook global mede alvo e foco em toda story e registra junto do axe"
```

---

### Tarefa 5: Relatório de componentes

**Files:**
- Create: `src/lib/a11y/relatorio-componentes.ts`, `src/lib/a11y/relatorio-componentes.test.ts`, `src/lib/a11y/reporter-componentes.ts`
- Modify: `vitest.config.ts`
- Generate: `docs/a11y/relatorio-componentes.md`

**Interfaces:**
- Consumes: report `a11y-medidas` (Tarefa 4), report `a11y` do addon (`result.violations: { id, impact, help, nodes: { target: string[] }[] }[]`), `testCase.meta().storyId`
- Produces:

```ts
export type ResultadoStory = {
  storyId: string
  contexto: string
  axe: { regra: string; impacto: string; ajuda: string; alvos: string[] }[]
  alvos: MedidaAlvo[]
  focos: MedidaFoco[]
  erro?: string // story que não renderizou / teste que quebrou
}
export function relatorioComponentes(rs: ResultadoStory[], contextos: string[]): string
```

Formato do markdown (determinístico, sem data, ordenado por componente e story, para o diff do git mostrar só mudança real):
- Cabeçalho: gerado por `npm run test:a11y:todos`, não editar à mão, perfil, contextos medidos, isenções (desabilitado; link em texto corrido; controle desabilitado isento de contraste), nota "coluna *na base* entra na Fase 3".
- Resumo: stories × contextos, componentes, quantos reprovam (WCAG), quantos só com Regra da Casa.
- Tabela por componente (componente = parte do `storyId` antes de `--`): `Componente | Resultado | Falhas WCAG | Regra da Casa`. Resultado: `reprovou` / `passou` / `passou (🟡)`.
- Detalhe por componente, uma linha por achado, juntando contextos iguais: `Critério | Severidade | Story | Elemento | Medida | Contextos`. Severidade: axe usa o `impact` (`critical`→crítica, `serious`→séria, `moderate`→moderada, `minor`→leve); alvo e foco = séria (impedem operar/ver o foco); Regra da Casa = 🟡.

- [ ] **Step 1: teste unitário que falha**

```ts
import { describe, expect, it } from "vitest"
import { relatorioComponentes, type ResultadoStory } from "./relatorio-componentes"

const alvoSwitch = { elemento: 'button[data-slot=switch][role=switch]', largura: 32, altura: 18, resultado: "reprova" as const, motivo: "menor que 24×24 e sem espaçamento de 24px", casa: true }
const base = (contexto: string, extra: Partial<ResultadoStory> = {}): ResultadoStory => ({ storyId: "ui-switch--padrao", contexto, axe: [], alvos: [], focos: [], ...extra })

describe("relatório de componentes", () => {
  it("junta o mesmo achado de contextos diferentes numa linha só", () => {
    const md = relatorioComponentes([base("default/claro", { alvos: [alvoSwitch] }), base("tech/escuro", { alvos: [alvoSwitch] })], ["default/claro", "tech/escuro"])
    const linhas = md.split("\n").filter((l) => l.includes("32×18"))
    expect(linhas).toHaveLength(1)
    expect(linhas[0]).toContain("default/claro, tech/escuro")
    expect(md).toMatch(/\| ui-switch \| reprovou \|/)
  })
  it("componente só abaixo de 44×44 passa com 🟡", () => {
    const md = relatorioComponentes([base("default/claro", { storyId: "ui-button--padrao", alvos: [{ ...alvoSwitch, elemento: "button", largura: 36, altura: 36, resultado: "passa", motivo: undefined }] })], ["default/claro"])
    expect(md).toMatch(/\| ui-button \| passou \(🟡\) \| 0 \| 1 \|/)
  })
  it("violação do axe entra com severidade traduzida", () => {
    const md = relatorioComponentes([base("default/claro", { axe: [{ regra: "button-name", impacto: "critical", ajuda: "Buttons must have discernible text", alvos: ["button"] }] })], ["default/claro"])
    expect(md).toContain("button-name")
    expect(md).toContain("crítica")
  })
  it("story que quebrou aparece, nunca some em silêncio", () => {
    const md = relatorioComponentes([base("default/claro", { erro: "TypeError: x" })], ["default/claro"])
    expect(md).toContain("TypeError: x")
  })
  it("é determinístico: a ordem de entrada não muda a saída", () => {
    const a = [base("default/claro", { alvos: [alvoSwitch] }), base("tech/escuro", { storyId: "ui-badge--padrao" })]
    expect(relatorioComponentes(a, ["default/claro", "tech/escuro"])).toBe(relatorioComponentes([...a].reverse(), ["default/claro", "tech/escuro"]))
  })
})
```

- [ ] **Step 2:** `npx vitest run --project unit src/lib/a11y/relatorio-componentes.test.ts` → FAIL.

- [ ] **Step 3: implementação** de `relatorio-componentes.ts` (função pura, sem `fs`), no estilo de `relatorioTokens` em `medir-tokens.ts` (números com vírgula decimal, mesma tabela markdown). Achado = `{ componente, criterio, severidade, story, elemento, medida, casa }`; chave de junção = tudo menos o contexto; contextos ordenados pela ordem de `CONTEXTOS`.

- [ ] **Step 4:** unitário → PASS.

- [ ] **Step 5: reporter** (`reporter-componentes.ts`), lado Node:

```ts
// Junta os reports das stories (axe do addon-a11y + medições de alvo/foco) e grava docs/a11y/relatorio-componentes.md.
// Só grava quando a execução cobriu os 10 contextos (test:a11y:todos); execução parcial só imprime o resumo.
import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import type { Reporter, TestModule } from "vitest/node"
import { CONTEXTOS, nomeContexto } from "./css-tokens"
import { relatorioComponentes, type ResultadoStory } from "./relatorio-componentes"

export default class ReporterComponentes implements Reporter {
  onTestRunEnd(modulos: ReadonlyArray<TestModule>) {
    const rs: ResultadoStory[] = []
    for (const m of modulos) {
      if (!m.project.name.startsWith("storybook")) continue
      for (const t of m.children.allTests()) {
        const meta = t.meta() as { storyId?: string; reports?: { type: string; result: any }[] }
        if (!meta.storyId) continue
        const medidas = meta.reports?.find((r) => r.type === "a11y-medidas")?.result
        if (!medidas && t.result().state !== "failed") continue // fixture com a11yMedir: false
        const axe = meta.reports?.find((r) => r.type === "a11y")?.result
        rs.push({
          storyId: meta.storyId,
          contexto: medidas?.contexto ?? m.project.name,
          axe: (axe?.violations ?? []).map((v: any) => ({ regra: v.id, impacto: v.impact, ajuda: v.help, alvos: v.nodes.map((n: any) => n.target.join(" ")) })),
          alvos: medidas?.alvos ?? [],
          focos: medidas?.focos ?? [],
          erro: t.result().errors?.map((e) => e.message).join("; ") || undefined,
        })
      }
    }
    if (!rs.length) return
    const medidos = new Set(rs.map((r) => r.contexto))
    const todos = CONTEXTOS.map(nomeContexto)
    if (!todos.every((c) => medidos.has(c))) {
      console.log(`[a11y] ${rs.length} stories medidas em ${medidos.size}/10 contextos; relatório só é gravado com test:a11y:todos.`)
      return
    }
    const destino = resolve(import.meta.dirname, "../../../docs/a11y/relatorio-componentes.md")
    mkdirSync(resolve(destino, ".."), { recursive: true })
    writeFileSync(destino, relatorioComponentes(rs, todos))
    console.log(`[a11y] relatório gravado em docs/a11y/relatorio-componentes.md`)
  }
}
```

No `vitest.config.ts`, na raiz de `test`: `reporters: ['default', new ReporterComponentes()]` (import de `./src/lib/a11y/reporter-componentes`). Se `import.meta.dirname` não existir na versão do Node, usar `fileURLToPath` como o próprio config faz.

- [ ] **Step 6:** `npm run test:a11y:todos` (em segundo plano; ~10–25 min) → 0 falhas; `docs/a11y/relatorio-componentes.md` gerado; conferir que o `Switch` está lá como reprova de 2.5.8 com 32×18 e que o total de stories com violação do axe no `default/claro` bate com a medição de base (60, com `color-contrast` só nesse contexto).

- [ ] **Step 7: commit**

```bash
git add src/lib/a11y/relatorio-componentes.ts src/lib/a11y/relatorio-componentes.test.ts src/lib/a11y/reporter-componentes.ts vitest.config.ts docs/a11y/relatorio-componentes.md
git commit -m "feat(a11y): relatório de componentes nos 10 contextos (axe, alvo, foco)"
```

---

### Tarefa 6: Verificação final

- [ ] `npx vitest run --project unit` → verde.
- [ ] `npm run test:a11y:todos` → verde, relatório regerado sem diff (determinístico).
- [ ] `npx tsc --noEmit` → limpo.
- [ ] Revisão do relatório: falhas atuais listadas por componente, prontas para a Fase 3 (linha de base).
