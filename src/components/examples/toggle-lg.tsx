import { Italic } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleLg() {
  return (
    <Toggle size="lg" aria-label="Alternar itálico">
      <Italic />
    </Toggle>
  )
}
