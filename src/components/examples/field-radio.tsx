import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

export default function FieldRadio() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldLabel>Plano de assinatura</FieldLabel>
        <FieldDescription>
          Os planos anual e vitalício oferecem economia significativa.
        </FieldDescription>
        <RadioGroup defaultValue="monthly">
          <Field orientation="horizontal">
            <RadioGroupItem value="monthly" id="plan-monthly" />
            <FieldLabel htmlFor="plan-monthly" className="font-normal">
              Mensal ($9,99/mês)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="yearly" id="plan-yearly" />
            <FieldLabel htmlFor="plan-yearly" className="font-normal">
              Anual ($99,99/ano)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="lifetime" id="plan-lifetime" />
            <FieldLabel htmlFor="plan-lifetime" className="font-normal">
              Vitalício ($299,99)
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </div>
  )
}
