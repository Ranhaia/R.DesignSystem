// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Collapsible } from "@/components/ui/collapsible"
import CollapsibleDemo from "@/components/examples/collapsible-demo"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Collapsible> = {
  title: "Molecules/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => <CollapsibleDemo />,
}
