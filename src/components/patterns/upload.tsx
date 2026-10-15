"use client"

import * as React from "react"

import {
  Attachment,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

type UploadState = "idle" | "uploading" | "processing" | "error" | "done"

type UploadItem = { id: string; nome: string; state: UploadState }

// Pattern: Upload — usa a prop real "state" do Attachment (Molecule já
// catalogada: idle/uploading/processing/error/done) pra simular o ciclo de
// vida de um upload. A área de drop tem um <input type="file"> real por
// baixo (clicável e navegável por teclado), a div decorativa de
// arrastar-e-soltar é só reforço visual, não o único jeito de anexar.
export function UploadPattern() {
  const [items, setItems] = React.useState<UploadItem[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)

  function addFiles(files: FileList | null) {
    if (!files) return
    const newItems = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      nome: file.name,
      state: "uploading" as UploadState,
    }))
    setItems((prev) => [...prev, ...newItems])

    newItems.forEach((item) => {
      window.setTimeout(() => {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, state: "processing" } : i))
        )
      }, 800)
      window.setTimeout(() => {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, state: item.nome.endsWith(".exe") ? "error" : "done" }
              : i
          )
        )
      }, 1800)
    })
  }

  return (
    <div className="space-y-3">
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={
          "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 text-center text-sm text-muted-foreground focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring outline-none" +
          (dragging ? " border-primary bg-primary/5" : "")
        }
      >
        <Icon name="cloud_upload" className="text-foreground" />
        <p>Arraste arquivos aqui ou clique para selecionar</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          aria-label="Upload de arquivos"
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </label>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <Attachment key={item.id} state={item.state} size="sm">
              <AttachmentMedia>
                <Icon name="draft" size={1} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{item.nome}</AttachmentTitle>
                <AttachmentDescription>
                  {item.state === "uploading" && "Enviando..."}
                  {item.state === "processing" && "Processando..."}
                  {item.state === "error" && "Falha no upload"}
                  {item.state === "done" && "Concluído"}
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  aria-label={`Remover ${item.nome}`}
                  onClick={() =>
                    setItems((prev) => prev.filter((i) => i.id !== item.id))
                  }
                >
                  <Icon name="delete" />
                </Button>
              </AttachmentActions>
            </Attachment>
          ))}
        </div>
      )}
    </div>
  )
}
