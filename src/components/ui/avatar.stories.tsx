import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import AvatarDemo from "@/components/examples/avatar-demo"

// argTypes vem do mesmo config já validado em generic-playground.tsx
// (size: sm/default/lg) — não inventei nada novo aqui.
const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
  args: {
    size: "default" as never,
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  ),
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const Small: Story = { args: { size: "sm" as never } }

export const Large: Story = { args: { size: "lg" as never } }

// Exemplo real (com imagem, fallback e agrupamento) — mesmo conteúdo já
// usado na documentação do componente.
export const Examples: Story = {
  render: () => <AvatarDemo />,
}
