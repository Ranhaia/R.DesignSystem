import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner />
        Carregando...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Aguarde
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processando
      </Button>
    </div>
  )
}
