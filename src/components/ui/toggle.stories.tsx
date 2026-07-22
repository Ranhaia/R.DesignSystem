import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Toggle } from "@/components/ui/toggle"
import ToggleDemo from "@/components/examples/toggle-demo"
import ToggleLg from "@/components/examples/toggle-lg"
import ToggleSm from "@/components/examples/toggle-sm"
import ToggleWithText from "@/components/examples/toggle-with-text"

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
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
    children: "Aa",
    variant: "default",
    size: "default",
    disabled: false,
    pressed: false,
    onPressedChange: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Toggle>

export const Default: Story = {}

export const Outline: Story = { args: { variant: "outline" } }

export const Pressed: Story = { args: { pressed: true } }

export const Disabled: Story = { args: { disabled: true } }

export const Examples: Story = {
  render: () => <ToggleDemo />,
}

export const Large: Story = {
  render: () => <ToggleLg />,
}

export const Small: Story = {
  render: () => <ToggleSm />,
}

export const WithText: Story = {
  render: () => <ToggleWithText />,
}
