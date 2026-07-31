"use client"

import * as React from "react"

import { TimePicker } from "@/components/ui/time-picker"

export default function TimePickerDemo() {
  const [time, setTime] = React.useState<string | undefined>("14:30")

  return (
    <div className="flex flex-col gap-2">
      <TimePicker value={time} onValueChange={setTime} />
      <p className="text-sm text-muted-foreground">
        Horário selecionado: {time ?? "nenhum"}
      </p>
    </div>
  )
}
