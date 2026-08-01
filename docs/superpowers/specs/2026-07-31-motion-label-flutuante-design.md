# Motion design: fundação de tokens + label flutuante em Input, Textarea, Select e NativeSelect

Data: 2026-07-31
Status: implementado (2026-07-31) — pendente QA visual manual do Rafael (5 presets × claro/escuro, prefers-reduced-motion, NativeSelect por teclado). Ver docs/superpowers/plans/2026-07-31-motion-label-flutuante-plan.md.

## Contexto e objetivo

O projeto ainda não tem nenhuma camada de motion design (tokens de duração,
easing, tratamento de `prefers-reduced-motion`) nem interações com
animação além do que o Tailwind já traz por padrão (`transition-[color,box-shadow]`
nos estados de foco). O pedido de origem: aplicar interação básica de
motion design nos componentes, com o caso concreto de uma **label
flutuante** (floating label) — a label nasce ocupando o lugar do
placeholder (centralizada dentro do campo) e, ao focar ou preencher, sobe
e se reposiciona como uma label tradicional acima do campo.

Esta spec cobre duas entregas:

1. Uma fundação de tokens de motion em `globals.css`, reutilizável por
   qualquer componente futuro.
2. O padrão de label flutuante aplicado a quatro componentes: `Input`,
   `Textarea`, `SelectTrigger` (Radix) e `NativeSelect`.

## Decisões de escopo (histórico do brainstorming)

- **Não é uma variante do `Field`** (`field.tsx`). Cada componente-atom
  ganha a capacidade de renderizar sua própria label via prop — decisão
  tomada depois de considerar e descartar a alternativa (variante
  `orientation="floating"` dentro do `Field`), porque o pedido real era
  "o Input resolver isso sozinho", não uma composição de dois
  componentes.
- **API de conveniência, não composição**: `<Input label="Nome" />` em vez
  de `<Field><FieldLabel/><Input/></Field>`. Ver seção "Exceção
  arquitetural" abaixo.
- **Motion 100% CSS**, sem biblioteca nova (sem Framer Motion). Usa
  `transition`/`transform` do Tailwind + os tokens novos de duração.
  Motivo: o projeto já tem `tw-animate-css`, e o caso de uso (mover um
  elemento entre duas posições) não precisa de spring physics nem gestos.
- **`prefers-reduced-motion: reduce` tratado na fundação**, não
  componente por componente — reset global que zera durações de
  transição/animação no app inteiro.
- **`field.tsx` não é tocado** nesta entrega.
- **Fora do escopo**: Combobox, InputGroup, ou qualquer outro componente
  com campo de texto/seleção não listado acima.

## Exceção arquitetural: Input/Select/NativeSelect deixam de ser Atoms "burros"

Convenção estabelecida no projeto (`plans/current/loop-80-20-templates.md`,
Fase 0): `input`, `select`, `native-select` são **Atoms**; `label` é
**Atom** separado; `field` é a **Molecule** que os compõe.

Com esta spec, `Input`, `SelectTrigger` e `NativeSelect` passam a
**importar e renderizar `Label` internamente** quando a prop `label` é
usada — o que os torna cientes de um outro Atom, quebrando pontualmente a
separação atom/molecule. Isso foi decidido conscientemente pela
ergonomia de API (`<Input label="Nome" />` em vez de dois componentes).

**Ação decorrente**: registrar essa exceção em
`docs/active/decisoes/` (novo arquivo), pra não virar uma inconsistência
não documentada no catálogo. O plano de implementação deve incluir esse
arquivo como uma tarefa.

## Fundação de motion (`src/app/globals.css`)

Segue exatamente o padrão já usado por `--radius`/`--shadow-*`: valor
base em `:root` (e, se algum preset de estilo precisar de duração
diferente no futuro, override em `[data-style="..."]`), ponte em
`@theme inline` pra virar utilitário Tailwind.

Novos tokens:

| Token | Valor | Uso pretendido |
|---|---|---|
| `--motion-duration-fast` | `150ms` | micro-interações (label flutuante, hover) |
| `--motion-duration-base` | `200ms` | transições padrão (equivalente ao que hoje é implícito em `transition-[color,box-shadow]`) |
| `--motion-duration-slow` | `350ms` | movimentos maiores (fora de escopo agora: drawer, sheet) |

Ponte em `@theme inline` (mesma mecânica de `--radius-sm: calc(var(--radius) - 4px)`):

```css
@theme inline {
  --duration-motion-fast: var(--motion-duration-fast);
  --duration-motion-base: var(--motion-duration-base);
  --duration-motion-slow: var(--motion-duration-slow);
}
```

Isso habilita classes Tailwind `duration-motion-fast`, `duration-motion-base`,
`duration-motion-slow` em qualquer componente.

Easing: reaproveita `ease-out`/`ease-in-out` nativos do Tailwind — não
cria token de curva novo (a curva padrão do Tailwind já cobre o caso;
evita duplicar o que já existe).

**Reduced motion** — bloco global novo em `globals.css`, fora de qualquer
seletor de preset (aplica-se sempre, independente do tema/preset ativo):

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Essa é a técnica padrão de reset universal — cobre a label flutuante e
qualquer motion futuro, sem precisar gatear token por token.

## Padrão de label flutuante — mecânica comum

Aplica-se a `Input`, `Textarea`, `SelectTrigger`. (`NativeSelect` é uma
exceção técnica, ver seção própria abaixo.)

### Props novas (mesma assinatura nos três)

| Prop | Tipo | Default | Efeito |
|---|---|---|---|
| `label` | `React.ReactNode` | — | Ausente → componente renderiza exatamente como hoje, sem wrapper, sem mudança de comportamento. Presente → ativa o wrapper com label. |
| `animatedLabel` | `boolean` | `false` | Só tem efeito quando `label` está presente. `false` = label fixa acima do campo, em fluxo normal, sem motion. `true` = label flutuante (comportamento descrito abaixo). |

Tabela de comportamento combinado:

| `label` | `animatedLabel` | Resultado |
|---|---|---|
| ausente | — | Componente puro, idêntico ao comportamento atual (compatibilidade total, nenhum uso existente quebra) |
| presente | `false` (padrão) | Label acima do campo, fluxo normal — igual ao `FieldLabel` padrão hoje, sem posicionamento absoluto, sem motion |
| presente | `true` | Label muda de posição conforme o estado do campo (ver tabela de posições abaixo) |

### Acessibilidade

- Quando `label` está presente e o consumidor não passa `id`, o
  componente gera um via `React.useId()` e usa `htmlFor`/`id` pra
  associar Label ↔ campo.
- Para `SelectTrigger` (Radix, `role="combobox"`, não é um elemento de
  formulário nativo), a associação usa `aria-labelledby` apontando pro
  `id` da label, além do `htmlFor`/`id` — mais robusto pra leitores de
  tela em widgets customizados. Detalhe de implementação a resolver na
  tarefa do plano.

### Posições (modo `animatedLabel=true`)

Transição em **dois eixos** (vertical e horizontal), mesma duração/easing
em todos: `duration-motion-fast` + `ease-out`.

| Componente | Repouso (placeholder) | Flutuada (foco ou preenchido) |
|---|---|---|
| `Input` | Centralizada verticalmente, alinhada ao `left-3` (mesmo recuo do `px-3` do campo) | Acima da caixa, fora dela, alinhada ao `left-0` (sem recuo — igual ao `FieldLabel` padrão) |
| `Textarea` | Canto superior-esquerdo (`top-3 left-3`, alinhado à posição natural de um placeholder multilinha) | Acima da caixa, `left-0` — desloca menos no eixo vertical que o `Input` (já nasce perto do topo), mas segue a mesma regra de recuo no eixo horizontal |
| `SelectTrigger` | Centralizada verticalmente, alinhada ao `left-3` | Acima da caixa, `left-0` |

Regra geral: **repouso = alinhada ao conteúdo interno do campo (mesmo
recuo do texto/placeholder); flutuada = alinhada à borda externa da
caixa (sem recuo)**. Por isso a transição sempre inclui um deslocamento
horizontal pra esquerda, não só vertical.

### Gatilho técnico por componente

O gatilho "campo tem conteúdo" varia por natureza técnica do componente
(o gatilho "está em foco" é sempre `:focus`/`:focus-visible` nativo):

| Componente | Seletor CSS pra "tem conteúdo" | Observação |
|---|---|---|
| `Input`, `Textarea` | `:not(:placeholder-shown)` | Exige `placeholder` não-vazio no elemento (ex.: `placeholder=" "`) pra `:placeholder-shown` funcionar — se `label` e `animatedLabel=true` estiverem presentes sem `placeholder`, o componente deve aplicar um `placeholder=" "` default internamente (não delegar esse detalhe ao consumidor) |
| `SelectTrigger` (Radix) | `:not([data-placeholder])` | O Radix já aplica `data-placeholder` automaticamente no trigger quando não há valor selecionado (confirmado em `select.tsx:40`, já usado hoje por `data-[placeholder]:text-muted-foreground`) — nenhuma mudança de comportamento do Radix necessária |

Implementação via `:has()` no wrapper (mesmo container que tem a classe
`group/...`), combinando foco e conteúdo num único seletor (CSS `:has()`
aceita lista separada por vírgula como OR):

```
group-has-[:focus,:not(:placeholder-shown)]/campo:<classes-flutuadas>
```

(sintaxe ilustrativa — o nome exato do grupo e a expressão final ficam a
cargo da tarefa de implementação de cada componente.)

## `NativeSelect` — exceção técnica

`<select>` nativo não tem equivalente confiável a `:placeholder-shown`.
A alternativa puramente CSS (`required` + `:invalid` + `<option value="">`
oculta) foi descartada: forçaria validação nativa do browser no
formulário só por um efeito visual — efeito colateral inaceitável.

**Solução**: estado React local dentro do próprio `NativeSelect`.

- `native-select.tsx` ganha a diretiva `"use client"` (hoje não tem).
- Estado interno (`useState`) inicializado a partir de `value ?? defaultValue`
  passado pelo consumidor, atualizado em `onChange` — o `onChange` interno
  precisa mesclar com o `onChange` que o consumidor eventualmente passar
  (não pode sobrescrever).
- O estado controla um atributo `data-has-value` no wrapper (`native-select.tsx`
  já tem um `<div data-slot="native-select-wrapper">` — reaproveitado, não
  precisa de wrapper novo).
- CSS usa `group-has-data-[has-value=true]` (não `:has()` de seletor
  nativo, já que a fonte da verdade é o atributo React, não uma
  pseudo-classe do DOM) combinado com `:focus-within` no wrapper (o foco
  pousa no `<select>` interno, `:focus-within` no wrapper cobre esse
  caso sem precisar de seletor `:has(:focus)`).
- Motion (transição CSS) continua idêntico aos outros três — só a origem
  do gatilho muda de pseudo-classe pura pra atributo controlado por JS.

## Reaproveitamento de código entre os quatro componentes

Cada um dos quatro arquivos (`input.tsx`, `textarea.tsx`, `select.tsx`,
`native-select.tsx`) implementa sua própria estrutura de wrapper + label
+ classes de motion, com pequena duplicação entre eles — **decisão
deliberada**, não descuido: segue a filosofia shadcn/ui já presente no
projeto, onde cada arquivo de componente se basta sozinho e é
copiável/ejetável sem depender de um módulo interno compartilhado
(`input.tsx`, `textarea.tsx` e `input-group.tsx` já duplicam estrutura
semelhante entre si hoje). Não crio um componente ou hook compartilhado
novo pra isso.

O único artefato de fato compartilhado entre os quatro são os **tokens de
motion** em `globals.css`.

## Testes / verificação

- Story nova em cada um dos quatro arquivos `.stories.tsx`
  (`input.stories.tsx`, `textarea.stories.tsx`, `select.stories.tsx`,
  `native-select.stories.tsx`), cobrindo os três estados: sem `label`,
  `label` fixa (`animatedLabel` ausente/`false`), `label` animada
  (`animatedLabel=true`).
- Checagem visual manual via `npm run dev`:
  - Todos os 5 presets de estilo (Padrão, Editorial, Tech, Suave,
    Midnight) + modo claro/escuro.
  - `prefers-reduced-motion: reduce` ativado no browser — confirmar que a
    label ainda muda de posição (funcionalidade), só sem a transição
    animada.
  - `NativeSelect` especificamente por teclado (Tab + setas), não só
    mouse — a fonte do gatilho é `onChange`, que dispara tanto por
    teclado quanto por mouse, mas vale confirmar visualmente.
- Nenhum teste automatizado novo é necessário além das stories — o
  projeto não tem suíte de testes de comportamento hoje (é um portal de
  estilos, não uma aplicação com lógica de negócio).

## Fora de escopo (explicitamente adiado)

- `field.tsx` — nenhuma mudança.
- Label flutuante em `Combobox`, `InputGroup`, ou qualquer outro campo
  não listado nesta spec.
- Framer Motion ou qualquer biblioteca de motion nova.
- Outras interações de motion além da label flutuante (hover/press em
  Button, shake de validação, etc.) — ficam como próximos passos naturais
  depois que a fundação de tokens existir.
