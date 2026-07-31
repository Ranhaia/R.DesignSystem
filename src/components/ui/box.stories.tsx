// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Box } from "@/components/ui/box"
import BoxDemo from "@/components/examples/box-demo"

// Sem variant/size controlável (ver .build/componentes/box.md — decisão
// de escopo) — a story existe pra ter o componente navegável no
// catálogo do Storybook, com addon-a11y auditando o exemplo real (não
// um placeholder). Único controle real é `asChild`, que troca o
// elemento raiz.
const meta: Meta<typeof Box> = {
  title: "Atoms/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    asChild: {
      control: "boolean",
    },
  },
  args: {
    className: "rounded-md border bg-muted p-4 text-sm text-foreground",
    children: "Box",
    asChild: false,
  },
}

export default meta

type Story = StoryObj<typeof Box>

export const Default: Story = {}

export const AsChild: Story = {
  args: {
    asChild: true,
    className: "rounded-md border border-dashed p-4",
    children: <section aria-label="Exemplo de asChild">Renderizado como &lt;section&gt;</section>,
  },
}

export const Examples: Story = {
  render: () => <BoxDemo />,
}
