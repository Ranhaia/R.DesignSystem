// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ButtonGroup } from "@/components/ui/button-group"
import ButtonGroupDemo from "@/components/examples/button-group-demo"
import ButtonGroupDropdown from "@/components/examples/button-group-dropdown"
import ButtonGroupInput from "@/components/examples/button-group-input"
import ButtonGroupInputGroup from "@/components/examples/button-group-input-group"
import ButtonGroupNested from "@/components/examples/button-group-nested"
import ButtonGroupOrientation from "@/components/examples/button-group-orientation"
import ButtonGroupPopover from "@/components/examples/button-group-popover"
import ButtonGroupSelect from "@/components/examples/button-group-select"
import ButtonGroupSeparator from "@/components/examples/button-group-separator"
import ButtonGroupSize from "@/components/examples/button-group-size"
import ButtonGroupSplit from "@/components/examples/button-group-split"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof ButtonGroup> = {
  title: "Molecules/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
  render: () => <ButtonGroupDemo />,
}

export const Dropdown: Story = {
  render: () => <ButtonGroupDropdown />,
}

export const WithInput: Story = {
  render: () => <ButtonGroupInput />,
}

export const WithInputGroup: Story = {
  render: () => <ButtonGroupInputGroup />,
}

export const Nested: Story = {
  render: () => <ButtonGroupNested />,
}

export const Orientation: Story = {
  render: () => <ButtonGroupOrientation />,
}

export const Popover: Story = {
  render: () => <ButtonGroupPopover />,
}

export const WithSelect: Story = {
  render: () => <ButtonGroupSelect />,
}

export const WithSeparator: Story = {
  render: () => <ButtonGroupSeparator />,
}

export const Size: Story = {
  render: () => <ButtonGroupSize />,
}

export const Split: Story = {
  render: () => <ButtonGroupSplit />,
}
