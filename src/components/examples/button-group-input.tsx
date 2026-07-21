import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Buscar..." />
      <Button variant="outline" aria-label="Buscar">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
