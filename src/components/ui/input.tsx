import * as React from "react"
import type { MaterialSymbol } from "material-symbols"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Icon } from "@/components/ui/icon"

// 2026-08-03: `endIcon`/`endAction` formalizam no Atom o padrão "ícone no
// final do campo" (ver decisão em docs/active/decisoes/input-icone-final.md,
// referência Nimbus: nimbus.nuvemshop.com.br/documentation/atomic-components/input#example-icon-end).
// Dois modos, nunca os dois ao mesmo tempo:
// - endIcon: só ilustrativo (ex.: lupa de busca) — sem interação, aria-hidden.
// - endAction: interativo (ex.: mostrar/ocultar senha) — o botão ocupa a
//   MESMA altura do input inteiro (size-9/36px), não só o glifo. A área de
//   clique é o box inteiro, não um alvo pequeno dentro dele.
// Ícone sempre 24px (size={1.5}) nos dois modos — não é config por
// instância, é o tamanho fixo do padrão.
type EndIconProps =
  | { endIcon?: MaterialSymbol; endAction?: never }
  | {
      endIcon?: never
      endAction?: {
        icon: MaterialSymbol
        onClick: () => void
        "aria-label": string
      }
    }

function Input({
  className,
  type,
  id,
  label,
  animatedLabel = false,
  placeholder,
  endIcon,
  endAction,
  disabled,
  ...props
}: React.ComponentProps<"input"> &
  EndIconProps & {
    label?: React.ReactNode
    animatedLabel?: boolean
  }) {
  const generatedId = React.useId()
  const inputId = label ? (id ?? generatedId) : id
  const hasEndElement = !!endIcon || !!endAction

  const inputEl = (
    <input
      type={type}
      id={inputId}
      data-slot="input"
      placeholder={label && animatedLabel ? " " : placeholder}
      disabled={disabled}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        label && animatedLabel && "peer",
        hasEndElement && "pr-9",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )

  // Box fixo 36×36 (size-9), mesma altura do input (h-9), ancorado com
  // top-0 (não top-1/2 + translate): isso funciona igual com ou sem
  // animatedLabel, porque não depende da altura do WRAPPER (que ganha
  // mt-5 no modo animado) — só da altura do próprio input, que é sempre
  // h-9. rounded-r-md (não rounded-md): a única borda que precisa
  // arredondar é a que coincide com o canto real do input.
  const endEl = endIcon ? (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 flex size-9 items-center justify-center text-muted-foreground"
    >
      <Icon name={endIcon} size={1.5} />
    </div>
  ) : endAction ? (
    <button
      type="button"
      disabled={disabled}
      onClick={endAction.onClick}
      aria-label={endAction["aria-label"]}
      className="absolute top-0 right-0 flex size-9 items-center justify-center rounded-r-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
    >
      <Icon name={endAction.icon} size={1.5} />
    </button>
  ) : null

  if (!label) {
    if (!hasEndElement) return inputEl
    return (
      <div className="relative">
        {inputEl}
        {endEl}
      </div>
    )
  }

  if (!animatedLabel) {
    return (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={inputId}>{label}</Label>
        <div className="relative">
          {inputEl}
          {endEl}
        </div>
      </div>
    )
  }

  return (
    <div className="group/floating-label relative mt-5" data-slot="input-label-wrapper">
      {inputEl}
      <Label
        htmlFor={inputId}
        // pointer-events-none: a label fica sobreposta ao texto do campo em
        // repouso, como um placeholder — sem isso, clicar nela não foca o
        // input por baixo.
        className={cn(
          "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-[top,left,transform,color] duration-motion-fast ease-out",
          "group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:top-0 group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:left-0 group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:-translate-y-[calc(100%+(--spacing(1.5)))] group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:text-foreground"
        )}
      >
        {label}
      </Label>
      {endEl}
    </div>
  )
}

export { Input }
