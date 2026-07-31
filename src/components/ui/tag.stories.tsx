import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Tag } from "@/components/ui/tag"
import { Icon } from "@/components/ui/icon"
import TagDemo from "@/components/examples/tag-demo"

const meta: Meta<typeof Tag> = {
  title: "Atoms/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger", "ai-generated"],
    },
  },
  args: {
    children: "Categoria: Roupas",
    variant: "default",
  },
}

export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {}

export const Primary: Story = { args: { variant: "primary" } }

export const Success: Story = { args: { variant: "success" } }

export const Warning: Story = { args: { variant: "warning" } }

export const Danger: Story = { args: { variant: "danger" } }

export const AiGenerated: Story = { args: { variant: "ai-generated" } }

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="sell" />
        Promoção
      </>
    ),
  },
}

export const Skeleton: Story = {
  render: () => <Tag.Skeleton />,
}

export const Examples: Story = {
  render: () => <TagDemo />,
}
