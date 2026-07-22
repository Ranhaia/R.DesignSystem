import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { inProgressTemplates, templatesList } from "@/lib/templates-registry"

// Página-índice de /templates — mesmo padrão visual de AtomicIndexPage
// (atomic-index.tsx): grid de cards, item construído linka pra rota real,
// item planejado (Fase 5) aparece desabilitado com badge "Em construção".
export function TemplateIndexPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Templates
        </h1>
        <p className="text-muted-foreground text-sm">
          Jornadas completas em Next.js, com navegação real entre telas —
          onde o Design System é testado ponta a ponta com leitor de tela.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templatesList.map((item) => (
          <Link key={item.slug} href={`/templates/${item.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription>[a preencher]</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}

        {inProgressTemplates.map((entry) => (
          <Card key={entry.slug} className="h-full opacity-60">
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
