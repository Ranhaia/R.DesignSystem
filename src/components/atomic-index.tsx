import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  atomicRegistry,
  inProgressEntries,
  type AtomicCategory,
} from "@/lib/atomic-registry"
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
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {categoryTitles[category]}
        </h1>
        <p className="text-muted-foreground text-sm">
          {categoryDescriptions[category]}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.slug} href={`/components/${item.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription>[a preencher]</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}

        {pending.map((entry) => (
          <Card key={entry.name} className="h-full opacity-60">
            <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
              <div>
                <CardTitle className="text-base">{entry.name}</CardTitle>
                <CardDescription>[a preencher]</CardDescription>
              </div>
              <Badge variant="outline" className="shrink-0">
                Em construção
              </Badge>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
