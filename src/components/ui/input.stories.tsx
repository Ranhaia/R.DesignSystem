// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "@/components/ui/input"
import InputDemo from "@/components/examples/input-demo"
import InputDisabled from "@/components/examples/input-disabled"
import InputFile from "@/components/examples/input-file"
import InputWithButton from "@/components/examples/input-with-button"
import InputWithLabel from "@/components/examples/input-with-label"
import InputWithText from "@/components/examples/input-with-text"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => <InputDemo />,
}

export const Disabled: Story = {
  render: () => <InputDisabled />,
}

export const File: Story = {
  render: () => <InputFile />,
}

export const WithButton: Story = {
  render: () => <InputWithButton />,
}

export const WithLabel: Story = {
  render: () => <InputWithLabel />,
}

export const WithText: Story = {
  render: () => <InputWithText />,
}
