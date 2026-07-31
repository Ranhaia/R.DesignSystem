"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const steps = ["Dados pessoais", "Endereço", "Pagamento", "Confirmação"]

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = React.useState(0)

  return (
    <div className="flex w-full flex-col gap-6">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        {steps.map((label) => (
          <StepperItem key={label}>
            <StepperTrigger>
              <StepperIndicator />
              <StepperTitle>{label}</StepperTitle>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>

      <p aria-live="polite" className="text-muted-foreground text-sm">
        Etapa {currentStep + 1} de {steps.length}: {steps[currentStep]}
      </p>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
          disabled={currentStep === 0}
        >
          Anterior
        </Button>
        <Button
          type="button"
          onClick={() =>
            setCurrentStep((step) => Math.min(steps.length - 1, step + 1))
          }
          disabled={currentStep === steps.length - 1}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
