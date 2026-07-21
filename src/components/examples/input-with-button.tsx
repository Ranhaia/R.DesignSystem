import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="E-mail" />
      <Button type="submit" variant="outline">
        Inscrever-se
      </Button>
    </div>
  )
}
