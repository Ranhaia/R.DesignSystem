import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function Input({
  className,
  type,
  id,
  label,
  animatedLabel = false,
  placeholder,
  ...props
}: React.ComponentProps<"input"> & {
  label?: React.ReactNode
  animatedLabel?: boolean
}) {
  const generatedId = React.useId()
  const inputId = label ? (id ?? generatedId) : id

  const inputEl = (
    <input
      type={type}
      id={inputId}
      data-slot="input"
      placeholder={label && animatedLabel ? (placeholder ?? " ") : placeholder}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )

  if (!label) {
    return inputEl
  }

  if (!animatedLabel) {
    return (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={inputId}>{label}</Label>
        {inputEl}
      </div>
    )
  }

  return (
    <div className="group/floating-label relative" data-slot="input-label-wrapper">
      {inputEl}
      <Label
        htmlFor={inputId}
        // pointer-events-none: a label fica sobreposta ao texto do campo em
        // repouso, como um placeholder — sem isso, clicar nela não foca o
        // input por baixo.
        className={cn(
          "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-[top,left,transform,color] duration-motion-fast ease-out",
          "group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:top-0 group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:left-0 group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:-translate-y-full group-has-[input:focus,input:not(:placeholder-shown)]/floating-label:text-foreground"
        )}
      >
        {label}
      </Label>
    </div>
  )
}

export { Input }
