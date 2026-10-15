"use client"

import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

type StepState = "completed" | "current" | "upcoming"

function getStepState(step: number, value: number): StepState {
  if (step < value) return "completed"
  if (step === value) return "current"
  return "upcoming"
}

interface StepperContextValue {
  value: number
  onValueChange?: (step: number) => void
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepperContext(component: string) {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error(`${component} deve ser usado dentro de <Stepper>.`)
  }
  return context
}

interface StepItemContextValue {
  step: number
  state: StepState
}

const StepItemContext = React.createContext<StepItemContextValue | null>(null)

function useStepItemContext(component: string) {
  const context = React.useContext(StepItemContext)
  if (!context) {
    throw new Error(`${component} deve ser usado dentro de <StepperItem>.`)
  }
  return context
}

// Stepper: root controlado — `value` é o índice (0-based) da etapa atual,
// sempre fornecido pelo chamador (sem modo não-controlado/defaultValue, ver
// spec em docs/archive/componentes/stepper/spec.md). O índice de cada <StepperItem>
// filho é derivado automaticamente da posição dele nos `children` (igual ao
// comportamento real do @nimbus-ds/stepper, que também numera Stepper.Item
// automaticamente) — o chamador nunca precisa passar um número de etapa à
// mão. O conector entre etapas é gerado aqui mesmo (não é um subcomponente
// exportado) porque seu estado (completo/pendente) e orientação dependem só
// do Stepper, não de nada que o StepperItem precise expor.
function Stepper({
  value,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"ol">, "children"> & {
  value: number
  onValueChange?: (step: number) => void
  orientation?: "horizontal" | "vertical"
  children: React.ReactNode
}) {
  const items = React.Children.toArray(children)
  const lastIndex = items.length - 1

  return (
    <StepperContext.Provider value={{ value, onValueChange }}>
      <ol
        data-slot="stepper"
        data-orientation={orientation}
        className={cn(
          "group/stepper flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-start data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      >
        {items.map((child, index) => {
          const state = getStepState(index, value)
          return (
            <StepItemContext.Provider key={index} value={{ step: index, state }}>
              {child}
              {index !== lastIndex && (
                <li
                  aria-hidden="true"
                  data-slot="stepper-separator"
                  data-state={state}
                  className={cn(
                    "shrink-0 bg-border",
                    "group-data-[orientation=horizontal]/stepper:mt-4 group-data-[orientation=horizontal]/stepper:h-px group-data-[orientation=horizontal]/stepper:flex-1",
                    "group-data-[orientation=vertical]/stepper:ml-4 group-data-[orientation=vertical]/stepper:h-6 group-data-[orientation=vertical]/stepper:w-px",
                    state === "completed" && "bg-primary"
                  )}
                />
              )}
            </StepItemContext.Provider>
          )
        })}
      </ol>
    </StepperContext.Provider>
  )
}

// StepperItem: uma etapa. Não recebe prop de índice — o índice vem do
// StepItemContext, injetado pelo Stepper pai conforme a posição real do
// item na lista de children.
function StepperItem({
  className,
  children,
  ...props
}: React.ComponentProps<"li">) {
  const { state } = useStepItemContext("StepperItem")

  return (
    <li
      data-slot="stepper-item"
      data-state={state}
      className={cn(
        "flex shrink-0",
        "group-data-[orientation=horizontal]/stepper:flex-col group-data-[orientation=horizontal]/stepper:items-center group-data-[orientation=horizontal]/stepper:gap-1.5",
        "group-data-[orientation=vertical]/stepper:flex-row group-data-[orientation=vertical]/stepper:items-start group-data-[orientation=vertical]/stepper:gap-3",
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

// StepperTrigger: elemento clicável (ou não) que representa a etapa —
// agrupa Indicator + Title. Só vira <button> de verdade (focável via Tab,
// ativável via Enter/Space — comportamento nativo, sem handler de teclado
// customizado) quando o Stepper pai recebeu `onValueChange`; sem isso, o
// Stepper é só um indicador de progresso somente-leitura e o trigger
// renderiza como <div> não-interativo. aria-current="step" vai aqui (no
// elemento que representa a etapa), não no <li>, seguindo o padrão de
// steppers acessíveis (ex.: GOV.UK Design System aplica aria-current="step"
// no elemento clicável, não no item de lista).
function StepperTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { onValueChange } = useStepperContext("StepperTrigger")
  const { step, state } = useStepItemContext("StepperTrigger")
  const clickable = Boolean(onValueChange)

  const sharedClassName = cn(
    "flex items-center gap-2 rounded-md border border-transparent text-left outline-none transition-colors",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring",
    "group-data-[orientation=horizontal]/stepper:flex-col group-data-[orientation=horizontal]/stepper:text-center",
    clickable && "cursor-pointer",
    className
  )

  if (!clickable) {
    return (
      <div
        data-slot="stepper-trigger"
        data-state={state}
        aria-current={state === "current" ? "step" : undefined}
        className={sharedClassName}
        {...(props as React.ComponentProps<"div">)}
      />
    )
  }

  return (
    <button
      type="button"
      data-slot="stepper-trigger"
      data-state={state}
      aria-current={state === "current" ? "step" : undefined}
      onClick={(event) => {
        onClick?.(event)
        onValueChange?.(step)
      }}
      className={sharedClassName}
      {...props}
    />
  )
}

// StepperIndicator: círculo numerado. Na etapa concluída mostra um ícone de
// check — aria-hidden é aplicado de graça pelo próprio <Icon> (mesmo
// mecanismo hasA11yProp de icon.tsx: sem aria-label/role explícito, o Icon
// já força aria-hidden="true"), porque a informação "concluída" já está no
// data-state/texto, não só no ícone.
function StepperIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { step, state } = useStepItemContext("StepperIndicator")

  return (
    <span
      data-slot="stepper-indicator"
      data-state={state}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
        state === "upcoming" && "border-border bg-background text-muted-foreground",
        state === "current" && "border-primary bg-background text-primary",
        state === "completed" && "border-primary bg-primary text-primary-foreground",
        className
      )}
      {...props}
    >
      {state === "completed" ? <Icon name="check" size={1} /> : (children ?? step + 1)}
    </span>
  )
}

function StepperTitle({ className, ...props }: React.ComponentProps<"span">) {
  const { state } = useStepItemContext("StepperTitle")

  return (
    <span
      data-slot="stepper-title"
      data-state={state}
      className={cn(
        "text-sm font-medium",
        state === "upcoming" && "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperTitle }
