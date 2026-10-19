"use client"

import * as React from "react"
import Link from "next/link"

import type { Recomendacao } from "@/lib/assistente-catalogo"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

// Assistente de recomendação: a pessoa descreve o contexto de interface e
// recebe o componente ou pattern do catálogo que melhor atende, com
// alternativas e a pergunta que faltou. A busca por nome continua no
// header (Ctrl+K); aqui é busca por uso.

const exemplos = [
  "O usuário precisa escolher um estado brasileiro num formulário de cadastro.",
  "Confirmar a exclusão de uma apólice, que não pode ser desfeita.",
  "Mostrar filtros ativos numa listagem, que o usuário pode remover um a um.",
]

type Estado =
  | { fase: "inicio" }
  | { fase: "carregando" }
  | { fase: "erro"; mensagem: string }
  | { fase: "resultado"; dados: Recomendacao }

export default function AssistentePage() {
  const [contexto, setContexto] = React.useState("")
  const [estado, setEstado] = React.useState<Estado>({ fase: "inicio" })
  const carregando = estado.fase === "carregando"

  async function perguntar(texto: string) {
    if (!texto.trim() || carregando) return
    setEstado({ fase: "carregando" })
    try {
      const res = await fetch("/api/assistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contexto: texto }),
      })
      const dados = await res.json()
      if (!res.ok) {
        setEstado({ fase: "erro", mensagem: dados.erro ?? "Algo deu errado." })
        return
      }
      setEstado({ fase: "resultado", dados })
    } catch {
      setEstado({ fase: "erro", mensagem: "Sem conexão com o assistente." })
    }
  }

  return (
    <div className="flex max-w-3xl flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Assistente</h1>
        <p className="text-sm text-muted-foreground">
          Descreva o que a interface precisa resolver e receba o componente ou pattern do catálogo que melhor atende.
        </p>
      </div>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          perguntar(contexto)
        }}
      >
        <Textarea
          label="Contexto"
          value={contexto}
          onChange={(e) => setContexto(e.target.value)}
          placeholder="Ex.: o usuário precisa escolher várias categorias de uma lista longa, no celular."
          maxLength={1000}
          rows={4}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={carregando || contexto.trim().length < 10}>
            {carregando && <Spinner />}
            Recomendar
          </Button>
          <span className="text-xs text-muted-foreground">{contexto.length}/1000</span>
        </div>
      </form>

      {estado.fase === "inicio" && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Ou comece por um exemplo:</p>
          <div className="flex flex-wrap gap-2">
            {exemplos.map((ex) => (
              <Button
                key={ex}
                variant="outline"
                size="sm"
                className="h-auto whitespace-normal py-2 text-left"
                onClick={() => {
                  setContexto(ex)
                  perguntar(ex)
                }}
              >
                {ex}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div aria-live="polite" className="flex flex-col gap-4">
        {carregando && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner /> Consultando o catálogo…
          </p>
        )}

        {estado.fase === "erro" && (
          <Alert variant="destructive">
            <Icon name="error" />
            <AlertTitle>Não deu para recomendar</AlertTitle>
            <AlertDescription>{estado.mensagem}</AlertDescription>
          </Alert>
        )}

        {estado.fase === "resultado" && <Resultado dados={estado.dados} />}
      </div>
    </div>
  )
}

function Resultado({ dados }: { dados: Recomendacao }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardDescription>{dados.item ? "Recomendado" : "Nada no catálogo atende"}</CardDescription>
          <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
            {dados.item ? (
              <>
                <Link href={dados.item.href} className="underline-offset-4 hover:underline">
                  {dados.item.nome}
                </Link>
                <Badge variant="outline">{dados.item.tipo === "pattern" ? "Pattern" : "Componente"}</Badge>
              </>
            ) : (
              "Sem recomendação"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dados.motivo}</p>
        </CardContent>
      </Card>

      {dados.faltaContexto && (
        <Alert>
          <Icon name="help" />
          <AlertTitle>O que decidiria a escolha</AlertTitle>
          <AlertDescription>{dados.faltaContexto}</AlertDescription>
        </Alert>
      )}

      {dados.alternativas.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium">Alternativas</h2>
          <ul className="flex flex-col gap-2">
            {dados.alternativas.map((a) => (
              <li key={a.item.slug} className="rounded-md border p-3 text-sm">
                <Link href={a.item.href} className="font-medium underline-offset-4 hover:underline">
                  {a.item.nome}
                </Link>
                <p className="text-muted-foreground">{a.quandoPreferir}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Recomendação gerada por IA a partir da documentação do catálogo. Confira a página do componente antes de usar.
      </p>
    </>
  )
}
