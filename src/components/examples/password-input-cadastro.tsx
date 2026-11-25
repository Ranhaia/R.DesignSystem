"use client"

import { PasswordInput } from "@/components/ui/password-input"

export default function PasswordInputCadastro() {
  return (
    <div className="w-full max-w-sm">
      <PasswordInput variant="new" label="Crie uma senha" name="nova-senha" />
    </div>
  )
}
