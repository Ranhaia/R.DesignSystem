import { BookmarkIcon, HeartIcon, StarIcon } from "lucide-react"

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
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
      >
        <StarIcon />
        Estrela
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heart"
        aria-label="Alternar coração"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
      >
        <HeartIcon />
        Coração
      </ToggleGroupItem>
      <ToggleGroupItem
        value="bookmark"
        aria-label="Alternar favorito"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
      >
        <BookmarkIcon />
        Favorito
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
