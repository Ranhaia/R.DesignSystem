import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CrudPattern } from "@/components/patterns/crud"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof CrudPattern> = {
  title: "Patterns/CRUD",
  component: CrudPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CrudPattern>

export const Default: Story = {}
