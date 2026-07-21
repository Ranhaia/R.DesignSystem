"use client"

import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Pattern: Skeleton — placeholder de layout enquanto o conteúdo real carrega.
// `aria-busy` no contêiner + região aria-live anunciam a transição pra quem
// usa leitor de tela (o Skeleton em si é só visual, `animate-pulse`, sem
// nenhum papel ARIA próprio — não anuncia nada sozinho).
export function SkeletonPattern() {
  const [loaded, setLoaded] = React.useState(false)

  return (
    <div className="space-y-3">
      <div
        aria-busy={!loaded}
        className="flex items-center gap-3 rounded-lg border p-4"
      >
        {loaded ? (
          <>
            <Avatar>
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Carla Souza</p>
              <p className="text-muted-foreground text-sm">
                Corretora · CRE-SP 48213
              </p>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>
          </>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={() => setLoaded((v) => !v)}>
        {loaded ? "Simular carregamento" : "Simular conteúdo carregado"}
      </Button>
      <p aria-live="polite" className="sr-only">
        {loaded ? "Conteúdo carregado" : "Carregando conteúdo"}
      </p>
    </div>
  )
}
