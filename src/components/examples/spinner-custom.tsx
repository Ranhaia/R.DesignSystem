import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// Omit<"name" | "fill">: SVGAttributes nativo tem `name?: string` e
// `fill?: string` (atributo SVG de preenchimento) que colidiriam com o
// `name: MaterialSymbol` e o `fill?: boolean` (eixo FILL) do Icon ao
// espalhar {...props} — mesmo desvio documentado em ui/spinner.tsx.
function Spinner({
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "name" | "fill">) {
  return (
    <Icon
      name="progress_activity"
      role="status"
      aria-label="Carregando"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export default function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  )
}
