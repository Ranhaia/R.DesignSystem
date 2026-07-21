"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const steps = ["Dados pessoais", "Endereço", "Revisão"]

// Pattern: Multi-step Form — o ponto crítico de acessibilidade aqui é o
// gerenciamento de foco entre etapas: ao avançar/voltar, o foco é movido
// programaticamente pro heading da nova etapa (ref + tabIndex=-1 + focus()),
// senão quem navega por teclado/leitor de tela continua com o foco no botão
// "Avançar" sem perceber que o conteúdo da tela mudou. A região aria-live
// anuncia "Etapa X de Y" a cada mudança, e o Progress reforça visualmente.
export function MultiStepFormPattern() {
  const [step, setStep] = React.useState(0)
  const [data, setData] = React.useState({
    nome: "",
    email: "",
    cidade: "",
    estado: "",
  })
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  React.useEffect(() => {
    headingRef.current?.focus()
  }, [step])

  function next() {
    if (step === steps.length - 1) {
      toast.success("Cadastro enviado")
      setStep(0)
      setData({ nome: "", email: "", cidade: "", estado: "" })
      return
    }
    setStep((s) => s + 1)
  }

  function back() {
    setStep((s) => Math.max(0, s - 1))
  }

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="space-y-2">
        <Progress value={((step + 1) / steps.length) * 100} />
        <p aria-live="polite" className="text-muted-foreground text-xs">
          Etapa {step + 1} de {steps.length}: {steps[step]}
        </p>
      </div>

      <h3 ref={headingRef} tabIndex={-1} className="font-heading text-base font-semibold outline-none">
        {steps[step]}
      </h3>

      {step === 0 && (
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="msf-nome">Nome completo</FieldLabel>
            <FieldContent>
              <Input
                id="msf-nome"
                value={data.nome}
                onChange={(e) => setData((d) => ({ ...d, nome: e.target.value }))}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="msf-email">E-mail</FieldLabel>
            <FieldContent>
              <Input
                id="msf-email"
                type="email"
                value={data.email}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
              />
            </FieldContent>
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="msf-cidade">Cidade</FieldLabel>
            <FieldContent>
              <Input
                id="msf-cidade"
                value={data.cidade}
                onChange={(e) => setData((d) => ({ ...d, cidade: e.target.value }))}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="msf-estado">Estado</FieldLabel>
            <FieldContent>
              <Select
                value={data.estado}
                onValueChange={(value) => setData((d) => ({ ...d, estado: value }))}
              >
                <SelectTrigger id="msf-estado" className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </div>
      )}

      {step === 2 && (
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <dt className="text-muted-foreground">Nome</dt>
          <dd>{data.nome || "—"}</dd>
          <dt className="text-muted-foreground">E-mail</dt>
          <dd>{data.email || "—"}</dd>
          <dt className="text-muted-foreground">Cidade</dt>
          <dd>{data.cidade || "—"}</dd>
          <dt className="text-muted-foreground">Estado</dt>
          <dd>{data.estado || "—"}</dd>
        </dl>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={back} disabled={step === 0}>
          Voltar
        </Button>
        <Button onClick={next}>
          {step === steps.length - 1 ? "Concluir" : "Avançar"}
        </Button>
      </div>
    </div>
  )
}
