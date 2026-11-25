import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { NumberInput } from "@/components/ui/number-input"
import NumberInputDemo from "@/components/examples/number-input-demo"
import NumberInputDecimal from "@/components/examples/number-input-decimal"

const meta: Meta<typeof NumberInput> = {
  title: "Organisms/Number Input",
  component: NumberInput,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  render: () => <NumberInputDemo />,
}

export const Decimal: Story = {
  render: () => <NumberInputDecimal />,
}
