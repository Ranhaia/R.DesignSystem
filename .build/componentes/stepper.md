# Spec — Stepper (Organism)

Status: código implementado nesta sessão em `src/components/ui/stepper.tsx`
(catálogo Fase 6.1, `PLANO-LOOP-80-20-TEMPLATES.md`). Este arquivo é a
especificação de pesquisa/decisões — os arquivos compartilhados
(`component-docs.ts`, `atomic-registry.ts`, etc.) **não** foram editados por
este processo; as entradas prontas para colar estão na resposta final da
tarefa, não neste arquivo.

Parente de referência (indicado na tarefa): **Accordion**
(`src/components/ui/accordion.tsx`) — estado sequencial complexo, mesmo
padrão `data-slot`/`data-state` reaproveitado aqui.

Contexto interno consultado: `src/components/patterns/multi-step-form.tsx`
já tem uma UI ad-hoc de progresso (uma `<Progress>` linear + texto "Etapa X
de Y"), sem indicador de etapas numeradas/clicáveis. O Stepper formal cobre
um caso que o Pattern não cobre hoje (não foi refatorado, só usado como
referência de comportamento esperado, conforme instrução da tarefa).

---

## Fonte(s) consultada(s)

1. **`@nimbus-ds/stepper` — README publicado**
   `https://unpkg.com/@nimbus-ds/stepper/README.md`
   → descrição: "guia usuários através de processos multi-etapas, mostrando
   seu progresso", permite navegação entre etapas já concluídas. Quando
   usar: formulários/assistentes multi-etapa, onboarding, checkouts.
   Subcomponentes reais: `Stepper` (root), `Stepper.Item` (indicador
   individual, numeração automática), `Stepper.Card` (wrapper de card).
   Estados: `Completed` (ícone de check), `Active` (destacada), `Upcoming`
   (numerada). Props reais: `activeStep`/`selectedStep` (modo controlado) +
   `onSelectStep` no root; `label` (opcional) + `step` (número, automático)
   no Item.
2. **`@nimbus-ds/stepper` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/stepper/dist/index.d.ts`
   → confirma a existência de `Stepper`, `StepperItem`, `StepperCard`,
   `StepperContextValue` como exports; numeração de `StepperItem` é
   automática via contexto compartilhado (não é uma prop numérica que o
   consumidor precisa passar à mão).
3. Precedente interno: `src/components/ui/accordion.tsx` (padrão
   `data-slot`/Context + subcomponentes) e `src/components/ui/tabs.tsx`
   (padrão `group/tabs` + `data-orientation` + `group-data-[orientation=...]`
   para estilos que dependem da orientação — reaproveitado aqui em vez de
   ramificar orientação em JS).
4. `src/components/ui/chip.tsx` — convenção de código mais recente do
   catálogo (cva, `data-slot`, comentários de decisão).
5. `src/components/ui/icon.tsx` — mecanismo `hasA11yProp` (aria-hidden
   automático quando nenhuma prop de acessibilidade é passada ao `<Icon>`).
6. `src/lib/component-docs.ts` (entrada `chip`) — formato exato de saída.

**Não encontrado / não assumido:** `Stepper.Card` (wrapper de card do
Nimbus) não foi implementado — não há um padrão equivalente já
estabelecido neste catálogo para "card de conteúdo da etapa atual" e a
tarefa pediu a composição mais simples que cubra o caso de uso (indicador
de progresso), não um layout de página inteiro. Comportamento de skip-ahead
(permitir clicar direto numa etapa "upcoming", pulando etapas) não é
documentado no README/typedef do Nimbus com detalhe suficiente — decisão
provisória registrada abaixo.

---

## Descrição

*(traduzido do README oficial do `@nimbus-ds/stepper`, fonte 1 acima)*

Stepper é um indicador de progresso que guia o usuário através de um
processo dividido em múltiplas etapas, mostrando quais já foram concluídas,
qual está em andamento e quais ainda faltam.

## Quando utilizar

*(traduzido do README oficial, fonte 1 acima)*

- Use em formulários e assistentes (wizards) com múltiplas etapas.
- Use em fluxos de onboarding.
- Use em processos complexos divididos em etapas (ex.: checkout,
  configuração de conta).

---

## Anatomia

| Parte | Descrição |
|---|---|
| `Stepper` (root) | `<ol data-slot="stepper">` — controla `value` (índice 0-based da etapa atual) e orientação. Injeta o estado (`completed`/`current`/`upcoming`) de cada `StepperItem` filho via Context, pela posição do filho na lista de `children` (numeração automática — mesmo comportamento real do `Stepper.Item` do Nimbus, fonte 2). Também gera o conector entre etapas automaticamente (não é subcomponente exportado). |
| `StepperItem` | `<li data-slot="stepper-item" data-state>` — uma etapa. Não recebe índice explícito; lê o próprio estado do Context injetado pelo `Stepper` pai. |
| `StepperTrigger` | Elemento clicável (`<button>`) ou não (`<div>`) — decide sozinho com base em `onValueChange` estar presente no `Stepper` pai. Agrupa `StepperIndicator` + `StepperTitle`. Carrega `aria-current="step"` na etapa atual. |
| `StepperIndicator` | Círculo numerado (`data-state`-driven: contorno neutro se `upcoming`, contorno `--primary` se `current`, preenchido `--primary` com ícone de check se `completed`). |
| `StepperTitle` | Label textual da etapa. |
| Conector (interno) | `<li aria-hidden="true" data-slot="stepper-separator">` gerado pelo `Stepper` entre cada par de `StepperItem` — linha horizontal (`flex-1`, orientação horizontal) ou vertical (altura fixa, orientação vertical), colorida com `--primary` quando a etapa anterior está `completed`. |

---

## Composição

Exports: **`Stepper`, `StepperItem`, `StepperTrigger`, `StepperIndicator`,
`StepperTitle`** (5 subcomponentes — mesma faixa de composição do
`Accordion`, que tem 4).

O separador/conector **não** é um subcomponente exportado — decisão
provisória, diverge da estrutura do Nimbus que também não expõe conector
como subcomponente próprio (ele é implícito no CSS do `Stepper.Item` real).
Aqui o Stepper (root) gera o conector porque seu estado (completo/pendente)
depende de comparar o índice do item com `value`, informação que já está
centralizada no root — evita duplicar essa conta dentro de cada
`StepperItem`.

Entrada esperada em `composition-registry.ts`:
```ts
"stepper": ["Stepper", "StepperItem", "StepperTrigger", "StepperIndicator", "StepperTitle"],
```

---

## Variantes

Nenhuma variante de cor/estilo na raiz — só a prop `orientation`
(`"horizontal" | "vertical"`), que não é modelada como `variant` porque
afeta layout/estrutura, não aparência visual (mesmo tratamento que
`orientation` recebe em `tabs.tsx`/`slider.tsx`, que também não entram
como `variants` no `component-docs.ts`, e sim como prop documentada à
parte).

---

## Tamanhos

Nenhum. Nem o Nimbus real (fontes 1–2) nem nenhum precedente interno
(Accordion, Tabs) expõem uma escala de tamanho para este tipo de
componente de estado sequencial.

---

## Estados

| Estado | Descrição |
|---|---|
| `upcoming` | Etapa ainda não alcançada — indicador com contorno neutro (`--border`), número visível, título em `--muted-foreground`. |
| `current` | Etapa ativa — indicador com contorno `--primary`, `aria-current="step"` no trigger. |
| `completed` | Etapa já concluída — indicador preenchido `--primary` com ícone de check (`aria-hidden`, ver Acessibilidade), conector à direita/abaixo também em `--primary`. |
| Clicável (opcional) | Só quando `Stepper` recebe `onValueChange` — o trigger vira `<button>` real: focável via `Tab`, ativável via `Enter`/`Space` (comportamento nativo, sem handler de teclado customizado), com `focus-visible:ring` herdado do padrão do catálogo (mesmas classes de `AccordionTrigger`). |
| Somente-leitura | Sem `onValueChange` — trigger vira `<div>` não-interativo (não focável, sem cursor de ponteiro). Uso típico: mostrar progresso sem permitir navegação livre entre etapas. |

---

## Props

### `Stepper`

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `value` | `number` | — (obrigatório) | Índice (0-based) da etapa atual. Sempre controlado — sem modo não-controlado/`defaultValue` (decisão provisória, ver abaixo). Equivalente a `activeStep`/`selectedStep` do Nimbus (fonte 1), renomeado para `value` por consistência com o resto do catálogo (`RadioGroup`, `Tabs`, `ToggleGroup` já usam `value`/`onValueChange`, não `activeStep`). |
| `onValueChange` | `(step: number) => void` | — | Callback disparado ao clicar numa etapa. Presença desta prop é o que decide se o `StepperTrigger` renderiza `<button>` (clicável) ou `<div>` (somente-leitura). Equivalente a `onSelectStep` do Nimbus (fonte 1), renomeado por consistência com o resto do catálogo. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direção do layout — mesma convenção de nome/valores de `Tabs`/`Slider`. |
| `...props` | `React.ComponentProps<"ol">` | — | Demais atributos nativos do elemento raiz. |

### `StepperItem`

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `...props` | `React.ComponentProps<"li">` | — | Sem prop de índice — a posição é derivada automaticamente da ordem dos `children` dentro do `Stepper` pai (ver Composição/Anatomia). **Decisão provisória, diverge do Nimbus**: o `Stepper.Item` real (fonte 2) também numera automaticamente via Context, mas o typedef ainda expõe `step` como prop opcional de override manual; aqui não expusemos esse override — se Rafael precisar pular números (ex.: etapas condicionais escondidas), é decisão dele registrar depois. |

### `StepperTrigger`

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `...props` | `React.ComponentProps<"button">` | — | `onClick` do chamador (se houver) é chamado antes do `onValueChange` do `Stepper`. Sem props de acessibilidade adicionais expostas — `aria-current` é calculado internamente, não deve ser sobrescrito pelo chamador. |

### `StepperIndicator`

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `React.ReactNode` | número da etapa (`step + 1`) | Conteúdo do círculo quando a etapa **não** está `completed`. Ignorado quando `completed` (sempre mostra o ícone de check nesse caso). |
| `...props` | `React.ComponentProps<"span">` | — | Demais atributos nativos. |

### `StepperTitle`

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `...props` | `React.ComponentProps<"span">` | — | Texto/label da etapa. |

---

## Acessibilidade mínima exigida

- **`aria-current="step"` na etapa atual** — aplicado no `StepperTrigger`
  (elemento que representa a etapa, clicável ou não), não no `<li>`. Mesmo
  padrão usado por steppers acessíveis de referência (ex.: GOV.UK Design
  System aplica `aria-current="step"` no link, não no item de lista).
- **Navegação por teclado quando clicável**: garantida de graça por
  `StepperTrigger` renderizar um `<button type="button">` nativo real
  (focável via `Tab`, ativável via `Enter`/`Space`) quando `onValueChange`
  está presente no `Stepper` — nenhum handler de teclado customizado foi
  escrito.
- **Foco visível**: `focus-visible:border-ring focus-visible:ring-[3px]
  focus-visible:ring-ring/50` — exatamente as mesmas classes já usadas em
  `AccordionTrigger` (`accordion.tsx`), reaproveitadas aqui por ser o
  "parente" de referência indicado na tarefa.
- **Ícone de check com `aria-hidden`**: garantido de graça — `<Icon
  name="check" size={1} />` dentro do `StepperIndicator` não recebe
  `aria-label`/`aria-labelledby`/`role`, então o próprio `icon.tsx`
  (mecanismo `hasA11yProp`, já existente no projeto) força
  `aria-hidden="true"` automaticamente. A informação "etapa concluída" já
  está no `data-state="completed"` do indicador e, principalmente, no fato
  de `aria-current="step"` ter migrado para a próxima etapa — não depende
  do ícone.
- **Conector não polui a árvore de acessibilidade**: o `<li>` de conector
  gerado entre etapas tem `aria-hidden="true"` — é puramente decorativo.

---

## Código de exemplo

```tsx
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const steps = ["Dados pessoais", "Endereço", "Confirmação"]

function Exemplo() {
  const [currentStep, setCurrentStep] = React.useState(0)

  return (
    <Stepper value={currentStep} onValueChange={setCurrentStep}>
      {steps.map((label) => (
        <StepperItem key={label}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperTitle>{label}</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      ))}
    </Stepper>
  )
}

// Orientação vertical
<Stepper value={1} orientation="vertical">...</Stepper>

// Somente-leitura (sem onValueChange — trigger não é clicável)
<Stepper value={0}>...</Stepper>
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

## Observação sobre `atomic-registry.ts`

`Stepper` já existe hoje em `inProgressEntries` (linha ~147,
`{ name: "Stepper", category: "organism" }`) — marcado "Em construção"
desde a auditoria contra a Nimbus (achado documentado no comentário
acima dessa lista). Com o componente real implementado nesta sessão, essa
entrada deveria ser **removida** de `inProgressEntries` ao mesmo tempo em
que a linha `stepper: "organism"` for adicionada ao bloco principal do
`atomicRegistry` — senão o Stepper aparece duas vezes (uma vez como
"pronto", outra como "em construção"). Como este processo não edita
`atomic-registry.ts`, isso fica registrado aqui para quem for colar as
linhas prontas (ver resposta final da tarefa).
