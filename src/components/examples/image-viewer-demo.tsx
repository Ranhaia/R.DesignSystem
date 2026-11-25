"use client"

import { ImageViewer } from "@/components/ui/image-viewer"

const imagens = [
  { src: "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=1600&auto=format&fit=crop", alt: "Paisagem 1" },
  { src: "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=1600&auto=format&fit=crop", alt: "Paisagem 2" },
  { src: "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=1600&auto=format&fit=crop", alt: "Paisagem 3" },
]

export default function ImageViewerDemo() {
  return (
    <div className="flex gap-2">
      {imagens.map((img, i) => (
        <ImageViewer key={img.src} images={imagens} defaultIndex={i}>
          <button
            type="button"
            aria-label={`Ampliar ${img.alt}`}
            className="size-24 overflow-hidden rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- exemplo com imagem externa */}
            <img src={img.src.replace("w=1600", "w=200")} alt="" className="size-full object-cover" />
          </button>
        </ImageViewer>
      ))}
    </div>
  )
}
