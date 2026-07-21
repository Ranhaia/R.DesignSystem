"use client"

import * as React from "react"
import { FileIcon } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Item } from "@/components/ui/item"
import { Label } from "@/components/ui/label"
import { Marker } from "@/components/ui/marker"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Playground genérico: pega o padrão validado no ButtonPlayground (variante
// + tamanho + estados via Select/Switch, live preview ao lado) e aplica só
// aos componentes que TÊM variante e/ou tamanho reais (ver component-docs.ts)
// — nada de forçar um controle que o componente não suporta. Button continua
// com o ButtonPlayground dedicado (tem "loading", que é específico dele).

type PlaygroundState = {
  variant: string
  size: string
  disabled: boolean
  checked: boolean
}

type PlaygroundCtx = PlaygroundState & {
  setChecked: (value: boolean) => void
}

interface GenericPlaygroundConfig {
  render: (ctx: PlaygroundCtx) => React.ReactNode
  variants?: string[]
  variantLabel?: string
  sizes?: string[]
  sizeLabel?: string
  disabled?: boolean
  checked?: { label: string }
}

export const genericPlaygroundRegistry: Record<string, GenericPlaygroundConfig> = {
  avatar: {
    sizes: ["sm", "default", "lg"],
    render: ({ size }) => (
      <Avatar size={size as never}>
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>
    ),
  },
  badge: {
    variants: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    render: ({ variant }) => <Badge variant={variant as never}>Badge</Badge>,
  },
  switch: {
    sizes: ["sm", "default"],
    disabled: true,
    checked: { label: "Marcado" },
    render: ({ size, disabled, checked, setChecked }) => (
      <Switch
        size={size as never}
        disabled={disabled}
        checked={checked}
        onCheckedChange={setChecked}
      />
    ),
  },
  toggle: {
    variants: ["default", "outline"],
    sizes: ["sm", "default", "lg"],
    disabled: true,
    checked: { label: "Pressionado" },
    render: ({ variant, size, disabled, checked, setChecked }) => (
      <Toggle
        variant={variant as never}
        size={size as never}
        disabled={disabled}
        pressed={checked}
        onPressedChange={setChecked}
      >
        Aa
      </Toggle>
    ),
  },
  "native-select": {
    sizes: ["sm", "default"],
    disabled: true,
    render: ({ size, disabled }) => (
      <NativeSelect size={size as never} disabled={disabled} className="w-auto">
        <NativeSelectOption>Opção 1</NativeSelectOption>
        <NativeSelectOption>Opção 2</NativeSelectOption>
      </NativeSelect>
    ),
  },
  select: {
    sizes: ["sm", "default"],
    disabled: true,
    render: ({ size, disabled }) => (
      <Select disabled={disabled}>
        <SelectTrigger size={size as never} className="w-auto">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Opção 1</SelectItem>
          <SelectItem value="b">Opção 2</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  item: {
    variants: ["default", "outline", "muted"],
    sizes: ["default", "sm"],
    render: ({ variant, size }) => (
      <Item variant={variant as never} size={size as never} className="text-sm">
        Item de exemplo
      </Item>
    ),
  },
  marker: {
    variants: ["default", "separator", "border"],
    render: ({ variant }) => (
      <Marker variant={variant as never} className="w-48">
        Marcador
      </Marker>
    ),
  },
  alert: {
    variants: ["default", "destructive"],
    render: ({ variant }) => (
      <Alert variant={variant as never} className="w-auto">
        <AlertTitle>Aviso de exemplo</AlertTitle>
      </Alert>
    ),
  },
  "toggle-group": {
    variants: ["default", "outline"],
    sizes: ["sm", "default", "lg"],
    disabled: true,
    checked: { label: "Item marcado" },
    render: ({ variant, size, disabled, checked, setChecked }) => (
      <ToggleGroup
        type="single"
        variant={variant as never}
        size={size as never}
        disabled={disabled}
        value={checked ? "a" : undefined}
        onValueChange={(value) => setChecked(value === "a")}
      >
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    ),
  },
  attachment: {
    variants: ["idle", "uploading", "processing", "error", "done"],
    variantLabel: "Estado",
    sizes: ["xs", "sm", "default"],
    render: ({ variant, size }) => (
      <Attachment state={variant as never} size={size as never} className="max-w-56">
        <AttachmentMedia>
          <FileIcon className="size-4" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>arquivo.pdf</AttachmentTitle>
          <AttachmentDescription>
            {variant === "error" ? "Falha no upload" : "2,4 MB"}
          </AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    ),
  },
  bubble: {
    variants: [
      "default",
      "secondary",
      "muted",
      "tinted",
      "outline",
      "ghost",
      "destructive",
    ],
    render: ({ variant }) => (
      <Bubble variant={variant as never} className="max-w-none">
        <BubbleContent>Mensagem de exemplo</BubbleContent>
      </Bubble>
    ),
  },
}

export function GenericPlayground({ slug }: { slug: string }) {
  const config = genericPlaygroundRegistry[slug]
  const [variant, setVariant] = React.useState(config?.variants?.[0] ?? "default")
  const [size, setSize] = React.useState(config?.sizes?.[0] ?? "default")
  const [disabled, setDisabled] = React.useState(false)
  const [checked, setChecked] = React.useState(false)

  if (!config) return null

  return (
    <div className="grid gap-6 rounded-lg border bg-card p-6 sm:grid-cols-[1fr_14rem]">
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
