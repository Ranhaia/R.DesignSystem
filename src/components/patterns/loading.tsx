"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

// Pattern: Loading — estado de carregamento assíncrono real (não decorativo).
// A região com aria-live="polite" anuncia a mudança de estado pra quem usa
// leitor de tela, já que o Spinner por si só (role="status") só é lido se o
// nó já estiver na árvore de acessibilidade quando o estado muda.
export function LoadingPattern() {
  const [loading, setLoading] = React.useState(false)
  const [loadedAt, setLoadedAt] = React.useState<string | null>(null)

  function handleLoad() {
    setLoading(true)
    setLoadedAt(null)
    window.setTimeout(() => {
      setLoading(false)
      // timeZone fixado em America/Sao_Paulo — sem isso, o horário exibido
      // seguiria o fuso do navegador/servidor de quem acessa, não o do
      // Rafael. Pedido dele: "preciso que se relacione ao horario de São
      // paulo" (2026-07-23).
      setLoadedAt(
        new Date().toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        })
      )
    }, 1500)
  }

  return (
    <div className="space-y-3">
      <Card>
        <CardContent className="flex min-h-24 items-center justify-between gap-4 pt-6">
          <div>
            <p className="text-sm font-medium">Resumo de sinistros</p>
            <p className="text-muted-foreground text-sm">
              {loading
                ? "Carregando dados..."
                : loadedAt
                  ? `Atualizado às ${loadedAt}`
                  : "Clique em atualizar para carregar os dados"}
            </p>
          </div>
          <Button onClick={handleLoad} disabled={loading} variant="outline">
            {loading && <Spinner />}
            Atualizar
          </Button>
        </CardContent>
      </Card>
      <p aria-live="polite" className="sr-only">
        {loading ? "Carregando dados" : loadedAt ? "Dados atualizados" : ""}
      </p>
    </div>
  )
}
