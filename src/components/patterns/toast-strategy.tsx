"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

// Pattern: Toast Strategy — guia de quando usar cada tipo de toast (Sonner,
// já integrado via <Toaster /> em app-shell.tsx). Diferente do Success
// Feedback (que fica fixo na tela), o toast é passageiro — serve pra
// confirmar que uma ação assíncrona terminou, sem exigir que o usuário
// continue olhando pra ela.
export function ToastStrategyPattern() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast.success("Apólice renovada com sucesso")}
      >
        Sucesso
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Não foi possível enviar o sinistro")}
      >
        Erro
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("O prazo de vigência termina em 3 dias")
        }
      >
        Aviso
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Um novo corretor foi vinculado à conta")}
      >
        Informação
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(
            () =>
              new Promise((resolve) => window.setTimeout(resolve, 1800)),
            {
              loading: "Enviando sinistro...",
              success: "Sinistro enviado",
              error: "Falha ao enviar",
            }
          )
        }
      >
        Ação assíncrona
      </Button>
    </div>
  )
}
