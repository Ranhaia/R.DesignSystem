"use client"

import { Box } from "@/components/ui/box"

export default function BoxDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Box como container simples — padding/borda/cor via className,
          nenhum estilo vem do componente em si */}
      <Box className="rounded-md border bg-muted p-4 text-sm text-foreground">
        Box simples: container com padding e borda via classes Tailwind.
      </Box>

      {/* Box como layout flex — display/gap/alinhamento também via
          className, mesma lógica */}
      <Box className="flex items-center justify-between gap-2 rounded-md border p-4">
        <span className="text-sm">Rótulo</span>
        <span className="text-sm text-muted-foreground">Valor</span>
      </Box>

      {/* Box polimórfico via asChild — renderiza como <section> em vez
          de <div>, mantendo data-slot="box" e className aplicados no
          elemento filho */}
      <Box asChild className="rounded-md border border-dashed p-4">
        <section aria-label="Exemplo de asChild">
          Renderizado como {"<section>"} via asChild.
        </section>
      </Box>
    </div>
  )
}
