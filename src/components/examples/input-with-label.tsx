import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">E-mail</Label>
      <Input type="email" id="email" placeholder="E-mail" />
    </div>
  )
}
