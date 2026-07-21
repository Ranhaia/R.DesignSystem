import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

export default function KbdButton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Aceitar <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancelar <Kbd>Esc</Kbd>
      </Button>
    </div>
  )
}
