import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectFloatingLabel() {
  return (
    <Select>
      <SelectTrigger label="Plano" animatedLabel className="w-56">
        <SelectValue placeholder="Selecione um plano" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="mensal">Mensal</SelectItem>
        <SelectItem value="anual">Anual</SelectItem>
      </SelectContent>
    </Select>
  )
}
