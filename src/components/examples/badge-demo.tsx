import { Icon } from "@/components/ui/icon"

import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge>Padrão</Badge>
        <Badge variant="secondary">Secundário</Badge>
        <Badge variant="destructive">Destrutivo</Badge>
        <Badge variant="outline">Contorno</Badge>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <Icon name="verified" />
          Verificado
        </Badge>
        <Badge className="h-6 min-w-6 rounded-full px-1 font-mono tabular-nums">
          8
        </Badge>
        <Badge
          className="h-6 min-w-6 rounded-full px-1 font-mono tabular-nums"
          variant="destructive"
        >
          99
        </Badge>
        <Badge
          className="h-6 min-w-6 rounded-full px-1 font-mono tabular-nums"
          variant="outline"
        >
          20+
        </Badge>
      </div>
    </div>
  )
}
