import { notFound } from "next/navigation"

import { componentsList } from "@/lib/components-registry"
import { compositionRegistry } from "@/lib/composition-registry"
import { componentDocs } from "@/lib/component-docs"
import { examplesMapping } from "@/lib/examples-mapping"
import { exampleTitle } from "@/lib/example-title"
import { exampleRegistry } from "@/components/examples/registry"
import { ButtonPlayground } from "@/components/doc/button-playground"
import { GenericPlayground, genericPlaygroundRegistry } from "@/components/doc/generic-playground"
import { renderSizePreview, renderVariantPreview } from "@/components/doc/variant-preview"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Button mantém um Playground dedicado (tem controle de "loading", que é
// específico dele). Os demais componentes com variante/tamanho real usam o
// GenericPlayground (genericPlaygroundRegistry), dirigido pelos dados de
// component-docs.ts.
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

  return (
    <div className="flex flex-1 gap-8">
      <div className="min-w-0 flex-1 space-y-10">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {entry.name}
          </h1>
          <Badge variant="outline">
            {exampleNames.length} exemplo{exampleNames.length === 1 ? "" : "s"}
          </Badge>
        </div>

        {doc && (
          <section id="descricao" className="scroll-mt-20 space-y-2">
            <h2 className="font-heading text-lg font-semibold">Descrição</h2>
            <p className="text-muted-foreground text-sm">{doc.description}</p>
          </section>
        )}

        {doc && (
          <section id="quando-utilizar" className="scroll-mt-20 space-y-2">
            <h2 className="font-heading text-lg font-semibold">
              Quando utilizar
            </h2>
            <p className="text-muted-foreground text-sm">{doc.whenToUse}</p>
          </section>
        )}

        {doc && (
          <section id="anatomia" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Anatomia</h2>
            <div className="divide-y rounded-lg border bg-card">
              {doc.anatomy.map((item) => (
                <div key={item.part} className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <span className="text-sm font-medium">{item.part}</span>
                  <span className="text-muted-foreground text-sm">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {composition.length > 0 && (
          <section id="composicao" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Composição</h2>
            <p className="text-muted-foreground text-sm">
              Peças exportadas por{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
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

        {doc && doc.variants.length > 0 && (
          <section id="variantes" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Variantes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {doc.variants.map((v) => (
                <div
                  key={v.value}
                  className="flex items-center gap-4 rounded-lg border bg-card p-4"
                >
                  {renderVariantPreview(slug, v.value, v.name)}
                  <p className="text-muted-foreground text-xs">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {doc && doc.states.length > 0 && (
          <section id="estados" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Estados</h2>
            <div className="divide-y rounded-lg border bg-card">
              {doc.states.map((s) => (
                <div key={s.name} className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {s.description}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {doc && doc.sizes.length > 0 && (
          <section id="tamanhos" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Tamanhos</h2>
            <div className="flex flex-wrap items-end gap-4 rounded-lg border bg-card p-4">
              {doc.sizes.map((s) => (
                <div key={s.value} className="flex flex-col items-center gap-2">
                  {renderSizePreview(slug, s.value)}
                  <span className="text-muted-foreground text-xs">{s.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="exemplos" className="scroll-mt-20 space-y-6">
          <h2 className="font-heading text-lg font-semibold">Exemplos</h2>
          {exampleNames.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Ainda sem exemplo cadastrado para este componente.
            </p>
          )}
          {exampleNames.map((exampleName) => {
            const ExampleComponent = exampleRegistry[exampleName]
            if (!ExampleComponent) return null
            const title = exampleTitle(slug, exampleName)
            return (
              <Card key={exampleName} id={`exemplo-${exampleName}`} className="scroll-mt-20">
                <CardHeader>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex min-h-32 items-center justify-center rounded-md border border-dashed p-6">
                  <div className="w-full">
                    <ExampleComponent />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {doc && (
          <section id="boas-praticas" className="scroll-mt-20 grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <h2 className="font-heading text-lg font-semibold">Boas práticas</h2>
              <ul className="space-y-2 text-sm">
                {doc.doGuidelines.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div id="evite" className="scroll-mt-20 space-y-3">
              <h2 className="font-heading text-lg font-semibold">Evite</h2>
              <ul className="space-y-2 text-sm">
                {doc.dontGuidelines.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {doc && (
          <section id="codigo" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Código</h2>
            <pre className="overflow-x-auto rounded-lg border bg-card p-4 text-sm">
              <code>{doc.code}</code>
            </pre>
          </section>
        )}

        {doc && showPlayground && (
          <section id="playground" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Playground</h2>
            <p className="text-muted-foreground text-sm">
              Ajuste as props abaixo e veja o resultado ao vivo.
            </p>
            {Playground ? <Playground /> : <GenericPlayground slug={slug} />}
          </section>
        )}

        {doc && (
          <section id="propriedades" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Propriedades</h2>
            <div className="overflow-x-auto rounded-lg border bg-card">
              <table className="w-full text-left text-sm">
                <thead className="border-b text-muted-foreground">
                  <tr>
                    <th className="p-3 font-medium">Prop</th>
                    <th className="p-3 font-medium">Tipo</th>
                    <th className="p-3 font-medium">Padrão</th>
                    <th className="p-3 font-medium">Descrição</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {doc.props.map((p) => (
                    <tr key={p.name}>
                      <td className="p-3 font-mono text-xs">{p.name}</td>
                      <td className="p-3 font-mono text-xs text-muted-foreground">
                        {p.type}
                      </td>
                      <td className="p-3 font-mono text-xs text-muted-foreground">
                        {p.default ?? "—"}
                      </td>
                      <td className="p-3 text-muted-foreground">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      <nav className="sticky top-20 hidden h-fit w-48 shrink-0 space-y-3 xl:block">
        <p className="text-sm font-medium">Nesta página</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {doc && (
            <>
              <li>
                <a href="#descricao" className="hover:text-foreground">
                  Descrição
                </a>
              </li>
              <li>
                <a href="#quando-utilizar" className="hover:text-foreground">
                  Quando utilizar
                </a>
              </li>
              <li>
                <a href="#anatomia" className="hover:text-foreground">
                  Anatomia
                </a>
              </li>
            </>
          )}
          {composition.length > 0 && (
            <li>
              <a href="#composicao" className="hover:text-foreground">
                Composição
              </a>
            </li>
          )}
          {doc && doc.variants.length > 0 && (
            <li>
              <a href="#variantes" className="hover:text-foreground">
                Variantes
              </a>
            </li>
          )}
          {doc && doc.states.length > 0 && (
            <li>
              <a href="#estados" className="hover:text-foreground">
                Estados
              </a>
            </li>
          )}
          {doc && doc.sizes.length > 0 && (
            <li>
              <a href="#tamanhos" className="hover:text-foreground">
                Tamanhos
              </a>
            </li>
          )}
          <li>
            <a href="#exemplos" className="hover:text-foreground">
              Exemplos
            </a>
            {exampleNames.length > 1 && (
              <ul className="mt-2 ml-3 space-y-2 border-l pl-3">
                {exampleNames.map((exampleName) => (
                  <li key={exampleName}>
                    <a
                      href={`#exemplo-${exampleName}`}
                      className="hover:text-foreground"
                    >
                      {exampleTitle(slug, exampleName)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {doc && (
            <>
              <li>
                <a href="#boas-praticas" className="hover:text-foreground">
                  Boas práticas
                </a>
              </li>
              <li>
                <a href="#evite" className="hover:text-foreground">
                  Evite
                </a>
              </li>
              <li>
                <a href="#codigo" className="hover:text-foreground">
                  Código
                </a>
              </li>
              {showPlayground && (
                <li>
                  <a href="#playground" className="hover:text-foreground">
                    Playground
                  </a>
                </li>
              )}
              <li>
                <a href="#propriedades" className="hover:text-foreground">
                  Propriedades
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}
