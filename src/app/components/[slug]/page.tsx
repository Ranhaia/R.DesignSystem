import { notFound } from "next/navigation"

import { componentsList } from "@/lib/components-registry"
import { compositionRegistry } from "@/lib/composition-registry"
import { componentDocs } from "@/lib/component-docs"
import { examplesMapping } from "@/lib/examples-mapping"
import { exampleTitle } from "@/lib/example-title"
import { exampleRegistry } from "@/components/examples/registry"
import { ButtonPlayground } from "@/components/doc/button-playground"
import { GenericPlayground } from "@/components/doc/generic-playground"
import { genericPlaygroundRegistry } from "@/components/doc/generic-playground-registry"
import { renderSizePreview, renderVariantPreview } from "@/components/doc/variant-preview"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  exemploPrincipal,
  linhasAcessibilidade,
  linhasTokens,
  metricasDoTopo,
  previewDoTopo,
  secoesDoComponente,
} from "@/lib/doc-abas"
import { DocHeader } from "@/components/doc/doc-header"
import { DocLinhas } from "@/components/doc/doc-linhas"
import { DocLivePreview } from "@/components/doc/doc-live-preview"
import { DocMetaStrip } from "@/components/doc/doc-meta-strip"
import { DocPropsTabela, DocSecao, DocUso } from "@/components/doc/doc-secao"
import { DocSecoesNav } from "@/components/doc/doc-secoes-nav"
import { DocPagination } from "@/components/doc/doc-pagination"

const playgroundRegistry: Record<string, React.ComponentType> = {
  button: ButtonPlayground,
}

export function generateStaticParams() {
  return componentsList.map((c) => ({ slug: c.slug }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = componentsList.find((c) => c.slug === slug)

  if (!entry) {
    notFound()
  }

  const composition = compositionRegistry[slug] ?? []
  const exampleNames = examplesMapping[slug] ?? []
  const doc = componentDocs[slug]
  const Playground = playgroundRegistry[slug]
  const hasGenericPlayground = !Playground && Boolean(genericPlaygroundRegistry[slug])
  const showPlayground = Boolean(Playground) || hasGenericPlayground
  const firstExampleName = exemploPrincipal(exampleNames)
  const FirstExampleComponent = firstExampleName ? exampleRegistry[firstExampleName] : null

  const topo = previewDoTopo({
    temPlayground: showPlayground,
    temExemplo: Boolean(FirstExampleComponent),
  })
  const secoes = secoesDoComponente(doc, {
    temTopo: Boolean(topo),
    temExemplos: exampleNames.length > 0,
    temComposicao: composition.length > 0,
  })
  const tem = (id: string) => secoes.some((s) => s.id === id)
  const titulo = (id: string) => secoes.find((s) => s.id === id)?.label ?? id

  return (
    <div className="min-w-0 flex-1 space-y-8">
      <DocHeader slug={slug} name={entry.name} description={doc?.description} metricas={metricasDoTopo(doc)} />
      <DocMetaStrip doc={doc} />
      <DocSecoesNav secoes={secoes} />

      {tem("playground") && (
        <DocSecao id="playground" titulo={titulo("playground")}>
          {topo === "playground" ? (
            <DocLivePreview code={doc?.code} centralizar={false}>
              {Playground ? <Playground /> : <GenericPlayground slug={slug} />}
            </DocLivePreview>
          ) : (
            FirstExampleComponent && (
              <DocLivePreview code={doc?.code}>
                <FirstExampleComponent />
              </DocLivePreview>
            )
          )}
        </DocSecao>
      )}

      {doc && tem("variantes") && (
        <DocSecao id="variantes" titulo={titulo("variantes")}>
          <div className="grid gap-3 sm:grid-cols-2">
            {doc.variants.map((v) => (
              <div key={v.value} className="flex items-center gap-4 rounded-lg border bg-card p-4">
                {renderVariantPreview(slug, v.value, v.name)}
                <p className="text-xs text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </DocSecao>
      )}

      {doc && tem("tamanhos") && (
        <DocSecao id="tamanhos" titulo={titulo("tamanhos")}>
          <div className="flex flex-wrap items-end gap-4 rounded-lg border bg-card p-4">
            {doc.sizes.map((s) => (
              <div key={s.value} className="flex flex-col items-center gap-2">
                {renderSizePreview(slug, s.value)}
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </DocSecao>
      )}

      {doc && tem("estados") && (
        <DocSecao id="estados" titulo={titulo("estados")}>
          <DocLinhas linhas={doc.states.map((s) => ({ rotulo: s.name, texto: s.description }))} />
        </DocSecao>
      )}

      {tem("exemplos") && (
        <DocSecao id="exemplos" titulo={titulo("exemplos")}>
          <Accordion type="multiple" className="divide-y rounded-lg border bg-card">
            {exampleNames.map((exampleName) => {
              const ExampleComponent = exampleRegistry[exampleName]
              if (!ExampleComponent) return null
              return (
                <AccordionItem key={exampleName} value={exampleName} className="border-b px-4 last:border-b-0">
                  <AccordionTrigger className="text-base font-medium">{exampleTitle(slug, exampleName)}</AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6">
                    <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed p-6">
                      <div className="w-full">
                        <ExampleComponent />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </DocSecao>
      )}

      {doc && tem("anatomia") && (
        <DocSecao id="anatomia" titulo={titulo("anatomia")}>
          <DocLinhas linhas={doc.anatomy.map((item) => ({ rotulo: item.part, texto: item.description }))} />
        </DocSecao>
      )}

      {tem("composicao") && (
        <DocSecao id="composicao" titulo={titulo("composicao")}>
          {doc?.code && (
            <pre className="overflow-x-auto rounded-lg border bg-card p-4 font-mono text-sm">
              <code>{doc.code}</code>
            </pre>
          )}
          {composition.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Peças exportadas por{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/components/ui/{slug}.tsx</code>.
              </p>
              <div className="rounded-lg border bg-card p-4 font-mono text-sm">
                {composition.map((name) => (
                  <div key={name}>{name}</div>
                ))}
              </div>
            </div>
          )}
          {doc && <DocPropsTabela doc={doc} />}
        </DocSecao>
      )}

      {doc && tem("acessibilidade") && (
        <DocSecao id="acessibilidade" titulo={titulo("acessibilidade")}>
          <DocLinhas linhas={linhasAcessibilidade(doc)} />
        </DocSecao>
      )}

      {doc && tem("tokens") && (
        <DocSecao id="tokens" titulo={titulo("tokens")}>
          <DocLinhas linhas={linhasTokens(doc)} />
        </DocSecao>
      )}

      {doc && tem("uso") && (
        <DocSecao id="uso" titulo={titulo("uso")}>
          <DocUso doc={doc} />
        </DocSecao>
      )}

      <DocPagination slug={slug} />
    </div>
  )
}
