import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { List, ListItem } from "@/components/ui/list"
import ListDemo from "@/components/examples/list-demo"

const meta: Meta<typeof List> = {
  title: "Atoms/List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["ul", "ol"],
    },
    variant: {
      control: "select",
      options: ["none", "marker"],
    },
  },
  args: {
    as: "ul",
    variant: "none",
  },
}

export default meta

type Story = StoryObj<typeof List>

export const Default: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>Primeiro item</ListItem>
      <ListItem>Segundo item</ListItem>
      <ListItem>Terceiro item</ListItem>
    </List>
  ),
}

export const WithMarker: Story = {
  args: { variant: "marker" },
  render: (args) => (
    <List {...args}>
      <ListItem>Documento de identidade com foto</ListItem>
      <ListItem>Comprovante de residência atualizado</ListItem>
      <ListItem>Comprovante de renda</ListItem>
    </List>
  ),
}

export const Ordered: Story = {
  args: { as: "ol", variant: "marker" },
  render: (args) => (
    <List {...args}>
      <ListItem>Preencha o formulário de solicitação.</ListItem>
      <ListItem>Envie os documentos exigidos.</ListItem>
      <ListItem>Aguarde a análise da seguradora.</ListItem>
    </List>
  ),
}

export const Examples: Story = {
  render: () => <ListDemo />,
}
