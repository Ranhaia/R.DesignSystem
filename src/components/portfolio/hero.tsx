"use client"

import Aurora from "@/components/backgrounds/aurora"
import { useHeroTokens } from "@/hooks/use-hero-tokens"
import { Button } from "@/components/ui/button"

// Palco do Hero: fundo escuro fixo (não segue o toggle claro/escuro do app),
// igual a como "midnight" já força escuro independente do tema — decisão
// deliberada pra dar contraste ao efeito Aurora. Cor e velocidade do Aurora
// SIM cascateiam dos tokens (--chart-1/2/3, --hero-speed, --hero-amplitude),
// então trocar o preset no StyleSwitcher muda o Hero automaticamente.
export function Hero() {
  const { colorStops, speed, amplitude } = useHeroTokens()

  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-neutral-950 text-neutral-50">
      <div className="absolute inset-0">
        <Aurora colorStops={colorStops} speed={speed} amplitude={amplitude} blend={0.5} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300">
          [a preencher]
        </span>

        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
          [a preencher]
        </h1>

        <p className="max-w-xl text-balance text-neutral-300 sm:text-lg">
          [a preencher]
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button size="lg">Ver projetos</Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            Falar comigo
          </Button>
        </div>
      </div>
    </section>
  )
}
