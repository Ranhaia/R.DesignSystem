# shadcn/ui local — portal de estilos

Projeto Next.js (App Router + TypeScript + Tailwind CSS v4) com a biblioteca
completa de componentes do [shadcn/ui](https://ui.shadcn.com) instalada
localmente. Não é só uma vitrine de componentes: é um **portal para treinar
troca de identidade visual por folha de estilo** — 5 presets completos
(cor, fonte principal, fonte de título, radius e elevação) trocáveis em
tempo real, sem recarregar a página, para qualquer um dos 60 componentes.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para build de produção:

```bash
npm run build
npm run start
```

## Estrutura do portal

- **`/` (Visão geral)** — dashboard genérico (cards de estatística, tabela,
  abas, avatares, formulário) que existe só para servir de vitrine viva:
  ao trocar o estilo no seletor da sidebar, dá para ver o efeito nos tokens
  em vários componentes ao mesmo tempo.
- **`/estilo` (Folha de estilo)** — página dedicada ao preset ativo: mostra
  ao vivo qual fonte está resolvida em `--font-sans`/`--font-heading`,
  a escala tipográfica (H1–H6, corpo, legenda) e os swatches de cor
  (superfícies, ações, gráficos, sidebar) lidos diretamente do
  `getComputedStyle` do `<html>`, então reflete qualquer preset instantaneamente.
- **`/components/[slug]`** — uma página por componente (60 no total), cada
  uma com duas seções: **Composição** (as peças exportadas por aquele
  arquivo em `src/components/ui/`) e **Exemplos** (todas as variantes
  oficiais disponíveis, não só uma). Sumário lateral fixo (`Nesta página`)
  linka para as duas seções e, quando há mais de um exemplo, para cada
  exemplo individualmente.

## Os 5 presets de estilo

O seletor no topo da sidebar troca `data-style` na tag `<html>` e persiste
a escolha em `localStorage`. Cada preset é uma identidade completa, não só
paleta de cor:

| Preset | Fonte principal | Fonte de título | Cantos | Sombra |
|---|---|---|---|---|
| Padrão | Inter | Inter | médios | sutil |
| Editorial | Inter | **Lora** (serifada) | retos | quase nenhuma |
| Tech | Inter | JetBrains Mono | 90° (quinas vivas) | dura |
| Suave | Poppins | Poppins | bem arredondados | difusa |
| Midnight | Manrope | Manrope | médios | glow (sempre escuro) |

`midnight` força tema escuro independente do modo claro/escuro do sistema —
é o único preset que sobrescreve `background`/`foreground`/`card`/`border`
diretamente em vez de só cor primária.

Fontes carregadas via `next/font/google` em `src/app/layout.tsx` (Inter,
Lora, Space Grotesk, JetBrains Mono, Poppins, Manrope) — todas ficam
disponíveis o tempo todo como variável CSS; trocar de preset só troca qual
variável cada token (`--font-sans`, `--font-heading`) aponta.

## Sistema de tokens

Toda a identidade visual passa por **tokens semânticos** definidos como
variáveis CSS em `src/app/globals.css`. Componentes nunca usam valores
fixos (`bg-blue-600`, `rounded-lg`), eles usam papéis (`bg-primary`,
`rounded-[var(--radius)]`, `shadow-md`). Trocar a aparência inteira do app
é editar esse arquivo — nenhum componente precisa ser tocado.

Camadas, em ordem de precedência:

1. **`@theme inline`** — ponte entre token e classe utilitária Tailwind
   (`--primary` → `bg-primary`/`text-primary`). Normalmente não se mexe aqui.
2. **`:root`** — tokens base do tema claro (preset "Padrão").
3. **`.dark`** — overrides do tema escuro (classe `dark` na `<html>`).
4. **`[data-style="editorial|tech|soft"]`** (+ variante `.dark[data-style=...]`)
   — overrides de identidade por preset, em cima do claro/escuro ativo.
5. **`[data-style="midnight"]`** — único preset que ignora a camada
   claro/escuro e força seus próprios valores de superfície.

Grupos de tokens disponíveis:

| Grupo | Tokens | Uso típico |
|---|---|---|
| Base | `background`, `foreground` | fundo e texto padrão da página |
| Superfícies elevadas | `card`, `card-foreground`, `popover`, `popover-foreground` | cards, dropdowns, modais |
| Ações | `primary`, `secondary`, `accent` (+ `-foreground`) | botões, links, hover de menu |
| Apoio | `muted`, `muted-foreground` | texto secundário, placeholders |
| Erro | `destructive`, `destructive-foreground` | ações destrutivas, mensagens de erro |
| Estrutura | `border`, `input`, `ring`, `radius` | bordas, contornos de campo, anel de foco, raio |
| Elevação | `shadow-2xs` a `shadow-xl` | sombra de cards, popovers, modais |
| Tipografia | `font-sans`, `font-heading` | corpo de texto / títulos e headings |
| Gráficos | `chart-1` a `chart-5` | paleta usada pelo componente `chart.tsx` (recharts) |
| Sidebar | `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring` (+ `-foreground`) | tokens dedicados à sidebar, podem divergir do resto do app |

As cores usam **OKLCH** (`oklch(L C H)`). Para criar um preset novo, copie
um bloco `[data-style="..."]` inteiro em `globals.css` e ajuste
cor/fonte/radius/sombra juntos — é assim que se sente o efeito de "trocar
de fornecedor" em vez de só recolorir.

## Estrutura de pastas

```
src/
  app/
    layout.tsx              # fontes (next/font/google) + script anti-flash de estilo
    globals.css              # tokens de tema + 5 presets de identidade
    page.tsx                  # Visão geral (dashboard genérico)
    estilo/page.tsx            # Folha de estilo (fontes, escala tipográfica, cores)
    components/[slug]/page.tsx  # página de cada componente (Composição + Exemplos)
  components/
    ui/                         # os 60 componentes shadcn/ui
    sidebar-07/                 # navegação (seletor de estilo + índice de componentes)
    examples/                    # 208 exemplos oficiais + registry.tsx (import estático)
    app-shell.tsx                 # layout com sidebar, breadcrumb, header
    style-switcher.tsx             # dropdown de troca de preset
  hooks/
    use-mobile.ts, use-media-query.tsx, use-copy-to-clipboard.ts
  lib/
    components-registry.ts    # lista dos 60 componentes (slug + nome)
    composition-registry.ts    # peças exportadas por cada componente
    examples-mapping.ts         # slug → lista de exemplos disponíveis
    example-title.ts             # slug + nome de arquivo → título em PT-BR
    styles-registry.ts            # os 5 presets (label, swatch, descrição)
    utils.ts                       # helper cn() (clsx + tailwind-merge)
components.json              # configuração da CLI do shadcn (aliases, estilo new-york)
```

## Adicionar mais blocos ou componentes depois

```bash
npx shadcn@latest add <componente>
```

Componentes novos não entram automaticamente no portal — é preciso somar
uma entrada em `src/lib/components-registry.ts` (e, se fizer sentido,
`composition-registry.ts` / `examples-mapping.ts`) para aparecer na
sidebar e ganhar página própria em `/components/[slug]`.

## O que ficou de fora

- **`data-table-demo`** — depende de `@tanstack/react-table`, não instalado
  no projeto (fora do escopo de "componentes shadcn puros").
- **`calendar-hijri`** — variante de calendário com locale persa/Hijri,
  deixada de fora por ser um caso muito específico.
- Exemplos de formulário com **Formisch**/**TanStack Form**/**React 19
  Actions** (`form-formisch-*`, `form-tanstack-*`, `form-next-*`) — o
  portal usa só a linha `react-hook-form` + `zod`, que é a mais comum;
  os outros exigem libs adicionais não instaladas.
- `mode-toggle.tsx` e as páginas `typography-*` do repositório oficial —
  não fazem sentido como "exemplo de componente" isolado.

Se precisar de algum desses depois, dá para trazer sob demanda.
