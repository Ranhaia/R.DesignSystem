"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { buscar } from "@/lib/busca-registry"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icon } from "@/components/ui/icon"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

// Busca nominal do catálogo: acha componente, pattern, template ou
// fundamento pelo nome e leva pra página dele. Abre pelo botão do header
// ou por ⌘K / Ctrl+K em qualquer página. A filtragem e a ordem vêm de
// busca-registry.ts (testada), não do filtro difuso do cmdk — por isso
// shouldFilter={false}.
export function BuscaComponentes() {
  const router = useRouter()
  const [aberto, setAberto] = React.useState(false)
  const [termo, setTermo] = React.useState("")
  const grupos = React.useMemo(() => buscar(termo), [termo])
  // Atalho exibido conforme o sistema; "Ctrl" até montar no cliente.
  const [ehMac, setEhMac] = React.useState(false)

  React.useEffect(() => {
    setEhMac(/mac|iphone|ipad/i.test(navigator.platform))
  }, [])

  React.useEffect(() => {
    function aoTeclar(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setAberto((v) => !v)
      }
    }
    document.addEventListener("keydown", aoTeclar)
    return () => document.removeEventListener("keydown", aoTeclar)
  }, [])

  function abrirOuFechar(v: boolean) {
    setAberto(v)
    if (!v) setTermo("")
  }

  function irPara(href: string) {
    abrirOuFechar(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setAberto(true)}
        className="gap-2 bg-sidebar text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Icon name="search" />
        <span className="hidden md:inline">Buscar no catálogo</span>
        <span className="sr-only md:hidden">Buscar no catálogo</span>
        <KbdGroup className="hidden md:inline-flex">
          <Kbd>{ehMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={aberto}
        onOpenChange={abrirOuFechar}
        shouldFilter={false}
        title="Buscar no catálogo"
        description="Digite o nome de um componente, pattern, template ou fundamento."
      >
        <CommandInput
          value={termo}
          onValueChange={setTermo}
          placeholder="Nome do componente, pattern ou template…"
        />
        <CommandList>
          <CommandEmpty>Nada com esse nome no catálogo.</CommandEmpty>
          {grupos.map((g) => (
            <CommandGroup key={g.grupo} heading={g.rotulo}>
              {g.itens.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.href}
                  onSelect={() => irPara(item.href)}
                >
                  {item.nome}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
