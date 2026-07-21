"use client"

import * as React from "react"

/**
 * Lê os tokens do Design System (globals.css) direto do <html> e devolve
 * valores prontos para alimentar o background do Hero (Aurora/React Bits).
 *
 * Mesmo padrão de useComputedTokens() já usado em /estilo (getComputedStyle +
 * MutationObserver no data-style/class) — assim o Hero muda cor e
 * velocidade sozinho sempre que o preset ativo muda no StyleSwitcher, sem
 * nenhum controle novo na tela.
 *
 * --chart-1/2/3 e --hero-speed/--hero-amplitude são strings CSS puras
 * (custom properties não resolvem cor sozinhas), por isso as cores em OKLCH
 * são convertidas pra hex via resolveOklchToHex antes de virar prop do Aurora.
 */

export interface HeroTokens {
  colorStops: [string, string, string]
  speed: number
  amplitude: number
}

const FALLBACK: HeroTokens = {
  colorStops: ["#5227FF", "#7cff67", "#5227FF"],
  speed: 0.6,
  amplitude: 1,
}

function resolveColorToHex(rawValue: string): string | null {
  if (!rawValue) return null
  if (typeof document === "undefined") return null

  const probe = document.createElement("span")
  probe.style.color = rawValue
  probe.style.display = "none"
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  document.body.removeChild(probe)

  const match = resolved.match(/rgba?\(([^)]+)\)/)
  if (!match) return null
  const parts = match[1].split(",").map((n) => parseFloat(n.trim()))
  const [r, g, b] = parts
  if ([r, g, b].some((n) => Number.isNaN(n))) return null

  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0")

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function readHeroTokens(): HeroTokens {
  if (typeof window === "undefined") return FALLBACK

  const styles = getComputedStyle(document.documentElement)
  const raw = (token: string) => styles.getPropertyValue(token).trim()

  const c1 = resolveColorToHex(raw("--chart-1"))
  const c2 = resolveColorToHex(raw("--chart-2"))
  const c3 = resolveColorToHex(raw("--chart-3"))

  const speed = parseFloat(raw("--hero-speed")) || FALLBACK.speed
  const amplitude = parseFloat(raw("--hero-amplitude")) || FALLBACK.amplitude

  return {
    colorStops: [c1 ?? FALLBACK.colorStops[0], c2 ?? FALLBACK.colorStops[1], c3 ?? FALLBACK.colorStops[2]],
    speed,
    amplitude,
  }
}

export function useHeroTokens(): HeroTokens {
  const [tokens, setTokens] = React.useState<HeroTokens>(FALLBACK)

  React.useEffect(() => {
    setTokens(readHeroTokens())

    const observer = new MutationObserver(() => setTokens(readHeroTokens()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-style", "class"],
    })
    return () => observer.disconnect()
  }, [])

  return tokens
}
