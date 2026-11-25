import { CatalogCard, CatalogCardPending, CatalogHeader } from "@/components/catalog-card"
import Link from "next/link"
import {
  atomicRegistry,
  categoryHref,
  categoryLabels,
  contagemPorCamada,
  inProgressEntries,
  type AtomicCategory,
} from "@/lib/atomic-registry"
import { componentDocs } from "@/lib/component-docs"
import { componentsList } from "@/lib/components-registry"

export const categoryTitles = categoryLabels

// Descrições curtas de orientação: o critério de cada camada, igual ao do
// comentário em atomic-registry.ts (é ele que vale; isto só resume).
export const categoryDescriptions: Record<AtomicCategory, string> = {
  primitive: "Fundação usada por todos os componentes. Não compõe nenhum outro componente do sistema.",
  atom: "Menor peça com função própria. Usa no máximo primitivos.",
  molecule: "Combina átomos num conjunto com um único propósito.",
  organism: "Combina moléculas ou organismos, com regiões e estado próprios.",
}

export function AtomicIndexPage({ category }: { category: AtomicCategory }) {
  const items = componentsList.filter(
    (item) => atomicRegistry[item.slug] === category
  )
  const contagem = contagemPorCamada()
  const pending = inProgressEntries.filter((entry) => entry.category === category)

  return (
    <div className="flex flex-1 flex-col gap-6">
      <CatalogHeader
        title={categoryTitles[category]}
        description={categoryDescriptions[category]}
        count={items.length}
      />

      <nav aria-label="Camadas" className="flex flex-wrap gap-2">
        {(Object.keys(categoryTitles) as AtomicCategory[]).map((c) => (
          <Link
            key={c}
            href={categoryHref[c]}
            aria-current={c === category ? "page" : undefined}
            className="rounded-full border px-3 py-1 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring aria-[current=page]:border-primary aria-[current=page]:text-foreground"
          >
            {categoryTitles[c]} <span className="tabular-nums">{contagem[c]}</span>
          </Link>
        ))}
      </nav>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <CatalogCard
            key={item.slug}
            href={`/components/${item.slug}`}
            name={item.name}
            description={componentDocs[item.slug]?.description}
          />
        ))}

        {pending.map((entry) => (
          <CatalogCardPending key={entry.name} name={entry.name} />
        ))}
      </div>
    </div>
  )
}
