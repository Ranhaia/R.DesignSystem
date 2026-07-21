import Link from "next/link"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { patternsList } from "@/lib/patterns-registry"

export function PatternIndexPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Patterns
        </h1>
        <p className="text-muted-foreground text-sm">
          Composições reutilizáveis acima de Organism/Template — cada uma com
          exemplo funcional de código, não só documentação em texto.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {patternsList.map((item) => (
          <Link key={item.slug} href={`/patterns/${item.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription>[a preencher]</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
