"use client"

import * as React from "react"
import { RefreshCwIcon, ServerCrashIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

// Pattern: Error State — Alert (Atom já catalogado) já vem com role="alert"
// embutido, o que faz o leitor de tela anunciar o conteúdo automaticamente
// quando o nó entra no DOM. Além disso, o foco é movido programaticamente
// pro título do erro (tabIndex=-1 + .focus()) — sem isso, quem navega por
// teclado/leitor de tela continuaria com o foco no botão que disparou a
// falha, sem saber que algo mudou na tela.
export function ErrorStatePattern() {
  const [hasError, setHasError] = React.useState(true)
  const titleRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (hasError) {
      titleRef.current?.focus()
    }
  }, [hasError])

  function handleRetry() {
    setHasError(false)
    window.setTimeout(() => setHasError(true), 1200)
  }

  if (!hasError) {
    return (
      <Alert>
        <AlertTitle ref={titleRef} tabIndex={-1}>
          Tentando novamente...
        </AlertTitle>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive">
      <ServerCrashIcon />
      <AlertTitle ref={titleRef} tabIndex={-1}>
        Não foi possível carregar o sinistro
      </AlertTitle>
      <AlertDescription>
        <p>Verifique sua conexão e tente novamente.</p>
        <Button size="sm" variant="outline" onClick={handleRetry}>
          <RefreshCwIcon />
          Tentar novamente
        </Button>
      </AlertDescription>
    </Alert>
  )
}
