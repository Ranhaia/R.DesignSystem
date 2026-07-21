"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Palette } from "lucide-react"

import { stylesList } from "@/lib/styles-registry"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const STORAGE_KEY = "style-preset"

export function StyleSwitcher() {
  const { isMobile } = useSidebar()
  const [active, setActive] = React.useState(stylesList[0])

  // Sincroniza com o que o script inline (ver layout.tsx) já aplicou no
  // <html> antes da hidratação, para não haver flash de estilo errado.
  React.useEffect(() => {
    const current = document.documentElement.dataset.style ?? "default"
    const match = stylesList.find((s) => s.value === current)
    if (match) setActive(match)
  }, [])

  function selectStyle(style: (typeof stylesList)[number]) {
    setActive(style)
    document.documentElement.dataset.style = style.value
    window.localStorage.setItem(STORAGE_KEY, style.value)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Palette className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-xs text-muted-foreground">
                  Estilo
                </span>
                <span className="truncate font-medium">{active.label}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Tokens de tema
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {stylesList.map((style) => (
              <DropdownMenuItem
                key={style.value}
                onClick={() => selectStyle(style)}
                className="items-start gap-2 p-2"
              >
                <div
                  className="mt-0.5 size-3.5 shrink-0 rounded-full border"
                  style={{ backgroundColor: style.swatch }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate">{style.label}</span>
                    {style.value === active.value && (
                      <Check className="ml-auto size-4 shrink-0" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs text-wrap">
                    {style.description}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
