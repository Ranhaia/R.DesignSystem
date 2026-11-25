"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const progressVariants = cva("relative overflow-hidden", {
  variants: {
    shape: {
      bar: "h-2 w-full rounded-full bg-primary/20",
      // Anel: o trilho e o arco são o SVG; a raiz só dá o tamanho.
      circle: "size-10 shrink-0 rounded-full",
    },
  },
  defaultVariants: { shape: "bar" },
})

function Progress({
  className,
  value,
  max = 100,
  shape = "bar",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants>) {
  // Porcentagem visual presa a 0–100 e relativa ao max, igual ao que o Radix anuncia.
  const pct = Math.min(100, Math.max(0, ((value || 0) / (max || 100)) * 100))
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-shape={shape}
      className={cn(progressVariants({ shape }), className)}
      value={value}
      max={max}
      {...props}
    >
      {shape === "circle" ? (
        // pathLength=100: o traço visível é a própria porcentagem.
        <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r="16" fill="none" strokeWidth="4" className="stroke-primary/20 forced-colors:stroke-[GrayText]" />
          <ProgressPrimitive.Indicator asChild>
            <circle
              data-slot="progress-indicator"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              strokeWidth="4"
              strokeLinecap={pct > 0 ? "round" : "butt"}
              pathLength={100}
              strokeDasharray="100"
              strokeDashoffset={100 - pct}
              className="stroke-primary motion-safe:transition-all forced-colors:stroke-[CanvasText]"
            />
          </ProgressPrimitive.Indicator>
        </svg>
      ) : (
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full w-full flex-1 bg-primary motion-safe:transition-all"
          style={{ transform: `translateX(-${100 - pct}%)` }}
        />
      )}
    </ProgressPrimitive.Root>
  )
}

export { Progress, progressVariants }
