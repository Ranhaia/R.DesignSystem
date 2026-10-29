"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { abaAtiva, type AbaItem } from "@/lib/doc-abas"

interface DocTabsProps {
  abas: AbaItem[]
  children: React.ReactNode
}

export function DocTabs({ abas, children }: DocTabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>("visao-geral")

  React.useEffect(() => {
    const syncFromHash = () => {
      const tab = abaAtiva(window.location.hash, abas)
      setActiveTab(tab)
    }

    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    window.addEventListener("popstate", syncFromHash)
    return () => {
      window.removeEventListener("hashchange", syncFromHash)
      window.removeEventListener("popstate", syncFromHash)
    }
  }, [abas])

  const handleValueChange = (tab: string) => {
    setActiveTab(tab)
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tab}`)
    }
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleValueChange}
      className="w-full space-y-6"
    >
      {/* Em celular as 5 abas passam da largura: a lista rola por dentro em vez de alargar a página.
          Só na horizontal: overflow-y-hidden tira a barra vertical (overflow-x sozinho a liga) e p-1 deixa o anel de foco (3 px) caber. */}
      <div className="overflow-x-auto overflow-y-hidden p-1">
        <TabsList
          variant="line"
          className="w-max min-w-full justify-start rounded-none border-b bg-transparent p-0"
        >
          {abas.map((aba) => (
            <TabsTrigger key={aba.id} value={aba.id}>
              {aba.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {children}
    </Tabs>
  )
}
