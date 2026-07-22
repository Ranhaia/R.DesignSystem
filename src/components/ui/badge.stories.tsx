import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Badge } from "@/components/ui/badge"
import BadgeDemo from "@/components/examples/badge-demo"

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Destructive: Story = { args: { variant: "destructive" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Link: Story = { args: { variant: "link" } }

export const Examples: Story = {
  render: () => <BadgeDemo />,
}
