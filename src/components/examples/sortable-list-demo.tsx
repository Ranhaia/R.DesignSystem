"use client"

import * as React from "react"

import { SortableList } from "@/components/ui/sortable-list"

const inicial = [
  { id: "1", titulo: "Revisar o protótipo" },
  { id: "2", titulo: "Recrutar participantes" },
  { id: "3", titulo: "Rodar o teste de usabilidade" },
  { id: "4", titulo: "Consolidar os achados" },
]

export default function SortableListDemo() {
  const [itens, setItens] = React.useState(inicial)
  return (
    <SortableList
      aria-label="Prioridade das tarefas"
      className="w-full max-w-md"
      itens={itens}
      idDoItem={(i) => i.id}
      rotuloDoItem={(i) => i.titulo}
      onReordenar={setItens}
    >
      {(i) => i.titulo}
    </SortableList>
  )
}
