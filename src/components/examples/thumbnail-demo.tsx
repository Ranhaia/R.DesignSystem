"use client"

import { Thumbnail } from "@/components/ui/thumbnail"

export default function ThumbnailDemo() {
  return (
    <div className="flex w-full flex-wrap items-end gap-4">
      <Thumbnail
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80"
        alt="Foto de Drew Beamer"
        size="sm"
      />
      <Thumbnail
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80"
        alt="Foto de Drew Beamer"
      />
      <Thumbnail
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80"
        alt="Foto de Drew Beamer"
        size="lg"
        aspectRatio="16/9"
      />
      {/* src inválido/ausente — dispara o fallback (sem ícone, só bg-muted) */}
      <Thumbnail src="" alt="Anexo sem preview disponível" size="lg" />
      {/* Placeholder de carregamento */}
      <Thumbnail.Skeleton size="lg" aspectRatio="16/9" />
    </div>
  )
}
