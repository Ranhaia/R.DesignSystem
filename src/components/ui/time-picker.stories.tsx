// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts (Fase 6.1), export real do componente (grep no
// source), demo real em src/components/examples (exampleRegistry) —
// nenhum conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TimePicker } from "@/components/ui/time-picker"
import TimePickerDemo from "@/components/examples/time-picker-demo"

const meta: Meta<typeof TimePicker> = {
  title: "Organisms/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  argTypes: {
    format: {
      control: "select",
      options: ["24h", "12h"],
    },
  },
  args: {
    format: "24h",
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof TimePicker>

export const Default: Story = {
  render: () => <TimePickerDemo />,
}

export const Format12h: Story = {
  args: {
    format: "12h",
    value: "14:30",
    onValueChange: () => {},
  },
}

export const MinuteStep15: Story = {
  args: {
    minuteStep: 15,
    onValueChange: () => {},
  },
}

export const Empty: Story = {
  args: {
    onValueChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    value: "09:00",
    disabled: true,
    onValueChange: () => {},
  },
}
