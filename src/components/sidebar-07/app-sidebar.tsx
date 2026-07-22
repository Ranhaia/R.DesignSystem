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
    <Sidebar collapsible="icon" {...props}>
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
