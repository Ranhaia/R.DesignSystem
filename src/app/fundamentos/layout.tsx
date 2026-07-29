"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const tabs = [
  { href: "/fundamentos/tipografia", label: "Tipografia" },
  { href: "/fundamentos/cores", label: "Cores" },
  { href: "/fundamentos/elevacao", label: "Elevação" },
  { href: "/fundamentos/espacamento", label: "Espaçamento" },
  { href: "/fundamentos/bordas", label: "Bordas" },
]

export default function FundamentosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Fundamentos
        </h1>
        <p className="text-muted-foreground text-sm">
          Tokens primitivos do Design System — a base sobre a qual todos os
          componentes são construídos. Valores lidos ao vivo do estilo ativo.
        </p>
      </div>

      <nav className="border-b">
        <ul className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={cn(
                    "inline-flex items-center border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {children}
    </div>
  )
}
