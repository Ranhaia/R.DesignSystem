import { createElement as h } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { ImageViewer, proximoIndice, limitarZoom } from "@/components/ui/image-viewer"

// image-viewer: imagem grande sobre a página (dialog), com zoom, arrastar e galeria.

const imagens = [
  { src: "/a.jpg", alt: "Fachada" },
  { src: "/b.jpg", alt: "Sala" },
  { src: "/c.jpg", alt: "Cozinha" },
]

describe("regras", () => {
  it("galeria dá a volta nas pontas", () => {
    expect(proximoIndice(0, -1, 3)).toBe(2)
    expect(proximoIndice(2, 1, 3)).toBe(0)
    expect(proximoIndice(1, 1, 3)).toBe(2)
  })
  it("zoom fica entre 1 e 4", () => {
    expect(limitarZoom(0.5)).toBe(1)
    expect(limitarZoom(2.5)).toBe(2.5)
    expect(limitarZoom(9)).toBe(4)
  })
})

describe("ImageViewer", () => {
  // Radix renderiza o conteúdo em portal (fora do SSR); o contrato do SSR é o gatilho
  it("o filho vira o gatilho do dialog", () => {
    const s = renderToString(h(ImageViewer, { images: imagens }, h("button", null, "Ver fotos")))
    expect(s).toContain("Ver fotos")
    expect(s).toMatch(/aria-haspopup="dialog"/)
  })
})
