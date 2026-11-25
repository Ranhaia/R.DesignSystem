"use client"

import { SearchInput } from "@/components/ui/search-input"

export default function SearchInputAtalho() {
  return (
    <div className="w-full max-w-sm">
      <SearchInput shortcut="/" placeholder="Buscar (aperte /)" />
    </div>
  )
}
