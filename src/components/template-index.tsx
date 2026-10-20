import { CatalogCard, CatalogCardPending, CatalogHeader } from "@/components/catalog-card"
import { inProgressTemplates, templatesList } from "@/lib/templates-registry"

// Página-índice de /templates — mesmo padrão visual de AtomicIndexPage
// (atomic-index.tsx): grid de cards, item construído linka pra rota real,
// item planejado (Fase 5) aparece desabilitado com badge "Em construção".
export function TemplateIndexPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <CatalogHeader
        title="Templates"
        description="Jornadas completas em Next.js, com navegação real entre telas — onde o Design System é testado ponta a ponta com leitor de tela."
        count={templatesList.length}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templatesList.map((item) => (
          <CatalogCard key={item.slug} href={`/templates/${item.slug}`} name={item.name} />
        ))}

        {inProgressTemplates.map((entry) => (
          <CatalogCardPending key={entry.slug} name={entry.name} />
        ))}
      </div>
    </div>
  )
}
