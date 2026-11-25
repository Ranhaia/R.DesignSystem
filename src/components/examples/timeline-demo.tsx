import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

const eventos = [
  { titulo: "Pedido criado", quando: "2026-11-20T09:12", rotulo: "20 nov, 09:12", texto: "Ana Souza abriu o pedido #4821." },
  { titulo: "Pagamento aprovado", quando: "2026-11-20T09:15", rotulo: "20 nov, 09:15", texto: "Cartão final 4242." },
  { titulo: "Enviado", quando: "2026-11-21T14:40", rotulo: "21 nov, 14:40", texto: "Código de rastreio BR123456." },
]

export default function TimelineDemo() {
  return (
    <Timeline className="w-full max-w-md">
      {eventos.map((e) => (
        <TimelineItem key={e.titulo}>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>{e.titulo}</TimelineTitle>
            <TimelineTime dateTime={e.quando}>{e.rotulo}</TimelineTime>
            <TimelineDescription>{e.texto}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
