"use client"

import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

function Swatch({
  token,
  label,
  values,
}: {
  token: string
  label: string
  values: Record<string, string>
}) {
  return (
    <div className="space-y-1.5">
      <div
        className="h-14 w-full rounded-md border"
        style={{ background: `var(${token})` }}
      />
      <div className="text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground font-mono">
          {values[token] || token}
        </p>
      </div>
    </div>
  )
}

const semanticTokens: { token: string; label: string }[] = [
  { token: "--background", label: "background" },
  { token: "--foreground", label: "foreground" },
  { token: "--card", label: "card" },
  { token: "--card-foreground", label: "card-foreground" },
  { token: "--popover", label: "popover" },
  { token: "--popover-foreground", label: "popover-foreground" },
  { token: "--primary", label: "primary" },
  { token: "--primary-foreground", label: "primary-foreground" },
  { token: "--secondary", label: "secondary" },
  { token: "--secondary-foreground", label: "secondary-foreground" },
  { token: "--muted", label: "muted" },
  { token: "--muted-foreground", label: "muted-foreground" },
  { token: "--accent", label: "accent" },
  { token: "--accent-foreground", label: "accent-foreground" },
  { token: "--destructive", label: "destructive" },
  { token: "--destructive-foreground", label: "destructive-foreground" },
  { token: "--border", label: "border" },
  { token: "--input", label: "input" },
  { token: "--ring", label: "ring" },
]

const sidebarTokens: { token: string; label: string }[] = [
  { token: "--sidebar", label: "sidebar" },
  { token: "--sidebar-foreground", label: "sidebar-foreground" },
  { token: "--sidebar-primary", label: "sidebar-primary" },
  { token: "--sidebar-primary-foreground", label: "sidebar-primary-foreground" },
  { token: "--sidebar-accent", label: "sidebar-accent" },
  { token: "--sidebar-accent-foreground", label: "sidebar-accent-foreground" },
  { token: "--sidebar-border", label: "sidebar-border" },
  { token: "--sidebar-ring", label: "sidebar-ring" },
]

const aiTokens: { token: string; label: string }[] = [
  { token: "--ai-surface", label: "ai-surface" },
  { token: "--ai-surface-highlight", label: "ai-surface-highlight" },
  { token: "--ai-interactive", label: "ai-interactive" },
  { token: "--ai-interactive-hover", label: "ai-interactive-hover" },
  { token: "--ai-interactive-pressed", label: "ai-interactive-pressed" },
  { token: "--ai-text-low", label: "ai-text-low" },
  { token: "--ai-text-high", label: "ai-text-high" },
]

const chartTokens = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"]

const statusScales: { name: string; label: string }[] = [
  { name: "info", label: "Info" },
  { name: "success", label: "Sucesso" },
  { name: "warning", label: "Alerta" },
  { name: "danger", label: "Perigo" },
]

const statusSteps = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const categoricalCount = 10
const categoricalVariants: { key: string; label: string }[] = [
  { key: "light", label: "claro" },
  { key: "", label: "médio" },
  { key: "dark", label: "escuro" },
]

export default function CoresPage() {
  const semanticValues = useComputedTokens(semanticTokens.map((c) => c.token))
  const sidebarValues = useComputedTokens(sidebarTokens.map((c) => c.token))
  const aiValues = useComputedTokens(aiTokens.map((c) => c.token))
  const chartValues = useComputedTokens(chartTokens)

  const statusTokenList = statusScales.flatMap((s) =>
    statusSteps.map((step) => `--color-${s.name}-${step}`)
  )
  const statusValues = useComputedTokens(statusTokenList)

  const categoricalTokenList = Array.from({ length: categoricalCount }, (_, i) =>
    categoricalVariants.map((v) =>
      v.key ? `--color-categorical-${i + 1}-${v.key}` : `--color-categorical-${i + 1}`
    )
  ).flat()
  const categoricalValues = useComputedTokens(categoricalTokenList)

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Papéis semânticos</CardTitle>
          <CardDescription>
            Tokens nomeados pelo papel na interface (não pela cor em si) —
            trocam de valor conforme o estilo/tema ativo.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {semanticTokens.map((c) => (
            <Swatch key={c.token} token={c.token} label={c.label} values={semanticValues} />
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
            <Swatch key={c.token} token={c.token} label={c.label} values={sidebarValues} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inteligência artificial</CardTitle>
          <CardDescription>
            Tokens dedicados a superfícies e interações relacionadas a IA
            (ex: variantes ai-primary/ai-secondary do Button).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {aiTokens.map((c) => (
            <Swatch key={c.token} token={c.token} label={c.label} values={aiValues} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gráficos</CardTitle>
          <CardDescription>Paleta usada pelo componente chart.tsx (recharts), varia por preset.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {chartTokens.map((token, i) => (
            <Swatch key={token} token={token} label={`chart-${i + 1}`} values={chartValues} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escalas de status</CardTitle>
          <CardDescription>
            Info, sucesso, alerta e perigo — 10 passos cada (100 = mais claro,
            1000 = mais escuro), globais e independentes de preset.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {statusScales.map((scale) => (
            <div key={scale.name} className="space-y-2">
              <p className="text-sm font-medium">{scale.label}</p>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {statusSteps.map((step) => {
                  const token = `--color-${scale.name}-${step}`
                  return (
                    <div key={token} className="space-y-1">
                      <div
                        className="h-10 w-full rounded-md border"
                        style={{ background: `var(${token})` }}
                      />
                      <p className="text-muted-foreground text-center font-mono text-[10px]">
                        {step}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paleta categórica</CardTitle>
          <CardDescription>
            10 hues distribuídos uniformemente na roda de cor (36° entre cada,
            técnica de paleta categórica tipo d3.schemeCategory10) × 3
            luminosidades — para tabelas e gráficos que não devem variar por
            marca.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: categoricalCount }, (_, i) => {
            const index = i + 1
            return (
              <div key={index} className="grid grid-cols-3 gap-2">
                {categoricalVariants.map((v) => {
                  const token = v.key
                    ? `--color-categorical-${index}-${v.key}`
                    : `--color-categorical-${index}`
                  return (
                    <div key={token} className="space-y-1">
                      <div
                        className="h-10 w-full rounded-md border"
                        style={{ background: `var(${token})` }}
                      />
                      <p className="text-muted-foreground truncate font-mono text-[10px]">
                        {categoricalValues[token] || `categorical-${index}-${v.label}`}
                      </p>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
