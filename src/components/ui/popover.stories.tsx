// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Popover } from "@/components/ui/popover"
import PopoverDemo from "@/components/examples/popover-demo"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Popover> = {
  title: "Atoms/Popover",
  component: Popover,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => <PopoverDemo />,
}
