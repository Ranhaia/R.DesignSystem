import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ConfirmationDialogPattern } from "@/components/patterns/confirmation-dialog"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof ConfirmationDialogPattern> = {
  title: "Patterns/Confirmation Dialog",
  component: ConfirmationDialogPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ConfirmationDialogPattern>

export const Default: Story = {}
