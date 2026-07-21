import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copiar
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Colar
      </Button>
    </ButtonGroup>
  )
}
