"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Icon } from "@/components/ui/icon"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Anterior">
          <Icon name="arrow_back" />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Próximo">
          <Icon name="arrow_forward" />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
