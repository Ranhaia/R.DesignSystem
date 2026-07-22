// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Spinner } from "@/components/ui/spinner"
import SpinnerDemo from "@/components/examples/spinner-demo"
import SpinnerBadge from "@/components/examples/spinner-badge"
import SpinnerBasic from "@/components/examples/spinner-basic"
import SpinnerButton from "@/components/examples/spinner-button"
import SpinnerColor from "@/components/examples/spinner-color"
import SpinnerCustom from "@/components/examples/spinner-custom"
import SpinnerEmpty from "@/components/examples/spinner-empty"
import SpinnerInputGroup from "@/components/examples/spinner-input-group"
import SpinnerItem from "@/components/examples/spinner-item"
import SpinnerSize from "@/components/examples/spinner-size"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: () => <SpinnerDemo />,
}

export const Badge: Story = {
  render: () => <SpinnerBadge />,
}

export const Basic: Story = {
  render: () => <SpinnerBasic />,
}

export const Button: Story = {
  render: () => <SpinnerButton />,
}

export const Color: Story = {
  render: () => <SpinnerColor />,
}

export const Custom: Story = {
  render: () => <SpinnerCustom />,
}

export const Empty: Story = {
  render: () => <SpinnerEmpty />,
}

export const InputGroup: Story = {
  render: () => <SpinnerInputGroup />,
}

export const Item: Story = {
  render: () => <SpinnerItem />,
}

export const SizeShowcase: Story = {
  render: () => <SpinnerSize />,
}
