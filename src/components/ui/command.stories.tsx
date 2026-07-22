// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Command } from "@/components/ui/command"
import CommandDemo from "@/components/examples/command-demo"
import CommandDialog from "@/components/examples/command-dialog"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Command> = {
  title: "Organisms/Command",
  component: Command,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => <CommandDemo />,
}

export const Dialog: Story = {
  render: () => <CommandDialog />,
}
