import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FieldSelect() {
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel>Departamento</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Escolha o departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engenharia</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Vendas</SelectItem>
            <SelectItem value="support">Suporte ao cliente</SelectItem>
            <SelectItem value="hr">Recursos Humanos</SelectItem>
            <SelectItem value="finance">Financeiro</SelectItem>
            <SelectItem value="operations">Operações</SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>
          Selecione seu departamento ou área de atuação.
        </FieldDescription>
      </Field>
    </div>
  )
}
