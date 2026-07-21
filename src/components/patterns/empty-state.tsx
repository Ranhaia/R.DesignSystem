"use client"

import { InboxIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

// Pattern: Empty State — composição real do Molecule "empty" (já catalogado)
// com uma ação primária. Usa a variante "icon" do EmptyMedia (fundo
// bg-muted) pra destacar o ícone sem depender de cor fora de token.
export function EmptyStatePattern() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>Nenhuma apólice encontrada</EmptyTitle>
        <EmptyDescription>
          Ainda não existem apólices cadastradas para este cliente. Crie a
          primeira apólice para começar.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => toast("Abrir formulário de nova apólice")}>
          Nova apólice
        </Button>
      </EmptyContent>
    </Empty>
  )
}
