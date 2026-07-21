"use client"

import * as React from "react"

import { stylesList } from "@/lib/styles-registry"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const colorTokens: { token: string; label: string }[] = [
  { token: "--background", label: "background" },
  { token: "--foreground", label: "foreground" },
  { token: "--card", label: "card" },
  { token: "--popover", label: "popover" },
  { token: "--primary", label: "primary" },
  { token: "--primary-foreground", label: "primary-foreground" },
  { token: "--secondary", label: "secondary" },
  { token: "--secondary-foreground", label: "secondary-foreground" },
  { token: "--muted", label: "muted" },
  { token: "--muted-foreground", label: "muted-foreground" },
  { token: "--accent", label: "accent" },
  { token: "--destructive", label: "destructive" },
  { token: "--border", label: "border" },
  { token: "--ring", label: "ring" },
]

const chartTokens = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"]

const sidebarTokens: { token: string; label: string }[] = [
  { token: "--sidebar", label: "sidebar" },
  { token: "--sidebar-primary", label: "sidebar-primary" },
  { token: "--sidebar-accent", label: "sidebar-accent" },
  { token: "--sidebar-border", label: "sidebar-border" },
]

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

function Swatch({ token, label }: { token: string; label: string }) {
  return (
    <div className="space-y-1.5">
      <div
        className="h-14 w-full rounded-md border"
        style={{ background: `var(${token})` }}
      />
      <div className="text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground font-mono">{token}</p>
      </div>
    </div>
  )
}

export default function StyleGuidePage() {
  const [activeStyle, setActiveStyle] = React.useState("default")
  const fontValues = useComputedTokens(["--font-sans", "--font-heading"])

  React.useEffect(() => {
    function read() {
      setActiveStyle(document.documentElement.dataset.style ?? "default")
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-style"],
    })
    return () => observer.disconnect()
  }, [])

  const activeEntry = stylesList.find((s) => s.value === activeStyle)
  const sansFont = fontValues["--font-sans"]?.split(",")[0]?.trim()
  const headingFont = fontValues["--font-heading"]?.split(",")[0]?.trim()

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Folha de estilo
          </h1>
          <Badge>{activeEntry?.label ?? activeStyle}</Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Valores reais dos tokens para o estilo ativo agora. Troque o estilo
          no seletor da barra lateral para ver esta página mudar.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fontes</CardTitle>
          <CardDescription>
            --font-sans (corpo/UI) e --font-heading (títulos), lidas ao vivo
            do <code className="bg-muted rounded px-1 py-0.5 text-xs">{"<html>"}</code>.
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
          <CardDescription>Headings usam --font-heading, o resto usa --font-sans.</CardDescription>
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
          <CardTitle>Cores</CardTitle>
          <CardDescription>Papéis semânticos do estilo ativo.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colorTokens.map((c) => (
            <Swatch key={c.token} token={c.token} label={c.label} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gráficos</CardTitle>
          <CardDescription>Paleta usada pelo componente chart.tsx (recharts).</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {chartTokens.map((token, i) => (
            <Swatch key={token} token={token} label={`chart-${i + 1}`} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>
          <CardDescription>Tokens dedicados à barra lateral (podem divergir do resto do app).</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {sidebarTokens.map((c) => (
            <Swatch key={c.token} token={c.token} label={c.label} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
