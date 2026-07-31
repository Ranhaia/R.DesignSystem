# Spec — List (Atom)

Status: especificação apenas — o código real em `src/` foi criado nesta
mesma tarefa (ver seção "Arquivos criados" ao final), mas este documento
registra a pesquisa que sustenta as decisões.
Parente mais próximo (definido na tarefa): Item (`src/components/ui/item.tsx`).

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas, mesmo padrão
usado pro Chip/Text/Tag):

1. **`@nimbus-ds/list` — README publicado**
   `https://unpkg.com/@nimbus-ds/list/README.md`
   → descrição real: "List allows us to organize information in text
   format in a list." Estrutura citada: "composed of a bullet point or
   a numerator and a text." Quando usar: organizar informação textual
   verticalmente, em ordem numerada ou com marcadores.
2. **`@nimbus-ds/list` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/list/dist/index.d.ts`
   → API real confirmada:
   - `ListProperties`: `children` (obrigatório), `as?: "ul" | "ol"`,
     `padding?: keyof typeof list.properties.padding` (escala de
     espaçamento por token: `"0-5" | "1" | "2" | "3" | "4" | "5" | "6" |
     "7" | "8"`, cada valor mapeado a uma CSS var).
   - `ListProps`: `ListProperties` + `HTMLAttributes<HTMLUListElement |
     HTMLOListElement>`.
   - `ListItemProperties`: só `children`. `ListItemProps` = isso +
     `HTMLAttributes<HTMLLIElement>`.
   - `ListComponents`: `{ Skeleton, SkeletonItem, Item }` — expostos
     como `List.Skeleton`, `List.SkeletonItem`, `List.Item`
     (namespace estático via `Object.assign`, mesmo mecanismo já usado
     neste catálogo em `Chip.Skeleton`/`Tag.Skeleton`).
   - `List` exportado como `React.FC<ListProps> & ListComponents`, com
     `export default List`.
   - Não existe nenhuma prop de "sem marcador" — o List real do Nimbus
     **sempre** mostra bullet (`ul`) ou numerador (`ol`); não há um
     boolean/variant para ocultar o marcador.
3. **Precedente interno deste projeto** (não é fonte externa, mas é o
   "parente mais próximo" indicado na tarefa e já revisado por
   Rafael): `src/components/ui/item.tsx` — `ItemGroup` já implementa
   `role="list"` sobre uma `<div>` (não um `<ul>` real) especificamente
   para agrupar `Item`s sem marcador visual, confirmando que este
   catálogo já tem a necessidade prática de "lista sem bullet/número"
   mesmo antes de existir um componente `List` dedicado.
   `src/components/ui/chip.tsx` e `src/components/ui/tag.tsx` — padrão
   de código atual (`data-slot`, `cva`, `VariantProps<typeof
   xVariants>`, tokens semânticos, comentários em pt-BR explicando
   decisões).
4. `src/components/ui/text.tsx` — precedente direto de uso da prop
   `as` neste catálogo (`Comp = as`, tipo `TextElement` restrito às
   opções reais da fonte), usado como modelo de implementação para a
   prop `as` do List.
5. `src/lib/component-docs.ts` (entradas `chip`, `item`) e
   `src/lib/composition-registry.ts` — formato exato de saída exigido.

**Não encontrado / não assumido:** a escala `padding` (`"0-5"` a `"8"`,
mapeada a CSS vars) não foi implementada — o `.d.ts` não expõe os
valores numéricos reais por trás de cada CSS var (só o nome da
variável, ofuscado no bundle), e este catálogo não tem hoje uma escala
de espaçamento nomeada equivalente para reproduzir 1:1 sem inventar
números. `List.Skeleton`/`List.SkeletonItem`/`List.Item` (namespace
estático) não foram implementados — fora do escopo explícito desta
tarefa (que pediu só `List` e `ListItem` como exports), mesmo
critério já usado em `text.md` para não adicionar `Text.Skeleton`.

---

## Descrição

*(localizado do README oficial do `@nimbus-ds/list`, fonte 1 acima)*

List permite organizar informação em formato de texto numa lista.

## Quando utilizar

*(localizado do README oficial, fonte 1 acima)*

- Use para organizar informações textuais verticalmente, quando fizer
  sentido apresentá-las como uma sequência numerada ou com marcadores.
- Use `as="ol"` para sequências onde a ordem importa (passo a passo,
  instruções); use `as="ul"` (default) quando a ordem não é relevante.

---

## Anatomia

| Parte | Descrição |
|---|---|
| `List` (elemento raiz) | Um `<ul>` ou `<ol>` (controlado pela prop `as`, default `"ul"`) com `data-slot="list"`, `data-as` e `data-variant`. Container que define o espaçamento vertical entre itens. |
| `ListItem` | Um `<li>` com `data-slot="list-item"`. Cada linha da lista — pode conter texto simples ou qualquer composição (ex.: `Item`/`ItemContent`, ver demo). |

---

## Composição

Dois exports: **`List`** e **`ListItem`** (mesmo padrão de composição
de duas peças que `Kbd`/`KbdGroup` já usam — ver
`composition-registry.ts`).

Entrada esperada em `composition-registry.ts`:
```ts
"list": ["List", "ListItem"],
```

---

## Variantes

**Decisão provisória — diverge do Nimbus real.** A fonte real (fonte 2
acima) não tem uma prop de variante — o List do Nimbus sempre mostra
marcador (bullet ou numerador), sem opção de ocultá-lo. Este catálogo,
porém, já tem a necessidade prática confirmada de uma "lista sem
marcador" para agrupar `Item`s (ver `ItemGroup` em `item.tsx`, fonte 3
acima) — por isso foi adicionada uma prop `variant` com dois valores:

| Nome | Valor da prop | Descrição |
|---|---|---|
| Sem marcador | `none` (default) | `list-none` — nenhum bullet/numerador visível. Uso mais comum neste catálogo: agrupar `ListItem` (com `Item`/`ItemContent` dentro, ou texto livre) numa lista vertical de layout, sem semântica de enumeração visual. |
| Com marcador | `marker` | Bullet nativo (quando `as="ul"`) ou numerador nativo (quando `as="ol"`), com a cor do marcador em `--muted-foreground` (`marker:text-muted-foreground`). Comportamento 1:1 com o List real do Nimbus. |

---

## Tamanhos

Nenhum. Nem a fonte real (fonte 2) nem a tarefa pedem uma escala de
tamanho para List — mesmo tratamento que `Chip`/`Kbd` já têm hoje
(`sizes: []`).

---

## Estados

List/ListItem não são interativos (sem hover/focus/disabled próprios)
— são um container e uma linha de conteúdo estático, mesma natureza do
`ItemGroup`/`Item` quando usados sem `asChild` de link/botão.

| Estado | Descrição |
|---|---|
| Default | Estado de repouso — `variant="none"`, `as="ul"`. |
| Com marcador | `variant="marker"` — ver Variantes acima. |

---

## Props

### `List`

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `as` | `"ul" \| "ol"` | `"ul"` | Elemento HTML renderizado. Mesmo nome e mesmas duas opções da prop `as` do Nimbus (fonte 2) — nenhuma opção adicional foi incluída (diferente do `Text`, que adicionou `"div"` por pedido explícito de outra tarefa). |
| `variant` | `"none" \| "marker"` | `"none"` | Controla a visibilidade do marcador nativo. **Decisão provisória, diverge do Nimbus** (ver Variantes acima) — o Nimbus real não tem essa prop. |
| `children` | `React.ReactNode` | — (obrigatório) | Os `ListItem` (ou qualquer conteúdo). Mesmo papel do `children` do Nimbus. |
| `...props` | `React.ComponentProps<"ul">` | — | Demais atributos nativos do elemento raiz (compatível também com `<ol>` — atributos específicos de `ol` como `start`/`reversed` continuam funcionando via passthrough, mesmo não estando no tipo declarado). |

### `ListItem`

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `React.ReactNode` | — (obrigatório) | Conteúdo da linha — texto simples ou composição livre (`Item`/`ItemContent`, etc). Mesmo papel do `children` do `ListItemProperties` do Nimbus (fonte 2). |
| `...props` | `React.ComponentProps<"li">` | — | Demais atributos nativos do `<li>`. |

---

## Acessibilidade mínima exigida

- **Semântica de lista nativa**: `List` renderiza `<ul>`/`<ol>` reais
  (não `<div role="list">`) — leitores de tela anunciam
  automaticamente "lista com N itens" e a posição de cada item, sem
  necessidade de ARIA adicional.
- **`ListItem` deve ser filho direto de `List`**: mesma regra HTML
  nativa de `<li>` dentro de `<ul>`/`<ol>` — não inserir `<div>`
  intermediária entre `List` e `ListItem`, sob risco de quebrar a
  semântica de lista para leitores de tela (o mesmo cuidado que
  `ItemGroup`/`Item` já preservam ao não intercalar wrappers extras).
- **Uso de `as="ol"` para sequência importa**: quando a ordem dos
  itens é relevante (passo a passo, instruções), usar `as="ol"` em vez
  de `as="ul"` para que leitores de tela comuniquem a ordem
  corretamente — mesma orientação do README do Nimbus (fonte 1).
- **Sem nome acessível próprio a garantir em `List`/`ListItem`**:
  nenhum dos dois é um controle interativo — o conteúdo textual visível
  dentro de cada `ListItem` já é o que é anunciado.
- **Contraste**: `text-foreground`, `text-muted-foreground` (marcador)
  já são tokens do tema, com contraste validado nas paletas do
  projeto — nenhuma cor nova introduzida por este componente.

---

## Código de exemplo

```tsx
import { List, ListItem } from "@/components/ui/list"
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item"

// Lista sem marcador, agrupando Item — uso mais comum neste catálogo
<List>
  <ListItem>
    <Item variant="outline" size="sm">
      <ItemContent>
        <ItemTitle>Passo 1</ItemTitle>
        <ItemDescription>Confirme seus dados pessoais.</ItemDescription>
      </ItemContent>
    </Item>
  </ListItem>
</List>

// Lista com marcador (bullet), texto simples
<List variant="marker">
  <ListItem>Documento de identidade com foto</ListItem>
  <ListItem>Comprovante de residência atualizado</ListItem>
</List>

// Lista ordenada (numerada) — ordem importa
<List as="ol" variant="marker">
  <ListItem>Preencha o formulário de solicitação.</ListItem>
  <ListItem>Envie os documentos exigidos.</ListItem>
</List>
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

## Decisões em Modo Autônomo (sem fonte 100% clara)

| Decisão | Alternativa considerada | Como reverter |
|---|---|---|
| Prop `variant` (`"none" \| "marker"`) adicionada — não existe no Nimbus real, que sempre mostra marcador. | Ficar 1:1 com o Nimbus: sempre mostrar bullet/numerador, sem opção de ocultar. | Remover o eixo `variant` de `listVariants` em `src/components/ui/list.tsx`, sempre aplicar `list-disc`/`list-decimal`, e remover `variant` das props/stories/playground. |
| `padding` (escala de espaçamento por token do Nimbus, `"0-5"` a `"8"`) não implementado — `List` usa um `gap-1` fixo via classe base. | Implementar uma prop `padding`/`gap` com uma escala numérica própria deste catálogo, mapeada para classes `gap-*` do Tailwind. | Adicionar um novo eixo (`gap` ou `padding`) ao `cva` em `list.tsx`, com uma escala como `{ sm: "gap-1", default: "gap-2", lg: "gap-4" }`, e expor no playground como `sizes`. |
| `List.Skeleton`/`List.SkeletonItem`/`List.Item` (namespace estático do Nimbus real) não implementados. | Adicionar via `Object.assign`, mesmo mecanismo de `Chip.Skeleton`/`Tag.Skeleton`. | Adicionar `ListSkeleton`/`ListSkeletonItem` em `list.tsx` e compor via `Object.assign(List, { Skeleton: ListSkeleton, SkeletonItem: ListSkeletonItem })`. Não incluído porque a tarefa pediu explicitamente só `List` e `ListItem`. |
| Orientação sempre vertical (`flex flex-col`) — sem prop `orientation`/`direction` para lista horizontal. | Adicionar uma prop `orientation` (`"vertical" \| "horizontal"`), análoga à de `Separator`. | Adicionar um eixo `orientation` ao `cva`, trocando `flex-col` por `flex-row` quando horizontal. Não incluído por não haver fonte real que sustente essa prop no List do Nimbus — layout horizontal ad-hoc continua possível hoje via `className="flex-row"` no `List`. |

---

## Arquivos criados nesta tarefa

- `src/components/ui/list.tsx`
- `src/components/examples/list-demo.tsx`
- `src/components/ui/list.stories.tsx`
- `.build/componentes/list.md` (este arquivo)

Não foram editados os arquivos compartilhados
(`atomic-registry.ts`, `components-registry.ts`,
`composition-registry.ts`, `examples-mapping.ts`,
`examples/registry.tsx`, `component-docs.ts`,
`generic-playground.tsx`, `variant-preview.tsx`,
`PLANO-LOOP-80-20-TEMPLATES.md`) — as linhas exatas para cada um foram
retornadas no relatório final da tarefa, para colagem por outro
processo.
