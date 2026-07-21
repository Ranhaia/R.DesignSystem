import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Digite sua mensagem aqui." />
      <Button>Enviar mensagem</Button>
    </div>
  )
}
