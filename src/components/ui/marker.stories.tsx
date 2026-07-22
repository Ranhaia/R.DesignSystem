import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Marker } from "@/components/ui/marker"
import MarkerDemo from "@/components/examples/marker-demo"

const meta: Meta<typeof Marker> = {
  title: "Atoms/Marker",
  component: Marker,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "separator", "border"],
    },
  },
  args: {
    children: "Marcador",
    variant: "default",
    className: "w-48",
  },
}

export default meta

type Story = StoryObj<typeof Marker>

export const Default: Story = {}

export const Separator: Story = { args: { variant: "separator" } }

export const Border: Story = { args: { variant: "border" } }

export const Examples: Story = {
  render: () => <MarkerDemo />,
}
