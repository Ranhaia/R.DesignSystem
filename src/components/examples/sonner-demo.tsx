"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("O evento foi criado", {
          description: "Domingo, 3 de dezembro de 2023 às 9h",
          action: {
            label: "Desfazer",
            onClick: () => console.log("Desfazer"),
          },
        })
      }
    >
      Mostrar notificação
    </Button>
  )
}
