"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export default function ProgressCirculo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <Progress shape="circle" value={progress} aria-label="Progresso do envio" />
      <span className="text-sm text-muted-foreground tabular-nums">{progress}%</span>
    </div>
  )
}
