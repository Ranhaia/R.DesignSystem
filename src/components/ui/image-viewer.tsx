"use client"

import * as React from "react"

import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"
import { useTexto } from "@/lib/idioma"
import { cn } from "@/lib/utils"

type ImagemDoVisualizador = { src: string; alt: string }

const ZOOM_MIN = 1
const ZOOM_MAX = 4
const ZOOM_PASSO = 0.5

/** Índice seguinte na galeria, dando a volta nas pontas. */
function proximoIndice(atual: number, passo: number, total: number) {
  return (atual + passo + total) % total
}

function limitarZoom(z: number) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z))
}

type ImageViewerProps = {
  images: ImagemDoVisualizador[]
  /** Gatilho que abre o visualizador (ex.: a miniatura). */
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (aberto: boolean) => void
  index?: number
  defaultIndex?: number
  onIndexChange?: (indice: number) => void
  className?: string
}

function ImageViewer({
  images,
  children,
  open,
  defaultOpen,
  onOpenChange,
  index,
  defaultIndex = 0,
  onIndexChange,
  className,
}: ImageViewerProps) {
  const t = useTexto()
  const [indiceInterno, setIndiceInterno] = React.useState(defaultIndex)
  const total = images.length
  // índice fora da lista abriria um dialog vazio
  const atual = Math.min(Math.max(index ?? indiceInterno, 0), Math.max(total - 1, 0))
  const [zoom, setZoom] = React.useState(1)
  const [desloc, setDesloc] = React.useState({ x: 0, y: 0 })
  const [arrastando, setArrastando] = React.useState(false)
  const inicio = React.useRef({ x: 0, y: 0 })
  const imagem = images[atual]

  // zoom e posição são da imagem aberta: zeram ao trocar de imagem (inclusive por fora) e ao fechar
  const zerar = () => {
    setZoom(1)
    setDesloc({ x: 0, y: 0 })
  }
  React.useEffect(zerar, [atual])

  function irPara(i: number) {
    if (index === undefined) setIndiceInterno(i)
    onIndexChange?.(i)
  }

  function mudarZoom(z: number) {
    const novo = limitarZoom(z)
    setZoom(novo)
    if (novo === 1) setDesloc({ x: 0, y: 0 })
  }

  function teclado(e: React.KeyboardEvent) {
    if (total > 1 && e.key === "ArrowLeft") irPara(proximoIndice(atual, -1, total))
    else if (total > 1 && e.key === "ArrowRight") irPara(proximoIndice(atual, 1, total))
    else if (e.key === "+" || e.key === "=") mudarZoom(zoom + ZOOM_PASSO)
    else if (e.key === "-") mudarZoom(zoom - ZOOM_PASSO)
    else if (e.key === "0") mudarZoom(1)
    else return
    e.preventDefault()
  }

  return (
    <Dialog
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(aberto) => {
        if (!aberto) zerar()
        onOpenChange?.(aberto)
      }}
    >
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      {imagem && (
        <DialogContent
          data-slot="image-viewer"
          showCloseButton={false}
          aria-describedby={undefined}
          onKeyDown={teclado}
          className={cn(
            "inset-0 top-0 left-0 grid size-full max-w-none translate-x-0 translate-y-0 grid-rows-[auto_1fr_auto] gap-0 rounded-none border-0 p-0 sm:max-w-none",
            className
          )}
        >
          <DialogTitle className="sr-only">{imagem.alt}</DialogTitle>

          <div data-slot="image-viewer-toolbar" className="flex items-center gap-1 p-2">
            {total > 1 && (
              <span className="px-2 text-sm text-muted-foreground tabular-nums" aria-live="polite">
                {t("imageViewer.posicao", { n: atual + 1, total })}
              </span>
            )}
            <span className="flex-1" />
            <IconButton
              variant="ghost"
              aria-label={t("imageViewer.reduzir")}
              icon={<Icon name="zoom_out" />}
              aria-disabled={zoom <= ZOOM_MIN || undefined}
              onClick={() => mudarZoom(zoom - ZOOM_PASSO)}
            />
            <IconButton
              variant="ghost"
              aria-label={t("imageViewer.ampliar")}
              icon={<Icon name="zoom_in" />}
              aria-disabled={zoom >= ZOOM_MAX || undefined}
              onClick={() => mudarZoom(zoom + ZOOM_PASSO)}
            />
            <DialogClose asChild>
              <IconButton variant="ghost" aria-label={t("comum.fechar")} icon={<Icon name="close" />} />
            </DialogClose>
          </div>

          <div
            data-slot="image-viewer-stage"
            className={cn(
              "relative flex min-h-0 items-center justify-center overflow-hidden",
              zoom > 1 && "cursor-grab touch-none active:cursor-grabbing"
            )}
            onDoubleClick={(e) => {
              if (!(e.target as HTMLElement).closest("button")) mudarZoom(zoom > 1 ? 1 : 2)
            }}
            onWheel={(e) => mudarZoom(zoom + (e.deltaY < 0 ? ZOOM_PASSO : -ZOOM_PASSO))}
            onPointerDown={(e) => {
              if (zoom === 1 || (e.target as HTMLElement).closest("button")) return
              e.currentTarget.setPointerCapture(e.pointerId)
              inicio.current = { x: e.clientX - desloc.x, y: e.clientY - desloc.y }
              setArrastando(true)
            }}
            onPointerMove={(e) => {
              if (arrastando) setDesloc({ x: e.clientX - inicio.current.x, y: e.clientY - inicio.current.y })
            }}
            onPointerUp={() => setArrastando(false)}
            onPointerCancel={() => setArrastando(false)}
          >
            {/* shortcut: sem pinça de dois dedos, arrasto sem limite e setas do teclado sem inverter em RTL; refinar quando houver uso em toque ou RTL */}
            {/* eslint-disable-next-line @next/next/no-img-element -- a imagem vem de quem usa, de qualquer origem */}
            <img
              src={imagem.src}
              alt={imagem.alt}
              draggable={false}
              decoding="async"
              className={cn(
                "max-h-full max-w-full object-contain select-none",
                !arrastando && "transition-transform duration-motion-fast"
              )}
              style={{ transform: `translate(${desloc.x}px, ${desloc.y}px) scale(${zoom})` }}
            />
            {total > 1 && (
              <>
                <IconButton
                  variant="outline"
                  aria-label={t("imageViewer.anterior")}
                  icon={<Icon name="chevron_left" />}
                  className="absolute start-2 top-1/2 -translate-y-1/2 rounded-full"
                  onClick={() => irPara(proximoIndice(atual, -1, total))}
                />
                <IconButton
                  variant="outline"
                  aria-label={t("imageViewer.proxima")}
                  icon={<Icon name="chevron_right" />}
                  className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full"
                  onClick={() => irPara(proximoIndice(atual, 1, total))}
                />
              </>
            )}
          </div>

          {total > 1 && (
            <div
              data-slot="image-viewer-thumbnails"
              role="group"
              aria-label={t("imageViewer.miniaturas")}
              className="flex justify-center gap-2 overflow-x-auto p-2"
            >
              {images.map((img, i) => (
                <button
                  key={img.src + i}
                  type="button"
                  aria-label={img.alt}
                  aria-current={i === atual || undefined}
                  onClick={() => irPara(i)}
                  className="size-14 shrink-0 overflow-hidden rounded-md opacity-60 outline-none hover:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring aria-current:opacity-100 aria-current:ring-2 aria-current:ring-primary"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- miniatura da mesma imagem */}
                  <img src={img.src} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  )
}

export { ImageViewer, proximoIndice, limitarZoom, type ImagemDoVisualizador }
