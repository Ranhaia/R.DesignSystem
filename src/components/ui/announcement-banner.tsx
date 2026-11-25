"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useTexto } from "@/lib/idioma"
import { Alert } from "@/components/ui/alert"
import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"

const FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Faixa no topo do app com um recado para todos. É o Alert em largura total,
// sem cantos, com o fechar do IconButton. role="region" (não "alert"): o
// recado está lá desde a carga e não deve interromper o leitor de tela.
function AnnouncementBanner({
  className,
  children,
  dismissible = true,
  onDismiss,
  label,
  closeLabel,
  ...props
}: React.ComponentProps<typeof Alert> & {
  /** Mostra o botão de fechar. */
  dismissible?: boolean
  /** Chamado ao fechar; use para lembrar que a pessoa já viu o recado. */
  onDismiss?: () => void
  /** Nome da região para o leitor de tela. */
  label?: string
  /** Texto que o leitor de tela anuncia no "X". */
  closeLabel?: string
}) {
  const t = useTexto()
  const [aberto, setAberto] = React.useState(true)
  const ref = React.useRef<HTMLDivElement>(null)
  if (!aberto) return null

  // O fechar sai da página junto com a faixa: o foco segue para o primeiro
  // controle depois dela, em vez de cair no começo do documento.
  const fechar = () => {
    const faixa = ref.current
    const proximo = faixa
      ? [...document.querySelectorAll<HTMLElement>(FOCAVEIS)].find(
          (el) => faixa.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING && !faixa.contains(el)
        )
      : undefined
    setAberto(false)
    proximo?.focus()
    onDismiss?.()
  }

  return (
    <Alert
      ref={ref}
      data-slot="announcement-banner"
      role="region"
      aria-label={label ?? t("announcement.nome")}
      className={cn(
        "flex items-center gap-3 rounded-none border-x-0 border-t-0 py-2",
        className
      )}
      {...props}
    >
      <div data-slot="announcement-banner-content" className="flex flex-1 flex-wrap items-center justify-center gap-x-2 text-center">
        {children}
      </div>
      {dismissible && (
        <IconButton
          variant="ghost"
          size="icon-sm"
          icon={<Icon name="close" />}
          aria-label={closeLabel ?? t("announcement.fechar")}
          onClick={fechar}
        />
      )}
    </Alert>
  )
}

export { AnnouncementBanner }
