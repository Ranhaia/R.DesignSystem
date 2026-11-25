"use client"

import { PasswordInput } from "@/components/ui/password-input"

export default function PasswordInputDemo() {
  return (
    <div className="w-full max-w-sm">
      <PasswordInput label="Senha" name="senha" />
    </div>
  )
}
