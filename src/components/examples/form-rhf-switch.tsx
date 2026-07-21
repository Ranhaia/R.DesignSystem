"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  twoFactor: z.boolean().refine((val) => val === true, {
    message: "É altamente recomendado ativar a autenticação de dois fatores.",
  }),
})

export default function FormRhfSwitch() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactor: false,
    },
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
      <CardHeader>
        <CardTitle>Configurações de segurança</CardTitle>
        <CardDescription>
          Gerencie as preferências de segurança da sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-switch" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="twoFactor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-switch-twoFactor">
                      Autenticação multifator
                    </FieldLabel>
                    <FieldDescription>
                      Ative a autenticação multifator para proteger sua
                      conta.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Switch
                    id="form-rhf-switch-twoFactor"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Redefinir
          </Button>
          <Button type="submit" form="form-rhf-switch">
            Salvar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
