import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AcessibilidadePage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
          <div>
            <CardTitle>Accessibility</CardTitle>
            <CardDescription>
              Diretrizes WCAG 2.2 AA, anel de foco visível, contraste e auditoria a11y.
            </CardDescription>
          </div>
          <Badge variant="outline">Em construção</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Documentação em construção na História H-paginas-foundations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
