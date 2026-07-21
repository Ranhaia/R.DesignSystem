import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner />
        Sincronizando
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Atualizando
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Processando
      </Badge>
    </div>
  )
}
