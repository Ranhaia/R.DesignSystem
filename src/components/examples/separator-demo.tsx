import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          Uma biblioteca de componentes de UI de código aberto.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Documentação</div>
        <Separator orientation="vertical" />
        <div>Código-fonte</div>
      </div>
    </div>
  )
}
