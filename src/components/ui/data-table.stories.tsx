import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DataTable } from "@/components/ui/data-table"
import DataTableDemo from "@/components/examples/data-table-demo"

const meta: Meta<typeof DataTable> = {
  title: "Organisms/Data Table",
  component: DataTable,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  render: () => <DataTableDemo />,
}
