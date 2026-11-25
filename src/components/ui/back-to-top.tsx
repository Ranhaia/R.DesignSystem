"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useTexto } from "@/lib/idioma"
import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"

// Botão flutuante que aparece depois de rolar a página e leva ao começo.
// Escondido com visibility (sai da ordem do Tab), não desmontado. Rolagem
// suave só sem prefers-reduced-motion.
function BackToTop({
  className,
  threshold = 400,
  label,
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "icon" | "aria-label" | "variant" | "size"> & {
  /** Quanto rolar (em pixels de rolagem) até o botão aparecer. */
  threshold?: number
  /** Nome para o leitor de tela. Padrão do dicionário. */
  label?: string
}) {
  const t = useTexto()
  const [visivel, setVisivel] = React.useState(false)

  React.useEffect(() => {
    const atualizar = () => setVisivel(window.scrollY > threshold)
    atualizar()
    window.addEventListener("scroll", atualizar, { passive: true })
    return () => window.removeEventListener("scroll", atualizar)
  }, [threshold])

  return (
    <IconButton
      {...props}
      data-slot="back-to-top"
      data-visible={visivel}
      variant="outline"
      icon={<Icon name="arrow_upward" />}
      aria-label={label ?? t("backToTop.rotulo")}
      className={cn(
        "fixed right-6 bottom-6 z-40 rounded-full shadow-md motion-safe:transition-[opacity,visibility]",
        visivel ? "visible opacity-100" : "invisible opacity-0",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: 0, behavior: reduz ? "auto" : "smooth" })
        // O botão some no topo: o foco vai para o conteúdo principal, não se perde.
        const alvo = document.querySelector<HTMLElement>("main") ?? document.body
        if (!alvo.hasAttribute("tabindex")) alvo.setAttribute("tabindex", "-1")
        alvo.focus({ preventScroll: true })
      }}
    />
  )
}

export { BackToTop }
