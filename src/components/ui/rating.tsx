"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Icon } from "@/components/ui/icon"
import { useIdioma, useTexto } from "@/lib/idioma"
import { cn } from "@/lib/utils"

const ratingStarVariants = cva("relative shrink-0", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: { size: "default" },
})

type Preenchimento = "cheia" | "meia" | "vazia"

function preencher(nota: number, estrela: number): Preenchimento {
  if (nota >= estrela) return "cheia"
  if (nota >= estrela - 0.5) return "meia"
  return "vazia"
}

// shortcut: a meia estrela não espelha em RTL; espelhar quando houver tela RTL com nota.
function Estrela({ preenchimento }: { preenchimento: Preenchimento }) {
  return (
    <Icon
      data-preenchimento={preenchimento}
      name={preenchimento === "meia" ? "star_half" : "star"}
      fill={preenchimento !== "vazia"}
      className={cn(
        "pointer-events-none absolute inset-0 size-full",
        preenchimento === "vazia" ? "text-muted-foreground" : "text-warning-600"
      )}
    />
  )
}

type RatingProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> &
  VariantProps<typeof ratingStarVariants> & {
    /** Nota atual (controlado). */
    value?: number
    defaultValue?: number
    onValueChange?: (valor: number) => void
    /** Total de estrelas. */
    max?: number
    /** Permite (e mostra) meia estrela. */
    allowHalf?: boolean
    /** Só mostra a nota (média), sem escolher. */
    readOnly?: boolean
    disabled?: boolean
    required?: boolean
    /** Nome do campo no formulário. */
    name?: string
  }

function Rating({
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  allowHalf = false,
  readOnly = false,
  disabled,
  required,
  name,
  size,
  className,
  onMouseLeave,
  ...props
}: RatingProps) {
  const t = useTexto()
  const idioma = useIdioma()
  const nomeGerado = React.useId()
  const [interno, setInterno] = React.useState(defaultValue)
  const [hover, setHover] = React.useState<number | null>(null)
  const atual = value ?? interno
  const estrelas = Array.from({ length: max }, (_, i) => i + 1)
  const rotulo = (n: number) => t("rating.valor", { n: n.toLocaleString(idioma), max })

  if (readOnly) {
    return (
      <div
        data-slot="rating"
        role="img"
        {...props}
        // o assunto (aria-label de quem usa) vem antes da nota
        aria-label={props["aria-label"] ? `${props["aria-label"]}: ${rotulo(atual)}` : rotulo(atual)}
        className={cn("inline-flex items-center gap-0.5", className)}
      >
        {estrelas.map((i) => (
          <span key={i} className={ratingStarVariants({ size })}>
            <Estrela preenchimento={preencher(atual, i)} />
          </span>
        ))}
      </div>
    )
  }

  function escolher(v: number) {
    // escolha pelo teclado não pode ficar escondida atrás da prévia do mouse
    setHover(null)
    if (value === undefined) setInterno(v)
    onValueChange?.(v)
  }

  const mostrada = hover ?? atual

  return (
    <div
      data-slot="rating"
      role="radiogroup"
      aria-disabled={disabled || undefined}
      className={cn("inline-flex items-center gap-0.5", disabled && "opacity-50", className)}
      {...props}
      onMouseLeave={(e) => {
        setHover(null)
        onMouseLeave?.(e)
      }}
    >
      {estrelas.map((i) => (
        <span
          key={i}
          data-slot="rating-star"
          className={cn(
            ratingStarVariants({ size }),
            "rounded-sm has-focus-visible:ring-[3px] has-focus-visible:ring-ring"
          )}
        >
          <Estrela preenchimento={preencher(mostrada, i)} />
          {(allowHalf ? [i - 0.5, i] : [i]).map((v) => (
            <label
              key={v}
              onMouseEnter={() => !disabled && setHover(v)}
              className={cn(
                "absolute inset-y-0",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                !allowHalf ? "inset-x-0" : v % 1 ? "start-0 w-1/2" : "end-0 w-1/2"
              )}
            >
              <input
                type="radio"
                className="sr-only"
                // sem name, o navegador não agrupa as setas; o nome gerado também vai no envio do form
                name={name ?? nomeGerado}
                value={v}
                checked={atual === v}
                onChange={() => escolher(v)}
                disabled={disabled}
                required={required}
                aria-label={rotulo(v)}
              />
            </label>
          ))}
        </span>
      ))}
    </div>
  )
}

export { Rating, ratingStarVariants }
