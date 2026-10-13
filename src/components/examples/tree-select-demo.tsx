"use client"

import * as React from "react"

import { TreeSelect } from "@/components/ui/tree-select"

const ramos = [
  {
    value: "patrimonial",
    label: "Patrimonial",
    children: [
      { value: "auto", label: "Auto" },
      { value: "residencial", label: "Residencial" },
      { value: "empresarial", label: "Empresarial" },
    ],
  },
  {
    value: "pessoas",
    label: "Pessoas",
    children: [
      { value: "vida", label: "Vida" },
      { value: "saude", label: "Saúde" },
      { value: "viagem", label: "Viagem", disabled: true },
    ],
  },
  { value: "pet", label: "Pet" },
]

export default function TreeSelectDemo() {
  const [value, setValue] = React.useState<string | null>("auto")

  return (
    <TreeSelect
      treeData={ramos}
      value={value}
      onValueChange={setValue}
      defaultExpandAll
      placeholder="Selecione os ramos..."
      aria-label="Ramos de seguro"
    />
  )
}
