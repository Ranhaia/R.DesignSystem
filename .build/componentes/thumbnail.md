# Spec — Thumbnail (Atom)

Status: especificação + implementação já criadas em `src/` nesta sessão
(diferente do fluxo do Chip, que só documentou — aqui o pedido incluiu
código). Parente mais próximo (definido em `PLANO-LOOP-80-20-TEMPLATES.md`,
Fase 6.1): Avatar (`src/components/ui/avatar.tsx`) + AspectRatio
(`src/components/ui/aspect-ratio.tsx`).

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/thumbnail` — README publicado**
   `https://unpkg.com/@nimbus-ds/thumbnail/README.md`
   → descrição ("exibir miniaturas de imagem, com container de cantos
   arredondados"), casos de uso recomendados (imagem de produto, galeria,
   foto de detalhe de pedido), proporções suportadas (1:1, 4:3, 3:4, 16:9,
   9:16, 2:1, 1:2), "sem dimensões fixas — altura e largura são
   customizáveis", componente relacionado (File Uploader).
2. **`@nimbus-ds/thumbnail` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/thumbnail/dist/index.d.ts`
   → API real: `ThumbnailProperties` (`alt: string` obrigatório,
   `children?: ReactNode`, `aspectRatio?` com o enum de string acima,
   `width?: string`), `ThumbnailProps` estende
   `ImgHTMLAttributes<HTMLImageElement>`, `Thumbnail.Skeleton`
   (subcomponente estático, `ThumbnailSkeletonProps` aceita `aspectRatio`,
   `width`, `className`, `data-testid`).
3. **Precedentes internos já existentes neste projeto** (não são fonte
   externa, mas são os "parentes" reais já revisados por Rafael):
   `src/components/ui/avatar.tsx` (padrão de fallback ao falhar
   carregamento de imagem, escala de tamanho sm/default/lg) e
   `src/components/ui/aspect-ratio.tsx` (wrapper Radix pra manter
   proporção via `ratio` numérico).
4. `src/components/ui/chip.tsx` — padrão de código mais recente do
   catálogo (`data-slot`, `cva`, `Object.assign` para `.Skeleton`).
5. `src/lib/component-docs.ts` (entrada `chip`) e
   `src/lib/composition-registry.ts` — formato exato de saída exigido.
6. `node_modules/@radix-ui/react-aspect-ratio/dist/index.mjs` — lido
   diretamente pra confirmar como o Radix estrutura o wrapper (div externo
   com o truque de `padding-bottom`, div interno absolutamente
   posicionado que recebe `className`/`children`), decisivo pra saber
   onde aplicar `rounded-md`/`overflow-hidden`/`bg-muted` vs. onde aplicar
   o tamanho (`w-*`).

**Não encontrado / não assumido:** o README do Nimbus não documenta uma
seção de props/API detalhada (ele mesmo aponta pra uma doc externa,
`nimbus.nuvemshop.com.br/documentation/atomic-components/thumbnail`, não
acessada nesta sessão) — a fonte de props usada foi o `index.d.ts`
(fonte 2), que é o typedef publicado de verdade, não a doc de marketing.
Nenhum "estado de loading" com spinner é documentado no typedef — só o
`Skeleton` estático — não inventado.

---

## Descrição

*(localizado do README oficial do `@nimbus-ds/thumbnail`, fonte 1 acima)*

O Thumbnail serve para exibir miniaturas de imagem, com um container de
cantos arredondados para apresentar conteúdo visual.

## Quando utilizar

*(localizado do README oficial, fonte 1 acima)*

- Visualização de imagem de produto.
- Exibição em galeria de imagens.
- Apresentação de foto em detalhe de pedido.
- Sem dimensões fixas — altura e largura são customizáveis, respeitando
  a proporção escolhida (pra não distorcer a imagem).
- Componente relacionado: File Uploader, para cenários de upload de
  imagem (ainda "em construção" neste catálogo — ver
  `inProgressEntries` em `atomic-registry.ts`).

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | `<div>` com `data-slot="thumbnail"` e `data-size`, controla o tamanho (largura) via `cva`. |
| Wrapper de proporção | `AspectRatio` (Radix, mesmo componente de `aspect-ratio.tsx`) — mantém a proporção (`ratio` numérico) sem distorcer a imagem, recebe `rounded-md`/`overflow-hidden`/`bg-muted`. |
| Imagem | `<img>` nativo com `data-slot="thumbnail-image"`, `object-cover`, tratamento de erro via `onError` (equivalente ao que `AvatarFallback` resolve automaticamente via Radix, aqui reimplementado à mão porque não há primitive de imagem com fallback embutido para `<img>` cru). |
| Fallback | `<div data-slot="thumbnail-fallback" role="img" aria-label={alt}>` — mostrado quando `src` está vazio/ausente ou a imagem falha ao carregar (`onError`). Sem ícone (ver Decisões de ícone), só a cor de fundo do token `--muted`. |
| Conteúdo sobreposto (opcional) | `children` — mesmo papel do `children?: ReactNode` do Nimbus (ex.: badge de status sobre a miniatura). |
| Skeleton (`Thumbnail.Skeleton`) | Placeholder de carregamento com o mesmo tamanho + proporção do thumbnail real, evita layout shift. Equivalente direto ao `Thumbnail.Skeleton` real do Nimbus. |

---

## Composição

Export único: **`Thumbnail`** (mesmo padrão de `Chip`/`Badge` — sem
subcomponentes JSX separados, ícone/fallback são resolvidos
internamente). `Thumbnail.Skeleton` existe como propriedade estática
(`Object.assign`, mesmo mecanismo do `Chip.Skeleton`) e, pelo mesmo
tratamento já dado a `Chip`/`Button`, **não** entra como entrada própria
em `composition-registry.ts`.

Entrada esperada em `composition-registry.ts`:
```ts
"thumbnail": ["Thumbnail"],
```

---

## Variantes

Nenhuma variante de cor/estilo — o Nimbus não documenta uma (nem no
README nem no typedef). O único controle visual real é `aspectRatio`
(ver Tamanhos/Proporções abaixo), que não é uma "variante" no sentido de
Badge/Chip (não muda cor/ênfase, muda proporção geométrica).

---

## Tamanhos

**Decisão provisória — não é 1:1 com o Nimbus.** O typedef real
(`ThumbnailProperties`) não tem um enum de tamanho — tem `width?: string`
livre (qualquer valor CSS). Este catálogo já estabeleceu a convenção de
escala discreta sm/default/lg para átomos de mídia (ver `Avatar`, prop
`size`). Para manter consistência com o resto do catálogo em vez de
expor uma prop de string livre (que quebraria o padrão de `cva` já usado
em todo lugar), a prop `size` abaixo modela uma escala equivalente:

| Nome | Valor da prop | Largura (`w-*`) |
|---|---|---|
| Small | `sm` | `w-16` (4rem / 64px) |
| Default | `default` | `w-24` (6rem / 96px) |
| Large | `lg` | `w-40` (10rem / 160px) |

A altura nunca é fixada diretamente — é sempre derivada da largura ×
`aspectRatio` via o wrapper `AspectRatio`, exatamente como o Nimbus
documenta ("sem dimensões fixas — altura e largura são customizáveis").

### Proporções (`aspectRatio`)

Copiadas 1:1 do enum real do Nimbus (fonte 2):

| Valor da prop | Proporção |
|---|---|
| `1/1` (default) | Quadrada |
| `4/3` | Retangular |
| `3/4` | Retangular (vertical) |
| `16/9` | Retangular larga |
| `9/16` | Retangular larga (vertical) |
| `2/1` | Retangular extra larga |
| `1/2` | Retangular extra larga (vertical) |

O default `1/1` é decisão provisória — o Nimbus não documenta um default
explícito para `aspectRatio` (a prop é opcional no typedef, sem valor
padrão anotado).

---

## Estados

| Estado | Descrição |
|---|---|
| Default (carregado) | Imagem exibida via `<img>`, preenchendo o container mantendo a proporção (`object-cover`). |
| Fallback | Ativado quando `src` está vazio/ausente OU a imagem falha ao carregar (`onError`). Mostra só a cor de fundo `--muted`, sem ícone (ver Decisões de ícone) — mantém `role="img"` + `aria-label={alt}` pra preservar o nome acessível mesmo sem a imagem real. |
| Loading (placeholder) | `Thumbnail.Skeleton` — mesmo tamanho/proporção do estado carregado, evita layout shift. Não é um estado da própria `Thumbnail` (é um componente irmão estático, mesmo tratamento do `Chip.Skeleton`). |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `src` | `string` | — | Origem da imagem. Vazio/ausente aciona o fallback direto (sem esperar o evento `onError` do navegador). |
| `alt` | `string` | — (obrigatório) | Nome acessível da imagem. Mesmo nome e obrigatoriedade exatos da prop `alt` do Nimbus (fonte 2, `ThumbnailProperties.alt: string`, sem `?`). Usado também como `aria-label` do fallback. |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Largura do thumbnail. **Decisão provisória, diverge do Nimbus** — ver seção Tamanhos. |
| `aspectRatio` | `"1/1" \| "4/3" \| "3/4" \| "16/9" \| "9/16" \| "2/1" \| "1/2"` | `"1/1"` | Proporção largura/altura. Mesmo enum exato do Nimbus (fonte 2). |
| `children` | `React.ReactNode` | — | Conteúdo sobreposto à imagem (ex.: badge). Mesmo papel do `children?: ReactNode` do Nimbus. |
| `...props` | `Omit<React.ComponentProps<"img">, "className" \| "alt">` | — | Demais atributos nativos de `<img>` (ex.: `loading`, `decoding`, `crossOrigin`), incluindo `onError` (interceptado internamente pra também acionar o fallback, mas repassado ao chamador se fornecido). |

---

## Acessibilidade mínima exigida

- **Nome acessível sempre garantido**: `alt` é obrigatório no tipo
  (`ThumbnailProps["alt"]: string`, sem `?`) — impossível renderizar um
  `Thumbnail` sem nome acessível, tanto no estado carregado (`alt` vai
  pro `<img>`) quanto no fallback (`alt` vira `aria-label` do
  `role="img"`).
- **Fallback não é invisível pra tecnologia assistiva**: usa
  `role="img"` + `aria-label`, não uma `<div>` decorativa (`aria-hidden`)
  — o usuário de leitor de tela ainda ouve o que a miniatura representa,
  mesmo sem a imagem real carregada.
- **Sem texto essencial só na cor**: o fallback é só `bg-muted`, sem
  informação transmitida por cor (é reforçado pelo `aria-label`, não
  substituído por ele).

---

## Decisões de ícone (fallback de imagem quebrada)

Segui a instrução explícita da tarefa: usar Material Symbol só se já
confirmado em uso no projeto (`grep 'name="' src/components/ui/*.tsx`).
O grep retornou: `arrow_back`, `arrow_forward`, `check`, `check_circle`,
`chevron_left`, `chevron_right`, `circle`, `close`, `cloud_off`,
`dangerous`, `delete`, `download`, `draft`, `drag_indicator`,
`favorite`, `home`, `info`, `keyboard_arrow_down`, `keyboard_arrow_up`,
`left_panel_open`, `more_horiz`, `progress_activity`, `remove`,
`search`, `sell`, `warning`. Nenhum é claramente "imagem quebrada/sem
preview" (o mais próximo semanticamente seria algo como `broken_image` ou
`image`, nenhum dos dois confirmado em uso) — por isso o fallback usa só
`bg-muted`, sem ícone, como a própria tarefa previu como alternativa.

---

## Código de exemplo

```tsx
import { Thumbnail } from "@/components/ui/thumbnail"

// Miniatura padrão (1:1, tamanho default)
<Thumbnail src="/produto.jpg" alt="Camiseta azul, vista frontal" />

// Tamanho pequeno, proporção widescreen
<Thumbnail
  src="/capa-video.jpg"
  alt="Capa do vídeo de instalação"
  size="sm"
  aspectRatio="16/9"
/>

// Sem src (ou falha ao carregar) — cai no fallback automaticamente
<Thumbnail src="" alt="Anexo sem preview disponível" size="lg" />

// Placeholder de carregamento
<Thumbnail.Skeleton size="lg" aspectRatio="16/9" />
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado.)
