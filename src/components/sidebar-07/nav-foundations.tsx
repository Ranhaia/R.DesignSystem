"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { foundationsList } from "@/lib/foundations-registry"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Icon } from "@/components/ui/icon"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Grupo "Foundations" na navegação — segue a mesma convenção de accordion
// (clique no nome navega pra página-índice /fundamentos, chevron expande/recolhe)
// estabelecido em nav-patterns.tsx e nav-components.tsx.
export function NavFoundations() {
  const pathname = usePathname()
  // Default fechado para carregar compacto, abrindo sob demanda do usuário.
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarGroup>
        <div className="flex items-center gap-1 pr-1 group-data-[collapsible=icon]:hidden max-md:gap-0.5">
          <SidebarGroupLabel asChild className="min-w-0 flex-1">
            <Link
              href="/fundamentos"
              className="gap-2 truncate hover:text-sidebar-foreground"
            >
              <Icon name="foundation" className="size-4 shrink-0 max-md:size-3.5" />
              Foundations
            </Link>
          </SidebarGroupLabel>
          <CollapsibleTrigger
            className="flex size-6 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring max-md:size-5 [&[data-state=open]>svg]:rotate-180"
          >
            <Icon
              name="keyboard_arrow_down"
              className="size-4 transition-transform duration-200 max-md:size-3.5"
            />
            <span className="sr-only">
              {isOpen ? "Recolher Foundations" : "Expandir Foundations"}
            </span>
          </CollapsibleTrigger>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/fundamentos"
              className="mx-auto hidden size-8 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:flex"
            >
              <Icon name="foundation" size={1} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            Foundations
          </TooltipContent>
        </Tooltip>

        <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {foundationsList.map((item) => {
              const isActive = pathname === item.href

              return (
                <SidebarMenuItem key={item.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.name}
                    size="sm"
                    className="max-md:h-6 max-md:text-xs"
                  >
                    <Link href={item.href}>
                      <Icon name={item.icon} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
