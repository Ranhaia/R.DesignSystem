import * as React from "react"

import { Icon } from "@/components/ui/icon"
import type { ComponentDoc } from "@/lib/component-docs"
import { itensQuandoUsar, linhasVariantesProps } from "@/lib/doc-abas"

// Uma seção da rolagem única: o id é o mesmo do nav âncora (secoesDoComponente).
export function DocSecao({
  id,
  titulo,
  children,
}: {
  id: string
  titulo: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <h2 className="font-heading text-xl font-semibold tracking-tight">{titulo}</h2>
      {children}
    </section>
  )
}

export function DocPropsTabela({ doc }: { doc: ComponentDoc }) {
  const linhas = linhasVariantesProps(doc)
  if (linhas.length === 0) return null
  const grupos = (["Variantes", "Tamanhos", "Props"] as const)
    .map((nome) => ({ nome, linhas: linhas.filter((l) => l.grupo === nome) }))
    .filter((g) => g.linhas.length > 0)
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b text-muted-foreground">
          <tr>
            <th className="p-3 font-medium">Nome</th>
            <th className="p-3 font-medium">Tipo e padrão</th>
            <th className="p-3 font-medium">O que faz</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {grupos.map((g) => (
            <React.Fragment key={g.nome}>
              <tr className="bg-muted/40">
                <td colSpan={3} className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {g.nome}
                </td>
              </tr>
              {g.linhas.map((l, i) => (
                <tr key={`${l.grupo}-${l.nome}-${i}`}>
                  <td className="p-3 font-mono text-xs">{l.nome}</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">{l.detalhe}</td>
                  <td className="p-3 text-muted-foreground">{l.descricao}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Lista({ titulo, itens, icone }: { titulo: string; itens: string[]; icone?: "check" | "close" }) {
  if (itens.length === 0) return null
  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground">{titulo}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {itens.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            {icone ? (
              <Icon
                name={icone}
                size={1}
                className={`mt-0.5 shrink-0 ${icone === "check" ? "text-success-600" : "text-destructive"}`}
              />
            ) : (
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Quando usar / não usar / faça / não faça: a decisão de usar a peça, num bloco só.
export function DocUso({ doc }: { doc: ComponentDoc }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Lista titulo="Quando usar" itens={itensQuandoUsar(doc)} />
      <Lista titulo="Quando não usar" itens={doc.whenNotToUse ?? []} />
      <Lista titulo="Faça" itens={doc.doGuidelines ?? []} icone="check" />
      <Lista titulo="Não faça" itens={doc.dontGuidelines ?? []} icone="close" />
    </div>
  )
}
