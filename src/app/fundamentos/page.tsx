import { CatalogCard } from "@/components/catalog-card"
import { foundationsList } from "@/lib/foundations-registry"

export default function FundamentosPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {foundationsList.map((item) => (
          <CatalogCard
            key={item.slug}
            href={item.href}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}
