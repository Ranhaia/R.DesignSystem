import * as React from "react"
import Link from "next/link"
import { faixaMeta, type ItemFaixaMeta } from "@/lib/doc-abas"
import type { ComponentDoc } from "@/lib/component-docs"
import { componentsList } from "@/lib/components-registry"
import { categoryLabels, type AtomicCategory } from "@/lib/atomic-registry"

const statusLabels: Record<string, string> = {
  estavel: "Estável",
  descontinuado: "Descontinuado",
}

interface DocMetaStripProps {
  doc?: ComponentDoc
}

export function DocMetaStrip({ doc }: DocMetaStripProps) {
  if (!doc) return null

  const itens = faixaMeta(doc)
  const temCodigo = Boolean(doc.meta?.codigo)
  const temStory = Boolean(doc.meta?.story)

  if (itens.length === 0 && !temCodigo && !temStory) {
    return null
  }

  const renderValores = (item: ItemFaixaMeta) => {
    if (item.rotulo === "Status") {
      return item.valores.map((v) => statusLabels[v] ?? v).join(", ")
    }

    if (item.rotulo === "Camada") {
      return item.valores
        .map((v) => categoryLabels[v as AtomicCategory] ?? v)
        .join(", ")
    }

    if (item.rotulo === "Relacionados") {
      return item.valores.map((relSlug, i) => {
        const existe = componentsList.some((c) => c.slug === relSlug)
        return (
          <React.Fragment key={relSlug}>
            {i > 0 && <span className="text-muted-foreground">, </span>}
            {existe ? (
              <Link
                href={`/components/${relSlug}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {relSlug}
              </Link>
            ) : (
              <span>{relSlug}</span>
            )}
          </React.Fragment>
        )
      })
    }

    return item.valores.join(", ")
  }

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border bg-card px-4 py-3 text-xs text-muted-foreground">
      {itens.map((item) => (
        <div key={item.rotulo} className="flex items-center gap-1.5">
          <span className="font-medium text-foreground">{item.rotulo}:</span>
          <span>{renderValores(item)}</span>
        </div>
      ))}
      {temCodigo && (
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground">Código:</span>
          <span className="font-mono text-xs">{doc.meta?.codigo}</span>
        </div>
      )}
      {temStory && (
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground">Story:</span>
          <span className="font-mono text-xs">{doc.meta?.story}</span>
        </div>
      )}
    </div>
  )
}
