// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Empty } from "@/components/ui/empty"
import EmptyDemo from "@/components/examples/empty-demo"
import EmptyAvatar from "@/components/examples/empty-avatar"
import EmptyAvatarGroup from "@/components/examples/empty-avatar-group"
import EmptyBackground from "@/components/examples/empty-background"
import EmptyIcon from "@/components/examples/empty-icon"
import EmptyInputGroup from "@/components/examples/empty-input-group"
import EmptyOutline from "@/components/examples/empty-outline"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Empty> = {
  title: "Molecules/Empty",
  component: Empty,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => <EmptyDemo />,
}

export const WithAvatar: Story = {
  render: () => <EmptyAvatar />,
}

export const WithAvatarGroup: Story = {
  render: () => <EmptyAvatarGroup />,
}

export const WithBackground: Story = {
  render: () => <EmptyBackground />,
}

export const WithIcon: Story = {
  render: () => <EmptyIcon />,
}

export const WithInputGroup: Story = {
  render: () => <EmptyInputGroup />,
}

export const Outline: Story = {
  render: () => <EmptyOutline />,
}
