"use client"

import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

export default function SegmentedControlDemo() {
  return (
    <SegmentedControl aria-label="Período" defaultValue="semana">
      <SegmentedControlItem value="dia">Dia</SegmentedControlItem>
      <SegmentedControlItem value="semana">Semana</SegmentedControlItem>
      <SegmentedControlItem value="mes">Mês</SegmentedControlItem>
    </SegmentedControl>
  )
}
