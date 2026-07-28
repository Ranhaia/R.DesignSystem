import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function InputGroupIcon() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Buscar..." />
        <InputGroupAddon>
          <Icon name="search" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="Digite seu e-mail" />
        <InputGroupAddon>
          <Icon name="mail" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Número do cartão" />
        <InputGroupAddon>
          <Icon name="credit_card" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Icon name="check" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Número do cartão" />
        <InputGroupAddon align="inline-end">
          <Icon name="star" />
          <Icon name="info" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
