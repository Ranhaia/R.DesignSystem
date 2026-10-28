import Link from "next/link"
import type { MaterialSymbol } from "material-symbols"

import { CatalogCard, CatalogHeader } from "@/components/catalog-card"
import {
  atomicRegistry,
  categoryHref,
  categoryLabels,
  type AtomicCategory,
} from "@/lib/atomic-registry"
import { componentDocs } from "@/lib/component-docs"
import { componentsList } from "@/lib/components-registry"
import { templatesList } from "@/lib/templates-registry"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"

interface CategorySummary {
  key: string
  title: string
  description: string
  href: string
  icon: MaterialSymbol
  count: number
}

// Descrições canônicas de cada camada do Design System (espelham o critério
// de atomic-registry.ts e atomic-index.tsx).
const categoryDescriptions: Record<AtomicCategory, string> = {
  primitive:
    "Fundação usada por todos os componentes. Não compõe nenhum outro componente do sistema.",
  atom: "Menor peça com função própria. Usa no máximo primitivos.",
  molecule: "Combina átomos num conjunto com um único propósito.",
  organism:
    "Combina moléculas ou organismos, com regiões e estado próprios.",
}

const templateDescription =
  "Jornadas completas em Next.js, com navegação real entre telas."

// Página-índice do grupo Components (/components) — visão geral com cartões
// resumo das 5 camadas (Primitivos, Atoms, Molecules, Organisms, Templates)
// e listagem completa dos componentes categorizados, permitindo navegação rápida.
export function ComponentsIndexPage() {
  const primitives = componentsList.filter(
    (c) => atomicRegistry[c.slug] === "primitive"
  )
  const atoms = componentsList.filter((c) => atomicRegistry[c.slug] === "atom")
  const molecules = componentsList.filter(
    (c) => atomicRegistry[c.slug] === "molecule"
  )
  const organisms = componentsList.filter(
    (c) => atomicRegistry[c.slug] === "organism"
  )

  const totalCount =
    primitives.length +
    atoms.length +
    molecules.length +
    organisms.length +
    templatesList.length

  const categories: CategorySummary[] = [
    {
      key: "primitive",
      title: categoryLabels.primitive,
      description: categoryDescriptions.primitive,
      href: categoryHref.primitive,
      icon: "category",
      count: primitives.length,
    },
    {
      key: "atom",
      title: categoryLabels.atom,
      description: categoryDescriptions.atom,
      href: categoryHref.atom,
      icon: "orbit",
      count: atoms.length,
    },
    {
      key: "molecule",
      title: categoryLabels.molecule,
      description: categoryDescriptions.molecule,
      href: categoryHref.molecule,
      icon: "call_merge",
      count: molecules.length,
    },
    {
      key: "organism",
      title: categoryLabels.organism,
      description: categoryDescriptions.organism,
      href: categoryHref.organism,
      icon: "hub",
      count: organisms.length,
    },
    {
      key: "template",
      title: "Templates",
      description: templateDescription,
      href: "/templates",
      icon: "space_dashboard",
      count: templatesList.length,
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-10">
      <CatalogHeader
        title="Components"
        description="Catálogo completo de componentes do Design System, organizado pela hierarquia do Atomic Design (Primitivos, Atoms, Molecules, Organisms) e Templates."
        count={totalCount}
      />

      {/* Cartões de resumo das 5 camadas */}
      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Camadas do catálogo
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={cat.href}
              className="group/cat rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
            >
              <Card className="h-full transition-[border-color,box-shadow,translate] duration-motion-base ease-spring group-hover/cat:-translate-y-0.5 group-hover/cat:border-primary/50 group-hover/cat:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon
                        name={cat.icon}
                        className="text-muted-foreground size-5 group-hover/cat:text-foreground transition-colors"
                      />
                      <CardTitle className="text-base">{cat.title}</CardTitle>
                    </div>
                    <Badge variant="secondary">{cat.count}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2 text-xs">
                    {cat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Seção Primitivos */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold tracking-tight">
              {categoryLabels.primitive}
            </h2>
            <Badge variant="outline">{primitives.length}</Badge>
          </div>
          <Link
            href={categoryHref.primitive}
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Ver índice completo →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {primitives.map((item) => (
            <CatalogCard
              key={item.slug}
              href={`/components/${item.slug}`}
              name={item.name}
              description={componentDocs[item.slug]?.description}
            />
          ))}
        </div>
      </section>

      {/* Seção Atoms */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold tracking-tight">
              {categoryLabels.atom}
            </h2>
            <Badge variant="outline">{atoms.length}</Badge>
          </div>
          <Link
            href={categoryHref.atom}
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Ver índice completo →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {atoms.map((item) => (
            <CatalogCard
              key={item.slug}
              href={`/components/${item.slug}`}
              name={item.name}
              description={componentDocs[item.slug]?.description}
            />
          ))}
        </div>
      </section>

      {/* Seção Molecules */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold tracking-tight">
              {categoryLabels.molecule}
            </h2>
            <Badge variant="outline">{molecules.length}</Badge>
          </div>
          <Link
            href={categoryHref.molecule}
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Ver índice completo →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {molecules.map((item) => (
            <CatalogCard
              key={item.slug}
              href={`/components/${item.slug}`}
              name={item.name}
              description={componentDocs[item.slug]?.description}
            />
          ))}
        </div>
      </section>

      {/* Seção Organisms */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold tracking-tight">
              {categoryLabels.organism}
            </h2>
            <Badge variant="outline">{organisms.length}</Badge>
          </div>
          <Link
            href={categoryHref.organism}
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Ver índice completo →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {organisms.map((item) => (
            <CatalogCard
              key={item.slug}
              href={`/components/${item.slug}`}
              name={item.name}
              description={componentDocs[item.slug]?.description}
            />
          ))}
        </div>
      </section>

      {/* Seção Templates */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold tracking-tight">
              Templates
            </h2>
            <Badge variant="outline">{templatesList.length}</Badge>
          </div>
          <Link
            href="/templates"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Ver índice completo →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templatesList.map((item) => (
            <CatalogCard
              key={item.slug}
              href={`/templates/${item.slug}`}
              name={item.name}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
