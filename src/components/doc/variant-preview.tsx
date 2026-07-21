import type * as React from "react"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Item } from "@/components/ui/item"
import { Marker } from "@/components/ui/marker"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Preview "ao vivo" das seções Variantes/Tamanhos de cada componente, na
// página /components/[slug]. Cada slug renderiza o componente REAL
// correspondente (não um <Button> genérico só porque o piloto original era
// do Button) — slug sem entrada aqui cai num fallback neutro (caixa com
// texto), em vez de fingir ser outro componente.

type VariantPreviewProps = { value: string; children: React.ReactNode }
type SizePreviewProps = { value: string }

export const variantPreviewRegistry: Record<
  string,
  (props: VariantPreviewProps) => React.ReactNode
> = {
  button: ({ value, children }) => (
    <Button variant={value as never}>{children}</Button>
  ),
  badge: ({ value, children }) => (
    <Badge variant={value as never}>{children}</Badge>
  ),
  toggle: ({ value, children }) => (
    <Toggle variant={value as never}>{children}</Toggle>
  ),
  item: ({ value, children }) => (
    <Item variant={value as never} className="text-sm">
      {children}
    </Item>
  ),
  marker: ({ value, children }) => (
    <Marker variant={value as never}>{children}</Marker>
  ),
  alert: ({ value, children }) => (
    <Alert variant={value as never} className="w-auto">
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  ),
  "toggle-group": ({ value, children }) => (
    <ToggleGroup type="single" variant={value as never}>
      <ToggleGroupItem value="a">{children}</ToggleGroupItem>
    </ToggleGroup>
  ),
  bubble: ({ value, children }) => (
    <Bubble variant={value as never} className="max-w-none">
      <BubbleContent>{children}</BubbleContent>
    </Bubble>
  ),
}

export const sizePreviewRegistry: Record<
  string,
  (props: SizePreviewProps) => React.ReactNode
> = {
  button: ({ value }) => (
    <Button size={value as never} variant="outline">
      {value.startsWith("icon") ? "" : "Aa"}
    </Button>
  ),
  avatar: ({ value }) => (
    <Avatar size={value as never}>
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  ),
  switch: ({ value }) => <Switch size={value as never} />,
  toggle: ({ value }) => (
    <Toggle size={value as never} variant="outline">
      Aa
    </Toggle>
  ),
  item: ({ value }) => (
    <Item size={value as never} variant="outline" className="text-sm">
      Aa
    </Item>
  ),
  "native-select": ({ value }) => (
    <NativeSelect size={value as never} className="w-auto">
      <NativeSelectOption>Opção</NativeSelectOption>
    </NativeSelect>
  ),
  select: ({ value }) => (
    <Select>
      <SelectTrigger size={value as never} className="w-auto">
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
    </Select>
  ),
  "toggle-group": ({ value }) => (
    <ToggleGroup type="single" size={value as never} variant="outline">
      <ToggleGroupItem value="a">Aa</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export function renderVariantPreview(
  slug: string,
  value: string,
  children: React.ReactNode
) {
  const preview = variantPreviewRegistry[slug]
  if (preview) {
    return preview({ value, children })
  }
  return <div className="rounded-md border px-3 py-1.5 text-sm">{children}</div>
}

export function renderSizePreview(slug: string, value: string) {
  const preview = sizePreviewRegistry[slug]
  if (preview) {
    return preview({ value })
  }
  return <div className="rounded-md border px-3 py-1.5 text-sm">{value}</div>
}
