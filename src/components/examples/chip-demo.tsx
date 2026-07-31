"use client"

import { Chip } from "@/components/ui/chip"
import { Icon } from "@/components/ui/icon"

export default function ChipDemo() {
  return (
    <div className="flex w-full flex-wrap gap-2">
      <Chip>Categoria: Roupas</Chip>
      <Chip removable onRemove={() => {}}>
        Tamanho: M
      </Chip>
      <Chip
        icon={<Icon name="sell" />}
        removable
        onRemove={() => {}}
      >
        Promoção
      </Chip>
      <Chip variant="ai-generated" removable onRemove={() => {}}>
        Sugestão gerada por IA
      </Chip>
    </div>
  )
}
