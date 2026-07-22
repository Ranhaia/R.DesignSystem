import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ToggleGroupDemo from "@/components/examples/toggle-group-demo"
import ToggleGroupLg from "@/components/examples/toggle-group-lg"
import ToggleGroupSingle from "@/components/examples/toggle-group-single"
import ToggleGroupSm from "@/components/examples/toggle-group-sm"
import ToggleGroupSpacing from "@/components/examples/toggle-group-spacing"

type ToggleGroupArgs = {
  variant: "default" | "outline"
  size: "sm" | "default" | "lg"
  disabled: boolean
}

const meta: Meta<ToggleGroupArgs> = {
  title: "Molecules/Toggle Group",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
  },
  render: ({ variant, size, disabled }) => (
    <ToggleGroup type="single" variant={variant} size={size} disabled={disabled}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export default meta

type Story = StoryObj<ToggleGroupArgs>

export const Default: Story = {}

export const Outline: Story = { args: { variant: "outline" } }

export const Disabled: Story = { args: { disabled: true } }

export const Examples: Story = {
  render: () => <ToggleGroupDemo />,
}

export const Large: Story = {
  render: () => <ToggleGroupLg />,
}

export const Single: Story = {
  render: () => <ToggleGroupSingle />,
}

export const Small: Story = {
  render: () => <ToggleGroupSm />,
}

export const Spacing: Story = {
  render: () => <ToggleGroupSpacing />,
}
