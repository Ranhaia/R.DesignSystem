import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "@/components/ui/button"

// IconButton: Button já suporta ícone-only hoje (prop `icon` sem `label`/
// `children`, ver button.tsx) — mas o tipo do Button não obriga
// `aria-label` nesse caso (ele é herdado de React.ComponentProps<"button">,
// onde é sempre opcional; a exigência era só documental, no comentário da
// anatomia). IconButton formaliza esse uso como componente PRÓPRIO: um
// wrapper fino que reaproveita 100% do Button/buttonVariants (nenhuma
// classe CSS nova, nenhuma variante nova) e torna `icon` e `aria-label`
// obrigatórios via tipo — não dá pra montar um <IconButton /> sem nome
// acessível, o TypeScript barra antes do runtime, não só na revisão.
//
// `size` é restrito às escalas quadradas que o Button já tem
// (icon/icon-xs/icon-sm/icon-md/icon-lg/icon-xl) — as escalas com padding
// horizontal (default/md/xs/sm/lg/xl) não fazem sentido pra um botão
// só-ícone. 2026-08-02: icon-md/icon-xl adicionados junto da escala nova
// do Button (md=40px/lg=48px/xl=56px).
type IconButtonSize = Extract<
  NonNullable<VariantProps<typeof buttonVariants>["size"]>,
  "icon" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg" | "icon-xl"
>

// Omite "icon" | "label" | "children" inteiros (não só restringe) — assim
// o tipo restante de React.ComponentProps<typeof Button> perde a união
// discriminada do ButtonContent (ver comentário longo em button.tsx sobre
// esse union) e vira um objeto "achatado" comum. Sem os três campos que
// causavam a união, dá pra repassar "...props" pro Button interno sem
// precisar do cast que outros wrappers (ex: InputGroupButton, ver
// input-group.tsx) precisam quando só omitem "size".
type IconButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "icon" | "label" | "children" | "size" | "aria-label"
> & {
  /** Ícone exibido — único conteúdo do botão, sempre obrigatório. */
  icon: React.ReactNode
  size?: IconButtonSize
  /** Nome acessível — obrigatório, IconButton nunca tem label visível. */
  "aria-label": string
}

function IconButton({
  variant = "default",
  size = "icon",
  icon,
  ...props
}: IconButtonProps) {
  return (
    <Button
      data-slot="icon-button"
      variant={variant}
      size={size}
      icon={icon}
      {...props}
    />
  )
}

// IconButton.Skeleton: reaproveita Button.Skeleton (que já é size-aware,
// incluindo as 4 escalas icon/icon-xs/icon-sm/icon-lg) em vez de duplicar
// as classes de placeholder — só restringe `size` às escalas quadradas e
// tira `fullWidth` (não faz sentido pra um botão só-ícone).
function IconButtonSkeleton({
  size = "icon",
  ...props
}: Omit<React.ComponentProps<typeof Button.Skeleton>, "size" | "fullWidth"> & {
  size?: IconButtonSize
}) {
  return <Button.Skeleton data-slot="icon-button-skeleton" size={size} {...props} />
}

// Object.assign (mesmo motivo do ButtonWithSkeleton/ChipWithSkeleton):
// `function IconButton(...)` não tem essa propriedade no seu tipo
// inferido, Object.assign devolve a interseção sem precisar de cast/any.
const IconButtonWithSkeleton = Object.assign(IconButton, {
  Skeleton: IconButtonSkeleton,
})

export { IconButtonWithSkeleton as IconButton, type IconButtonSize }
