"use client"

import * as React from "react"

// Marca no "Nesta página" a seção que está na tela (scroll-spy), com
// aria-current="location" no link. Mesma ideia do sumário do Site-Relatorio
// (lá com IntersectionObserver), adaptada para não mexer no markup das páginas:
// renderiza um marcador invisível dentro do <nav> e observa as seções que os
// links do próprio <nav> apontam, recalculando a cada rolagem. O visual do link ativo fica na classe
// tocLinkClass, aplicada por quem monta o sumário.
export const tocLinkClass =
  "transition-colors duration-motion-fast ease-spring hover:text-foreground aria-[current=location]:font-medium aria-[current=location]:text-foreground"

export function TocScrollSpy() {
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const nav = ref.current?.closest("nav")
    if (!nav) return
    const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
    const byId = new Map(links.map((a) => [decodeURIComponent(a.hash.slice(1)), a]))
    const targets = [...byId.keys()]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    // Ativa é a última seção cujo topo já chegou onde o link a deixaria
    // (o scroll-margin-top dela, abaixo do cabeçalho fixo). Antes da
    // primeira, a primeira; no fim da página, a última.
    let frame = 0
    const mark = () => {
      frame = 0
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let active = targets[0].id
      for (const el of targets) if (el.getBoundingClientRect().top <= parseFloat(getComputedStyle(el).scrollMarginTop) + 1) active = el.id
      if (atEnd) active = targets[targets.length - 1].id
      for (const [id, a] of byId) {
        if (id === active) a.setAttribute("aria-current", "location")
        else a.removeAttribute("aria-current")
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(mark)
    }
    mark()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return <span ref={ref} hidden />
}
