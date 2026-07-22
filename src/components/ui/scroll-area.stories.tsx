// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollArea } from "@/components/ui/scroll-area"
import ScrollAreaDemo from "@/components/examples/scroll-area-demo"
import ScrollAreaHorizontalDemo from "@/components/examples/scroll-area-horizontal-demo"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof ScrollArea> = {
  title: "Molecules/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => <ScrollAreaDemo />,
}

export const Horizontal: Story = {
  render: () => <ScrollAreaHorizontalDemo />,
}
