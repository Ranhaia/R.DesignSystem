import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// O projeto não define um token de --spacing próprio: usa a escala nativa
// do Tailwind v4 (baseada em 0.25rem = 4px por passo), decisão deliberada
// para não duplicar uma escala que já é consistente e documentada pelo
// próprio Tailwind. Esta página serve pra visualizar essa escala aplicada
// ao contexto do DS (padding, gap), não pra introduzir tokens novos.
const spacingScale: { className: string; label: string; px: string }[] = [
  { className: "1", label: "1", px: "4px" },
  { className: "2", label: "2", px: "8px" },
  { className: "3", label: "3", px: "12px" },
  { className: "4", label: "4", px: "16px" },
  { className: "5", label: "5", px: "20px" },
  { className: "6", label: "6", px: "24px" },
  { className: "8", label: "8", px: "32px" },
  { className: "10", label: "10", px: "40px" },
  { className: "12", label: "12", px: "48px" },
  { className: "16", label: "16", px: "64px" },
]

export default function EspacamentoPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Escala de espaçamento</CardTitle>
          <CardDescription>
            O DS não define um token de spacing próprio — usa a escala nativa
            do Tailwind (base 4px por passo: p-1 = 4px, p-2 = 8px, etc.),
            aplicada de forma consistente em padding, gap e margin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {spacingScale.map((s) => (
            <div key={s.className} className="flex items-center gap-4">
              <div className="flex w-24 shrink-0 items-baseline gap-2">
                <span className="font-mono text-sm">{s.label}</span>
                <span className="text-muted-foreground font-mono text-xs">
                  {s.px}
                </span>
              </div>
              <div
                className="bg-primary h-4 rounded-sm"
                style={{ width: s.px }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Padding em contexto</CardTitle>
          <CardDescription>
            Mesmo card com diferentes níveis de padding interno (p-2 a p-8).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tailwind v4 (oxide) não gera classes montadas via template
              string em runtime — cada combinação precisa aparecer literal
              no código para o compilador detectar. Por isso as 4 variantes
              de padding estão escritas por extenso, não interpoladas. */}
          <div className="rounded-lg border p-2">
            <div className="bg-muted rounded-md p-2 text-center">
              <span className="text-muted-foreground font-mono text-xs">p-2</span>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="bg-muted rounded-md p-2 text-center">
              <span className="text-muted-foreground font-mono text-xs">p-4</span>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <div className="bg-muted rounded-md p-2 text-center">
              <span className="text-muted-foreground font-mono text-xs">p-6</span>
            </div>
          </div>
          <div className="rounded-lg border p-8">
            <div className="bg-muted rounded-md p-2 text-center">
              <span className="text-muted-foreground font-mono text-xs">p-8</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gap entre elementos</CardTitle>
          <CardDescription>
            Espaçamento entre itens em um grupo flex, do mais apertado ao mais
            solto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-16 shrink-0 font-mono text-xs">gap-1</span>
            <div className="flex gap-1">
              <div className="bg-primary size-8 rounded-md" />
              <div className="bg-primary size-8 rounded-md" />
              <div className="bg-primary size-8 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-16 shrink-0 font-mono text-xs">gap-2</span>
            <div className="flex gap-2">
              <div className="bg-primary size-8 rounded-md" />
              <div className="bg-primary size-8 rounded-md" />
              <div className="bg-primary size-8 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-16 shrink-0 font-mono text-xs">gap-4</span>
            <div className="flex gap-4">
              <div className="bg-primary size-8 rounded-md" />
              <div className="bg-primary size-8 rounded-md" />
              <div className="bg-primary size-8 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-16 shrink-0 font-mono text-xs">gap-6</span>
            <div className="flex gap-6">
              <div className="bg-primary size-8 rounded-md" />
              <div className="bg-primary size-8 rounded-md" />
              <div className="bg-primary size-8 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
