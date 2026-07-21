import { HomeIcon, SettingsIcon, UsersIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

const items = [
  { title: "Início", icon: HomeIcon },
  { title: "Time", icon: UsersIcon },
  { title: "Configurações", icon: SettingsIcon },
]

export default function SidebarDemo() {
  return (
    <div className="h-96 w-full overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-full">
        <Sidebar collapsible="none" className="h-full">
          <SidebarHeader className="p-3 text-sm font-medium">
            Meu projeto
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Área de conteúdo
        </div>
      </SidebarProvider>
    </div>
  )
}
