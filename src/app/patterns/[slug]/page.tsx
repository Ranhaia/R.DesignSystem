import { notFound } from "next/navigation"

import { patternDocs } from "@/lib/pattern-docs"
import { patternsList } from "@/lib/patterns-registry"
import { patternRegistry } from "@/components/patterns/registry"
import { Card, CardContent } from "@/components/ui/card"

export function generateStaticParams() {
  return patternsList.map((p) => ({ slug: p.slug }))
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = patternsList.find((p) => p.slug === slug)

  if (!entry) {
    notFound()
  }

  const doc = patternDocs[slug]
  const Example = patternRegistry[slug]

  return (
    <div className="flex flex-1 gap-8">
      <div className="min-w-0 flex-1 space-y-10">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {entry.name}
        </h1>

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

        {doc && doc.composition.length > 0 && (
          <section id="composicao" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Composição</h2>
            <p className="text-muted-foreground text-sm">
              Atoms/Molecules/Organisms reais usados neste pattern.
            </p>
            <ul className="list-disc space-y-1 rounded-lg border bg-card p-4 pl-8 text-sm">
              {doc.composition.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {Example && (
          <section id="exemplo" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Exemplo</h2>
            <Card>
              <CardContent className="pt-6">
                <Example />
              </CardContent>
            </Card>
          </section>
        )}

        {doc && doc.accessibility.length > 0 && (
          <section id="acessibilidade" className="scroll-mt-20 space-y-3">
            <h2 className="font-heading text-lg font-semibold">
              Acessibilidade
            </h2>
            <ul className="space-y-2 text-sm">
              {doc.accessibility.map((item, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

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
            </>
          )}
          {doc && doc.composition.length > 0 && (
            <li>
              <a href="#composicao" className="hover:text-foreground">
                Composição
              </a>
            </li>
          )}
          {Example && (
            <li>
              <a href="#exemplo" className="hover:text-foreground">
                Exemplo
              </a>
            </li>
          )}
          {doc && doc.accessibility.length > 0 && (
            <li>
              <a href="#acessibilidade" className="hover:text-foreground">
                Acessibilidade
              </a>
            </li>
          )}
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
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}
