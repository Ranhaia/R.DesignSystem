import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function FieldSwitch() {
  return (
    <div className="w-full max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="2fa">Autenticação multifator</FieldLabel>
          <FieldDescription>
            Ative a autenticação multifator. Se você não tiver um dispositivo
            de dois fatores, pode usar um código único enviado para seu
            e-mail.
          </FieldDescription>
        </FieldContent>
        <Switch id="2fa" />
      </Field>
    </div>
  )
}
