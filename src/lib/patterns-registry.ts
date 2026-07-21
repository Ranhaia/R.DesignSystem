// Registro dos 15 Patterns do "mapa de IA completo" (PLANO-DESIGN-SYSTEM.md).
// Cada slug tem um componente funcional real em src/components/patterns/ —
// nada aqui é só documentação em texto, seguindo a regra 4 daquele plano
// ("cada pattern deve ter exemplo funcional de código").

export interface PatternEntry {
  slug: string
  name: string
}

export const patternsList: PatternEntry[] = [
  { slug: "empty-state", name: "Empty State" },
  { slug: "loading", name: "Loading" },
  { slug: "error-state", name: "Error State" },
  { slug: "skeleton", name: "Skeleton" },
  { slug: "success-feedback", name: "Success Feedback" },
  { slug: "search-experience", name: "Search Experience" },
  { slug: "crud", name: "CRUD" },
  { slug: "multi-step-form", name: "Multi-step Form" },
  { slug: "confirmation-dialog", name: "Confirmation Dialog" },
  { slug: "delete-flow", name: "Delete Flow" },
  { slug: "pagination", name: "Pagination" },
  { slug: "infinite-scroll", name: "Infinite Scroll" },
  { slug: "filters", name: "Filters" },
  { slug: "upload", name: "Upload" },
  { slug: "toast-strategy", name: "Toast Strategy" },
]
