import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ColorPicker } from "@/components/ui/color-picker"
import ColorPickerDemo from "@/components/examples/color-picker-demo"
import ColorPickerInline from "@/components/examples/color-picker-inline"

const meta: Meta<typeof ColorPicker> = {
  title: "Molecules/Color Picker",
  component: ColorPicker,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
  render: () => <ColorPickerDemo />,
}

export const Inline: Story = {
  render: () => <ColorPickerInline />,
}
