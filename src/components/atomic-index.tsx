import { CatalogCard, CatalogCardPending, CatalogHeader } from "@/components/catalog-card"
import {
  atomicRegistry,
  inProgressEntries,
  type AtomicCategory,
} from "@/lib/atomic-registry"
import { componentDocs } from "@/lib/component-docs"
import { componentsList } from "@/lib/components-registry"

const categoryTitles: Record<AtomicCategory, string> = {
  atom: "Atoms",
  molecule: "Molecules",
  organism: "Organisms",
}

// Descrições curtas de orientação (não são o conteúdo narrativo que fica
// pra Rafael escrever depois — são só o critério de categorização, pra
// contextualizar quem está navegando o catálogo).
const categoryDescriptions: Record<AtomicCategory, string> = {
  atom: "Menor unidade funcional do catálogo — não se decompõe em outros componentes.",
  molecule: "Combinação de poucos atoms com um propósito único e reutilizável.",
  organism: "Composição maior, geralmente reunindo várias molecules/atoms com lógica própria.",
}

export function AtomicIndexPage({ category }: { category: AtomicCategory }) {
  const items = componentsList.filter(
    (item) => atomicRegistry[item.slug] === category
  )
  const pending = inProgressEntries.filter((entry) => entry.category === category)

  return (
    <div className="flex flex-1 flex-col gap-6">
      <CatalogHeader
        title={categoryTitles[category]}
        description={categoryDescriptions[category]}
        count={items.length}
      />

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
