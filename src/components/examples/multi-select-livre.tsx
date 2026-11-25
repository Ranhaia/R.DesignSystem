"use client"

import * as React from "react"

import { MultiSelect } from "@/components/ui/multi-select"

const sugestoes = [
  { label: "Urgente", value: "urgente" },
  { label: "Financeiro", value: "financeiro" },
  { label: "Jurídico", value: "juridico" },
]

export default function MultiSelectLivre() {
  const [tags, setTags] = React.useState<string[]>(["urgente"])
  return (
    <div className="w-full max-w-sm">
      <MultiSelect
        creatable
        options={sugestoes}
        value={tags}
        onValueChange={setTags}
        aria-label="Etiquetas"
        placeholder="Digite e aperte Enter"
      />
    </div>
  )
}
