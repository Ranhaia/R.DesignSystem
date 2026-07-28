import { Icon } from "@/components/ui/icon"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Alternar itálico">
      <Icon name="format_italic" />
      Itálico
    </Toggle>
  )
}
