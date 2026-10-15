import { SpeedDial } from "@/components/ui/speed-dial"
import { Icon } from "@/components/ui/icon"

export default function SpeedDialDemo() {
  return (
    <div className="flex h-56 w-full items-end justify-center p-6">
      <SpeedDial
        direction="up"
        triggerLabel="Ações rápidas"
        actionButtons={[
          {
            key: "share",
            label: "Compartilhar",
            icon: <Icon name="share" size={1} className="size-4" />,
            action: () => alert("Compartilhar acionado"),
          },
          {
            key: "content_copy",
            label: "Copiar",
            icon: <Icon name="content_copy" size={1} className="size-4" />,
            action: () => alert("Link copiado"),
          },
          {
            key: "print",
            label: "Imprimir",
            icon: <Icon name="print" size={1} className="size-4" />,
            action: () => alert("Imprimir acionado"),
          },
        ]}
      />
    </div>
  )
}
