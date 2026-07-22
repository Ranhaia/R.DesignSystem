// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ResizablePanelGroup } from "@/components/ui/resizable"
import ResizableDemo from "@/components/examples/resizable-demo"
import ResizableDemoWithHandle from "@/components/examples/resizable-demo-with-handle"
import ResizableHandle from "@/components/examples/resizable-handle"
import ResizableVertical from "@/components/examples/resizable-vertical"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Organisms/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ResizablePanelGroup>

export const Default: Story = {
  render: () => <ResizableDemo />,
}

export const WithHandle: Story = {
  render: () => <ResizableDemoWithHandle />,
}

export const HandleOnly: Story = {
  render: () => <ResizableHandle />,
}

export const Vertical: Story = {
  render: () => <ResizableVertical />,
}
