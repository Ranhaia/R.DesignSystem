import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const shadowScale: { token: string; label: string; usage: string }[] = [
  { token: "--shadow-2xs", label: "2xs", usage: "Bordas sutis, separação mínima (ex: input em foco)." },
  { token: "--shadow-xs", label: "xs", usage: "Elementos levemente elevados, como badges ou chips." },
  { token: "--shadow-sm", label: "sm", usage: "Cards em repouso, itens de lista destacados." },
  { token: "--shadow-md", label: "md", usage: "Cards em hover, popovers, dropdowns." },
  { token: "--shadow-lg", label: "lg", usage: "Dialogs, sheets, modais — camada de foco." },
  { token: "--shadow-xl", label: "xl", usage: "Elementos flutuantes de maior destaque (raramente usado)." },
]

export default function ElevacaoPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Escala de elevação</CardTitle>
          <CardDescription>
            6 níveis de shadow (--shadow-2xs a --shadow-xl), variam por preset
            de estilo — alguns presets usam sombra colorida ou offset sólido
            em vez de blur tradicional.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shadowScale.map((s) => (
            <div key={s.token} className="flex flex-col items-center gap-3">
              <div
                className="bg-card flex h-24 w-full items-center justify-center rounded-lg"
                style={{ boxShadow: `var(${s.token})` }}
              >
                <span className="text-muted-foreground font-mono text-xs">
                  {s.token}
                </span>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-muted-foreground text-xs">{s.usage}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progressão</CardTitle>
          <CardDescription>
            Comparação lado a lado dos 6 níveis, do mais sutil ao mais
            destacado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-6 py-4">
            {shadowScale.map((s) => (
              <div
                key={s.token}
                className="bg-card flex size-16 items-center justify-center rounded-md"
                style={{ boxShadow: `var(${s.token})` }}
              >
                <span className="text-muted-foreground font-mono text-[10px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
