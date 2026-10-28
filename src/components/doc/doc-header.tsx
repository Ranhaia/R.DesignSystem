import Link from "next/link"
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
}

export function DocHeader({ slug, name, description }: DocHeaderProps) {
  const category = atomicRegistry[slug] as AtomicCategory | undefined
  const categoryLabel = category ? categoryLabels[category] : null
  const categoryLink = category ? categoryHref[category] : null

  return (
    <header className="space-y-1.5">
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
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        {name}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </header>
  )
}
