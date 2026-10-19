import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Title } from "@/components/ui/title"
import TitleDemo from "@/components/examples/title-demo"

const meta: Meta<typeof Title> = {
  title: "Primitivos/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    size: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
  },
  args: {
    children: "Título de exemplo",
    as: "h2",
  },
}

export default meta

type Story = StoryObj<typeof Title>

export const Default: Story = {}

export const H1: Story = { args: { as: "h1" } }

export const H2: Story = { args: { as: "h2" } }

export const H3: Story = { args: { as: "h3" } }

export const H4: Story = { args: { as: "h4" } }

export const H5: Story = { args: { as: "h5" } }

export const H6: Story = { args: { as: "h6" } }

export const SemanticaDivergenteDoVisual: Story = {
  args: {
    as: "h3",
    size: "h1",
    children: "H3 semântico, estilo visual H1",
  },
}

export const Examples: Story = {
  render: () => <TitleDemo />,
}
