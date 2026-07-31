# Spec — Text (Atom)

Status: especificação apenas — o código real em `src/` foi criado nesta
mesma tarefa (ver seção "Arquivos criados" ao final), mas este documento
registra a pesquisa que sustenta as decisões.
Parente mais próximo (definido na tarefa): Label (`src/components/ui/label.tsx`).

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas, mesmo padrão
usado pro Chip):

1. **`@nimbus-ds/text` — README publicado**
   `https://unpkg.com/@nimbus-ds/text/README.md`
   → descrição real: "Text is the text component, used to write and
   format blocks of content within pages or components." Quando usar:
   "escrever texto simples com hierarquia básica, além de formatar
   trechos específicos de conteúdo." Funcionalidades citadas:
   alinhamento (esquerda/centro/direita), customização de peso e cor,
   uso com propriedade `as`/`span`. O README publicado no unpkg é uma
   introdução resumida — não traz a tabela completa de props (essa
   fica só na doc oficial hospedada em
   `nimbus.nuvemshop.com.br/documentation/atomic-components/text`, que
   não foi acessada por não ser um artefato público do pacote npm, mesmo
   critério usado no Chip de só citar o que veio do pacote publicado).
2. **`@nimbus-ds/text` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/text/dist/index.d.ts`
   → API real confirmada:
   - `TextSprinkle`: `fontSize` (`caption` | `base` | `highlight`),
     `fontWeight` (`regular` | `medium` | `bold`), `lineHeight`
     (`caption` | `base` | `highlight`), `textAlign` (`left` | `right`
     | `center` | `justify`), `color` (22 variações, famílias
     `primary`/`success`/`warning`/`danger`/`neutral`), além de
     `lineClamp`, `wordBreak`, `textDecoration`, `textOverflow`,
     `whiteSpace`, `overflow` — todos com suporte a variação
     responsiva via `Conditions<T>` (`xs`/`md`/`lg`/`xl`/`xxl`).
   - `TextProperties`: estende `TextSprinkle` + `children` (obrigatório)
     + `as` (`"p" | "span"`, default `"p"`).
   - `TextProps`: `TextProperties` + atributos HTML nativos (omite
     `WebkitLineClamp`).
   - Componente exposto como `React.FC<TextProps>` com namespace
     `TextComponents` incluindo `Skeleton`.
3. **`@nimbus-ds/text` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/text/dist/index.js`
   → confirma na implementação real: `as` default `"p"`, sem evidência
   de suporte a `"div"` nesse bundle (só `p`/`span` aparecem
   documentados/usados); `fontWeight` default `"regular"`, sem
   mapeamento numérico explícito de peso (400/500/700) visível no
   código minificado; `Text.Skeleton` implementado como
   `i.Skeleton = a.TextSkeleton`, usando o componente `Skeleton` interno
   com `borderRadius: "0.25rem"` e dimensões padrão calculadas a partir
   do `fontSize` informado.
4. **Precedente interno deste projeto** (não é fonte externa, mas é o
   "parente mais próximo" indicado na tarefa e já revisado por Rafael):
   `src/components/ui/label.tsx` — padrão de código mais simples do
   catálogo (`data-slot`, `cn`, sem `cva` porque Label não tem
   variantes). `src/components/ui/chip.tsx` — componente mais recente,
   referência de convenção atual (`data-slot`, `cva`,
   `VariantProps<typeof xVariants>`, tokens semânticos, comentários em
   pt-BR explicando decisões).
5. **Uso real de tamanho de texto já estabelecido no catálogo** —
   `grep` em `card.tsx`, `item.tsx`, `alert.tsx`: todos usam `text-sm`
   como tamanho de corpo/descrição padrão (`CardDescription`,
   `ItemDescription`, corpo do `Alert`), sempre combinado com
   `text-muted-foreground` para o texto secundário. Usado aqui para
   decidir o mapeamento de `size="base"` → `text-sm` (não `text-base`)
   e a decisão de cor via `text-foreground`/`text-muted-foreground`.
6. `src/app/globals.css` — conferido: **não existe** uma escala
   tipográfica formal própria (nenhum token `--text-*`/`--font-size-*`).
   Confirma a instrução da tarefa: reaproveitar as classes utilitárias
   padrão do Tailwind (`text-xs`/`text-sm`/`text-base`), sem inventar
   nova escala.
7. `src/lib/component-docs.ts` (entrada `chip`) e
   `src/lib/composition-registry.ts` — formato exato de saída exigido.

**Não encontrado / não assumido:** os 22 valores de `color` do Nimbus
(família `primary`/`success`/`warning`/`danger`/`neutral`) não vieram
listados por completo nas fontes acessadas, e este catálogo não tem
hoje uma arquitetura de tokens de cor de texto por família semântica
(só `--foreground`/`--muted-foreground`/`--destructive` de forma
esparsa) — não inventei uma paleta de 22 cores sem fonte completa e sem
tokens correspondentes já existentes no projeto. Mapeamento numérico de
`fontWeight` (400/500/700) não estava explícito no bundle — não
assumido, usei as classes utilitárias Tailwind equivalentes por nome
(`font-normal`/`font-medium`/`font-bold`) em vez de valores numéricos
arbitrários.

---

## Descrição

*(localizado do README oficial do `@nimbus-ds/text`, fonte 1 acima)*

Text é o componente de texto, usado para escrever e formatar blocos de
conteúdo dentro de páginas ou componentes.

## Quando utilizar

*(localizado do README oficial, fonte 1 acima)*

- Use para escrever texto simples com hierarquia básica, e para
  formatar trechos específicos de conteúdo (alinhamento, peso, cor).
- Controle o elemento HTML renderizado via prop `as`, para manter a
  semântica correta (parágrafo vs. texto inline) sem duplicar estilos.

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | Um `<p>`, `<span>` ou `<div>` (controlado pela prop `as`, default `"p"`) com `data-slot="text"`, `data-size` e `data-weight`. Sem subcomponentes — é um wrapper tipográfico único, mesma lógica do Label (elemento único, sem composição). |

---

## Composição

Export único: **`Text`** (mesmo padrão de composição do `Badge`/`Chip`,
que também expõem só um componente — ver `composition-registry.ts`).

Entrada esperada em `composition-registry.ts`:
```ts
"text": ["Text"],
```

---

## Variantes

Não há prop `variant` no sentido de estilo visual (como em Badge/Chip).
A tarefa definiu o desenho como três eixos independentes via `cva`:
`size`, `weight` e `muted` (boolean). Ver Tamanhos abaixo para `size` e
Props para `weight`/`muted`.

---

## Tamanhos

**Decisão provisória — nomes traduzidos 1:1 do Nimbus, valores de
classe mapeados ao padrão já em uso neste catálogo (fonte 5 acima).**
O Nimbus real usa `fontSize: "caption" | "base" | "highlight"` (fonte
2). Reaproveitei os mesmos três nomes (evita inventar uma escala nova,
como pedido pela tarefa) e mapeei cada um para a classe Tailwind mais
consistente com o que o resto do catálogo já usa como corpo de texto:

| Nome | Valor da prop | Classe Tailwind | Descrição |
|---|---|---|---|
| Caption | `caption` | `text-xs` | Texto auxiliar/legenda, menor que o corpo. |
| Base | `base` (default) | `text-sm` | Corpo de texto padrão — mesmo tamanho que `CardDescription`/`ItemDescription`/corpo do `Alert` já usam neste catálogo (fonte 5). |
| Highlight | `highlight` | `text-base` | Texto de destaque, um passo acima do corpo padrão. |

---

## Estados

| Estado | Descrição |
|---|---|
| Default | Estado de repouso — `muted=false` (cor `--foreground`), `weight="regular"`, `size="base"`. |
| Muted | `muted=true` — cor `--muted-foreground`, para texto secundário/auxiliar (mesmo par de tokens que `CardDescription`/`ItemDescription` já usam). |

Text não é interativo (sem hover/focus/disabled próprios) — é um
wrapper de conteúdo estático, mesma natureza do Label sem o elemento
associado a um controle.

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `as` | `"p" \| "span" \| "div"` | `"p"` | Elemento HTML renderizado. O Nimbus real (fonte 2/3) só documenta `"p" \| "span"` — `"div"` foi incluído por pedido explícito do escopo desta tarefa (ver Decisões/Modo Autônomo). |
| `size` | `"caption" \| "base" \| "highlight"` | `"base"` | Tamanho do texto. Nomes iguais ao `fontSize` do Nimbus (fonte 2); valores de classe mapeados ao padrão do catálogo (ver Tamanhos). |
| `weight` | `"regular" \| "medium" \| "bold"` | `"regular"` | Peso da fonte. Mesmos nomes e valores do `fontWeight` do Nimbus (fonte 2), mapeados para `font-normal`/`font-medium`/`font-bold`. |
| `muted` | `boolean` | `false` | Quando `true`, usa `text-muted-foreground` em vez de `text-foreground`. **Decisão provisória, diverge do Nimbus**: o Nimbus real tem uma prop `color` com 22 variações semânticas (fonte 2); este catálogo não tem hoje uma arquitetura de tokens de cor de texto por família (só `--foreground`/`--muted-foreground`/`--destructive` esparsos), então em vez de inventar uma paleta sem fonte completa, segui o padrão binário já usado em todo o catálogo para texto secundário (`text-foreground` vs. `text-muted-foreground`, mesmo par que `CardDescription`/`ItemDescription` já usam). |
| `children` | `React.ReactNode` | — (obrigatório) | Conteúdo de texto. Mesmo papel do `children` do Nimbus. |
| `...props` | `React.ComponentProps<"p">` (menos `color`) | — | Demais atributos nativos do elemento raiz. `color` foi omitido do tipo para não colidir com a prop `muted`/estilo controlado via classe. |

---

## Acessibilidade mínima exigida

- **Sem nome acessível próprio a garantir**: Text não é um controle
  interativo (não é botão, campo, link) — é conteúdo de texto puro.
  O "nome acessível" é o próprio texto visível dentro do elemento, não
  há ícone-only nem rótulo a fornecer separadamente.
- **Semântica correta via `as`**: usar `as="p"` para blocos de texto
  (parágrafos reais), `as="span"` para trechos inline dentro de outro
  bloco de texto, `as="div"` quando precisar de um contêiner de bloco
  sem semântica de parágrafo (ex.: dentro de outro componente que já
  define a semântica). Escolher o elemento certo evita parágrafos
  aninhados (`<p>` dentro de `<p>`, HTML inválido) — mesmo cuidado que
  o Nimbus documenta ao oferecer a prop `as`.
- **Contraste**: `text-foreground` e `text-muted-foreground` já são
  tokens do tema, com contraste validado nas paletas do projeto (não
  são cores novas introduzidas por este componente).

---

## Código de exemplo

```tsx
import { Text } from "@/components/ui/text"

// Corpo de texto padrão
<Text>Texto de corpo padrão.</Text>

// Título de destaque, em negrito
<Text size="highlight" weight="bold">Título de destaque</Text>

// Texto auxiliar/legenda, cor secundária
<Text size="caption" muted>Texto auxiliar (caption).</Text>

// Trecho inline, dentro de outro bloco de texto
<Text as="span" weight="medium">Texto inline.</Text>
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
| Prop `as` inclui `"div"` além de `"p"`/`"span"` (que são os únicos documentados no Nimbus real, fonte 2/3). | Restringir `as` a só `"p" \| "span"`, fiel 1:1 ao Nimbus. | Remover `"div"` do union type `TextElement` em `src/components/ui/text.tsx` e do `argTypes.as.options` em `text.stories.tsx`. |
| Cor via prop booleana `muted` (`text-foreground`/`text-muted-foreground`) em vez de replicar a prop `color` do Nimbus (22 variações semânticas). | Criar uma prop `variant`/`color` com um subconjunto das 22 cores do Nimbus, mapeando para tokens novos ou existentes. | Adicionar um novo eixo `color`/`variant` ao `cva` em `text.tsx` (`variants: { color: {...} }`) quando o catálogo tiver tokens de cor de texto por família semântica definidos; `muted` pode conviver ou ser substituído. |
| `size` mapeado para `text-xs`/`text-sm`/`text-base` (não `text-sm`/`text-base`/`text-lg`) — ou seja, `base` (default) = `text-sm`, não `text-base`. | Mapear `base` → `text-base` (leitura literal do nome). | Trocar os valores de classe dentro de `textVariants.variants.size` em `text.tsx`. Justificativa da escolha atual: `text-sm` já é o tamanho de corpo/descrição padrão usado em `card.tsx`, `item.tsx`, `alert.tsx` neste catálogo (fonte 5) — manter `base` como `text-base` deixaria o Text maior que o corpo de texto já estabelecido em todo o resto da UI. |
| Sem `Text.Skeleton`, mesmo o Nimbus real tendo (fonte 2/3). | Adicionar `Text.Skeleton` via `Object.assign`, mesmo padrão de `Chip.Skeleton`/`Button.Skeleton`. | Adicionar um componente `TextSkeleton` em `text.tsx` e compor via `Object.assign(Text, { Skeleton: TextSkeleton })`, mesmo mecanismo já usado em `chip.tsx`/`button.tsx`. Não incluído porque o escopo da tarefa não pediu explicitamente e para manter o componente no menor formato possível dado que é puramente tipográfico (sem estado de carregamento assíncrono típico). |

---

## Arquivos criados nesta tarefa

- `src/components/ui/text.tsx`
- `src/components/examples/text-demo.tsx`
- `src/components/ui/text.stories.tsx`
- `.build/componentes/text.md` (este arquivo)

Não foram editados os arquivos compartilhados
(`atomic-registry.ts`, `components-registry.ts`,
`composition-registry.ts`, `examples-mapping.ts`,
`examples/registry.tsx`, `component-docs.ts`,
`generic-playground.tsx`, `variant-preview.tsx`,
`PLANO-LOOP-80-20-TEMPLATES.md`) — as linhas exatas para cada um foram
retornadas no relatório final da tarefa, para colagem por outro
processo.
