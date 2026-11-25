import { Icon } from "@/components/ui/icon"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

export default function TimelineIcones() {
  return (
    <Timeline className="w-full max-w-md">
      <TimelineItem>
        <TimelineMarker tone="destructive">
          <Icon name="error" />
        </TimelineMarker>
        <TimelineContent>
          <TimelineTitle>Falha na entrega</TimelineTitle>
          <TimelineTime dateTime="2026-11-22T10:05">22 nov, 10:05</TimelineTime>
          <TimelineDescription>Destinatário ausente. Nova tentativa amanhã.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker tone="primary">
          <Icon name="local_shipping" />
        </TimelineMarker>
        <TimelineContent>
          <TimelineTitle>Saiu para entrega</TimelineTitle>
          <TimelineTime dateTime="2026-11-22T07:30">22 nov, 07:30</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker>
          <Icon name="inventory_2" />
        </TimelineMarker>
        <TimelineContent>
          <TimelineTitle>Pedido separado</TimelineTitle>
          <TimelineTime dateTime="2026-11-21T16:00">21 nov, 16:00</TimelineTime>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
