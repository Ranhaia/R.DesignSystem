import { Italic } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Alternar itálico">
      <Italic />
    </Toggle>
  )
}
