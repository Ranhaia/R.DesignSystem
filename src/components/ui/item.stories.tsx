import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Item } from "@/components/ui/item"
import ItemDemo from "@/components/examples/item-demo"
import ItemAvatar from "@/components/examples/item-avatar"
import ItemDropdown from "@/components/examples/item-dropdown"
import ItemGroup from "@/components/examples/item-group"
import ItemHeader from "@/components/examples/item-header"
import ItemIcon from "@/components/examples/item-icon"
import ItemImage from "@/components/examples/item-image"
import ItemLink from "@/components/examples/item-link"
import ItemSize from "@/components/examples/item-size"
import ItemVariant from "@/components/examples/item-variant"

const meta: Meta<typeof Item> = {
  title: "Atoms/Item",
  component: Item,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
    },
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
  args: {
    children: "Item de exemplo",
    variant: "default",
    size: "default",
    className: "text-sm",
  },
}

export default meta

type Story = StoryObj<typeof Item>

export const Default: Story = {}

export const Outline: Story = { args: { variant: "outline" } }

export const Muted: Story = { args: { variant: "muted" } }

export const Small: Story = { args: { size: "sm" } }

export const Examples: Story = {
  render: () => <ItemDemo />,
}

export const WithAvatar: Story = {
  render: () => <ItemAvatar />,
}

export const WithDropdown: Story = {
  render: () => <ItemDropdown />,
}

export const Group: Story = {
  render: () => <ItemGroup />,
}

export const WithHeader: Story = {
  render: () => <ItemHeader />,
}

export const WithIcon: Story = {
  render: () => <ItemIcon />,
}

export const WithImage: Story = {
  render: () => <ItemImage />,
}

export const WithLink: Story = {
  render: () => <ItemLink />,
}

export const SizeShowcase: Story = {
  render: () => <ItemSize />,
}

export const VariantShowcase: Story = {
  render: () => <ItemVariant />,
}
