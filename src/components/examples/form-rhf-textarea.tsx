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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  about: z
    .string()
    .min(10, "Informe pelo menos 10 caracteres.")
    .max(200, "Mantenha o texto com menos de 200 caracteres."),
})

export default function FormRhfTextarea() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: "",
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
        <CardTitle>Personalização</CardTitle>
        <CardDescription>
          Personalize sua experiência nos contando mais sobre você.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-textarea" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="about"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-textarea-about">
                    Mais sobre você
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-textarea-about"
                    aria-invalid={fieldState.invalid}
                    placeholder="Sou engenheiro(a) de software..."
                    className="min-h-[120px]"
                  />
                  <FieldDescription>
                    Conte mais sobre você. Isso será usado para personalizar
                    sua experiência.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
          <Button type="submit" form="form-rhf-textarea">
            Salvar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
