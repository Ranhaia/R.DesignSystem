import * as React from "react"
import type { MaterialSymbol } from "material-symbols"

import { computeOpticalSize } from "@/lib/icon-optical-size"
import { cn } from "@/lib/utils"

interface IconProps extends Omit<React.ComponentProps<"svg">, "name" | "fill"> {
  name: MaterialSymbol
  /** Tamanho em rem. Ausente = herda o auto-tamanho ambiente (ex.: size-4
      dentro de um Button), igual ao comportamento do lucide-react hoje. */
  size?: number
  /** true = Material Symbols Rounded, false = Sharp. Ausente = default do
      preset ativo (ver --icon-font-family em globals.css). */
  rounded?: boolean
  fill?: boolean
  weight?: number
  grade?: number
  opticalSize?: number
}

function Icon({
  name,
  size,
  rounded,
  fill,
  weight,
  grade,
  opticalSize,
  className,
  style,
  ...props
}: IconProps) {
  const resolvedOpticalSize =
    opticalSize ?? (size !== undefined ? computeOpticalSize(size) : undefined)

  return (
    <svg
      viewBox="0 0 24 24"
      data-slot="icon"
      aria-hidden="true"
      className={cn("shrink-0 select-none", className)}
      style={
        {
          ...(size !== undefined
            ? { width: `${size}rem`, height: `${size}rem` }
            : {}),
          ...(rounded !== undefined
            ? {
                "--icon-font-family": rounded
                  ? "var(--font-material-rounded)"
                  : "var(--font-material-sharp)",
              }
            : {}),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={24}
        fill="currentColor"
        style={{
          fontFamily: "var(--icon-font-family)",
          fontFeatureSettings: "'liga'",
          textRendering: "optimizeLegibility",
          fontVariationSettings: `'FILL' ${
            fill !== undefined ? (fill ? 1 : 0) : "var(--icon-fill)"
          }, 'wght' ${weight ?? "var(--icon-weight)"}, 'GRAD' ${
            grade ?? "var(--icon-grade)"
          }, 'opsz' ${resolvedOpticalSize ?? "var(--icon-optical-size)"}`,
        }}
      >
        {name}
      </text>
    </svg>
  )
}

export { Icon }
export type { IconProps }
