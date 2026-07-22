// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Form } from "@/components/ui/form"
import FormDemo from "@/components/examples/form-rhf-demo"
import FormRhfArray from "@/components/examples/form-rhf-array"
import FormRhfCheckbox from "@/components/examples/form-rhf-checkbox"
import FormRhfComplex from "@/components/examples/form-rhf-complex"
import FormRhfInput from "@/components/examples/form-rhf-input"
import FormRhfPassword from "@/components/examples/form-rhf-password"
import FormRhfRadiogroup from "@/components/examples/form-rhf-radiogroup"
import FormRhfSelect from "@/components/examples/form-rhf-select"
import FormRhfSwitch from "@/components/examples/form-rhf-switch"
import FormRhfTextarea from "@/components/examples/form-rhf-textarea"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Form> = {
  title: "Organisms/Form",
  component: Form,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Form>

export const Default: Story = {
  render: () => <FormDemo />,
}

export const Array: Story = {
  render: () => <FormRhfArray />,
}

export const Checkbox: Story = {
  render: () => <FormRhfCheckbox />,
}

export const Complex: Story = {
  render: () => <FormRhfComplex />,
}

export const Input: Story = {
  render: () => <FormRhfInput />,
}

export const Password: Story = {
  render: () => <FormRhfPassword />,
}

export const RadioGroup: Story = {
  render: () => <FormRhfRadiogroup />,
}

export const Select: Story = {
  render: () => <FormRhfSelect />,
}

export const Switch: Story = {
  render: () => <FormRhfSwitch />,
}

export const Textarea: Story = {
  render: () => <FormRhfTextarea />,
}
