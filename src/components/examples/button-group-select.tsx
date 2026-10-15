"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

const CURRENCIES = [
  {
    value: "$",
    label: "Dólar americano",
  },
  {
    value: "€",
    label: "Euro",
  },
  {
    value: "£",
    label: "Libra esterlina",
  },
]

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = React.useState("$")

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="font-mono" aria-label="Moeda">{currency}</SelectTrigger>
          <SelectContent className="min-w-24">
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency.value}{" "}
                <span className="text-muted-foreground">{currency.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="10.00" pattern="[0-9]*" aria-label="Valor" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Enviar" size="icon" variant="outline">
          <Icon name="arrow_forward" />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
