import { HelpCircle, InfoIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function InputGroupTooltip() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Digite a senha" type="password" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label="Informações"
                size="icon-xs"
              >
                <InfoIcon />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>A senha deve ter pelo menos 8 caracteres</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Seu endereço de e-mail" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label="Ajuda"
                size="icon-xs"
              >
                <HelpCircle />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Vamos usar isso para enviar notificações a você</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Digite a chave de API" />
        <Tooltip>
          <TooltipTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton
                variant="ghost"
                aria-label="Ajuda"
                size="icon-xs"
              >
                <HelpCircle />
              </InputGroupButton>
            </InputGroupAddon>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Clique para obter ajuda sobre chaves de API</p>
          </TooltipContent>
        </Tooltip>
      </InputGroup>
    </div>
  )
}
