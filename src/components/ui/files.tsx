"use client"

import * as React from "react"
import { Icon } from "@/components/ui/icon"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

/*
  =============================================================================
  FILES / FILE TREE (MOMENTUM & ACCORDION EXPANSION)
  =============================================================================
  Árvore de arquivos e pastas com animação suave de expansão e recolhimento.
  Construído com base composicional do Radix Collapsible e tokens de movimento do DS.
*/

interface FilesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label de acessibilidade para a árvore de arquivos */
  label?: string
}

function Files({
  className,
  label = "Navegador de arquivos",
  children,
  ...props
}: FilesProps) {
  return (
    <div
      role="tree"
      aria-label={label}
      data-slot="files"
      className={cn(
        "flex w-full flex-col gap-0.5 select-none font-sans text-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface FolderProps extends React.ComponentProps<typeof Collapsible> {
  value: string
  defaultOpen?: boolean
}

function Folder({
  value,
  defaultOpen = false,
  className,
  children,
  ...props
}: FolderProps) {
  return (
    <Collapsible
      data-slot="folder"
      data-folder-value={value}
      defaultOpen={defaultOpen}
      className={cn("group/folder flex flex-col", className)}
      {...props}
    >
      {children}
    </Collapsible>
  )
}

interface FolderTriggerProps
  extends React.ComponentProps<typeof CollapsibleTrigger> {
  /** Ícone customizado de pasta (opcional) */
  icon?: React.ReactNode
}

function FolderTrigger({
  className,
  children,
  icon,
  ...props
}: FolderTriggerProps) {
  return (
    <CollapsibleTrigger
      data-slot="folder-trigger"
      className={cn(
        "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-sm font-medium text-foreground/90",
        "transition-colors duration-motion-fast ease-spring hover:bg-accent/70 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        className
      )}
      {...props}
    >
      <Icon
        name="keyboard_arrow_right"
        size={1}
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-motion-base ease-spring group-data-[state=open]/folder:rotate-90"
      />
      {icon ? (
        <span className="shrink-0 text-muted-foreground">{icon}</span>
      ) : (
        <span className="shrink-0 text-muted-foreground">
          <Icon
            name="folder"
            size={1}
            className="size-4 group-data-[state=open]/folder:hidden"
          />
          <Icon
            name="folder_open"
            size={1}
            className="hidden size-4 group-data-[state=open]/folder:inline"
          />
        </span>
      )}
      <span className="truncate">{children}</span>
    </CollapsibleTrigger>
  )
}

interface FolderContentProps
  extends React.ComponentProps<typeof CollapsibleContent> {}

function FolderContent({ className, children, ...props}: FolderContentProps) {
  return (
    <CollapsibleContent
      data-slot="folder-content"
      className={cn("pl-4 pr-1", className)}
      {...props}
    >
      <div
        role="group"
        className="flex flex-col gap-0.5 border-l border-border/50 pl-1.5 py-0.5"
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

interface FileProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  icon?: React.ReactNode
  active?: boolean
}

function File({
  value,
  icon,
  active = false,
  className,
  children,
  ...props
}: FileProps) {
  return (
    <div
      role="treeitem"
      data-slot="file"
      data-active={active}
      tabIndex={0}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-foreground/85",
        "transition-colors duration-motion-fast ease-spring hover:bg-accent/60 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-accent text-accent-foreground font-medium",
        className
      )}
      {...props}
    >
      {icon ? (
        <span className="shrink-0 text-muted-foreground">{icon}</span>
      ) : (
        <Icon name="description" size={1} className="size-4 shrink-0 text-muted-foreground" />
      )}
      <span className="truncate">{children ?? value}</span>
    </div>
  )
}

export { Files, Folder, FolderTrigger, FolderContent, File }
