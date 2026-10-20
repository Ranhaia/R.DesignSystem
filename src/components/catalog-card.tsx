import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"

// Card das páginas-índice (/atoms, /molecules, /organisms, /patterns,
// /templates). Antes cada índice repetia o mesmo markup com
// "[a preencher]" fixo, mesmo quando a descrição já existia em
// component-docs.ts / pattern-docs.ts. Agora a descrição vem de quem chama;
// sem descrição, continua o placeholder (conteúdo que Rafael escreve, não
// se inventa aqui).
const PLACEHOLDER = "[a preencher]"

export function CatalogCard({
  href,
  name,
  description,
}: {
  href: string
  name: string
  description?: string
}) {
  return (
    <Link href={href} className="group/catalog rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring">
      <Card className="h-full transition-[border-color,box-shadow,translate] duration-motion-base ease-spring group-hover/catalog:-translate-y-0.5 group-hover/catalog:border-primary/50 group-hover/catalog:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-base">
            {name}
            <Icon
              name="arrow_forward"
              size={1}
              className="-translate-x-1 text-muted-foreground opacity-0 transition-[opacity,translate] duration-motion-base ease-spring group-hover/catalog:translate-x-0 group-hover/catalog:opacity-100 group-focus-visible/catalog:translate-x-0 group-focus-visible/catalog:opacity-100"
            />
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description || PLACEHOLDER}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

// Item planejado, ainda sem rota: card desabilitado com badge.
export function CatalogCardPending({ name }: { name: string }) {
  return (
    <Card className="h-full opacity-60">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription>{PLACEHOLDER}</CardDescription>
        </div>
        <Badge variant="outline" className="shrink-0">
          Em construção
        </Badge>
      </CardHeader>
    </Card>
  )
}

export function CatalogHeader({
  title,
  description,
  count,
}: {
  title: string
  description: string
  count: number
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
        <Badge variant="secondary">{count}</Badge>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
