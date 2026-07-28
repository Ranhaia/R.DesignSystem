import { Icon } from "@/components/ui/icon"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Alternar itálico" disabled>
      <Icon name="format_underlined" size={1} />
    </Toggle>
  )
}
