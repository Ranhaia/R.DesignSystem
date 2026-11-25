---
slug: agenda
nome: Agenda
camada: organism
codigo: src/components/ui/agenda.tsx
story: src/components/ui/agenda.stories.tsx
status: piloto
sinonimos: [calendario-de-eventos, calendário-de-eventos, event-calendar, scheduler, eventos, compromissos]
vizinhos: [calendar, time-picker, list]
referencias: [passi:padroes/calendario, spec:agenda]
---

# Agenda

Mostra compromissos no mês, na semana ou no dia. O mês monta sobre o `calendar` e herda o teclado dele; semana e dia listam os eventos como botões.

## Quando usar

- Ver o que acontece em cada data: reuniões, entregas, plantões, reservas.
- A pessoa alterna entre a visão geral do mês e o detalhe do dia.

## Quando NÃO usar

- Escolher uma data ou um período → `calendar`
- Escolher um horário → `time-picker`
- Poucos eventos em sequência, sem precisar da grade → `list`

## Anatomia

| Parte | O que é |
|---|---|
| `DiaDoMes` | Interno: o botão de dia do `calendar` com os chips do dia; não é exportado. |
| `Agenda` | Raiz `<section data-slot="agenda" data-visao>` com o `aria-label`; o `className` vai nela. |
| Barra | `<div data-slot="agenda-toolbar">`: Hoje, período anterior e próximo, o título do período (anunciado ao mudar) e a vista (`segmented-control`). |
| Dia | No mês, o botão de dia do `calendar` com até 2 chips (`data-slot="agenda-chip"`) e "+N mais". Na semana e no dia, `<div data-slot="agenda-dia">`. |
| Evento | `button` secundário (`data-slot="agenda-evento"`) com hora ou "Dia inteiro" e o título. |

## Composição

Usa: [`button`](button.md) · [`calendar`](calendar.md) · [`icon`](icon.md) · [`segmented-control`](segmented-control.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `eventos` | `EventoAgenda[]` | — | `id`, `titulo`, `inicio` e, se houver, `fim` e `diaInteiro`. Evento de vários dias aparece em todos. |
| `dataInicial` | `Date` | — | Dia em foco ao abrir. Sem ela, hoje. |
| `visaoInicial` | `VisaoAgenda` | `mes` | Vista ao abrir: `mes`, `semana` ou `dia`. |
| `onEventoClick` | `(evento: EventoAgenda) => void` | — | Chamado ao clicar num evento na semana ou no dia. |
| `className` | `string` | — | Classes extras na raiz. |
| `aria-label` | `string` | — | Nome da agenda para o leitor de tela. Obrigatório. |

## Variantes

Sem variante: a vista (`mes`, `semana`, `dia`) é estado que a pessoa troca na barra; `visaoInicial` escolhe a primeira.

## Tamanhos

Sem tamanho: ocupa a largura do contêiner; no mês, cada dia tem altura fixa da escala (`h-24`).

## Estados

| Estado | Como aparece |
|---|---|
| Hoje | Dia com fundo de destaque no mês; cabeçalho secundário na semana |
| Dia selecionado | O dia em foco, com fundo da cor principal no mês |
| Mais eventos | "+N mais" abaixo dos 2 primeiros chips do dia |
| Dia vazio | Na vista dia, "Nenhum evento" |
| Fora do mês | Dias de outro mês em cor apagada, como no `calendar` |

## Conteúdo

- Título curto no evento: ele é cortado no chip do mês.
- Datas e horas saem do `Intl` no idioma ativo; botões e vazio vêm do dicionário (pt-BR ou en).
- A semana começa no domingo.

## Acessibilidade

- **Teclado:** No mês, setas andam de dia em dia, PageUp e PageDown trocam de mês, Home e End vão ao início e ao fim da semana, Enter abre o dia. Na semana e no dia, Tab passa pelos dias e eventos.
- **Leitor de tela:** A agenda tem nome (`aria-label`). Cada dia do mês diz a data completa e quantos eventos tem. O título do período é anunciado ao mudar (`aria-live`).
- **Foco:** Anel de foco do `calendar` no mês e do `button` nos eventos.
- **Cuidados:** No mês o chip é só leitura; o evento se abre na vista dia. Dia com raio concêntrico: o chip usa `rounded-inner`.

## Tokens usados

- **Cor:** `text-muted-foreground`
- **Tipografia:** `font-medium` `text-base` `text-sm` `text-xs`
- **Espaço:** `gap-0` `gap-0.5` `gap-1` `gap-2` `gap-3` `h-24` `min-w-0`
  `min-w-24` `p-0` `p-0.5` `p-1` `px-1` `py-1` `py-6`
- **Raio:** `radius-inset-1` `rounded-inner` `rounded-md`
  `rounded-outer-md`
- **Foco:** `ring-ring`

## Faça

- Abra na vista que a pessoa mais usa (`visaoInicial`).
- Passe `fim` em todo evento com duração.
- Use `onEventoClick` para abrir o detalhe (`sheet` ou `dialog`).

## NÃO faça

- Usar a agenda para escolher data → `calendar`
- Título longo no evento → resuma e mostre o resto no detalhe
- Data distante, como nascimento → campo de data

## Exemplo mínimo

```tsx
import { Agenda } from "@/components/ui/agenda"

export function ExemploAgenda() {
  return (
    <Agenda
      aria-label="Agenda da equipe"
      eventos={[{ id: "1", titulo: "Daily", inicio: new Date(2026, 10, 10, 9), fim: new Date(2026, 10, 10, 9, 15) }]}
      onEventoClick={(e) => console.log(e.titulo)}
    />
  )
}
```
