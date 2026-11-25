"use client"

import * as React from "react"

import { useTexto } from "@/lib/idioma"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

// Seletor de cor: área de saturação × brilho (ponteiro e setas), matiz no
// Slider, campo hexadecimal e paleta opcional. ColorPickerPanel é o painel
// solto (inline); ColorPicker o abre num Popover a partir de um botão.
// A cor escolhida é dado do produto, então vai em style; o espectro da área e
// da matiz é a própria escala de cor, não um token.

type Hsv = { h: number; s: number; v: number }

function normalizarHex(texto: string) {
  const m = texto.trim().replace(/^#/, "").toLowerCase()
  if (/^[0-9a-f]{3}$/.test(m)) return `#${[...m].map((c) => c + c).join("")}`
  return /^[0-9a-f]{6}$/.test(m) ? `#${m}` : null
}

/** HSV sem arredondar (h 0–360, s e v 0–100): a ida e volta preserva o hex. */
function hexParaHsv(hex: string): Hsv {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)
  const h = !d ? 0 : max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return { h: (h * 60 + 360) % 360, s: max ? (d / max) * 100 : 0, v: max * 100 }
}

function hsvParaHex({ h, s, v }: Hsv) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    const c = (v / 100) * (1 - (s / 100) * Math.max(0, Math.min(k, 4 - k, 1)))
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(5)}${f(3)}${f(1)}`
}

const limitar = (n: number) => Math.min(100, Math.max(0, n))

/** Setas: ←→ saturação, ↑↓ brilho; Shift anda 10. Outra tecla: null. */
function moverHsv(hsv: Hsv, tecla: string, rapido: boolean): Hsv | null {
  const p = rapido ? 10 : 1
  const delta: Record<string, [number, number]> = { ArrowRight: [p, 0], ArrowLeft: [-p, 0], ArrowUp: [0, p], ArrowDown: [0, -p] }
  const d = delta[tecla]
  return d ? { ...hsv, s: limitar(hsv.s + d[0]), v: limitar(hsv.v + d[1]) } : null
}

type PropsCor = {
  value?: string
  defaultValue?: string
  onValueChange?: (hex: string) => void
  /** Cores prontas (hex). Sem ela, não há paleta. */
  paleta?: string[]
}

// Estado em HSV: guarda a matiz mesmo quando a cor fica cinza (s = 0).
function useCor({ value, defaultValue = "#000000", onValueChange }: PropsCor) {
  const [hsv, setHsvInterno] = React.useState(() => hexParaHsv(normalizarHex(value ?? defaultValue) ?? "#000000"))
  const hex = hsvParaHex(hsv)
  const externo = value === undefined ? null : normalizarHex(value)
  if (externo && externo !== hex) setHsvInterno(hexParaHsv(externo)) // value mudou por fora: acompanha
  const setHsv = (novo: Hsv) => {
    setHsvInterno(novo)
    const h = hsvParaHex(novo)
    if (h !== hex) onValueChange?.(h)
  }
  return { hsv, hex, setHsv }
}

function Painel({ hsv, hex, setHsv, paleta }: ReturnType<typeof useCor> & Pick<PropsCor, "paleta">) {
  const t = useTexto()
  const area = React.useRef<HTMLDivElement>(null)
  const hexId = React.useId()
  const [digitado, setDigitado] = React.useState<string | null>(null)

  const porPonteiro = (e: React.PointerEvent) => {
    const r = area.current!.getBoundingClientRect()
    setHsv({ ...hsv, s: limitar(((e.clientX - r.left) / r.width) * 100), v: limitar(100 - ((e.clientY - r.top) / r.height) * 100) })
  }
  const confirmarHex = () => {
    const h = digitado === null ? null : normalizarHex(digitado)
    if (h) setHsv(hexParaHsv(h))
    setDigitado(null)
  }

  return (
    <div data-slot="color-picker-panel" className="flex w-56 flex-col gap-3">
      <div
        ref={area}
        data-slot="color-picker-area"
        role="slider"
        tabIndex={0}
        aria-label={t("colorPicker.area")}
        aria-valuetext={t("colorPicker.valorArea", { s: Math.round(hsv.s), v: Math.round(hsv.v) })}
        aria-valuenow={Math.round(hsv.s)}
        className="relative h-36 touch-none rounded-inner outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
        style={{ backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          porPonteiro(e)
        }}
        onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && porPonteiro(e)}
        onKeyDown={(e) => {
          const novo = moverHsv(hsv, e.key, e.shiftKey)
          if (novo) {
            e.preventDefault()
            setHsv(novo)
          }
        }}
      >
        <div className="absolute inset-0 rounded-[inherit] bg-linear-to-r from-white to-transparent" />
        <div className="absolute inset-0 rounded-[inherit] bg-linear-to-t from-black to-transparent" />
        <div
          className="pointer-events-none absolute size-4 -translate-1/2 rounded-full border-2 border-white shadow-sm"
          style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%`, backgroundColor: hex }}
        />
      </div>
      <Slider
        aria-label={t("colorPicker.matiz")}
        min={0}
        max={360}
        value={[Math.round(hsv.h)]}
        onValueChange={([h]) => setHsv({ ...hsv, h })}
        className="[&_[data-slot=slider-range]]:hidden [&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-track]]:bg-[linear-gradient(to_right,red,yellow,lime,cyan,blue,magenta,red)]"
      />
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="size-9 shrink-0 rounded-md border" style={{ backgroundColor: hex }} />
        <Input
          id={hexId}
          aria-label={t("colorPicker.hex")}
          value={digitado ?? hex}
          spellCheck={false}
          maxLength={7}
          aria-invalid={digitado !== null && !normalizarHex(digitado)}
          onChange={(e) => setDigitado(e.target.value)}
          onBlur={confirmarHex}
          onKeyDown={(e) => e.key === "Enter" && confirmarHex()}
          className="font-mono"
        />
      </div>
      {paleta && paleta.length > 0 && (
        <div role="group" aria-label={t("colorPicker.paleta")} className="flex flex-wrap gap-1.5">
          {paleta.map((c) => {
            const cor = normalizarHex(c)
            if (!cor) return null
            return (
              <button
                key={cor}
                type="button"
                data-slot="color-picker-swatch"
                aria-label={cor}
                aria-pressed={cor === hex}
                onClick={() => setHsv(hexParaHsv(cor))}
                className="size-6 rounded-md border outline-none focus-visible:ring-[3px] focus-visible:ring-ring aria-pressed:ring-2 aria-pressed:ring-ring aria-pressed:ring-offset-2"
                style={{ backgroundColor: cor }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

function ColorPickerPanel({ className, ...props }: PropsCor & { className?: string }) {
  return (
    // sem contêiner arredondado em volta, a área fica com o raio md inteiro (distância 0)
    <div className={cn("rounded-outer-md radius-inset-0", className)}>
      <Painel {...useCor(props)} paleta={props.paleta} />
    </div>
  )
}

function ColorPicker({
  label,
  className,
  disabled,
  ...props
}: PropsCor & {
  /** Nome do campo, dito antes do hex. Padrão: "Cor". */
  label?: string
  className?: string
  disabled?: boolean
}) {
  const t = useTexto()
  const cor = useCor(props)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-slot="color-picker"
          variant="outline"
          disabled={disabled}
          aria-label={`${label ?? t("colorPicker.cor")}: ${cor.hex}`}
          className={cn("justify-start gap-2 rounded-outer-md font-mono radius-inset-2.5", className)}
        >
          <span aria-hidden="true" className="size-5 rounded-inner border" style={{ backgroundColor: cor.hex }} />
          {cor.hex}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-outer-md radius-inset-4" align="start">
        <Painel {...cor} paleta={props.paleta} />
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker, ColorPickerPanel, hexParaHsv, hsvParaHex, moverHsv, normalizarHex }
