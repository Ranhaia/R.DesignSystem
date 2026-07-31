"use client"

import { Tag } from "@/components/ui/tag"
import { Icon } from "@/components/ui/icon"

export default function TagDemo() {
  return (
    <div className="flex w-full flex-wrap gap-2">
      <Tag>Categoria: Roupas</Tag>
      <Tag variant="primary">Em destaque</Tag>
      <Tag variant="success">Aprovado</Tag>
      <Tag variant="warning">Pendente</Tag>
      <Tag variant="danger">Recusado</Tag>
      <Tag variant="ai-generated">
        <Icon name="sell" />
        Sugestão gerada por IA
      </Tag>
    </div>
  )
}
