# Spec — Chip (Atom)

Status: especificação apenas — **nenhum código em `src/` foi criado ou alterado**.
Parente mais próximo (definido em `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 6.1):
Badge (visual) + Button (ação de remover).

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/chip` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/chip/dist/index.d.ts`
   → API real: `ChipProperties` (`text`, `icon`, `removable`, `aiGenerated`),
   `ChipProps` (extende `ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>`),
   `Chip.Skeleton` (subcomponente estático).
2. **`@nimbus-ds/chip` — README publicado**
   `https://unpkg.com/@nimbus-ds/chip/README.md`
   → descrição, guidelines de uso (ícone opcional, ícone de fechar,
   texto sem verbo), componentes relacionados (Tag, Badge).
3. **`@nimbus-ds/chip` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/chip/dist/index.js`
   → confirma na implementação real: `aria-label="Dismiss chip"`,
   `data-testid="dismiss-chip-button"` / `"close-chip"`, ícone de fechar
   é `CloseIcon` renderizado com `size={12}`, botão de fechar é
   `<button type="button">` com `onClick` recebido via prop.
4. **Repositório GitHub `TiendaNube/nimbus-design-system`**
   (`api.github.com/repos/TiendaNube/nimbus-design-system/contents/...`)
   → confirmou que o monorepo atual não expõe mais o pacote `chip`
   isolado nos diretórios públicos de `packages/` (estrutura mudou desde
   a publicação do pacote no npm); não achei o `.tsx` fonte atual do
   Chip para inspecionar comportamento de teclado linha a linha. Onde a
   fonte não cobriu o detalhe, documentei como "não encontrado" em vez
   de inventar.
5. **Precedente interno já existente neste projeto** (não é fonte
   externa, mas é o "parente mais próximo" real e já revisado por
   Rafael): `src/components/ui/combobox.tsx`, `ComboboxChip` (linhas
   261–293) — já implementa exatamente o padrão "badge + botão de
   remover" usando `<Button variant="ghost" size="icon-xs" label="Remover">`
   com `<Icon name="close" />` dentro. Usado aqui como referência de
   código mais próxima e já validada, para decidir a anatomia do botão
   de remover do Chip.
6. `src/components/ui/badge.tsx` e `src/components/ui/button.tsx` —
   padrão de código (cva, data-slot, tokens).
7. `src/lib/component-docs.ts` (entradas `button`, `badge`) e
   `src/lib/composition-registry.ts` — formato exato de saída exigido.

**Não encontrado / não assumido:** tamanhos (`size`) do Chip — o
typedef do Nimbus não tem prop de tamanho; não inventei uma escala.
Comportamento exato de teclado (o que acontece ao pressionar Delete/
Backspace com o chip focado, como em alguns padrões de "filter chip")
não está no typedef nem no README consultados — não assumido.

---

## Descrição

*(localizado do README oficial do `@nimbus-ds/chip`, fonte 2 acima)*

Chip é um componente usado para sinalizar critérios ou atributos
relacionados a buscas ou filtros de uma lista de informações.

## Quando utilizar

*(localizado do README oficial, fonte 2 acima — inclui a distinção
que o próprio Nimbus documenta com os componentes vizinhos)*

- Use Chip para representar um filtro ou critério ativo aplicado a uma
  lista (ex.: um filtro de busca que o usuário pode remover).
- O texto deve explicar claramente, em poucas palavras, a informação
  que ele representa — não deve usar verbos, porque não descreve uma
  ação.
- O ícone (quando usado) precisa estar diretamente relacionado ao
  critério ou contexto que o chip está representando.
- O ícone de remover deve ficar visível sempre que for possível
  sobrescrever/desfazer aquele filtro ou critério de busca.
- **Não confundir com componentes vizinhos** (distinção documentada no
  próprio README do Nimbus): use **Tag** para categorizar informação
  (rótulo estático, não removível); use **Badge** para reportar
  contagem de itens pendentes/status. Chip é especificamente para
  **critério de filtro/busca ativo**, tipicamente removível.

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | `<span>` (ou o filho, via `asChild`) com `data-slot="chip"` e `data-variant`. Não é ele mesmo um `<button>` — a interatividade fica isolada no botão de remover (ver linha abaixo), mesmo padrão que `ComboboxChip` já usa neste projeto. |
| Ícone (opcional) | Nó antes do label. Vem via prop `icon`. Deve ter relação direta com o critério representado (regra do README Nimbus). Tamanho herdado via seletor `[&>svg]:size-3`, mesmo mecanismo do Badge. |
| Label | Texto do chip — via `children`. Sem verbo (é rótulo, não ação). |
| Botão de remover (opcional) | Só existe quando `removable=true`. Renderizado como `<Button variant="ghost" size="icon-xs">` (não um `<button>` cru) contendo `<Icon name="close" />` — mesmo padrão já usado em `ComboboxChip`. Precisa de `aria-label` próprio (ver Acessibilidade). |

---

## Composição

Export único: **`Chip`** (mesmo padrão de composição do `Badge`, que
também é um export único — ver `composition-registry.ts`, linha
`"badge": ["Badge"]`). Não há subcomponentes separados tipo `ChipIcon`
ou `ChipRemove` — ícone e botão de remover são props (`icon`,
`removable`), não filhos JSX compostos. Decisão alinhada com o próprio
Nimbus, que também expõe só `Chip` como componente (mais
`Chip.Skeleton` estático, sem subcomponentes de composição).

`Chip.Skeleton` existe como propriedade estática (`Object.assign`,
mesmo mecanismo do `ButtonWithSkeleton` em `button.tsx`) mas **não**
entra como entrada própria em `composition-registry.ts` — mesmo
tratamento que `Button.Skeleton` já recebe hoje (`"button": ["Button"]`,
sem listar o Skeleton).

Entrada esperada em `composition-registry.ts`:
```ts
"chip": ["Chip"],
```

---

## Variantes

**Decisão provisória — não é 1:1 com o Nimbus.** O typedef real do
Nimbus não tem um enum de cor/variante para Chip — só um boolean
`aiGenerated?: boolean` ("Highlights the chip to indicate its value was
generated by AI"). Este catálogo, porém, já estabeleceu a convenção de
todo átomo com aparência ter uma prop `variant` (Badge, Button). Para
manter consistência com o resto do catálogo sem inventar uma paleta de
cores que o Nimbus não define para este componente, a variante abaixo
modela exatamente o único sinal visual real que o Nimbus documenta
(`aiGenerated`), reaproveitando os tokens de IA já existentes neste
projeto (`--ai-surface`, `--ai-surface-highlight`, `--ai-interactive`,
`--ai-text-high`, já usados em `button.tsx` nas variantes
`ai-primary`/`ai-secondary`).

| Nome | Valor da prop | Descrição |
|---|---|---|
| Default | `default` | Aparência neutra padrão — fundo `--muted`, texto `--foreground` (mesmo par de tokens que `ComboboxChip` já usa em `combobox.tsx`). |
| AI Generated | `ai-generated` | Sinaliza que o valor do chip foi gerado por IA (equivalente exato à prop `aiGenerated` do Nimbus, fonte 1 acima). Usa os tokens `--ai-surface`/`--ai-interactive`/`--ai-text-high` já wireados neste projeto para a família "ai-*" do Button. |

Não foram adicionadas variantes `secondary`/`destructive`/`outline`/
`ghost`/`link` (como em Badge) por não haver fonte real que sustente
essas cores para Chip — ficaria inventado. Se Rafael quiser paridade
visual maior com Badge, é decisão dele, registrar depois.

---

## Tamanhos

Nenhum. O typedef do `@nimbus-ds/chip` não expõe prop de tamanho (fonte
1) — mesmo tratamento que Badge já tem hoje (`sizes: []`).

---

## Estados

| Estado | Descrição |
|---|---|
| Default | Estado de repouso. |
| Hover | Só o botão de remover reage a hover (herda o hover do `Button variant="ghost"`) — o corpo do chip em si não é interativo por padrão (não tem `onClick` próprio), então não tem hover visual, mesmo comportamento de um Badge estático. |
| Focus | Aplica-se somente ao botão de remover, quando presente — anel de foco herdado do `Button` (`focus-visible:ring`), mesma régua já usada em todo o catálogo. O corpo do chip não recebe foco (não é um elemento focável). |
| Disabled | prop `disabled` — desativa o botão de remover (não é possível remover) e reduz a opacidade do chip inteiro, sinalizando que a remoção está bloqueada. |
| Removível (remoção) | Quando `removable=true`: botão de "x" alcançável via `Tab` (é um `<Button size="icon-xs">`, portanto nativamente focável), ativável via `Enter` ou `Space` (comportamento nativo de `<button>`, sem necessidade de handler de teclado customizado — mesma garantia que `button.tsx` já dá a todo o catálogo). |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `React.ReactNode` | — (obrigatório) | Texto do chip. Equivalente à prop `text` do Nimbus (fonte 1) — usa `children` em vez de `text` para ficar consistente com o resto do catálogo (Badge, Button já usam `children`/`label`, não uma prop `text`). |
| `icon` | `React.ReactNode` | — | Ícone opcional antes do label. Mesmo nome e papel da prop `icon` do Nimbus (fonte 1). Deve estar relacionado ao critério representado. |
| `removable` | `boolean` | `false` | Mostra o botão de remover (o "x"). Mesmo nome e papel exatos da prop `removable` do Nimbus (fonte 1). |
| `onRemove` | `() => void` | — | Callback disparado ao clicar/ativar o botão de remover. **Decisão provisória, diverge do Nimbus**: a API real do Nimbus (fonte 1 e 3) não tem `onRemove` — ela reaproveita o `onClick` do próprio `ChipProps` (que estende `ButtonHTMLAttributes`) tanto para o clique no chip quanto, aparentemente, para o botão de fechar. Neste projeto, o precedente já adotado (`ComboboxChip`, fonte 5) isola a ação de remover num botão próprio e independente do clique no corpo do chip — segui esse padrão interno já validado por ser o mais próximo e evitar ambiguidade entre "clicar no chip" e "remover o chip". |
| `variant` | `"default" \| "ai-generated"` | `"default"` | Ver seção Variantes acima. |
| `removeLabel` | `string` | `"Remover"` | Texto usado como `aria-label` do botão de remover (ver Acessibilidade). Permite ao chamador passar algo mais específico (ex.: `"Remover filtro Categoria: Roupas"`) quando o contexto exigir. |
| `asChild` | `boolean` | `false` | Renderiza as props no elemento filho (via Radix/`Slot.Root`) em vez de `<span>`. Mesmo mecanismo de `Badge`/`Button`. |
| `disabled` | `boolean` | `false` | Desativa o botão de remover e reduz opacidade do chip. |
| `...props` | `React.ComponentProps<"span">` | — | Demais atributos nativos do elemento raiz. |

---

## Acessibilidade mínima exigida

- **Nome acessível do chip**: o texto (`children`) já é conteúdo de
  texto visível dentro do elemento raiz — não precisa de `aria-label`
  próprio no chip em si (mesma lógica do Badge).
- **Botão de remover precisa de `aria-label` próprio**, porque é
  ícone-only (`<Icon name="close" />` sem texto visível) — exatamente a
  mesma regra já aplicada em `button.tsx` para botões ícone-only, e a
  mesma que o Nimbus real aplica (`aria-label="Dismiss chip"`,
  confirmado no bundle compilado, fonte 3). Localizado para pt-BR via a
  prop `removeLabel` (default `"Remover"`).
- **Alcançável via `Tab`**: garantido de graça por implementar o botão
  de remover como `<Button size="icon-xs">` (elemento `<button>` nativo
  focável), não uma `<div>`/`<span>` com `onClick`.
- **Ativável via `Enter`/`Space`**: garantido de graça pelo mesmo
  motivo — comportamento nativo de `<button>`, sem handler de teclado
  customizado necessário.
- **Foco visível**: herdado do `focus-visible:ring` já presente em
  `buttonVariants` (`button.tsx`) — nenhum CSS de foco novo precisa ser
  escrito para o Chip.
- **`disabled`**: quando true, o botão de remover deve ficar
  `disabled` de verdade (não só `aria-disabled`) — diferente do padrão
  "loading síncrono" do Button (que usa `aria-disabled` para não perder
  foco durante reenvio); aqui não há esse cenário de reenvio, então o
  `disabled` nativo é suficiente e mais simples.

---

## Código de exemplo

```tsx
import { Chip } from "@/components/ui/chip"

// Chip simples, não removível (ex.: rótulo de critério fixo)
<Chip>Categoria: Roupas</Chip>

// Chip removível (ex.: filtro ativo de busca)
<Chip removable onRemove={() => removerFiltro("categoria")}>
  Categoria: Roupas
</Chip>

// Chip com ícone + removível
<Chip icon={<Icon name="local_offer" />} removable onRemove={handleRemove}>
  Promoção
</Chip>

// Chip indicando valor gerado por IA (equivalente a aiGenerated do Nimbus)
<Chip variant="ai-generated" removable onRemove={handleRemove}>
  Sugestão gerada por IA
</Chip>

// Placeholder de carregamento
<Chip.Skeleton />
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado.)
