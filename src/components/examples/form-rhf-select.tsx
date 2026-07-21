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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const spokenLanguages = [
  { label: "Inglês", value: "en" },
  { label: "Espanhol", value: "es" },
  { label: "Francês", value: "fr" },
  { label: "Alemão", value: "de" },
  { label: "Italiano", value: "it" },
  { label: "Chinês", value: "zh" },
  { label: "Japonês", value: "ja" },
] as const

const formSchema = z.object({
  language: z
    .string()
    .min(1, "Selecione o idioma que você fala.")
    .refine((val) => val !== "auto", {
      message:
        "Detecção automática não é permitida. Selecione um idioma específico.",
    }),
})

export default function FormRhfSelect() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
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
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Preferências de idioma</CardTitle>
        <CardDescription>
          Selecione o idioma que você prefere falar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-select" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="language"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Idioma falado
                    </FieldLabel>
                    <FieldDescription>
                      Para melhores resultados, selecione o idioma que você
                      fala.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Automático</SelectItem>
                      <SelectSeparator />
                      {spokenLanguages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          <Button type="submit" form="form-rhf-select">
            Salvar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
