// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Textarea } from "@/components/ui/textarea"
import TextareaDemo from "@/components/examples/textarea-demo"
import TextareaDisabled from "@/components/examples/textarea-disabled"
import TextareaWithButton from "@/components/examples/textarea-with-button"
import TextareaWithLabel from "@/components/examples/textarea-with-label"
import TextareaWithText from "@/components/examples/textarea-with-text"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => <TextareaDemo />,
}

export const Disabled: Story = {
  render: () => <TextareaDisabled />,
}

export const WithButton: Story = {
  render: () => <TextareaWithButton />,
}

export const WithLabel: Story = {
  render: () => <TextareaWithLabel />,
}

export const WithText: Story = {
  render: () => <TextareaWithText />,
}
