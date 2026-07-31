import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
import SegmentedControlDemo from "@/components/examples/segmented-control-demo"

type SegmentedControlArgs = {
  size: "sm" | "default" | "lg"
  disabled: boolean
}

const meta: Meta<SegmentedControlArgs> = {
  title: "Molecules/SegmentedControl",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
  args: {
    size: "default",
    disabled: false,
  },
  render: ({ size, disabled }) => (
    <SegmentedControl
      aria-label="Período"
      size={size}
      disabled={disabled}
      defaultValue="semana"
    >
      <SegmentedControlItem value="dia">Dia</SegmentedControlItem>
      <SegmentedControlItem value="semana">Semana</SegmentedControlItem>
      <SegmentedControlItem value="mes">Mês</SegmentedControlItem>
    </SegmentedControl>
  ),
}

export default meta

type Story = StoryObj<SegmentedControlArgs>

export const Default: Story = {}

export const Small: Story = { args: { size: "sm" } }

export const Large: Story = { args: { size: "lg" } }

export const Disabled: Story = { args: { disabled: true } }

export const Examples: Story = {
  render: () => <SegmentedControlDemo />,
}
