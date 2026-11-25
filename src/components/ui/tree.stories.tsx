import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Tree } from "@/components/ui/tree"
import TreeDemo from "@/components/examples/tree-demo"
import TreeMarcacao from "@/components/examples/tree-marcacao"

const meta: Meta<typeof Tree> = {
  title: "Molecules/Tree",
  component: Tree,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Tree>

export const Default: Story = {
  render: () => <TreeDemo />,
}

export const ComMarcacao: Story = {
  render: () => <TreeMarcacao />,
}