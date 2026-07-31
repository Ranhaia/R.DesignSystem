"use client"

import * as React from "react"

import { MultiSelect } from "@/components/ui/multi-select"

const ramos = [
  { value: "auto", label: "Auto" },
  { value: "residencial", label: "Residencial" },
  { value: "vida", label: "Vida" },
  { value: "viagem", label: "Viagem" },
  { value: "empresarial", label: "Empresarial" },
  { value: "pet", label: "Pet" },
]

export default function MultiSelectDemo() {
  const [value, setValue] = React.useState<string[]>(["auto", "vida"])

  return (
    <MultiSelect
      options={ramos}
      value={value}
      onValueChange={setValue}
      placeholder="Selecione os ramos..."
      aria-label="Ramos de seguro"
    />
  )
}
