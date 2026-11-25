"use client"

import { ColorPickerPanel } from "@/components/ui/color-picker"

export default function ColorPickerInline() {
  return <ColorPickerPanel defaultValue="#16a34a" paleta={["#16a34a", "#0891b2", "#e11d48"]} />
}
