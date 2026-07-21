import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaWithText() {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="message-2">Sua mensagem</Label>
      <Textarea placeholder="Digite sua mensagem aqui." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Sua mensagem será copiada para a equipe de suporte.
      </p>
    </div>
  )
}
