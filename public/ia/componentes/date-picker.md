---
slug: date-picker
nome: Date Picker
camada: organism
codigo: src/components/ui/date-picker.tsx
story: src/components/ui/date-picker.stories.tsx
status: piloto
sinonimos: [datepicker, seletor-de-data, data, campo-de-data, periodo, período, date-range]
vizinhos: [calendar, time-picker]
referencias: [spec:date-picker]
---

# Date Picker

Campo de data que dá para digitar no formato do idioma, com o `calendar` num `popover` ao lado. Escolhe uma data ou um período, e o valor é `Temporal.PlainDate` (data de calendário, sem fuso).

## Quando usar

- Data em formulário: nascimento, vencimento, início de vigência.
- Período com início e fim (`mode="range"`): viagem, relatório, filtro de datas.

## Quando NÃO usar

- Grade de datas sempre visível na tela, sem campo → `calendar`
- Hora do dia → `time-picker`

## Anatomia

| Parte | O que é |
|---|---|
| `DatePicker` | Raiz `input-group` com `data-slot="date-picker"` e `data-mode`; o `className` vai nela. |
| Campo | `input-group-input` digitável, `inputMode="numeric"`, com o formato do idioma no `placeholder`. |
| Botão | `input-group-button` com ícone `calendar_month`, no fim; abre o `popover`. |
| Calendário | `calendar` dentro do `popover`: um mês na data única, dois no período. |

## Composição

Usa: [`calendar`](calendar.md) · [`icon`](icon.md) · [`input-group`](input-group.md) · [`popover`](popover.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `aria-label` | `string` | — | Nome do campo quando não há `label` por fora |
| `isDateDisabled` | `(data: PlainDate) => boolean` | — | Desliga dias no calendário (ex.: fins de semana) |
| `mode` | `"single"` | `"single"` | Data única ou período; no período, `value` é `{ from, to }` com `PlainDate \| null` em cada ponta |
| `value` | `PlainDate` · `null` | — | Data controlada (`Temporal.PlainDate`); `null` é vazio |
| `defaultValue` | `PlainDate` · `null` | — | Data inicial |
| `onValueChange` | `(value: PlainDate | null) => void` | — | Recebe a data (ou o período) ao sair do campo, com Enter ou ao escolher no calendário |

## Variantes

Sem variantes de visual. O modo vem da prop `mode`: `single` (padrão) ou `range`.

## Tamanhos

Sem tamanhos próprios: a altura é a do `input-group`.

## Estados

| Estado | Como aparece |
|---|---|
| Vazio | `placeholder` com o formato do idioma (`dd/mm/aaaa` ou `mm/dd/yyyy`) |
| Digitando | Texto livre; vira data ao sair do campo ou com Enter |
| Inválido | Data que não existe (31/02) volta ao último valor válido |
| Aberto | `popover` com o `calendar` no mês da data atual |
| Carregando | Sem `Temporal` nativo, o botão fica desligado até o polyfill chegar |

## Conteúdo

- O rótulo diz que data é ("Data de nascimento"); o formato já está no `placeholder`.
- Formato e nomes de mês vêm do idioma ativo; não formate por fora.

## Acessibilidade

- **Teclado:** Digita a data direto no campo; Enter confirma. Tab chega ao botão, que abre o calendário (navegação do `calendar` por setas).
- **Leitor de tela:** O botão diz "Abrir calendário"; o `placeholder` anuncia o formato esperado.
- **Foco:** O `popover` leva o foco ao calendário e o devolve ao botão ao fechar.
- **Cuidados:** Passe `label` ou `aria-label`. O valor é `Temporal.PlainDate`: crie com `(await carregarTemporal()).PlainDate.from("2026-03-07")` de `@/lib/temporal`. Para `Date`, use `paraDate(plain)` (meia-noite local) e `deDate(date, T)`; nunca monte `Date` por string ISO, que muda o dia conforme o fuso.

## Tokens usados

- **Espaço:** `p-0`

## Faça

- Guarde e envie a data como `PlainDate` (ou `plain.toString()`, "2026-03-07").
- Use `mode="range"` para início e fim, em vez de dois campos soltos.
- Converta para `Date` só com `paraDate` e `deDate`.

## NÃO faça

- Montar `new Date("2026-03-07")` ou string ISO com hora → `paraDate(plain)`
- Usar o `calendar` solto num `popover` à mão → `date-picker`
- Usar para data e hora juntas → `date-picker` + `time-picker`

## Exemplo mínimo

```tsx
import { DatePicker } from "@/components/ui/date-picker"

export function ExemploData() {
  return <DatePicker aria-label="Data de nascimento" onValueChange={(d) => console.log(d?.toString())} />
}
```
