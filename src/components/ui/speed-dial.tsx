"use client"

import * as React from "react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

export type SpeedDialDirection = "up" | "down" | "left" | "right"

export interface SpeedDialAction {
  key: string
  label: string
  icon: React.ReactNode
  action: () => void
  disabled?: boolean
}

export interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: SpeedDialDirection
  actionButtons: SpeedDialAction[]
  triggerLabel?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const menuAnchorClasses: Record<SpeedDialDirection, string> = {
  up: "bottom-full left-1/2 mb-3 -translate-x-1/2 origin-bottom",
  down: "top-full left-1/2 mt-3 -translate-x-1/2 origin-top",
  left: "right-full top-1/2 mr-3 -translate-y-1/2 origin-right",
  right: "left-full top-1/2 ml-3 -translate-y-1/2 origin-left",
}

const menuLayoutClasses: Record<SpeedDialDirection, string> = {
  up: "flex flex-col-reverse items-center gap-2",
  down: "flex flex-col items-center gap-2",
  left: "flex flex-row-reverse items-center gap-2",
  right: "flex flex-row items-center gap-2",
}

const animationClassMap: Record<SpeedDialDirection, string> = {
  up: "speed-dial-in-up",
  down: "speed-dial-in-down",
  left: "speed-dial-in-left",
  right: "speed-dial-in-right",
}

export function SpeedDial({
  direction = "up",
  actionButtons,
  triggerLabel = "Ações rápidas",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: SpeedDialProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const actionButtonRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const menuId = React.useId()

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  // Fecha no clique fora
  React.useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [isOpen, setOpen])

  // Acessibilidade de teclado: Escape e setas
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      e.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
      return
    }

    if (!isOpen) return

    const total = actionButtons.length
    if (total === 0) return

    const currentIndex = actionButtonRefs.current.findIndex(
      (btn) => btn === document.activeElement
    )

    let nextIndex = -1

    if (direction === "up" || direction === "down") {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        nextIndex = currentIndex <= 0 ? total - 1 : currentIndex - 1
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        nextIndex = currentIndex >= total - 1 ? 0 : currentIndex + 1
      }
    } else {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        nextIndex = currentIndex >= total - 1 ? 0 : currentIndex + 1
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        nextIndex = currentIndex <= 0 ? total - 1 : currentIndex - 1
      }
    }

    if (nextIndex >= 0 && actionButtonRefs.current[nextIndex]) {
      actionButtonRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div
      ref={rootRef}
      data-slot="speed-dial"
      data-state={isOpen ? "open" : "closed"}
      onKeyDown={handleKeyDown}
      className={cn("relative inline-flex items-center justify-center", className)}
      {...props}
    >
      {/* Gatilho FAB Principal */}
      <button
        ref={triggerRef}
        type="button"
        aria-label={triggerLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setOpen(!isOpen)}
        className={cn(
          "flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-xl",
          "border border-border/80 bg-primary text-primary-foreground shadow-md backdrop-blur-md",
          "transition-all duration-motion-fast ease-spring hover:bg-primary/90 active:scale-(--scale-pressed)",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center transition-transform duration-motion-base ease-spring",
            isOpen ? "rotate-45" : "rotate-0"
          )}
        >
          <Icon name="add" size={1.25} className="size-5" />
        </span>
      </button>

      {/* Menu com Ações Escalonadas (Stagger) */}
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={triggerLabel}
          className={cn(
            "absolute z-50 pointer-events-auto",
            menuAnchorClasses[direction],
            menuLayoutClasses[direction]
          )}
        >
          {actionButtons.map((btn, index) => {
            const delayMs = index * 40 // 40ms stagger delay por botão
            const animName = animationClassMap[direction]

            return (
              <button
                key={btn.key}
                ref={(el) => {
                  actionButtonRefs.current[index] = el
                }}
                role="menuitem"
                type="button"
                disabled={btn.disabled}
                onClick={() => {
                  btn.action()
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                style={{
                  animation: `${animName} var(--motion-duration-base) var(--motion-ease-spring) ${delayMs}ms both`,
                }}
                className={cn(
                  "group relative flex size-10 shrink-0 touch-manipulation items-center justify-center rounded-lg",
                  "border border-border/80 bg-background/90 text-foreground shadow-sm backdrop-blur-xl",
                  "transition-all duration-motion-fast ease-spring hover:bg-accent hover:text-accent-foreground active:scale-(--scale-pressed)",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
                title={btn.label}
              >
                <span className="size-4 shrink-0 [&_svg]:size-4">{btn.icon}</span>
                <span className="sr-only">{btn.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
