import { IconCloud } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCloud />
        </EmptyMedia>
        <EmptyTitle>Armazenamento em nuvem vazio</EmptyTitle>
        <EmptyDescription>
          Envie arquivos para o seu armazenamento em nuvem para acessá-los de
          qualquer lugar.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Enviar arquivos
        </Button>
      </EmptyContent>
    </Empty>
  )
}
