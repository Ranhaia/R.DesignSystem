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
      <TabsList
        variant="line"
        className="w-full justify-start border-b rounded-none bg-transparent p-0"
      >
        {abas.map((aba) => (
          <TabsTrigger key={aba.id} value={aba.id}>
            {aba.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}
