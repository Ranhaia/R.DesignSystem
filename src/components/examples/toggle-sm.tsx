import { Icon } from "@/components/ui/icon"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Alternar itálico">
      <Icon name="format_italic" />
    </Toggle>
  )
}
