"use client"

import { Tag } from "@/components/ui/tag"
import { Icon } from "@/components/ui/icon"

export default function TagDemo() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Tag>Categoria: Roupas</Tag>
        <Tag variant="primary">Novidade</Tag>
        <Tag variant="success">Aprovado</Tag>
        <Tag variant="warning">Pendente</Tag>
        <Tag variant="danger">Recusado</Tag>
        <Tag variant="ai-generated">
          <Icon name="sell" />
          Sugestão gerada por IA
        </Tag>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Tag variant="primary" highlight>
          Em destaque
        </Tag>
        <Tag variant="success" highlight>
          Aprovado
        </Tag>
        <Tag variant="warning" highlight>
          Pendente
        </Tag>
        <Tag variant="danger" highlight>
          Recusado
        </Tag>
      </div>
    </div>
  )
}
