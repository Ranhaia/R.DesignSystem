"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import {
  atomicRegistry,
  categoryHref,
  categoryLabels,
} from "@/lib/atomic-registry"
import { componentsList } from "@/lib/components-registry"
import { patternsList } from "@/lib/patterns-registry"
import { templatesList } from "@/lib/templates-registry"
import { AppSidebar } from "@/components/sidebar-07/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

// 2026-07-22: antes o crumb intermediário (`section`) sempre linkava pra
// "/" independente do texto — e a página de componente usava um bucket
// fixo "Componentes" que nunca teve rota própria (só existem índices por
// categoria: /atoms, /molecules, /organisms). Rafael pegou o link morto.
// Agora cada `section` vem com o `sectionHref` real, e a categoria de
// /components/[slug] usa o mesmo atomic-registry.ts que a nav lateral
// (categoryLabels/categoryHref) — única fonte, sem bucket inventado.
function useBreadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") {
    return { section: null, sectionHref: null, page: "Visão geral" }
  }

  if (pathname === "/estilo") {
    return { section: null, sectionHref: null, page: "Folha de estilo" }
  }

  if (pathname === "/portfolio") {
    return { section: null, sectionHref: null, page: "Portfólio" }
  }

  if (pathname === "/atoms") {
    return { section: null, sectionHref: null, page: "Atoms" }
  }

  if (pathname === "/molecules") {
    return { section: null, sectionHref: null, page: "Molecules" }
  }

  if (pathname === "/organisms") {
    return { section: null, sectionHref: null, page: "Organisms" }
  }

  if (pathname === "/templates") {
    return { section: null, sectionHref: null, page: "Templates" }
  }

  if (pathname === "/patterns") {
    return { section: null, sectionHref: null, page: "Patterns" }
  }

  const componentMatch = pathname.match(/^\/components\/(.+)$/)
  if (componentMatch) {
    const entry = componentsList.find((c) => c.slug === componentMatch[1])
    const category = atomicRegistry[componentMatch[1]]
    return {
      // Utilitários fora do atomicRegistry (ex: "direction") não têm
      // categoria/índice — ficam sem crumb de seção, só o nome da página.
      section: category ? categoryLabels[category] : null,
      sectionHref: category ? categoryHref[category] : null,
      page: entry?.name ?? componentMatch[1],
    }
  }

  const patternMatch = pathname.match(/^\/patterns\/(.+)$/)
  if (patternMatch) {
    const entry = patternsList.find((p) => p.slug === patternMatch[1])
    return {
      section: "Patterns",
      sectionHref: "/patterns",
      page: entry?.name ?? patternMatch[1],
    }
  }

  const templateMatch = pathname.match(/^\/templates\/(.+)$/)
  if (templateMatch) {
    const entry = templatesList.find((t) => t.slug === templateMatch[1])
    return {
      section: "Templates",
      sectionHref: "/templates",
      page: entry?.name ?? templateMatch[1],
    }
  }

  return { section: null, sectionHref: null, page: pathname }
}

// 2026-07-23: hambúrguer específico do mobile, pedido pelo Rafael — o
// SidebarTrigger "oficial" (ui/sidebar.tsx) usa PanelLeftIcon, que é a
// convenção do padrão shadcn sidebar-07 e continua assim no desktop
// (não alteramos o componente compartilhado, ele é usado como referência
// de doc em component-docs.ts). No mobile o pedido foi por um ícone de
// menu hambúrguer de fato (3 linhas), então este botão reaproveita
// toggleSidebar() direto do hook em vez de estender o SidebarTrigger.
function MobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      onClick={toggleSidebar}
    >
      <MenuIcon />
      <span className="sr-only">Abrir menu</span>
    </Button>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { section, sectionHref, page } = useBreadcrumb()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* 2026-07-23: header fixo (sticky) — pedido do Rafael pra manter
            acesso ao menu/breadcrumb ao rolar a página.
            2026-07-23 (ajuste): bg-sidebar/text-sidebar-foreground em vez
            de bg-background — Rafael pediu pro header usar o mesmo fundo
            do menu lateral (mesmo par bg/foreground que ui/sidebar.tsx já
            usa nos dois lugares dele). border-b continua sem token
            especial (border-border padrão), igual à própria borda que
            separa o Sidebar do conteúdo em ui/sidebar.tsx.
            Breadcrumb (o componente que identifica em que página/seção o
            usuário está) agora fica visível em qualquer largura — só o
            trigger+separador desktop (redundante com o hambúrguer no
            mobile) somem em telas pequenas. O hambúrguer mobile fica à
            direita (ml-auto) enquanto o breadcrumb ocupa a esquerda —
            justify-between no header cuida do espaçamento entre os dois
            grupos. */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-sidebar text-sidebar-foreground transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hidden md:flex" />
            <Separator
              orientation="vertical"
              className="mr-2 hidden bg-sidebar-border data-[orientation=vertical]:h-4 md:flex"
            />
            <Breadcrumb>
              {/* Breadcrumb usa text-muted-foreground/text-foreground por
                  padrão — tokens genéricos pensados pra bg-background, não
                  pra bg-sidebar. Sobrescrevo pra text-sidebar-foreground
                  (com /70 no trail, igual ao padrão que ui/sidebar.tsx já
                  usa em SidebarGroupLabel) pra garantir contraste correto
                  em qualquer preset — mesma classe de bug que já foi
                  corrigida em Dialog/Sheet/Tooltip quando os tokens de
                  superfície não combinavam com o texto por cima. */}
              <BreadcrumbList className="text-sidebar-foreground/70">
                {section && (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink
                        href={sectionHref ?? "/"}
                        className="hover:text-sidebar-foreground"
                      >
                        {section}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sidebar-foreground">
                    {page}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4 md:hidden">
            <MobileSidebarTrigger />
          </div>
        </header>
        {/* 2026-07-23: pt-6 (24px) em vez de pt-0 — header sticky não
            empurra mais o conteúdo pra baixo por fluxo normal, então o
            respiro entre o topo fixo e o conteúdo precisa ser explícito.
            Rafael pediu 24px certinho (não o 16px genérico do p-4). */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-6">{children}</div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
