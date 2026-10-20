import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Text } from "@/components/ui/text"
import TextDemo from "@/components/examples/text-demo"

const meta: Meta<typeof Text> = {
  title: "Primitivos/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span", "div"],
    },
    size: {
      control: "select",
      options: ["caption", "base", "highlight"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "bold"],
    },
    muted: {
      control: "boolean",
    },
  },
  args: {
    children: "O rápido cão marrom pula sobre o cachorro preguiçoso.",
    as: "p",
    size: "base",
    weight: "regular",
    muted: false,
  },
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {}

export const Caption: Story = { args: { size: "caption" } }

export const Highlight: Story = { args: { size: "highlight" } }

export const Bold: Story = { args: { weight: "bold" } }

export const Muted: Story = { args: { muted: true } }

export const AsSpan: Story = { args: { as: "span" } }

export const Examples: Story = {
  render: () => <TextDemo />,
}
