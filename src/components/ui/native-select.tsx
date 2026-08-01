"use client"

import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function NativeSelect({
  className,
  size = "default",
  id,
  label,
  animatedLabel = false,
  value,
  defaultValue,
  onChange,
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
  label?: React.ReactNode
  animatedLabel?: boolean
}) {
  const generatedId = React.useId()
  const selectId = label ? (id ?? generatedId) : id
  // hasValue nasce de value/defaultValue explícitos — se nenhum dos dois
  // for passado, o browser ainda seleciona a 1ª <option> por padrão, e essa
  // seleção implícita não é capturada aqui. Uso com animatedLabel deve
  // sempre passar value ou defaultValue (mesmo que "").
  const [hasValue, setHasValue] = React.useState(
    () => !!(value ?? defaultValue)
  )

  React.useEffect(() => {
    if (value !== undefined) {
      setHasValue(!!value)
    }
  }, [value])

  const selectEl = (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        label && animatedLabel && "mt-5"
      )}
      data-slot="native-select-wrapper"
      data-has-value={hasValue}
    >
      <select
        data-slot="native-select"
        data-size={size}
        id={selectId}
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => {
          setHasValue(!!event.target.value)
          onChange?.(event)
        }}
        className={cn(
          "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/30 dark:hover:bg-input/50",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          label &&
            animatedLabel &&
            "group-data-[has-value=false]/native-select:text-transparent",
          className
        )}
        {...props}
      />
      <Icon
        name="keyboard_arrow_down"
        size={1}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
      {label && animatedLabel && (
        <Label
          htmlFor={selectId}
          // pointer-events-none: a label fica sobreposta ao valor
          // selecionado em repouso — sem isso, clicar nela não abre o
          // <select> por baixo.
          className={cn(
            "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-[top,left,transform,color] duration-motion-fast ease-out",
            "group-focus-within/native-select:top-0 group-focus-within/native-select:left-0 group-focus-within/native-select:-translate-y-[calc(100%+0.375rem)] group-focus-within/native-select:text-foreground",
            "group-data-[has-value=true]/native-select:top-0 group-data-[has-value=true]/native-select:left-0 group-data-[has-value=true]/native-select:-translate-y-[calc(100%+0.375rem)] group-data-[has-value=true]/native-select:text-foreground"
          )}
        >
          {label}
        </Label>
      )}
    </div>
  )

  if (!label || animatedLabel) {
    return selectEl
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={selectId}>{label}</Label>
      {selectEl}
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
