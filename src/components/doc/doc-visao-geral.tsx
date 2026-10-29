import * as React from "react"
import { DocLinhas } from "@/components/doc/doc-linhas"
import { Icon } from "@/components/ui/icon"
import type { ComponentDoc } from "@/lib/component-docs"
import {
  blocosVisaoGeral,
  itensQuandoUsar,
  linhasVariantesProps,
  rotulosBlocosVisaoGeral,
} from "@/lib/doc-abas"

interface DocVisaoGeralProps {
  doc: ComponentDoc
}

export function DocVisaoGeral({ doc }: DocVisaoGeralProps) {
  const blocos = blocosVisaoGeral(doc)
  const itensUsar = itensQuandoUsar(doc)
  const linhasTabela = linhasVariantesProps(doc)

  const ordemGrupos = ["Variantes", "Tamanhos", "Props"] as const
  const grupos = ordemGrupos
    .map((g) => ({
      nome: g,
      linhas: linhasTabela.filter((l) => l.grupo === g),
    }))
    .filter((g) => g.linhas.length > 0)

  if (blocos.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Sem informações gerais para este componente.
      </p>
    )
  }

  return (
    <div className="space-y-8">
      <nav
        aria-label="Nesta página"
        className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b pb-4 text-xs text-muted-foreground"
      >
        <span className="font-medium text-foreground">Nesta página:</span>
        {blocos.map((blocoId) => (
          <a
            key={blocoId}
            href={`#${blocoId}`}
            className="transition-colors hover:text-foreground hover:underline"
          >
            {rotulosBlocosVisaoGeral[blocoId]}
          </a>
        ))}
      </nav>

      {blocos.includes("quando-usar") && itensUsar.length > 0 && (
        <section id="quando-usar" className="scroll-mt-20 space-y-3">
          <h2 className="font-heading text-lg font-semibold">Quando usar</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {itensUsar.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {blocos.includes("quando-nao-usar") &&
        doc.whenNotToUse &&
        doc.whenNotToUse.length > 0 && (
          <section id="quando-nao-usar" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">
              Quando não usar
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {doc.whenNotToUse.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

      {blocos.includes("variantes-props") && grupos.length > 0 && (
        <section id="variantes-props" className="scroll-mt-20 space-y-3">
          <h2 className="font-heading text-lg font-semibold">
            Variantes e props
          </h2>
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
                {grupos.map((grupo) => (
                  <React.Fragment key={grupo.nome}>
                    <tr className="bg-muted/40">
                      <td
                        colSpan={3}
                        className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {grupo.nome}
                      </td>
                    </tr>
                    {grupo.linhas.map((linha, idx) => (
                      <tr key={`${linha.grupo}-${linha.nome}-${idx}`}>
                        <td className="p-3 font-mono text-xs">{linha.nome}</td>
                        <td className="p-3 font-mono text-xs text-muted-foreground">
                          {linha.detalhe}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {linha.descricao}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {blocos.includes("estados") && doc.states && doc.states.length > 0 && (
        <section id="estados" className="scroll-mt-20 space-y-3">
          <h2 className="font-heading text-lg font-semibold">Estados</h2>
          <DocLinhas
            linhas={doc.states.map((s) => ({ rotulo: s.name, texto: s.description }))}
          />
        </section>
      )}

      {blocos.includes("faca-nao-faca") && (
        <section id="faca-nao-faca" className="scroll-mt-20 space-y-3">
          <h2 className="font-heading text-lg font-semibold">
            Faça e não faça
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {doc.doGuidelines && doc.doGuidelines.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Faça</h3>
                <ul className="space-y-2 text-sm">
                  {doc.doGuidelines.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <Icon
                        name="check"
                        size={1}
                        className="mt-0.5 shrink-0 text-success-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {doc.dontGuidelines && doc.dontGuidelines.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Não faça
                </h3>
                <ul className="space-y-2 text-sm">
                  {doc.dontGuidelines.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <Icon
                        name="close"
                        size={1}
                        className="mt-0.5 shrink-0 text-destructive"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
