// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Card } from "@/components/ui/card"
import CardDemo from "@/components/examples/card-demo"
import CardWithForm from "@/components/examples/card-with-form"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Card> = {
  title: "Organisms/Card",
  component: Card,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => <CardDemo />,
}

export const WithForm: Story = {
  render: () => <CardWithForm />,
}
