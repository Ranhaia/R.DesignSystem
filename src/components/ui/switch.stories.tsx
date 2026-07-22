import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Switch } from "@/components/ui/switch"
import SwitchDemo from "@/components/examples/switch-demo"

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
    },
  },
  args: {
    size: "default" as never,
    disabled: false,
    checked: false,
    onCheckedChange: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Small: Story = { args: { size: "sm" as never } }

export const Checked: Story = { args: { checked: true } }

export const Disabled: Story = { args: { disabled: true } }

export const Examples: Story = {
  render: () => <SwitchDemo />,
}
