---
slug: calendar
nome: Calendar
camada: organism
codigo: src/components/ui/calendar.tsx
story: src/components/ui/calendar.stories.tsx
status: piloto
sinonimos: [calendario, calendário, date-picker, datepicker, seletor-de-data, data]
vizinhos: [popover, input]
referencias: [passi:padroes/calendario, shadcn:calendar]
---

# Calendar

Exibe uma grade mensal interativa para seleção visual de uma data ou período. Já vem configurado com localização pt-BR por padrão.

## Quando usar

- Seleção de data pontual próxima em formulários (agendamento de consulta, entrega ou reunião).
- Seleção de intervalo de datas com início e fim (reserva de período, vigência ou filtro de relatórios).

## Quando NÃO usar

- Datas de nascimento ou datas muito distantes no passado → `input`.
- Seleção de horários, horas e minutos → `time-picker`.
- Escolha entre opções fixas relativas como últimos sete dias → `segmented-control`.

## Anatomia

| Parte | O que é |
|---|---|
| `Calendar` | Container principal que encapsula o DayPicker e define navegação, cabeçalho e grade |
| `CalendarDayButton` | Botão do dia baseado em `Button` ghost com atributos de estado e seleção |

## Composição

Usa: [`button`](button.md) · [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `mode` (Calendar) | `"single"` · `"multiple"` · `"range"` | `"single"` | Modo de seleção de datas do DayPicker |
| `selected` · `onSelect` (Calendar) | `Date` · `Date[]` · `DateRange` | — | Valor selecionado e callback de alteração |
| `buttonVariant` | `React.ComponentProps<typeof Button>["variant"]` | `ghost` | Variante visual dos botões de navegação de mês |
| `showOutsideDays` | `boolean` | `true` | Exibe os dias do mês anterior e posterior na grade |
| `captionLayout` | `"label"` · `"dropdown"` | `label` | Estilo do cabeçalho: texto estático ou menus suspensos de mês e ano |
| `locale` | `Locale` | `ptBR` | Localização do calendário (date-fns); padrão fixado em português do Brasil |

## Variantes

Nenhuma variante de estilo no componente raiz. Os modos de seleção (`single`, `multiple`, `range`) são definidos pela prop `mode`.

## Tamanhos

Tamanho adaptável ao container (`w-fit`), com células baseadas em escala de 32 px (`--spacing(8)`).

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Célula com número do dia em texto normal e fundo transparente |
| Hoje | Célula com fundo `bg-accent` e texto `text-accent-foreground` |
| Selecionado | Célula com fundo `bg-primary` e texto contrastante `text-primary-foreground` |
| Intervalo (meio) | Célula com cantos retos e fundo suave `bg-accent` |
| Fora do mês | Número atenuado em `text-muted-foreground` |
| Desabilitado | Opacidade reduzida em 50% sem resposta a cliques |

## Conteúdo

- Rótulos dos dias da semana iniciam em domingo ("dom", "seg", "ter") conforme a convenção brasileira.
- Meses abreviados em 3 letras no seletor suspenso ("jan", "fev", "mar").
- Ao exibir a data escolhida em campo de apoio, use formato "DD/MM/AAAA".

## Acessibilidade

- **Teclado:** Setas direcionais navegam entre os dias da grade. PageUp e PageDown alternam os meses; Shift+PageUp e Shift+PageDown alternam os anos. Enter ou Espaço seleciona o dia em foco.
- **Leitor de tela:** Tabela com papel `grid`. Dias anunciados com data completa e estado selecionado via `aria-selected="true"`. Botões de avançar e voltar possuem nomes acessíveis internacionalizados pelo `ptBR`.
- **Foco:** O foco visual destaca o dia ativo com anel de foco `ring-[3px] ring-ring` e borda `border-ring`.
- **Cuidados:** Não use calendário como meio único para datas distantes ou cadastrais (WCAG 2.1.1); permita sempre digitação manual direta em campo de texto.

## Tokens usados

- **Cor:** `bg-accent` `bg-background` `bg-popover` `bg-primary`
  `border-input` `border-ring` `text-accent-foreground`
  `text-muted-foreground` `text-primary-foreground`
- **Tipografia:** `font-medium` `font-normal` `leading-none` `text-sm`
  `text-xs`
- **Espaço:** `gap-1` `gap-1.5` `gap-4` `h-8` `inset-0` `inset-x-0`
  `mt-2` `p-0` `p-3` `pl-2` `pr-1` `size-3.5` `top-0`
- **Raio:** `rounded-l-md` `rounded-md` `rounded-r-md`
- **Sombra:** `shadow-xs`
- **Foco:** `ring-ring`

## Faça

- Destaque visualmente a data atual para orientar a pessoa no tempo.
- Configure `captionLayout="dropdown"` quando a pessoa precisar navegar por muitos meses ou anos.
- Combine com `popover` e `input` para criar seletores de data compactos em formulários.

## NÃO faça

- Forçar navegação mês a mês para datas distantes como nascimento → `input`.
- Usar calendário quando o objetivo é apenas selecionar horário → `time-picker`.
- Esconder dias fora do mês se isso quebrar a estrutura da grade semanal → configure `showOutsideDays={true}`.

## Exemplo mínimo

```tsx
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function ExemploCalendario() {
  const [data, setData] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={data}
      onSelect={setData}
    />
  )
}
```
