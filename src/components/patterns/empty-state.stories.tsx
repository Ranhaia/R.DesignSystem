import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { EmptyStatePattern } from "@/components/patterns/empty-state"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa (Empty + Button), não cada peça isolada.
const meta: Meta<typeof EmptyStatePattern> = {
  title: "Patterns/Empty State",
  component: EmptyStatePattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof EmptyStatePattern>

export const Default: Story = {}
