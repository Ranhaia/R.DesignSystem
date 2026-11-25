import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CodeBlock } from "@/components/ui/code-block"
import CodeBlockDemo from "@/components/examples/code-block-demo"
import CodeBlockTitulo from "@/components/examples/code-block-titulo"

const meta: Meta<typeof CodeBlock> = {
  title: "Organisms/Code Block",
  component: CodeBlock,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CodeBlock>

export const Default: Story = {
  render: () => <CodeBlockDemo />,
}

export const ComTitulo: Story = {
  render: () => <CodeBlockTitulo />,
}
