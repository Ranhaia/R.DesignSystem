"use client"

import { NumberInput } from "@/components/ui/number-input"

export default function NumberInputDecimal() {
  return (
    <div className="w-full max-w-48">
      <NumberInput aria-label="Peso em kg" defaultValue={1250.5} step={0.5} min={0} />
    </div>
  )
}
