"use client"

import * as React from "react"
import { AspectRatio as AspectRatioPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// Proporções suportadas — espelham 1:1 a API real do @nimbus-ds/thumbnail
// (fonte: https://unpkg.com/@nimbus-ds/thumbnail/dist/index.d.ts, campo
// `aspectRatio`, tipo `"1/1" | "16/9" | "9/16" | "4/3" | "3/4" | "2/1" |
// "1/2"`). Convertidas pra número (proporção largura/altura) porque o
// AspectRatio deste projeto (Radix, ver aspect-ratio.tsx) espera a prop
// `ratio` numérica, não a string do Nimbus — mesma proporção, forma
// diferente de expressar.
const thumbnailAspectRatioMap = {
  "1/1": 1 / 1,
  "4/3": 4 / 3,
  "3/4": 3 / 4,
  "16/9": 16 / 9,
  "9/16": 9 / 16,
  "2/1": 2 / 1,
  "1/2": 1 / 2,
} as const

type ThumbnailAspectRatio = keyof typeof thumbnailAspectRatioMap

// Tamanhos via cva — decisão provisória, NÃO existe no Nimbus (o typedef
// real só tem `width?: string`, livre, sem enum). Este catálogo já
// estabeleceu a convenção de escala discreta sm/default/lg pra átomos de
// mídia (ver Avatar, size sm/default/lg) — reaproveitada aqui em vez de
// expor uma prop `width` de string livre, pra manter consistência com o
// resto do catálogo. Ver docs/archive/componentes/thumbnail/spec.md.
const thumbnailVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-md bg-muted",
  {
    variants: {
      size: {
        sm: "w-16",
        default: "w-24",
        lg: "w-40",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface ThumbnailProps
  extends Omit<React.ComponentProps<"img">, "className" | "alt">,
    VariantProps<typeof thumbnailVariants> {
  className?: string
  /** Nome acessível da imagem — obrigatório (mesma exigência do Nimbus,
      campo `alt` obrigatório em `ThumbnailProperties`). Nunca omitir. */
  alt: string
  /** Proporção largura/altura. Default "1/1" (decisão provisória — o
      Nimbus não documenta um default explícito). */
  aspectRatio?: ThumbnailAspectRatio
  /** Conteúdo sobreposto à imagem (ex.: badge de status), mesmo papel do
      `children?: ReactNode` do Nimbus. */
  children?: React.ReactNode
}

function Thumbnail({
  className,
  size,
  aspectRatio = "1/1",
  src,
  alt,
  children,
  onError,
  ...props
}: ThumbnailProps) {
  // Tratamento de erro/fallback no mesmo espírito do
  // AvatarFallback (radix-ui/react-avatar troca pro fallback quando a
  // imagem falha ao carregar) — aqui reimplementado à mão porque
  // Thumbnail usa <img> nativo, não o primitive de Avatar.
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    setHasError(false)
  }, [src])

  const showFallback = hasError || !src

  return (
    <div
      data-slot="thumbnail"
      data-size={size ?? "default"}
      className={cn(thumbnailVariants({ size }), className)}
    >
      <AspectRatioPrimitive.Root
        ratio={thumbnailAspectRatioMap[aspectRatio]}
        className="overflow-hidden rounded-md bg-muted"
      >
        {showFallback ? (
          // Placeholder visual sem ícone — nenhum Material Symbol de
          // "imagem quebrada" está confirmado em uso neste projeto (ver
          // docs/archive/componentes/thumbnail/spec.md), então o fallback é só a cor
          // de fundo do token --muted, sem glifo.
          <div
            data-slot="thumbnail-fallback"
            role="img"
            aria-label={alt}
            className="size-full bg-muted"
          />
        ) : (
          <img
            data-slot="thumbnail-image"
            src={src}
            alt={alt}
            className="size-full object-cover"
            onError={(event) => {
              setHasError(true)
              onError?.(event)
            }}
            {...props}
          />
        )}
        {children}
      </AspectRatioPrimitive.Root>
    </div>
  )
}

// Thumbnail.Skeleton: placeholder de carregamento com o mesmo formato
// (tamanho + proporção) do thumbnail real, pra evitar layout shift —
// equivalente direto ao `ThumbnailSkeleton`/`ThumbnailProps.Skeleton` que
// o Nimbus expõe de verdade (fonte: index.d.ts, `ThumbnailComponents`).
function ThumbnailSkeleton({
  className,
  size,
  aspectRatio = "1/1",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof thumbnailVariants> & {
    aspectRatio?: ThumbnailAspectRatio
  }) {
  return (
    <div
      data-slot="thumbnail-skeleton-wrapper"
      className={cn(thumbnailVariants({ size }), className)}
    >
      <AspectRatioPrimitive.Root
        ratio={thumbnailAspectRatioMap[aspectRatio]}
        className="overflow-hidden rounded-md"
      >
        <Skeleton
          data-slot="thumbnail-skeleton"
          className="size-full rounded-none"
          {...props}
        />
      </AspectRatioPrimitive.Root>
    </div>
  )
}

// Object.assign (em vez de `Thumbnail.Skeleton = ThumbnailSkeleton`) —
// mesmo motivo do Chip.Skeleton em chip.tsx: `function Thumbnail(...)`
// não tem essa propriedade no seu tipo inferido, Object.assign devolve a
// interseção sem precisar de cast/any.
const ThumbnailWithSkeleton = Object.assign(Thumbnail, {
  Skeleton: ThumbnailSkeleton,
})

export { ThumbnailWithSkeleton as Thumbnail, thumbnailVariants }
export type { ThumbnailAspectRatio }
