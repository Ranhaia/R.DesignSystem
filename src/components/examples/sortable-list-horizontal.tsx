"use client"

import * as React from "react"

import { SortableList } from "@/components/ui/sortable-list"

export default function SortableListHorizontal() {
  const [etapas, setEtapas] = React.useState(["Descoberta", "Protótipo", "Teste", "Entrega"])
  return (
    <SortableList
      aria-label="Ordem das etapas"
      orientacao="horizontal"
      itens={etapas}
      idDoItem={(e) => e}
      rotuloDoItem={(e) => e}
      onReordenar={setEtapas}
    >
      {(e) => e}
    </SortableList>
  )
}
