import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ToastStrategyPattern } from "@/components/patterns/toast-strategy"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof ToastStrategyPattern> = {
  title: "Patterns/Toast Strategy",
  component: ToastStrategyPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ToastStrategyPattern>

export const Default: Story = {}
