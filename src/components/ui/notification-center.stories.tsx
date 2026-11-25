import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { NotificationCenter } from "@/components/ui/notification-center"
import NotificationCenterDemo from "@/components/examples/notification-center-demo"

const meta: Meta<typeof NotificationCenter> = {
  title: "Organisms/Notification Center",
  component: NotificationCenter,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof NotificationCenter>

export const Default: Story = {
  render: () => <NotificationCenterDemo />,
}

export const Vazia: Story = {
  args: { notifications: [] },
}
