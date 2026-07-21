import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Botão</Button>
      <Button variant="outline" size="icon" aria-label="Enviar">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
