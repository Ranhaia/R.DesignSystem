// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Dialog } from "@/components/ui/dialog"
import DialogDemo from "@/components/examples/dialog-demo"
import DialogCloseButton from "@/components/examples/dialog-close-button"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Dialog> = {
  title: "Organisms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => <DialogDemo />,
}

export const CloseButton: Story = {
  render: () => <DialogCloseButton />,
}
