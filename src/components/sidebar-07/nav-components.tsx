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
import {
  atomicRegistry,
  categoryHref as atomicCategoryHref,
  categoryLabels as atomicCategoryLabels,
  type AtomicCategory,
} from "@/lib/atomic-registry"
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

// Label e href vêm de atomic-registry.ts agora (2026-07-22) — única fonte,
// reaproveitada também pelo breadcrumb em app-shell.tsx (que precisava
// saber a categoria/rota de cada componente e antes linkava pra um
// "Componentes" que nunca existiu como página). "other" (utilitários) só
// existe aqui porque essa nav ainda referencia o tipo/ícone dele em código
// morto inofensivo (ver comentário mais abaixo) — não tem label nem href
// próprios no registro compartilhado, então completamos só o que falta.
const categoryLabels: Record<NavCategory, string> = {
  ...atomicCategoryLabels,
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
  ...atomicCategoryHref,
}

// Ordem fixa: segue a hierarquia Atomic Design (Atoms → Molecules →
// Organisms). "other" (utilitários, hoje só "direction") ficou de fora da
// nav a pedido do Rafael em 2026-07-22 — o PuzzleIcon que era dele foi
// reaproveitado no botão de troca de tema (StyleSwitcher). O item
// "direction" continua existindo e acessível por link direto
// (/components/direction), só não aparece mais como grupo na sidebar.
const categoryOrder: NavCategory[] = ["atom", "molecule", "organism"]

export function NavComponents() {
  const pathname = usePathname()

  // Cada grupo abre/fecha independente da navegação — clicar no NOME do
  // grupo (Link) leva pra página-índice da categoria; clicar no chevron
  // (Collapsible) só expande/recolhe a lista, sem navegar. Os dois
  // controles são elementos separados de propósito, pra não ter que
  // adivinhar a intenção de um clique só (Rafael pediu explicitamente
  // "garantir o clique pra página e o abrir e fechar" separados).
  //
  // 2026-07-23: default trocado pra false (categorias fechadas) — pedido
  // do Rafael pra sidebar carregar mais compacta, sem os 3 grupos já
  // expandidos ocupando a tela inteira.
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    { atom: false, molecule: false, organism: false, other: false }
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
              <div className="flex items-center gap-1 pr-1 group-data-[collapsible=icon]:hidden max-md:gap-0.5">
                {href ? (
                  <SidebarGroupLabel asChild className="min-w-0 flex-1">
                    <Link
                      href={href}
                      className="gap-2 truncate hover:text-sidebar-foreground"
                    >
                      <CategoryIcon className="size-4 shrink-0 max-md:size-3.5" />
                      {categoryLabels[category]}
                    </Link>
                  </SidebarGroupLabel>
                ) : (
                  <SidebarGroupLabel className="min-w-0 flex-1 gap-2">
                    <CategoryIcon className="size-4 shrink-0 max-md:size-3.5" />
                    {categoryLabels[category]}
                  </SidebarGroupLabel>
                )}
                <CollapsibleTrigger
                  className="flex size-6 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring max-md:size-5 [&[data-state=open]>svg]:rotate-180"
                >
                  <ChevronDownIcon className="size-4 transition-transform duration-200 max-md:size-3.5" />
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
                          size="sm"
                          className="max-md:h-6 max-md:text-[11px]"
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
