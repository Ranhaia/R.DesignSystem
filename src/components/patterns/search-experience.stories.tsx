import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SearchExperiencePattern } from "@/components/patterns/search-experience"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof SearchExperiencePattern> = {
  title: "Patterns/Search Experience",
  component: SearchExperiencePattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SearchExperiencePattern>

export const Default: Story = {}
