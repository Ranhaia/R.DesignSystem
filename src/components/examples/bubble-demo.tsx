import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

export default function BubbleDemo() {
  return (
    <BubbleGroup className="max-w-sm">
      <Bubble align="start" variant="muted">
        <BubbleContent>Oi! Como ficou o novo tema de tokens?</BubbleContent>
      </Bubble>
      <Bubble align="end" variant="default">
        <BubbleContent>
          Ficou bom — trocando o estilo já vejo tipografia, cor e sombra
          mudando juntos.
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}
