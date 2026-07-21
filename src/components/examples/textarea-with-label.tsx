import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="message">Sua mensagem</Label>
      <Textarea placeholder="Digite sua mensagem aqui." id="message" />
    </div>
  )
}
