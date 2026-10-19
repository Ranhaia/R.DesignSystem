import { CatalogCard, CatalogHeader } from "@/components/catalog-card"
import { patternDocs } from "@/lib/pattern-docs"
import { patternsList } from "@/lib/patterns-registry"

export function PatternIndexPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <CatalogHeader
        title="Patterns"
        description="Composições reutilizáveis acima de Organism/Template — cada uma com exemplo funcional de código, não só documentação em texto."
        count={patternsList.length}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {patternsList.map((item) => (
          <CatalogCard
            key={item.slug}
            href={`/patterns/${item.slug}`}
            name={item.name}
            description={patternDocs[item.slug]?.description}
          />
        ))}
      </div>
    </div>
  )
}
