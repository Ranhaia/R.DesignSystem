"use client"

import * as React from "react"

import { Tree, type TreeNode } from "@/components/ui/tree"

const ramos: TreeNode[] = [
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

export default function TreeDemo() {
  const [escolhido, setEscolhido] = React.useState("auto")
  return (
    <Tree
      aria-label="Ramos de seguro"
      className="w-64"
      data={ramos}
      defaultExpanded={["patrimonial"]}
      isSelected={(valor) => valor === escolhido}
      onSelect={setEscolhido}
    />
  )
}