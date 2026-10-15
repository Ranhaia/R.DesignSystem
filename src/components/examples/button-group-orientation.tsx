import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Icon } from "@/components/ui/icon"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Controles de mídia"
      className="h-fit"
    >
      <Button variant="outline" size="icon" aria-label="Aumentar">
        <Icon name="add" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Diminuir">
        <Icon name="remove" />
      </Button>
    </ButtonGroup>
  )
}
