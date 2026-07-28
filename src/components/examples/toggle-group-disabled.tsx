import { Icon } from "@/components/ui/icon"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple" disabled>
      <ToggleGroupItem value="bold" aria-label="Alternar negrito">
        <Icon name="format_bold" size={1} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Alternar itálico">
        <Icon name="format_italic" size={1} />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Alternar tachado">
        <Icon name="format_underlined" size={1} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
