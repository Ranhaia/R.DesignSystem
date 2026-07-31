# Spec — SplitButton (Molecule)

Status: implementado — código criado em `src/components/ui/split-button.tsx`,
`src/components/examples/split-button-demo.tsx` e
`src/components/ui/split-button.stories.tsx`. Este arquivo documenta a
pesquisa e as decisões que sustentam essa implementação.

Parente mais próximo (definido em `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 6.1):
`ButtonGroup` (visual de "colado") + `Button` (ação principal) +
`Button size="icon"` (trigger do menu) + `DropdownMenu` (já existentes no
catálogo — nenhum menu/popover foi reimplementado do zero).

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/split-button` — README publicado**
   `https://unpkg.com/@nimbus-ds/split-button/README.md`
   → descrição real (única seção substantiva do README, que é curto —
   não tem seção própria "quando usar", "props" ou "exemplos" como o
   README do `@nimbus-ds/chip` tem): *"The component merges a primary
   action button with a dropdown containing related secondary actions,
   enabling users to access the most frequently used option while
   offering additional choices via a popover menu."*
2. **`@nimbus-ds/split-button` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/split-button/dist/index.d.ts`
   → API real (compound component), confirmada verbatim:
   ```ts
   export interface SplitButtonProperties {
     children: ReactNode
     disabled?: boolean
     open?: boolean
     onOpenChange?: (open: boolean) => void
     popoverPosition?: PopoverProps["position"]
   }
   export interface SplitButtonPrimaryProperties {
     children: ReactNode
     onClick?: () => void
   }
   export interface SplitButtonSecondaryProperties {
     children: ReactNode
     ariaLabel?: string
   }
   export interface SplitButtonActionProperties {
     children: ReactNode
     icon?: ReactNode
     onClick?: () => void
     disabled?: boolean
   }
   export interface SplitButtonComponents {
     Action: typeof SplitButtonAction
     Primary: typeof SplitButtonPrimary
     Secondary: typeof SplitButtonSecondary
   }
   ```
   → confirma: componente raiz controla `disabled`/`open`/`onOpenChange`/
   `popoverPosition`; `.Primary` é a ação principal (`children` +
   `onClick`); `.Secondary` é o trigger ícone-only do menu, com
   `ariaLabel` como prop própria (confirma que o Nimbus real também trata
   este botão como precisando de nome acessível dedicado, por ser
   ícone-only); `.Action` são os itens do menu (`children` = label,
   `icon` opcional, `onClick`, `disabled`).
3. **`@nimbus-ds/split-button` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/split-button/dist/index.js`
   → confirma na implementação real: `aria-label` default do trigger
   ícone-only é `"Show more actions"`; `aria-expanded`/`aria-haspopup`
   gerenciados automaticamente pelo popover; `type="button"` em ambos os
   botões (Primary e Secondary — nenhum dos dois é submit por padrão);
   tokens de cor reais usados no menu: `neutral-background`,
   `neutral-surface` (hover dos itens), `neutral-textHigh`,
   `neutral-textDisabled`.
4. Tentativas sem sucesso (documentadas por transparência, não
   inventadas): página de documentação viva do Storybook da Nimbus
   (`nimbus.tiendanube.com`) não pôde ser lida por depender de JS
   client-side; espelho do README no GitHub
   (`raw.githubusercontent.com/TiendaNube/nimbus-design-system/...`)
   retornou 404 (mesma limitação de estrutura de monorepo já registrada
   em `chip.md`, fonte 4 de lá).
5. **Precedente interno já existente neste projeto** (não é fonte
   externa, mas é o parente mais próximo já implementado e revisado):
   `src/components/examples/button-group-dropdown.tsx` — já implementa
   exatamente a composição `ButtonGroup` + `Button` + `DropdownMenu` +
   `Button size="icon"` com `<Icon name="keyboard_arrow_down" />` como
   trigger. Usado como referência de código mais próxima pra decidir a
   anatomia interna do SplitButton (mesma composição, só que reempacotada
   num componente único e documentado, com o `aria-label` que o exemplo
   original não tinha).
6. `src/components/ui/chip.tsx`, `src/components/ui/button.tsx`,
   `src/components/ui/button-group.tsx`, `src/components/ui/dropdown-menu.tsx`
   — padrão de código (cva, data-slot, tokens, convenção de props do
   Button que o SplitButton herda: `icon`/`label` opcionais).
7. `src/lib/component-docs.ts` (entradas `button`, `chip`) e
   `src/lib/composition-registry.ts` — formato exato de saída exigido.
8. Grep em `src/components/ui/*.tsx` por `name="` — confirmou
   `keyboard_arrow_down` como o chevron-baixo já padronizado no catálogo
   (usado em `accordion.tsx`, `calendar.tsx`, `combobox.tsx`,
   `native-select.tsx`, `navigation-menu.tsx`, `select.tsx`) — escolhido
   em vez de inventar um novo ícone de chevron.

**Não encontrado / não assumido:** seção explícita "quando usar" no
README do Nimbus (diferente do `@nimbus-ds/chip`, que tinha uma seção
dedicada) — não inventei uma; a seção "Quando utilizar" abaixo é uma
paráfrase direta da mesma frase de descrição já sourced (fonte 1), não
uma orientação adicional documentada separadamente pelo Nimbus.
Comportamento de teclado detalhado (ex.: `ArrowDown` abrindo o menu a
partir do trigger) não aparece de forma explícita no bundle minificado
consultado — não assumido; neste projeto o comportamento de teclado é
100% herdado do Radix `DropdownMenu` já implementado e testado em
`dropdown-menu.tsx` (Enter/Space/ArrowDown abrem, Escape fecha, setas
navegam os itens — comportamento nativo do primitive, não código próprio
do SplitButton).

---

## Descrição

*(traduzida da descrição real do README do `@nimbus-ds/split-button`,
fonte 1 acima)*

O SplitButton combina um botão de ação primária com um menu suspenso de
ações secundárias relacionadas, permitindo que o usuário acesse
rapidamente a opção mais usada, com a opção de escolher outras ações
relacionadas através de um menu.

## Quando utilizar

*(paráfrase direta da mesma descrição sourced acima — o README do
Nimbus não tem uma seção "quando usar" separada, diferente do
`@nimbus-ds/chip`; não inventei orientação adicional)*

- Use quando existe uma ação principal clara e mais frequente, mas
  também existem 1+ ações secundárias relacionadas que fariam sentido
  no mesmo lugar (ex.: "Salvar" como principal, com "Salvar como
  rascunho"/"Salvar e sair" como secundárias).
- Não é um substituto de `DropdownMenu` genérico — o botão principal
  precisa ser clicável e executar uma ação por si só, sem abrir o menu;
  se todas as opções tiverem peso igual (nenhuma é "a ação mais comum"),
  um `DropdownMenu` simples ou `ButtonGroup` com botões separados é mais
  apropriado.

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | `ButtonGroup` (já existente no catálogo) com `data-slot="split-button"` sobrescrevendo o `data-slot="button-group"` padrão — visual "colado" (bordas internas removidas, cantos só nas pontas) herdado de graça do `ButtonGroup`. |
| Botão de ação principal | `<Button>` com `label`/`icon`/`onClick` repassados diretamente. Sempre a primeira "peça" do grupo. |
| Trigger do menu (ícone-only) | `<Button size="icon\|icon-sm\|icon-lg">` dentro de `DropdownMenuTrigger asChild`, contendo `<Icon name="keyboard_arrow_down" />`. Precisa de `aria-label` próprio (prop `triggerLabel`) por ser ícone-only. |
| Menu suspenso | `DropdownMenu` + `DropdownMenuContent` (já existentes) — abre a partir do trigger, alinhamento controlável via prop `align` (default `"end"`). |
| Itens do menu | Composição via `children` — `DropdownMenuItem`/`DropdownMenuSeparator`/`DropdownMenuLabel` etc., os mesmos subcomponentes já exportados por `dropdown-menu.tsx`. Nenhum item é reimplementado. |

---

## Composição

Export único: **`SplitButton`** — mesmo padrão de export único que
`Chip`/`Badge` já usam neste catálogo (ver `composition-registry.ts`).
Internamente reaproveita 100% de componentes já existentes e já
registrados (`ButtonGroup`, `Button`, `DropdownMenu`,
`DropdownMenuTrigger`, `DropdownMenuContent` — os itens do menu em si
vêm de fora, via `children`, usando `DropdownMenuItem` etc. já expostos
por `dropdown-menu.tsx`). Não há subcomponentes próprios do SplitButton
(`SplitButtonPrimary`, `SplitButtonAction` etc.) — decisão que diverge
do Nimbus real (que expõe um compound component com `.Primary`,
`.Secondary`, `.Action`), ver "Decisões não-técnicas" abaixo.

Entrada esperada em `composition-registry.ts`:
```ts
"split-button": ["SplitButton"],
```

---

## Variantes

Reaproveita 1:1 a escala de `variant` do `Button` (`buttonVariants` em
`button.tsx`) — aplicada igualmente ao botão principal e ao trigger do
menu, pra manter a leitura visual de "peça única colada". Não é uma
variante própria do SplitButton, é herdada.

| Nome | Valor da prop | Descrição |
|---|---|---|
| Default | `default` | Ação principal com maior ênfase visual (`bg-primary`). |
| Secondary | `secondary` | Ênfase intermediária. |
| Outline | `outline` | Borda, sem preenchimento sólido. |
| Ghost | `ghost` | Sem superfície própria — nota: sem borda, o efeito "colado" do ButtonGroup fica menos perceptível (mesma limitação inerente ao Button, não um bug do SplitButton). |
| Destructive | `destructive` | Ação principal destrutiva. |
| Link | `link` | Texto puro — mesma nota de `ghost` acima sobre o efeito "colado". |

---

## Tamanhos

Escala própria e reduzida (`default \| sm \| lg`) — **não** é 1:1 com a
escala completa de `size` do Button (`xs`, `icon-*` ficam de fora): o
botão principal do SplitButton sempre tem `label` (nome acessível
visível), então os sizes ícone-only do Button não fazem sentido na
raiz. O trigger do menu deriva automaticamente o size ícone-only
correspondente:

| `size` do SplitButton | Size do botão principal | Size do trigger (derivado) |
|---|---|---|
| `sm` | `sm` | `icon-sm` |
| `default` | `default` | `icon` |
| `lg` | `lg` | `icon-lg` |

---

## Estados

| Estado | Descrição |
|---|---|
| Default | Estado de repouso. |
| Hover | Herdado do `Button` — cada botão (principal e trigger) reage independentemente. |
| Focus | Herdado do `Button` (`focus-visible:ring`) — `[&>*]:focus-visible:z-10` do `ButtonGroup` garante que o anel de foco não fica cortado pelo botão vizinho colado. |
| Disabled | prop `disabled` na raiz — desativa o botão principal e o trigger do menu juntos (equivalente ao `disabled` do `SplitButtonProperties` real do Nimbus, fonte 2). |
| Menu aberto/fechado | Controlado pelo `DropdownMenu`/Radix internamente — sem prop de controle externo neste componente (ver "Decisões não-técnicas": Nimbus real expõe `open`/`onOpenChange` controlados, este componente não). |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `React.ReactNode` | — (obrigatório) | Texto da ação principal — nome acessível do botão principal. |
| `icon` | `React.ReactNode` | — | Ícone opcional antes do label, na ação principal. |
| `onClick` | `() => void` | — | Handler da ação principal. Equivalente a `SplitButtonPrimaryProperties.onClick` do Nimbus (fonte 2). |
| `variant` | `VariantProps<typeof buttonVariants>["variant"]` | `"default"` | Estilo visual — aplicado ao botão principal e ao trigger do menu. Ver seção Variantes. |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Tamanho do botão principal; o trigger deriva o size ícone-only correspondente. Ver seção Tamanhos. |
| `disabled` | `boolean` | `false` | Desativa toda a composição (botão principal + trigger do menu). Equivalente a `SplitButtonProperties.disabled` do Nimbus (fonte 2). |
| `triggerLabel` | `string` | `"Mais ações"` | `aria-label` do botão-trigger do menu (ícone-only). Localizado pra pt-BR a partir do default real do Nimbus, `"Show more actions"` (confirmado no bundle compilado, fonte 3) — mesmo papel de `SplitButtonSecondaryProperties.ariaLabel`. |
| `align` | `"start" \| "center" \| "end"` | `"end"` | Alinhamento do menu suspenso em relação ao trigger — repassado ao `DropdownMenuContent`. |
| `children` | `React.ReactNode` | — (obrigatório) | Itens do menu, compostos via `DropdownMenuItem`/`DropdownMenuSeparator`/etc. Renderizado dentro do `DropdownMenuContent`. |
| `className` | `string` | — | Aplicado ao `ButtonGroup` raiz. |
| `...props` | `Omit<React.ComponentProps<typeof ButtonGroup>, "children" \| "orientation">` | — | Demais atributos nativos repassados ao `ButtonGroup` raiz (`orientation` fica de fora de propósito, ver "Decisões não-técnicas"). |

---

## Acessibilidade mínima exigida

- **Botão-trigger do menu precisa de `aria-label` próprio**, porque é
  ícone-only (`<Icon name="keyboard_arrow_down" />` sem texto visível) —
  mesma regra já aplicada em `button.tsx` para botões ícone-only, e a
  mesma que o Nimbus real aplica (`ariaLabel` na `SplitButtonSecondary`,
  default real `"Show more actions"`, confirmado no bundle, fonte 3).
  Localizado para pt-BR via a prop `triggerLabel` (default `"Mais
  ações"`).
- **Navegação por teclado**: 100% herdada do `DropdownMenu`/Radix já
  implementado em `dropdown-menu.tsx` — `Tab` alcança o botão principal
  e depois o trigger (ambos `<button>` nativos); `Enter`/`Space`/
  `ArrowDown` no trigger abrem o menu; setas navegam os itens; `Escape`
  fecha. Nenhum handler de teclado customizado foi escrito neste
  componente.
- **`aria-expanded`/`aria-haspopup`**: gerenciados automaticamente pelo
  `DropdownMenuTrigger` (Radix), sem necessidade de código extra — mesmo
  comportamento confirmado no bundle real do Nimbus (fonte 3).
- **Foco visível**: herdado do `focus-visible:ring` de `button.tsx`,
  mais o `[&>*]:focus-visible:z-10` do `ButtonGroup`, que garante que o
  anel de foco de um botão colado não fica cortado pela borda do botão
  vizinho.
- **`disabled`**: quando `true`, ambos os botões (`disabled` nativo) —
  ficam fora da árvore de tab, sem interação por mouse/teclado.

---

## Código de exemplo

```tsx
import { SplitButton } from "@/components/ui/split-button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

<SplitButton label="Salvar" onClick={handleSave}>
  <DropdownMenuItem onClick={handleSaveAsDraft}>
    <Icon name="draft" />
    Salvar como rascunho
  </DropdownMenuItem>
  <DropdownMenuItem onClick={handleSaveAndExit}>
    <Icon name="logout" />
    Salvar e sair
  </DropdownMenuItem>
</SplitButton>
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

## Decisões não-técnicas tomadas

| Decisão | Alternativa considerada | Como reverter |
|---|---|---|
| Export único `SplitButton` com props diretas (`label`/`icon`/`onClick` pra ação principal, `children` pra itens do menu), em vez de compound component (`SplitButton.Primary`/`.Secondary`/`.Action`, como o Nimbus real faz) | Espelhar 1:1 o compound component do Nimbus | Trocar a assinatura em `split-button.tsx` por 4 exports (`SplitButton`, `SplitButtonPrimary`, `SplitButtonSecondary`, `SplitButtonAction`) e atualizar `composition-registry.ts` pra listar os 4 |
| Itens do menu via `children` composto com `DropdownMenuItem` (JSX), não um array de dados `items: {label, onClick}[]` | Array de dados como prop `items` | Adicionar uma prop `items?: {label, icon?, onClick, disabled?}[]` opcional em `split-button.tsx` que renderiza `DropdownMenuItem` internamente, mantendo `children` como alternativa avançada |
| `size` do SplitButton restrito a `"default" \| "sm" \| "lg"` (sem `xs`/`icon-*`) | Aceitar a escala completa de `size` do Button na raiz | Trocar o tipo `SplitButtonSize` e o `triggerSizeMap` em `split-button.tsx` pra cobrir `xs` também (mapeando pra `icon-xs`) |
| `orientation` do `ButtonGroup` omitida da API pública (SplitButton sempre horizontal) | Expor `orientation` como no `ButtonGroup` genérico | Remover `"orientation"` do `Omit<...>` na interface `SplitButtonProps` em `split-button.tsx` |
| Sem controle externo de `open`/`onOpenChange` (estado do menu não é controlado por prop, diferente do Nimbus real) | Expor `open`/`onOpenChange` repassados ao `DropdownMenu` interno | Adicionar as duas props em `SplitButtonProps` e repassar ao `<DropdownMenu open={open} onOpenChange={onOpenChange}>` em `split-button.tsx` |
| Sem `SplitButton.Skeleton` (diferente de `Chip.Skeleton`/`Button.Skeleton`, que já existem no catálogo) | Adicionar skeleton por consistência com os outros dois | Adicionar `SplitButtonSkeleton` em `split-button.tsx` seguindo o mesmo padrão `Object.assign` já usado em `button.tsx`/`chip.tsx` |
| Ícone do trigger: `keyboard_arrow_down` (confirmado por grep como o chevron-baixo já padronizado no catálogo) | `expand_more` (também existe na família Material Symbols, mas não está em uso em nenhum componente deste catálogo hoje) | Trocar o `name` do `<Icon>` em `split-button.tsx` |
| `triggerLabel` default `"Mais ações"` (localização de `"Show more actions"`, default real do Nimbus) | Deixar sem default, exigindo a prop sempre | Remover o default `= "Mais ações"` na desestruturação de `split-button.tsx`, tornando `triggerLabel` obrigatório |

---

## Confirmações

- **Zero cor hardcoded**: `split-button.tsx` não declara nenhuma classe
  de cor própria — todo o visual (fundo, texto, borda, hover, foco,
  disabled) vem 100% herdado de `Button`/`ButtonGroup`/`DropdownMenu`
  já existentes, via `variant`/tokens já wireados nesses componentes.
  Nenhuma classe tipo `bg-[#...]`/`text-[#...]` foi escrita.
- **Ícone do chevron confirmado por grep**: `keyboard_arrow_down`, já em
  uso em `accordion.tsx`, `calendar.tsx`, `combobox.tsx`,
  `native-select.tsx`, `navigation-menu.tsx`, `select.tsx` — grep
  rodado em `src/components/ui/*.tsx` antes da escolha (ver fonte 8
  acima), nenhum ícone novo foi introduzido.
- **Navegação por teclado**: funcional, 100% herdada do `DropdownMenu`
  (Radix) já implementado e já auditado neste catálogo — nenhum handler
  de teclado próprio foi escrito em `split-button.tsx`.
- **Botão do menu com `aria-label` próprio**: sim — `aria-label={triggerLabel}`
  aplicado diretamente no `<Button>` ícone-only que serve de trigger,
  com default localizado `"Mais ações"`.
