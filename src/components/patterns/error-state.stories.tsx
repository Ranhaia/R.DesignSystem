import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ErrorStatePattern } from "@/components/patterns/error-state"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof ErrorStatePattern> = {
  title: "Patterns/Error State",
  component: ErrorStatePattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ErrorStatePattern>

export const Default: Story = {}
