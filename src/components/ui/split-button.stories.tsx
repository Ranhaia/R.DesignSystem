// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source), demo real
// em src/components/examples (exampleRegistry) — nenhum conteúdo/prop foi
// inventado.
//
// `children` (itens do menu) é composição JSX, não um valor controlável —
// mesmo raciocínio já usado em DropdownMenu/ButtonGroup: fica de fora do
// controle e é fixado via `render`, só variant/size/disabled/label ficam
// como args reais (herdados 1:1 do Button, ver split-button.tsx).

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SplitButton } from "@/components/ui/split-button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"
import SplitButtonDemo from "@/components/examples/split-button-demo"

const meta: Meta<typeof SplitButton> = {
  title: "Organisms/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    label: "Salvar",
    variant: "default",
    size: "default",
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof SplitButton>

export const Default: Story = {
  render: (args) => (
    <SplitButton {...args}>
      <DropdownMenuItem onClick={() => {}}>
        <Icon name="draft" />
        Salvar como rascunho
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => {}}>
        <Icon name="logout" />
        Salvar e sair
      </DropdownMenuItem>
    </SplitButton>
  ),
}

export const Secondary: Story = {
  args: { variant: "secondary" },
  render: Default.render,
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: Default.render,
}

export const Small: Story = {
  args: { size: "sm" },
  render: Default.render,
}

export const Large: Story = {
  args: { size: "lg" },
  render: Default.render,
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
}

export const Examples: Story = {
  render: () => <SplitButtonDemo />,
}
