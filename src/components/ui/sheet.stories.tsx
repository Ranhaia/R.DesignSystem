// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Sheet } from "@/components/ui/sheet"
import SheetDemo from "@/components/examples/sheet-demo"
import SheetSide from "@/components/examples/sheet-side"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Sheet> = {
  title: "Organisms/Sheet",
  component: Sheet,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => <SheetDemo />,
}

export const Side: Story = {
  render: () => <SheetSide />,
}
