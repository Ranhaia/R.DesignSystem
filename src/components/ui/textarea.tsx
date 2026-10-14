import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function Textarea({
  className,
  id,
  label,
  animatedLabel = false,
  placeholder,
  ...props
}: React.ComponentProps<"textarea"> & {
  label?: React.ReactNode
  animatedLabel?: boolean
}) {
  const generatedId = React.useId()
  const textareaId = label ? (id ?? generatedId) : id

  const textareaEl = (
    <textarea
      id={textareaId}
      data-slot="textarea"
      placeholder={label && animatedLabel ? " " : placeholder}
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:ring-destructive/40",
        label && animatedLabel && "peer",
        className
      )}
      {...props}
    />
  )

  if (!label) {
    return textareaEl
  }

  if (!animatedLabel) {
    return (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={textareaId}>{label}</Label>
        {textareaEl}
      </div>
    )
  }

  return (
    <div className="group/floating-label relative mt-5" data-slot="textarea-label-wrapper">
      {textareaEl}
      <Label
        htmlFor={textareaId}
        // pointer-events-none: a label ocupa o canto do campo em repouso,
        // como um placeholder — sem isso, clicar nela não foca o textarea
        // por baixo.
        className={cn(
          "pointer-events-none absolute top-3 left-3 text-muted-foreground transition-[top,left,transform,color] duration-motion-fast ease-out",
          "group-has-[textarea:focus,textarea:not(:placeholder-shown)]/floating-label:top-0 group-has-[textarea:focus,textarea:not(:placeholder-shown)]/floating-label:left-0 group-has-[textarea:focus,textarea:not(:placeholder-shown)]/floating-label:-translate-y-[calc(100%+(--spacing(1.5)))] group-has-[textarea:focus,textarea:not(:placeholder-shown)]/floating-label:text-foreground"
        )}
      >
        {label}
      </Label>
    </div>
  )
}

export { Textarea }
