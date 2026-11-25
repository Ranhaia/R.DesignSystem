import Link from "next/link"
import type { MetricaTopo } from "@/lib/doc-abas"
import {
  atomicRegistry,
  categoryHref,
  categoryLabels,
  type AtomicCategory,
} from "@/lib/atomic-registry"

interface DocHeaderProps {
  slug: string
  name: string
  description?: string
  metricas?: MetricaTopo[]
}

export function DocHeader({ slug, name, description, metricas = [] }: DocHeaderProps) {
  const category = atomicRegistry[slug] as AtomicCategory | undefined
  const categoryLabel = category ? categoryLabels[category] : null
  const categoryLink = category ? categoryHref[category] : null

  return (
    <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="max-w-prose space-y-1.5">
        {categoryLabel && categoryLink && (
          <div>
            <Link
              href={categoryLink}
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {categoryLabel}
            </Link>
          </div>
        )}
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">{name}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {metricas.length > 0 && (
        <dl className="flex gap-6">
          {metricas.map((m) => (
            <div key={m.rotulo} className="flex flex-col-reverse gap-0.5">
              <dt className="text-xs text-muted-foreground">{m.rotulo}</dt>
              <dd className="font-heading text-2xl font-semibold tabular-nums">{m.valor}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  )
}
