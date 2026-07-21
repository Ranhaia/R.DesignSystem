import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputWithText() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email-2">E-mail</Label>
      <Input type="email" id="email-2" placeholder="E-mail" />
      <p className="text-sm text-muted-foreground">Digite seu endereço de e-mail.</p>
    </div>
  )
}
