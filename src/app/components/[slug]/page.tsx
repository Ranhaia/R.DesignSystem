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
import { TabsContent } from "@/components/ui/tabs"
import {
  abasDoComponente,
  exemploPrincipal,
  linhasAcessibilidade,
  linhasTokens,
  previewDoTopo,
} from "@/lib/doc-abas"
import { DocHeader } from "@/components/doc/doc-header"
import { DocLinhas } from "@/components/doc/doc-linhas"
import { DocLivePreview } from "@/components/doc/doc-live-preview"
import { DocMetaStrip } from "@/components/doc/doc-meta-strip"
import { DocTabs } from "@/components/doc/doc-tabs"
import { DocVisaoGeral } from "@/components/doc/doc-visao-geral"
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

  const abas = abasDoComponente(doc, {
    temExemplos: exampleNames.length > 0,
    temComposicao: composition.length > 0,
  })
  const topo = previewDoTopo({
    temPlayground: showPlayground,
    temExemplo: Boolean(FirstExampleComponent),
  })

  return (
    <div className="min-w-0 flex-1 space-y-8">
      <DocHeader slug={slug} name={entry.name} description={doc?.description} />

      {topo === "playground" && (
        <DocLivePreview code={doc?.code} centralizar={false}>
          {Playground ? <Playground /> : <GenericPlayground slug={slug} />}
        </DocLivePreview>
      )}
      {topo === "exemplo" && FirstExampleComponent && (
        <DocLivePreview code={doc?.code}>
          <FirstExampleComponent />
        </DocLivePreview>
      )}

      <DocMetaStrip doc={doc} />

      <DocTabs abas={abas}>
        <TabsContent value="visao-geral" className="space-y-8 outline-none">
          {doc ? (
            <DocVisaoGeral doc={doc} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Sem informações gerais para este componente.
            </p>
          )}
        </TabsContent>

        {abas.some((a) => a.id === "exemplos") && (
          <TabsContent value="exemplos" className="space-y-8 outline-none">
            {doc && doc.variants && doc.variants.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-heading text-lg font-semibold">Variantes</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {doc.variants.map((v) => (
                    <div
                      key={v.value}
                      className="flex items-center gap-4 rounded-lg border bg-card p-4"
                    >
                      {renderVariantPreview(slug, v.value, v.name)}
                      <p className="text-xs text-muted-foreground">
                        {v.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {doc && doc.sizes && doc.sizes.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-heading text-lg font-semibold">Tamanhos</h2>
                <div className="flex flex-wrap items-end gap-4 rounded-lg border bg-card p-4">
                  {doc.sizes.map((s) => (
                    <div key={s.value} className="flex flex-col items-center gap-2">
                      {renderSizePreview(slug, s.value)}
                      <span className="text-xs text-muted-foreground">
                        {s.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {exampleNames.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-heading text-lg font-semibold">Exemplos</h2>
                <Accordion
                  type="multiple"
                  className="rounded-lg border bg-card divide-y"
                >
                  {exampleNames.map((exampleName) => {
                    const ExampleComponent = exampleRegistry[exampleName]
                    if (!ExampleComponent) return null
                    const title = exampleTitle(slug, exampleName)
                    return (
                      <AccordionItem
                        key={exampleName}
                        value={exampleName}
                        className="border-b last:border-b-0 px-4"
                      >
                        <AccordionTrigger className="text-base font-medium">
                          {title}
                        </AccordionTrigger>
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
              </section>
            )}
          </TabsContent>
        )}

        {abas.some((a) => a.id === "codigo") && (
          <TabsContent value="codigo" className="space-y-8 outline-none">
            {doc?.code && (
              <section className="space-y-3">
                <h2 className="font-heading text-lg font-semibold">
                  Exemplo de uso
                </h2>
                <pre className="overflow-x-auto rounded-lg border bg-card p-4 font-mono text-sm">
                  <code>{doc.code}</code>
                </pre>
              </section>
            )}

            {doc && doc.anatomy && doc.anatomy.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-heading text-lg font-semibold">Anatomia</h2>
                <DocLinhas
                  linhas={doc.anatomy.map((item) => ({
                    rotulo: item.part,
                    texto: item.description,
                  }))}
                />
              </section>
            )}

            {composition.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-heading text-lg font-semibold">
                  Composição
                </h2>
                <p className="text-sm text-muted-foreground">
                  Peças exportadas por{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    src/components/ui/{slug}.tsx
                  </code>
                  .
                </p>
                <div className="rounded-lg border bg-card p-4 font-mono text-sm">
                  {composition.map((name) => (
                    <div key={name}>{name}</div>
                  ))}
                </div>
              </section>
            )}
          </TabsContent>
        )}

        {abas.some((a) => a.id === "tokens") && doc && (
          <TabsContent value="tokens" className="space-y-8 outline-none">
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-semibold">
                Tokens usados
              </h2>
              <DocLinhas linhas={linhasTokens(doc)} />
            </section>
          </TabsContent>
        )}

        {abas.some((a) => a.id === "acessibilidade") && doc && (
          <TabsContent value="acessibilidade" className="space-y-8 outline-none">
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-semibold">
                Acessibilidade
              </h2>
              <DocLinhas linhas={linhasAcessibilidade(doc)} />
            </section>
          </TabsContent>
        )}
      </DocTabs>

      <DocPagination slug={slug} />
    </div>
  )
}
