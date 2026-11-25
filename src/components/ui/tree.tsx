"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@/components/ui/icon"
import { useTexto } from "@/lib/idioma"
import { cn } from "@/lib/utils"

// Árvore no padrão WAI-ARIA TreeView (role=tree/treeitem, aria-expanded,
// aria-level), com foco virtual via aria-activedescendant: o foco real fica no
// <ul>. Nasceu dentro do tree-select, que agora a usa no painel.
export interface TreeNode {
  label: string
  value: string
  children?: TreeNode[]
  disabled?: boolean
}

type CheckState = boolean | "indeterminate"

function treeHasChildren(node: TreeNode) {
  return !!node.children?.length
}

// Índice plano: nó, pai e nível de cada valor.
function buildTreeIndex(data: TreeNode[]) {
  const map = new Map<string, { node: TreeNode; parent: string | null; level: number }>()
  const walk = (nodes: TreeNode[], parent: string | null, level: number) => {
    for (const node of nodes) {
      map.set(node.value, { node, parent, level })
      if (node.children?.length) walk(node.children, node.value, level + 1)
    }
  }
  walk(data, null, 1)
  return map
}

/** Valores na ordem em que aparecem. Com `filter`, só ele, com tudo aberto. */
function visibleTreeValues(data: TreeNode[], expanded: Set<string>, filter?: Set<string> | null) {
  const out: string[] = []
  const walk = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      if (filter && !filter.has(node.value)) continue
      out.push(node.value)
      if (treeHasChildren(node) && (filter || expanded.has(node.value))) walk(node.children!)
    }
  }
  walk(data)
  return out
}

type TreeProps = Omit<React.ComponentProps<"ul">, "onSelect"> & {
  data: TreeNode[]
  /** Valores abertos (controlado). */
  expanded?: Set<string>
  defaultExpanded?: Iterable<string>
  onExpandedChange?: (abertos: Set<string>) => void
  /** Só estes valores aparecem, todos abertos (ex.: resultado de busca). */
  filter?: Set<string> | null
  /** Item com foco virtual (controlado). */
  activeValue?: string | null
  onActiveValueChange?: (valor: string) => void
  /** Clique, Enter ou Espaço num item. */
  onSelect?: (valor: string) => void
  isSelected?: (valor: string) => boolean
  /** Com esta função, cada item ganha caixa de marcação (aria-checked). */
  checkState?: (valor: string) => CheckState
  multiselectable?: boolean
}

function Tree({
  data,
  expanded: expandedProp,
  defaultExpanded,
  onExpandedChange,
  filter = null,
  activeValue: activeProp,
  onActiveValueChange,
  onSelect,
  isSelected,
  checkState,
  multiselectable,
  id: idProp,
  className,
  onKeyDown,
  ...props
}: TreeProps) {
  const t = useTexto()
  const idGerado = React.useId()
  const id = idProp ?? idGerado
  const index = React.useMemo(() => buildTreeIndex(data), [data])
  const [expandedInterno, setExpandedInterno] = React.useState(() => new Set(defaultExpanded))
  const expanded = expandedProp ?? expandedInterno
  const [activeInterno, setActiveInterno] = React.useState<string | null>(null)
  const activeValue = activeProp === undefined ? activeInterno : activeProp
  const visible = React.useMemo(() => visibleTreeValues(data, expanded, filter), [data, expanded, filter])
  const checkable = !!checkState

  const setActive = (v: string) => {
    if (activeProp === undefined) setActiveInterno(v)
    onActiveValueChange?.(v)
  }

  const toggleExpanded = (v: string) => {
    const next = new Set(expanded)
    if (next.has(v)) next.delete(v)
    else next.add(v)
    if (expandedProp === undefined) setExpandedInterno(next)
    onExpandedChange?.(next)
  }

  const choose = (v: string) => {
    if (index.get(v)?.node.disabled) return
    setActive(v)
    onSelect?.(v)
  }

  const teclado = (event: React.KeyboardEvent<HTMLUListElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || visible.length === 0) return
    const current = activeValue && visible.includes(activeValue) ? activeValue : visible[0]
    const at = visible.indexOf(current)
    const entry = index.get(current)!
    switch (event.key) {
      case "ArrowDown":
        setActive(visible[Math.min(at + 1, visible.length - 1)])
        break
      case "ArrowUp":
        setActive(visible[Math.max(at - 1, 0)])
        break
      case "Home":
        setActive(visible[0])
        break
      case "End":
        setActive(visible[visible.length - 1])
        break
      case "ArrowRight":
        if (treeHasChildren(entry.node)) {
          if (!expanded.has(current)) toggleExpanded(current)
          else setActive(entry.node.children![0].value)
        }
        break
      case "ArrowLeft":
        if (treeHasChildren(entry.node) && expanded.has(current)) toggleExpanded(current)
        else if (entry.parent) setActive(entry.parent)
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

  return (
    <ul
      id={id}
      role="tree"
      data-slot="tree"
      aria-multiselectable={multiselectable || undefined}
      aria-activedescendant={activeValue ? `${id}-${activeValue}` : undefined}
      tabIndex={0}
      onKeyDown={teclado}
      className={cn(
        "outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2",
        className
      )}
      {...props}
    >
      {visible.map((value) => {
        const { node, level } = index.get(value)!
        const parentNode = treeHasChildren(node)
        const state = checkState?.(value)
        const selected = checkable ? state === true : !!isSelected?.(value)
        const isExpanded = filter ? true : expanded.has(value)
        return (
          <li
            key={value}
            id={`${id}-${value}`}
            role="treeitem"
            aria-level={level}
            aria-expanded={parentNode ? isExpanded : undefined}
            aria-selected={checkable ? undefined : selected}
            aria-checked={checkable ? (state === "indeterminate" ? "mixed" : state) : undefined}
            aria-disabled={node.disabled || undefined}
            data-slot="tree-item"
            data-active={activeValue === value ? "" : undefined}
            data-selected={selected ? "" : undefined}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-sm py-1 pr-2 text-sm select-none transition-colors data-[active]:bg-accent data-[active]:text-accent-foreground data-[active]:outline-solid data-[active]:outline-2 data-[active]:outline-ring data-[active]:-outline-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50",
              !checkable && selected && "font-medium"
            )}
            // recuo por nível: 4,5 unidades por nível + 1 de margem
            style={{ paddingLeft: `calc(var(--spacing) * ${(level - 1) * 4.5 + 1})` }}
            onMouseMove={() => setActive(value)}
            onClick={() => choose(value)}
          >
            {parentNode ? (
              <button
                type="button"
                tabIndex={-1}
                aria-label={isExpanded ? t("tree.recolher") : t("tree.expandir")}
                className="flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted"
                onClick={(event) => {
                  event.stopPropagation()
                  toggleExpanded(value)
                }}
              >
                <Icon
                  name="chevron_right"
                  size={1}
                  className={cn("transition-transform duration-motion-fast", isExpanded && "rotate-90")}
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
            {!checkable && selected && <Icon name="check" size={1} className="shrink-0 text-primary" />}
          </li>
        )
      })}
    </ul>
  )
}

export { Tree, buildTreeIndex, treeHasChildren, visibleTreeValues, type CheckState }
