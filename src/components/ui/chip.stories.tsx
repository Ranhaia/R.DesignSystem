import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Chip } from "@/components/ui/chip"
import { Icon } from "@/components/ui/icon"
import ChipDemo from "@/components/examples/chip-demo"

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "ai-generated"],
    },
  },
  args: {
    children: "Categoria: Roupas",
    variant: "default",
    removable: false,
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof Chip>

export const Default: Story = {}

export const AiGenerated: Story = { args: { variant: "ai-generated" } }

export const Removable: Story = {
  args: { removable: true, onRemove: () => {} },
}

export const WithIcon: Story = {
  args: {
    removable: true,
    onRemove: () => {},
    icon: <Icon name="sell" />,
    children: "Promoção",
  },
}

export const Disabled: Story = {
  args: { removable: true, disabled: true },
}

export const Skeleton: Story = {
  render: () => <Chip.Skeleton />,
}

export const Examples: Story = {
  render: () => <ChipDemo />,
}
