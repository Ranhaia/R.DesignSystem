import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Skeleton } from "@/components/ui/skeleton"

// Link reaproveita exatamente as classes da variant "link" de buttonVariants
// (button.tsx) — mesma cor (--primary), mesmo underline-offset e mesmo hover.
// Só os tamanhos "de texto" da escala do Button entram aqui (default/xs/sm/lg)
// — os tamanhos "icon"/"icon-xs"/"icon-sm"/"icon-lg" não fazem sentido pra um
// link, que sempre carrega um texto (children obrigatório), nunca é ícone-only.
type LinkSize = "default" | "xs" | "sm" | "lg"

// asChild + Next.js <Link>: este átomo NÃO decide sozinho quando usar
// next/link internamente (ex.: "se href começa com '/'"). Segue o mesmo
// precedente já validado neste projeto — BreadcrumbLink (breadcrumb.tsx) —
// que também renderiza <a> puro por padrão e delega a composição com
// next/link pro chamador via asChild (ver breadcrumb-link.tsx: <BreadcrumbLink
// asChild><Link href="/">Início</Link></BreadcrumbLink>). Rafael pode compor
// <Link asChild><NextLink href="/rota">Texto</NextLink></Link> do mesmo jeito.
function Link({
  className,
  size = "default",
  asChild = false,
  external = false,
  target,
  rel,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  size?: LinkSize
  asChild?: boolean
  /** Marca o link como saída para fora do contexto atual: força
      target="_blank" + rel="noopener noreferrer" e acrescenta um ícone de
      saída depois do texto. Decisão provisória (ver docs/archive/componentes/link/spec.md
      "Modo autônomo") — o typedef do @nimbus-ds/link não expõe um boolean
      `external` pronto (o README só recomenda "inclua um ícone" como boa
      prática, sem prescrever a prop), mas o padrão já existe implementado
      neste catálogo em src/components/examples/item-link.tsx
      (target="_blank" rel="noopener noreferrer" + <Icon name="open_in_new" />)
      — só formalizei como prop de conveniência. */
  external?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="link"
      data-size={size}
      className={cn(buttonVariants({ variant: "link", size }), className)}
      target={external ? "_blank" : target}
      rel={external ? "noopener noreferrer" : rel}
      {...props}
    >
      {children}
      {external && <Icon name="open_in_new" />}
    </Comp>
  )
}

// Link.Skeleton: mesmo raciocínio do Button.Skeleton/Chip.Skeleton — evita
// layout shift, size-aware porque Link herda a mesma escala de tamanho do
// Button. Larguras são estimativa nossa pra um link de texto curto (não é
// token Nimbus), ajustar via className quando o link real for mais largo.
const skeletonSizeClasses: Record<LinkSize, string> = {
  default: "h-9 w-20 rounded-md",
  xs: "h-6 w-14 rounded-md",
  sm: "h-8 w-16 rounded-md",
  lg: "h-10 w-24 rounded-md",
}

function LinkSkeleton({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  size?: LinkSize
}) {
  return (
    <Skeleton
      data-slot="link-skeleton"
      className={cn(skeletonSizeClasses[size], className)}
      {...props}
    />
  )
}

// Object.assign (não `Link.Skeleton = LinkSkeleton`) — mesmo motivo de
// ButtonWithSkeleton/ChipWithSkeleton: `function Link(...)` não tem essa
// propriedade no tipo inferido, Object.assign devolve a interseção sem
// precisar de cast/any.
const LinkWithSkeleton = Object.assign(Link, { Skeleton: LinkSkeleton })

export { LinkWithSkeleton as Link }
export type { LinkSize }
