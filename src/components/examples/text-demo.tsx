"use client"

import { Text } from "@/components/ui/text"

export default function TextDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Text size="highlight" weight="bold">
        Título de destaque
      </Text>
      <Text>
        Texto de corpo padrão, usado para a maior parte do conteúdo textual
        das telas.
      </Text>
      <Text size="caption" muted>
        Texto auxiliar (caption), com cor secundária.
      </Text>
      <Text as="span" weight="medium">
        Texto inline, renderizado como &lt;span&gt;.
      </Text>
    </div>
  )
}
