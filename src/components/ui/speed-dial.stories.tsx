import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpeedDial } from "@/components/ui/speed-dial"
import { Icon } from "@/components/ui/icon"

const meta: Meta<typeof SpeedDial> = {
  title: "Molecules/SpeedDial",
  component: SpeedDial,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SpeedDial>

export const Default: Story = {
  render: () => (
    <div className="flex h-64 w-full items-end justify-center p-8">
      <SpeedDial
        direction="up"
        triggerLabel="Ações rápidas"
        actionButtons={[
          {
            key: "share",
            label: "Compartilhar",
            icon: <Icon name="share" size={1} className="size-4" />,
            action: () => alert("Compartilhar"),
          },
          {
            key: "content_copy",
            label: "Copiar",
            icon: <Icon name="content_copy" size={1} className="size-4" />,
            action: () => alert("Copiar"),
          },
          {
            key: "print",
            label: "Imprimir",
            icon: <Icon name="print" size={1} className="size-4" />,
            action: () => alert("Imprimir"),
          },
        ]}
      />
    </div>
  ),
}

export const HorizontalRight: Story = {
  render: () => (
    <div className="flex h-32 w-full items-center justify-start p-8">
      <SpeedDial
        direction="right"
        triggerLabel="Ações rápidas"
        actionButtons={[
          {
            key: "edit",
            label: "Editar",
            icon: <Icon name="edit" size={1} className="size-4" />,
            action: () => alert("Editar"),
          },
          {
            key: "delete",
            label: "Excluir",
            icon: <Icon name="delete" size={1} className="size-4" />,
            action: () => alert("Excluir"),
          },
        ]}
      />
    </div>
  ),
}
