// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputGroup } from "@/components/ui/input-group"
import InputGroupDemo from "@/components/examples/input-group-demo"
import InputGroupButton from "@/components/examples/input-group-button"
import InputGroupButtonGroup from "@/components/examples/input-group-button-group"
import InputGroupCustom from "@/components/examples/input-group-custom"
import InputGroupDropdown from "@/components/examples/input-group-dropdown"
import InputGroupIcon from "@/components/examples/input-group-icon"
import InputGroupLabel from "@/components/examples/input-group-label"
import InputGroupSpinner from "@/components/examples/input-group-spinner"
import InputGroupText from "@/components/examples/input-group-text"
import InputGroupTextarea from "@/components/examples/input-group-textarea"
import InputGroupTooltip from "@/components/examples/input-group-tooltip"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof InputGroup> = {
  title: "Molecules/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof InputGroup>

export const Default: Story = {
  render: () => <InputGroupDemo />,
}

export const Button: Story = {
  render: () => <InputGroupButton />,
}

export const ButtonGroup: Story = {
  render: () => <InputGroupButtonGroup />,
}

export const Custom: Story = {
  render: () => <InputGroupCustom />,
}

export const Dropdown: Story = {
  render: () => <InputGroupDropdown />,
}

export const Icon: Story = {
  render: () => <InputGroupIcon />,
}

export const Label: Story = {
  render: () => <InputGroupLabel />,
}

export const Spinner: Story = {
  render: () => <InputGroupSpinner />,
}

export const Text: Story = {
  render: () => <InputGroupText />,
}

export const Textarea: Story = {
  render: () => <InputGroupTextarea />,
}

export const Tooltip: Story = {
  render: () => <InputGroupTooltip />,
}
