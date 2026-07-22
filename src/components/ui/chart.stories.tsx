// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ChartContainer } from "@/components/ui/chart"
import ChartDemo from "@/components/examples/chart-bar-demo"
import ChartBarDemoAxis from "@/components/examples/chart-bar-demo-axis"
import ChartBarDemoGrid from "@/components/examples/chart-bar-demo-grid"
import ChartBarDemoLegend from "@/components/examples/chart-bar-demo-legend"
import ChartBarDemoTooltip from "@/components/examples/chart-bar-demo-tooltip"
import ChartTooltipDemo from "@/components/examples/chart-tooltip-demo"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof ChartContainer> = {
  title: "Organisms/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ChartContainer>

export const Default: Story = {
  render: () => <ChartDemo />,
}

export const Axis: Story = {
  render: () => <ChartBarDemoAxis />,
}

export const Grid: Story = {
  render: () => <ChartBarDemoGrid />,
}

export const Legend: Story = {
  render: () => <ChartBarDemoLegend />,
}

export const WithTooltip: Story = {
  render: () => <ChartBarDemoTooltip />,
}

export const TooltipOnly: Story = {
  render: () => <ChartTooltipDemo />,
}
