"use client"

import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const typeScale: { label: string; className: string; sizeHint: string }[] = [
  { label: "H1", className: "text-4xl font-bold", sizeHint: "text-4xl / bold" },
  { label: "H2", className: "text-3xl font-semibold", sizeHint: "text-3xl / semibold" },
  { label: "H3", className: "text-2xl font-semibold", sizeHint: "text-2xl / semibold" },
  { label: "H4", className: "text-xl font-medium", sizeHint: "text-xl / medium" },
  { label: "H5", className: "text-lg font-medium", sizeHint: "text-lg / medium" },
  { label: "H6", className: "text-base font-medium", sizeHint: "text-base / medium" },
]

const bodyScale: { label: string; className: string; sizeHint: string }[] = [
  { label: "Corpo", className: "text-base", sizeHint: "text-base / regular" },
  { label: "Legenda", className: "text-sm text-muted-foreground", sizeHint: "text-sm / regular" },
  { label: "Auxiliar", className: "text-xs text-muted-foreground", sizeHint: "text-xs / regular" },
]

const weightScale: { label: string; className: string }[] = [
  { label: "Regular", className: "font-normal" },
  { label: "Medium", className: "font-medium" },
  { label: "Semibold", className: "font-semibold" },
  { label: "Bold", className: "font-bold" },
]

function useComputedTokens(tokens: string[]) {
  const [values, setValues] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    function read() {
      const styles = getComputedStyle(document.documentElement)
      const next: Record<string, string> = {}
      for (const t of tokens) {
        next[t] = styles.getPropertyValue(t).trim()
      }
      setValues(next)
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-style", "class"],
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens.join(",")])

  return values
}

export default function TipografiaPage() {
  const fontValues = useComputedTokens(["--font-sans", "--font-heading"])
  const sansFont = fontValues["--font-sans"]?.split(",")[0]?.trim()
  const headingFont = fontValues["--font-heading"]?.split(",")[0]?.trim()

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Famílias</CardTitle>
          <CardDescription>
            <code className="bg-muted rounded px-1 py-0.5 text-xs">--font-sans</code>{" "}
            para corpo/UI e{" "}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">--font-heading</code>{" "}
            para títulos, lidas ao vivo do estilo ativo.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 rounded-lg border p-4">
            <p className="text-muted-foreground text-xs">--font-sans</p>
            <p className="font-sans text-lg">{sansFont || "carregando…"}</p>
            <p className="font-sans text-sm">Aa Bb Cc — texto de corpo</p>
          </div>
          <div className="space-y-1 rounded-lg border p-4">
            <p className="text-muted-foreground text-xs">--font-heading</p>
            <p className="font-heading text-lg">{headingFont || "carregando…"}</p>
            <p className="font-heading text-sm">Aa Bb Cc — título</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escala tipográfica</CardTitle>
          <CardDescription>
            Headings usam --font-heading, o resto usa --font-sans. Escala em
            classes utilitárias do Tailwind (text-xs a text-4xl).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {typeScale.map((t) => (
            <div
              key={t.label}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3 last:border-0"
            >
              <span className={`font-heading ${t.className}`}>
                {t.label} — Título de exemplo
              </span>
              <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {t.sizeHint}
              </span>
            </div>
          ))}
          <Separator />
          {bodyScale.map((t) => (
            <div
              key={t.label}
              className="flex flex-wrap items-baseline justify-between gap-2"
            >
              <span className={`font-sans ${t.className}`}>
                {t.label} — Texto corrido de exemplo para leitura.
              </span>
              <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {t.sizeHint}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pesos</CardTitle>
          <CardDescription>
            Variações de peso disponíveis na família --font-sans.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {weightScale.map((w) => (
            <div
              key={w.label}
              className="flex items-center justify-between gap-2 rounded-lg border p-3"
            >
              <span className={`font-sans text-base ${w.className}`}>
                {w.label} — Aa Bb Cc
              </span>
              <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {w.className}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
