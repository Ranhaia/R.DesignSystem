// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Checkbox } from "@/components/ui/checkbox"
import CheckboxDemo from "@/components/examples/checkbox-demo"
import CheckboxDisabled from "@/components/examples/checkbox-disabled"
import CheckboxWithText from "@/components/examples/checkbox-with-text"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => <CheckboxDemo />,
}

export const Disabled: Story = {
  render: () => <CheckboxDisabled />,
}

export const WithText: Story = {
  render: () => <CheckboxWithText />,
}
