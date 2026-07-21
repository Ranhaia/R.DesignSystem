"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"

const apolices = [
  { numero: "AP-1042", titular: "Carla Souza" },
  { numero: "AP-1098", titular: "Marina Prado" },
  { numero: "AP-1157", titular: "João Batista" },
  { numero: "AP-1203", titular: "Renata Alves" },
]

// Pattern: Search Experience — InputGroup (Molecule já catalogada) com
// filtro em tempo real. A contagem de resultados é anunciada via
// aria-live="polite" pra quem usa leitor de tela, já que a lista filtrada
// muda sem navegação de página (mudança de conteúdo silenciosa senão).
export function SearchExperiencePattern() {
  const [query, setQuery] = React.useState("")

  const results = apolices.filter((item) =>
    `${item.numero} ${item.titular}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Buscar por número ou titular..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar apólice"
        />
      </InputGroup>

      <p aria-live="polite" className="text-muted-foreground text-xs">
        {results.length} resultado{results.length === 1 ? "" : "s"} encontrado
        {results.length === 1 ? "" : "s"}
      </p>

      {results.length > 0 ? (
        <div className="divide-y rounded-lg border">
          {results.map((item) => (
            <Item key={item.numero} size="sm">
              <ItemContent>
                <ItemTitle>{item.numero}</ItemTitle>
                <p className="text-muted-foreground text-sm">{item.titular}</p>
              </ItemContent>
            </Item>
          ))}
        </div>
      ) : (
        <Empty className="border py-8">
          <EmptyTitle>Nenhum resultado</EmptyTitle>
          <EmptyDescription>
            Tente buscar por outro número ou nome de titular.
          </EmptyDescription>
        </Empty>
      )}
    </div>
  )
}
