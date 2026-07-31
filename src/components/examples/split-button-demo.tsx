"use client"

import { SplitButton } from "@/components/ui/split-button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

export default function SplitButtonDemo() {
  return (
    <SplitButton label="Salvar" onClick={() => {}}>
      <DropdownMenuItem onClick={() => {}}>
        <Icon name="draft" />
        Salvar como rascunho
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => {}}>
        <Icon name="logout" />
        Salvar e sair
      </DropdownMenuItem>
    </SplitButton>
  )
}
