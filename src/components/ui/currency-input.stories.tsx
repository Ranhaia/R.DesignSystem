import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CurrencyInput } from "@/components/ui/currency-input"
import CurrencyInputDemo from "@/components/examples/currency-input-demo"
import CurrencyInputMoeda from "@/components/examples/currency-input-moeda"

const meta: Meta<typeof CurrencyInput> = {
  title: "Organisms/Currency Input",
  component: CurrencyInput,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CurrencyInput>

export const Default: Story = {
  render: () => <CurrencyInputDemo />,
}

export const OutraMoeda: Story = {
  render: () => <CurrencyInputMoeda />,
}
