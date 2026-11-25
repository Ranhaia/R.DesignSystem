"use client"

import { NumberInput } from "@/components/ui/number-input"

export default function NumberInputDemo() {
  return (
    <div className="w-full max-w-48">
      <NumberInput aria-label="Quantidade" defaultValue={1} min={0} max={99} />
    </div>
  )
}
