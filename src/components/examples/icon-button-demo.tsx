"use client"

import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"

export default function IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <IconButton
        variant="default"
        icon={<Icon name="favorite" />}
        aria-label="Favoritar"
      />
      <IconButton
        variant="secondary"
        icon={<Icon name="download" />}
        aria-label="Baixar"
      />
      <IconButton
        variant="outline"
        icon={<Icon name="close" />}
        aria-label="Fechar"
      />
      <IconButton
        variant="ghost"
        size="icon-sm"
        icon={<Icon name="more_horiz" />}
        aria-label="Mais opções"
      />
      <IconButton
        variant="destructive"
        icon={<Icon name="delete" />}
        aria-label="Excluir"
      />
      <IconButton
        variant="default"
        size="icon-lg"
        icon={<Icon name="favorite" />}
        aria-label="Favoritar"
        disabled
      />
    </div>
  )
}
