import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Convenção de data do catálogo — pt-BR com dia da semana, pedido do
// Rafael em 2026-07-23 (o Calendar/DatePicker estava em inglês, sem
// locale fixado). Única fonte pros date-pickers do catálogo (examples/
// date-picker-*.tsx, patterns/filter-panel.tsx) — evita repetir o mesmo
// format string + `{ locale: ptBR }` em cada tela.
//
// 2 variantes, pensadas pro espaço disponível em cada uso:
// - formatarDataCompleta: dia da semana e mês por extenso ("quinta-feira,
//   23 de julho de 2026") — pra trigger de DatePicker de 1 campo só, que
//   tem largura de sobra.
// - formatarDataCurta: dia da semana abreviado + dd/MM/yyyy numérico
//   ("qui, 23/07/2026") — pra espaços apertados (chip de filtro, range
//   "De–Até" onde 2 datas completas por extenso não cabem).

export function formatarDataCompleta(data: Date): string {
  return format(data, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export function formatarDataCurta(data: Date): string {
  return format(data, "EEE, dd/MM/yyyy", { locale: ptBR })
}
