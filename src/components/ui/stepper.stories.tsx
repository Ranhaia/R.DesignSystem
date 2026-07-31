import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"
import StepperDemo from "@/components/examples/stepper-demo"

const steps = ["Dados pessoais", "Endereço", "Confirmação"]

const meta: Meta<typeof Stepper> = {
  title: "Organisms/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    value: 1,
    orientation: "horizontal",
  },
}

export default meta

type Story = StoryObj<typeof Stepper>

export const Default: Story = {
  render: (args) => (
    <Stepper {...args}>
      {steps.map((label) => (
        <StepperItem key={label}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperTitle>{label}</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      ))}
    </Stepper>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Stepper {...args}>
      {steps.map((label) => (
        <StepperItem key={label}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperTitle>{label}</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      ))}
    </Stepper>
  ),
}

export const NaoClicavel: Story = {
  args: { value: 0, onValueChange: undefined },
  render: (args) => (
    <Stepper {...args}>
      {steps.map((label) => (
        <StepperItem key={label}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperTitle>{label}</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      ))}
    </Stepper>
  ),
}

export const Concluido: Story = {
  args: { value: steps.length - 1 },
  render: (args) => (
    <Stepper {...args}>
      {steps.map((label) => (
        <StepperItem key={label}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperTitle>{label}</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      ))}
    </Stepper>
  ),
}

export const Examples: Story = {
  render: () => <StepperDemo />,
}
