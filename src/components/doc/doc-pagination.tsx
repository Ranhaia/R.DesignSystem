import Link from "next/link"
import { Icon } from "@/components/ui/icon"
import { atomicRegistry } from "@/lib/atomic-registry"
import { componentsList } from "@/lib/components-registry"
import { vizinhosNaCamada } from "@/lib/doc-abas"

interface DocPaginationProps {
  slug: string
}

export function DocPagination({ slug }: DocPaginationProps) {
  const vizinhos = vizinhosNaCamada(slug, componentsList, atomicRegistry)
  const prevEntry = vizinhos.anterior
    ? componentsList.find((c) => c.slug === vizinhos.anterior)
    : null
  const nextEntry = vizinhos.proximo
    ? componentsList.find((c) => c.slug === vizinhos.proximo)
    : null

  if (!prevEntry && !nextEntry) return null

  return (
    <nav
      aria-label="Navegação entre componentes"
      className="mt-12 flex items-center justify-between border-t pt-6"
    >
      {prevEntry ? (
        <Link
          href={`/components/${prevEntry.slug}`}
          className="group flex flex-col items-start gap-1 text-sm transition-colors"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">
            <Icon name="arrow_back" size={0.875} />
            Anterior
          </span>
          <span className="font-medium text-foreground group-hover:text-primary">
            {prevEntry.name}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextEntry ? (
        <Link
          href={`/components/${nextEntry.slug}`}
          className="group flex flex-col items-end gap-1 text-sm transition-colors"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">
            Próxima
            <Icon name="arrow_forward" size={0.875} />
          </span>
          <span className="font-medium text-foreground group-hover:text-primary">
            {nextEntry.name}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
