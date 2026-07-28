"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Icon } from "@/components/ui/icon"
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

export default function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = React.useState(false)

  return (
    <ButtonGroup className="[--radius:9999rem]">
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <Icon name="add" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            placeholder={
              voiceEnabled ? "Grave e envie um áudio..." : "Envie uma mensagem..."
            }
            disabled={voiceEnabled}
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  size="icon-xs"
                  data-active={voiceEnabled}
                  className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                  aria-pressed={voiceEnabled}
                >
                  <Icon name="graphic_eq" />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Modo de voz</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
