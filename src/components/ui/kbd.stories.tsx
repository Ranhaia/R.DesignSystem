// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Kbd } from "@/components/ui/kbd"
import KbdDemo from "@/components/examples/kbd-demo"
import KbdButton from "@/components/examples/kbd-button"
import KbdGroup from "@/components/examples/kbd-group"
import KbdInputGroup from "@/components/examples/kbd-input-group"
import KbdTooltip from "@/components/examples/kbd-tooltip"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Kbd> = {
  title: "Atoms/Kbd",
  component: Kbd,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  render: () => <KbdDemo />,
}

export const WithButton: Story = {
  render: () => <KbdButton />,
}

export const Group: Story = {
  render: () => <KbdGroup />,
}

export const WithInputGroup: Story = {
  render: () => <KbdInputGroup />,
}

export const WithTooltip: Story = {
  render: () => <KbdTooltip />,
}
