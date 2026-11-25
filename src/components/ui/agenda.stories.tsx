import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Agenda } from "@/components/ui/agenda"
import AgendaDemo from "@/components/examples/agenda-demo"

const meta: Meta<typeof Agenda> = {
  title: "Organisms/Agenda",
  component: Agenda,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Agenda>

export const Default: Story = {
  render: () => <AgendaDemo />,
}
