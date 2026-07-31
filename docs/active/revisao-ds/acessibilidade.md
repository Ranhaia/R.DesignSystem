# Acessibilidade de cor — contraste WCAG dos tokens (shadcn-local)

Data: 2026-07-22
Escopo: cálculo de razão de contraste WCAG 2.x para os pares texto/fundo definidos em `src/app/globals.css`, nos 5 temas (default + editorial/tech/soft/midnight), em light e dark (onde existe bloco dark). Documento **factual/calculado** — nenhuma cor nova é sugerida, apenas o que passa e o que não passa nos critérios AA/AAA.

---

## 0. Metodologia e script de conversão (auditável)

Os tokens estão em **OKLCH**, mas a fórmula de contraste do WCAG é definida sobre **luminância relativa em sRGB**. O `L` do OKLCH **não é** a luminância relativa — é preciso converter OKLCH → OKLab → sRGB linear e só então aplicar a fórmula de luminância relativa (`0.2126·R + 0.7152·G + 0.0722·B`) e a razão de contraste `(L1+0.05)/(L2+0.05)`.

Conversão usada (matrizes de referência de Björn Ottosson / CSS Color 4 — as mesmas usadas por `colorjs.io` e pelos navegadores):

```python
import math, re

def oklch_to_oklab(L, C, H):
    h = math.radians(H)
    a = C * math.cos(h)
    b = C * math.sin(h)
    return L, a, b

def oklab_to_linear_srgb(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r  = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g  = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return r, g, bb  # já são lineares (sem gamma) — não precisam de reconversão

def clamp01(x):
    return max(0.0, min(1.0, x))

def relative_luminance_from_linear(r, g, b):
    # Fora do gamut sRGB (negativo ou >1) é clampado, como um navegador
    # faria ao renderizar num display sRGB.
    r, g, b = clamp01(r), clamp01(g), clamp01(b)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def parse_oklch(s):
    m = re.match(r'oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)', s.strip())
    Lraw, C, H = m.groups()
    L = float(Lraw.rstrip('%'))
    if '%' in Lraw:
        L = L / 100.0
    return L, float(C), float(H)

def luminance(oklch_str):
    L, C, H = parse_oklch(oklch_str)
    r, g, b = oklab_to_linear_srgb(*oklch_to_oklab(L, C, H))
    return relative_luminance_from_linear(r, g, b)

def contrast(oklch_a, oklch_b):
    La, Lb = luminance(oklch_a), luminance(oklch_b)
    lighter, darker = max(La, Lb), min(La, Lb)
    return (lighter + 0.05) / (darker + 0.05)
```

**Verificação manual (sanity check) do script**, feita à mão para tokens acromáticos (C=0, onde a fórmula colapsa e pode ser conferida sem código): com `a=b=0`, as matrizes acima reduzem a `r=g=b=L³` (a soma dos coeficientes de cada linha da matriz OKLab→linear-sRGB é exatamente 1, então isso vale para qualquer L). Logo `luminância = L³` para tokens em cinza puro.
- `--foreground` (`oklch(0.145 0 0)`) vs `--background` (`oklch(1 0 0)`) no tema default/light: `0.145³ = 0.003049`; `1³ = 1`. Contraste = `(1+0.05)/(0.003049+0.05) = 19.79`. Confere com a saída do script.
- `--muted-foreground` (`oklch(0.556 0 0)`) vs `--muted` (`oklch(0.97 0 0)`): `0.556³ = 0.17188`; `0.97³ = 0.91267`. Contraste = `(0.91267+0.05)/(0.17188+0.05) = 4.34`. Confere.

Rodado com Python 3.10 em ambiente isolado (`/tmp/work/contrast.py`), lendo os valores literais extraídos de `src/app/globals.css`.

### 0.1 Herança resolvida (importante para os temas dark dos presets)

Os blocos `.dark[data-style="editorial|tech|soft"]` **não redefinem todos os tokens** — o que não é redefinido herda do `.dark` base (não de `:root`). Isso foi resolvido manualmente token a token, conferido contra a auditoria (`auditoria.md`, seção 3):
- `editorial`/`tech`/`soft` dark: `--background`/`--foreground`, `--destructive`/`--destructive-foreground` e `--sidebar`/`--sidebar-foreground` vêm do `.dark` base (não são sobrescritos por nenhum dos 3 presets no modo dark).
- `midnight` não tem bloco `.dark[data-style="midnight"]` — só existe o bloco light, que já é escuro por padrão. Por isso aqui só há **midnight/light** (não há "midnight/dark" a calcular; é a mesma leitura da auditoria).

### 0.2 Critérios reportados

- **AA texto normal**: razão ≥ 4.5:1
- **AA texto grande** (≥18pt/24px regular ou ≥14pt/18.66px bold): razão ≥ 3:1
- **AAA** (texto normal): razão ≥ 7:1

---

## 1. Default (`:root` / `.dark`)

### 1.1 Light

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` | `oklch(1 0 0)` → `oklch(0.145 0 0)` | 19.79 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.205 0 0)` → `oklch(0.985 0 0)` | 17.16 | ✅ | ✅ | ✅ |
| `--secondary-foreground` / `--secondary` | `oklch(0.97 0 0)` → `oklch(0.205 0 0)` | 16.42 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.97 0 0)` → `oklch(0.556 0 0)` | **4.34** | ❌ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.97 0 0)` → `oklch(0.205 0 0)` | 16.42 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(1 0 0)` → `oklch(0.145 0 0)` | 19.79 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(1 0 0)` → `oklch(0.145 0 0)` | 19.79 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` | `oklch(0.577 0.245 27.325)` → `oklch(0.985 0 0)` | 4.56 | ✅ | ✅ | ❌ |
| `--sidebar-foreground` / `--sidebar` | `oklch(0.985 0 0)` → `oklch(0.145 0 0)` | 18.96 | ✅ | ✅ | ✅ |

### 1.2 Dark

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` | `oklch(0.145 0 0)` → `oklch(0.985 0 0)` | 18.96 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.922 0 0)` → `oklch(0.205 0 0)` | 14.22 | ✅ | ✅ | ✅ |
| `--secondary-foreground` / `--secondary` | `oklch(0.269 0 0)` → `oklch(0.985 0 0)` | 14.48 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.269 0 0)` → `oklch(0.708 0 0)` | 5.83 | ✅ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.269 0 0)` → `oklch(0.985 0 0)` | 14.48 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(0.205 0 0)` → `oklch(0.985 0 0)` | 17.16 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(0.205 0 0)` → `oklch(0.985 0 0)` | 17.16 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` | `oklch(0.704 0.191 22.216)` → `oklch(0.985 0 0)` | **2.77** | ❌ | ❌ | ❌ |
| `--sidebar-foreground` / `--sidebar` | `oklch(0.205 0 0)` → `oklch(0.985 0 0)` | 17.16 | ✅ | ✅ | ✅ |

---

## 2. Editorial

### 2.1 Light

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` (herda `:root`) | `oklch(1 0 0)` → `oklch(0.145 0 0)` | 19.79 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.4 0.13 41)` → `oklch(0.98 0.016 73.684)` | 9.18 | ✅ | ✅ | ✅ |
| `--secondary-foreground` / `--secondary` | `oklch(0.95 0.02 60)` → `oklch(0.3 0.06 41)` | 11.99 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.96 0.015 60)` → `oklch(0.5 0.05 41)` | 5.44 | ✅ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.93 0.03 55)` → `oklch(0.3 0.06 41)` | 11.26 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(0.99 0.008 60)` → `oklch(0.3 0.06 41)` | 13.48 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(0.99 0.008 60)` → `oklch(0.3 0.06 41)` | 13.48 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` (herda `:root`) | `oklch(0.577 0.245 27.325)` → `oklch(0.985 0 0)` | 4.56 | ✅ | ✅ | ❌ |
| `--sidebar-foreground` / `--sidebar` (herda `:root`) | `oklch(0.985 0 0)` → `oklch(0.145 0 0)` | 18.96 | ✅ | ✅ | ✅ |

### 2.2 Dark

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` (herda `.dark` base) | `oklch(0.145 0 0)` → `oklch(0.985 0 0)` | 18.96 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.75 0.13 60)` → `oklch(0.2 0.04 41)` | 7.95 | ✅ | ✅ | ✅ |
| `--secondary-foreground` / `--secondary` | `oklch(0.27 0.02 60)` → `oklch(0.9 0.02 60)` | 11.18 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.28 0.03 41)` → `oklch(0.7 0.03 60)` | 5.48 | ✅ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.32 0.05 41)` → `oklch(0.95 0.02 60)` | 11.12 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(0.24 0.03 41)` → `oklch(0.95 0.02 60)` | 14.28 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(0.24 0.03 41)` → `oklch(0.95 0.02 60)` | 14.28 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` (herda `.dark` base) | `oklch(0.704 0.191 22.216)` → `oklch(0.985 0 0)` | **2.77** | ❌ | ❌ | ❌ |
| `--sidebar-foreground` / `--sidebar` (herda `.dark` base) | `oklch(0.205 0 0)` → `oklch(0.985 0 0)` | 17.16 | ✅ | ✅ | ✅ |

---

## 3. Tech

### 3.1 Light

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` (herda `:root`) | `oklch(1 0 0)` → `oklch(0.145 0 0)` | 19.79 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.488 0.243 264.376)` → `oklch(0.97 0.014 254.604)` | 6.26 | ✅ | ✅ | ❌ |
| `--secondary-foreground` / `--secondary` | `oklch(0.94 0.02 260)` → `oklch(0.21 0.006 285.885)` | 14.88 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.95 0.015 260)` → `oklch(0.5 0.02 260)` | 5.18 | ✅ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.92 0.025 258)` → `oklch(0.21 0.006 285.885)` | 14.00 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(0.99 0.005 260)` → `oklch(0.21 0.006 285.885)` | 17.23 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(0.99 0.005 260)` → `oklch(0.21 0.006 285.885)` | 17.23 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` (herda `:root`) | `oklch(0.577 0.245 27.325)` → `oklch(0.985 0 0)` | 4.56 | ✅ | ✅ | ❌ |
| `--sidebar-foreground` / `--sidebar` (herda `:root`) | `oklch(0.985 0 0)` → `oklch(0.145 0 0)` | 18.96 | ✅ | ✅ | ✅ |

### 3.2 Dark

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` (herda `.dark` base) | `oklch(0.145 0 0)` → `oklch(0.985 0 0)` | 18.96 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.75 0.16 255)` → `oklch(0.15 0.03 260)` | 8.60 | ✅ | ✅ | ✅ |
| `--secondary-foreground` / `--secondary` | `oklch(0.26 0.02 260)` → `oklch(0.9 0.02 260)` | 11.53 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.26 0.02 260)` → `oklch(0.65 0.02 260)` | 4.81 | ✅ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.3 0.03 260)` → `oklch(0.9 0.02 260)` | 10.12 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(0.22 0.015 260)` → `oklch(0.9 0.02 260)` | 12.85 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(0.22 0.015 260)` → `oklch(0.9 0.02 260)` | 12.85 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` (herda `.dark` base) | `oklch(0.704 0.191 22.216)` → `oklch(0.985 0 0)` | **2.77** | ❌ | ❌ | ❌ |
| `--sidebar-foreground` / `--sidebar` (herda `.dark` base) | `oklch(0.205 0 0)` → `oklch(0.985 0 0)` | 17.16 | ✅ | ✅ | ✅ |

---

## 4. Soft

### 4.1 Light

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` (herda `:root`) | `oklch(1 0 0)` → `oklch(0.145 0 0)` | 19.79 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.65 0.19 15)` → `oklch(0.99 0.01 15)` | **3.42** | ❌ | ✅ | ❌ |
| `--secondary-foreground` / `--secondary` | `oklch(0.96 0.03 15)` → `oklch(0.4 0.15 15)` | 8.67 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.97 0.02 15)` → `oklch(0.55 0.08 15)` | 4.57 | ✅ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.94 0.04 15)` → `oklch(0.4 0.15 15)` | 8.13 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(0.995 0.01 15)` → `oklch(0.4 0.15 15)` | 9.70 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(0.995 0.01 15)` → `oklch(0.4 0.15 15)` | 9.70 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` (herda `:root`) | `oklch(0.577 0.245 27.325)` → `oklch(0.985 0 0)` | 4.56 | ✅ | ✅ | ❌ |
| `--sidebar-foreground` / `--sidebar` (herda `:root`) | `oklch(0.985 0 0)` → `oklch(0.145 0 0)` | 18.96 | ✅ | ✅ | ✅ |

### 4.2 Dark

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` (herda `.dark` base) | `oklch(0.145 0 0)` → `oklch(0.985 0 0)` | 18.96 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.72 0.17 15)` → `oklch(0.2 0.05 15)` | 6.83 | ✅ | ✅ | ❌ |
| `--secondary-foreground` / `--secondary` | `oklch(0.28 0.04 15)` → `oklch(0.9 0.03 15)` | 10.88 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.3 0.04 15)` → `oklch(0.7 0.03 15)` | 5.12 | ✅ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.34 0.05 15)` → `oklch(0.92 0.02 15)` | 9.43 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(0.26 0.04 15)` → `oklch(0.92 0.02 15)` | 12.35 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(0.26 0.04 15)` → `oklch(0.92 0.02 15)` | 12.35 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` (herda `.dark` base) | `oklch(0.704 0.191 22.216)` → `oklch(0.985 0 0)` | **2.77** | ❌ | ❌ | ❌ |
| `--sidebar-foreground` / `--sidebar` (herda `.dark` base) | `oklch(0.205 0 0)` → `oklch(0.985 0 0)` | 17.16 | ✅ | ✅ | ✅ |

---

## 5. Midnight

Único preset sem bloco `.dark[data-style="midnight"]` próprio (ver auditoria, 3.4) — só há o bloco light abaixo, que já é escuro por si (sobrescreve `--background`/`--foreground` diretamente).

### 5.1 Light (único bloco existente)

| Combinação | Fundo → Texto (OKLCH) | Razão | AA normal (4.5:1) | AA grande (3:1) | AAA (7:1) |
|---|---|---|---|---|---|
| `--foreground` / `--background` | `oklch(0.16 0.015 280)` → `oklch(0.95 0.01 280)` | 16.77 | ✅ | ✅ | ✅ |
| `--primary-foreground` / `--primary` | `oklch(0.72 0.19 292.5)` → `oklch(0.98 0.01 292.5)` | **2.56** | ❌ | ❌ | ❌ |
| `--secondary-foreground` / `--secondary` | `oklch(0.26 0.02 280)` → `oklch(0.95 0.01 280)` | 13.45 | ✅ | ✅ | ✅ |
| `--muted-foreground` / `--muted` | `oklch(0.26 0.02 280)` → `oklch(0.68 0.02 280)` | 5.39 | ✅ | ✅ | ❌ |
| `--accent-foreground` / `--accent` | `oklch(0.28 0.03 280)` → `oklch(0.95 0.01 280)` | 12.66 | ✅ | ✅ | ✅ |
| `--card-foreground` / `--card` | `oklch(0.21 0.02 280)` → `oklch(0.95 0.01 280)` | 15.33 | ✅ | ✅ | ✅ |
| `--popover-foreground` / `--popover` | `oklch(0.21 0.02 280)` → `oklch(0.95 0.01 280)` | 15.33 | ✅ | ✅ | ✅ |
| `--destructive-foreground` / `--destructive` | `oklch(0.704 0.191 22.216)` → `oklch(0.985 0 0)` | **2.77** | ❌ | ❌ | ❌ |
| `--sidebar-foreground` / `--sidebar` | `oklch(0.13 0.015 280)` → `oklch(0.95 0.01 280)` | 17.38 | ✅ | ✅ | ✅ |

---

## 6. Resumo consolidado

81 combinações calculadas (9 pares × 9 temas/modos: default light/dark, editorial light/dark, tech light/dark, soft light/dark, midnight light).

| Critério | Passam | Falham |
|---|---|---|
| AA texto normal (4.5:1) | 73 | 8 |
| AA texto grande (3:1) | 75 | 6 |
| AAA (7:1) | 59 | 22 |

### 6.1 Combinações que falham em AA texto normal (4.5:1) — todas as 8 ocorrências

| Tema/modo | Combinação | Razão | Passa AA grande? |
|---|---|---|---|
| default / dark | `--destructive-foreground` / `--destructive` | 2.77 | ❌ |
| editorial / dark | `--destructive-foreground` / `--destructive` | 2.77 | ❌ |
| tech / dark | `--destructive-foreground` / `--destructive` | 2.77 | ❌ |
| soft / dark | `--destructive-foreground` / `--destructive` | 2.77 | ❌ |
| midnight / light | `--destructive-foreground` / `--destructive` | 2.77 | ❌ |
| midnight / light | `--primary-foreground` / `--primary` | 2.56 | ❌ |
| default / light | `--muted-foreground` / `--muted` | 4.34 | ✅ |
| soft / light | `--primary-foreground` / `--primary` | 3.42 | ✅ |

**Observações factuais sobre o padrão acima** (sem recomendação de correção):
- `--destructive-foreground`/`--destructive` falha AA normal e AA grande em **todo modo dark** (default, editorial, tech, soft) e também em midnight/light — porque midnight/light reaproveita, segundo a própria auditoria (seção 3.4), o mesmo valor de `--destructive` do `.dark` base (`oklch(0.704 0.191 22.216)`), e nenhum dos 4 presets redefine `--destructive-foreground` (permanece `oklch(0.985 0 0)`, quase branco) em nenhum modo dark. É a mesma combinação de cor (mesmos dois valores OKLCH) reaparecendo 5 vezes no dataset, com o mesmo resultado de 2.77:1.
- No modo light, `--destructive-foreground`/`--destructive` passa em todos os 4 temas que o têm definido (default, editorial, tech, soft — todos herdam `oklch(0.577 0.245 27.325)` → `oklch(0.985 0 0)` de `:root`, 4.56:1), mas fica abaixo de AAA.
- `--primary-foreground`/`--primary` falha AA normal em 2 dos 5 temas light (`soft`, `midnight`) — ambos usam texto quase branco sobre uma cor `--primary` de luminosidade intermediária (`L≈0.65-0.72` em OKLCH, croma alto).
- `--muted-foreground`/`--muted` só falha AA normal em `default/light` (4.34, a combinação mais próxima do limiar entre todas as 81); nos outros 8 temas/modos essa mesma combinação passa (ficam entre 4.57 e 5.83).

---

## 7. Rastro de dados brutos (JSON completo, saída do script)

Arquivo intermediário gerado em `/tmp/work/contrast.py` (ambiente de execução isolado), com as 9 estruturas de tema/modo e as 81 linhas calculadas, reproduzível a partir dos valores OKLCH citados nas tabelas acima (extraídos literalmente de `src/app/globals.css`, com a herança de `.dark`/`:root` resolvida conforme seção 0.1).
