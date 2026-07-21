"use client"

import * as React from "react"
import { LayoutTemplateIcon, PaletteIcon } from "lucide-react"

import { NavComponents } from "@/components/sidebar-07/nav-components"
import { NavPatterns } from "@/components/sidebar-07/nav-patterns"
import { NavUser } from "@/components/sidebar-07/nav-user"
import { StyleSwitcher } from "@/components/style-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const user = {
  name: "Rafael",
  email: "rafanhaia@gmail.com",
  avatar: "",
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
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2">
            <LayoutTemplateIcon className="size-4 shrink-0" />
            Templates
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/templates/dashboard-financeiro"}
                tooltip="Dashboard financeiro"
              >
                <Link href="/templates/dashboard-financeiro">
                  <LayoutTemplateIcon />
                  <span>Dashboard financeiro</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
