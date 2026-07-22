import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import BubbleDemo from "@/components/examples/bubble-demo"

const meta: Meta<typeof Bubble> = {
  title: "Organisms/Bubble",
  component: Bubble,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "muted",
        "tinted",
        "outline",
        "ghost",
        "destructive",
      ],
    },
  },
  args: {
    variant: "default",
    className: "max-w-none",
  },
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent>Mensagem de exemplo</BubbleContent>
    </Bubble>
  ),
}

export default meta

type Story = StoryObj<typeof Bubble>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Muted: Story = { args: { variant: "muted" } }

export const Tinted: Story = { args: { variant: "tinted" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Destructive: Story = { args: { variant: "destructive" } }

export const Examples: Story = {
  render: () => <BubbleDemo />,
}
