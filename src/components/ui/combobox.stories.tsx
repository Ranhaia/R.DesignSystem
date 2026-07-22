// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Combobox } from "@/components/ui/combobox"
import ComboboxDemo from "@/components/examples/combobox-demo"
import ComboboxDropdownMenu from "@/components/examples/combobox-dropdown-menu"
import ComboboxPopover from "@/components/examples/combobox-popover"
import ComboboxResponsive from "@/components/examples/combobox-responsive"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Combobox> = {
  title: "Molecules/Combobox",
  component: Combobox,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Combobox>

export const Default: Story = {
  render: () => <ComboboxDemo />,
}

export const DropdownMenu: Story = {
  render: () => <ComboboxDropdownMenu />,
}

export const Popover: Story = {
  render: () => <ComboboxPopover />,
}

export const Responsive: Story = {
  render: () => <ComboboxResponsive />,
}
