import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InfiniteScrollPattern } from "@/components/patterns/infinite-scroll"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof InfiniteScrollPattern> = {
  title: "Patterns/Infinite Scroll",
  component: InfiniteScrollPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof InfiniteScrollPattern>

export const Default: Story = {}
