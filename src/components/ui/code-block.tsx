"use client"

import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"
import { useTexto } from "@/lib/idioma"
import { cn } from "@/lib/utils"

type Resultado = "copiado" | "falha" | null

// VoiceOver ignora uma mensagem igual à anterior na mesma região; um espaço
// rígido no fim a torna diferente sem ser lido.
let ultimaMensagem = ""

function CodeBlock({
  code,
  language,
  title,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children" | "title"> & {
  /** O código exibido e copiado, como texto puro. */
  code: string
  /** Linguagem do código (ex.: "tsx", "bash"); aparece no cabeçalho. */
  language?: string
  /** Nome do trecho; também entra no nome do botão de copiar. */
  title?: string
}) {
  const t = useTexto()
  const [resultado, setResultado] = React.useState<Resultado>(null)
  const [mensagem, setMensagem] = React.useState("")
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const montado = React.useRef(true)

  React.useEffect(() => {
    montado.current = true
    return () => {
      montado.current = false
      clearTimeout(timer.current)
    }
  }, [])

  async function copiar() {
    let ok = true
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      ok = false
    }
    if (!montado.current) return
    clearTimeout(timer.current)
    let texto = t(ok ? "codeBlock.copiado" : "codeBlock.falha")
    if (texto === ultimaMensagem) texto += " "
    ultimaMensagem = texto
    setResultado(ok ? "copiado" : "falha")
    setMensagem(texto)
    timer.current = setTimeout(() => {
      setResultado(null)
      setMensagem("")
    }, 2000)
  }

  const rotulo = title ? `${t("codeBlock.copiar")}: ${title}` : t("codeBlock.copiar")

  return (
    <div
      data-slot="code-block"
      data-language={language}
      className={cn(
        // o botão fica a 1 unidade + a borda da quina: raio interno = externo − isso
        "overflow-hidden rounded-outer-lg border bg-muted text-sm [--radius-inset:calc(1px+--spacing(1))]",
        className
      )}
      {...props}
    >
      <div
        data-slot="code-block-header"
        className="flex items-center justify-between gap-2 border-b p-1 ps-3"
      >
        <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
          {title && <span className="truncate font-medium text-foreground">{title}</span>}
          {language && (
            <span data-slot="code-block-language" className="shrink-0 font-mono text-xs">
              {language}
            </span>
          )}
        </span>
        <span className="relative flex items-center">
          <IconButton
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={rotulo}
            data-resultado={resultado ?? undefined}
            className="rounded-inner"
            icon={
              <Icon
                name={resultado === "copiado" ? "check" : resultado === "falha" ? "error" : "content_copy"}
              />
            }
            onClick={copiar}
          />
          {/* a região viva fica fora do botão: filho de botão não é anunciado */}
          <span
            role="status"
            data-slot="code-block-status"
            data-visivel={mensagem ? "" : undefined}
            className="pointer-events-none absolute end-full me-1 rounded-md bg-foreground px-2 py-1 text-xs whitespace-nowrap text-background opacity-0 transition-opacity duration-motion-fast data-visivel:opacity-100"
          >
            {mensagem}
          </span>
        </span>
      </div>
      <pre
        data-slot="code-block-pre"
        tabIndex={0}
        className="overflow-x-auto p-4 font-mono text-sm leading-relaxed outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-inset"
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

export { CodeBlock }
