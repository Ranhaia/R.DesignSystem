import { IconBell } from "@tabler/icons-react"
import { RefreshCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function EmptyMuted() {
  return (
    <Empty className="h-full bg-gradient-to-b from-muted/50 from-30% to-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconBell />
        </EmptyMedia>
        <EmptyTitle>Sem notificações</EmptyTitle>
        <EmptyDescription>
          Você está em dia. Novas notificações vão aparecer aqui.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <RefreshCcwIcon />
          Atualizar
        </Button>
      </EmptyContent>
    </Empty>
  )
}
