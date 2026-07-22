import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { LoadingPattern } from "@/components/patterns/loading"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof LoadingPattern> = {
  title: "Patterns/Loading",
  component: LoadingPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof LoadingPattern>

export const Default: Story = {}
