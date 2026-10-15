"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Preferência manual de modo. Sem ela, vale o modo nativo do preset (styles-registry.ts);
// o script inline do layout.tsx lê a mesma chave antes da hidratação.
export const CHAVE_MODO = "tema-modo"

export function ModoTema() {
  const [escuro, setEscuro] = React.useState(false)

  // Acompanha a classe "dark" do <html>: ela também muda quando o preset troca sem preferência manual.
  React.useEffect(() => {
    const html = document.documentElement
    const ler = () => setEscuro(html.classList.contains("dark"))
    ler()
    const obs = new MutationObserver(ler)
    obs.observe(html, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  function alternar(valor: boolean) {
    document.documentElement.classList.toggle("dark", valor)
    try {
      window.localStorage.setItem(CHAVE_MODO, valor ? "escuro" : "claro")
    } catch {}
  }

  return (
    <div className="flex items-center justify-between gap-2 px-2 py-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
      <Label htmlFor="modo-tema" className="text-sm group-data-[collapsible=icon]:sr-only">
        Modo escuro
      </Label>
      <Switch id="modo-tema" checked={escuro} onCheckedChange={alternar} />
    </div>
  )
}
