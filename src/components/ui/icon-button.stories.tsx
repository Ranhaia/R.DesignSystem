import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"
import IconButtonDemo from "@/components/examples/icon-button-demo"

const meta: Meta<typeof IconButton> = {
  title: "Molecules/Icon Button",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
        "ai-primary",
        "ai-secondary",
      ],
    },
    size: {
      control: "select",
      options: ["icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
  args: {
    variant: "default",
    size: "icon",
    icon: <Icon name="favorite" />,
    "aria-label": "Favoritar",
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: <Icon name="delete" />,
    "aria-label": "Excluir",
  },
}

export const Disabled: Story = { args: { disabled: true } }

export const SizeXs: Story = { args: { size: "icon-xs" } }

export const SizeSm: Story = { args: { size: "icon-sm" } }

export const SizeLg: Story = { args: { size: "icon-lg" } }

export const Skeleton: Story = {
  render: () => <IconButton.Skeleton size="icon" />,
}

export const Examples: Story = {
  render: () => <IconButtonDemo />,
}
