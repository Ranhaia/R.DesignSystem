import { Icon } from "@/components/ui/icon"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export default function ToggleGroupSpacing() {
  return (
    <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
      <ToggleGroupItem
        value="star"
        aria-label="Alternar estrela"
        className="data-[state=on]:bg-transparent data-[state=on]:text-yellow-500"
      >
        <Icon name="star" />
        Estrela
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heart"
        aria-label="Alternar coração"
        className="data-[state=on]:bg-transparent data-[state=on]:text-red-500"
      >
        <Icon name="favorite" />
        Coração
      </ToggleGroupItem>
      <ToggleGroupItem
        value="bookmark"
        aria-label="Alternar favorito"
        className="data-[state=on]:bg-transparent data-[state=on]:text-blue-500"
      >
        <Icon name="bookmark" />
        Favorito
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
