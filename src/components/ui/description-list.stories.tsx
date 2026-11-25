import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DescriptionList } from "@/components/ui/description-list"
import DescriptionListDemo from "@/components/examples/description-list-demo"
import DescriptionListInline from "@/components/examples/description-list-inline"

const meta: Meta<typeof DescriptionList> = {
  title: "Atoms/Description List",
  component: DescriptionList,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DescriptionList>

export const Default: Story = {
  render: () => <DescriptionListDemo />,
}

export const Inline: Story = {
  render: () => <DescriptionListInline />,
}
