import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { UploadPattern } from "@/components/patterns/upload"

// Patterns não têm props/variantes (são composições fechadas, com lógica
// própria) — a story existe só pra ter o Pattern navegável no catálogo,
// ao lado de Atoms/Molecules/Organisms, com o addon-a11y auditando a
// composição completa.
const meta: Meta<typeof UploadPattern> = {
  title: "Patterns/Upload",
  component: UploadPattern,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof UploadPattern>

export const Default: Story = {}
