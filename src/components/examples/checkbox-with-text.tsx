"use client"

import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxWithText() {
  return (
    <div className="items-top flex gap-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Aceitar os termos e condições
        </label>
        <p className="text-sm text-muted-foreground">
          Você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  )
}
