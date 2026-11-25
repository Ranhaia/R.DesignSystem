"use client"

import * as React from "react"

import { Tree, type CheckState, type TreeNode } from "@/components/ui/tree"

const ramos: TreeNode[] = [
  {
    value: "pessoas",
    label: "Pessoas",
    children: [
      { value: "vida", label: "Vida" },
      { value: "saude", label: "Saúde" },
    ],
  },
  { value: "pet", label: "Pet" },
]

const folhas: Record<string, string[]> = { pessoas: ["vida", "saude"], vida: ["vida"], saude: ["saude"], pet: ["pet"] }

export default function TreeMarcacao() {
  const [marcados, setMarcados] = React.useState<Set<string>>(new Set(["vida"]))

  const estado = (valor: string): CheckState => {
    const lista = folhas[valor] ?? []
    const feitos = lista.filter((f) => marcados.has(f)).length
    return feitos === 0 ? false : feitos === lista.length ? true : "indeterminate"
  }

  const alternar = (valor: string) => {
    const proximo = new Set(marcados)
    const todos = estado(valor) === true
    for (const f of folhas[valor] ?? []) {
      if (todos) proximo.delete(f)
      else proximo.add(f)
    }
    setMarcados(proximo)
  }

  return (
    <Tree
      aria-label="Ramos marcados"
      checkState={estado}
      className="w-64"
      data={ramos}
      defaultExpanded={["pessoas"]}
      multiselectable
      onSelect={alternar}
    />
  )
}