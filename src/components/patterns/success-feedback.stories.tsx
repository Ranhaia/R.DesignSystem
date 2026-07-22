import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SuccessFeedbackPattern } from "@/components/patterns/success-feedback"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof SuccessFeedbackPattern> = {
  title: "Patterns/Success Feedback",
  component: SuccessFeedbackPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SuccessFeedbackPattern>

export const Default: Story = {}
