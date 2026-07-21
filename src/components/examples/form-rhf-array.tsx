"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Informe um endereço de e-mail válido."),
      })
    )
    .min(1, "Adicione pelo menos um endereço de e-mail.")
    .max(5, "Você pode adicionar até 5 endereços de e-mail."),
})

export default function FormRhfArray() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [{ address: "" }, { address: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Você enviou os seguintes valores:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="border-b">
        <CardTitle>E-mails de contato</CardTitle>
        <CardDescription>Gerencie seus endereços de e-mail de contato.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-array" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="gap-4">
            <FieldLegend variant="label">Endereços de e-mail</FieldLegend>
            <FieldDescription>
              Adicione até 5 endereços de e-mail para contato.
            </FieldDescription>
            <FieldGroup className="gap-4">
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`emails.${index}.address`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-rhf-array-email-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="nome@exemplo.com"
                            type="email"
                            autoComplete="email"
                          />
                          {fields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => remove(index)}
                                aria-label={`Remover e-mail ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ address: "" })}
                disabled={fields.length >= 5}
              >
                Adicionar endereço de e-mail
              </Button>
            </FieldGroup>
            {form.formState.errors.emails?.root && (
              <FieldError errors={[form.formState.errors.emails.root]} />
            )}
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Redefinir
          </Button>
          <Button type="submit" form="form-rhf-array">
            Salvar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
