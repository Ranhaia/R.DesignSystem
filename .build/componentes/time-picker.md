# Spec — TimePicker (Organism)

Status: código implementado nesta sessão em `src/components/ui/time-picker.tsx`
(catálogo Fase 6.1, `PLANO-LOOP-80-20-TEMPLATES.md`). Este arquivo é a
especificação de pesquisa/decisões — os arquivos compartilhados
(`component-docs.ts`, `atomic-registry.ts`, `components-registry.ts`,
`composition-registry.ts`, `examples-mapping.ts`,
`src/components/examples/registry.tsx`) **não** foram editados por este
processo; as entradas prontas para colar estão na resposta final da tarefa,
não neste arquivo.

Parente de referência (indicado na tarefa): **Calendar**
(`src/components/ui/calendar.tsx`) — composição `Popover` + `PopoverTrigger`
+ `PopoverContent` com estado controlado, mesmo padrão de composição
reaproveitado aqui (não reimplementa popover do zero). O precedente de
código mais próximo já existente no projeto é
`src/components/examples/date-picker-demo.tsx` (Button trigger com ícone +
horário/data formatado, `PopoverContent className="w-auto p-0"`).

---

## Fonte(s) consultada(s)

1. **`@nimbus-ds/time-picker` — README publicado**
   `https://unpkg.com/@nimbus-ds/time-picker/README.md`
   → descrição: "TimePicker component allows users to select a time value
   with support for different picker modes and time formats." Props reais
   documentadas: `value` (`string | Date | null`), `onChange`, `format`
   (`"12h" | "24h"`, default `"24h"`), `mode` (`"scroll" | "dropdown"`,
   default `"scroll"`), `step` (número, intervalo em minutos, default `30`
   — só descrito como aplicável ao modo dropdown), `minTime`, `maxTime`,
   `disabled`, `placeholder` (default `"Select time"`). Dois modos
   documentados: **Scroll** (colunas roláveis separadas de hora e minuto, e
   AM/PM em formato 12h) e **Dropdown** (lista rolável de horários
   pré-formatados baseada no `step`). Seção de acessibilidade do próprio
   README cita: "Full keyboard navigation support", "ARIA attributes for
   screen readers", "Focus management within the picker panel".
2. **`@nimbus-ds/time-picker` — `package.json` publicado**
   `https://unpkg.com/@nimbus-ds/time-picker/package.json`
   → confirma que o pacote existe de fato (versão `1.0.1`, licença MIT,
   repositório `TiendaNube/nimbus-design-system`) e suas dependências reais:
   `@floating-ui/react`, `@nimbus-ds/icon`, `@nimbus-ds/icons`,
   `@nimbus-ds/input`, `@nimbus-ds/scroll-pane`, `@nimbus-ds/styles` — a
   presença de `@nimbus-ds/scroll-pane` como dependência confirma que o modo
   "scroll" (default) realmente usa um componente de rolagem dedicado,
   equivalente ao nosso `ScrollArea`.
3. **`@nimbus-ds/time-picker` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/time-picker/dist/index.d.ts`
   → confirma os tipos: `TimeFormat = "12h" | "24h"`, `AmPm = "AM" | "PM"`,
   `TimePickerMode = "scroll" | "dropdown"`, interface `TimeValue` (hours,
   minutes, `ampm` opcional), `TimePickerLabels` (rótulos localizáveis),
   `TimePickerProperties` (18+ propriedades), export como
   `ForwardRefExoticComponent` com suporte a `ref` para `HTMLDivElement`.
4. `src/components/ui/calendar.tsx` — padrão de composição Popover + estado
   controlado (referência de padrão indicada na tarefa).
5. `src/components/examples/date-picker-demo.tsx` — precedente interno mais
   próximo já existente: `Button` trigger com `Icon` + valor formatado
   (ou placeholder em `text-muted-foreground`), dentro de
   `PopoverContent className="w-auto p-0"`.
6. `src/components/ui/select.tsx` — usado como peça de composição real (ver
   decisão de arquitetura abaixo).
7. `src/lib/component-docs.ts` (entradas `chip`, `button`) — formato exato
   de saída exigido.

**Não encontrado / não assumido:** o `.tsx`/`.js` compilado real do
`@nimbus-ds/time-picker` não foi inspecionado linha a linha (diferente do
que foi feito para `@nimbus-ds/chip` na sessão anterior) — o README e o
`.d.ts` foram suficientes para confirmar API e comportamento de alto nível,
mas detalhes finos de interação (ex.: o que exatamente `Focus management
within the picker panel` faz ao trocar de coluna) não foram confirmados
byte a byte. `minTime`/`maxTime` (documentados no Nimbus) **não foram
implementados** nesta versão — não há um padrão equivalente já estabelecido
neste catálogo para desabilitar itens individuais de um `Select`, e a
tarefa pediu a composição mais simples que cubra o caso de uso central
(selecionar hora:minuto). Registrado aqui como gap conhecido, não
inventado.

---

## Decisão de arquitetura: Select + Select, não ScrollArea + botões

A tarefa deu duas opções e pediu para decidir pela mais simples de
implementar **corretamente**: (a) 2-3 `Select`s combinados, ou (b) lista(s)
rolável(eis) com `ScrollArea` + botões (o padrão que o próprio Nimbus usa
no modo "scroll", seu default).

**Decisão: (a) — dois `Select` (Hora, Minuto), com um terceiro (Período)
quando `format="12h"`.**

Motivo, ligado diretamente ao requisito de acessibilidade mínima obrigatória
da tarefa ("Navegação por teclado dentro do popover — herdada do
Select/ScrollArea que você reaproveitar, não precisa handler customizado se
usar as peças certas"):

- `SelectContent`/`SelectItem` (`src/components/ui/select.tsx`, sobre
  `radix-ui` `Select`) já implementam de graça: seta para cima/baixo
  percorrendo os itens, `Home`/`End`, busca por digitação (typeahead),
  `Escape` fechando só aquele Select, e foco devolvido ao respectivo
  `SelectTrigger` ao fechar — sem nenhum handler de teclado escrito à mão.
- Uma lista de botões dentro de `ScrollArea` (opção b) **não** dá isso de
  graça: `ScrollArea` (`src/components/ui/scroll-area.tsx`) é só um
  contêiner de rolagem estilizado, não um padrão ARIA `listbox` com
  navegação por seta — pra ter paridade de teclado eu precisaria escrever um
  handler de `roving tabindex` na mão, exatamente o tipo de "handler
  customizado" que a tarefa pediu para evitar reaproveitando as peças
  certas.
- Consequência prática: a opção (a) cobre o requisito de teclado
  corretamente reaproveitando componentes já testados do catálogo; a opção
  (b) exigiria código novo de navegação para atingir o mesmo nível, com mais
  superfície pra errar.

Isso diverge do *default* do Nimbus real (que é `mode="scroll"`, baseado em
`@nimbus-ds/scroll-pane`), mas dentro do espaço de opções que a própria
tarefa autorizou. Reversível: se Rafael preferir visualmente o padrão
"scroll" (mais parecido com o seletor nativo de hora do iOS), a troca é
localizada — trocar o conteúdo do `PopoverContent` por `ScrollArea` +
botões, mantendo a mesma API pública (`value`/`onValueChange`/`format`).

---

## Anatomia

| Parte | Descrição |
|---|---|
| Trigger | `<Button variant="outline">` com `<Icon name="calendar_today" />` + horário formatado (`display`) ou `placeholder` em `text-muted-foreground` quando vazio — mesmo padrão de `date-picker-demo.tsx`. |
| PopoverContent | Linha (`flex`) com 2 ou 3 blocos `Select` (Hora / Minuto / Período), cada um com um rótulo de texto pequeno acima (`text-xs text-muted-foreground`). |
| Select "Hora" | Lista `00`–`23` (format 24h) ou `1`–`12` (format 12h), sempre exibida com 2 dígitos (`pad2`). |
| Select "Minuto" | Lista `00`, `00+step`, `00+2*step`, ... até `<60`, conforme `minuteStep`. |
| Select "Período" (só format 12h) | `AM` / `PM`. |

---

## Composição

Export único: **`TimePicker`** (mesmo padrão de export único que `Chip`,
`Calendar`). Não expõe subcomponentes — a composição interna (`Popover` +
`Select`) é implementação, não API pública.

Entrada esperada em `composition-registry.ts`:
```ts
"time-picker": ["TimePicker"],
```

---

## Variantes

Nenhuma variante visual (`variant`/`cva`) — o Nimbus real não expõe uma
prop de variante de cor/estilo para TimePicker (fonte 1 e 3), só `format` e
`mode`, que aqui são tratados como comportamento (não como `variant` visual
no sentido do resto do catálogo).

---

## Tamanhos

Nenhum. Mesmo tratamento que `Chip`/`Badge` — sem prop de tamanho na fonte
consultada.

---

## Estados

| Estado | Descrição |
|---|---|
| Vazio | `value` ausente/inválido — trigger mostra `placeholder` em `text-muted-foreground`, Selects internos mostram `--`. |
| Preenchido | `value` válido — trigger mostra o horário formatado conforme `format`. |
| Aberto | Popover aberto, Selects internos disponíveis para escolha (não fecha o Popover automaticamente ao escolher hora/minuto — diferente do Calendar, que fecha ao escolher uma data única; aqui a escolha é composta em 2-3 passos, então o Popover só fecha por `Escape`/clique fora/novo clique no trigger). |
| Disabled | prop `disabled` — desativa o `Button` trigger (não abre o Popover) e cada `Select` interno. |
| Foco | Devolvido ao `Button` trigger ao fechar o Popover — comportamento nativo do Radix `Popover`, não sobrescrito (confirmado por não haver `onOpenChange`/gerenciamento de foco customizado no código). |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `value` | `string` | — | Horário controlado, sempre em `"HH:mm"` 24h (ex.: `"14:30"`), independente do `format` de exibição. Equivalente ao `value` do Nimbus (fonte 1), mas fixado como string 24h em vez de aceitar também `Date`/`null` — decisão provisória de simplicidade, ver abaixo. |
| `onValueChange` | `(value: string) => void` | — | Callback dos dois/três `Select`s internos, com o `value` já recomposto em `"HH:mm"` 24h. Nome escolhido por consistência com o resto do catálogo (Select, RadioGroup usam `onValueChange`, não `onChange` como o Nimbus). |
| `format` | `"24h" \| "12h"` | `"24h"` | Formato de exibição/seleção — o `value` armazenado continua sempre 24h em qualquer um dos dois. Mesmo nome e valores do Nimbus (fonte 1 e 3). |
| `minuteStep` | `number` | `5` | Intervalo entre minutos selecionáveis (1–60). **Decisão provisória, diverge do Nimbus**: a fonte real usa default `30` só documentado para `mode="dropdown"` (fonte 1); `5` foi escolhido aqui por ser mais granular sem virar uma lista de 60 itens — não há fonte pública que valide `5` especificamente, é julgamento de usabilidade. Reversível a qualquer momento via prop. |
| `placeholder` | `string` | `"Selecione um horário"` | Texto do trigger quando `value` está vazio. Traduzido do default `"Select time"` do Nimbus (fonte 1). |
| `disabled` | `boolean` | `false` | Desativa o trigger e os `Select`s internos. Mesmo nome do Nimbus (fonte 1). |
| `className` | `string` | — | Classes aplicadas ao `Button` de trigger. |
| `contentClassName` | `string` | — | Classes aplicadas ao `PopoverContent`. |
| `...props` | `React.ComponentProps<"button">` (exceto `value`/`onChange`/`children`) | — | Demais atributos nativos repassados ao `Button` de trigger (ex.: `id`, `aria-label`, `name`). |

**Não implementado (gap conhecido, não inventado):** `mode` (`scroll`/
`dropdown`), `minTime`, `maxTime` — documentados no Nimbus real mas fora do
escopo mínimo desta tarefa (ver seção de decisão de arquitetura acima).

---

## Acessibilidade mínima exigida

- **Nome acessível do trigger**: sempre tem texto visível — o horário
  formatado (`display`) quando preenchido, ou o `placeholder` quando vazio.
  Nunca fica ícone-only, então nunca depende de `aria-label` para ter nome
  acessível (ainda assim, qualquer `aria-label` passado via `...props`
  sobrescreve/complementa normalmente, como em qualquer `Button`).
- **Navegação por teclado dentro do popover**: herdada inteiramente do
  `Select` (`radix-ui` Select) — seta para cima/baixo, `Home`/`End`,
  typeahead, `Escape` — nenhum handler de teclado customizado foi escrito
  (ver "Decisão de arquitetura" acima).
- **Foco retorna ao trigger ao fechar o popover**: comportamento nativo do
  Radix `Popover` (`src/components/ui/popover.tsx`), não sobrescrito por
  este componente — nenhum `onOpenChange`/gerenciamento de foco customizado
  foi adicionado que pudesse quebrar isso.
- **Cada `Select` interno tem `aria-label` próprio** (`"Hora"`, `"Minuto"`,
  `"Período"`) no respectivo `SelectTrigger`, porque o rótulo visível
  (`<span className="text-xs...">`) está fora do próprio `SelectTrigger`
  (não é um `<label htmlFor>` associado via DOM) — sem o `aria-label`, um
  leitor de tela anunciaria só o valor selecionado (ex. "14"), sem contexto
  do que aquele "14" representa.

---

## Código de exemplo

```tsx
import * as React from "react"
import { TimePicker } from "@/components/ui/time-picker"

function Exemplo() {
  const [time, setTime] = React.useState<string | undefined>("14:30")

  return <TimePicker value={time} onValueChange={setTime} />
}

// Formato 12h com AM/PM
<TimePicker value={time} onValueChange={setTime} format="12h" />

// Minutos de 15 em 15
<TimePicker value={time} onValueChange={setTime} minuteStep={15} />

// Desabilitado
<TimePicker value="09:00" disabled />
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

## Ícone do trigger — decisão registrada

A tarefa instruiu: gerar via `grep name="` em `src/components/ui/*.tsx`
por `schedule`/`access_time` e, se nenhum estiver confirmado nesse escopo,
usar `calendar_today` (confirmado em uso no projeto). Rodei o grep
exatamente nesse escopo (`src/components/ui/*.tsx`) e **nenhum** dos dois
apareceu — só `calendar_today` está confirmado ali (7 arquivos, incluindo
`date-picker-demo.tsx`). Por isso usei `calendar_today`, seguindo a regra
de fallback ao pé da letra.

**Nota para Rafael**: em escopo mais amplo (`src/`, incluindo
`components/examples`), o ícone `schedule` **também** está confirmado em
uso (`src/components/examples/button-group-demo.tsx:58`) e semanticamente
combina mais com "horário" do que `calendar_today` (que é um ícone de
calendário/data). Não troquei porque a instrução da tarefa restringiu o
grep de confirmação a `src/components/ui/*.tsx` especificamente — mas é uma
troca de uma linha (`name="calendar_today"` → `name="schedule"` em
`time-picker.tsx`) se você preferir.
