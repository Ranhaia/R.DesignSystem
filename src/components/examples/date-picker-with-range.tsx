"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { formatarDataCurta } from "@/lib/date-formatters"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              // w-[340px] — "qui, 20/01/2022" x2 (pt-BR com dia da semana)
              // é mais longo que "Jan 20, 2022" em inglês.
              "w-[340px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {formatarDataCurta(date.from)} –{" "}
                  {formatarDataCurta(date.to)}
                </>
              ) : (
                formatarDataCurta(date.from)
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
