import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MultiStepFormPattern } from "@/components/patterns/multi-step-form"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof MultiStepFormPattern> = {
  title: "Patterns/Multi-step Form",
  component: MultiStepFormPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof MultiStepFormPattern>

export const Default: Story = {}
