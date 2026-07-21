"use client"

import * as React from "react"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Corretor = { id: string; nome: string; regiao: string }

const initialData: Corretor[] = [
  { id: "1", nome: "Carla Souza", regiao: "SP - Capital" },
  { id: "2", nome: "João Batista", regiao: "RJ - Capital" },
]

// Pattern: CRUD — cria/edita via Dialog + Form, exclui via AlertDialog de
// confirmação (Pattern "Confirmation Dialog" aplicado aqui dentro). Estado
// local só pra demonstrar o fluxo completo (create → read → update →
// delete); numa tela real isso seria uma mutação de servidor.
export function CrudPattern() {
  const [items, setItems] = React.useState(initialData)
  const [editing, setEditing] = React.useState<Corretor | null>(null)
  const [open, setOpen] = React.useState(false)
  const [nome, setNome] = React.useState("")
  const [regiao, setRegiao] = React.useState("")

  function openCreate() {
    setEditing(null)
    setNome("")
    setRegiao("")
    setOpen(true)
  }

  function openEdit(item: Corretor) {
    setEditing(item)
    setNome(item.nome)
    setRegiao(item.regiao)
    setOpen(true)
  }

  function handleSave() {
    if (editing) {
      setItems((prev) =>
        prev.map((i) => (i.id === editing.id ? { ...i, nome, regiao } : i))
      )
      toast.success("Corretor atualizado")
    } else {
      setItems((prev) => [...prev, { id: crypto.randomUUID(), nome, regiao }])
      toast.success("Corretor cadastrado")
    }
    setOpen(false)
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
    toast.success("Corretor removido")
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button size="sm" onClick={openCreate}>
          <PlusIcon />
          Novo corretor
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Região</TableHead>
            <TableHead className="w-24 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.regiao}</TableCell>
              <TableCell className="flex justify-end gap-1">
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label={`Editar ${item.nome}`}
                  onClick={() => openEdit(item)}
                >
                  <PencilIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Excluir ${item.nome}`}
                    >
                      <Trash2Icon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir corretor?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {item.nome} será removido da lista. Essa ação não pode
                        ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item.id)}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar corretor" : "Novo corretor"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Field>
              <FieldLabel htmlFor="crud-nome">Nome</FieldLabel>
              <FieldContent>
                <Input
                  id="crud-nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="crud-regiao">Região</FieldLabel>
              <FieldContent>
                <Input
                  id="crud-regiao"
                  value={regiao}
                  onChange={(e) => setRegiao(e.target.value)}
                />
              </FieldContent>
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!nome.trim()}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
