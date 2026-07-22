// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Drawer } from "@/components/ui/drawer"
import DrawerDemo from "@/components/examples/drawer-demo"
import DrawerDialog from "@/components/examples/drawer-dialog"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Drawer> = {
  title: "Organisms/Drawer",
  component: Drawer,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => <DrawerDemo />,
}

export const ResponsiveDialog: Story = {
  render: () => <DrawerDialog />,
}
