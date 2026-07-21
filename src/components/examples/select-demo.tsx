import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione uma fruta" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frutas</SelectLabel>
          <SelectItem value="apple">Maçã</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Mirtilo</SelectItem>
          <SelectItem value="grapes">Uvas</SelectItem>
          <SelectItem value="pineapple">Abacaxi</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
