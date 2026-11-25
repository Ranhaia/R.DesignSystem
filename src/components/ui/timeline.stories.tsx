import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Timeline } from "@/components/ui/timeline"
import TimelineDemo from "@/components/examples/timeline-demo"
import TimelineIcones from "@/components/examples/timeline-icones"

const meta: Meta<typeof Timeline> = {
  title: "Molecules/Timeline",
  component: Timeline,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  render: () => <TimelineDemo />,
}

export const Icones: Story = {
  render: () => <TimelineIcones />,
}
