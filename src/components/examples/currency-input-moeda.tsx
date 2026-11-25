"use client"

import { CurrencyInput } from "@/components/ui/currency-input"

export default function CurrencyInputMoeda() {
  return (
    <div className="w-full max-w-xs">
      <CurrencyInput aria-label="Valor em dólar" currency="USD" defaultValue={99.9} />
    </div>
  )
}
