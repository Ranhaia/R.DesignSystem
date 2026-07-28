"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Seguir</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!">
            <Icon name="keyboard_arrow_down" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="volume_off" />
              Silenciar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="check" />
              Marcar como lida
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="warning" />
              Denunciar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="person_cancel" />
              Bloquear usuário
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="share" />
              Compartilhar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="content_copy" />
              Copiar conversa
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <Icon name="delete" />
              Excluir conversa
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
