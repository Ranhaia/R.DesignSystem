"use client"

import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react"

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

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Seguir</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!">
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <VolumeOffIcon />
              Silenciar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckIcon />
              Marcar como lida
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertTriangleIcon />
              Denunciar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserRoundXIcon />
              Bloquear usuário
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareIcon />
              Compartilhar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              Copiar conversa
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Excluir conversa
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
