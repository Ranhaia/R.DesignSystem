"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { componentsList } from "@/lib/components-registry"
import { patternsList } from "@/lib/patterns-registry"
import { AppSidebar } from "@/components/sidebar-07/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

function useBreadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") {
    return { section: null, page: "Visão geral" }
  }

  if (pathname === "/estilo") {
    return { section: null, page: "Folha de estilo" }
  }

  if (pathname === "/portfolio") {
    return { section: null, page: "Portfólio" }
  }

  if (pathname === "/atoms") {
    return { section: null, page: "Atoms" }
  }

  if (pathname === "/molecules") {
    return { section: null, page: "Molecules" }
  }

  if (pathname === "/organisms") {
    return { section: null, page: "Organisms" }
  }

  if (pathname === "/templates/dashboard-financeiro") {
    return { section: "Templates", page: "Dashboard financeiro" }
  }

  if (pathname === "/patterns") {
    return { section: null, page: "Patterns" }
  }

  const match = pathname.match(/^\/components\/(.+)$/)
  if (match) {
    const entry = componentsList.find((c) => c.slug === match[1])
    return { section: "Componentes", page: entry?.name ?? match[1] }
  }

  const patternMatch = pathname.match(/^\/patterns\/(.+)$/)
  if (patternMatch) {
    const entry = patternsList.find((p) => p.slug === patternMatch[1])
    return { section: "Patterns", page: entry?.name ?? patternMatch[1] }
  }

  return { section: null, page: pathname }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { section, page } = useBreadcrumb()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {section && (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/">{section}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{page}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
