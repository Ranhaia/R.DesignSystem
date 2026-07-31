"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

// Tamanhos aceitos na raiz do SplitButton: só os "com texto" da escala do
// Button (default/sm/lg) — os size icon-* não fazem sentido pra ação
// principal, que sempre tem label (nome acessível visível). O botão-trigger
// do menu (ícone-only, o "x" pequeno colado) deriva o size ícone-only
// correspondente abaixo, mesmo raciocínio de mapeamento já usado em outros
// pontos do catálogo entre uma escala "com texto" e sua contraparte
// ícone-only.
type SplitButtonSize = "default" | "sm" | "lg"

const triggerSizeMap: Record<
  SplitButtonSize,
  VariantProps<typeof buttonVariants>["size"]
> = {
  default: "icon",
  sm: "icon-sm",
  lg: "icon-lg",
}

interface SplitButtonProps
  extends Omit<
    React.ComponentProps<typeof ButtonGroup>,
    "children" | "orientation"
  > {
  /** Texto da ação principal — nome acessível do botão principal (obrigatório). */
  label: React.ReactNode
  /** Ícone opcional antes do label, na ação principal. */
  icon?: React.ReactNode
  /** Handler da ação principal (clique direto no botão, independente do menu). */
  onClick?: () => void
  /** Estilo visual — aplicado igualmente ao botão principal e ao trigger do menu, pra manter a leitura de "peça única colada". */
  variant?: VariantProps<typeof buttonVariants>["variant"]
  /** Tamanho do botão principal — o trigger do menu deriva o size ícone-only correspondente (ver triggerSizeMap). */
  size?: SplitButtonSize
  /** Desativa toda a composição (ação principal + trigger do menu). */
  disabled?: boolean
  /** aria-label do botão-trigger do menu — obrigatório porque é ícone-only (sem texto visível), mesma regra já aplicada a todo ícone-only do catálogo. */
  triggerLabel?: string
  /** Alinhamento do menu suspenso em relação ao trigger (repassado ao DropdownMenuContent). */
  align?: "start" | "center" | "end"
  /**
   * Itens do menu — composição via DropdownMenuItem/DropdownMenuSeparator/
   * DropdownMenuLabel etc. (mesmo padrão já usado em DropdownMenu, Select,
   * Combobox neste catálogo: sempre JSX, nunca um array de dados). Renderizado
   * dentro do DropdownMenuContent.
   */
  children: React.ReactNode
}

function SplitButton({
  className,
  label,
  icon,
  onClick,
  variant = "default",
  size = "default",
  disabled = false,
  triggerLabel = "Mais ações",
  align = "end",
  children,
  ...props
}: SplitButtonProps) {
  return (
    <ButtonGroup data-slot="split-button" className={className} {...props}>
      <Button
        type="button"
        variant={variant}
        size={size}
        icon={icon}
        label={label}
        onClick={onClick}
        disabled={disabled}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant={variant}
            size={triggerSizeMap[size]}
            aria-label={triggerLabel}
            disabled={disabled}
          >
            <Icon name="keyboard_arrow_down" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>{children}</DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export { SplitButton }
