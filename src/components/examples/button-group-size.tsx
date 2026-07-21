import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupSize() {
  return (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Pequeno
        </Button>
        <Button variant="outline" size="sm">
          Botão
        </Button>
        <Button variant="outline" size="sm">
          Grupo
        </Button>
        <Button variant="outline" size="icon-sm">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Padrão</Button>
        <Button variant="outline">Botão</Button>
        <Button variant="outline">Grupo</Button>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Grande
        </Button>
        <Button variant="outline" size="lg">
          Botão
        </Button>
        <Button variant="outline" size="lg">
          Grupo
        </Button>
        <Button variant="outline" size="icon-lg">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}
