"use client"

import * as React from "react"
import { SlidersHorizontalIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const categorias = ["Auto", "Residencial", "Vida", "Saúde"] as const

const apolices = [
  { numero: "AP-1042", categoria: "Auto" },
  { numero: "AP-1098", categoria: "Residencial" },
  { numero: "AP-1157", categoria: "Vida" },
  { numero: "AP-1203", categoria: "Auto" },
  { numero: "AP-1244", categoria: "Saúde" },
]

// Pattern: Filters — Popover (Molecule já catalogada) como painel de
// filtros + Badges removíveis mostrando o que está aplicado. A contagem de
// resultados é anunciada via aria-live, e cada Badge de filtro tem um botão
// "remover" com aria-label descritivo (não só um ícone de X sem contexto).
export function FiltersPattern() {
  const [selected, setSelected] = React.useState<string[]>([])

  function toggle(categoria: string) {
    setSelected((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    )
  }

  const filtered =
    selected.length === 0
      ? apolices
      : apolices.filter((a) => selected.includes(a.categoria))

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontalIcon />
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 space-y-3">
            <p className="text-sm font-medium">Categoria</p>
            {categorias.map((categoria) => (
              <div key={categoria} className="flex items-center gap-2">
                <Checkbox
                  id={`filter-${categoria}`}
                  checked={selected.includes(categoria)}
                  onCheckedChange={() => toggle(categoria)}
                />
                <Label htmlFor={`filter-${categoria}`}>{categoria}</Label>
              </div>
            ))}
          </PopoverContent>
        </Popover>

        {selected.map((categoria) => (
          <Badge key={categoria} variant="secondary" className="gap-1">
            {categoria}
            <button
              type="button"
              aria-label={`Remover filtro ${categoria}`}
              onClick={() => toggle(categoria)}
              className="rounded-full hover:bg-secondary-foreground/10"
            >
              <XIcon className="size-3" />
            </button>
          </Badge>
        ))}
      </div>

      <p aria-live="polite" className="text-muted-foreground text-xs">
        {filtered.length} apólice{filtered.length === 1 ? "" : "s"} encontrada
        {filtered.length === 1 ? "" : "s"}
      </p>

      <div className="divide-y rounded-lg border">
        {filtered.map((item) => (
          <div key={item.numero} className="flex items-center justify-between px-4 py-2 text-sm">
            <span>{item.numero}</span>
            <span className="text-muted-foreground">{item.categoria}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
