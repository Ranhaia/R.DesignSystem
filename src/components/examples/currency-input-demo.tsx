"use client"

import { CurrencyInput } from "@/components/ui/currency-input"

export default function CurrencyInputDemo() {
  return (
    <div className="w-full max-w-xs">
      <CurrencyInput aria-label="Valor do seguro" defaultValue={1500} />
    </div>
  )
}
