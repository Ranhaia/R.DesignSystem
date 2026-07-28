# Sistema de ícones: migração de lucide-react para Google Material Symbols

Data: 2026-07-28
Status: aprovado, pronto para plano de implementação

## Contexto e objetivo

O projeto usa `lucide-react` (SVGs fixos) em ~124 arquivos / 84 nomes de
ícone distintos. O objetivo é substituir completamente por **Google
Material Symbols**, uma fonte de ícone variável que expõe os eixos `FILL`,
`wght` (weight), `GRAD` (grade) e `opsz` (optical size) ajustáveis em
tempo real — dando liberdade de estilo que SVGs estáticos não têm.

Este é o primeiro passo de uma direção maior do projeto: o shadcn/ui foi
só o ponto de partida, e a ideia é que o sistema vá aos poucos deixando de
ser "shadcn com ajustes" para virar um design system próprio do Rafael.
Divergir do upstream do shadcn, quando fizer sentido, é aceitável.

## Restrição estrutural descoberta

20 arquivos de componentes-base do shadcn/ui (`button.tsx`, `dialog.tsx`,
`select.tsx`, `dropdown-menu.tsx`, `context-menu.tsx`, `menubar.tsx`,
`item.tsx`, `empty.tsx`, `input-group.tsx`, `attachment.tsx`,
`button-group.tsx`, `combobox.tsx`, `command.tsx`, `kbd.tsx`, `marker.tsx`,
`navigation-menu.tsx`, `tabs.tsx`, `toggle.tsx`, `breadcrumb-dropdown.tsx`
e mais) dependem do seletor Tailwind `[&_svg:not([class*='size-'])]:size-4`
(e variantes por tamanho) para dar auto-tamanho a qualquer ícone SVG
filho, sem que quem usa o componente precise lembrar de dimensionar.

Material Symbols com eixos ajustáveis em runtime só funciona como fonte
de ícone (glifo via ligature + `font-variation-settings`), que
normalmente se renderiza como `<span>` de texto — o que quebraria esse
seletor em todos os 20 arquivos.

**Decisão:** o componente `<Icon>` renderiza um `<svg viewBox="0 0 24 24">`
de verdade, com um `<text>` interno carregando o glifo. Por ser um `<svg>`
real, os 20 seletores existentes continuam funcionando sem editar nenhum
deles.

## Arquitetura

### Fonte

- Pacote npm `material-symbols` (self-hosted, sem CDN externo em
  runtime), variantes **Rounded** e **Sharp** (Outlined fica de fora).
- Carregado via `import "material-symbols/rounded.css"` e
  `import "material-symbols/sharp.css"` direto em `layout.tsx` — não via
  `next/font/google`, porque os eixos customizados (`FILL`/`GRAD`/`opsz`)
  não são bem suportados pela API de fontes variáveis do `next/font`.
- As classes prontas do pacote (`.material-symbols-rounded` etc.) não são
  usadas — só o `@font-face`. O `font-family` real é aplicado no `<text>`
  interno do `<Icon>` via variável CSS.

### Componente `<Icon>` (`src/components/ui/icon.tsx`)

```tsx
<Icon name="home" />
<Icon name="delete" size={1.5} className="text-destructive" rounded fill weight={600} />
<Icon name="menu" size={2.25} opticalSize={40} />
```

- `name`: nome oficial do ícone em snake_case, igual ao catálogo do
  Google Fonts Icons (ex.: `home`, `arrow_back`, `close`).
- `size` (opcional, número em **rem**): quando ausente, nenhuma classe de
  tamanho é aplicada e o ícone herda o auto-tamanho ambiente que já existe
  hoje nos 20 componentes-base (ex.: 16px dentro de um botão) — igual ao
  comportamento atual dos SVGs do lucide. Quando presente, aplica
  `size-[<n>rem]` (sintaxe de valor arbitrário do Tailwind) e calcula
  `opticalSize` automaticamente (`clamp(20, 48, n * 16)`), a não ser que
  `opticalSize` seja passado explicitamente por cima.
- `rounded` (boolean, opcional): `true` = Material Symbols Rounded,
  ausente/`false` = Sharp. Sem a prop, herda o default do preset ativo.
- `fill` (boolean, opcional), `weight` (100–700), `grade` (-25–200),
  `opticalSize` (20–48): todos opcionais, todos herdam o default do
  preset ativo quando ausentes.

### Mecanismo global → override pontual (mesmo padrão para os 5 eixos)

Cada preset de estilo (`[data-style="..."]` em `globals.css`, ao lado dos
blocos que já definem cor/fonte/radius/sombra) define:

- `--icon-font-family` (aponta para uma de duas variáveis fixas e globais:
  `--font-material-rounded` ou `--font-material-sharp`)
- `--icon-fill` (0 ou 1)
- `--icon-weight` (100–700)
- `--icon-grade` (-25–200)
- `--icon-optical-size` (20–48)

O `<Icon>` lê essas variáveis via `var(--icon-fill, 0)` etc. no `<text>`
interno. Quando uma prop equivalente é passada no componente, ela
sobrescreve a variável só naquela instância via `style` inline — mesmo
mecanismo para os 5 eixos, sem lógica condicional por eixo.

### Defaults por preset (ponto de partida, ajustável visualmente depois)

| Preset | rounded | fill | weight | grade | opticalSize |
|---|---|---|---|---|---|
| Padrão | true | false | 400 | 0 | 24 |
| Editorial | false | false | 300 | 0 | 24 |
| Tech | false | false | 500 | -25 | 20 |
| Suave | true | true | 400 | 200 | 24 |
| Midnight | true | false | 400 | -25 | 24 |

## Migração dos 124 arquivos / 84 ícones

- Tabela de mapeamento lucide → Material Symbols nasce no plano de
  implementação, não neste documento.
- Ordem: componentes-base (`src/components/ui/`, os 20 arquivos com
  `[&_svg]` — só troca de import/uso, sem edição estrutural) → `examples/`
  → `patterns/` → `sidebar-07/` → `templates/` → `lib/*-docs.ts`.
- Ao final, remover `lucide-react` do `package.json`.
- Volume grande o suficiente para justificar subagentes por diretório na
  implementação, com revisão visual em cada um dos 5 presets.

## Critério de aceite

- Os 5 presets renderizam ícones com a variante (rounded/sharp) e eixos
  corretos, visíveis na página `/estilo` e nas telas existentes.
- Nenhum dos 20 componentes-base do shadcn precisou ser editado pro
  auto-tamanho continuar funcionando.
- `npm run build` passa sem erros de fonte/tipo.
- `lucide-react` removido do `package.json` sem import órfão restante.

## Fora de escopo

- Variante Outlined do Material Symbols.
- Migrar a variante por preset (Rounded vs Sharp variando por
  `data-style`) para um mecanismo diferente de CSS custom property —
  decidido e fechado nesta spec.
- Reescrever os 20 componentes-base além da troca de import/uso de ícone.
