"use client"

import { BackToTop } from "@/components/ui/back-to-top"

// O botão é fixo no canto da tela: role esta página para vê-lo aparecer.
export default function BackToTopDemo() {
  return (
    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
      <p>Role a página para baixo: o botão aparece no canto inferior direito.</p>
      <BackToTop threshold={200} />
    </div>
  )
}
