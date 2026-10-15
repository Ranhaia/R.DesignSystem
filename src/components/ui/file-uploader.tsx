"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// FileUploader (Atom) — zona de captura de arquivo reutilizável. Parente:
// Input (src/components/ui/input.tsx) + comportamento já validado no Pattern
// "Upload" (src/components/patterns/upload.tsx): <input type="file"> real
// por baixo, sr-only (nunca display:none puro), drag-and-drop como reforço
// visual sobre o mesmo alvo clicável. Diferente do Pattern (que usa uma
// <div role="button"> decorativa ao lado de um <input> escondido — dois
// alvos focáveis fazendo a mesma coisa), aqui o root é um único <label>
// associado ao input via htmlFor/id: um só elemento interativo, foco de
// teclado e clique do mouse resolvidos pelo HTML nativo, sem handler de
// teclado customizado. Não reimplementa lista de arquivos nem barra de
// progresso — isso é papel do Pattern/Attachment por cima deste átomo.
interface FileUploaderProps
  extends Omit<React.ComponentProps<"input">, "type" | "onChange" | "id"> {
  id?: string
  /** Texto visível dentro da zona de drop, explicando a ação. */
  label?: string
  /** Tamanho máximo aceito por arquivo, em bytes. Sem limite quando ausente. */
  maxSize?: number
  /** Arquivos aceitos (dentro do limite de maxSize, quando informado). */
  onFilesSelected?: (files: File[]) => void
  /** Arquivos rejeitados por excederem maxSize. Só chamado quando maxSize é informado. */
  onFilesRejected?: (files: File[]) => void
}

function FileUploader({
  id,
  label = "Arraste um arquivo ou clique para selecionar",
  accept,
  multiple = false,
  maxSize,
  onFilesSelected,
  onFilesRejected,
  disabled = false,
  className,
  ...props
}: FileUploaderProps) {
  const generatedId = React.useId()
  const resolvedId = id ?? generatedId
  const [dragging, setDragging] = React.useState(false)

  function handleFiles(fileList: FileList | null) {
    if (!fileList || disabled) return
    const files = Array.from(fileList)

    if (maxSize === undefined) {
      onFilesSelected?.(files)
      return
    }

    const accepted = files.filter((file) => file.size <= maxSize)
    const rejected = files.filter((file) => file.size > maxSize)

    if (accepted.length > 0) onFilesSelected?.(accepted)
    if (rejected.length > 0) onFilesRejected?.(rejected)
  }

  return (
    <label
      htmlFor={resolvedId}
      data-slot="file-uploader"
      data-dragging={dragging || undefined}
      data-disabled={disabled || undefined}
      onDragOver={(e) => {
        if (disabled) return
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        if (disabled) return
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-input p-8 text-center text-sm text-muted-foreground transition-colors",
        "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring",
        dragging && "border-primary bg-primary/5",
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className
      )}
    >
      <Icon name="cloud_upload" className="text-foreground" />
      <span>{label}</span>
      <input
        id={resolvedId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files)
          // Permite selecionar o mesmo arquivo de novo em seguida (ex.: depois
          // de remover da lista) — sem isso o browser não dispara onChange
          // de novo pro mesmo File.
          e.target.value = ""
        }}
        {...props}
      />
    </label>
  )
}

export { FileUploader }
export type { FileUploaderProps }
