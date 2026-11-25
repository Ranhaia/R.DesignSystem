"use client"

import * as React from "react"

import { Agenda, type EventoAgenda } from "@/components/ui/agenda"

// Datas relativas a hoje, para o exemplo nunca ficar num mês vazio.
function dia(deslocamento: number, hora: number, min = 0) {
  const d = new Date()
  d.setDate(d.getDate() + deslocamento)
  d.setHours(hora, min, 0, 0)
  return d
}

const eventos: EventoAgenda[] = [
  { id: "1", titulo: "Daily da equipe", inicio: dia(0, 9), fim: dia(0, 9, 15) },
  { id: "2", titulo: "Teste de usabilidade", inicio: dia(0, 14), fim: dia(0, 15, 30) },
  { id: "3", titulo: "Revisão do protótipo", inicio: dia(0, 17), fim: dia(0, 18) },
  { id: "4", titulo: "Entrevista com cliente", inicio: dia(2, 10), fim: dia(2, 11) },
  { id: "5", titulo: "Workshop de design", inicio: dia(5, 0), fim: dia(6, 23), diaInteiro: true },
  { id: "6", titulo: "Entrega da sprint", inicio: dia(-3, 16) },
]

export default function AgendaDemo() {
  const [aberto, setAberto] = React.useState<string>()
  return (
    <div className="flex w-full flex-col gap-2">
      <Agenda aria-label="Agenda da equipe" eventos={eventos} onEventoClick={(e) => setAberto(e.titulo)} />
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {aberto ? `Evento aberto: ${aberto}` : "Clique num dia do mês para ver o dia; clique num evento para abri-lo."}
      </p>
    </div>
  )
}
