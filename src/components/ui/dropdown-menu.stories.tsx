// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DropdownMenu } from "@/components/ui/dropdown-menu"
import DropdownMenuDemo from "@/components/examples/dropdown-menu-demo"
import DropdownMenuCheckboxes from "@/components/examples/dropdown-menu-checkboxes"
import DropdownMenuDialog from "@/components/examples/dropdown-menu-dialog"
import DropdownMenuRadioGroup from "@/components/examples/dropdown-menu-radio-group"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof DropdownMenu> = {
  title: "Organisms/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => <DropdownMenuDemo />,
}

export const Checkboxes: Story = {
  render: () => <DropdownMenuCheckboxes />,
}

export const Dialog: Story = {
  render: () => <DropdownMenuDialog />,
}

export const RadioGroup: Story = {
  render: () => <DropdownMenuRadioGroup />,
}
