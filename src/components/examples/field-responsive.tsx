import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function FieldResponsive() {
  return (
    <div className="w-full max-w-4xl">
      <form>
        <FieldSet>
          <FieldLegend>Perfil</FieldLegend>
          <FieldDescription>Preencha as informações do seu perfil.</FieldDescription>
          <FieldSeparator />
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <FieldDescription>
                  Informe seu nome completo para identificação
                </FieldDescription>
              </FieldContent>
              <Input id="name" placeholder="Evil Rabbit" required />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="lastName">Mensagem</FieldLabel>
                <FieldDescription>
                  Você pode escrever sua mensagem aqui. Mantenha-a curta,
                  preferencialmente com menos de 100 caracteres.
                </FieldDescription>
              </FieldContent>
              <Textarea
                id="message"
                placeholder="Olá, mundo!"
                required
                className="min-h-[100px] resize-none sm:min-w-[300px]"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <Button type="submit">Enviar</Button>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
