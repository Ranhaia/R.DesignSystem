// Checker da adaptação à tela de todo conteúdo flutuante do DS. Cada story
// abre o componente com o gatilho colado numa borda/canto do viewport e
// pedindo um lado que não cabe; o play confere que ele virou e/ou deslizou
// pra dentro e nunca encosta na borda (margem FLOATING_COLLISION_PADDING).
// Mede o nó posicionado (pai do conteúdo): o conteúdo anima com scale e
// daria medida falsa.

import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor } from "storybook/test"

import { FLOATING_COLLISION_PADDING as PAD } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"

const meta: Meta = {
  title: "Testes/Adaptação à tela",
}
export default meta
type Story = StoryObj

type Side = "top" | "right" | "bottom" | "left"

async function expectInside(slot: string, expectedSide?: Side) {
  await waitFor(() => {
    const el = document.querySelector<HTMLElement>(`[data-slot="${slot}"]`)
    expect(el, slot).not.toBeNull()
    if (expectedSide) expect(el!.getAttribute("data-side"), `${slot} side`).toBe(expectedSide)
    const r = el!.parentElement!.getBoundingClientRect()
    expect(r.width).toBeGreaterThan(0)
    expect(r.top, `${slot} top`).toBeGreaterThanOrEqual(PAD)
    expect(r.left, `${slot} left`).toBeGreaterThanOrEqual(PAD)
    expect(r.bottom, `${slot} bottom`).toBeLessThanOrEqual(window.innerHeight - PAD)
    expect(r.right, `${slot} right`).toBeLessThanOrEqual(window.innerWidth - PAD)
  })
}

// Gatilho no canto inferior direito; conteúdo pede bottom/start com 320px →
// precisa virar pra cima e deslizar pra esquerda.
const corner: React.CSSProperties = { position: "fixed", right: 0, bottom: 0 }
const WIDE = "w-80"
const items = ["Um", "Dois", "Três", "Quatro", "Cinco", "Seis"]

// --- Tooltip: uma borda por story ------------------------------------------
const opposite: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" }
const pin: Record<Side, React.CSSProperties> = {
  top: { top: 0, left: "50%" },
  bottom: { bottom: 0, left: "50%" },
  left: { left: 0, top: "50%" },
  right: { right: 0, top: "50%" },
}
const tooltipEdge = (edge: Side): Story => ({
  render: () => (
    <Tooltip open>
      <TooltipTrigger asChild>
        <button style={{ position: "fixed", ...pin[edge] }}>gatilho</button>
      </TooltipTrigger>
      <TooltipContent side={edge}>Dica</TooltipContent>
    </Tooltip>
  ),
  play: () => expectInside("tooltip-content", opposite[edge]),
})
export const TooltipFlipFromTop = tooltipEdge("top")
export const TooltipFlipFromBottom = tooltipEdge("bottom")
export const TooltipFlipFromLeft = tooltipEdge("left")
export const TooltipFlipFromRight = tooltipEdge("right")
export const TooltipCorner: Story = {
  render: () => (
    <Tooltip open>
      <TooltipTrigger asChild>
        <button style={corner}>gatilho</button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" className={WIDE}>
        Texto longo o bastante para estourar a borda direita da tela
      </TooltipContent>
    </Tooltip>
  ),
  play: () => expectInside("tooltip-content", "top"),
}

// --- Superfícies -----------------------------------------------------------
export const PopoverCorner: Story = {
  render: () => (
    <Popover open>
      <PopoverTrigger asChild>
        <button style={corner}>gatilho</button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className={WIDE}>Conteúdo</PopoverContent>
    </Popover>
  ),
  play: () => expectInside("popover-content", "top"),
}

export const HoverCardCorner: Story = {
  render: () => (
    <HoverCard open>
      <HoverCardTrigger asChild>
        <button style={corner}>gatilho</button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" align="start" className={WIDE}>Conteúdo</HoverCardContent>
    </HoverCard>
  ),
  play: () => expectInside("hover-card-content", "top"),
}

// --- Menus (conteúdo + submenu) ---------------------------------------------
export const DropdownMenuCorner: Story = {
  render: () => (
    <DropdownMenu open modal={false}>
      <DropdownMenuTrigger asChild>
        <button style={corner}>gatilho</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className={WIDE}>
        <DropdownMenuItem>Item</DropdownMenuItem>
        <DropdownMenuSub open>
          <DropdownMenuSubTrigger>Mais</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {items.map((i) => <DropdownMenuItem key={i}>{i}</DropdownMenuItem>)}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async () => {
    await expectInside("dropdown-menu-content", "top")
    await expectInside("dropdown-menu-sub-content")
  },
}

export const MenubarCorner: Story = {
  render: () => (
    <Menubar value="m" style={corner}>
      <MenubarMenu value="m">
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent side="bottom" align="start" className={WIDE}>
          <MenubarItem>Item</MenubarItem>
          <MenubarSub open>
            <MenubarSubTrigger>Mais</MenubarSubTrigger>
            <MenubarSubContent>
              {items.map((i) => <MenubarItem key={i}>{i}</MenubarItem>)}
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async () => {
    await expectInside("menubar-content", "top")
    await expectInside("menubar-sub-content")
  },
}

export const ContextMenuCorner: Story = {
  render: () => (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <div data-testid="area" style={{ ...corner, width: 120, height: 80 }}>área</div>
      </ContextMenuTrigger>
      <ContextMenuContent className={WIDE}>
        <ContextMenuItem>Item</ContextMenuItem>
        <ContextMenuSub open>
          <ContextMenuSubTrigger>Mais</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {items.map((i) => <ContextMenuItem key={i}>{i}</ContextMenuItem>)}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    // Context menu não tem open controlado: clique direito rente à borda de
    // baixo. Na horizontal fica a 60px: no eixo em que abre, o menu encosta
    // no cursor por design (como o nativo), então 1px da borda não cabe margem.
    const area = canvasElement.ownerDocument.querySelector('[data-testid="area"]')!
    area.dispatchEvent(
      new MouseEvent("contextmenu", {
        bubbles: true,
        clientX: window.innerWidth - 60,
        clientY: window.innerHeight - 1,
      })
    )
    await expectInside("context-menu-content")
    await expectInside("context-menu-sub-content")
  },
}

// --- Seleção ----------------------------------------------------------------
export const SelectPopperCorner: Story = {
  render: () => (
    <Select open>
      <SelectTrigger style={corner}>
        <SelectValue placeholder="Escolha" />
      </SelectTrigger>
      <SelectContent position="popper" side="bottom" align="start" className={WIDE}>
        {items.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
      </SelectContent>
    </Select>
  ),
  play: () => expectInside("select-content", "top"),
}

// Âncora explícita no wrapper rente à borda: ancorado no <input> (que termina
// antes do botão de seta) o base-ui só vira o alinhamento e nunca colide.
function ComboboxAtCorner() {
  const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null)
  return (
    <Combobox open items={items}>
      <div ref={setAnchor} style={corner}>
        <ComboboxInput placeholder="Buscar" />
      </div>
      <ComboboxContent anchor={anchor} className={WIDE}>
        <ComboboxList>
          {(i: string) => <ComboboxItem key={i} value={i}>{i}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
export const ComboboxCorner: Story = {
  render: () => <ComboboxAtCorner />,
  play: () => expectInside("combobox-content", "top"),
}
