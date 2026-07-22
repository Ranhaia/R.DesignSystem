import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import NativeSelectDemo from "@/components/examples/native-select-demo"
import NativeSelectGroups from "@/components/examples/native-select-groups"
import NativeSelectInvalid from "@/components/examples/native-select-invalid"

const meta: Meta<typeof NativeSelect> = {
  title: "Atoms/Native Select",
  component: NativeSelect,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
    },
  },
  args: {
    size: "default" as never,
    disabled: false,
  },
  render: (args) => (
    <NativeSelect {...args} className="w-auto">
      <NativeSelectOption>Opção 1</NativeSelectOption>
      <NativeSelectOption>Opção 2</NativeSelectOption>
    </NativeSelect>
  ),
}

export default meta

type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {}

export const Small: Story = { args: { size: "sm" as never } }

export const Disabled: Story = { args: { disabled: true } }

export const Examples: Story = {
  render: () => <NativeSelectDemo />,
}

export const Groups: Story = {
  render: () => <NativeSelectGroups />,
}

export const Invalid: Story = {
  render: () => <NativeSelectInvalid />,
}
