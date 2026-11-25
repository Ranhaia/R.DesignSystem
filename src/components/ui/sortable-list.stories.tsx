import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SortableList } from "@/components/ui/sortable-list"
import SortableListDemo from "@/components/examples/sortable-list-demo"
import SortableListHorizontal from "@/components/examples/sortable-list-horizontal"

const meta: Meta<typeof SortableList> = {
  title: "Atoms/Sortable List",
  component: SortableList,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SortableList>

export const Default: Story = {
  render: () => <SortableListDemo />,
}

export const Horizontal: Story = {
  render: () => <SortableListHorizontal />,
}
