"use client"

import * as React from "react"
import { PaletteIcon } from "lucide-react"

import { NavComponents } from "@/components/sidebar-07/nav-components"
import { NavPatterns } from "@/components/sidebar-07/nav-patterns"
import { NavTemplates } from "@/components/sidebar-07/nav-templates"
import { NavUser } from "@/components/sidebar-07/nav-user"
import { StyleSwitcher } from "@/components/style-switcher"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const user = {
  name: "Fulano",
  email: "fulano@detal.com",
  avatar: "/avatar.png",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // 2026-07-23: `side` de <Sidebar> serve tanto pro sidebar fixo do
  // desktop quanto pro Sheet do mobile (mesma prop, dois usos dentro de
  // ui/sidebar.tsx) — não dá pra fixar um valor só. Desktop continua
  // "left" (sidebar fixo à esquerda, comportamento de sempre). Mobile
  // passa a ser "right": Rafael corrigiu a decisão anterior — o Sheet
  // precisa abrir do MESMO lado do botão de hambúrguer, que fica à
  // direita do header no mobile.
  const side = isMobile ? "right" : "left"

  return (
    <Sidebar collapsible="icon" side={side} {...props}>
      <SidebarHeader>
        <StyleSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/estilo"} tooltip="Folha de estilo">
                <Link href="/estilo">
                  <PaletteIcon />
                  <span>Folha de estilo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavComponents />
        <NavPatterns />
        <NavTemplates />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
