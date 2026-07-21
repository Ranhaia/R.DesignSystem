"use client"

import * as React from "react"
import {
  AtomIcon,
  ChevronDownIcon,
  CombineIcon,
  NetworkIcon,
  PuzzleIcon,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { componentsList } from "@/lib/components-registry"
import { atomicRegistry, type AtomicCategory } from "@/lib/atomic-registry"
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

type NavCategory = AtomicCategory | "other"

const categoryLabels: Record<NavCategory, string> = {
  atom: "Atoms",
  molecule: "Molecules",
  organism: "Organisms",
  other: "Outros",
}

// Um ícone por categoria (pedido do Rafael) — não por item individual.
// Escolha decorativa/de wayfinding: Atom literal pra Atoms, Combine
// (juntar peças) pra Molecules, Network (composição interconectada) pra
// Organisms, Puzzle pra utilitários/infra que não entram no catálogo.
const categoryIcons: Record<NavCategory, LucideIcon> = {
  atom: AtomIcon,
  molecule: CombineIcon,
  organism: NetworkIcon,
  other: PuzzleIcon,
}

// Só Atoms/Molecules/Organisms têm página-índice própria (Fase 1) —
// "other" (utilitários) não entra no catálogo visual.
const categoryHref: Partial<Record<NavCategory, string>> = {
  atom: "/atoms",
  molecule: "/molecules",
  organism: "/organisms",
}

// Ordem fixa: segue a hierarquia Atomic Design (Atoms → Molecules →
// Organisms), utilitários (direction, sonner) ficam por último.
const categoryOrder: NavCategory[] = ["atom", "molecule", "organism", "other"]

export function NavComponents() {
  const pathname = usePathname()

  // Cada grupo abre/fecha independente da navegação — clicar no NOME do
  // grupo (Link) leva pra página-índice da categoria; clicar no chevron
  // (Collapsible) só expande/recolhe a lista, sem navegar. Os dois
  // controles são elementos separados de propósito, pra não ter que
  // adivinhar a intenção de um clique só (Rafael pediu explicitamente
  // "garantir o clique pra página e o abrir e fechar" separados).
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    { atom: true, molecule: true, organism: true, other: true }
  )

  const groups = categoryOrder
    .map((category) => ({
      category,
      items: componentsList.filter(
        (item) => (atomicRegistry[item.slug] ?? "other") === category
      ),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <>
      {groups.map(({ category, items }) => {
        const href = categoryHref[category]
        const isOpen = openGroups[category] ?? true
        const CategoryIcon = categoryIcons[category]

        return (
          <Collapsible
            key={category}
            open={isOpen}
            onOpenChange={(open) =>
              setOpenGroups((prev) => ({ ...prev, [category]: open }))
            }
          >
            <SidebarGroup>
              {/* Cabeçalho expandido — nome do grupo (Link) + chevron de
                  abrir/fechar. Some de vista no modo ícone recolhido. */}
              <div className="flex items-center gap-1 pr-1 group-data-[collapsible=icon]:hidden">
                {href ? (
                  <SidebarGroupLabel asChild className="min-w-0 flex-1">
                    <Link
                      href={href}
                      className="gap-2 truncate hover:text-sidebar-foreground"
                    >
                      <CategoryIcon className="size-4 shrink-0" />
                      {categoryLabels[category]}
                    </Link>
                  </SidebarGroupLabel>
                ) : (
                  <SidebarGroupLabel className="min-w-0 flex-1 gap-2">
                    <CategoryIcon className="size-4 shrink-0" />
                    {categoryLabels[category]}
                  </SidebarGroupLabel>
                )}
                <CollapsibleTrigger
                  className="flex size-6 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring [&[data-state=open]>svg]:rotate-180"
                >
                  <ChevronDownIcon className="size-4 transition-transform duration-200" />
                  <span className="sr-only">
                    {isOpen
                      ? `Recolher ${categoryLabels[category]}`
                      : `Expandir ${categoryLabels[category]}`}
                  </span>
                </CollapsibleTrigger>
              </div>

              {/* Cabeçalho recolhido — só o ícone, com tooltip do nome da
                  categoria (mesmo padrão de "Folha de estilo"). Só existe
                  no modo ícone; escondido no modo expandido. */}
              <Tooltip>
                <TooltipTrigger asChild>
                  {href ? (
                    <Link
                      href={href}
                      className="mx-auto hidden size-8 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:flex"
                    >
                      <CategoryIcon className="size-4" />
                    </Link>
                  ) : (
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={categoryLabels[category]}
                      className="mx-auto hidden size-8 items-center justify-center rounded-md text-sidebar-foreground/70 group-data-[collapsible=icon]:flex"
                    >
                      <CategoryIcon className="size-4" />
                    </div>
                  )}
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  {categoryLabels[category]}
                </TooltipContent>
              </Tooltip>

              <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                <SidebarMenu>
                  {items.map((item) => {
                    const itemHref = `/components/${item.slug}`
                    const isActive = pathname === itemHref

                    return (
                      <SidebarMenuItem key={item.slug}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.name}
                        >
                          <Link href={itemHref}>
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
      })}
    </>
  )
}
