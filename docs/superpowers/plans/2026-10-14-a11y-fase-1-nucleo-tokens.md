# Trava de acessibilidade, Fase 1 (núcleo de contraste + camada de tokens): plano de implementação

> **Para agentes:** executar tarefa a tarefa, na ordem. Cada tarefa termina com testes verdes e commit. Passos com checkbox (`- [ ]`).
> **Execução:** o orquestrador (Claude) despacha para AGY staffer / Haiku e revisa diff + saída dos testes entre tarefas.

**Goal:** um núcleo de contraste WCAG único (`src/lib/a11y/contraste.ts`) e um teste que calcula todos os pares de tokens nos 10 contextos (5 presets × claro/escuro) e gera `docs/a11y/contraste-tokens.md`.

**Architecture:** funções puras em TypeScript, sem dependência nova. O CSS de `src/app/globals.css` é lido como texto, os blocos de token são aplicados pela cascata real (especificidade + ordem de origem, todos sobre o mesmo elemento `<html>`, como faz `src/app/layout.tsx`), as cadeias de `var()` são resolvidas e cada par é medido. Cor com transparência é composta sobre o fundo do par antes da medida.

**Tech Stack:** TypeScript, Vitest (projeto `unit`, `environment: 'node'`, `include: src/**/*.test.ts`).

**Spec:** `docs/superpowers/specs/2026-10-14-trava-acessibilidade-design.md` (seções 2 e 3)

## Global Constraints

- Perfil Standard (AA): texto 4.5:1, interface 3:1.
- Razão **truncada** em 2 casas, nunca arredondada.
- Nenhuma dependência nova.
- **Nesta fase o teste de tokens NÃO reprova por contraste baixo**: ele reprova só quando um token não resolve ou um par/contexto não pode ser calculado. A reprovação por piso entra na Fase 3, junto com a linha de base. As falhas aparecem no relatório gerado.
- Não editar `src/app/globals.css` nem componentes.
- Todo texto (comentários, mensagens, relatório) em português do Brasil.
- Só tokens / nada fixo vale para componentes; não se aplica a este código de teste.

---

### Tarefa 1: Núcleo de contraste

**Files:**
- Create: `src/lib/a11y/perfil.ts`, `src/lib/a11y/contraste.ts`
- Test: `src/lib/a11y/contraste.test.ts`

**Interfaces:**
- Produces:
  - `type Rgba = { r: number; g: number; b: number; a: number }` (r,g,b em sRGB 0–1 com gama; a 0–1)
  - `parseCor(valor: string): Rgba | null` — aceita `#rgb`, `#rrggbb`, `#rrggbbaa`, `oklch(L C H)` e `oklch(L C H / A)` com L em número (0–1) ou `%`, A em número ou `%`
  - `compor(frente: Rgba, fundo: Rgba): Rgba` — alpha sobre fundo opaco
  - `luminancia(c: Rgba): number`
  - `razao(frente: string, fundo: string): number` — truncada; frente com alpha é composta sobre o fundo; lança erro se alguma cor não for entendida ou se o fundo tiver alpha < 1
  - `paraHex(c: Rgba): string` (`#RRGGBB`, maiúsculas)
  - `comLuminosidade(cor: string, L: number): string | null` — mesma matiz com outra luminosidade OKLCH
  - `corProximaQuePassa(cor: string, fundo: string, piso: number): string | null`
  - em `perfil.ts`: `export const PERFIL = "Standard (AA)"`, `export const PISOS = { texto: 4.5, ui: 3 } as const`, `export type Uso = keyof typeof PISOS`

- [ ] **Step 1: Teste (falhando)**

`src/lib/a11y/contraste.test.ts`:
```ts
import { describe, expect, it } from "vitest"
import { comLuminosidade, compor, corProximaQuePassa, paraHex, parseCor, razao } from "./contraste"

// sRGB (com gama) -> OKLCH, só para conferir matiz no teste.
function oklch(hex: string) {
  const c = parseCor(hex)!
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  const [r, g, b] = [lin(c.r), lin(c.g), lin(c.b)]
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return { L, C: Math.hypot(A, B), H: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 }
}

describe("parseCor", () => {
  it("entende hex curto, longo e com alpha", () => {
    expect(paraHex(parseCor("#fff")!)).toBe("#FFFFFF")
    expect(paraHex(parseCor("#1f6f5c")!)).toBe("#1F6F5C")
    expect(parseCor("#00000080")!.a).toBeCloseTo(0.502, 2)
  })
  it("entende oklch com número, porcentagem e alpha", () => {
    expect(paraHex(parseCor("oklch(1 0 0)")!)).toBe("#FFFFFF")
    expect(paraHex(parseCor("oklch(0% 0 0)")!)).toBe("#000000")
    expect(parseCor("oklch(1 0 0 / 10%)")!.a).toBeCloseTo(0.1, 5)
    expect(parseCor("oklch(0.5 0.22 292.5 / 0.4)")!.a).toBeCloseTo(0.4, 5)
  })
  it("devolve null para o que não entende", () => {
    expect(parseCor("var(--x)")).toBeNull()
    expect(parseCor("azul")).toBeNull()
    expect(parseCor("#12")).toBeNull()
  })
})

describe("razao", () => {
  it("preto e branco = 21", () => {
    expect(razao("#000000", "#FFFFFF")).toBe(21)
    expect(razao("#FFFFFF", "#000000")).toBe(21)
  })
  it("bate com valores de referência conhecidos", () => {
    expect(razao("#767676", "#FFFFFF")).toBe(4.54)
    expect(razao("#777777", "#FFFFFF")).toBe(4.47)
    // Pares registrados no próprio globals.css (comentário de 2026-07-30, que arredondava).
    expect(Math.abs(razao("#737373", "#F5F5F5") - 4.35)).toBeLessThanOrEqual(0.01)
    expect(Math.abs(razao("#6F6F6F", "#F5F5F5") - 4.61)).toBeLessThanOrEqual(0.01)
  })
  it("bate com o estudo de 2026-07-22 (tolerância de 0,01 porque o estudo arredondava)", () => {
    expect(Math.abs(razao("oklch(0.145 0 0)", "oklch(1 0 0)") - 19.79)).toBeLessThanOrEqual(0.01)
    expect(Math.abs(razao("oklch(0.556 0 0)", "oklch(0.97 0 0)") - 4.34)).toBeLessThanOrEqual(0.01)
  })
  it("trunca, nunca arredonda", () => {
    const r = razao("#777777", "#FFFFFF")
    expect(r).toBe(Math.floor(r * 100) / 100)
  })
  it("compõe a frente transparente sobre o fundo", () => {
    expect(razao("oklch(1 0 0 / 0%)", "#000000")).toBe(1)
    expect(razao("#FFFFFF80", "#000000")).toBe(razao(paraHex(compor(parseCor("#FFFFFF80")!, parseCor("#000000")!)), "#000000"))
  })
  it("lança erro com cor desconhecida ou fundo transparente", () => {
    expect(() => razao("azul", "#FFFFFF")).toThrow()
    expect(() => razao("#000000", "#FFFFFF80")).toThrow(/fundo/)
  })
})

describe("corProximaQuePassa", () => {
  const casos: [string, string, number][] = [
    ["#7FD3B8", "#FFFFFF", 4.5],  // verde claro, texto branco não lê
    ["#FFD54F", "#FFFFFF", 4.5],  // amarelo
    ["#1F6F5C", "#000000", 4.5],  // escuro contra preto: precisa clarear
    ["#E57373", "#FFFFFF", 3],
  ]
  it.each(casos)("%s contra %s (piso %s) devolve cor que passa", (cor, fundo, piso) => {
    const s = corProximaQuePassa(cor, fundo, piso)!
    expect(s).toMatch(/^#[0-9A-F]{6}$/)
    expect(razao(s, fundo)).toBeGreaterThanOrEqual(piso)
  })
  it.each(casos)("%s mantém a matiz", (cor, fundo, piso) => {
    const s = corProximaQuePassa(cor, fundo, piso)!
    const d = Math.abs(oklch(s).H - oklch(cor).H)
    expect(Math.min(d, 360 - d)).toBeLessThan(2)
  })
  it.each(casos)("%s: não existe luminosidade mais próxima que também passe", (cor, fundo, piso) => {
    const s = corProximaQuePassa(cor, fundo, piso)!
    const L0 = oklch(cor).L
    const dSug = Math.abs(oklch(s).L - L0)
    // Varredura fina: nenhum passo de L mais perto que a sugestão passa (folga de 0,01 pelo arredondamento do hex).
    for (let i = 0; i <= 400; i++) {
      const L = i / 400
      if (Math.abs(L - L0) >= dSug - 0.01) continue
      const t = comLuminosidade(cor, L)
      if (t) expect(razao(t, fundo)).toBeLessThan(piso)
    }
  })
  it("devolve a própria cor quando ela já passa", () => {
    expect(corProximaQuePassa("#1F6F5C", "#FFFFFF", 4.5)).toBe("#1F6F5C")
  })
  it("devolve null quando nenhuma luminosidade passa", () => {
    expect(corProximaQuePassa("#777777", "#777777", 21)).toBeNull()
  })
})
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run --project unit src/lib/a11y/contraste.test.ts` → Expected: FAIL (módulo inexistente).

- [ ] **Step 3: Implementar**

`src/lib/a11y/perfil.ts`:
```ts
// Perfil de conformidade do DS (A11Y.md / DA11Y.md, Seção 0.1). Trocar de perfil é decisão registrada no A11Y-DECISIONS.md.
export const PERFIL = "Standard (AA)"
export const PISOS = { texto: 4.5, ui: 3 } as const
export type Uso = keyof typeof PISOS
```

`src/lib/a11y/contraste.ts`:
```ts
// Contraste WCAG 2.x calculado sobre os valores dos tokens. Usado pela trava (testes) e pela tela (SeletorDeCor):
// os dois nunca discordam porque é a mesma função. Matrizes OKLab de Björn Ottosson (CSS Color 4).

export type Rgba = { r: number; g: number; b: number; a: number }

const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
const gama = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)
const clamp = (v: number) => Math.min(1, Math.max(0, v))

function oklabParaLinear(L: number, a: number, b: number) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

function linearParaOklab(r: number, g: number, b: number) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

const num = (t: string, escalaPct: number) => (t.endsWith("%") ? (parseFloat(t) / 100) * escalaPct : parseFloat(t))

export function parseCor(valor: string): Rgba | null {
  const v = valor.trim()
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)
  if (hex) {
    let h = hex[1]
    if (h.length === 3) h = [...h].map((c) => c + c).join("")
    const p = (i: number) => parseInt(h.slice(i, i + 2), 16) / 255
    return { r: p(0), g: p(2), b: p(4), a: h.length === 8 ? p(6) : 1 }
  }
  const ok = v.match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+%?))?\s*\)$/i)
  if (ok) {
    const L = num(ok[1], 1)
    const C = num(ok[2], 0.4)
    const H = (parseFloat(ok[3]) * Math.PI) / 180
    const [r, g, b] = oklabParaLinear(L, C * Math.cos(H), C * Math.sin(H))
    // Fora do gamut sRGB é cortado, como o navegador faz ao pintar num monitor sRGB.
    return { r: clamp(gama(clamp(r))), g: clamp(gama(clamp(g))), b: clamp(gama(clamp(b))), a: ok[4] ? clamp(num(ok[4], 1)) : 1 }
  }
  return null
}

export function compor(frente: Rgba, fundo: Rgba): Rgba {
  const mix = (f: number, b: number) => f * frente.a + b * (1 - frente.a)
  return { r: mix(frente.r, fundo.r), g: mix(frente.g, fundo.g), b: mix(frente.b, fundo.b), a: 1 }
}

export const luminancia = (c: Rgba) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b)

export function razao(frente: string, fundo: string): number {
  const f = parseCor(frente), b = parseCor(fundo)
  if (!f) throw new Error(`cor não entendida: ${frente}`)
  if (!b) throw new Error(`cor não entendida: ${fundo}`)
  if (b.a < 1) throw new Error(`o fundo precisa ser opaco: ${fundo}`)
  const [l1, l2] = [luminancia(compor(f, b)), luminancia(b)].sort((x, y) => y - x)
  // Folga de 1e-9 só para erro de ponto flutuante (4.5 calculado como 4.4999999); fora isso, trunca.
  return Math.floor(((l1 + 0.05) / (l2 + 0.05)) * 100 + 1e-9) / 100
}

export function paraHex(c: Rgba): string {
  const h = (v: number) => Math.round(clamp(v) * 255).toString(16).padStart(2, "0")
  return `#${h(c.r)}${h(c.g)}${h(c.b)}`.toUpperCase()
}

// A cor com outra luminosidade OKLCH, mesma matiz; reduz o croma só se sair do gamut sRGB.
export function comLuminosidade(cor: string, L: number): string | null {
  const c = parseCor(cor)
  if (!c) return null
  const [, a, b] = linearParaOklab(lin(c.r), lin(c.g), lin(c.b))
  const dentro = (k: number) => oklabParaLinear(L, a * k, b * k).every((v) => v >= -1e-4 && v <= 1 + 1e-4)
  let k = 1
  if (!dentro(1)) {
    let lo = 0, hi = 1
    for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; if (dentro(mid)) lo = mid; else hi = mid }
    k = lo
  }
  const [r, g, bb] = oklabParaLinear(L, a * k, b * k)
  return paraHex({ r: gama(clamp(r)), g: gama(clamp(g)), b: gama(clamp(bb)), a: 1 })
}

export function corProximaQuePassa(cor: string, fundo: string, piso: number): string | null {
  const c = parseCor(cor)
  if (!c) return null
  if (razao(paraHex(c), fundo) >= piso) return paraHex(c)
  const [L0] = linearParaOklab(lin(c.r), lin(c.g), lin(c.b))
  const passa = (L: number) => { const t = comLuminosidade(cor, L); return t !== null && razao(t, fundo) >= piso }
  // Para cada lado, busca binária do ponto em que começa a passar (o contraste cresce ao se afastar do fundo).
  const buscar = (extremo: number) => {
    if (!passa(extremo)) return null
    let longe = extremo, perto = L0
    for (let i = 0; i < 40; i++) { const mid = (longe + perto) / 2; if (passa(mid)) longe = mid; else perto = mid }
    return longe
  }
  const opcoes = [buscar(0), buscar(1)].filter((L): L is number => L !== null)
  if (!opcoes.length) return null
  const L = opcoes.reduce((m, x) => (Math.abs(x - L0) < Math.abs(m - L0) ? x : m))
  return comLuminosidade(cor, L)
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run --project unit src/lib/a11y/contraste.test.ts` → Expected: todos passam. Se um valor de referência divergir em 0,01 por truncamento vs. a referência publicada (ex.: 4.54), investigue antes de mexer no teste: a referência está certa e quem erra é a conversão.

- [ ] **Step 5: Commit**

```bash
git add src/lib/a11y/perfil.ts src/lib/a11y/contraste.ts src/lib/a11y/contraste.test.ts
git commit -m "feat(a11y): núcleo de contraste WCAG com cor próxima que passa"
```

---

### Tarefa 2: Leitura dos tokens pela cascata real

**Files:**
- Create: `src/lib/a11y/css-tokens.ts`
- Test: `src/lib/a11y/css-tokens.test.ts`

**Interfaces:**
- Consumes: nada da Tarefa 1.
- Produces:
  - `type Contexto = { preset: "default" | "editorial" | "tech" | "soft" | "midnight"; modo: "claro" | "escuro" }`
  - `CONTEXTOS: Contexto[]` (10, ordem: default, editorial, tech, soft, midnight; claro antes de escuro)
  - `nomeContexto(c: Contexto): string` → ex. `"editorial/escuro"`
  - `lerBlocos(css: string): Bloco[]` (`type Bloco = { seletor: string; ordem: number; decl: Record<string, string> }`)
  - `tokensDoContexto(blocos: Bloco[], c: Contexto): Record<string, string>` — tokens brutos após a cascata
  - `resolver(tokens: Record<string, string>, nome: string): string` — segue `var(--x)` e `var(--x, fallback)`; lança erro com a cadeia se não resolver ou houver ciclo

Regras:
- Instruções soltas terminadas em `;` antes de um bloco (`@import`, `@custom-variant`) não entram no seletor.
- Só blocos de nível superior; blocos que começam com `@` (`@theme`, `@layer`, `@media`, `@custom-variant`) são ignorados por inteiro.
- Comentários `/* … */` removidos antes.
- Seletor com vírgula: cada parte é avaliada.
- Uma parte casa com o contexto se for composta só de `:root`, `.dark`, `[data-style="x"]` (ou `'x'`), todos sobre o mesmo elemento `<html>`: `.dark` exige modo escuro; `[data-style="x"]` exige preset `x`; `:root` casa sempre. Qualquer outro seletor simples (`html`, `body`, `.foo`, `*`, espaço/combinador) → não casa.
- O preset `default` corresponde a nenhum `[data-style]`, ou a `[data-style="default"]` se existir.
- Especificidade = número de seletores simples da parte (todos valem 0,1,0). Aplicar em ordem crescente de (especificidade, ordem no arquivo); o último vence.

- [ ] **Step 1: Teste (falhando)**

`src/lib/a11y/css-tokens.test.ts`:
```ts
import { describe, expect, it } from "vitest"
import { CONTEXTOS, lerBlocos, nomeContexto, resolver, tokensDoContexto } from "./css-tokens"

const CSS = `
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));
@theme inline { --color-primary: var(--primary); }
/* comentário com { chaves } */
:root { --a: #111111; --b: var(--a); --c: #FFFFFF; --x: var(--nada, #222222); }
.dark { --a: #EEEEEE; --c: #000000; }
[data-style="tech"] { --a: #00FF00; --d: #123456; }
.dark[data-style="tech"] { --c: #0000FF; }
body .dark { --a: #FF0000; }
html, :root.dark { --e: #ABCDEF; }
@media (prefers-color-scheme: dark) { :root { --a: #999999; } }
`

describe("css-tokens", () => {
  const blocos = lerBlocos(CSS)
  const t = (preset: string, modo: string) => tokensDoContexto(blocos, { preset, modo } as never)

  it("tem 10 contextos", () => {
    expect(CONTEXTOS).toHaveLength(10)
    expect(CONTEXTOS.map(nomeContexto)).toContain("midnight/escuro")
  })
  it("ignora @theme, @media e comentários", () => {
    expect(t("default", "claro")["--color-primary"]).toBeUndefined()
    expect(t("default", "claro")["--a"]).toBe("#111111")
  })
  it("modo escuro sobrescreve o :root", () => {
    expect(t("default", "escuro")["--a"]).toBe("#EEEEEE")
  })
  it("preset claro vence o .dark por vir depois com a mesma especificidade", () => {
    expect(t("tech", "escuro")["--a"]).toBe("#00FF00")
  })
  it(".dark[data-style] vence tudo", () => {
    expect(t("tech", "escuro")["--c"]).toBe("#0000FF")
    expect(t("tech", "claro")["--c"]).toBe("#FFFFFF")
  })
  it("seletor com combinador não casa; :root.dark casa no escuro", () => {
    expect(t("default", "escuro")["--a"]).toBe("#EEEEEE")
    expect(t("default", "escuro")["--e"]).toBe("#ABCDEF")
    expect(t("default", "claro")["--e"]).toBeUndefined()
  })
  it("resolve cadeia de var() e fallback", () => {
    expect(resolver(t("default", "claro"), "--b")).toBe("#111111")
    expect(resolver(t("default", "claro"), "--x")).toBe("#222222")
  })
  it("erro quando não resolve ou há ciclo", () => {
    expect(() => resolver(t("default", "claro"), "--inexistente")).toThrow(/--inexistente/)
    expect(() => resolver({ "--p": "var(--q)", "--q": "var(--p)" }, "--p")).toThrow(/ciclo/)
  })
})
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run --project unit src/lib/a11y/css-tokens.test.ts` → Expected: FAIL.

- [ ] **Step 3: Implementar**

`src/lib/a11y/css-tokens.ts`:
```ts
// Tokens do globals.css aplicados pela cascata real: preset e modo ficam os dois no <html> (src/app/layout.tsx),
// então só especificidade e ordem decidem quem vence.

export type Contexto = { preset: "default" | "editorial" | "tech" | "soft" | "midnight"; modo: "claro" | "escuro" }
export type Bloco = { seletor: string; ordem: number; decl: Record<string, string> }

const PRESETS: Contexto["preset"][] = ["default", "editorial", "tech", "soft", "midnight"]
export const CONTEXTOS: Contexto[] = PRESETS.flatMap((preset) => (["claro", "escuro"] as const).map((modo) => ({ preset, modo })))
export const nomeContexto = (c: Contexto) => `${c.preset}/${c.modo}`

export function lerBlocos(css: string): Bloco[] {
  const s = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const blocos: Bloco[] = []
  let i = 0, ordem = 0
  while (i < s.length) {
    const abre = s.indexOf("{", i)
    if (abre < 0) break
    // Instruções soltas antes do bloco (@import …; @custom-variant …;) não fazem parte do seletor.
    const seletor = s.slice(i, abre).split(";").pop()!.trim()
    let prof = 1, j = abre + 1
    while (j < s.length && prof > 0) { if (s[j] === "{") prof++; else if (s[j] === "}") prof--; j++ }
    if (!seletor.startsWith("@")) {
      const corpo = s.slice(abre + 1, j - 1)
      const decl: Record<string, string> = {}
      for (const m of corpo.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) decl[m[1]] = m[2].trim()
      blocos.push({ seletor, ordem: ordem++, decl })
    }
    i = j
  }
  return blocos
}

// Devolve a especificidade se a parte do seletor casa com o contexto; null se não casa.
function casa(parte: string, c: Contexto): number | null {
  const p = parte.trim()
  const simples = p.match(/:root|\.dark|\[data-style=["']?[\w-]+["']?\]/g) ?? []
  if (simples.join("") !== p.replace(/\s+/g, "")) return null
  if (/\s/.test(p)) return null
  for (const s of simples) {
    if (s === ".dark" && c.modo !== "escuro") return null
    const st = s.match(/\[data-style=["']?([\w-]+)["']?\]/)
    if (st && st[1] !== c.preset) return null
  }
  return simples.length
}

export function tokensDoContexto(blocos: Bloco[], c: Contexto): Record<string, string> {
  const aplicaveis = blocos
    .map((b) => ({ b, esp: Math.max(-1, ...b.seletor.split(",").map((p) => casa(p, c) ?? -1)) }))
    .filter((x) => x.esp >= 0)
    .sort((x, y) => x.esp - y.esp || x.b.ordem - y.b.ordem)
  return Object.assign({}, ...aplicaveis.map((x) => x.b.decl))
}

export function resolver(tokens: Record<string, string>, nome: string, cadeia: string[] = []): string {
  if (cadeia.includes(nome)) throw new Error(`ciclo de var(): ${[...cadeia, nome].join(" → ")}`)
  const v = tokens[nome]
  if (v === undefined) throw new Error(`token não definido: ${[...cadeia, nome].join(" → ")}`)
  const m = v.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\)$/)
  if (!m) return v
  if (tokens[m[1]] === undefined && m[2] !== undefined) return m[2].trim()
  return resolver(tokens, m[1], [...cadeia, nome])
}
```

Atenção ao teste `seletor com combinador`: `body .dark` tem espaço → não casa. `html, :root.dark` → `html` não casa, `:root.dark` casa com especificidade 2 no escuro.

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run --project unit src/lib/a11y/css-tokens.test.ts` → Expected: todos passam.

- [ ] **Step 5: Commit**

```bash
git add src/lib/a11y/css-tokens.ts src/lib/a11y/css-tokens.test.ts
git commit -m "feat(a11y): leitura dos tokens pela cascata real dos presets"
```

---

### Tarefa 3: Pares, medição dos 10 contextos e relatório

**Files:**
- Create: `src/lib/a11y/pares.ts`, `src/lib/a11y/medir-tokens.ts`, `src/lib/a11y/tokens.test.ts`
- Generated (commitado): `docs/a11y/contraste-tokens.md`

**Interfaces:**
- Consumes: `razao`, `PISOS`, `Uso` (Tarefa 1); `CONTEXTOS`, `nomeContexto`, `lerBlocos`, `tokensDoContexto`, `resolver` (Tarefa 2)
- Produces (usado na Fase 3, linha de base):
  - `type Par = { grupo: string; frente: string; fundo: string; uso: Uso; wcag: string; duvida?: string }`
  - `PARES: Par[]`
  - `type Medida = { id: string; contexto: string; par: Par; frente: string; fundo: string; razao: number; piso: number; passa: boolean }` com `id = "token:<contexto>:<frente>/<fundo>"` (nomes sem `--`)
  - `medirTokens(css: string): { medidas: Medida[]; erros: string[] }`
  - `relatorioTokens(medidas: Medida[]): string` (Markdown)

- [ ] **Step 1: Pares**

`src/lib/a11y/pares.ts`:
```ts
import type { Uso } from "./perfil"

export type Par = { grupo: string; frente: string; fundo: string; uso: Uso; wcag: string; duvida?: string }

const p = (grupo: string, uso: Uso, wcag: string, pares: [string, string][], duvida?: string): Par[] =>
  pares.map(([frente, fundo]) => ({ grupo, frente, fundo, uso, wcag, duvida }))

const BORDA =
  "Com rótulo visível, a borda pode não ser o único limite do campo (SC 1.4.11). Reprovação vira dúvida no A11Y-DECISIONS.md."

// Controle desabilitado é isento de contraste pela WCAG e por isso não aparece aqui.
export const PARES: Par[] = [
  ...p("Texto base", "texto", "1.4.3", [["--foreground", "--background"], ["--card-foreground", "--card"], ["--popover-foreground", "--popover"]]),
  ...p("Texto em ação", "texto", "1.4.3", [["--primary-foreground", "--primary"], ["--secondary-foreground", "--secondary"], ["--accent-foreground", "--accent"], ["--destructive-foreground", "--destructive"]]),
  ...p("Texto de apoio", "texto", "1.4.3", [["--muted-foreground", "--background"], ["--muted-foreground", "--muted"], ["--muted-foreground", "--card"]]),
  ...p("Menu lateral", "texto", "1.4.3", [["--sidebar-foreground", "--sidebar"], ["--sidebar-primary-foreground", "--sidebar-primary"], ["--sidebar-accent-foreground", "--sidebar-accent"]]),
  ...p("IA", "texto", "1.4.3", [["--ai-text-high", "--ai-surface"], ["--ai-text-low", "--ai-surface"]]),
  ...p("Limite de controle", "ui", "1.4.11", [["--input", "--background"], ["--border", "--background"]], BORDA),
  ...p("Foco", "ui", "1.4.11 / 2.4.7", [["--ring", "--background"], ["--ring", "--card"], ["--sidebar-ring", "--sidebar"]]),
  ...p("Ação contra a página", "ui", "1.4.11", [["--primary", "--background"], ["--destructive", "--background"]]),
]
```

- [ ] **Step 2: Teste (falhando)**

`src/lib/a11y/tokens.test.ts`:
```ts
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { CONTEXTOS } from "./css-tokens"
import { medirTokens, relatorioTokens } from "./medir-tokens"
import { PARES } from "./pares"

const CSS = readFileSync(resolve(__dirname, "../../app/globals.css"), "utf8")

describe("contraste dos tokens (perfil AA)", () => {
  const { medidas, erros } = medirTokens(CSS)

  it("todo par resolve em todos os 10 contextos", () => {
    expect(erros).toEqual([])
    expect(medidas).toHaveLength(PARES.length * CONTEXTOS.length)
  })

  it("ids são únicos e estáveis", () => {
    expect(new Set(medidas.map((m) => m.id)).size).toBe(medidas.length)
    expect(medidas[0].id).toMatch(/^token:default\/claro:[\w-]+\/[\w-]+$/)
  })

  it("gera o relatório docs/a11y/contraste-tokens.md", () => {
    const md = relatorioTokens(medidas)
    expect(md).toContain("# Contraste dos tokens")
    expect(md).toContain("default/escuro")
    mkdirSync(resolve(__dirname, "../../../docs/a11y"), { recursive: true })
    writeFileSync(resolve(__dirname, "../../../docs/a11y/contraste-tokens.md"), md)
  })

  // Fase 1: a reprovação por piso entra com a linha de base (Fase 3). Aqui só se mede.
})

describe("medirTokens com CSS sintético", () => {
  it("compõe borda transparente sobre o fundo e reporta falha", () => {
    const css = `:root { --background: #FFFFFF; --border: oklch(0 0 0 / 10%); --foreground: #000000; }`
    const { medidas } = medirTokens(css, [{ grupo: "t", frente: "--border", fundo: "--background", uso: "ui", wcag: "1.4.11" }, { grupo: "t", frente: "--foreground", fundo: "--background", uso: "texto", wcag: "1.4.3" }])
    const borda = medidas.find((m) => m.par.frente === "--border" && m.contexto === "default/claro")!
    expect(borda.passa).toBe(false)
    expect(borda.razao).toBeLessThan(3)
    expect(medidas.find((m) => m.par.frente === "--foreground" && m.contexto === "default/claro")!.razao).toBe(21)
  })
  it("token ausente vira erro com contexto e cadeia", () => {
    const { erros } = medirTokens(`:root { --background: #FFFFFF; }`, [{ grupo: "t", frente: "--nada", fundo: "--background", uso: "texto", wcag: "1.4.3" }])
    expect(erros[0]).toMatch(/default\/claro.*--nada/)
  })
})
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `npx vitest run --project unit src/lib/a11y/tokens.test.ts` → Expected: FAIL (módulo `medir-tokens` inexistente).

- [ ] **Step 4: Implementar**

`src/lib/a11y/medir-tokens.ts`:
```ts
import { razao } from "./contraste"
import { CONTEXTOS, lerBlocos, nomeContexto, resolver, tokensDoContexto } from "./css-tokens"
import { PARES, type Par } from "./pares"
import { PERFIL, PISOS } from "./perfil"

export type Medida = { id: string; contexto: string; par: Par; frente: string; fundo: string; razao: number; piso: number; passa: boolean }

const semTraco = (t: string) => t.replace(/^--/, "")

export function medirTokens(css: string, pares: Par[] = PARES) {
  const blocos = lerBlocos(css)
  const medidas: Medida[] = []
  const erros: string[] = []
  for (const c of CONTEXTOS) {
    const contexto = nomeContexto(c)
    const tokens = tokensDoContexto(blocos, c)
    for (const par of pares) {
      try {
        const frente = resolver(tokens, par.frente)
        const fundo = resolver(tokens, par.fundo)
        const r = razao(frente, fundo)
        const piso = PISOS[par.uso]
        medidas.push({ id: `token:${contexto}:${semTraco(par.frente)}/${semTraco(par.fundo)}`, contexto, par, frente, fundo, razao: r, piso, passa: r >= piso })
      } catch (e) {
        erros.push(`${contexto} · ${par.frente} / ${par.fundo}: ${(e as Error).message}`)
      }
    }
  }
  return { medidas, erros }
}

const fmt = (n: number) => n.toFixed(2).replace(".", ",")

export function relatorioTokens(medidas: Medida[]): string {
  const falhas = medidas.filter((m) => !m.passa)
  const linhas = [
    "# Contraste dos tokens",
    "",
    `Gerado por \`src/lib/a11y/tokens.test.ts\`. Não editar à mão. Perfil: **${PERFIL}** (texto ${fmt(PISOS.texto)}:1, interface ${fmt(PISOS.ui)}:1). Razão truncada, nunca arredondada. Cor com transparência composta sobre o fundo. Controle desabilitado é isento (WCAG) e não é medido.`,
    "",
    `**${medidas.length} medidas, ${falhas.length} abaixo do piso.**`,
    "",
  ]
  for (const contexto of [...new Set(medidas.map((m) => m.contexto))]) {
    linhas.push(`## ${contexto}`, "", "| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |", "|---|---|---|---|---|---|---|")
    for (const m of medidas.filter((x) => x.contexto === contexto)) {
      const res = m.passa ? "passa" : m.par.duvida ? "**dúvida**" : "**reprova**"
      linhas.push(`| ${m.par.grupo} | \`${m.par.frente}\` / \`${m.par.fundo}\` | \`${m.frente}\` | \`${m.fundo}\` | ${fmt(m.razao)} | ${fmt(m.piso)} | ${res} |`)
    }
    linhas.push("")
  }
  const duvidas = [...new Set(medidas.filter((m) => !m.passa && m.par.duvida).map((m) => m.par.duvida!))]
  if (duvidas.length) linhas.push("## Dúvidas de leitura do critério", "", ...duvidas.map((d) => `- ${d}`), "")
  return linhas.join("\n")
}
```

- [ ] **Step 5: Rodar e ver passar**

Run: `npx vitest run --project unit` → Expected: todos passam (incluindo `design-tokens.test.ts` e os demais já existentes). Se `todo par resolve` falhar, **não** remova o par da lista: relate quais tokens não existem em quais contextos (pode ser token que um preset não define e deveria herdar, ou nome errado na lista). O orquestrador decide.

- [ ] **Step 6: Conferir o relatório**

Abra `docs/a11y/contraste-tokens.md` e confira à mão 3 linhas contra o estudo de 2026-07-22 (`docs/active/revisao-ds/acessibilidade.md`): `default/claro` `--foreground`/`--background`, `default/claro` `--muted-foreground`/`--muted` (o token mudou em 2026-07-30 para `#6F6F6F`: espere 4,61) e um par de `editorial/escuro`. Relate as diferenças com o estudo, principalmente nos contextos escuros dos presets (o estudo assumiu herança do `.dark` base; a cascata real dá prioridade ao bloco claro do preset).

- [ ] **Step 7: Commit**

```bash
git add src/lib/a11y/pares.ts src/lib/a11y/medir-tokens.ts src/lib/a11y/tokens.test.ts docs/a11y/contraste-tokens.md
git commit -m "feat(a11y): contraste dos tokens nos 10 contextos com relatório gerado"
```

---

## Definição de pronto da Fase 1

- `npx vitest run --project unit` verde e `npx tsc --noEmit` sem erro.
- `docs/a11y/contraste-tokens.md` gerado com 10 contextos × 22 pares.
- Relato das diferenças entre o relatório e o estudo de julho.
