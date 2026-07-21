"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("O evento foi criado")}>
        Padrão
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("O evento foi criado")}
      >
        Sucesso
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Chegue ao local 10 minutos antes do horário do evento")
        }
      >
        Informação
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("O evento não pode começar antes das 8h")
        }
      >
        Aviso
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("O evento não foi criado")}
      >
        Erro
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Evento" }), 2000)
              ),
            {
              loading: "Carregando...",
              success: (data) => `${data.name} foi criado`,
              error: "Erro",
            }
          )
        }}
      >
        Promessa
      </Button>
    </div>
  )
}
