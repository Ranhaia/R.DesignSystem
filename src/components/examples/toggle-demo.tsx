import { Icon } from "@/components/ui/icon"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle
      aria-label="Alternar favorito"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:text-blue-500"
    >
      <Icon name="bookmark" />
      Favorito
    </Toggle>
  )
}
