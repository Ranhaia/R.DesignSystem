"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { genericPlaygroundRegistry } from "./generic-playground-registry"

// O registro fica em generic-playground-registry.tsx, sem "use client": a página de servidor precisa lê-lo.
export function GenericPlayground({ slug }: { slug: string }) {
  const config = genericPlaygroundRegistry[slug]
  const [variant, setVariant] = React.useState(config?.variants?.[0] ?? "default")
  const [size, setSize] = React.useState(config?.sizes?.[0] ?? "default")
  const [disabled, setDisabled] = React.useState(false)
  const [checked, setChecked] = React.useState(false)

  if (!config) return null

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_--spacing(56)]">
      <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed p-6">
        {config.render({ variant, size, disabled, checked, setChecked })}
      </div>

      <div className="grid gap-4 content-start">
        {config.variants && (
          <div className="space-y-1.5">
            <Label htmlFor={`pg-${slug}-variant`}>
              {config.variantLabel ?? "Variante"}
            </Label>
            <Select value={variant} onValueChange={setVariant}>
              <SelectTrigger id={`pg-${slug}-variant`} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.variants.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {config.sizes && (
          <div className="space-y-1.5">
            <Label htmlFor={`pg-${slug}-size`}>{config.sizeLabel ?? "Tamanho"}</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger id={`pg-${slug}-size`} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.sizes.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {config.disabled && (
          <div className="flex items-center justify-between">
            <Label htmlFor={`pg-${slug}-disabled`}>Disabled</Label>
            <Switch
              id={`pg-${slug}-disabled`}
              checked={disabled}
              onCheckedChange={setDisabled}
            />
          </div>
        )}

        {config.checked && (
          <div className="flex items-center justify-between">
            <Label htmlFor={`pg-${slug}-checked`}>{config.checked.label}</Label>
            <Switch
              id={`pg-${slug}-checked`}
              checked={checked}
              onCheckedChange={setChecked}
            />
          </div>
        )}
      </div>
    </div>
  )
}
