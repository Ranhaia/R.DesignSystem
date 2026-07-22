import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SelectDemo from "@/components/examples/select-demo"
import SelectScrollable from "@/components/examples/select-scrollable"

// O tamanho (sm/default) fica no SelectTrigger, não no Select raiz — por
// isso o argType/control aqui é aplicado via render, igual ao
// generic-playground.tsx.
type SelectArgs = { size: "sm" | "default"; disabled: boolean }

const meta: Meta<SelectArgs> = {
  title: "Atoms/Select",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
    },
  },
  args: {
    size: "default",
    disabled: false,
  },
  render: ({ size, disabled }) => (
    <Select disabled={disabled}>
      <SelectTrigger size={size} className="w-auto">
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Opção 1</SelectItem>
        <SelectItem value="b">Opção 2</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export default meta

type Story = StoryObj<SelectArgs>

export const Default: Story = {}

export const Small: Story = { args: { size: "sm" } }

export const Disabled: Story = { args: { disabled: true } }

export const Examples: Story = {
  render: () => <SelectDemo />,
}

export const Scrollable: Story = {
  render: () => <SelectScrollable />,
}
