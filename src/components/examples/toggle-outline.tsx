import { Italic } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Alternar itálico">
      <Italic />
    </Toggle>
  )
}
