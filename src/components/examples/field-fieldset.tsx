import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldFieldset() {
  return (
    <div className="w-full max-w-md space-y-6">
      <FieldSet>
        <FieldLegend>Informações de endereço</FieldLegend>
        <FieldDescription>
          Precisamos do seu endereço para entregar seu pedido.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="street">Endereço</FieldLabel>
            <Input id="street" type="text" placeholder="Rua Principal, 123" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="city">Cidade</FieldLabel>
              <Input id="city" type="text" placeholder="São Paulo" />
            </Field>
            <Field>
              <FieldLabel htmlFor="zip">CEP</FieldLabel>
              <Input id="zip" type="text" placeholder="01310-100" />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
