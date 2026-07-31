# Spec — Tag (Atom)

Status: especificação + implementação criadas nesta sessão (arquivos em
`src/`, ver rodapé). Parente mais próximo (definido em
`PLANO-LOOP-80-20-TEMPLATES.md`, Fase 6.1): Badge. Irmão de fase: Chip
(`src/components/ui/chip.tsx`), usado como referência de convenção de
código mais recente.

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/tag` — README publicado**
   `https://unpkg.com/@nimbus-ds/tag/README.md`
   → descrição, 3 formas de composição (só texto / ícone + texto / forma
   colorida + texto), 5 variantes citadas no texto (Default, Primary,
   Success, Warning, Danger), guideline de combinar variantes por
   contexto, componentes relacionados (Chip, Badge).
2. **`@nimbus-ds/tag` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/tag/dist/index.d.ts`
   → API real: `TagProperties` (`children: ReactNode`, `appearance?:
   "primary" | "success" | "warning" | "danger" | "neutral" |
   "ai-generative"`, default `"neutral"`); `TagProps` estende
   `HTMLAttributes<HTMLDivElement>`; `TagSkeletonProperties` (`width`,
   `height`, `borderRadius?`, `data-testid?`); `Tag: React.FC<TagProps> &
   { Skeleton: typeof TagSkeleton }`. **Sem** prop `icon`, **sem**
   `removable`/`onRemove`, **sem** `disabled`, **sem** `size`.
3. **`@nimbus-ds/tag` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/tag/dist/index.js`
   → confirma na implementação real: componente renderiza um `<div>`
   como raiz (`React.createElement("div", {...})`), não um `<button>`;
   sem `aria-label`/`role` embutido (acessibilidade fica por conta de
   quem consome, via `...props` nativo); classnames aplicados por
   `appearance` via mapa (`tag.classnames.appearance[...]`), valores CSS
   exatos não expostos no bundle minificado; **sem** prop/lógica de
   ícone (o componente só recebe `children`, `appearance` e atributos
   nativos de `div`).

**Não encontrado / não assumido:** valores exatos de cor por
`appearance` no CSS real do Nimbus (bundle minificado não expõe) — não
copiados; comportamento de teclado/foco (não é interativo por padrão,
então não há nada a testar aqui, confirmado pela ausência de handlers
de evento no bundle).

---

## Descrição

*(localizado do README oficial do `@nimbus-ds/tag`, fonte 1 acima)*

O componente Tag é usado para categorizar informação, organizar ou
indicar o status de elementos ou componentes usando palavras-chave,
ícones ou cores.

## Quando utilizar

*(localizado do README oficial, fonte 1 acima — inclui a distinção que
o próprio Nimbus documenta com os componentes vizinhos)*

- Use Tag para categorizar informação de forma estática — rótulo fixo,
  não removível (ex.: categoria de um item, status de um registro).
- Três formas de composição documentadas: só texto; ícone + texto; ou
  forma colorida (indicador) + texto.
- Combine variantes dentro do mesmo contexto pra comunicar status
  rapidamente (ex.: não misturar `success` e `danger` pro mesmo tipo de
  informação em telas diferentes sem critério).
- **Não confundir com componentes vizinhos** (distinção documentada no
  próprio README do Nimbus, e já registrada na entrada `chip` deste
  catálogo): use **Chip** para representar um critério de filtro/busca
  ativo, tipicamente removível; use **Badge** para reportar contagem de
  itens pendentes/status pontual. Tag é especificamente para
  **categorização estática** — não tem botão de remover, não é
  interativo por padrão.

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | `<span>` (ou o filho, via `asChild`) com `data-slot="tag"` e `data-variant`. **Diverge do Nimbus real**, que renderiza `<div>` — este catálogo usa `<span>` pra ficar consistente com Badge/Chip, os dois parentes diretos já estabelecidos aqui (ambos `<span>`). Ver seção "Decisões — Modo Autônomo". |
| Conteúdo (ícone opcional + label) | Via `children` — não existe prop `icon` dedicada (confirmado no typedef, fonte 2). Ícone, quando usado, é composto livremente como filho junto do texto (ex.: `<Tag><Icon name="sell" />Promoção</Tag>`), mesmo padrão que o próprio Nimbus adota (README cita "ícone + texto" como uso válido, mas a API não expõe uma prop separada pra isso). Tamanho de ícone herdado via `[&>svg]:size-3`, mesmo mecanismo do Badge/Chip. |
| Skeleton (Tag.Skeleton) | Placeholder de carregamento com o mesmo formato do tag real. Presente também no Nimbus real (`TagSkeleton`, fonte 2) — confirma que faz sentido ter, mesmo padrão que `Chip.Skeleton` já usa neste projeto (`Object.assign`). |

---

## Composição

Export único: **`Tag`** (mesmo padrão de `Badge` e `Chip`, ambos exports
únicos). Não há subcomponentes de composição JSX — ícone é `children`,
não prop nem filho tipado à parte. `Tag.Skeleton` existe como
propriedade estática (mesmo mecanismo de `ButtonWithSkeleton`/
`ChipWithSkeleton`) mas não entra como entrada própria em
`composition-registry.ts` — mesmo tratamento que `Button.Skeleton` e
`Chip.Skeleton` já recebem.

Entrada esperada em `composition-registry.ts`:
```ts
"tag": ["Tag"],
```

---

## Variantes

Fonte real: `appearance` do Nimbus tem 6 valores — `"neutral"`
(default), `"primary"`, `"success"`, `"warning"`, `"danger"`,
`"ai-generative"` (fontes 1 e 2). Renomeações feitas para consistência
com o resto do catálogo (mesmo tipo de decisão já tomada no Chip, que
renomeou `aiGenerated` → `ai-generated`):

- `"neutral"` → `"default"` (Badge e Chip usam `"default"` pro estado
  neutro; manter `"neutral"` quebraria a convenção já estabelecida de
  nome de valor da prop `variant` neste catálogo).
- `"ai-generative"` → `"ai-generated"` (idêntico à renomeação já feita
  no Chip, mesmo motivo: consistência com a família de tokens
  `--ai-*`/variantes `ai-*` já usada em `button.tsx` e `chip.tsx`).
- `"primary"`, `"success"`, `"warning"`, `"danger"` mantidos com o
  mesmo nome do Nimbus (sem motivo pra divergir).

| Nome | Valor da prop | Descrição |
|---|---|---|
| Default | `default` | Aparência neutra padrão — fundo `--muted`, texto `--foreground` (equivalente a `appearance="neutral"` do Nimbus). Mesmo par de tokens que `Chip` variant `default` já usa. |
| Primary | `primary` | Fundo `--primary`, texto `--primary-foreground` — reaproveita os tokens de marca do preset ativo (mesmo par que `Badge` variant `default` já usa), pra manter cor de marca coerente entre os 5 presets de estilo do projeto. |
| Success | `success` | Fundo `--color-success-100`, texto `--color-success-900` — usa a escala de primitivos de status (`--color-success-*`, 100–1000) já existente em `globals.css` desde 2026-07-22, mas **ainda não consumida por nenhum outro componente** do catálogo antes deste. Ver "Decisões — Modo Autônomo". |
| Warning | `warning` | Fundo `--color-warning-100`, texto `--color-warning-900` — mesma lógica de Success, escala `--color-warning-*`. |
| Danger | `danger` | Fundo `--color-danger-100`, texto `--color-danger-900` — mesma lógica de Success, escala `--color-danger-*` (hue reaproveitado do `--destructive` já existente, conforme comentário em `globals.css` linha ~343). |
| AI Generated | `ai-generated` | Sinaliza que o valor do tag foi gerado por IA. Usa os mesmos tokens `--ai-surface`/`--ai-interactive`/`--ai-text-high` que `Chip` variant `ai-generated` já usa — decisão de manter os dois visualmente idênticos nesse estado específico, já que ambos representam o mesmo conceito ("conteúdo gerado por IA") em componentes vizinhos deste catálogo. |

---

## Tamanhos

Nenhum. O typedef do `@nimbus-ds/tag` não expõe prop de tamanho (fonte
2) — mesmo tratamento que Badge e Chip já têm hoje (`sizes: []`).

---

## Estados

| Estado | Descrição |
|---|---|
| Default | Estado de repouso — único estado real do componente. Tag não é interativo por padrão: não tem `onClick` próprio, não recebe foco, não tem variação de hover/focus/disabled na sua própria API (confirmado pela ausência de handlers de evento e de prop `disabled` no bundle/typedef do Nimbus, fonte 2 e 3). |
| Composição livre via `asChild` | Quando usado com `asChild` (ex.: envolvendo um elemento clicável do próprio consumidor), o comportamento interativo — incluindo hover/focus/disabled — passa a ser responsabilidade inteira do elemento filho, não do Tag em si. Mesmo mecanismo que Badge/Chip já expõem via Radix `Slot.Root`. |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `React.ReactNode` | — (obrigatório) | Conteúdo do tag — texto e, opcionalmente, um ícone composto junto (ver Anatomia). Equivalente exato à prop `children` do Nimbus (fonte 2). |
| `variant` | `"default" \| "primary" \| "success" \| "warning" \| "danger" \| "ai-generated"` | `"default"` | Aparência visual do tag. Equivalente à prop `appearance` do Nimbus — renomeada pra `variant` pra ficar consistente com Badge/Chip/Button, que já usam `variant` em vez de `appearance` neste catálogo. Ver seção Variantes para os valores renomeados. |
| `asChild` | `boolean` | `false` | Renderiza as props no elemento filho (via Radix `Slot.Root`) em vez de `<span>`. Mesmo mecanismo de `Badge`/`Chip`/`Button`. |
| `...props` | `React.ComponentProps<"span">` | — | Demais atributos nativos do elemento raiz. |

**Não incluído, por não ter fonte real que sustente (typedef do Nimbus
não tem):** `icon` (ícone é composição via `children`, ver Anatomia),
`removable`/`onRemove` (Tag não é removível — distinção central do
componente, confirmada tanto no README quanto no typedef), `disabled`
(Tag não tem estado de desabilitado próprio), `size` (sem escala de
tamanho no Nimbus real).

---

## Acessibilidade mínima exigida

- **Nome acessível**: o texto (`children`) já é conteúdo de texto
  visível dentro do elemento raiz — não precisa de `aria-label` próprio
  (mesma lógica de Badge/Chip). Quando o `children` for só um ícone sem
  texto (uso fora do padrão documentado), a responsabilidade de dar
  nome acessível é de quem consome o componente (mesma regra que o
  próprio Nimbus real aplica — confirmado no bundle, fonte 3: nenhuma
  lógica de acessibilidade é injetada pelo componente).
- **Não é focável nem interativo por padrão**: Tag não tem `tabIndex`,
  `role` ou handler de evento embutido — correto para um rótulo estático
  (leitor de tela deve anunciar o texto como conteúdo normal de fluxo,
  não como um controle). Confirmado como comportamento real do Nimbus
  (fonte 3: sem `aria-label`/`role` no bundle).
- **Contraste das variantes de status** (`success`/`warning`/`danger`):
  pares escolhidos (fundo `-100`, texto `-900`) têm alto contraste por
  construção (tom mais claro da escala contra o mais escuro) — validar
  formalmente com o agente `acessibilidade-ds` quando ele rodar sobre
  este componente, já que é o primeiro uso desses tokens no catálogo e
  não houve validação automatizada de contraste nesta sessão.
- **`asChild`**: quando o consumidor usa `asChild` pra tornar o Tag
  clicável (fora do uso padrão documentado), a responsabilidade de
  aria-label/role/foco passa a ser do elemento filho.

---

## Código de exemplo

```tsx
import { Tag } from "@/components/ui/tag"
import { Icon } from "@/components/ui/icon"

// Tag simples (categorização estática)
<Tag>Categoria: Roupas</Tag>

// Variantes de status
<Tag variant="primary">Em destaque</Tag>
<Tag variant="success">Aprovado</Tag>
<Tag variant="warning">Pendente</Tag>
<Tag variant="danger">Recusado</Tag>

// Tag com ícone composto via children (sem prop `icon` dedicada)
<Tag variant="ai-generated">
  <Icon name="sell" />
  Sugestão gerada por IA
</Tag>

// Placeholder de carregamento
<Tag.Skeleton />
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado.)

---

## Decisões — Modo Autônomo

Decisões não-técnicas tomadas sem fonte 100% clara nesta sessão, sem
consultar Rafael (formato: decisão | alternativa considerada | como
reverter):

1. **Elemento raiz `<span>` em vez de `<div>`** | Nimbus real renderiza
   `<div>` (fonte 3) | alternativa considerada: seguir o Nimbus à risca
   e usar `<div>` | como reverter: trocar `const Comp = asChild ?
   Slot.Root : "span"` por `"div"` em `tag.tsx` — não quebra a API
   pública (`React.ComponentProps<"span">` viraria `<"div">`, mas o uso
   típico via `children`/`variant`/`asChild` não muda).
2. **Prop renomeada de `appearance` (Nimbus) para `variant`** | mantida
   igual ao Nimbus (`appearance`) | como reverter: `s/variant/appearance/`
   em `tag.tsx`, `tag-demo.tsx`, `tag.stories.tsx` e na entrada de
   `component-docs.ts`.
3. **Valor `"neutral"` renomeado para `"default"`, `"ai-generative"`
   renomeado para `"ai-generated"`** | manter os nomes originais do
   Nimbus | como reverter: trocar as chaves correspondentes no objeto
   `variants.variant` de `tagVariants` (em `tag.tsx`) e nas stories/docs.
4. **Cores das variantes `success`/`warning`/`danger` usam o par
   fixo `-100` (fundo) / `-900` (texto) da escala de primitivos**
   (`--color-success-*`, `--color-warning-*`, `--color-danger-*`, já
   existentes em `globals.css` mas sem nenhum consumidor antes deste
   componente) | alternativas consideradas: (a) não implementar essas 3
   variantes agora e ficar só com `default`/`primary`/`ai-generated`,
   deixando `success`/`warning`/`danger` como "não encontrado" — rejeitei
   porque o Nimbus real documenta essas 3 variantes explicitamente no
   README e no typedef, então omitir seria ficar aquém da fonte real
   disponível; (b) usar um passo mais escuro no fundo (ex. `-600`) com
   texto branco, no mesmo padrão do `destructive` do Badge — rejeitei
   porque os tokens `--color-success-*` etc. ainda não são
   preset-aware/dark-mode-aware (comentário em `globals.css` linha
   ~350: "Ainda NÃO estão ligados aos presets"), então um par
   autocontido claro-no-fundo/escuro-no-texto (independente do tema da
   página) é mais seguro de contraste do que apostar num passo médio
   pensado pra um fundo de página que pode mudar por preset | como
   reverter: trocar os valores de `className` das chaves `success`,
   `warning`, `danger` em `tagVariants` (`tag.tsx`) por outro par de
   passos da mesma escala, ou por outra abordagem de token — não requer
   mudança de API.
5. **Variante `ai-generated` reaproveita exatamente a mesma classe CSS
   que `chip.tsx` já usa** (`border border-ai-interactive bg-ai-surface
   text-ai-text-high`) | alternativa considerada: dar um tratamento
   visual levemente diferente pro Tag nesse estado | como reverter:
   ajustar só essa entrada em `tagVariants`, independente do Chip.

---

## Arquivos criados nesta sessão

- `src/components/ui/tag.tsx`
- `src/components/examples/tag-demo.tsx`
- `src/components/ui/tag.stories.tsx`
- `.build/componentes/tag.md` (este arquivo)

Não foram editados: `src/lib/atomic-registry.ts`,
`src/lib/components-registry.ts`, `src/lib/composition-registry.ts`,
`src/lib/examples-mapping.ts`, `src/components/examples/registry.tsx`,
`src/lib/component-docs.ts`, `src/components/doc/generic-playground.tsx`
— por instrução explícita da tarefa (outros agentes trabalhando em
paralelo nesses arquivos compartilhados). As linhas exatas a colar em
cada um estão na resposta final desta tarefa.
