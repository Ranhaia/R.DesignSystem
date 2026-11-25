"use client"

import { DatePicker } from "@/components/ui/date-picker"

export default function DatePickerPeriodo() {
  return (
    <div className="w-full max-w-sm">
      <DatePicker mode="range" aria-label="Período da viagem" />
    </div>
  )
}
