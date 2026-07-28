import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// Omit<"name" | "fill">: SVGAttributes nativo tem `name?: string` e
// `fill?: string` (atributo SVG de preenchimento) que colidiriam com o
// `name: MaterialSymbol` e o `fill?: boolean` (eixo FILL) do Icon ao
// espalhar {...props} — a Spinner já fixa o ícone internamente, não faz
// sentido um consumidor sobrescrever via essas props mesmo.
function Spinner({
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "name" | "fill">) {
  // Desvio pontual: NÃO usar a prop `size` do Icon aqui. Vários consumidores
  // (ver src/components/examples/spinner-size.tsx, spinner-color.tsx)
  // sobrescrevem o tamanho passando className="size-N" — como `size` do
  // Icon aplica width/height via style inline (sempre vence sobre classe),
  // isso quebraria esses overrides. Mantendo size-4 como classe Tailwind
  // (igual ao comportamento antigo do Loader2Icon), o dimensionamento
  // continua 100% controlável via className.
  return (
    <Icon
      name="progress_activity"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
