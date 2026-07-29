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

// Escala base (sm/md/lg/xl), derivada de --radius por preset — os
// componentes existentes usam essas classes, então continuam intactas.
const baseRadius = [
  { className: "rounded-sm", label: "sm", token: "--radius-sm" },
  { className: "rounded-md", label: "md", token: "--radius-md" },
  { className: "rounded-lg", label: "lg", token: "--radius-lg" },
  { className: "rounded-xl", label: "xl", token: "--radius-xl" },
]

// Escala "Shape" nomeada como na Nimbus — passos adicionais múltiplos de
// --radius, pra escolher raio por componente individualmente.
const shapeRadius = [
  { className: "rounded-[var(--radius-0-5)]", label: "0.5", token: "--radius-0-5" },
  { className: "rounded-[var(--radius-1)]", label: "1", token: "--radius-1" },
  { className: "rounded-[var(--radius-2)]", label: "2", token: "--radius-2" },
  { className: "rounded-[var(--radius-3)]", label: "3", token: "--radius-3" },
  { className: "rounded-[var(--radius-4)]", label: "4", token: "--radius-4" },
  { className: "rounded-[var(--radius-5)]", label: "5", token: "--radius-5" },
  { className: "rounded-[var(--radius-6)]", label: "6", token: "--radius-6" },
]

const specialRadius = [
  { className: "rounded-[var(--radius-half)]", label: "half (50%)", token: "--radius-half" },
  { className: "rounded-[var(--radius-full)]", label: "full (pill)", token: "--radius-full" },
]

export default function BordasPage() {
  const allTokens = [
    ...baseRadius.map((r) => r.token),
    ...shapeRadius.map((r) => r.token),
    ...specialRadius.map((r) => r.token),
    "--border-width",
  ]
  const values = useComputedTokens(allTokens)

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Raio — escala base</CardTitle>
          <CardDescription>
            sm/md/lg/xl, derivados de --radius por preset. Usados pelos 59
            componentes do catálogo desde antes da escala Shape existir.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {baseRadius.map((r) => (
            <div key={r.token} className="space-y-1.5">
              <div className={`bg-muted h-20 w-full border ${r.className}`} />
              <div className="text-xs">
                <p className="font-medium">{r.label}</p>
                <p className="text-muted-foreground font-mono">
                  {values[r.token] || r.token}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raio — escala Shape</CardTitle>
          <CardDescription>
            Passos nomeados 0.5 a 6 (múltiplos de --radius), nomenclatura
            equivalente à Nimbus Design System — mas aditiva: escala
            junto com o preset, em vez de valores absolutos fixos.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {shapeRadius.map((r) => (
            <div key={r.token} className="space-y-1.5">
              <div
                className="bg-muted h-16 w-full border"
                style={{ borderRadius: `var(${r.token})` }}
              />
              <div className="text-xs">
                <p className="font-medium">{r.label}</p>
                <p className="text-muted-foreground truncate font-mono">
                  {values[r.token] || r.token}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raio — casos especiais</CardTitle>
          <CardDescription>
            half (círculo perfeito em elementos quadrados) e full (pill,
            usado em Badge/Button arredondado).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {specialRadius.map((r) => (
            <div key={r.token} className="space-y-1.5">
              <div
                className="bg-muted mx-auto h-16 w-16 border"
                style={{ borderRadius: `var(${r.token})` }}
              />
              <div className="text-center text-xs">
                <p className="font-medium">{r.label}</p>
                <p className="text-muted-foreground font-mono">
                  {values[r.token] || r.token}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Espessura de borda</CardTitle>
          <CardDescription>
            --border-width controla a espessura de todo elemento com a
            classe "border" no projeto (via --default-border-width do
            Tailwind v4). Padrão 1px; alguns presets (ex: brutalist) usam
            2px pra reforçar a identidade visual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div
              className="bg-card flex h-20 w-40 items-center justify-center rounded-lg border"
              style={{ borderWidth: `var(--border-width)` }}
            >
              <span className="text-muted-foreground font-mono text-xs">
                border
              </span>
            </div>
            <div className="text-xs">
              <p className="font-medium">--border-width (estilo ativo)</p>
              <p className="text-muted-foreground font-mono">
                {values["--border-width"] || "--border-width"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
