"use client"

import * as React from "react"
import type { MaterialSymbol } from "material-symbols"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { componentsList } from "@/lib/components-registry"
import { atomicRegistry } from "@/lib/atomic-registry"
import { templatesList } from "@/lib/templates-registry"
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export type ComponentCategory = "atom" | "molecule" | "organism" | "template"

interface CategoryConfig {
  key: ComponentCategory
  label: string
  href: string
  icon: MaterialSymbol
  items: { slug: string; name: string; href: string }[]
}

// Grupo "Components" na navegação — agrupa Atoms, Molecules, Organisms e
// Templates sob um cabeçalho único "Components" (com link pra /components),
// conforme definido no Épico (E-documentacao-ds) e na História H-navegacao-design-system.
export function NavComponents() {
  const pathname = usePathname()
  const [isComponentsOpen, setIsComponentsOpen] = React.useState(true)
  const [openSubGroups, setOpenSubGroups] = React.useState<Record<string, boolean>>({
    atom: false,
    molecule: false,
    organism: false,
    template: false,
  })

  // Agrupamento dos componentes por camada Atomic Design + Templates:
  // - Atoms: inclui atoms e primitivos do atomic-registry (box, icon, label, etc.)
  // - Molecules: combinações de átomos
  // - Organisms: estruturas complexas com estado
  // - Templates: jornadas e páginas completas
  const categories: CategoryConfig[] = React.useMemo(
    () => [
      {
        key: "atom",
        label: "Atoms",
        href: "/atoms",
        icon: "orbit",
        items: componentsList
          .filter(
            (c) =>
              atomicRegistry[c.slug] === "atom" ||
              atomicRegistry[c.slug] === "primitive"
          )
          .map((c) => ({
            slug: c.slug,
            name: c.name,
            href: `/components/${c.slug}`,
          })),
      },
      {
        key: "molecule",
        label: "Molecules",
        href: "/molecules",
        icon: "call_merge",
        items: componentsList
          .filter((c) => atomicRegistry[c.slug] === "molecule")
          .map((c) => ({
            slug: c.slug,
            name: c.name,
            href: `/components/${c.slug}`,
          })),
      },
      {
        key: "organism",
        label: "Organisms",
        href: "/organisms",
        icon: "hub",
        items: componentsList
          .filter((c) => atomicRegistry[c.slug] === "organism")
          .map((c) => ({
            slug: c.slug,
            name: c.name,
            href: `/components/${c.slug}`,
          })),
      },
      {
        key: "template",
        label: "Templates",
        href: "/templates",
        icon: "space_dashboard",
        items: templatesList.map((t) => ({
          slug: t.slug,
          name: t.name,
          href: `/templates/${t.slug}`,
        })),
      },
    ],
    []
  )

  return (
    <Collapsible open={isComponentsOpen} onOpenChange={setIsComponentsOpen}>
      <SidebarGroup>
        {/* Cabeçalho expandido — Components (Link) + chevron do grupo */}
        <div className="flex items-center gap-1 pr-1 group-data-[collapsible=icon]:hidden max-md:gap-0.5">
          <SidebarGroupLabel asChild className="min-w-0 flex-1">
            <Link
              href="/components"
              className="gap-2 truncate hover:text-sidebar-foreground"
            >
              <Icon name="category" className="size-4 shrink-0 max-md:size-3.5" />
              Components
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
              {isComponentsOpen ? "Recolher Components" : "Expandir Components"}
            </span>
          </CollapsibleTrigger>
        </div>

        {/* Modo recolhido (ícone-only) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/components"
              className="mx-auto hidden size-8 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:flex"
            >
              <Icon name="category" size={1} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            Components
          </TooltipContent>
        </Tooltip>

        <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {categories.map((cat) => {
              const isSubOpen = openSubGroups[cat.key] ?? false
              const isSubActive = pathname === cat.href

              return (
                <Collapsible
                  key={cat.key}
                  open={isSubOpen}
                  onOpenChange={(open) =>
                    setOpenSubGroups((prev) => ({ ...prev, [cat.key]: open }))
                  }
                >
                  <SidebarMenuItem>
                    <div className="flex items-center gap-1 pr-1">
                      <SidebarMenuButton
                        asChild
                        isActive={isSubActive}
                        tooltip={cat.label}
                        size="sm"
                        className="min-w-0 flex-1 max-md:h-6 max-md:text-xs"
                      >
                        <Link href={cat.href}>
                          <Icon name={cat.icon} />
                          <span>{cat.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      <CollapsibleTrigger
                        className="flex size-6 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring max-md:size-5 [&[data-state=open]>svg]:rotate-180"
                      >
                        <Icon
                          name="keyboard_arrow_down"
                          className="size-4 transition-transform duration-200 max-md:size-3.5"
                        />
                        <span className="sr-only">
                          {isSubOpen
                            ? `Recolher ${cat.label}`
                            : `Expandir ${cat.label}`}
                        </span>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {cat.items.map((item) => {
                          const isItemActive = pathname === item.href

                          return (
                            <SidebarMenuSubItem key={item.slug}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isItemActive}
                                size="sm"
                              >
                                <Link href={item.href}>
                                  <span>{item.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
