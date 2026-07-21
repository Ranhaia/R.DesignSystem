"use client"

import * as React from "react"
import { Trash2Icon } from "lucide-react"
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
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item"

type Documento = { id: string; nome: string }

const initialDocs: Documento[] = [
  { id: "1", nome: "Laudo de vistoria.pdf" },
  { id: "2", nome: "Boletim de ocorrência.pdf" },
]

// Pattern: Delete Flow — vai além da Confirmation Dialog isolada: depois de
// confirmar a exclusão, mostra feedback (toast) com ação "Desfazer" que
// restaura o item removido dentro de uma janela curta — reduz o custo de
// erro sem precisar de uma segunda confirmação bloqueante.
export function DeleteFlowPattern() {
  const [docs, setDocs] = React.useState(initialDocs)
  const removedRef = React.useRef<{ item: Documento; index: number } | null>(null)

  function handleDelete(doc: Documento) {
    const index = docs.findIndex((d) => d.id === doc.id)
    removedRef.current = { item: doc, index }
    setDocs((prev) => prev.filter((d) => d.id !== doc.id))

    toast(`"${doc.nome}" removido`, {
      action: {
        label: "Desfazer",
        onClick: () => {
          const removed = removedRef.current
          if (!removed) return
          setDocs((prev) => {
            const next = [...prev]
            next.splice(removed.index, 0, removed.item)
            return next
          })
        },
      },
    })
  }

  if (docs.length === 0) {
    return (
      <p className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
        Nenhum documento anexado.
      </p>
    )
  }

  return (
    <div className="divide-y rounded-lg border">
      {docs.map((doc) => (
        <Item key={doc.id} size="sm">
          <ItemContent>
            <ItemTitle>{doc.nome}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label={`Excluir ${doc.nome}`}
                >
                  <Trash2Icon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir documento?</AlertDialogTitle>
                  <AlertDialogDescription>
                    "{doc.nome}" será removido. Você pode desfazer logo depois
                    pela notificação.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(doc)}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ItemActions>
        </Item>
      ))}
    </div>
  )
}
