import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SkeletonPattern } from "@/components/patterns/skeleton"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof SkeletonPattern> = {
  title: "Patterns/Skeleton",
  component: SkeletonPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SkeletonPattern>

export const Default: Story = {}
