"use client"

import * as React from "react"
import { PaletteIcon } from "lucide-react"

import { NavComponents } from "@/components/sidebar-07/nav-components"
import { NavPatterns } from "@/components/sidebar-07/nav-patterns"
import { NavTemplates } from "@/components/sidebar-07/nav-templates"
import { NavUser } from "@/components/sidebar-07/nav-user"
import { StyleSwitcher } from "@/components/style-switcher"
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

  return (
    // side="left" explícito — 2026-07-23: o Sheet mobile precisa abrir da
    // esquerda mesmo com o botão de hambúrguer ficando à direita do
    // header (pedido do Rafael, "seguir a ordem do clique": ver do
    // hambúrguer, no fim do header, pro menu, que recomeça do início da
    // tela). Já era o valor padrão de <Sidebar> antes desta linha — deixo
    // explícito pra não depender de um default que pode mudar.
    <Sidebar collapsible="icon" side="left" {...props}>
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
