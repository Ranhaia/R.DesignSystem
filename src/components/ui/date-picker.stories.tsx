import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DatePicker } from "@/components/ui/date-picker"
import DatePickerDigitavel from "@/components/examples/date-picker-digitavel"
import DatePickerPeriodo from "@/components/examples/date-picker-periodo"

const meta: Meta<typeof DatePicker> = {
  title: "Organisms/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: () => <DatePickerDigitavel />,
}

export const Periodo: Story = {
  render: () => <DatePickerPeriodo />,
}
