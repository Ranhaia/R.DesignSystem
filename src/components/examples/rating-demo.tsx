"use client"

import * as React from "react"

import { Rating } from "@/components/ui/rating"

export default function RatingDemo() {
  const [nota, setNota] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-2">
      <span id="nota-rotulo" className="text-sm font-medium">
        Como foi a entrega?
      </span>
      <Rating aria-labelledby="nota-rotulo" name="nota" allowHalf value={nota} onValueChange={setNota} />
    </div>
  )
}
