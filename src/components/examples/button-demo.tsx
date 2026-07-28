import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Botão</Button>
      <Button variant="outline" size="icon" aria-label="Enviar">
        <Icon name="arrow_upward" />
      </Button>
    </div>
  )
}
