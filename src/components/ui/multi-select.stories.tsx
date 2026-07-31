// Sem variant/size controlável na raiz (ver TAXONOMIA/component-docs.ts) — a
// story existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder), mesmo padrão de
// combobox.stories.tsx.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MultiSelect } from "@/components/ui/multi-select"
import MultiSelectDemo from "@/components/examples/multi-select-demo"

const meta: Meta<typeof MultiSelect> = {
  title: "Atoms/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof MultiSelect>

export const Default: Story = {
  render: () => <MultiSelectDemo />,
}
