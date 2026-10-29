"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
import { partesDoBotao, type PosicaoIcone } from "@/lib/botao-playground"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const
const sizes = [
  "xs",
  "sm",
  "default",
  "lg",
  "icon",
  "icon-xs",
  "icon-sm",
  "icon-lg",
] as const

type Variant = (typeof variants)[number]
type Size = (typeof sizes)[number]

// Playground-piloto: específico do Button por enquanto. Se o padrão for
// aprovado, isso vira um componente genérico dirigido pelos dados de
// component-docs.ts em vez de hardcoded por componente.
export function ButtonPlayground() {
  const [variant, setVariant] = React.useState<Variant>("default")
  const [size, setSize] = React.useState<Size>("default")
  const [icone, setIcone] = React.useState(false)
  const [posicao, setPosicao] = React.useState<PosicaoIcone>("esquerda")
  const [disabled, setDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  // Tamanhos icon-* são só ícone: o switch fica ligado e travado, e a posição não se aplica.
  const soIcone = size.startsWith("icon")
  const conteudo = {
    icone: loading ? <Spinner key="icone" /> : <Icon key="icone" name="favorite" />,
    rotulo: "Button",
  }

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_--spacing(56)]">
      <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed p-6">
        <Button
          variant={variant}
          size={size}
          disabled={disabled || loading}
          aria-label={soIcone ? "Ação" : undefined}
        >
          {partesDoBotao({ size, icone, posicao, loading }).map((p) => conteudo[p])}
        </Button>
      </div>

      <div className="grid gap-4 content-start">
        <div className="space-y-1.5">
          <Label htmlFor="pg-button-variant">Variante</Label>
          <Select
            value={variant}
            onValueChange={(value) => setVariant(value as Variant)}
          >
            <SelectTrigger id="pg-button-variant" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {variants.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="pg-button-size">Tamanho</Label>
          <Select value={size} onValueChange={(value) => setSize(value as Size)}>
            <SelectTrigger id="pg-button-size" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="pg-button-icone">Ícone</Label>
          <Switch
            id="pg-button-icone"
            checked={soIcone || icone}
            disabled={soIcone}
            onCheckedChange={setIcone}
          />
        </div>

        {icone && !soIcone && (
          <div className="space-y-1.5">
            <Label id="pg-button-posicao">Posição do ícone</Label>
            <SegmentedControl
              aria-labelledby="pg-button-posicao"
              value={posicao}
              // Radix manda "" ao clicar no item já ativo; sem isto a posição ficaria sem valor.
              onValueChange={(value) => value && setPosicao(value as PosicaoIcone)}
            >
              <SegmentedControlItem value="esquerda">Esquerda</SegmentedControlItem>
              <SegmentedControlItem value="direita">Direita</SegmentedControlItem>
            </SegmentedControl>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="pg-button-disabled">Disabled</Label>
          <Switch
            id="pg-button-disabled"
            checked={disabled}
            onCheckedChange={setDisabled}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="pg-button-loading">Loading</Label>
          <Switch
            id="pg-button-loading"
            checked={loading}
            onCheckedChange={setLoading}
          />
        </div>
      </div>
    </div>
  )
}
