import * as React from "react"
import type { LinhaDoc } from "@/lib/doc-abas"

interface DocLinhasProps {
  linhas: LinhaDoc[]
}

// A linha única das abas: Anatomia, Estados, Acessibilidade e Tokens usam esta mesma, para a página falar um idioma só.
export function DocLinhas({ linhas }: DocLinhasProps) {
  return (
    <div className="divide-y rounded-lg border bg-card">
      {linhas.map((linha) => (
        <div
          key={linha.rotulo}
          className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-4"
        >
          <span className="w-40 shrink-0 text-sm font-medium">{linha.rotulo}</span>
          {linha.codigos ? (
            <span className="flex flex-1 flex-wrap gap-1.5">
              {linha.codigos.map((codigo) => (
                <code
                  key={codigo}
                  className="rounded bg-muted px-2 py-1 font-mono text-xs text-foreground"
                >
                  {codigo}
                </code>
              ))}
            </span>
          ) : (
            <span className="flex-1 text-sm text-muted-foreground">{linha.texto}</span>
          )}
        </div>
      ))}
    </div>
  )
}
