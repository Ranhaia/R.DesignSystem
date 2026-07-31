import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Box: primitivo de layout puro, sem estado — o mais básico do catálogo
// (mesma família de Separator/AspectRatio). Um <div> polimórfico (via
// asChild, mesmo mecanismo já usado em Chip/Badge/Button) sem props
// próprias de estilo.
//
// Decisão de escopo (ver docs/archive/componentes/box/spec.md para o raciocínio
// completo): a API real do @nimbus-ds/box expõe 100+ props de
// style-system (padding/margin com shorthands m/p/mt/mb/mx/my/pl/pr...,
// display, flex, grid, cor, borda, sombra, breakpoints responsivos
// xs/md/lg/xl/xxl, estados de interação hover/focus/active/disabled) —
// equivalente a um sistema Chakra UI inteiro. Este catálogo não tem (e
// não constrói aqui) um style-system próprio: só Tailwind + cva. Reimplementar
// cada prop do Nimbus como prop React 1:1 seria inventar uma segunda
// linguagem de estilo paralela ao Tailwind, sem necessidade — todo o
// espaço coberto por essas props já é alcançável direto via `className`
// com classes utilitárias (arbitrárias ou não) do Tailwind.
// Ficou de fora, deliberadamente: qualquer prop nomeada de estilo
// (padding/margin/display/flex/grid/cor/borda/sombra/breakpoint). Se um
// caso de uso futuro pedir muitas classes repetidas, a resposta é compor
// um componente próprio em cima de Box (ou usar cva local), não inflar
// este primitivo.
function Box({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "div"

  return <Comp data-slot="box" className={cn(className)} {...props} />
}

export { Box }
