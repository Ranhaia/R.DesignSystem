"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@/components/ui/icon"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// TreeSelect: seleção em árvore dentro de um painel flutuante, nas três
// variações do TreeSelect do Ant Design (https://ant.design/components/tree-select):
//
//   • single      — um valor só; clicar num nó escolhe e fecha o painel.
//   • multiple    — vários valores, cada nó é escolhido isoladamente (sem
//                   relação pai/filho); o painel fica aberto.
//   • checkable   — vários valores com caixa de marcação em cada nó e
//                   cascata: marcar um pai marca todos os filhos, marcar
//                   todos os filhos marca o pai, e o pai com só parte dos
//                   filhos marcados aparece indeterminado. (prioridade)
//
// Composto sobre Popover + Checkbox (já existentes no catálogo), não sobre
// Select/Combobox: nenhum dos dois modela hierarquia. A árvore segue o padrão
// WAI-ARIA TreeView (role=tree/treeitem, aria-expanded, aria-level) com foco
// virtual via aria-activedescendant — o foco real fica no container da árvore.
export interface TreeSelectNode {
  label: string
  value: string
  children?: TreeSelectNode[]
  disabled?: boolean
  /** Se ao clicar deve fechar o popover (ex: atalho de clique rápido) */
  closeOnClick?: boolean
  /** Se a seleção deste nó é exclusiva (marca apenas ele e desmarca os demais nós) */
  exclusive?: boolean
}

type ShowCheckedStrategy = "child" | "parent" | "all"

interface TreeSelectBaseProps {
  /** Árvore de opções. */
  treeData: TreeSelectNode[]
  placeholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
  id?: string
  /** Nome acessível do campo — obrigatório quando não há <label> visível. */
  "aria-label"?: string
  /** Começa com todos os nós expandidos. */
  defaultExpandAll?: boolean
  /** Valores expandidos no primeiro render (ignorado se defaultExpandAll). */
  defaultExpandedValues?: string[]
  /** Como as marcações aparecem no campo: "child" só folhas, "parent" o pai quando todos os filhos estão marcados, "all" ambos. */
  showCheckedStrategy?: ShowCheckedStrategy
  /** Máximo de tags visíveis antes de exibir +N (ex: maxTagCount={1}). */
  maxTagCount?: number
  /** Se deve exibir botão de limpar seleção (ícone X). */
  allowClear?: boolean
  /** Se deve exibir campo de busca rápida no topo do painel flutuante. */
  showSearch?: boolean
  /** Classes extras para o painel flutuante (PopoverContent). */
  dropdownClassName?: string
}

interface TreeSelectSingleProps extends TreeSelectBaseProps {
  multiple?: false
  checkable?: false
  value: string | null
  onValueChange: (value: string | null) => void
}

interface TreeSelectMultipleProps extends TreeSelectBaseProps {
  multiple: true
  checkable?: false
  value: string[]
  onValueChange: (value: string[]) => void
}

interface TreeSelectCheckableProps extends TreeSelectBaseProps {
  checkable: true
  multiple?: true
  /** Como as marcações aparecem no campo (igual ao showCheckedStrategy do
   *  Ant Design): "child" só as folhas, "parent" o pai quando todos os
   *  filhos estão marcados, "all" pais e folhas. */
  showCheckedStrategy?: ShowCheckedStrategy
  /** Valores marcados. Aceita folhas e/ou pais (um pai vale por todas as
   *  folhas abaixo dele). */
  value: string[]
  /** Devolve sempre as folhas marcadas — a forma canônica, sem duplicar
   *  informação que a hierarquia já carrega. */
  onValueChange: (value: string[]) => void
}

type TreeSelectProps =
  | TreeSelectSingleProps
  | TreeSelectMultipleProps
  | TreeSelectCheckableProps

interface FlatNode {
  node: TreeSelectNode
  parent: string | null
  level: number
  leaves: string[]
}

// Índice plano da árvore: pai, nível e folhas habilitadas de cada nó.
function buildIndex(treeData: TreeSelectNode[]) {
  const map = new Map<string, FlatNode>()
  const walk = (nodes: TreeSelectNode[], parent: string | null, level: number) => {
    for (const node of nodes) {
      const leaves: string[] = []
      map.set(node.value, { node, parent, level, leaves })
      if (node.children?.length) {
        walk(node.children, node.value, level + 1)
        for (const child of node.children) {
          const entry = map.get(child.value)!
          if (child.children?.length) leaves.push(...entry.leaves)
          else if (!child.disabled) leaves.push(child.value)
        }
      } else if (!node.disabled) {
        leaves.push(node.value)
      }
    }
  }
  walk(treeData, null, 1)
  return map
}

function hasChildren(node: TreeSelectNode) {
  return !!node.children?.length
}

function TreeSelect(props: TreeSelectProps) {
  const {
    treeData,
    placeholder = "Selecione...",
    emptyText = "Nenhum resultado encontrado.",
    disabled = false,
    className,
    id,
    "aria-label": ariaLabel,
    defaultExpandAll = false,
    defaultExpandedValues = [],
    maxTagCount,
    allowClear = false,
    showSearch = true,
    dropdownClassName,
  } = props
  const checkable = props.checkable === true
  const multiple = checkable || props.multiple === true
  // Padrão "child" é o contrato documentado do DS; quem quer "parent" passa explícito.
  const strategy: ShowCheckedStrategy = props.showCheckedStrategy ?? "child"

  const listId = React.useId()
  const index = React.useMemo(() => buildIndex(treeData), [treeData])

  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [expanded, setExpanded] = React.useState<Set<string>>(() => {
    if (!defaultExpandAll) return new Set(defaultExpandedValues)
    const all = new Set<string>()
    for (const [value, { node }] of buildIndex(treeData)) {
      if (hasChildren(node)) all.add(value)
    }
    return all
  })
  const [activeValue, setActiveValue] = React.useState<string | null>(null)

  // Atualiza expansão quando defaultExpandAll ou treeData mudarem
  React.useEffect(() => {
    if (defaultExpandAll) {
      const all = new Set<string>()
      for (const [value, { node }] of index) {
        if (hasChildren(node)) all.add(value)
      }
      setExpanded(all)
    }
  }, [defaultExpandAll, index])

  // Limpa busca quando fecha o painel
  React.useEffect(() => {
    if (!open) setSearchQuery("")
  }, [open])

  // ---- estado de seleção -------------------------------------------------
  const selectedSet = React.useMemo(() => {
    const raw = props.value
    if (raw === null || raw === undefined) return new Set<string>()
    const list = Array.isArray(raw) ? raw : [raw]
    if (!checkable) return new Set(list)
    // Checkable: um pai no value vale por todas as folhas abaixo dele.
    const leaves = new Set<string>()
    for (const v of list) {
      const entry = index.get(v)
      if (!entry) continue
      for (const leaf of entry.leaves) leaves.add(leaf)
    }
    return leaves
  }, [props.value, checkable, index])

  const checkState = React.useCallback(
    (value: string): boolean | "indeterminate" => {
      const entry = index.get(value)
      if (!entry) return false
      if (!hasChildren(entry.node)) return selectedSet.has(value)
      const total = entry.leaves.length
      if (total === 0) return false
      const checked = entry.leaves.filter((l) => selectedSet.has(l)).length
      if (checked === 0) return false
      return checked === total ? true : "indeterminate"
    },
    [index, selectedSet]
  )

  // ---- busca e nós visíveis ---------------------------------------------
  const matchingSet = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return null
    const matched = new Set<string>()
    for (const [val, { node }] of index) {
      if (node.label.toLowerCase().includes(q)) {
        matched.add(val)
      }
    }
    const visibleWithAncestors = new Set<string>(matched)
    for (const val of matched) {
      let current = index.get(val)?.parent
      while (current) {
        visibleWithAncestors.add(current)
        current = index.get(current)?.parent
      }
    }
    return visibleWithAncestors
  }, [searchQuery, index])

  const visible = React.useMemo(() => {
    const out: string[] = []
    if (matchingSet) {
      const walk = (nodes: TreeSelectNode[]) => {
        for (const node of nodes) {
          if (matchingSet.has(node.value)) {
            out.push(node.value)
            if (hasChildren(node)) walk(node.children!)
          }
        }
      }
      walk(treeData)
      return out
    }
    const walk = (nodes: TreeSelectNode[]) => {
      for (const node of nodes) {
        out.push(node.value)
        if (hasChildren(node) && expanded.has(node.value)) walk(node.children!)
      }
    }
    walk(treeData)
    return out
  }, [treeData, expanded, matchingSet])

  // ---- ações -------------------------------------------------------------
  const emit = (next: string[] | string | null) => {
    ;(props.onValueChange as (v: string[] | string | null) => void)(next)
  }

  const toggleExpanded = (value: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })

  const choose = (value: string) => {
    const entry = index.get(value)
    if (!entry || entry.node.disabled) return
    setActiveValue(value)

    if (checkable) {
      if (entry.node.exclusive) {
        const isCurrentlySelected = selectedSet.has(value)
        if (isCurrentlySelected) {
          emit([])
        } else {
          emit([value])
        }
        if (entry.node.closeOnClick) {
          setOpen(false)
        }
        return
      }

      // Desmarca nós exclusivos quando qualquer outro nó for selecionado
      const next = new Set<string>()
      for (const val of selectedSet) {
        const item = index.get(val)
        if (!item?.node.exclusive) {
          next.add(val)
        }
      }

      const state = checkState(value)
      for (const leaf of entry.leaves) {
        if (state === true) next.delete(leaf)
        else next.add(leaf)
      }
      emit([...next])
      if (entry.node.closeOnClick) {
        setOpen(false)
      }
      return
    }
    if (multiple) {
      const list = props.value as string[]
      emit(
        list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
      )
      return
    }
    emit(props.value === value ? null : value)
    setOpen(false)
  }

  const remove = (value: string) => {
    if (checkable) {
      const entry = index.get(value)
      const drop = new Set(entry?.leaves ?? [value])
      emit([...selectedSet].filter((v) => !drop.has(v)))
    } else {
      emit((props.value as string[]).filter((v) => v !== value))
    }
  }

  // ---- o que aparece no campo --------------------------------------------
  const tags = React.useMemo(() => {
    if (!multiple) return []
    if (!checkable) return props.value as string[]
    if (strategy === "child") return [...selectedSet]
    const out: string[] = []
    const walk = (nodes: TreeSelectNode[]) => {
      for (const node of nodes) {
        const full = hasChildren(node) && checkState(node.value) === true
        if (full && strategy === "parent") {
          out.push(node.value)
          continue
        }
        if (full && strategy === "all") out.push(node.value)
        if (hasChildren(node)) walk(node.children!)
        else if (selectedSet.has(node.value)) out.push(node.value)
      }
    }
    walk(treeData)
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiple, checkable, strategy, selectedSet, treeData, checkState])

  const visibleTags = React.useMemo(() => {
    if (maxTagCount === undefined || maxTagCount === null || tags.length <= maxTagCount) {
      return tags
    }
    return tags.slice(0, maxTagCount)
  }, [tags, maxTagCount])

  const overflowCount = React.useMemo(() => {
    if (maxTagCount === undefined || maxTagCount === null || tags.length <= maxTagCount) {
      return 0
    }
    return tags.length - maxTagCount
  }, [tags, maxTagCount])

  const labelOf = (value: string) => index.get(value)?.node.label ?? value
  const singleValue = !multiple ? (props.value as string | null) : null

  // ---- teclado (WAI-ARIA TreeView) ---------------------------------------
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (visible.length === 0) return
    const current = activeValue && visible.includes(activeValue) ? activeValue : visible[0]
    const at = visible.indexOf(current)
    const entry = index.get(current)!
    switch (event.key) {
      case "ArrowDown":
        setActiveValue(visible[Math.min(at + 1, visible.length - 1)])
        break
      case "ArrowUp":
        setActiveValue(visible[Math.max(at - 1, 0)])
        break
      case "Home":
        setActiveValue(visible[0])
        break
      case "End":
        setActiveValue(visible[visible.length - 1])
        break
      case "ArrowRight":
        if (hasChildren(entry.node)) {
          if (!expanded.has(current)) toggleExpanded(current)
          else setActiveValue(entry.node.children![0].value)
        }
        break
      case "ArrowLeft":
        if (hasChildren(entry.node) && expanded.has(current)) toggleExpanded(current)
        else if (entry.parent) setActiveValue(entry.parent)
        break
      case "Enter":
      case " ":
        choose(current)
        break
      default:
        return
    }
    event.preventDefault()
  }

  const hasValue = multiple ? tags.length > 0 : singleValue !== null
  const activeDescendant =
    open && activeValue ? `${listId}-${activeValue}` : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <div
          role="combobox"
          id={id}
          aria-label={ariaLabel ?? placeholder}
          aria-expanded={open}
          aria-haspopup="tree"
          aria-controls={open ? listId : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          data-slot="tree-select"
          data-placeholder={hasValue ? undefined : ""}
          data-checkable={checkable ? "" : undefined}
          className={cn(
            "flex min-h-9 w-64 cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50",
            className
          )}
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {multiple ? (
              tags.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {visibleTags.map((value) => (
                    <span
                      key={value}
                      data-slot="tree-select-tag"
                      className="flex h-5.5 w-fit max-w-full items-center gap-1 rounded-sm bg-muted pl-1.5 pr-0.5 text-xs font-medium text-foreground select-none"
                    >
                      <span className="truncate max-w-[130px]">{labelOf(value)}</span>
                      {!disabled && (
                        <button
                          type="button"
                          aria-label={`Remover ${labelOf(value)}`}
                          className="flex size-4 items-center justify-center rounded-sm opacity-50 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
                          onClick={(event) => {
                            event.stopPropagation()
                            remove(value)
                          }}
                        >
                          <Icon name="close" size={0.75} />
                        </button>
                      )}
                    </span>
                  ))}
                  {overflowCount > 0 && (
                    <span
                      data-slot="tree-select-tag-overflow"
                      className="flex h-5.5 items-center rounded-sm bg-muted px-1.5 text-xs font-medium text-muted-foreground select-none"
                      title={tags.slice(maxTagCount).map(labelOf).join(", ")}
                    >
                      +{overflowCount}
                    </span>
                  )}
                </>
              )
            ) : (
              <span className="line-clamp-1">
                {singleValue !== null ? labelOf(singleValue) : placeholder}
              </span>
            )}
          </span>
          <div className="flex items-center gap-0.5 shrink-0">
            {allowClear && hasValue && !disabled && (
              <button
                type="button"
                aria-label="Limpar seleção"
                className="flex size-5 items-center justify-center rounded-sm text-muted-foreground opacity-50 outline-none hover:opacity-100 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                onClick={(event) => {
                  event.stopPropagation()
                  if (checkable || multiple) emit([])
                  else emit(null)
                }}
              >
                <Icon name="close" size={0.875} />
              </button>
            )}
            <Icon
              name="keyboard_arrow_down"
              size={1}
              className={cn(
                "pointer-events-none text-muted-foreground opacity-50 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "w-(--radix-popover-trigger-width) min-w-[300px] max-w-[460px] p-0 shadow-md",
          dropdownClassName
        )}
        onOpenAutoFocus={(event: Event) => {
          event.preventDefault()
          if (!showSearch) {
            ;(event.currentTarget as HTMLElement)
              .querySelector<HTMLElement>("[role=tree]")
              ?.focus()
            setActiveValue(
              (singleValue && visible.includes(singleValue) ? singleValue : null) ??
                visible[0] ??
                null
            )
          }
        }}
      >
        {showSearch && (
          <div className="flex items-center gap-1.5 border-b px-2.5 py-2 text-muted-foreground">
            <Icon name="search" size={0.875} className="shrink-0 opacity-60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              aria-label="Buscar na lista"
              className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Limpar busca"
                onClick={() => setSearchQuery("")}
                className="flex size-4 items-center justify-center rounded-xs opacity-60 hover:opacity-100"
              >
                <Icon name="close" size={0.75} />
              </button>
            )}
          </div>
        )}

        <div className="p-1">
          {treeData.length === 0 || visible.length === 0 ? (
            <p className="px-3 py-4 text-center text-xs text-muted-foreground">{emptyText}</p>
          ) : (
            <ul
              id={listId}
              role="tree"
              aria-multiselectable={multiple || undefined}
              aria-label={ariaLabel ?? placeholder}
              aria-activedescendant={activeDescendant}
              tabIndex={0}
              onKeyDown={onKeyDown}
              className="max-h-72 overflow-y-auto outline-none"
            >
              {visible.map((value) => {
                const { node, level } = index.get(value)!
                const parentNode = hasChildren(node)
                const state = checkable ? checkState(value) : undefined
                const selected = checkable
                  ? state === true
                  : multiple
                    ? (props.value as string[]).includes(value)
                    : singleValue === value
                const isExpanded = matchingSet ? true : expanded.has(value)
                return (
                  <li
                    key={value}
                    id={`${listId}-${value}`}
                    role="treeitem"
                    aria-level={level}
                    aria-expanded={parentNode ? isExpanded : undefined}
                    aria-selected={checkable ? undefined : selected}
                    aria-checked={checkable ? (state === "indeterminate" ? "mixed" : state) : undefined}
                    aria-disabled={node.disabled || undefined}
                    data-slot="tree-select-item"
                    data-active={activeValue === value ? "" : undefined}
                    data-selected={selected ? "" : undefined}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-sm py-1 pr-2 text-sm select-none transition-colors data-[active]:bg-accent data-[active]:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50",
                      !checkable && selected && "font-medium"
                    )}
                    style={{ paddingLeft: `${(level - 1) * 1.125 + 0.25}rem` }}
                    onMouseMove={() => setActiveValue(value)}
                    onClick={() => choose(value)}
                  >
                    {parentNode ? (
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label={isExpanded ? "Recolher" : "Expandir"}
                        className="flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted"
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleExpanded(value)
                        }}
                      >
                        <Icon
                          name="chevron_right"
                          size={1}
                          className={cn(
                            "transition-transform duration-150",
                            isExpanded && "rotate-90"
                          )}
                        />
                      </button>
                    ) : (
                      <span className="size-5 shrink-0" aria-hidden="true" />
                    )}
                    {checkable && (
                      <Checkbox
                        tabIndex={-1}
                        aria-hidden="true"
                        checked={state}
                        disabled={node.disabled}
                        className="pointer-events-none shrink-0"
                      />
                    )}
                    <span className="min-w-0 flex-1 truncate text-xs sm:text-sm">{node.label}</span>
                    {!checkable && selected && (
                      <Icon name="check" size={1} className="shrink-0 text-primary" />
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {checkable && treeData.length > 0 && (
          <div className="flex items-center justify-between border-t border-border/50 px-2.5 py-1.5 text-[11px] text-muted-foreground bg-muted/20">
            <span>
              {selectedSet.size === 0
                ? "Nenhum item selecionado"
                : `${selectedSet.size} ${selectedSet.size === 1 ? "selecionado" : "selecionados"}`}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const allLeaves: string[] = []
                  for (const [, entry] of index) {
                    if (!hasChildren(entry.node) && !entry.node.disabled && !entry.node.exclusive) {
                      allLeaves.push(entry.node.value)
                    }
                  }
                  emit(allLeaves)
                }}
                className="cursor-pointer font-medium text-primary hover:underline"
              >
                Todos
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => emit([])}
                className="cursor-pointer font-medium text-muted-foreground hover:text-foreground"
              >
                Limpar
              </button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

function TreeSelectSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      data-slot="tree-select-skeleton"
      className={cn("h-9 w-64 rounded-md", className)}
      {...props}
    />
  )
}

const TreeSelectWithSkeleton = Object.assign(TreeSelect, {
  Skeleton: TreeSelectSkeleton,
})

export { TreeSelectWithSkeleton as TreeSelect }
