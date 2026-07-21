import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle
      aria-label="Alternar favorito"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
    >
      <BookmarkIcon />
      Favorito
    </Toggle>
  )
}
