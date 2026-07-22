import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DeleteFlowPattern } from "@/components/patterns/delete-flow"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof DeleteFlowPattern> = {
  title: "Patterns/Delete Flow",
  component: DeleteFlowPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DeleteFlowPattern>

export const Default: Story = {}
