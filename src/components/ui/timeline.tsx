import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { List, ListItem } from "@/components/ui/list"
import { textVariants } from "@/components/ui/text"
import { cn } from "@/lib/utils"

// Linha do tempo: o `list` como <ol>, um evento por item, do mais antigo ao
// mais novo (ou o contrário: a ordem é a dos filhos).
function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <List
      as="ol"
      data-slot="timeline"
      // Safari tira a semântica de lista de <ol> com display flex
      role="list"
      className={cn("gap-0", className)}
      {...props}
    />
  )
}

// Coluna do marcador (size-6) + conteúdo. A linha que liga os marcadores é o
// ::before do item, centrado na coluna do marcador; o último não tem linha.
function TimelineItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <ListItem
      data-slot="timeline-item"
      className={cn(
        "relative grid grid-cols-[auto_1fr] gap-x-3 pb-6 last:pb-0",
        "before:absolute before:top-7 before:bottom-1 before:left-3 before:w-px before:-translate-x-1/2 before:bg-border last:before:hidden",
        className
      )}
      {...props}
    />
  )
}

const timelineMarkerVariants = cva(
  "flex size-6 shrink-0 items-center justify-center rounded-full [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: { tone: "default" },
  }
)

// Sem filho, mostra um ponto; com filho (ícone), o ícone no círculo.
function TimelineMarker({
  className,
  tone,
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof timelineMarkerVariants>) {
  return (
    <span
      data-slot="timeline-marker"
      data-tone={tone ?? "default"}
      aria-hidden="true"
      className={cn(timelineMarkerVariants({ tone }), className)}
      {...props}
    >
      {children ?? <span className="size-2 rounded-full bg-current" />}
    </span>
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("col-start-2 flex min-w-0 flex-col gap-1 pt-0.5", className)}
      {...props}
    />
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-title"
      className={cn(textVariants({ weight: "medium" }), className)}
      {...props}
    />
  )
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn(textVariants({ size: "caption", muted: true }), className)}
      {...props}
    />
  )
}

function TimelineDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-description"
      className={cn(textVariants({ muted: true }), className)}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineContent,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
  timelineMarkerVariants,
}
