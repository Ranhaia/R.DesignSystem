import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Icon } from "@/components/ui/icon"

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "home" },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const TamanhosEmRem: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Icon name="home" size={1} />
      <Icon name="home" size={1.5} />
      <Icon name="home" size={2} />
      <Icon name="home" size={3} />
    </div>
  ),
}

export const AutoTamanhoAmbiente: Story = {
  name: "Auto-tamanho (herda size-4 do botão)",
  render: () => (
    <button className="[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 inline-flex items-center gap-1 rounded-md border px-3 py-1.5">
      <Icon name="download" />
      Baixar
    </button>
  ),
}

export const EixosManuais: Story = {
  name: "Eixos via props (override do preset)",
  render: () => (
    <div className="flex items-end gap-4">
      <Icon name="favorite" size={2} rounded fill weight={700} />
      <Icon name="favorite" size={2} rounded={false} fill={false} weight={200} />
      <Icon name="favorite" size={2} grade={200} opticalSize={20} />
    </div>
  ),
}

export const IndicadorSolido: Story = {
  name: "Ponto sólido (fill como substituto de fill-current)",
  render: () => (
    <Icon name="circle" size={0.5} fill className="text-primary" />
  ),
}
