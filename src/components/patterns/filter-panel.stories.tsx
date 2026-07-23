import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FilterPanelPattern } from "@/components/patterns/filter-panel"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof FilterPanelPattern> = {
  title: "Patterns/Filter Panel",
  component: FilterPanelPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof FilterPanelPattern>

export const Default: Story = {}
