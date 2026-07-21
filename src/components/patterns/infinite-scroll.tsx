"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

function loadBatch(offset: number, count: number) {
  return Array.from({ length: count }, (_, i) => `Sinistro #${offset + i + 1}`)
}

// Pattern: Infinite Scroll — usa IntersectionObserver pra carregar mais
// itens quando a sentinela (div vazia no fim da lista) entra na viewport,
// MAS mantém um botão "Carregar mais" sempre visível como alternativa
// explícita: rolagem automática por si só não é um alvo de clique/toque
// confiável em todo dispositivo/tecnologia assistiva, então a ação
// principal (carregar mais) precisa continuar acionável sem depender só do
// scroll. Uma região aria-live anuncia quantos itens foram carregados.
export function InfiniteScrollPattern() {
  const [items, setItems] = React.useState(() => loadBatch(0, 6))
  const [loading, setLoading] = React.useState(false)
  const sentinelRef = React.useRef<HTMLDivElement>(null)

  const loadMore = React.useCallback(() => {
    setLoading(true)
    window.setTimeout(() => {
      setItems((prev) => [...prev, ...loadBatch(prev.length, 6)])
      setLoading(false)
    }, 800)
  }, [])

  React.useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && !loading && items.length < 30) {
        loadMore()
      }
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, loading, items.length])

  const done = items.length >= 30

  return (
    <div className="space-y-3">
      <div className="max-h-64 overflow-y-auto rounded-lg border p-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item} className="rounded-md px-3 py-2 text-sm hover:bg-muted/50">
              {item}
            </li>
          ))}
        </ul>
        <div ref={sentinelRef} aria-hidden className="h-px" />
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant="outline"
          onClick={loadMore}
          disabled={loading || done}
        >
          {loading && <Spinner />}
          {done ? "Todos os itens carregados" : "Carregar mais"}
        </Button>
      </div>

      <p aria-live="polite" className="sr-only">
        {items.length} itens carregados
      </p>
    </div>
  )
}
