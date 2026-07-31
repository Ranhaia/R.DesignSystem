# Spec — Icon Button (Atom)

Status: especificação + implementação já feitas nesta sessão (código em
`src/`, ver seção "Arquivos criados" abaixo).
Parente mais próximo (definido em `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 6.1):
Button — já suporta ícone-only via prop `icon` sem `label`, mas exige
`aria-label` só por convenção documental (o tipo não obrigava). Icon Button
é essa variante formalizada como componente próprio.

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/icon-button` — README publicado**
   `https://unpkg.com/@nimbus-ds/icon-button/README.md`
   → descrição, anatomia ("circular shape and an icon"), guidelines de uso
   (limitação de espaço, ação resumível num ícone só, combinar com
   Tooltip), regra de AriaLabel ("This component does not have visible
   text... we need to add a description that makes it clear what action
   is behind the chosen icon"), componente relacionado (Button).
2. **`@nimbus-ds/icon-button` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/icon-button/dist/index.d.ts`
   → `IconButtonProperties extends IconButtonSprinkle`: `as?: "button" |
   "div"`, `source: ReactNode` (o ícone), `color?: IconProps["color"]`,
   `appearance?: "ai-generative"`. De `IconButtonSprinkle`: `size?: string
   | IconButtonConditions<string>` (responsivo, sem enum fixo — é token de
   escala CSS, não um union de tamanhos nomeados), `borderColor`,
   `backgroundColor`. **Sem prop `ariaLabel` própria no typedef** — o
   componente estende os atributos nativos do elemento (`ButtonHTMLAttributes`
   por herança do elemento HTML), então `aria-label` chega como atributo
   nativo, não uma prop custom da Nimbus.
3. **`@nimbus-ds/icon-button` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/icon-button/dist/index.js`
   → confirma implementação real: `as="button"` é o elemento padrão,
   `size="2.75rem"` é o tamanho padrão (aparece 2x no bundle). Não achei
   referência a `aria-label` no bundle minificado (esperado — se é atributo
   nativo repassado via spread de props, não aparece como lógica própria
   no código compilado).
4. **Precedente interno já existente neste projeto** (não é fonte externa,
   mas é o "parente mais próximo" real, já revisado por Rafael):
   `src/components/ui/button.tsx` — já implementa o mecanismo de
   ícone-only (`icon` sem `label`/`children`), inclusive com o comentário
   do próprio arquivo dizendo "Botões ícone-only (`icon` sem `label`)
   ainda precisam de `aria-label`" — mas essa exigência era só documental
   (comentário + prop opcional herdada de `ComponentProps<"button">`), não
   garantida pelo tipo. Icon Button fecha essa lacuna.
5. `src/components/ui/chip.tsx` — padrão de código mais recente do
   catálogo (`data-slot`, wrapper reaproveitando `<Button variant="ghost"
   size="icon-xs">` internamente pro botão de remover — mesma técnica de
   "wrapper fino em cima do Button" usada aqui).
6. `src/lib/component-docs.ts` (entradas `button`, `chip`) e
   `src/lib/composition-registry.ts` — formato exato de saída exigido.

**Não encontrado / não assumido:** a Nimbus não expõe um union de tamanhos
nomeados pra Icon Button (`size` é uma string de escala CSS livre,
default `"2.75rem"` ≈ 44px) — não é 1:1 com as 4 escalas quadradas que o
Button deste projeto já tem (`icon`=36px, `icon-xs`=24px, `icon-sm`=32px,
`icon-lg`=40px). Decisão tomada: reaproveitar as 4 escalas do Button (ver
seção "Tamanhos" abaixo) em vez de inventar uma 5ª escala livre — mantém
consistência com o resto do catálogo. `color`/`appearance="ai-generative"`
do Nimbus não foram replicados como props próprias — já cobertos pela
prop `variant` herdada do `buttonVariants` (inclusive `ai-primary`/
`ai-secondary`, equivalente ao `appearance="ai-generative"`).

---

## Descrição

*(localizado do README oficial do `@nimbus-ds/icon-button`, fonte 1 acima)*

Ícones são usados para comunicar visualmente partes centrais do produto e
ações disponíveis. Icon Button formaliza um botão cujo único conteúdo é um
ícone — sem texto visível.

## Quando utilizar

*(localizado do README oficial, fonte 1 acima)*

- Use Icon Button quando há limitação de espaço ou quando uma ação pode
  ser perfeitamente representada por um ícone só.
- Pode ser combinado com Tooltip, mostrando uma descrição breve da ação.
- O ícone precisa deixar clara a ação sem necessidade de texto — se não
  for possível resumir a ação num ícone, considere outro componente
  (Button com label).
- **Componente relacionado**: Button — use Button (com label) em
  mudanças de estado/página em contextos sem limitação de espaço, ou
  quando um ícone sozinho não comunica a ação.

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | O próprio `<Button>` interno (ver `icon-button.tsx`) — `<button>` (ou o filho, via `asChild`) com `data-slot="icon-button"` sobrescrevendo o `data-slot="button"` do Button interno, e `data-variant`/`data-size` do Button preservados. |
| Ícone | Nó via prop `icon`, sempre obrigatório (tipo não aceita `undefined`) — único conteúdo do botão. |
| Nome acessível | `aria-label`, obrigatório via tipo (`"aria-label": string`, não opcional) — nunca dá pra montar um `<IconButton />` sem ele, erro de compilação, não só de lint/revisão. |
| Skeleton (`IconButton.Skeleton`) | Reaproveita `Button.Skeleton` (mesmo mecanismo `Object.assign` do Button/Chip), restrito às 4 escalas quadradas. |

---

## Composição

Export único: **`IconButton`** (mesmo padrão de `Chip`/`Button` — sem
subcomponentes de composição, ícone é prop, não filho JSX).

Entrada esperada em `composition-registry.ts`:
```ts
"icon-button": ["IconButton"],
```

---

## Variantes

Reaproveita 100% o `variant` de `buttonVariants` (nenhuma variante nova
criada) — inclui as variantes `ai-primary`/`ai-secondary`, que já cobrem o
`appearance="ai-generative"` do Nimbus (fonte 2 acima) sem precisar de uma
prop own separada.

| Nome | Valor da prop | Descrição |
|---|---|---|
| Primary | `default` | Ação principal ícone-only. Usa `--primary`. |
| Secondary | `secondary` | Ação secundária, menor ênfase. |
| Outline | `outline` | Contorno com fundo neutro. |
| Ghost | `ghost` | Sem fundo nem borda até o hover — uso mais comum de Icon Button (toolbars, ações inline). |
| Destructive | `destructive` | Ações irreversíveis (excluir, remover). |
| Link | `link` | Aparência de link, sem fundo (uso raro num ícone-only, mas herdado do Button por completude). |
| AI Primary | `ai-primary` | Ação de IA com hierarquia principal — equivalente a `appearance="ai-generative"` do Nimbus (fonte 2). |
| AI Secondary | `ai-secondary` | Ação de IA complementar — mesmos tokens `--ai-*`. |

---

## Tamanhos

**Decisão provisória — não é 1:1 com o Nimbus.** O Nimbus usa `size` como
string de escala CSS livre (default `"2.75rem"` ≈ 44px, fonte 3). Este
projeto já tem 4 escalas quadradas nomeadas no `buttonVariants`
(`icon`/`icon-xs`/`icon-sm`/`icon-lg`) usadas por todo botão ícone-only do
catálogo — Icon Button reaproveita exatamente essas 4 em vez de inventar
uma 5ª escala livre baseada no valor solto do Nimbus. `size` é
**restrito por tipo** a só essas 4 (as escalas com padding horizontal do
Button — `default`/`xs`/`sm`/`lg` — não fazem sentido pra um botão
só-ícone e são excluídas do union).

| Nome | Valor da prop | Descrição |
|---|---|---|
| icon (default) | `icon` | `size-9` (36px) — tamanho padrão. |
| icon-xs | `icon-xs` | `size-6` (24px). |
| icon-sm | `icon-sm` | `size-8` (32px). |
| icon-lg | `icon-lg` | `size-10` (40px). |

---

## Estados

Idênticos aos do Button (herdados, nenhum CSS novo escrito):

| Estado | Descrição |
|---|---|
| Default | Estado de repouso. |
| Hover | Muda fundo/opacidade conforme a variante; no variant `default`, elevação (shadow) diminui e desce 1px, mesmo feedback físico do Button. |
| Active | Durante o clique/pressionamento. |
| Focus | `focus-visible:ring`, herdado do Button — nenhum CSS de foco novo. |
| Disabled | prop `disabled` — opacidade reduzida, pointer-events desativado. |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `icon` | `React.ReactNode` | — (obrigatório) | Ícone exibido — único conteúdo do botão. Equivalente à prop `source` do Nimbus (fonte 2), renomeado pra `icon` por consistência com a prop `icon` que o Button deste projeto já usa. |
| `"aria-label"` | `string` | — (obrigatório) | Nome acessível. Obrigatório **via tipo** (não apenas convenção) — a diferença central entre usar `<Button icon={...} size="icon">` direto (onde `aria-label` é opcional no tipo) e usar `<IconButton icon={...} />` (onde o TypeScript recusa compilar sem `aria-label`). |
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link" \| "ai-primary" \| "ai-secondary"` | `"default"` | Estilo visual, idêntico ao `variant` do Button — nenhuma variante nova. |
| `size` | `"icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"icon"` | Dimensão — restrito às 4 escalas quadradas do Button (ver seção Tamanhos). |
| `asChild` | `boolean` | `false` | Renderiza as props no elemento filho (via Radix Slot, herdado do Button) em vez de `<button>`. |
| `disabled` | `boolean` | `false` | Desativa interação e reduz opacidade. |
| `...props` | `Omit<React.ComponentProps<typeof Button>, "icon" \| "label" \| "children" \| "size" \| "aria-label">` | — | Demais atributos nativos de `<button>` e props do Button (`fullWidth`, `onClick`, `type`, etc.) — `label`/`children` ficam de fora de propósito: Icon Button nunca tem conteúdo além do ícone. |

---

## Acessibilidade mínima exigida

- **Nome acessível obrigatório por tipo, não só por convenção**: essa é a
  motivação central do componente — `"aria-label": string` (não opcional)
  no tipo de `IconButtonProps`, em vez de herdar o `aria-label?: string`
  opcional de `React.ComponentProps<"button">`. Confirmado com
  `tsc --noEmit`: tentar montar `<IconButton icon={...} />` sem
  `aria-label` falha a compilação.
- **Foco visível**: herdado do `focus-visible:ring` já presente em
  `buttonVariants` — nenhum CSS de foco novo escrito.
- **Alcançável via `Tab` / ativável via `Enter`/`Space`**: garantido de
  graça por ser um `<button>` nativo (via Button interno), sem handler de
  teclado customizado.
- **Ícone semântico, não decorativo**: o `<Icon>` usado dentro de `icon`
  não precisa de `aria-hidden` próprio — o nome acessível do botão inteiro
  já vem do `aria-label`, o ícone é puramente visual dentro dele (mesmo
  padrão que os `<Icon>` dentro de `<Button icon={...} label={...}>` já
  seguem no resto do catálogo).

---

## Código de exemplo

```tsx
import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"

// Icon Button padrão
<IconButton icon={<Icon name="favorite" />} aria-label="Favoritar" />

// Variante ghost (uso mais comum em toolbars/ações inline)
<IconButton
  variant="ghost"
  size="icon-sm"
  icon={<Icon name="more_horiz" />}
  aria-label="Mais opções"
/>

// Ação destrutiva
<IconButton
  variant="destructive"
  icon={<Icon name="delete" />}
  aria-label="Excluir"
/>

// Placeholder de carregamento
<IconButton.Skeleton size="icon" />
```

---

## Arquivos criados nesta sessão

- `src/components/ui/icon-button.tsx` — componente.
- `src/components/examples/icon-button-demo.tsx` — demo funcional.
- `src/components/ui/icon-button.stories.tsx` — Storybook.
- `.build/componentes/icon-button.md` — este arquivo.

Registro em `atomic-registry.ts` / `components-registry.ts` /
`composition-registry.ts` / `examples-mapping.ts` /
`examples/registry.tsx` / `component-docs.ts` / `generic-playground.tsx`
**não foi feito por este agente** (fora do escopo desta tarefa — regra
explícita recebida: não editar arquivos compartilhados). Os trechos
exatos pra colar em cada um foram devolvidos na resposta final do agente,
pra outro processo aplicar.

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado.)
