import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FiltersPattern } from "@/components/patterns/filters"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof FiltersPattern> = {
  title: "Patterns/Filters",
  component: FiltersPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof FiltersPattern>

export const Default: Story = {}
