"use client"

import { DatePicker } from "@/components/ui/date-picker"

export default function DatePickerDigitavel() {
  return (
    <div className="w-full max-w-xs">
      <DatePicker aria-label="Data de nascimento" />
    </div>
  )
}
