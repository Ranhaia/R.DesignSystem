import { Textarea } from "@/components/ui/textarea"

export default function TextareaFixedLabel() {
  return (
    <Textarea
      label="Mensagem"
      placeholder="Escreva sua mensagem"
      className="max-w-sm"
    />
  )
}
