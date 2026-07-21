import { Underline } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Alternar itálico" disabled>
      <Underline className="h-4 w-4" />
    </Toggle>
  )
}
