"use client"

import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

// Pattern: Confirmation Dialog — quando usar: ação IRREVERSÍVEL ou de
// consequência séria que precisa de confirmação explícita antes de
// executar (diferente do Delete Flow, que já assume a exclusão e foca no
// feedback pós-ação com opção de desfazer). O foco retorna automaticamente
// pro botão que abriu o diálogo ao cancelar/fechar — comportamento nativo
// do Radix AlertDialog, sem código extra necessário.
export function ConfirmationDialogPattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Cancelar assinatura do plano</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancelar assinatura?</AlertDialogTitle>
          <AlertDialogDescription>
            Você perderá acesso aos recursos do plano no fim do período já
            pago. Essa ação não pode ser desfeita depois de confirmada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Manter assinatura</AlertDialogCancel>
          <AlertDialogAction onClick={() => toast("Assinatura cancelada")}>
            Cancelar assinatura
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
