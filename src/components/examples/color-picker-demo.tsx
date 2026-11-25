"use client"

import * as React from "react"

import { ColorPicker } from "@/components/ui/color-picker"

const paleta = ["#0f172a", "#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"]

export default function ColorPickerDemo() {
  const [cor, setCor] = React.useState("#2563eb")
  return (
    <div className="flex flex-col items-start gap-2">
      <ColorPicker label="Cor da marca" value={cor} onValueChange={setCor} paleta={paleta} />
      <p className="text-sm text-muted-foreground">Escolhida: {cor}</p>
    </div>
  )
}
