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
variáveis CSS: cor em `src/app/tokens-cor.css` (gerado, ver abaixo) e o
resto (raio, sombra, fonte, movimento) em `src/app/globals.css`, que importa
o primeiro. Componentes nunca usam valores
fixos (`bg-blue-600`, `rounded-lg`), eles usam papéis (`bg-primary`,
`rounded-[var(--radius)]`, `shadow-md`). Trocar a aparência inteira do app
é editar esses tokens — nenhum componente precisa ser tocado.

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
| Movimento | `duration-motion-fast/base/slow`, `ease-spring`, `ease-out-expo`, `ease-in-out-smooth`, `active:scale-(--scale-pressed)` | duração e curva das transições, encolher ao pressionar |
| Gráficos | `chart-1` a `chart-5` | paleta usada pelo componente `chart.tsx` (recharts) |
| Sidebar | `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring` (+ `-foreground`) | tokens dedicados à sidebar, podem divergir do resto do app |

As cores **não se editam à mão**: cada preset tem uma cor-fonte em
`src/lib/cor/presets.ts`, e `npm run tokens:gerar` gera o
`src/app/tokens-cor.css` com todos os papéis já no contraste AA (claro e
escuro). Ajuste pontual entra como sobrescrita, com motivo, no mesmo
arquivo. Para criar um preset novo: cor-fonte em `presets.ts` + bloco
`[data-style="..."]` em `globals.css` com fonte/radius/sombra — é assim
que se sente o efeito de "trocar de fornecedor" em vez de só recolorir.

## Estrutura de pastas

```
src/
  app/
    layout.tsx              # fontes (next/font/google) + script anti-flash de estilo
    globals.css              # tokens (raio, sombra, fonte, movimento) + 5 presets
    tokens-cor.css           # cores geradas por src/lib/cor (não editar)
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

## Estrutura de pastas para novos projetos (receita)

Este portal é o catálogo/vitrine do Design System — não é onde as telas de
produto são construídas. Quando for iniciar um **projeto novo** (protótipo
de cliente, produto real) que consome este DS, a receita abaixo é o ponto
de partida: mesma stack (Next.js App Router + TypeScript + Tailwind v4),
convenção de pastas já validada aqui, adaptada para crescer por
funcionalidade em vez de crescer só por tipo de arquivo.

```
src/
  app/                        # rotas (App Router) — cada pasta = 1 rota
    (auth)/                    # grupo de rotas sem afetar a URL (ex.: login, recuperação de senha)
      login/page.tsx
    (app)/                      # grupo de rotas autenticadas
      dashboard/page.tsx
      apolices/
        page.tsx                  # lista
        [id]/page.tsx               # detalhe
    layout.tsx                    # fontes + shell global
    globals.css                    # tokens copiados deste DS (ver abaixo)
    tokens-cor.css                  # cores copiadas deste DS (importado pelo globals.css)
  components/
    ui/                          # ATOMS/MOLECULES/ORGANISMS — vêm direto deste DS,
                                   # copiados via `npx shadcn@latest add` (ver "Como importar")
    patterns/                     # Patterns deste DS (Empty State, CRUD, Upload etc.),
                                    # copiados sob demanda, igual a ui/
    <feature>/                     # componentes que só fazem sentido numa feature
                                     # específica (ex.: apolices/apolice-card.tsx),
                                     # nunca promovidos a ui/ sem ser genéricos de verdade
  hooks/                          # hooks reutilizáveis entre features
  lib/
    utils.ts                       # cn() e outros helpers puros
    api/                             # camada de acesso a dados (fetch/axios/client de API)
      client.ts
      apolices.ts                     # 1 arquivo por recurso/domínio
    validations/                       # schemas zod, 1 arquivo por formulário/recurso
  types/                             # tipos TypeScript compartilhados entre features
components.json                     # config da CLI do shadcn (copiar deste projeto)
```

**Por que agrupar por feature dentro de `app/` e não por tipo de arquivo**
(diferente do que uma estrutura genérica tipo `pages/`, `services/`,
`redux/` sugeriria): o App Router já força colocation de rota, então
`apolices/apolice-card.tsx` ao lado de `apolices/page.tsx` mantém junto o
que muda junto — é mais fácil escalar (adicionar uma feature nova = uma
pasta nova) do que caçar 5 pastas diferentes (`components/`, `hooks/`,
`services/`, `redux/`, `pages/`) toda vez que uma tela muda.

**O que sempre vem deste DS, sem reinventar:**
- `src/components/ui/*` — Atoms/Molecules/Organisms (copiados via CLI, nunca
  reescritos à mão).
- `src/components/patterns/*` — Patterns (Empty State, Loading, CRUD,
  Multi-step Form etc.) quando o caso de uso do projeto novo bater com um
  já catalogado aqui.
- Tokens de `globals.css` e `tokens-cor.css` (papéis semânticos + os 5
  presets) — copiar os dois arquivos inteiros é mais seguro do que recriar
  os tokens à mão, evita divergência de valor entre o catálogo e o projeto
  novo. Cor nova se pede ao DS (via `presets.ts`), não se edita na cópia.

**O que é sempre próprio do projeto novo, nunca deste DS:**
- `app/` (rotas), `lib/api/`, `lib/validations/`, `types/` — regra de
  negócio e dados são do produto, o DS não sabe (e não deve saber) nada
  sobre isso.
- Qualquer componente em `components/<feature>/` — só sobe pra `ui/`
  quando (e se) provar que é genérico o suficiente pra outro projeto usar.

### Como importar os componentes

Este projeto não publica um pacote npm próprio — a forma de trazer um
componente pro projeto novo é a mesma CLI do shadcn/ui, apontando pro
`registry.json` deste repositório (ou copiando o arquivo `.tsx` direto de
`src/components/ui/`, caminho mais simples enquanto não houver um registry
próprio publicado):

```bash
npx shadcn@latest add <slug>
```

Isso traz o componente + as dependências dele (outros componentes/pacotes
npm) automaticamente, mesmo comportamento já usado neste catálogo (ver
"Adicionar mais blocos ou componentes depois" acima).

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

---

## Frente de Painéis Reativos (Widget Contracts)

Inspirada no modelo arquitetural do ToolJet e refinada para o ecossistema Shadcn, esta frente fornece orquestração desacoplada para painéis de visualização, estúdios interativos e dashboards operacionais:

- **Especificação Completa:** [`docs/active/especificacoes/arquitetura-paineis-reativos-widgets.md`](docs/active/especificacoes/arquitetura-paineis-reativos-widgets.md)
- **Camada Central (`src/lib/reactive-panel/`):**
  - `types.ts`: Contrato tridimensional de Widget (`exposedState`, `events`, `actions`).
  - `panel-context.tsx`: Contexto do painel com hooks reativos (`usePanel`, `useWidgetContract`, `useWidgetState`).
- **Pattern de Referência (`src/components/patterns/reactive-dashboard-panel.tsx`):**
  - Demonstração funcional de orquestração entre `CustomerTableWidget` e `CustomerInspectorWidget` sem prop-drilling.
