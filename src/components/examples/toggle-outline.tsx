import { Icon } from "@/components/ui/icon"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Alternar itálico">
      <Icon name="format_italic" />
    </Toggle>
  )
}
