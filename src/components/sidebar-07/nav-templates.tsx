"use client"

import * as React from "react"
import { ChevronDownIcon, LayoutTemplateIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { templatesList } from "@/lib/templates-registry"
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

// Grupo "Templates" na navegação — mesmo padrão de accordion de
// nav-patterns.tsx (clique no nome navega pra página-índice, chevron só
// abre/fecha). Antes era um SidebarGroup estático com "Dashboard
// financeiro" como único item solto; agora "Dashboard financeiro" é só
// mais um item da lista (templates-registry.ts), igual Patterns/
// Components — pedido do Rafael em 2026-07-22.
export function NavTemplates() {
  const pathname = usePathname()
  // 2026-07-23: default false (fechado) — mesma decisão de
  // nav-components.tsx, pra sidebar carregar compacta.
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarGroup>
        <div className="flex items-center gap-1 pr-1 group-data-[collapsible=icon]:hidden max-md:gap-0.5">
          <SidebarGroupLabel asChild className="min-w-0 flex-1">
            <Link href="/templates" className="gap-2 truncate hover:text-sidebar-foreground">
              <LayoutTemplateIcon className="size-4 shrink-0 max-md:size-3.5" />
              Templates
            </Link>
          </SidebarGroupLabel>
          <CollapsibleTrigger
            className="flex size-6 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring max-md:size-5 [&[data-state=open]>svg]:rotate-180"
          >
            <ChevronDownIcon className="size-4 transition-transform duration-200 max-md:size-3.5" />
            <span className="sr-only">
              {isOpen ? "Recolher Templates" : "Expandir Templates"}
            </span>
          </CollapsibleTrigger>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/templates"
              className="mx-auto hidden size-8 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:flex"
            >
              <LayoutTemplateIcon className="size-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            Templates
          </TooltipContent>
        </Tooltip>

        <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {templatesList.map((item) => {
              const href = `/templates/${item.slug}`
              const isActive = pathname === href

              return (
                <SidebarMenuItem key={item.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.name}
                    size="sm"
                    className="max-md:h-6 max-md:text-[11px]"
                  >
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
