"use client"

import * as React from "react"
import { BlocksIcon, ChevronDownIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { patternsList } from "@/lib/patterns-registry"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Grupo "Patterns" na navegação — mesmo padrão de accordion (clique no nome
// navega, chevron só abre/fecha) e de ícone+tooltip no modo recolhido já
// estabelecido em nav-components.tsx, aplicado aqui a uma categoria só
// (Patterns não usa atomic-registry — vive em patterns-registry.ts).
export function NavPatterns() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarGroup>
        <div className="flex items-center gap-1 pr-1 group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel asChild className="min-w-0 flex-1">
            <Link href="/patterns" className="gap-2 truncate hover:text-sidebar-foreground">
              <BlocksIcon className="size-4 shrink-0" />
              Patterns
            </Link>
          </SidebarGroupLabel>
          <CollapsibleTrigger
            className="flex size-6 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring [&[data-state=open]>svg]:rotate-180"
          >
            <ChevronDownIcon className="size-4 transition-transform duration-200" />
            <span className="sr-only">
              {isOpen ? "Recolher Patterns" : "Expandir Patterns"}
            </span>
          </CollapsibleTrigger>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/patterns"
              className="mx-auto hidden size-8 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:flex"
            >
              <BlocksIcon className="size-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            Patterns
          </TooltipContent>
        </Tooltip>

        <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {patternsList.map((item) => {
              const href = `/patterns/${item.slug}`
              const isActive = pathname === href

              return (
                <SidebarMenuItem key={item.slug}>
                  <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                    <Link href={href}>
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
