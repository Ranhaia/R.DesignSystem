import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldInput() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
            <Input id="username" type="text" placeholder="Max Leiter" />
            <FieldDescription>
              Escolha um nome de usuário exclusivo para sua conta.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <FieldDescription>
              Deve ter pelo menos 8 caracteres.
            </FieldDescription>
            <Input id="password" type="password" placeholder="••••••••" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
