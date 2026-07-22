// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Field } from "@/components/ui/field"
import FieldDemo from "@/components/examples/field-demo"
import FieldCheckbox from "@/components/examples/field-checkbox"
import FieldChoiceCard from "@/components/examples/field-choice-card"
import FieldFieldset from "@/components/examples/field-fieldset"
import FieldGroup from "@/components/examples/field-group"
import FieldInput from "@/components/examples/field-input"
import FieldRadio from "@/components/examples/field-radio"
import FieldResponsive from "@/components/examples/field-responsive"
import FieldSelect from "@/components/examples/field-select"
import FieldSlider from "@/components/examples/field-slider"
import FieldSwitch from "@/components/examples/field-switch"
import FieldTextarea from "@/components/examples/field-textarea"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Field> = {
  title: "Molecules/Field",
  component: Field,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Field>

export const Default: Story = {
  render: () => <FieldDemo />,
}

export const Checkbox: Story = {
  render: () => <FieldCheckbox />,
}

export const ChoiceCard: Story = {
  render: () => <FieldChoiceCard />,
}

export const Fieldset: Story = {
  render: () => <FieldFieldset />,
}

export const Group: Story = {
  render: () => <FieldGroup />,
}

export const Input: Story = {
  render: () => <FieldInput />,
}

export const Radio: Story = {
  render: () => <FieldRadio />,
}

export const Responsive: Story = {
  render: () => <FieldResponsive />,
}

export const Select: Story = {
  render: () => <FieldSelect />,
}

export const Slider: Story = {
  render: () => <FieldSlider />,
}

export const Switch: Story = {
  render: () => <FieldSwitch />,
}

export const Textarea: Story = {
  render: () => <FieldTextarea />,
}
